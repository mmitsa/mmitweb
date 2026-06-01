import type { FieldDef } from "@/components/admin/crud-form";

export const faqFields: FieldDef[] = [
  { name: "question", label: "السؤال", full: true },
  { name: "answer", label: "الإجابة", kind: "textarea", full: true },
  { name: "order", label: "الترتيب", type: "number", dir: "ltr" },
];
