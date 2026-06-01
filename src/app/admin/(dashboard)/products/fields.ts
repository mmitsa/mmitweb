import type { FieldDef } from "@/components/admin/crud-form";

export const productFields: FieldDef[] = [
  { name: "title", label: "الاسم" },
  { name: "slug", label: "المعرّف (slug)", dir: "ltr", hint: "الرابط: /products/<slug>" },
  { name: "icon", label: "الأيقونة (Material Symbol)", dir: "ltr", hint: "مثل: badge، payments" },
  { name: "tagline", label: "الشعار المختصر" },
  { name: "href", label: "رابط النظام (اختياري)", dir: "ltr", hint: "اتركه فارغًا إذا لا يوجد رابط" },
  { name: "order", label: "الترتيب", type: "number", dir: "ltr" },
  { name: "description", label: "وصف مختصر", kind: "textarea" },
  { name: "overview", label: "نظرة عامة", kind: "textarea" },
  { name: "features", label: "المزايا (سطر لكل ميزة)", kind: "lines" },
];
