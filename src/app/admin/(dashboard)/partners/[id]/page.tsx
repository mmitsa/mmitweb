import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/page-header";
import { CrudForm } from "@/components/admin/crud-form";
import { prisma } from "@/lib/prisma";
import { updatePartner } from "../actions";
import { partnerFields } from "../fields";

export const dynamic = "force-dynamic";

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partner = await prisma.partner.findUnique({ where: { id } });
  if (!partner) notFound();

  return (
    <div>
      <AdminHeader title="تعديل شريك" description={partner.name} />
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <CrudForm fields={partnerFields} action={updatePartner.bind(null, id)} initial={partner} cancelHref="/admin/partners" submitLabel="حفظ التغييرات" />
      </div>
    </div>
  );
}
