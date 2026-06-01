import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/page-header";
import { CrudForm } from "@/components/admin/crud-form";
import { prisma } from "@/lib/prisma";
import { updateAdvantage } from "../actions";
import { sectionFields } from "@/components/admin/section-fields";

export const dynamic = "force-dynamic";

export default async function EditAdvantage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await prisma.advantage.findUnique({ where: { id } });
  if (!row) notFound();
  return (
    <div>
      <AdminHeader title="تعديل عنصر" description={row.title} />
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <CrudForm fields={sectionFields} action={updateAdvantage.bind(null, id)} initial={row} cancelHref="/admin/advantages" submitLabel="حفظ التغييرات" />
      </div>
    </div>
  );
}
