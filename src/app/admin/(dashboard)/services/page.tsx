import Link from "next/link";
import { Icon } from "@/components/icon";
import { AdminHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { prisma } from "@/lib/prisma";
import { deleteService } from "./actions";

export const dynamic = "force-dynamic";

export default async function ServicesAdmin() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <AdminHeader title="الخدمات" description={`${services.length} خدمة`} addHref="/admin/services/new" addLabel="إضافة خدمة" />
      <div className="overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest soft-shadow">
        <table className="w-full text-right">
          <thead className="border-b border-outline-variant/20 bg-surface-container-low">
            <tr>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">العنوان</th>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">المعرّف</th>
              <th className="w-px px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Icon name={s.icon} className="text-[22px] text-secondary" />
                    <span className="font-medium text-primary">{s.title}</span>
                  </div>
                </td>
                <td className="px-5 py-3 font-mono text-sm text-on-surface-variant" dir="ltr">{s.slug}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/services/${s.id}`} aria-label="تعديل" className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-secondary">
                      <Icon name="edit" className="text-[20px]" />
                    </Link>
                    <DeleteButton action={deleteService.bind(null, s.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr><td colSpan={3} className="px-5 py-10 text-center text-on-surface-variant">لا توجد خدمات بعد.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
