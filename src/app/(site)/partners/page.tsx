import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { Icon } from "@/components/icon";
import { PageHero } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { partners, projects, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "شركاؤنا",
  description:
    "شركاء النجاح لمسارات المستكشف من الجهات الحكومية والمؤسسات في المملكة: وزارة الصحة، وزارة الداخلية، المركز السعودي لكفاءة الطاقة، وأمانات وبلديات المناطق.",
};

function projectCount(partnerName: string): number {
  return projects.filter((p) => p.client.includes(partnerName)).length;
}

export default function PartnersPage() {
  return (
    <>
      <PageHero
        title="شركاؤنا"
        eyebrow="شركاء النجاح"
        subtitle="نعتزّ بثقة نخبة من الجهات الحكومية والمؤسسات في المملكة، ونفخر بشراكتنا الممتدة معهم في مشاريع الاتصالات وتقنية المعلومات."
      />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner, i) => {
              const count = projectCount(partner.name);
              return (
                <Reveal key={partner.name} delay={(i % 3) * 80}>
                <div
                  className="flex h-full flex-col items-center rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-8 text-center soft-shadow transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-surface-container">
                    {partner.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-16 max-w-16 object-contain"
                      />
                    ) : (
                      <Icon name={partner.icon} className="text-5xl text-secondary" />
                    )}
                  </div>
                  <h3 className="mt-5 font-head text-lg font-semibold text-primary">
                    {partner.name}
                  </h3>
                  <p className="mt-1 text-sm text-on-surface-variant">{partner.sector}</p>
                  {count > 0 && (
                    <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-secondary-fixed/40 px-3 py-1 text-xs font-medium text-on-secondary-fixed">
                      <Icon name="task_alt" className="text-[16px]" />
                      {count} {count === 1 ? "مشروع" : "مشاريع"}
                    </span>
                  )}
                </div>
                </Reveal>
              );
            })}
          </div>

          <p className="mt-10 text-center text-sm text-on-surface-variant/70">
            الشعارات ملكية لأصحابها وتُعرض للإشارة إلى نطاق أعمالنا مع هذه الجهات.
          </p>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-16 text-on-secondary">
        <Container className="text-center">
          <h2 className="text-3xl font-head font-bold text-on-secondary">
            كن شريكنا القادم
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-on-secondary/90">
            انضمّ إلى قائمة شركائنا من الجهات الرائدة. دعنا نساهم في تحقيق أهدافك
            التقنية.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink
              href={`https://wa.me/${site.whatsapp}`}
              variant="dark"
              className="bg-on-secondary text-secondary hover:bg-white"
            >
              <span>تواصل معنا</span>
              <Icon name="arrow_back" className="text-[18px]" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
