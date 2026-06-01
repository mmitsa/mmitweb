import Link from "next/link";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";
import type { Advantage } from "@/lib/site";
import type { Product, Service } from "@prisma/client";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "card-hover group flex h-full flex-col rounded-xl border border-outline-variant/15 border-t-4 bg-surface-container-lowest p-6 soft-shadow",
        service.accent === "secondary" ? "border-t-secondary" : "border-t-primary"
      )}
    >
      <div
        className={cn(
          "mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
          service.accent === "secondary"
            ? "bg-secondary-fixed text-secondary"
            : "bg-primary-fixed text-primary"
        )}
      >
        <Icon name={service.icon} className="text-[28px]" />
      </div>
      <h3 className="mb-2 text-xl font-head font-semibold text-primary">
        {service.title}
      </h3>
      <p className="flex-grow leading-relaxed text-on-surface-variant">
        {service.description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 font-head text-sm font-medium text-secondary">
        التفاصيل
        <Icon name="arrow_back" className="cta-arrow text-[18px]" />
      </span>
    </Link>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card-hover group flex flex-col items-center rounded-xl border border-outline-variant/15 bg-surface-container-lowest p-6 text-center soft-shadow">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-fixed to-tertiary-fixed text-secondary transition-transform group-hover:scale-110">
        <Icon name={product.icon} className="text-4xl" />
      </div>
      <h3 className="mb-2 text-xl font-head font-semibold text-primary">
        {product.title}
      </h3>
      <p className="mb-6 flex-grow text-sm text-on-surface-variant">
        {product.description}
      </p>
      <Link
        href={`/products/${product.slug}`}
        className="inline-flex w-full items-center justify-center gap-1 rounded border border-secondary py-2.5 font-head text-sm text-secondary transition-colors hover:bg-secondary hover:text-on-secondary"
      >
        التفاصيل
        <Icon name="arrow_back" className="cta-arrow text-[18px]" />
      </Link>
    </div>
  );
}

export function AdvantageCard({ advantage }: { advantage: Advantage }) {
  return (
    <div className="card-hover group flex flex-col items-center rounded-xl border border-outline-variant/15 bg-surface-container-lowest p-6 text-center soft-shadow">
      <div className="mb-4 rounded-2xl bg-secondary/10 p-4 transition-colors group-hover:bg-secondary/15">
        <Icon name={advantage.icon} filled className="text-[34px] text-secondary" />
      </div>
      <h3 className="mb-2 text-xl font-head font-semibold text-primary">
        {advantage.title}
      </h3>
      <p className="leading-relaxed text-on-surface-variant">
        {advantage.description}
      </p>
    </div>
  );
}
