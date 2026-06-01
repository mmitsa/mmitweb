import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/page-header";
import { CrudForm } from "@/components/admin/crud-form";
import { prisma } from "@/lib/prisma";
import { updateProject } from "../actions";
import { projectFields } from "../fields";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <div>
      <AdminHeader title="تعديل مشروع" description={project.client} />
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <CrudForm fields={projectFields} action={updateProject.bind(null, id)} initial={project} cancelHref="/admin/projects" submitLabel="حفظ التغييرات" />
      </div>
    </div>
  );
}
