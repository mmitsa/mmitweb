import type { ZodError } from "zod";

export function zodErrors(error: ZodError): {
  error: string;
  fieldErrors: Record<string, string>;
} {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return { error: "يرجى تصحيح الحقول المميّزة.", fieldErrors };
}

/** Split a textarea value into a trimmed, non-empty string array (one per line). */
export function parseLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}
