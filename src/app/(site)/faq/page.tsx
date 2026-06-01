import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { Icon } from "@/components/icon";
import { PageHero } from "@/components/section";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة",
  description:
    "إجابات على الأسئلة الشائعة حول خدمات مسارات المستكشف، التغطية الجغرافية، عقود الدعم، طلب عروض الأسعار، والتوافق مع الأنظمة المحلية.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    q: "ما الخدمات التي تقدّمها مسارات المستكشف؟",
    a: "نقدّم حلولًا متكاملة في الاتصالات والشبكات، البنية التحتية لتقنية المعلومات، الأمن السيبراني، التحول الرقمي وأتمتة الأعمال، الأنظمة الذكية وإنترنت الأشياء، توريد وتركيب الأجهزة، وحلول مراكز البيانات، إضافة إلى عقود الدعم والتشغيل والصيانة.",
  },
  {
    q: "ما المناطق التي تغطّونها داخل المملكة؟",
    a: "نخدم عملاءنا في مختلف مناطق المملكة العربية السعودية، ولدينا سجل تنفيذ مشاريع في عدة مناطق مع جهات حكومية ومؤسسات.",
  },
  {
    q: "هل تعملون مع الجهات الحكومية؟",
    a: "نعم، نفخر بسجل أعمال واسع مع جهات حكومية كالأمانات والبلديات والوزارات والمراكز المتخصصة، ونلتزم بالمعايير والمتطلبات النظامية لهذه الجهات.",
  },
  {
    q: "كيف أطلب عرض سعر أو استشارة؟",
    a: "يمكنك طلب عرض سعر عبر نموذج التواصل في صفحة «تواصل معنا»، أو مباشرة عبر الهاتف أو واتساب أو البريد الإلكتروني، وسيتواصل معك فريقنا في أقرب وقت.",
  },
  {
    q: "هل تقدّمون عقود دعم وصيانة؟",
    a: "نعم، نوفّر عقود دعم وتشغيل وصيانة (وقائية وعلاجية) باتفاقيات مستوى خدمة (SLA) واضحة تضمن جاهزية أنظمتك واستمرارية أعمالك.",
  },
  {
    q: "كم يستغرق تنفيذ المشروع؟",
    a: "يعتمد ذلك على نطاق المشروع وتعقيده. نحدّد جدولًا زمنيًا واضحًا في مرحلة تصميم الحل بعد دراسة احتياجاتك، ونلتزم بمواعيد التسليم المتفق عليها.",
  },
  {
    q: "هل حلولكم متوافقة مع الأنظمة المحلية؟",
    a: "نعم، نحرص على توافق حلولنا مع المتطلبات النظامية المحلية، بما في ذلك متطلبات الفوترة الإلكترونية (هيئة الزكاة والضريبة والجمارك) وأفضل ممارسات حماية البيانات والأمن السيبراني.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                key={f.q}
                className="group rounded-xl border border-outline-variant/25 bg-surface-container-lowest soft-shadow transition-colors open:border-secondary/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-head text-lg font-semibold text-primary marker:hidden">
                  {f.q}
                  <Icon
                    name="expand_more"
                    className="flex-shrink-0 text-secondary transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <div className="px-5 pb-5 leading-loose text-on-surface-variant">
                  {f.a}
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
