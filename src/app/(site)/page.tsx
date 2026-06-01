import Link from "next/link";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { Icon } from "@/components/icon";
import { PathsNetwork, PathsBackdrop } from "@/components/paths";
import { Reveal } from "@/components/reveal";
import { Eyebrow, SectionHeading } from "@/components/section";
import { ServiceCard, ProductCard, AdvantageCard } from "@/components/cards";
import { Stats, ClientsStrip } from "@/components/stats";
import { Process } from "@/components/process";
import { Sectors } from "@/components/sectors";
import { advantages } from "@/lib/site";
import { getServices, getProducts, getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [services, products, projects] = await Promise.all([
    getServices(),
    getProducts(),
    getProjects(),
  ]);
  const clients = Array.from(new Set(projects.map((p) => p.client)));

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="paths-surface relative overflow-hidden bg-surface-container-lowest">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-40" />
        <PathsBackdrop className="opacity-70" />
        <Container className="relative z-10 py-20 md:py-28">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            {/* Copy */}
            <div className="text-right">
              <span className="animate-fade-up">
                <Eyebrow>للاتصالات وتقنية المعلومات</Eyebrow>
              </span>
              <h1
                className="animate-fade-up mt-6 text-4xl font-head font-bold leading-[1.15] text-primary md:text-6xl"
                style={{ animationDelay: "0.1s" }}
              >
                نصنع <span className="text-gradient">مساراتٍ رقمية</span>
                <br />
                تقود مؤسستك للمستقبل
              </h1>
              <p
                className="animate-fade-up ml-auto mt-6 max-w-xl text-lg leading-relaxed text-on-surface-variant"
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
                  className="inline-flex items-center gap-2 rounded border border-outline-variant px-8 py-3.5 font-head text-sm font-medium text-primary transition-colors hover:border-secondary hover:bg-surface-container-low"
                >
                  استعرض خدماتنا
                </Link>
              </div>
              <div
                className="animate-fade-up mt-10 flex flex-wrap items-center justify-end gap-x-8 gap-y-3 text-sm text-on-surface-variant"
                style={{ animationDelay: "0.4s" }}
              >
                <span className="flex items-center gap-2">
                  <Icon name="verified" filled className="text-[18px] text-secondary" />
                  جودة عالمية
                </span>
                <span className="flex items-center gap-2">
                  <Icon name="account_balance" className="text-[18px] text-secondary" />
                  شريك القطاع الحكومي
                </span>
                <span className="flex items-center gap-2">
                  <Icon name="support_agent" className="text-[18px] text-secondary" />
                  دعم 24/7
                </span>
              </div>
            </div>

            {/* Signature paths network */}
            <div
              className="animate-fade-in relative mx-auto hidden w-full max-w-md lg:block"
              style={{ animationDelay: "0.2s" }}
            >
              <PathsNetwork />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <Stats projectCount={projects.length} clientCount={clients.length} productCount={products.length} />

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
              <Reveal key={s.id} delay={i * 90}>
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

      {/* ── Process ──────────────────────────────────────── */}
      <Process />

      {/* ── Sectors ──────────────────────────────────────── */}
      <Sectors />

      {/* ── Clients ──────────────────────────────────────── */}
      <ClientsStrip clients={clients} />

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
