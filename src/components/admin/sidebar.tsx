"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icon";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { signOutAction } from "@/app/admin/actions";

const items = [
  { href: "/admin", label: "لوحة المعلومات", icon: "dashboard" },
  { href: "/admin/settings", label: "الإعدادات", icon: "settings" },
  { href: "/admin/services", label: "الخدمات", icon: "design_services" },
  { href: "/admin/products", label: "المنتجات", icon: "apps" },
  { href: "/admin/projects", label: "الأعمال", icon: "work" },
  { href: "/admin/partners", label: "الشركاء", icon: "handshake" },
  { href: "/admin/faqs", label: "الأسئلة الشائعة", icon: "quiz" },
  { href: "/admin/pages", label: "الصفحات", icon: "article" },
  { href: "/admin/users", label: "المستخدمون", icon: "group" },
];

export function AdminSidebar({ user }: { user?: { name?: string | null; email?: string | null } }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="flex w-64 flex-shrink-0 flex-col border-l border-outline-variant/30 bg-surface-container-lowest">
      <div className="flex h-16 items-center gap-2 border-b border-outline-variant/30 px-5">
        <Logo className="h-7 w-auto" />
        <span className="font-head font-bold text-primary">لوحة التحكم</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {items.map((it) => (
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
            {it.label}
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
