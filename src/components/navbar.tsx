"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";
import { navItems, site } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between px-5 md:px-16">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-head font-bold text-primary transition-opacity hover:opacity-80"
        >
          <Icon name="explore" filled className="text-secondary" />
          <span>{site.name}</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "font-head text-sm transition-colors duration-200",
                  isActive(item.href)
                    ? "border-b-2 border-secondary pb-1 font-bold text-secondary"
                    : "text-on-surface-variant hover:text-secondary"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Trailing CTA */}
        <Link
          href="/contact"
          className="hidden rounded bg-secondary px-6 py-2 font-head text-sm text-on-secondary shadow-sm transition-colors hover:bg-secondary-container md:inline-flex"
        >
          اطلب عرض سعر
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="القائمة"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="p-2 text-primary md:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="text-[28px]" />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-outline-variant/30 bg-surface md:hidden">
          <ul className="mx-auto flex max-w-[1280px] flex-col px-5 py-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded px-3 py-3 font-head text-sm transition-colors",
                    isActive(item.href)
                      ? "bg-secondary-fixed/40 font-bold text-secondary"
                      : "text-on-surface-variant hover:bg-surface-container"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block rounded bg-secondary px-3 py-3 text-center font-head text-sm text-on-secondary"
              >
                اطلب عرض سعر
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
