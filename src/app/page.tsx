import Link from "next/link";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { Icon } from "@/components/icon";
import { Logo } from "@/components/logo";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section";
import { ServiceCard, ProductCard, AdvantageCard } from "@/components/cards";
import { Stats, ClientsStrip } from "@/components/stats";
import { advantages, products, services } from "@/lib/site";

const floatChips = [
  { icon: "security", label: "أمن سيبراني", pos: "top-2 left-0", delay: "0s" },
  { icon: "lan", label: "بنية تحتية", pos: "bottom-6 left-6", delay: "1.4s" },
  { icon: "cloud_done", label: "تحول رقمي", pos: "top-1/3 -right-4", delay: "2.6s" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary text-on-primary">
        <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-70" />
        <div className="bg-diagonal pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-secondary/25 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-tertiary-fixed-dim/15 blur-[100px]" />

        <Container className="relative z-10 py-20 md:py-28">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            {/* Copy */}
            <div className="text-right">
              <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-on-primary/15 bg-on-primary/5 px-4 py-1.5 font-head text-sm text-tertiary-fixed-dim">
                <span className="h-2 w-2 rotate-45 bg-tertiary-fixed-dim" />
                للاتصالات وتقنية المعلومات
              </span>
              <h1
                className="animate-fade-up mt-6 text-4xl font-head font-bold leading-[1.15] md:text-6xl"
                style={{ animationDelay: "0.1s" }}
              >
                نصنع <span className="text-gradient">مسارات رقمية</span>
                <br />
                تقود مؤسستك للمستقبل
              </h1>
              <p
                className="animate-fade-up ml-auto mt-6 max-w-xl text-lg leading-relaxed text-on-primary/75"
                style={{ animationDelay: "0.2s" }}
              >
                شريكك الموثوق في حلول الاتصالات وتقنية المعلومات بالمملكة — من
                البنية التحتية والأمن السيبراني إلى التحول الرقمي والأنظمة الذكية.
              </p>
              <div
                className="animate-fade-up mt-9 flex flex-wrap justify-end gap-4"
                style={{ animationDelay: "0.3s" }}
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded bg-secondary px-8 py-3.5 font-head text-sm font-medium text-on-secondary shadow-glow transition-colors hover:bg-secondary-container"
                >
                  اطلب عرض سعر
                  <Icon name="arrow_back" className="cta-arrow text-[18px]" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded border border-on-primary/25 px-8 py-3.5 font-head text-sm font-medium text-on-primary transition-colors hover:bg-on-primary/10"
                >
                  استعرض خدماتنا
                </Link>
              </div>
              <div
                className="animate-fade-up mt-10 flex flex-wrap items-center justify-end gap-x-8 gap-y-3 text-sm text-on-primary/55"
                style={{ animationDelay: "0.4s" }}
              >
                <span className="flex items-center gap-2">
                  <Icon name="verified" filled className="text-[18px] text-tertiary-fixed-dim" />
                  جودة عالمية
                </span>
                <span className="flex items-center gap-2">
                  <Icon name="account_balance" className="text-[18px] text-tertiary-fixed-dim" />
                  شريك القطاع الحكومي
                </span>
                <span className="flex items-center gap-2">
                  <Icon name="support_agent" className="text-[18px] text-tertiary-fixed-dim" />
                  دعم 24/7
                </span>
              </div>
            </div>

            {/* Visual */}
            <div className="animate-fade-in relative mx-auto hidden aspect-square w-full max-w-md lg:block" style={{ animationDelay: "0.2s" }}>
              <div className="absolute inset-0 rounded-[2rem] border border-on-primary/10 bg-on-primary/[0.03] bg-grid-light" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute h-64 w-64 rounded-full bg-secondary/30 blur-3xl" />
                <div className="animate-float relative">
                  <Logo className="h-72 w-auto drop-shadow-2xl" />
                </div>
              </div>
              {floatChips.map((c) => (
                <div
                  key={c.label}
                  className={`animate-float absolute ${c.pos} flex items-center gap-2 rounded-xl border border-on-primary/10 bg-primary-container/80 px-4 py-2.5 text-sm shadow-xl backdrop-blur`}
                  style={{ animationDelay: c.delay }}
                >
                  <Icon name={c.icon} className="text-[20px] text-tertiary-fixed-dim" />
                  {c.label}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <Stats />

      {/* ── Why us ───────────────────────────────────────── */}
      <section className="bg-surface-container-low py-20">
        <Container>
          <Reveal>
            <SectionHeading title="لماذا مسارات؟" eyebrow="ميزتنا" centered />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a, i) => (
              <Reveal key={a.title} delay={i * 90}>
                <AdvantageCard advantage={a} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Services ─────────────────────────────────────── */}
      <section className="bg-background py-20">
        <Container>
          <Reveal>
            <SectionHeading
              title="خدماتنا"
              eyebrow="ماذا نقدّم"
              subtitle="مجموعة متكاملة من الحلول التقنية المتقدمة، مصممة لتلبية احتياجات قطاع الأعمال."
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex justify-start">
            <ButtonLink href="/services" variant="outline" className="group">
              <span>عرض كل الخدمات</span>
              <Icon name="arrow_back" className="cta-arrow text-[18px]" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* ── Products ─────────────────────────────────────── */}
      <section className="bg-surface py-20">
        <Container>
          <Reveal>
            <SectionHeading
              title="منتجاتنا"
              eyebrow="منظومة مسارات"
              subtitle="أنظمة رقمية جاهزة لإدارة أعمالك بذكاء وكفاءة."
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex justify-start">
            <ButtonLink href="/products" variant="outline" className="group">
              <span>عرض كل المنتجات</span>
              <Icon name="arrow_back" className="cta-arrow text-[18px]" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* ── Clients ──────────────────────────────────────── */}
      <ClientsStrip />

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-secondary py-20 text-on-secondary">
        <div className="bg-diagonal pointer-events-none absolute inset-0 opacity-60" />
        <Container className="relative z-10 text-center">
          <Reveal>
            <h2 className="text-3xl font-head font-bold text-on-secondary md:text-4xl">
              هل أنت مستعد للبدء في رحلة التحول الرقمي؟
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-on-secondary/90">
              دعنا نساعدك في تحقيق أهدافك التقنية. تواصل مع فريقنا اليوم للحصول
              على استشارة مجانية وعرض سعر يناسب احتياجاتك.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-on-secondary px-8 py-3.5 font-head text-sm font-medium text-secondary shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <span>اطلب عرض سعر الآن</span>
                <Icon name="arrow_back" className="cta-arrow text-[18px]" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
