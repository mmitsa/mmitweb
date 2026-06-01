import Link from "next/link";
import { Icon } from "@/components/icon";
import { AdminHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { prisma } from "@/lib/prisma";
import { deleteFaq } from "./actions";

export const dynamic = "force-dynamic";

export default async function FaqsAdmin() {
  const faqs = await prisma.faq.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <AdminHeader title="الأسئلة الشائعة" description={`${faqs.length} سؤال`} addHref="/admin/faqs/new" addLabel="إضافة سؤال" />
      <div className="overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest soft-shadow">
        <table className="w-full text-right">
          <thead className="border-b border-outline-variant/20 bg-surface-container-low">
            <tr>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">السؤال</th>
              <th className="w-px px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((f) => (
              <tr key={f.id} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50">
                <td className="px-5 py-3">
                  <div className="font-medium text-primary">{f.question}</div>
                  <div className="text-sm text-on-surface-variant line-clamp-1">{f.answer}</div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/faqs/${f.id}`} aria-label="تعديل" className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-secondary">
                      <Icon name="edit" className="text-[20px]" />
                    </Link>
                    <DeleteButton action={deleteFaq.bind(null, f.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {faqs.length === 0 && (
              <tr><td colSpan={2} className="px-5 py-10 text-center text-on-surface-variant">لا توجد أسئلة بعد.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
