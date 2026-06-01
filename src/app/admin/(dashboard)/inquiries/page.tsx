import Link from "next/link";
import { Icon } from "@/components/icon";
import { AdminHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { prisma } from "@/lib/prisma";
import { deleteInquiry } from "./actions";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium", timeStyle: "short" }).format(d);
}

export default async function InquiriesAdmin() {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
  const unread = inquiries.filter((i) => !i.read).length;

  return (
    <div>
      <AdminHeader title="الاستفسارات" description={`${inquiries.length} رسالة${unread ? ` — ${unread} غير مقروءة` : ""}`} />
      <div className="overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest soft-shadow">
        <table className="w-full text-right">
          <thead className="border-b border-outline-variant/20 bg-surface-container-low">
            <tr>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">المرسِل</th>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">الخدمة</th>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">التاريخ</th>
              <th className="w-px px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((q) => (
              <tr key={q.id} className={`border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 ${!q.read ? "bg-secondary-fixed/15" : ""}`}>
                <td className="px-5 py-3">
                  <Link href={`/admin/inquiries/${q.id}`} className="flex items-center gap-2">
                    {!q.read && <span className="h-2 w-2 flex-shrink-0 rounded-full bg-secondary" />}
                    <span>
                      <span className={`block ${q.read ? "font-medium text-primary" : "font-bold text-primary"}`}>{q.name}</span>
                      <span className="block text-sm text-on-surface-variant" dir="ltr">{q.email}</span>
                    </span>
                  </Link>
                </td>
                <td className="px-5 py-3 text-sm text-on-surface-variant">{q.service || "—"}</td>
                <td className="px-5 py-3 text-sm text-on-surface-variant">{formatDate(q.createdAt)}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/inquiries/${q.id}`} aria-label="عرض" className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-secondary">
                      <Icon name="visibility" className="text-[20px]" />
                    </Link>
                    <DeleteButton action={deleteInquiry.bind(null, q.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-on-surface-variant">لا توجد استفسارات بعد.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
