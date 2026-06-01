import Link from "next/link";
import { Icon } from "@/components/icon";
import { AdminHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { prisma } from "@/lib/prisma";
import { deleteProject } from "./actions";

export const dynamic = "force-dynamic";

export default async function ProjectsAdmin() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <AdminHeader title="الأعمال" description={`${projects.length} مشروع`} addHref="/admin/projects/new" addLabel="إضافة مشروع" />
      <div className="overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest soft-shadow">
        <table className="w-full text-right">
          <thead className="border-b border-outline-variant/20 bg-surface-container-low">
            <tr>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">الجهة</th>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">التصنيف</th>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">الحالة</th>
              <th className="w-px px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50">
                <td className="px-5 py-3">
                  <div className="font-medium text-primary">{p.client}</div>
                  <div className="text-sm text-on-surface-variant line-clamp-1">{p.work}</div>
                </td>
                <td className="px-5 py-3 text-sm text-on-surface-variant">{p.category}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${p.status === "قائم" ? "bg-secondary text-on-secondary" : "bg-surface-container text-on-surface-variant"}`}>{p.status}</span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/projects/${p.id}`} aria-label="تعديل" className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-secondary">
                      <Icon name="edit" className="text-[20px]" />
                    </Link>
                    <DeleteButton action={deleteProject.bind(null, p.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-on-surface-variant">لا توجد مشاريع بعد.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
