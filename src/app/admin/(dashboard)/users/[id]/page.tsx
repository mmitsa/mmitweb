import { notFound, redirect } from "next/navigation";
import { AdminHeader } from "@/components/admin/page-header";
import { CrudForm } from "@/components/admin/crud-form";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { updateUser } from "../actions";
import { userFields } from "../fields";

export const dynamic = "force-dynamic";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (session?.user?.role !== "admin") redirect("/admin");

  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) notFound();

  return (
    <div>
      <AdminHeader title="تعديل مستخدم" description={user.name} />
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <CrudForm
          fields={userFields}
          action={updateUser.bind(null, id)}
          initial={{ name: user.name, email: user.email, role: user.role, password: "" }}
          cancelHref="/admin/users"
          submitLabel="حفظ التغييرات"
        />
      </div>
    </div>
  );
}
