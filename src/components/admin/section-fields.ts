import type { FieldDef } from "@/components/admin/crud-form";

export const sectionFields: FieldDef[] = [
  { name: "icon", label: "الأيقونة (Material Symbol)", dir: "ltr", hint: "مثل: verified، bolt، lightbulb" },
  { name: "title", label: "العنوان" },
  { name: "order", label: "الترتيب", type: "number", dir: "ltr" },
  { name: "description", label: "الوصف", kind: "textarea", full: true },
];
