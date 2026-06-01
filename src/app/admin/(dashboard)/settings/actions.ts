"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { logAudit } from "@/lib/audit";

const schema = z.object({
  name: z.string().trim().min(1, "مطلوب"),
  tagline: z.string().trim().min(1, "مطلوب"),
  url: z.string().trim().url("رابط غير صحيح"),
  email: z.string().trim().email("بريد غير صحيح"),
  phone: z.string().trim().min(1, "مطلوب"),
  phoneDisplay: z.string().trim().min(1, "مطلوب"),
  whatsapp: z.string().trim().min(1, "مطلوب"),
  address: z.string().trim().min(1, "مطلوب"),
  logo: z.string().trim().optional(),
  logoWhite: z.string().trim().optional(),
  inquiryEmail: z.string().trim().optional(),
  emailFrom: z.string().trim().optional(),
  turnstileSiteKey: z.string().trim().optional(),
  telegramChatId: z.string().trim().optional(),
});

export type SettingsState = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function updateSettings(
  _prev: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  const session = await auth();
  if (!session?.user) return { error: "غير مصرّح." };

  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
    return { error: "يرجى تصحيح الحقول المميّزة.", fieldErrors };
  }

  const { logo, logoWhite, inquiryEmail, emailFrom, turnstileSiteKey, telegramChatId, ...rest } = parsed.data;

  // Secrets: only overwrite when a new value is supplied.
  const secret = (key: string) => {
    const v = String(formData.get(key) ?? "").trim();
    return v ? { [key]: v } : {};
  };

  await prisma.settings.update({
    where: { id: 1 },
    data: {
      ...rest,
      logo: logo || null,
      logoWhite: logoWhite || null,
      inquiryEmail: inquiryEmail || null,
      emailFrom: emailFrom || null,
      turnstileSiteKey: turnstileSiteKey || null,
      telegramChatId: telegramChatId || null,
      ...secret("resendApiKey"),
      ...secret("turnstileSecretKey"),
      ...secret("telegramBotToken"),
    },
  });

  await logAudit("update", "الإعدادات");
  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { ok: true };
}
