"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { ImageField } from "@/components/admin/image-field";
import type { CrudState, CrudAction } from "@/components/admin/crud-form";
import {
  BLOCK_DEFS,
  BLOCK_ORDER,
  emptyBlock,
  type Block,
  type BlockType,
} from "@/lib/blocks";

const input =
  "w-full rounded-lg border border-outline-variant bg-surface px-4 py-2.5 text-on-surface focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary";

type Initial = {
  title?: string;
  slug?: string;
  description?: string;
  published?: boolean;
  blocks?: Block[];
};

export function PageEditor({
  action,
  initial = {},
  cancelHref,
  submitLabel = "حفظ",
}: {
  action: CrudAction;
  initial?: Initial;
  cancelHref: string;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState<CrudState, FormData>(action, {});
  const [blocks, setBlocks] = useState<Block[]>(initial.blocks ?? []);
  const [adding, setAdding] = useState(false);

  const patch = (i: number, key: string, value: unknown) =>
    setBlocks((bs) => bs.map((b, idx) => (idx === i ? ({ ...b, [key]: value } as Block) : b)));
  const move = (i: number, dir: -1 | 1) =>
    setBlocks((bs) => {
      const j = i + dir;
      if (j < 0 || j >= bs.length) return bs;
      const copy = [...bs];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
  const remove = (i: number) => setBlocks((bs) => bs.filter((_, idx) => idx !== i));
  const add = (type: BlockType) => {
    setBlocks((bs) => [...bs, emptyBlock(type)]);
    setAdding(false);
  };

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="flex items-center gap-2 rounded-lg border border-error/30 bg-error-container px-4 py-3 text-sm text-on-error-container">
          <Icon name="error" className="text-[20px]" />
          {state.error}
        </div>
      )}

      {/* Page meta */}
      <div className="grid grid-cols-1 gap-5 rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow md:grid-cols-2">
        <div>
          <label className="mb-2 block font-head text-sm text-on-surface-variant">عنوان الصفحة</label>
          <input name="title" defaultValue={initial.title ?? ""} className={input} />
          {state.fieldErrors?.title && <p className="mt-1 text-sm text-error">{state.fieldErrors.title}</p>}
        </div>
        <div>
          <label className="mb-2 block font-head text-sm text-on-surface-variant">المعرّف (slug)</label>
          <input name="slug" dir="ltr" defaultValue={initial.slug ?? ""} className={input} />
          <p className="mt-1 text-xs text-on-surface-variant/70">الرابط: /&lt;slug&gt;</p>
          {state.fieldErrors?.slug && <p className="mt-1 text-sm text-error">{state.fieldErrors.slug}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block font-head text-sm text-on-surface-variant">وصف (للـ SEO، اختياري)</label>
          <input name="description" defaultValue={initial.description ?? ""} className={input} />
        </div>
        <label className="flex items-center gap-3 md:col-span-2">
          <input type="checkbox" name="published" defaultChecked={initial.published ?? false} className="h-5 w-5 rounded border-outline-variant text-secondary focus:ring-secondary" />
          <span className="font-head text-sm text-on-surface">نشر الصفحة (مرئية للزوّار)</span>
        </label>
      </div>

      {/* Blocks */}
      <input type="hidden" name="blocks" value={JSON.stringify(blocks)} />
      <div className="space-y-4">
        <h2 className="font-head text-lg font-semibold text-primary">محتوى الصفحة</h2>

        {blocks.length === 0 && (
          <p className="rounded-xl border border-dashed border-outline-variant/40 p-8 text-center text-on-surface-variant">
            لا توجد بلوكات بعد — أضف أول بلوك بالأسفل.
          </p>
        )}

        {blocks.map((block, i) => {
          const def = BLOCK_DEFS[block.type];
          return (
            <div key={i} className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-5 soft-shadow">
              <div className="mb-4 flex items-center justify-between border-b border-outline-variant/15 pb-3">
                <div className="flex items-center gap-2 font-head font-semibold text-primary">
                  <Icon name={def.icon} className="text-[20px] text-secondary" />
                  {def.label}
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="أعلى" className="flex h-8 w-8 items-center justify-center rounded text-on-surface-variant hover:bg-surface-container disabled:opacity-30">
                    <Icon name="arrow_upward" className="text-[18px]" />
                  </button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === blocks.length - 1} aria-label="أسفل" className="flex h-8 w-8 items-center justify-center rounded text-on-surface-variant hover:bg-surface-container disabled:opacity-30">
                    <Icon name="arrow_downward" className="text-[18px]" />
                  </button>
                  <button type="button" onClick={() => remove(i)} aria-label="حذف" className="flex h-8 w-8 items-center justify-center rounded text-on-surface-variant hover:bg-error-container hover:text-on-error-container">
                    <Icon name="delete" className="text-[18px]" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {def.fields.map((f) => {
                  const value = (block as Record<string, unknown>)[f.name];
                  return (
                    <div key={f.name}>
                      <label className="mb-1.5 block font-head text-sm text-on-surface-variant">{f.label}</label>
                      {f.kind === "text" && (
                        <input value={typeof value === "string" ? value : ""} onChange={(e) => patch(i, f.name, e.target.value)} className={input} />
                      )}
                      {f.kind === "textarea" && (
                        <textarea rows={3} value={typeof value === "string" ? value : ""} onChange={(e) => patch(i, f.name, e.target.value)} className={`${input} resize-y`} />
                      )}
                      {f.kind === "lines" && (
                        <textarea
                          rows={4}
                          value={Array.isArray(value) ? (value as string[]).join("\n") : ""}
                          onChange={(e) => patch(i, f.name, e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
                          className={`${input} resize-y`}
                        />
                      )}
                      {f.kind === "image" && (
                        <ImageField
                          value={typeof value === "string" ? value : ""}
                          onValueChange={(url) => patch(i, f.name, url)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Add block */}
        {adding ? (
          <div className="flex flex-wrap gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-low p-4">
            {BLOCK_ORDER.map((t) => (
              <button key={t} type="button" onClick={() => add(t)} className="inline-flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2 font-head text-sm text-primary transition-colors hover:border-secondary hover:text-secondary">
                <Icon name={BLOCK_DEFS[t].icon} className="text-[18px]" />
                {BLOCK_DEFS[t].label}
              </button>
            ))}
            <button type="button" onClick={() => setAdding(false)} className="px-3 py-2 text-sm text-on-surface-variant">إلغاء</button>
          </div>
        ) : (
          <button type="button" onClick={() => setAdding(true)} className="inline-flex items-center gap-2 rounded-lg border border-dashed border-outline-variant px-5 py-2.5 font-head text-sm text-on-surface-variant transition-colors hover:border-secondary hover:text-secondary">
            <Icon name="add" className="text-[18px]" />
            إضافة بلوك
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 border-t border-outline-variant/15 pt-5">
        <button type="submit" disabled={pending} className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-head text-sm font-medium text-on-secondary shadow-sm transition-colors hover:bg-secondary-container disabled:opacity-60">
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
