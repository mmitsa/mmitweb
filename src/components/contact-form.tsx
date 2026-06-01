"use client";

import { useActionState } from "react";
import { Icon } from "@/components/icon";
import { submitContact, type ContactState } from "@/app/(site)/contact/actions";

const serviceOptions = [
  "تطوير مواقع الويب",
  "تطبيقات الجوال",
  "أنظمة إدارة الموارد (ERP)",
  "حلول الاتصالات والشبكات",
  "الأمن السيبراني",
  "استشارات تقنية",
  "أخرى",
];

const initialState: ContactState = { status: "idle" };

const inputClasses =
  "w-full rounded border border-outline-variant bg-surface px-4 py-2 text-on-surface focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-error">{message}</p>;
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState
  );

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border-t-4 border-secondary bg-surface-container-lowest p-10 text-center soft-shadow">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-fixed text-secondary">
          <Icon name="check" className="text-4xl" />
        </div>
        <h2 className="text-2xl font-head font-semibold text-primary">
          تم استلام رسالتك
        </h2>
        <p className="mt-2 text-on-surface-variant">
          {state.message ?? "شكرًا لتواصلك معنا، سيقوم فريقنا بالرد عليك في أقرب وقت."}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-t-4 border-secondary bg-surface-container-lowest p-6 soft-shadow md:p-8">
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-head font-semibold text-primary">
        <Icon name="mail" className="text-tertiary-fixed-dim" />
        أرسل لنا رسالة
      </h2>

      {state.status === "error" && state.message && (
        <div className="mb-6 flex items-center gap-2 rounded border border-error/30 bg-error-container px-4 py-3 text-sm text-on-error-container">
          <Icon name="error" className="text-[20px]" />
          {state.message}
        </div>
      )}

      <form className="space-y-6" action={formAction}>
        {/* Honeypot — hidden from real users, traps bots */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label htmlFor="company">الشركة</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block font-head text-sm text-on-surface-variant">
              الاسم الكامل
            </label>
            <input id="name" name="name" type="text" required placeholder="أدخل اسمك" className={inputClasses} />
            <FieldError message={state.errors?.name} />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block font-head text-sm text-on-surface-variant">
              البريد الإلكتروني
            </label>
            <input id="email" name="email" type="email" required dir="ltr" placeholder="example@domain.com" className={inputClasses} />
            <FieldError message={state.errors?.email} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="mobile" className="mb-2 block font-head text-sm text-on-surface-variant">
              رقم الجوال
            </label>
            <input id="mobile" name="mobile" type="tel" dir="ltr" placeholder="05x xxx xxxx" className={inputClasses} />
          </div>
          <div>
            <label htmlFor="service" className="mb-2 block font-head text-sm text-on-surface-variant">
              نوع الخدمة
            </label>
            <select id="service" name="service" defaultValue="" className={inputClasses}>
              <option value="" disabled>
                اختر الخدمة المطلوبة...
              </option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block font-head text-sm text-on-surface-variant">
            رسالتك
          </label>
          <textarea id="message" name="message" rows={5} required placeholder="اكتب تفاصيل مشروعك أو استفسارك هنا..." className={`${inputClasses} resize-none`} />
          <FieldError message={state.errors?.message} />
        </div>
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded bg-secondary px-8 py-3 font-head text-sm text-on-secondary shadow-sm transition-colors hover:bg-secondary-container disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
          >
            {isPending ? "جارٍ الإرسال..." : "إرسال الرسالة"}
            <Icon name={isPending ? "progress_activity" : "send"} className={isPending ? "animate-spin text-sm" : "text-sm"} />
          </button>
        </div>
      </form>
    </div>
  );
}
