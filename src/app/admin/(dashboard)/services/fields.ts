import type { FieldDef } from "@/components/admin/crud-form";

export const serviceFields: FieldDef[] = [
  { name: "title", label: "العنوان" },
  { name: "slug", label: "المعرّف (slug)", dir: "ltr", hint: "الرابط: /services/<slug>" },
  { name: "icon", label: "الأيقونة (Material Symbol)", dir: "ltr", hint: "مثل: router، security، dns" },
  { name: "accent", label: "اللون المميّز", kind: "select", options: [
    { value: "secondary", label: "أزرق" },
    { value: "primary", label: "كحلي" },
  ] },
  { name: "order", label: "الترتيب", type: "number", dir: "ltr" },
  { name: "description", label: "وصف مختصر", kind: "textarea" },
  { name: "overview", label: "نظرة عامة", kind: "textarea" },
  { name: "features", label: "المزايا (سطر لكل ميزة)", kind: "lines", hint: "اكتب كل ميزة في سطر مستقل" },
];
