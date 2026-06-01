import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/page-header";
import { CrudForm } from "@/components/admin/crud-form";
import { prisma } from "@/lib/prisma";
import { updateService } from "../actions";
import { serviceFields } from "../fields";

export const dynamic = "force-dynamic";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <div>
      <AdminHeader title="تعديل خدمة" description={service.title} />
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <CrudForm
          fields={serviceFields}
          action={updateService.bind(null, id)}
          initial={service}
          cancelHref="/admin/services"
          submitLabel="حفظ التغييرات"
        />
      </div>
    </div>
  );
}
