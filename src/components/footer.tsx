import Link from "next/link";
import { Icon } from "@/components/icon";
import { Logo } from "@/components/logo";
import { navItems, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="w-full border-t-4 border-tertiary-fixed-dim bg-primary text-on-primary">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-12 px-5 py-12 md:grid-cols-3 md:px-16">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-2xl font-head font-bold text-on-primary">
            <Logo className="h-9 w-9" />
            <span>{site.name}</span>
          </div>
          <p className="max-w-xs leading-relaxed text-on-primary-fixed-variant">
            شريكك الموثوق في رحلة التحول الرقمي وحلول الاتصالات المتقدمة في
            المملكة.
          </p>
        </div>

        {/* Quick links */}
        <div className="space-y-4">
          <h3 className="text-xl font-head font-semibold">روابط سريعة</h3>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-surface-variant opacity-80 transition-colors hover:text-secondary-fixed-dim"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-xl font-head font-semibold">تواصل ودعم</h3>
          <ul className="space-y-3 text-sm text-surface-variant">
            <li className="flex items-center gap-2">
              <Icon name="call" className="text-[20px] text-secondary-fixed-dim" />
              <a href={`tel:${site.phone}`} dir="ltr" className="hover:text-secondary-fixed-dim">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="mail" className="text-[20px] text-secondary-fixed-dim" />
              <a href={`mailto:${site.email}`} dir="ltr" className="hover:text-secondary-fixed-dim">
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="location_on" className="text-[20px] text-secondary-fixed-dim" />
              <span>الرياض، المملكة العربية السعودية</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-between gap-2 border-t border-on-primary-fixed-variant px-5 py-4 text-center md:flex-row md:px-16">
        <p className="text-sm text-surface-variant opacity-60">
          جميع الحقوق محفوظة لشركة {site.name} © 2024
        </p>
        <Link
          href="/privacy"
          className="text-sm text-surface-variant opacity-80 transition-colors hover:text-secondary-fixed-dim"
        >
          سياسة الخصوصية
        </Link>
      </div>
    </footer>
  );
}
