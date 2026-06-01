"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { zodErrors } from "@/lib/form";
import type { CrudState } from "@/components/admin/crud-form";

const base = {
  name: z.string().trim().min(1, "مطلوب"),
  email: z.string().trim().email("بريد غير صحيح"),
  role: z.enum(["admin", "editor"]),
};
const createSchema = z.object({ ...base, password: z.string().min(8, "٨ أحرف على الأقل") });
const updateSchema = z.object({
  ...base,
  password: z.string().min(8, "٨ أحرف على الأقل").or(z.literal("")).optional(),
});

async function requireAdmin() {
  const session = await auth();
  return session?.user?.role === "admin" ? session : null;
}

export async function createUser(_prev: CrudState, fd: FormData): Promise<CrudState> {
  if (!(await requireAdmin())) return { error: "غير مصرّح." };
  const parsed = createSchema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return zodErrors(parsed.error);
  const email = parsed.data.email.toLowerCase();
  if (await prisma.user.findUnique({ where: { email } })) {
    return { error: "البريد مستخدم.", fieldErrors: { email: "هذا البريد مسجّل مسبقًا" } };
  }
  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email,
      role: parsed.data.role,
      passwordHash: await bcrypt.hash(parsed.data.password, 10),
    },
  });
  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function updateUser(id: string, _prev: CrudState, fd: FormData): Promise<CrudState> {
  if (!(await requireAdmin())) return { error: "غير مصرّح." };
  const parsed = updateSchema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return zodErrors(parsed.error);
  const email = parsed.data.email.toLowerCase();
  const clash = await prisma.user.findUnique({ where: { email } });
  if (clash && clash.id !== id) {
    return { error: "البريد مستخدم.", fieldErrors: { email: "هذا البريد مسجّل مسبقًا" } };
  }
  const data: { name: string; email: string; role: string; passwordHash?: string } = {
    name: parsed.data.name,
    email,
    role: parsed.data.role,
  };
  if (parsed.data.password) data.passwordHash = await bcrypt.hash(parsed.data.password, 10);
  await prisma.user.update({ where: { id }, data });
  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteUser(id: string) {
  const session = await requireAdmin();
  if (!session) return;
  if (session.user?.id === id) return; // can't delete yourself
  const admins = await prisma.user.count({ where: { role: "admin" } });
  const target = await prisma.user.findUnique({ where: { id } });
  if (target?.role === "admin" && admins <= 1) return; // keep at least one admin
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}
