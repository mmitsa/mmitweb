import { cn } from "@/lib/utils";

/**
 * Placeholder brand mark — a geometric "M" inspired by the corporate logo.
 * Replace with the official logo asset when available.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="مسارات المستكشف"
      className={cn("h-9 w-9", className)}
    >
      <rect width="48" height="48" rx="8" fill="#030611" />
      <path
        d="M11 36V14L24 29L37 14V36"
        fill="none"
        stroke="#324cd6"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24 28L24 40L30 34Z" fill="#4cd6ff" />
    </svg>
  );
}
