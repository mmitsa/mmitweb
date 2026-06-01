import type { FieldDef } from "@/components/admin/crud-form";

export const partnerFields: FieldDef[] = [
  { name: "name", label: "اسم الجهة" },
  { name: "sector", label: "القطاع" },
  { name: "icon", label: "الأيقونة (Material Symbol)", dir: "ltr", hint: "مثل: account_balance" },
  { name: "logo", label: "شعار الجهة (اختياري)", kind: "image", hint: "ارفع شعارًا، أو اتركه فارغًا لاستخدام الأيقونة" },
  { name: "order", label: "الترتيب", type: "number", dir: "ltr" },
];
