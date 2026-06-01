"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { zodErrors } from "@/lib/form";
import type { CrudState } from "@/components/admin/crud-form";

const schema = z.object({
  question: z.string().trim().min(1, "مطلوب"),
  answer: z.string().trim().min(1, "مطلوب"),
  order: z.coerce.number().int().min(0).default(0),
});

function revalidate() {
  revalidatePath("/faq");
  revalidatePath("/admin/faqs");
}

export async function createFaq(_prev: CrudState, fd: FormData): Promise<CrudState> {
  if (!(await auth())?.user) return { error: "غير مصرّح." };
  const parsed = schema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return zodErrors(parsed.error);
  await prisma.faq.create({ data: parsed.data });
  revalidate();
  redirect("/admin/faqs");
}

export async function updateFaq(id: string, _prev: CrudState, fd: FormData): Promise<CrudState> {
  if (!(await auth())?.user) return { error: "غير مصرّح." };
  const parsed = schema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return zodErrors(parsed.error);
  await prisma.faq.update({ where: { id }, data: parsed.data });
  revalidate();
  redirect("/admin/faqs");
}

export async function deleteFaq(id: string) {
  if (!(await auth())?.user) return;
  await prisma.faq.delete({ where: { id } });
  revalidate();
}
