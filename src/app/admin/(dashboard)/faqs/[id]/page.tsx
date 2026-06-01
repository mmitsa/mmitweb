import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/page-header";
import { CrudForm } from "@/components/admin/crud-form";
import { prisma } from "@/lib/prisma";
import { updateFaq } from "../actions";
import { faqFields } from "../fields";

export const dynamic = "force-dynamic";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faq = await prisma.faq.findUnique({ where: { id } });
  if (!faq) notFound();

  return (
    <div>
      <AdminHeader title="تعديل سؤال" />
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <CrudForm fields={faqFields} action={updateFaq.bind(null, id)} initial={faq} cancelHref="/admin/faqs" submitLabel="حفظ التغييرات" />
      </div>
    </div>
  );
}
