import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { DeleteButton } from "@/components/admin/delete-button";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { INQUIRY_STATUSES, STATUS_LABEL, STATUS_COLOR } from "@/lib/inquiry-status";
import { deleteInquiry, setInquiryRead, setInquiryStatus } from "../actions";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("ar-SA", { dateStyle: "full", timeStyle: "short" }).format(d);
}

export default async function InquiryDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const inquiry = await prisma.inquiry.findUnique({ where: { id } });
  if (!inquiry) notFound();

  // Mark as read on open.
  if (!inquiry.read) {
    await prisma.inquiry.update({ where: { id }, data: { read: true } });
  }

  const rows = [
    { label: "الاسم", value: inquiry.name },
    { label: "البريد الإلكتروني", value: inquiry.email, dir: "ltr" as const },
    { label: "الجوال", value: inquiry.mobile || "—", dir: "ltr" as const },
    { label: "الخدمة", value: inquiry.service || "—" },
    { label: "التاريخ", value: formatDate(inquiry.createdAt) },
  ];

  return (
    <div>
      <Link href="/admin/inquiries" className="mb-4 inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-secondary">
        <Icon name="arrow_forward" className="text-[18px]" />
        رجوع للاستفسارات
      </Link>

      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/15 pb-5">
          <h1 className="text-xl font-head font-bold text-primary">استفسار من {inquiry.name}</h1>
          <div className="flex items-center gap-2">
            <a href={`mailto:${inquiry.email}`} className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 font-head text-sm text-on-secondary hover:bg-secondary-container">
              <Icon name="reply" className="text-[18px]" />
              رد عبر البريد
            </a>
            <form action={setInquiryRead.bind(null, inquiry.id, false)}>
              <button type="submit" className="inline-flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 font-head text-sm text-on-surface-variant hover:bg-surface-container">
                <Icon name="mark_email_unread" className="text-[18px]" />
                تعليم كغير مقروء
              </button>
            </form>
            <DeleteButton action={deleteInquiry.bind(null, inquiry.id)} />
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="font-head text-sm text-on-surface-variant">الحالة:</span>
          <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-medium", STATUS_COLOR[inquiry.status])}>
            {STATUS_LABEL[inquiry.status] ?? inquiry.status}
          </span>
          <div className="flex items-center gap-1">
            {INQUIRY_STATUSES.filter((s) => s !== inquiry.status).map((s) => (
              <form key={s} action={setInquiryStatus.bind(null, inquiry.id, s)}>
                <button type="submit" className="rounded-lg border border-outline-variant px-3 py-1.5 font-head text-xs text-on-surface-variant transition-colors hover:border-secondary hover:text-secondary">
                  نقل إلى: {STATUS_LABEL[s]}
                </button>
              </form>
            ))}
          </div>
        </div>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rows.map((r) => (
            <div key={r.label}>
              <dt className="font-head text-sm text-on-surface-variant">{r.label}</dt>
              <dd className="mt-1 text-primary" dir={r.dir}>{r.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6">
          <dt className="font-head text-sm text-on-surface-variant">الرسالة</dt>
          <p className="mt-2 whitespace-pre-line rounded-lg bg-surface-container-low p-4 leading-loose text-on-surface">
            {inquiry.message}
          </p>
        </div>
      </div>
    </div>
  );
}
