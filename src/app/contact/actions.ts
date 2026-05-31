"use server";

import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/lib/site";

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
  const apiKey = process.env.RESEND_API_KEY;

  // Graceful fallback when no email provider is configured yet (e.g. local dev).
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set — message logged but not emailed:", {
      name,
      email,
      mobile,
      service,
      message,
    });
    return {
      status: "success",
      message: "تم استلام رسالتك. (لم يُضبط مزوّد البريد بعد — راجع README)",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const to = process.env.CONTACT_TO_EMAIL ?? site.email;
    const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

    const { error } = await resend.emails.send({
      from: `${site.name} <${from}>`,
      to,
      replyTo: email,
      subject: `رسالة جديدة من الموقع — ${name}`,
      text: [
        `الاسم: ${name}`,
        `البريد: ${email}`,
        `الجوال: ${mobile || "—"}`,
        `الخدمة: ${service || "—"}`,
        "",
        "الرسالة:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return {
        status: "error",
        message: "تعذّر إرسال الرسالة حاليًا. الرجاء المحاولة لاحقًا أو التواصل عبر واتساب.",
      };
    }

    return { status: "success", message: "تم استلام رسالتك بنجاح." };
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return {
      status: "error",
      message: "حدث خطأ غير متوقع. الرجاء المحاولة لاحقًا.",
    };
  }
}
