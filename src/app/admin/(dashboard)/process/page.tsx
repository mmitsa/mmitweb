import Link from "next/link";
import { Icon } from "@/components/icon";
import { AdminHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { prisma } from "@/lib/prisma";
import { deleteProcessStep } from "./actions";

export const dynamic = "force-dynamic";

export default async function ProcessStepAdmin() {
  const rows = await prisma.processStep.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <AdminHeader title="مراحل العمل" description={`${rows.length} عنصر`} addHref="/admin/process/new" addLabel="إضافة" />
      <div className="overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest soft-shadow">
        <table className="w-full text-right">
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Icon name={r.icon} className="text-[22px] text-secondary" />
                    <span className="font-medium text-primary">{r.title}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/process/${r.id}`} aria-label="تعديل" className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-secondary">
                      <Icon name="edit" className="text-[20px]" />
                    </Link>
                    <DeleteButton action={deleteProcessStep.bind(null, r.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td className="px-5 py-10 text-center text-on-surface-variant">لا توجد عناصر بعد.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
