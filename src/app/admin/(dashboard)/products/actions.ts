"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { zodErrors, parseLines } from "@/lib/form";
import type { CrudState } from "@/components/admin/crud-form";

const schema = z.object({
  title: z.string().trim().min(1, "مطلوب"),
  slug: z.string().trim().min(1, "مطلوب").regex(/^[a-z0-9-]+$/, "حروف لاتينية صغيرة وأرقام وشرطات فقط"),
  icon: z.string().trim().min(1, "مطلوب"),
  tagline: z.string().trim().min(1, "مطلوب"),
  description: z.string().trim().min(1, "مطلوب"),
  overview: z.string().trim().min(1, "مطلوب"),
  href: z.string().trim().url("رابط غير صحيح").or(z.literal("")).optional(),
  order: z.coerce.number().int().min(0).default(0),
});

function revalidate() {
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");
}

function data(parsed: z.infer<typeof schema>, fd: FormData) {
  const { href, ...rest } = parsed;
  return { ...rest, href: href ? href : null, features: parseLines(fd.get("features")) };
}

export async function createProduct(_prev: CrudState, fd: FormData): Promise<CrudState> {
  if (!(await auth())?.user) return { error: "غير مصرّح." };
  const parsed = schema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return zodErrors(parsed.error);
  if (await prisma.product.findUnique({ where: { slug: parsed.data.slug } })) {
    return { error: "المعرّف مستخدم.", fieldErrors: { slug: "هذا المعرّف مستخدم مسبقًا" } };
  }
  await prisma.product.create({ data: data(parsed.data, fd) });
  revalidate();
  redirect("/admin/products");
}

export async function updateProduct(id: string, _prev: CrudState, fd: FormData): Promise<CrudState> {
  if (!(await auth())?.user) return { error: "غير مصرّح." };
  const parsed = schema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return zodErrors(parsed.error);
  const clash = await prisma.product.findUnique({ where: { slug: parsed.data.slug } });
  if (clash && clash.id !== id) {
    return { error: "المعرّف مستخدم.", fieldErrors: { slug: "هذا المعرّف مستخدم مسبقًا" } };
  }
  await prisma.product.update({ where: { id }, data: data(parsed.data, fd) });
  revalidate();
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  if (!(await auth())?.user) return;
  await prisma.product.delete({ where: { id } });
  revalidate();
}
