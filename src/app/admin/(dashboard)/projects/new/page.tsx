import { AdminHeader } from "@/components/admin/page-header";
import { CrudForm } from "@/components/admin/crud-form";
import { prisma } from "@/lib/prisma";
import { createProject } from "../actions";
import { projectFields } from "../fields";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const count = await prisma.project.count();
  return (
    <div>
      <AdminHeader title="إضافة مشروع" />
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <CrudForm fields={projectFields} action={createProject} initial={{ status: "منتهي", category: "تطوير برمجيات", order: count }} cancelHref="/admin/projects" submitLabel="إضافة" />
      </div>
    </div>
  );
}
