import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import type { Prisma } from "@prisma/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csvCell(value: string) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return new Response("غير مصرّح", { status: 401 });
  }

  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? "";
  const status = url.searchParams.get("status") ?? "";

  const where: Prisma.InquiryWhereInput = {};
  if (["new", "in_progress", "closed"].includes(status)) where.status = status;
  if (q.trim()) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { message: { contains: q, mode: "insensitive" } },
    ];
  }

  const rows = await prisma.inquiry.findMany({ where, orderBy: { createdAt: "desc" } });
  const header = ["الاسم", "البريد", "الجوال", "الخدمة", "الحالة", "التاريخ", "الرسالة"];
  const lines = [
    header.map(csvCell).join(","),
    ...rows.map((r) =>
      [r.name, r.email, r.mobile ?? "", r.service ?? "", r.status, r.createdAt.toISOString(), r.message]
        .map(csvCell)
        .join(",")
    ),
  ];
  // BOM so Excel reads UTF-8 (Arabic) correctly.
  const body = "﻿" + lines.join("\r\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="inquiries.csv"`,
    },
  });
}
