"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { projects } from "@/lib/site";

const uniqueClients = Array.from(new Set(projects.map((p) => p.client)));

type Stat = {
  icon: string;
  label: string;
  target?: number;
  prefix?: string;
  text?: string;
};

const stats: Stat[] = [
  { icon: "task_alt", target: projects.length, prefix: "+", label: "مشروع منجز" },
  { icon: "account_balance", target: uniqueClients.length, prefix: "", label: "جهات حكومية" },
  { icon: "apps", target: 7, prefix: "", label: "أنظمة رقمية" },
  { icon: "support_agent", text: "24/7", label: "دعم فني" },
];

function useCountUp(target: number, run: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return value;
}

function StatItem({
  stat,
  run,
}: {
  stat: (typeof stats)[number];
  run: boolean;
}) {
  const count = useCountUp(stat.target ?? 0, run);
  return (
    <div className="group flex flex-col items-center text-center">
      <Icon
        name={stat.icon}
        className="mb-3 text-[34px] text-tertiary-fixed-dim transition-transform group-hover:scale-110"
      />
      <span className="font-head text-4xl font-bold md:text-5xl">
        {stat.text ?? `${stat.prefix ?? ""}${count}`}
      </span>
      <span className="mt-1 text-sm text-on-primary-fixed-variant">{stat.label}</span>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-primary py-16 text-on-primary">
      <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative z-10">
        <div ref={ref} className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <StatItem key={s.label} stat={s} run={run} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ClientsStrip() {
  return (
    <section className="border-y border-outline-variant/30 bg-surface-container-low py-12">
      <Container>
        <p className="mb-8 text-center font-head text-sm font-medium tracking-wide text-on-surface-variant">
          نفخر بثقة الجهات الحكومية والمؤسسات في المملكة
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {uniqueClients.map((c) => (
            <span
              key={c}
              className="rounded-full border border-outline-variant/40 bg-surface-container-lowest px-5 py-2 text-sm text-on-surface-variant transition-colors hover:border-secondary hover:text-primary"
            >
              {c}
            </span>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/partners"
            className="group inline-flex items-center gap-1.5 font-head text-sm font-medium text-secondary hover:text-on-secondary-fixed-variant"
          >
            عرض كل الشركاء
            <Icon name="arrow_back" className="cta-arrow text-[18px]" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
