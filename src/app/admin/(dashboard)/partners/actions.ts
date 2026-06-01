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
  name: z.string().trim().min(1, "مطلوب"),
  sector: z.string().trim().min(1, "مطلوب"),
  icon: z.string().trim().min(1, "مطلوب"),
  logo: z.string().trim().optional(),
  order: z.coerce.number().int().min(0).default(0),
});

function revalidate() {
  revalidatePath("/");
  revalidatePath("/partners");
  revalidatePath("/admin/partners");
}

function toData(p: z.infer<typeof schema>) {
  return { ...p, logo: p.logo ? p.logo : null };
}

export async function createPartner(_prev: CrudState, fd: FormData): Promise<CrudState> {
  if (!(await auth())?.user) return { error: "غير مصرّح." };
  const parsed = schema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return zodErrors(parsed.error);
  await prisma.partner.create({ data: toData(parsed.data) });
  await logAudit("create", "شريك");
  revalidate();
  redirect("/admin/partners");
}

export async function updatePartner(id: string, _prev: CrudState, fd: FormData): Promise<CrudState> {
  if (!(await auth())?.user) return { error: "غير مصرّح." };
  const parsed = schema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return zodErrors(parsed.error);
  await prisma.partner.update({ where: { id }, data: toData(parsed.data) });
  await logAudit("update", "شريك");
  revalidate();
  redirect("/admin/partners");
}

export async function deletePartner(id: string) {
  if (!(await auth())?.user) return;
  await prisma.partner.delete({ where: { id } });
  await logAudit("delete", "شريك");
  revalidate();
}
