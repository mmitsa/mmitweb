import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/page-header";
import { CrudForm } from "@/components/admin/crud-form";
import { prisma } from "@/lib/prisma";
import { updateProcessStep } from "../actions";
import { sectionFields } from "@/components/admin/section-fields";

export const dynamic = "force-dynamic";

export default async function EditProcessStep({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await prisma.processStep.findUnique({ where: { id } });
  if (!row) notFound();
  return (
    <div>
      <AdminHeader title="تعديل عنصر" description={row.title} />
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <CrudForm fields={sectionFields} action={updateProcessStep.bind(null, id)} initial={row} cancelHref="/admin/process" submitLabel="حفظ التغييرات" />
      </div>
    </div>
  );
}
