import Link from "next/link";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/section";
import { ServiceCard, ProductCard, AdvantageCard } from "@/components/cards";
import { advantages, products, services } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-container-lowest pb-24 pt-20 md:pt-28">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(#324cd6 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <Container className="relative z-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6 text-right">
              <h1 className="text-4xl font-head font-bold leading-tight text-primary md:text-6xl">
                مسارات المستكشف
                <br />
                <span className="text-secondary">للاتصالات وتقنية المعلومات</span>
              </h1>
              <p className="ml-auto max-w-2xl text-lg leading-relaxed text-on-surface-variant">
                نقود رحلتك نحو حلول تقنية واتصالات أكثر كفاءة وابتكارًا. نقدم
                خدمات متكاملة مصممة خصيصًا لتلبية احتياجات قطاع الأعمال الحكومي
                والخاص في المملكة العربية السعودية.
              </p>
              <div className="flex flex-wrap justify-end gap-4 pt-4">
                <ButtonLink href="/contact" variant="dark">
                  <span>تواصل معنا</span>
                  <Icon name="arrow_back" className="text-[18px]" />
                </ButtonLink>
                <ButtonLink href="/services" variant="outline">
                  استعرض خدماتنا
                </ButtonLink>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-br from-secondary-fixed to-tertiary-fixed opacity-30 blur-2xl" />
              <div className="relative z-10 flex aspect-[1.6] w-full items-center justify-center overflow-hidden rounded-xl border border-outline-variant/30 bg-primary soft-shadow">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.12) 12px, rgba(255,255,255,0.12) 24px)",
                  }}
                />
                <Icon name="hub" filled className="relative text-[120px] text-tertiary-fixed-dim" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Why us */}
      <section className="bg-surface-container-low py-16">
        <Container>
          <SectionHeading title="لماذا مسارات؟" centered />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a) => (
              <AdvantageCard key={a.title} advantage={a} />
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="bg-background py-16">
        <Container>
          <SectionHeading
            title="خدماتنا"
            subtitle="مجموعة متكاملة من الحلول التقنية المتقدمة، مصممة لتلبية احتياجات قطاع الأعمال."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map((s) => (
              <ServiceCard key={s.title} service={s} />
            ))}
          </div>
          <div className="mt-10 flex justify-start">
            <ButtonLink href="/services" variant="outline">
              <span>عرض كل الخدمات</span>
              <Icon name="arrow_back" className="text-[18px]" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Products */}
      <section className="bg-surface py-16">
        <Container>
          <SectionHeading
            title="منتجاتنا"
            subtitle="منظومة مسارات من الأنظمة الرقمية الجاهزة لإدارة أعمالك بذكاء."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.title} product={p} />
            ))}
          </div>
          <div className="mt-10 flex justify-start">
            <ButtonLink href="/products" variant="outline">
              <span>عرض كل المنتجات</span>
              <Icon name="arrow_back" className="text-[18px]" />
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-16 text-on-secondary">
        <Container className="text-center">
          <h2 className="text-3xl font-head font-bold text-on-secondary">
            هل أنت مستعد للبدء في رحلة التحول الرقمي؟
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-on-secondary/90">
            دعنا نساعدك في تحقيق أهدافك التقنية. تواصل مع فريقنا اليوم للحصول على
            استشارة مجانية وعرض سعر يناسب احتياجاتك.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-on-secondary px-8 py-3 font-head text-sm font-medium text-secondary shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <span>اطلب عرض سعر الآن</span>
              <Icon name="arrow_back" className="text-[18px]" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
