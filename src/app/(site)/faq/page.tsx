import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { Icon } from "@/components/icon";
import { PageHero } from "@/components/section";
import { getFaqs } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة",
  description:
    "إجابات على الأسئلة الشائعة حول خدمات مسارات المستكشف، التغطية الجغرافية، عقود الدعم، طلب عروض الأسعار، والتوافق مع الأنظمة المحلية.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const faqs = await getFaqs();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/<\//g, "<\\/") }}
      />
      <PageHero
        title="الأسئلة الشائعة"
        eyebrow="نجيب على استفساراتك"
        subtitle="جمعنا أكثر الأسئلة شيوعًا حول خدماتنا وطريقة عملنا. لم تجد إجابتك؟ تواصل معنا مباشرة."
      />

      <section className="py-16">
        <Container className="max-w-3xl">
          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.id}
                className="group rounded-xl border border-outline-variant/25 bg-surface-container-lowest soft-shadow transition-colors open:border-secondary/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-head text-lg font-semibold text-primary marker:hidden">
                  {f.question}
                  <Icon
                    name="expand_more"
                    className="flex-shrink-0 text-secondary transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <div className="px-5 pb-5 leading-loose text-on-surface-variant">
                  {f.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 rounded-xl border border-outline-variant/25 bg-surface-container-low p-8 text-center">
            <Icon name="contact_support" className="text-[40px] text-secondary" />
            <h2 className="text-2xl font-head font-semibold text-primary">
              لم تجد ما تبحث عنه؟
            </h2>
            <p className="max-w-xl text-on-surface-variant">
              فريقنا جاهز للإجابة على جميع استفساراتك ومساعدتك في اختيار الحل
              المناسب.
            </p>
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
