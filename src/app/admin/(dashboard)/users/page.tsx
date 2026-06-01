import Link from "next/link";
import { redirect } from "next/navigation";
import { Icon } from "@/components/icon";
import { AdminHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { deleteUser } from "./actions";

export const dynamic = "force-dynamic";

export default async function UsersAdmin() {
  const session = await auth();
  if (session?.user?.role !== "admin") redirect("/admin");

  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <AdminHeader title="المستخدمون" description={`${users.length} مستخدم`} addHref="/admin/users/new" addLabel="إضافة مستخدم" />
      <div className="overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest soft-shadow">
        <table className="w-full text-right">
          <thead className="border-b border-outline-variant/20 bg-surface-container-low">
            <tr>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">الاسم</th>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">البريد</th>
              <th className="px-5 py-3 font-head text-sm text-on-surface-variant">الدور</th>
              <th className="w-px px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50">
                <td className="px-5 py-3 font-medium text-primary">
                  {u.name}
                  {u.id === session.user?.id && <span className="mr-2 text-xs text-on-surface-variant">(أنت)</span>}
                </td>
                <td className="px-5 py-3 text-sm text-on-surface-variant" dir="ltr">{u.email}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${u.role === "admin" ? "bg-secondary text-on-secondary" : "bg-surface-container text-on-surface-variant"}`}>
                    {u.role === "admin" ? "مدير" : "محرّر"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/users/${u.id}`} aria-label="تعديل" className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-secondary">
                      <Icon name="edit" className="text-[20px]" />
                    </Link>
                    {u.id !== session.user?.id && <DeleteButton action={deleteUser.bind(null, u.id)} />}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
