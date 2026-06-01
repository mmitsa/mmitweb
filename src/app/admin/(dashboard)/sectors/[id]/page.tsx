import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/page-header";
import { CrudForm } from "@/components/admin/crud-form";
import { prisma } from "@/lib/prisma";
import { updateSector } from "../actions";
import { sectionFields } from "@/components/admin/section-fields";

export const dynamic = "force-dynamic";

export default async function EditSector({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await prisma.sector.findUnique({ where: { id } });
  if (!row) notFound();
  return (
    <div>
      <AdminHeader title="تعديل عنصر" description={row.title} />
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <CrudForm fields={sectionFields} action={updateSector.bind(null, id)} initial={row} cancelHref="/admin/sectors" submitLabel="حفظ التغييرات" />
      </div>
    </div>
  );
}
