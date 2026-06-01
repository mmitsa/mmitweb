"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";

export type CrudState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

export type FieldDef = {
  name: string;
  label: string;
  kind?: "text" | "textarea" | "select" | "lines" | "checkbox";
  type?: string;
  dir?: "ltr" | "rtl";
  options?: { value: string; label: string }[];
  hint?: string;
  full?: boolean;
  required?: boolean;
};

export type CrudAction = (
  prev: CrudState,
  formData: FormData
) => Promise<CrudState>;

const inputClasses =
  "w-full rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-on-surface focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary";

export function CrudForm({
  fields,
  action,
  initial = {},
  cancelHref,
  submitLabel = "حفظ",
}: {
  fields: FieldDef[];
  action: CrudAction;
  initial?: Record<string, unknown>;
  cancelHref: string;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState<CrudState, FormData>(
    action,
    {}
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="flex items-center gap-2 rounded-lg border border-error/30 bg-error-container px-4 py-3 text-sm text-on-error-container">
          <Icon name="error" className="text-[20px]" />
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {fields.map((f) => {
          const err = state.fieldErrors?.[f.name];
          const raw = initial[f.name];
          const kind = f.kind ?? "text";
          return (
            <div key={f.name} className={f.full || kind === "lines" || kind === "textarea" ? "md:col-span-2" : ""}>
              {kind !== "checkbox" && (
                <label htmlFor={f.name} className="mb-2 block font-head text-sm text-on-surface-variant">
                  {f.label}
                </label>
              )}

              {kind === "text" && (
                <input id={f.name} name={f.name} type={f.type ?? "text"} dir={f.dir} defaultValue={raw == null ? "" : String(raw)} className={inputClasses} />
              )}

              {kind === "textarea" && (
                <textarea id={f.name} name={f.name} rows={4} dir={f.dir} defaultValue={raw == null ? "" : String(raw)} className={`${inputClasses} resize-y`} />
              )}

              {kind === "lines" && (
                <textarea id={f.name} name={f.name} rows={6} dir={f.dir} defaultValue={Array.isArray(raw) ? raw.join("\n") : ""} className={`${inputClasses} resize-y`} />
              )}

              {kind === "select" && (
                <select id={f.name} name={f.name} defaultValue={raw == null ? "" : String(raw)} className={inputClasses}>
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              )}

              {kind === "checkbox" && (
                <label className="flex items-center gap-3 py-2">
                  <input id={f.name} name={f.name} type="checkbox" defaultChecked={Boolean(raw)} className="h-5 w-5 rounded border-outline-variant text-secondary focus:ring-secondary" />
                  <span className="font-head text-sm text-on-surface">{f.label}</span>
                </label>
              )}

              {f.hint && <p className="mt-1 text-xs text-on-surface-variant/70">{f.hint}</p>}
              {err && <p className="mt-1 text-sm text-error">{err}</p>}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-head text-sm font-medium text-on-secondary shadow-sm transition-colors hover:bg-secondary-container disabled:opacity-60"
        >
          {pending ? "جارٍ الحفظ..." : submitLabel}
          <Icon name={pending ? "progress_activity" : "save"} className={pending ? "animate-spin text-[18px]" : "text-[18px]"} />
        </button>
        <Link href={cancelHref} className="rounded-lg border border-outline-variant px-6 py-3 font-head text-sm text-on-surface-variant transition-colors hover:bg-surface-container">
          إلغاء
        </Link>
      </div>
    </form>
  );
}
