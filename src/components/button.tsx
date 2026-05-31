import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "outline-light";

const base =
  "inline-flex items-center justify-center gap-2 rounded px-6 py-3 text-sm font-medium font-head transition-colors duration-200 shadow-sm";

const variants: Record<Variant, string> = {
  primary: "bg-secondary text-on-secondary hover:bg-secondary-container",
  dark: "bg-primary text-on-primary hover:bg-primary-container",
  outline:
    "border border-primary text-primary shadow-none hover:bg-surface-container-low",
  "outline-light":
    "border-2 border-secondary text-secondary shadow-none hover:bg-secondary-fixed",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className">;

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const classes = cn(base, variants[variant], className);

  if (isExternal) {
    return (
      <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
