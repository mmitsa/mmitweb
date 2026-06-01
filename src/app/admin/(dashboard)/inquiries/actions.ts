"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function setInquiryRead(id: string, read: boolean) {
  if (!(await auth())?.user) return;
  await prisma.inquiry.update({ where: { id }, data: { read } });
  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${id}`);
}

export async function deleteInquiry(id: string) {
  if (!(await auth())?.user) return;
  await prisma.inquiry.delete({ where: { id } });
  revalidatePath("/admin/inquiries");
}
