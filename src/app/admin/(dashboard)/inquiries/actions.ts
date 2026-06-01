"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { logAudit } from "@/lib/audit";

export async function setInquiryRead(id: string, read: boolean) {
  if (!(await auth())?.user) return;
  await prisma.inquiry.update({ where: { id }, data: { read } });
  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${id}`);
}

export async function setInquiryStatus(id: string, status: string) {
  if (!(await auth())?.user) return;
  if (!["new", "in_progress", "closed"].includes(status)) return;
  await prisma.inquiry.update({ where: { id }, data: { status, read: true } });
  await logAudit("update", "استفسار", `الحالة: ${status}`);
  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${id}`);
}

export async function deleteInquiry(id: string) {
  if (!(await auth())?.user) return;
  await prisma.inquiry.delete({ where: { id } });
  await logAudit("delete", "استفسار");
  revalidatePath("/admin/inquiries");
}
