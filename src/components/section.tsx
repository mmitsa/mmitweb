import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

export function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-outline-variant/30 bg-surface-container-lowest py-20 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(#324cd6 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <Container className="relative z-10 text-center">
        <h1 className="text-4xl font-head font-bold text-primary md:text-5xl">
          {title}
        </h1>
        <div className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-secondary" />
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
  centered,
  className,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(centered ? "text-center" : "text-right", className)}>
      <h2 className="text-3xl font-head font-semibold text-primary">{title}</h2>
      <div
        className={cn(
          "mt-3 h-1.5 w-16 rounded-full bg-secondary",
          centered && "mx-auto"
        )}
      />
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl leading-relaxed text-on-surface-variant",
            centered && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
