import { AdminHeader } from "@/components/admin/page-header";
import { CrudForm } from "@/components/admin/crud-form";
import { prisma } from "@/lib/prisma";
import { createAdvantage } from "../actions";
import { sectionFields } from "@/components/admin/section-fields";

export const dynamic = "force-dynamic";

export default async function NewAdvantage() {
  const count = await prisma.advantage.count();
  return (
    <div>
      <AdminHeader title="إضافة عنصر" />
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <CrudForm fields={sectionFields} action={createAdvantage} initial={{ order: count }} cancelHref="/admin/advantages" submitLabel="إضافة" />
      </div>
    </div>
  );
}
