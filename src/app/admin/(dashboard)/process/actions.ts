"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { zodErrors } from "@/lib/form";
import type { CrudState } from "@/components/admin/crud-form";

const schema = z.object({
  icon: z.string().trim().min(1, "مطلوب"),
  title: z.string().trim().min(1, "مطلوب"),
  description: z.string().trim().min(1, "مطلوب"),
  order: z.coerce.number().int().min(0).default(0),
});

function revalidate() {
  revalidatePath("/");
  revalidatePath("/admin/process");
}

export async function createProcessStep(_prev: CrudState, fd: FormData): Promise<CrudState> {
  if (!(await auth())?.user) return { error: "غير مصرّح." };
  const parsed = schema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return zodErrors(parsed.error);
  await prisma.processStep.create({ data: parsed.data });
  revalidate();
  redirect("/admin/process");
}

export async function updateProcessStep(id: string, _prev: CrudState, fd: FormData): Promise<CrudState> {
  if (!(await auth())?.user) return { error: "غير مصرّح." };
  const parsed = schema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return zodErrors(parsed.error);
  await prisma.processStep.update({ where: { id }, data: parsed.data });
  revalidate();
  redirect("/admin/process");
}

export async function deleteProcessStep(id: string) {
  if (!(await auth())?.user) return;
  await prisma.processStep.delete({ where: { id } });
  revalidate();
}
