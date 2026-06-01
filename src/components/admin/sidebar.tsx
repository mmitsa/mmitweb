"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icon";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { signOutAction } from "@/app/admin/actions";

const items = [
  { href: "/admin", label: "لوحة المعلومات", icon: "dashboard" },
  { href: "/admin/inquiries", label: "الاستفسارات", icon: "inbox" },
  { href: "/admin/settings", label: "الإعدادات", icon: "settings" },
  { href: "/admin/services", label: "الخدمات", icon: "design_services" },
  { href: "/admin/products", label: "المنتجات", icon: "apps" },
  { href: "/admin/projects", label: "الأعمال", icon: "work" },
  { href: "/admin/partners", label: "الشركاء", icon: "handshake" },
  { href: "/admin/faqs", label: "الأسئلة الشائعة", icon: "quiz" },
  { href: "/admin/advantages", label: "المزايا", icon: "workspace_premium" },
  { href: "/admin/sectors", label: "القطاعات", icon: "domain" },
  { href: "/admin/process", label: "مراحل العمل", icon: "timeline" },
  { href: "/admin/pages", label: "الصفحات", icon: "article" },
  { href: "/admin/users", label: "المستخدمون", icon: "group" },
];

export function AdminSidebar({
  user,
  unread = 0,
}: {
  user?: { name?: string | null; email?: string | null; role?: string };
  unread?: number;
}) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
  const visible = items.filter(
    (it) => it.href !== "/admin/users" || user?.role === "admin"
  );

  return (
    <aside className="flex w-64 flex-shrink-0 flex-col border-l border-outline-variant/30 bg-surface-container-lowest">
      <div className="flex h-16 items-center gap-2 border-b border-outline-variant/30 px-5">
        <Logo className="h-7 w-auto" />
        <span className="font-head font-bold text-primary">لوحة التحكم</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {visible.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 font-head text-sm transition-colors",
              isActive(it.href)
                ? "bg-secondary text-on-secondary"
                : "text-on-surface-variant hover:bg-surface-container"
            )}
          >
            <Icon name={it.icon} className="text-[20px]" />
            <span className="flex-1">{it.label}</span>
            {it.href === "/admin/inquiries" && unread > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-error px-1.5 text-xs font-bold text-on-error">
                {unread}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="border-t border-outline-variant/30 p-3">
        {user && (
          <div className="mb-2 px-3 py-2 text-xs text-on-surface-variant">
            <div className="font-medium text-primary">{user.name}</div>
            <div dir="ltr" className="truncate">{user.email}</div>
          </div>
        )}
        <form action={signOutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-head text-sm text-on-surface-variant transition-colors hover:bg-error-container hover:text-on-error-container"
          >
            <Icon name="logout" className="text-[20px]" />
            تسجيل الخروج
          </button>
        </form>
      </div>
    </aside>
  );
}
