import { Container } from "@/components/container";
import { PathsBackdrop } from "@/components/paths";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  light,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-head text-sm font-semibold tracking-wide",
        light ? "text-tertiary-fixed-dim" : "text-secondary",
        className
      )}
    >
      <span className="h-2 w-2 rotate-45 bg-current" />
      {children}
    </span>
  );
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <section className="paths-surface relative overflow-hidden border-b border-outline-variant/30 bg-surface-container-lowest py-20 md:py-28">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-40" />
      <PathsBackdrop className="opacity-60" />
      <Container className="relative z-10 text-center">
        <div className="animate-fade-up">
          {eyebrow && (
            <div className="mb-4 flex justify-center">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          )}
          <h1 className="text-4xl font-head font-bold text-primary md:text-5xl">
            {title}
          </h1>
          <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-gradient-to-l from-secondary to-tertiary-fixed-dim" />
          {subtitle && (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  centered,
  className,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(centered ? "text-center" : "text-right", className)}>
      {eyebrow && (
        <div className={cn("mb-3", centered && "flex justify-center")}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="text-3xl font-head font-semibold text-primary md:text-4xl">
        {title}
      </h2>
      <div
        className={cn(
          "mt-3 h-1.5 w-16 rounded-full bg-gradient-to-l from-secondary to-tertiary-fixed-dim",
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
