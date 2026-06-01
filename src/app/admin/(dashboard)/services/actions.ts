"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { logAudit } from "@/lib/audit";
import { zodErrors, parseLines } from "@/lib/form";
import type { CrudState } from "@/components/admin/crud-form";

const schema = z.object({
  title: z.string().trim().min(1, "مطلوب"),
  slug: z.string().trim().min(1, "مطلوب").regex(/^[a-z0-9-]+$/, "حروف لاتينية صغيرة وأرقام وشرطات فقط"),
  icon: z.string().trim().min(1, "مطلوب"),
  description: z.string().trim().min(1, "مطلوب"),
  overview: z.string().trim().min(1, "مطلوب"),
  accent: z.enum(["secondary", "primary"]),
  order: z.coerce.number().int().min(0).default(0),
});

function revalidate() {
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/services");
}

export async function createService(_prev: CrudState, fd: FormData): Promise<CrudState> {
  if (!(await auth())?.user) return { error: "غير مصرّح." };
  const parsed = schema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return zodErrors(parsed.error);
  if (await prisma.service.findUnique({ where: { slug: parsed.data.slug } })) {
    return { error: "المعرّف مستخدم.", fieldErrors: { slug: "هذا المعرّف مستخدم مسبقًا" } };
  }
  await prisma.service.create({ data: { ...parsed.data, features: parseLines(fd.get("features")) } });
  await logAudit("create", "خدمة");
  revalidate();
  redirect("/admin/services");
}

export async function updateService(id: string, _prev: CrudState, fd: FormData): Promise<CrudState> {
  if (!(await auth())?.user) return { error: "غير مصرّح." };
  const parsed = schema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return zodErrors(parsed.error);
  const clash = await prisma.service.findUnique({ where: { slug: parsed.data.slug } });
  if (clash && clash.id !== id) {
    return { error: "المعرّف مستخدم.", fieldErrors: { slug: "هذا المعرّف مستخدم مسبقًا" } };
  }
  await prisma.service.update({ where: { id }, data: { ...parsed.data, features: parseLines(fd.get("features")) } });
  await logAudit("update", "خدمة");
  revalidate();
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  if (!(await auth())?.user) return;
  await prisma.service.delete({ where: { id } });
  await logAudit("delete", "خدمة");
  revalidate();
}
