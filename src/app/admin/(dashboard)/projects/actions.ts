"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { logAudit } from "@/lib/audit";
import { zodErrors } from "@/lib/form";
import type { CrudState } from "@/components/admin/crud-form";

const schema = z.object({
  client: z.string().trim().min(1, "مطلوب"),
  work: z.string().trim().min(1, "مطلوب"),
  status: z.enum(["قائم", "منتهي"]),
  category: z.enum(["تطوير برمجيات", "أنظمة مراقبة", "صيانة تقنية", "توريد وتركيب"]),
  order: z.coerce.number().int().min(0).default(0),
});

function revalidate() {
  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/partners");
  revalidatePath("/admin/projects");
}

export async function createProject(_prev: CrudState, fd: FormData): Promise<CrudState> {
  if (!(await auth())?.user) return { error: "غير مصرّح." };
  const parsed = schema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return zodErrors(parsed.error);
  await prisma.project.create({ data: parsed.data });
  await logAudit("create", "مشروع");
  revalidate();
  redirect("/admin/projects");
}

export async function updateProject(id: string, _prev: CrudState, fd: FormData): Promise<CrudState> {
  if (!(await auth())?.user) return { error: "غير مصرّح." };
  const parsed = schema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return zodErrors(parsed.error);
  await prisma.project.update({ where: { id }, data: parsed.data });
  await logAudit("update", "مشروع");
  revalidate();
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  if (!(await auth())?.user) return;
  await prisma.project.delete({ where: { id } });
  await logAudit("delete", "مشروع");
  revalidate();
}
