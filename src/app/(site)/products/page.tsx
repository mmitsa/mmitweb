import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { Icon } from "@/components/icon";
import { PageHero } from "@/components/section";
import { ProductCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { products } from "@/lib/site";

export const metadata: Metadata = {
  title: "منتجاتنا",
  description:
    "منظومة «مسارات» من الأنظمة الرقمية المتكاملة: مسارات HR، سداد، أرشفة، مستودعات، دعم، تحليل، وأملاك.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="منتجاتنا"
        eyebrow="منظومة مسارات"
        subtitle="منظومة «مسارات» من الأنظمة الرقمية المتكاملة، مصممة لتلبية احتياجات مختلف القطاعات وإدارة الموارد بذكاء وكفاءة."
      />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-container-low py-16">
        <Container className="flex flex-col items-center text-center">
          <Icon name="apps" className="mb-4 text-[48px] text-secondary" />
          <h2 className="text-3xl font-head font-semibold text-primary">
            تحتاج حلًا مخصصًا لمؤسستك؟
          </h2>
          <p className="mt-3 max-w-2xl text-on-surface-variant">
            نطوّر أنظمة رقمية مخصصة تناسب طبيعة أعمالك. تواصل معنا لمناقشة
            متطلباتك والحصول على عرض مناسب.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact" variant="primary">
              <span>تواصل معنا</span>
              <Icon name="arrow_back" className="text-[18px]" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
