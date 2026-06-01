import type { FieldDef } from "@/components/admin/crud-form";

export const projectFields: FieldDef[] = [
  { name: "client", label: "الجهة / العميل" },
  { name: "status", label: "الحالة", kind: "select", options: [
    { value: "قائم", label: "قائم" },
    { value: "منتهي", label: "منتهي" },
  ] },
  { name: "category", label: "التصنيف", kind: "select", options: [
    { value: "تطوير برمجيات", label: "تطوير برمجيات" },
    { value: "أنظمة مراقبة", label: "أنظمة مراقبة" },
    { value: "صيانة تقنية", label: "صيانة تقنية" },
    { value: "توريد وتركيب", label: "توريد وتركيب" },
  ] },
  { name: "order", label: "الترتيب", type: "number", dir: "ltr" },
  { name: "work", label: "وصف العمل", kind: "textarea", full: true },
];
