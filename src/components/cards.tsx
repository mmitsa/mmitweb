import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";
import type { Advantage, Product, Service } from "@/lib/site";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-xl border-t-4 bg-surface-container-lowest p-6 soft-shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        service.accent === "secondary" ? "border-secondary" : "border-primary"
      )}
    >
      <div
        className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-full",
          service.accent === "secondary"
            ? "bg-secondary-fixed text-secondary"
            : "bg-primary-fixed text-primary"
        )}
      >
        <Icon name={service.icon} />
      </div>
      <h3 className="mb-2 text-xl font-head font-semibold text-primary">
        {service.title}
      </h3>
      <p className="flex-grow leading-relaxed text-on-surface-variant">
        {service.description}
      </p>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 text-center soft-shadow transition-transform hover:-translate-y-1">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-fixed text-secondary">
        <Icon name={product.icon} className="text-4xl" />
      </div>
      <h3 className="mb-2 text-xl font-head font-semibold text-primary">
        {product.title}
      </h3>
      <p className="mb-6 flex-grow text-sm text-on-surface-variant">
        {product.description}
      </p>
      {product.href ? (
        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full rounded border border-secondary py-2 font-head text-sm text-secondary transition-colors hover:bg-secondary hover:text-on-secondary"
        >
          استكشف
        </a>
      ) : (
        <span className="w-full rounded border border-outline-variant py-2 text-center font-head text-sm text-on-surface-variant">
          قريبًا
        </span>
      )}
    </div>
  );
}

export function AdvantageCard({ advantage }: { advantage: Advantage }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-outline-variant/10 bg-surface-container-lowest p-6 text-center shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 rounded-full bg-secondary/10 p-3">
        <Icon name={advantage.icon} filled className="text-[32px] text-secondary" />
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
