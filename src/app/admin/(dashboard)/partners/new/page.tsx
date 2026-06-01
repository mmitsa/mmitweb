import { AdminHeader } from "@/components/admin/page-header";
import { CrudForm } from "@/components/admin/crud-form";
import { prisma } from "@/lib/prisma";
import { createPartner } from "../actions";
import { partnerFields } from "../fields";

export const dynamic = "force-dynamic";

export default async function NewPartnerPage() {
  const count = await prisma.partner.count();
  return (
    <div>
      <AdminHeader title="إضافة شريك" />
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <CrudForm fields={partnerFields} action={createPartner} initial={{ icon: "location_city", order: count }} cancelHref="/admin/partners" submitLabel="إضافة" />
      </div>
    </div>
  );
}
