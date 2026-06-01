import Link from "next/link";
import { Icon } from "@/components/icon";
import { AdminHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { STATUS_LABEL, STATUS_COLOR } from "@/lib/inquiry-status";
import { deleteInquiry } from "./actions";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium", timeStyle: "short" }).format(d);
}

const filters = [
  { key: "", label: "الكل" },
  { key: "new", label: "جديد" },
  { key: "in_progress", label: "قيد المعالجة" },
  { key: "closed", label: "مغلق" },
];

export default async function InquiriesAdmin({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q = "", status = "" } = await searchParams;

  const where: Prisma.InquiryWhereInput = {};
  if (["new", "in_progress", "closed"].includes(status)) where.status = status;
  if (q.trim()) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { email: { contains: q, mode: "insensitive" } },
      { message: { contains: q, mode: "insensitive" } },
    ];
  }

  const inquiries = await prisma.inquiry.findMany({ where, orderBy: { createdAt: "desc" } });
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (status) params.set("status", status);
  const exportHref = `/api/admin/inquiries/export${params.toString() ? `?${params}` : ""}`;

  return (
    <div>
      <AdminHeader title="الاستفسارات" description={`${inquiries.length} نتيجة`} />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <form method="get" className="flex items-center gap-2">
          {status && <input type="hidden" name="status" value={status} />}
          <input
            name="q"
            defaultValue={q}
            placeholder="بحث بالاسم أو البريد أو النص..."
            className="w-64 rounded-lg border border-outline-variant bg-surface px-4 py-2 text-sm text-on-surface focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
          />
          <button type="submit" className="rounded-lg bg-secondary px-4 py-2 font-head text-sm text-on-secondary hover:bg-secondary-container">
            بحث
          </button>
        </form>
        <a href={exportHref} className="inline-flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 font-head text-sm text-primary hover:bg-surface-container">
          <Icon name="download" className="text-[18px]" />
          تصدير CSV
        </a>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {filters.map((f) => {
          const sp = new URLSearchParams();
          if (q) sp.set("q", q);
          if (f.key) sp.set("status", f.key);
          const active = status === f.key;
          return (
            <Link key={f.key || "all"} href={`/admin/inquiries${sp.toString() ? `?${sp}` : ""}`} className={cn("rounded-full px-4 py-1.5 font-head text-sm transition-colors", active ? "bg-primary text-on-primary" : "border border-outline text-on-surface-variant hover:bg-surface-container")}>
              {f.label}
            </Link>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest soft-shadow">
        <table className="w-full text-right">
          <thead className="border-b border-outline-variant/20 bg-surface-container-low">
            <tr>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">المرسِل</th>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">الحالة</th>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">التاريخ</th>
              <th className="w-px px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((row) => (
              <tr key={row.id} className={cn("border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50", !row.read && "bg-secondary-fixed/15")}>
                <td className="px-5 py-3">
                  <Link href={`/admin/inquiries/${row.id}`} className="flex items-center gap-2">
                    {!row.read && <span className="h-2 w-2 flex-shrink-0 rounded-full bg-secondary" />}
                    <span>
                      <span className={cn("block text-primary", row.read ? "font-medium" : "font-bold")}>{row.name}</span>
                      <span className="block text-sm text-on-surface-variant" dir="ltr">{row.email}</span>
                    </span>
                  </Link>
                </td>
                <td className="px-5 py-3">
                  <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", STATUS_COLOR[row.status])}>
                    {STATUS_LABEL[row.status] ?? row.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-on-surface-variant">{formatDate(row.createdAt)}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/inquiries/${row.id}`} aria-label="عرض" className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-secondary">
                      <Icon name="visibility" className="text-[20px]" />
                    </Link>
                    <DeleteButton action={deleteInquiry.bind(null, row.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-on-surface-variant">لا توجد نتائج.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
