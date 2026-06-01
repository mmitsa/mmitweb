import Link from "next/link";
import { Icon } from "@/components/icon";
import { AdminHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { prisma } from "@/lib/prisma";
import { deletePage } from "./actions";

export const dynamic = "force-dynamic";

export default async function PagesAdmin() {
  const pages = await prisma.page.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <AdminHeader title="الصفحات" description={`${pages.length} صفحة`} addHref="/admin/pages/new" addLabel="إضافة صفحة" />
      <div className="overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest soft-shadow">
        <table className="w-full text-right">
          <thead className="border-b border-outline-variant/20 bg-surface-container-low">
            <tr>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">العنوان</th>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">الرابط</th>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">الحالة</th>
              <th className="w-px px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {pages.map((p) => (
              <tr key={p.id} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50">
                <td className="px-5 py-3 font-medium text-primary">{p.title}</td>
                <td className="px-5 py-3 font-mono text-sm text-on-surface-variant" dir="ltr">/{p.slug}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${p.published ? "bg-secondary text-on-secondary" : "bg-surface-container text-on-surface-variant"}`}>
                    {p.published ? "منشورة" : "مسودّة"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {p.published && (
                      <a href={`/${p.slug}`} target="_blank" rel="noopener" aria-label="عرض" className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-secondary">
                        <Icon name="open_in_new" className="text-[20px]" />
                      </a>
                    )}
                    <Link href={`/admin/pages/${p.id}`} aria-label="تعديل" className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-secondary">
                      <Icon name="edit" className="text-[20px]" />
                    </Link>
                    <DeleteButton action={deletePage.bind(null, p.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-on-surface-variant">لا توجد صفحات بعد. أنشئ صفحتك الأولى.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
