"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";
import { projectCategories, projects, type ProjectCategory } from "@/lib/site";

const categoryIcons: Record<ProjectCategory, string> = {
  "تطوير برمجيات": "code",
  "أنظمة مراقبة": "videocam",
  "صيانة تقنية": "build",
  "توريد وتركيب": "inventory_2",
};

type CategoryFilter = "الكل" | ProjectCategory;
type StatusFilter = "الكل" | "قائم" | "منتهي";

export function PortfolioExplorer() {
  const [category, setCategory] = useState<CategoryFilter>("الكل");
  const [status, setStatus] = useState<StatusFilter>("الكل");

  const stats = useMemo(() => {
    const clients = new Set(projects.map((p) => p.client));
    const active = projects.filter((p) => p.status === "قائم").length;
    return { total: projects.length, active, clients: clients.size };
  }, []);

  const filtered = projects.filter(
    (p) =>
      (category === "الكل" || p.category === category) &&
      (status === "الكل" || p.status === status)
  );

  return (
    <div className="space-y-10">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { value: `+${stats.total}`, label: "مشروع منجز", icon: "task_alt" },
          { value: stats.clients, label: "جهة حكومية", icon: "account_balance" },
          { value: stats.active, label: "مشروع قائم", icon: "bolt" },
        ].map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-5 text-center soft-shadow"
          >
            <Icon name={s.icon} className="mb-2 text-[28px] text-secondary" />
            <span className="font-head text-3xl font-bold text-primary">{s.value}</span>
            <span className="mt-1 text-xs text-on-surface-variant md:text-sm">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {(["الكل", ...projectCategories] as CategoryFilter[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-4 py-2 font-head text-sm transition-colors",
                category === c
                  ? "border-primary bg-primary text-on-primary"
                  : "border-outline text-on-surface-variant hover:bg-surface-container"
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {(["الكل", "قائم", "منتهي"] as StatusFilter[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={cn(
                "rounded px-3 py-1.5 font-head text-sm transition-colors",
                status === s
                  ? "bg-secondary text-on-secondary"
                  : "text-on-surface-variant hover:bg-surface-container"
              )}
            >
              {s}
            </button>
          ))}
          <span className="ms-auto text-sm text-on-surface-variant">
            {filtered.length} مشروع
          </span>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-on-surface-variant">
          لا توجد مشاريع مطابقة للتصفية.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => {
            const active = p.status === "قائم";
            return (
              <div
                key={`${p.client}-${i}`}
                className={cn(
                  "flex h-full flex-col rounded-xl border-t-4 bg-surface-container-lowest p-6 soft-shadow transition-shadow hover:shadow-lg",
                  active ? "border-secondary" : "border-outline-variant"
                )}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-container text-secondary">
                    <Icon name={categoryIcons[p.category]} />
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
                      active
                        ? "bg-secondary text-on-secondary"
                        : "bg-surface-container text-on-surface-variant"
                    )}
                  >
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-on-secondary" />}
                    {p.status}
                  </span>
                </div>
                <h3 className="mb-2 font-head text-lg font-semibold leading-snug text-primary">
                  {p.work}
                </h3>
                <p className="mt-auto flex items-center gap-1.5 pt-2 text-sm text-on-surface-variant">
                  <Icon name="apartment" className="text-[18px]" />
                  {p.client}
                </p>
                <span className="mt-3 inline-block w-fit rounded bg-surface-container-low px-2 py-1 text-xs text-on-surface-variant">
                  {p.category}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
