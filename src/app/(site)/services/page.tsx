import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { PageHero } from "@/components/section";
import { ServiceCard } from "@/components/cards";
import { Reveal } from "@/components/reveal";
import { getServices } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الخدمات",
  description:
    "حلول الاتصالات والشبكات، البنية التحتية لتقنية المعلومات، الأمن السيبراني، التحول الرقمي، الأنظمة الذكية، والدعم الفني من مسارات المستكشف.",
};

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        title="خدماتنا"
        eyebrow="حلول تقنية متكاملة"
        subtitle="نقدم في مسارات المستكشف مجموعة متكاملة من الحلول التقنية المتقدمة، مصممة خصيصًا لتلبية احتياجات قطاع الأعمال والارتقاء بكفاءة العمليات التشغيلية نحو مستقبل رقمي مستدام."
      />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={(i % 4) * 80}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-outline-variant/30 bg-surface-container-high py-16">
        <Container className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-head font-semibold text-primary">
            هل تبحث عن حلول تقنية مخصصة؟
          </h2>
          <p className="mt-3 max-w-2xl text-on-surface-variant">
            فريق خبرائنا جاهز لتقديم استشارات تقنية تناسب متطلبات أعمالك بدقة
            واحترافية.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/contact" variant="primary">
              تواصل معنا الآن
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              طلب استشارة
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
