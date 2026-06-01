import { AdminHeader } from "@/components/admin/page-header";
import { CrudForm } from "@/components/admin/crud-form";
import { prisma } from "@/lib/prisma";
import { createProcessStep } from "../actions";
import { sectionFields } from "@/components/admin/section-fields";

export const dynamic = "force-dynamic";

export default async function NewProcessStep() {
  const count = await prisma.processStep.count();
  return (
    <div>
      <AdminHeader title="إضافة عنصر" />
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <CrudForm fields={sectionFields} action={createProcessStep} initial={{ order: count }} cancelHref="/admin/process" submitLabel="إضافة" />
      </div>
    </div>
  );
}
