"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/data";
import { site } from "@/lib/site";

const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

// Preferred: distributed rate limiting via Upstash Redis (works across
// multiple serverless instances). Enabled automatically when the
// UPSTASH_REDIS_REST_URL / _TOKEN env vars are present.
const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(RATE_LIMIT, "10 m"),
        prefix: "ratelimit:contact",
      })
    : null;

// Fallback: in-memory limiter (per instance) when Upstash is not configured.
const hits = new Map<string, number[]>();

function isRateLimitedInMemory(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.set(ip, recent);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  return false;
}

async function isRateLimited(ip: string): Promise<boolean> {
  if (ratelimit) {
    const { success } = await ratelimit.limit(ip);
    return !success;
  }
  return isRateLimitedInMemory(ip);
}

async function verifyTurnstile(secret: string, token: string, ip: string): Promise<boolean> {
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip && ip !== "unknown") body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const json = (await res.json()) as { success?: boolean };
    return Boolean(json.success);
  } catch (err) {
    console.error("[contact] turnstile verify failed:", err);
    return false;
  }
}

async function notifyTelegram(token: string, chatId: string, text: string) {
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    });
  } catch (err) {
    console.error("[contact] telegram notify failed:", err);
  }
}

const schema = z.object({
  name: z.string().trim().min(2, "الرجاء إدخال الاسم الكامل"),
  email: z.string().trim().email("البريد الإلكتروني غير صحيح"),
  mobile: z.string().trim().optional().or(z.literal("")),
  service: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().min(10, "الرسالة قصيرة جدًا، الرجاء إضافة تفاصيل أكثر"),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Rate limit by client IP first (counts every attempt, including bots).
  const hdrs = await headers();
  const ip =
    (hdrs.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
    hdrs.get("x-real-ip") ||
    "unknown";
  if (await isRateLimited(ip)) {
    return {
      status: "error",
      message: "لقد أرسلت عدة رسائل خلال فترة قصيرة. الرجاء المحاولة بعد قليل.",
    };
  }

  // Honeypot: real users never fill this hidden field — silently accept & drop.
  if (typeof formData.get("company") === "string" && formData.get("company")) {
    return { status: "success", message: "تم استلام رسالتك بنجاح." };
  }

  const settings = await getSettings();

  // Spam protection: verify Cloudflare Turnstile when configured.
  if (settings?.turnstileSecretKey) {
    const token = String(formData.get("cf-turnstile-response") ?? "");
    if (!token || !(await verifyTurnstile(settings.turnstileSecretKey, token, ip))) {
      return { status: "error", message: "فشل التحقق من أنك لست روبوتًا. الرجاء إعادة المحاولة." };
    }
  }

  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    mobile: formData.get("mobile"),
    service: formData.get("service"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof schema>;
      errors[key] = issue.message;
    }
    return { status: "error", message: "الرجاء تصحيح الحقول المميزة.", errors };
  }

  const { name, email, mobile, service, message } = parsed.data;

  // 1) Always persist the inquiry so nothing is ever lost.
  try {
    await prisma.inquiry.create({
      data: { name, email, mobile: mobile || null, service: service || null, message },
    });
  } catch (err) {
    console.error("[contact] failed to store inquiry:", err);
    return { status: "error", message: "تعذّر استلام رسالتك حاليًا. الرجاء المحاولة لاحقًا." };
  }

  const summary = [
    `الاسم: ${name}`,
    `البريد: ${email}`,
    `الجوال: ${mobile || "—"}`,
    `الخدمة: ${service || "—"}`,
    "",
    "الرسالة:",
    message,
  ].join("\n");

  // 2) Instant Telegram notification (if configured).
  if (settings?.telegramBotToken && settings?.telegramChatId) {
    await notifyTelegram(settings.telegramBotToken, settings.telegramChatId, `📨 استفسار جديد\n\n${summary}`);
  }

  // 3) Optionally email a copy, using the settings configured in the admin
  //    (falling back to env vars). Email failure does not lose the inquiry.
  const apiKey = settings?.resendApiKey || process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const recipients = (settings?.inquiryEmail || settings?.email || process.env.CONTACT_TO_EMAIL || site.email)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const from = settings?.emailFrom || process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
      const brand = settings?.name || site.name;

      const { error } = await resend.emails.send({
        from: `${brand} <${from}>`,
        to: recipients,
        replyTo: email,
        subject: `استفسار جديد من الموقع — ${name}`,
        text: summary,
      });
      if (error) console.error("[contact] Resend error:", error);
    } catch (err) {
      console.error("[contact] email send failed:", err);
    }
  }

  return { status: "success", message: "تم استلام رسالتك بنجاح، وسنعاود التواصل معك قريبًا." };
}
