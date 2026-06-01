import Link from "next/link";
import { Icon } from "@/components/icon";

export function AdminHeader({
  title,
  description,
  addHref,
  addLabel = "إضافة جديد",
}: {
  title: string;
  description?: string;
  addHref?: string;
  addLabel?: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-head font-bold text-primary">{title}</h1>
        {description && <p className="mt-1 text-on-surface-variant">{description}</p>}
      </div>
      {addHref && (
        <Link
          href={addHref}
          className="inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-2.5 font-head text-sm font-medium text-on-secondary shadow-sm transition-colors hover:bg-secondary-container"
        >
          <Icon name="add" className="text-[18px]" />
          {addLabel}
        </Link>
      )}
    </div>
  );
}
