import { AdminHeader } from "@/components/admin/page-header";
import { PageEditor } from "@/components/admin/page-editor";
import { createPage } from "../actions";

export const dynamic = "force-dynamic";

export default function NewPage() {
  return (
    <div>
      <AdminHeader title="إضافة صفحة" />
      <PageEditor action={createPage} cancelHref="/admin/pages" submitLabel="إنشاء الصفحة" />
    </div>
  );
}
