import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { Icon } from "@/components/icon";
import { PageHero } from "@/components/section";
import { PortfolioExplorer } from "@/components/portfolio-explorer";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "أعمالنا",
  description:
    "سابقة أعمال مسارات المستكشف مع الجهات الحكومية والمؤسسات: مشاريع تطوير برمجيات، أنظمة مراقبة، صيانة تقنية، وتوريد وتركيب في مختلف مناطق المملكة.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHero
        title="أعمالنا ومشاريعنا"
        eyebrow="إنجازاتنا"
        subtitle="نفخر بثقة عملائنا من الجهات الحكومية والمؤسسات في المملكة. تصفّح سابقة أعمالنا حسب التصنيف أو الحالة."
      />

      <section className="py-16">
        <Container>
          <PortfolioExplorer projects={projects} />
        </Container>
      </section>

      {/* Partners CTA */}
      <section className="border-t border-outline-variant/30 bg-surface-container-low py-16">
        <Container className="flex flex-col items-center text-center">
          <Icon name="handshake" className="mb-4 text-[48px] text-secondary" />
          <h2 className="text-3xl font-head font-semibold text-primary">
            شركاء النجاح
          </h2>
          <p className="mt-3 max-w-2xl text-on-surface-variant">
            نعتزّ بشراكتنا مع نخبة من الجهات الحكومية والمؤسسات في المملكة.
          </p>
          <div className="mt-8">
            <ButtonLink href="/partners" variant="primary">
              <span>تعرّف على شركائنا</span>
              <Icon name="arrow_back" className="text-[18px]" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
