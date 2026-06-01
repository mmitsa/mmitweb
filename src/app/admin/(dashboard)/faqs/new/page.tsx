import { AdminHeader } from "@/components/admin/page-header";
import { CrudForm } from "@/components/admin/crud-form";
import { prisma } from "@/lib/prisma";
import { createFaq } from "../actions";
import { faqFields } from "../fields";

export const dynamic = "force-dynamic";

export default async function NewFaqPage() {
  const count = await prisma.faq.count();
  return (
    <div>
      <AdminHeader title="إضافة سؤال" />
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <CrudForm fields={faqFields} action={createFaq} initial={{ order: count }} cancelHref="/admin/faqs" submitLabel="إضافة" />
      </div>
    </div>
  );
}
