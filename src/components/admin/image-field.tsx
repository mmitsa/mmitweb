"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/icon";

export function ImageField({
  name,
  defaultValue = "",
  value,
  onValueChange,
}: {
  name?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (url: string) => void;
}) {
  const controlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const current = controlled ? value : internal;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const set = (url: string) => {
    if (controlled) onValueChange?.(url);
    else setInternal(url);
  };

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (res.ok) set(json.url);
      else setError(json.error ?? "فشل الرفع");
    } catch {
      setError("تعذّر الاتصال");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      {name && <input type="hidden" name={name} value={current} />}
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-outline-variant/40 bg-surface-container">
          {current ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={current} alt="" className="max-h-full max-w-full object-contain" />
          ) : (
            <Icon name="image" className="text-[28px] text-outline" />
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 font-head text-sm text-primary transition-colors hover:bg-surface-container disabled:opacity-60"
          >
            <Icon name={busy ? "progress_activity" : "upload"} className={busy ? "animate-spin text-[18px]" : "text-[18px]"} />
            {busy ? "جارٍ الرفع..." : "رفع صورة"}
          </button>
          {current && (
            <button
              type="button"
              onClick={() => set("")}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 font-head text-sm text-on-surface-variant hover:bg-error-container hover:text-on-error-container"
            >
              <Icon name="close" className="text-[18px]" />
              إزالة
            </button>
          )}
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onPick} />
    </div>
  );
}
