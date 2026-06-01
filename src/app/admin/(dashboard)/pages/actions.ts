"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { logAudit } from "@/lib/audit";
import { zodErrors } from "@/lib/form";
import { parseBlocks } from "@/lib/blocks";
import type { CrudState } from "@/components/admin/crud-form";

const RESERVED = new Set([
  "", "services", "products", "portfolio", "partners", "about", "contact",
  "faq", "privacy", "admin", "api",
]);

const schema = z.object({
  title: z.string().trim().min(1, "مطلوب"),
  slug: z.string().trim().min(1, "مطلوب").regex(/^[a-z0-9-]+$/, "حروف لاتينية صغيرة وأرقام وشرطات فقط"),
  description: z.string().trim().optional(),
});

function readBlocks(fd: FormData) {
  try {
    return parseBlocks(JSON.parse(String(fd.get("blocks") ?? "[]")));
  } catch {
    return [];
  }
}

function revalidate(slug: string) {
  revalidatePath("/admin/pages");
  revalidatePath(`/${slug}`);
}

export async function createPage(_prev: CrudState, fd: FormData): Promise<CrudState> {
  if (!(await auth())?.user) return { error: "غير مصرّح." };
  const parsed = schema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return zodErrors(parsed.error);
  if (RESERVED.has(parsed.data.slug)) {
    return { error: "المعرّف محجوز.", fieldErrors: { slug: "هذا المعرّف محجوز لصفحة موجودة" } };
  }
  if (await prisma.page.findUnique({ where: { slug: parsed.data.slug } })) {
    return { error: "المعرّف مستخدم.", fieldErrors: { slug: "هذا المعرّف مستخدم مسبقًا" } };
  }
  await prisma.page.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      description: parsed.data.description || null,
      published: fd.get("published") === "on",
      blocks: readBlocks(fd),
    },
  });
  await logAudit("create", "صفحة");
  revalidate(parsed.data.slug);
  redirect("/admin/pages");
}

export async function updatePage(id: string, _prev: CrudState, fd: FormData): Promise<CrudState> {
  if (!(await auth())?.user) return { error: "غير مصرّح." };
  const parsed = schema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return zodErrors(parsed.error);
  if (RESERVED.has(parsed.data.slug)) {
    return { error: "المعرّف محجوز.", fieldErrors: { slug: "هذا المعرّف محجوز لصفحة موجودة" } };
  }
  const clash = await prisma.page.findUnique({ where: { slug: parsed.data.slug } });
  if (clash && clash.id !== id) {
    return { error: "المعرّف مستخدم.", fieldErrors: { slug: "هذا المعرّف مستخدم مسبقًا" } };
  }
  await prisma.page.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      description: parsed.data.description || null,
      published: fd.get("published") === "on",
      blocks: readBlocks(fd),
    },
  });
  await logAudit("update", "صفحة");
  revalidate(parsed.data.slug);
  redirect("/admin/pages");
}

export async function deletePage(id: string) {
  if (!(await auth())?.user) return;
  const page = await prisma.page.delete({ where: { id } });
  await logAudit("delete", "صفحة");
  revalidate(page.slug);
}
