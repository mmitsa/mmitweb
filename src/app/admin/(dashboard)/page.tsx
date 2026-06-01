import Link from "next/link";
import { Icon } from "@/components/icon";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [services, products, projects, partners, faqs, advantages, sectors, processSteps, pages, users] =
    await Promise.all([
      prisma.service.count(),
      prisma.product.count(),
      prisma.project.count(),
      prisma.partner.count(),
      prisma.faq.count(),
      prisma.advantage.count(),
      prisma.sector.count(),
      prisma.processStep.count(),
      prisma.page.count(),
      prisma.user.count(),
    ]);

  const cards = [
    { label: "الخدمات", count: services, href: "/admin/services", icon: "design_services" },
    { label: "المنتجات", count: products, href: "/admin/products", icon: "apps" },
    { label: "الأعمال", count: projects, href: "/admin/projects", icon: "work" },
    { label: "الشركاء", count: partners, href: "/admin/partners", icon: "handshake" },
    { label: "الأسئلة الشائعة", count: faqs, href: "/admin/faqs", icon: "quiz" },
    { label: "المزايا", count: advantages, href: "/admin/advantages", icon: "workspace_premium" },
    { label: "القطاعات", count: sectors, href: "/admin/sectors", icon: "domain" },
    { label: "مراحل العمل", count: processSteps, href: "/admin/process", icon: "timeline" },
    { label: "الصفحات", count: pages, href: "/admin/pages", icon: "article" },
    { label: "المستخدمون", count: users, href: "/admin/users", icon: "group" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-head font-bold text-primary">لوحة المعلومات</h1>
      <p className="mt-1 text-on-surface-variant">نظرة عامة على محتوى الموقع.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group flex items-center justify-between rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-5 soft-shadow transition-all hover:-translate-y-0.5 hover:border-secondary"
          >
            <div>
              <div className="text-sm text-on-surface-variant">{c.label}</div>
              <div className="mt-1 font-head text-3xl font-bold text-primary">{c.count}</div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-fixed text-secondary">
              <Icon name={c.icon} className="text-[26px]" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-lg border border-outline-variant px-5 py-2.5 font-head text-sm text-primary transition-colors hover:bg-surface-container"
        >
          <Icon name="open_in_new" className="text-[18px]" />
          عرض الموقع
        </Link>
        <Link
          href="/admin/settings"
          className="inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-2.5 font-head text-sm text-on-secondary transition-colors hover:bg-secondary-container"
        >
          <Icon name="settings" className="text-[18px]" />
          إعدادات الموقع
        </Link>
      </div>
    </div>
  );
}
