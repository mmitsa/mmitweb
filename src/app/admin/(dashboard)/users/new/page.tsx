import { redirect } from "next/navigation";
import { AdminHeader } from "@/components/admin/page-header";
import { CrudForm } from "@/components/admin/crud-form";
import { auth } from "@/auth";
import { createUser } from "../actions";
import { userFields } from "../fields";

export const dynamic = "force-dynamic";

export default async function NewUserPage() {
  const session = await auth();
  if (session?.user?.role !== "admin") redirect("/admin");

  return (
    <div>
      <AdminHeader title="إضافة مستخدم" />
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 soft-shadow">
        <CrudForm fields={userFields} action={createUser} initial={{ role: "editor" }} cancelHref="/admin/users" submitLabel="إضافة" />
      </div>
    </div>
  );
}
