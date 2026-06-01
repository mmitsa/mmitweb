import { redirect } from "next/navigation";
import { AdminHeader } from "@/components/admin/page-header";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

const actionLabel: Record<string, string> = {
  create: "إضافة",
  update: "تعديل",
  delete: "حذف",
};
const actionColor: Record<string, string> = {
  create: "bg-secondary text-on-secondary",
  update: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  delete: "bg-error-container text-on-error-container",
};

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("ar-SA", { dateStyle: "medium", timeStyle: "short" }).format(d);
}

export default async function AuditAdmin() {
  const session = await auth();
  if (session?.user?.role !== "admin") redirect("/admin");

  const logs = await prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <div>
      <AdminHeader title="سجل التدقيق" description="آخر 200 عملية على المحتوى." />
      <div className="overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest soft-shadow">
        <table className="w-full text-right">
          <thead className="border-b border-outline-variant/20 bg-surface-container-low">
            <tr>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">العملية</th>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">العنصر</th>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">المستخدم</th>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">التاريخ</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.id} className="border-b border-outline-variant/10 last:border-0">
                <td className="px-5 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${actionColor[l.action] ?? "bg-surface-container text-on-surface-variant"}`}>
                    {actionLabel[l.action] ?? l.action}
                  </span>
                </td>
                <td className="px-5 py-3 text-primary">
                  {l.entity}
                  {l.label && <span className="text-on-surface-variant"> — {l.label}</span>}
                </td>
                <td className="px-5 py-3 text-sm text-on-surface-variant" dir="ltr">{l.userEmail}</td>
                <td className="px-5 py-3 text-sm text-on-surface-variant">{formatDate(l.createdAt)}</td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-on-surface-variant">لا توجد عمليات مسجّلة بعد.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
