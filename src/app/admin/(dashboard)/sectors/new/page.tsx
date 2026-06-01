import { AdminHeader } from "@/components/admin/page-header";
import { CrudForm } from "@/components/admin/crud-form";
import { prisma } from "@/lib/prisma";
import { createSector } from "../actions";
import { sectionFields } from "@/components/admin/section-fields";

export const dynamic = "force-dynamic";

export default async function NewSector() {
  const count = await prisma.sector.count();
  return (
    <div>
      <AdminHeader title="إضافة عنصر" />
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <CrudForm fields={sectionFields} action={createSector} initial={{ order: count }} cancelHref="/admin/sectors" submitLabel="إضافة" />
      </div>
    </div>
  );
}
