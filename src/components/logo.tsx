import { cn } from "@/lib/utils";

/**
 * Official brand mark. Renders the asset from /public/brand as-is.
 * Replace the files in public/brand/ with the official exports (same
 * filenames) and the logo updates everywhere with no code changes.
 *
 * tone="color" → for light backgrounds (header, hero)
 * tone="white" → for dark backgrounds (footer)
 */
export function Logo({
  className,
  tone = "color",
}: {
  className?: string;
  tone?: "color" | "white";
}) {
  const src = tone === "white" ? "/brand/logo-mark-white.svg" : "/brand/logo-mark.svg";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="مسارات المستكشف"
      className={cn("h-9 w-auto select-none", className)}
      draggable={false}
    />
  );
}
