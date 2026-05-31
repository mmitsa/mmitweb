import { cn } from "@/lib/utils";

/**
 * Brand mark — geometric "M" of مسارات المستكشف (MMIT):
 * a bold blue "M" (two uprights + central V, sharp miter joins) with a
 * black play/arrow element nested at the top-left.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 190"
      role="img"
      aria-label="مسارات المستكشف"
      className={cn("h-9 w-auto", className)}
    >
      <path
        d="M28 168 V24 L110 122 L192 24 V168"
        fill="none"
        stroke="#4e67f0"
        strokeWidth="38"
        strokeLinejoin="miter"
        strokeMiterlimit="12"
      />
      <path d="M58 30 L58 92 L104 61 Z" fill="#0b1020" />
    </svg>
  );
}
