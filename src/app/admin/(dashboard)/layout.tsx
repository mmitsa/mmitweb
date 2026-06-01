import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { getUnreadInquiryCount } from "@/lib/data";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  const unread = await getUnreadInquiryCount();

  return (
    <div className="flex min-h-screen bg-surface-container-low" dir="rtl">
      <AdminSidebar user={session.user} unread={unread} />
      <div className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
      </div>
    </div>
  );
}
