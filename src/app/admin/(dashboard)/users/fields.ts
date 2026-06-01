import type { FieldDef } from "@/components/admin/crud-form";

export const userFields: FieldDef[] = [
  { name: "name", label: "الاسم" },
  { name: "email", label: "البريد الإلكتروني", dir: "ltr", type: "email" },
  { name: "role", label: "الدور", kind: "select", options: [
    { value: "admin", label: "مدير (صلاحيات كاملة)" },
    { value: "editor", label: "محرّر (تعديل المحتوى)" },
  ] },
  { name: "password", label: "كلمة المرور", dir: "ltr", type: "password", hint: "٨ أحرف على الأقل — عند التعديل اتركها فارغة للإبقاء على الحالية" },
];
