"use client";

import { useActionState } from "react";
import { Icon } from "@/components/icon";
import {
  updateSettings,
  type SettingsState,
} from "@/app/admin/(dashboard)/settings/actions";

type Values = {
  name: string;
  tagline: string;
  url: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  address: string;
};

const fields: { name: keyof Values; label: string; dir?: "ltr"; type?: string }[] = [
  { name: "name", label: "اسم الشركة" },
  { name: "tagline", label: "الوصف المختصر" },
  { name: "url", label: "رابط الموقع", dir: "ltr", type: "url" },
  { name: "email", label: "البريد الإلكتروني", dir: "ltr", type: "email" },
  { name: "phone", label: "رقم الهاتف (للروابط)", dir: "ltr" },
  { name: "phoneDisplay", label: "رقم الهاتف (للعرض)", dir: "ltr" },
  { name: "whatsapp", label: "رقم واتساب (دولي)", dir: "ltr" },
  { name: "address", label: "العنوان" },
];

const inputClasses =
  "w-full rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-on-surface focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary";

export function SettingsForm({ values }: { values: Values }) {
  const [state, action, pending] = useActionState<SettingsState, FormData>(
    updateSettings,
    {}
  );

  return (
    <form action={action} className="space-y-5">
      {state.ok && (
        <div className="flex items-center gap-2 rounded-lg border border-secondary/30 bg-secondary-fixed/40 px-4 py-3 text-sm text-on-secondary-fixed">
          <Icon name="check_circle" className="text-[20px]" />
          تم حفظ الإعدادات بنجاح.
        </div>
      )}
      {state.error && (
        <div className="flex items-center gap-2 rounded-lg border border-error/30 bg-error-container px-4 py-3 text-sm text-on-error-container">
          <Icon name="error" className="text-[20px]" />
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className={f.name === "address" ? "md:col-span-2" : ""}>
            <label htmlFor={f.name} className="mb-2 block font-head text-sm text-on-surface-variant">
              {f.label}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type ?? "text"}
              dir={f.dir}
              defaultValue={values[f.name]}
              className={inputClasses}
            />
            {state.fieldErrors?.[f.name] && (
              <p className="mt-1 text-sm text-error">{state.fieldErrors[f.name]}</p>
            )}
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-head text-sm font-medium text-on-secondary shadow-sm transition-colors hover:bg-secondary-container disabled:opacity-60"
      >
        {pending ? "جارٍ الحفظ..." : "حفظ التغييرات"}
        <Icon name={pending ? "progress_activity" : "save"} className={pending ? "animate-spin text-[18px]" : "text-[18px]"} />
      </button>
    </form>
  );
}
