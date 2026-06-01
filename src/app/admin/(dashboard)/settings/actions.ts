"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const schema = z.object({
  name: z.string().trim().min(1, "مطلوب"),
  tagline: z.string().trim().min(1, "مطلوب"),
  url: z.string().trim().url("رابط غير صحيح"),
  email: z.string().trim().email("بريد غير صحيح"),
  phone: z.string().trim().min(1, "مطلوب"),
  phoneDisplay: z.string().trim().min(1, "مطلوب"),
  whatsapp: z.string().trim().min(1, "مطلوب"),
  address: z.string().trim().min(1, "مطلوب"),
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
    for (const issue of parsed.error.issues) {
      fieldErrors[String(issue.path[0])] = issue.message;
    }
    return { error: "يرجى تصحيح الحقول المميّزة.", fieldErrors };
  }

  await prisma.settings.update({ where: { id: 1 }, data: parsed.data });
  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { ok: true };
}
