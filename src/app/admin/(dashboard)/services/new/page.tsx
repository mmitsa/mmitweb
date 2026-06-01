import { AdminHeader } from "@/components/admin/page-header";
import { CrudForm } from "@/components/admin/crud-form";
import { prisma } from "@/lib/prisma";
import { createService } from "../actions";
import { serviceFields } from "../fields";

export const dynamic = "force-dynamic";

export default async function NewServicePage() {
  const count = await prisma.service.count();
  return (
    <div>
      <AdminHeader title="إضافة خدمة" />
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <CrudForm
          fields={serviceFields}
          action={createService}
          initial={{ accent: "secondary", order: count }}
          cancelHref="/admin/services"
          submitLabel="إضافة"
        />
      </div>
    </div>
  );
}
