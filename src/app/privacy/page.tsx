import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية لموقع مسارات المستكشف للاتصالات وتقنية المعلومات.",
};

const sections = [
  {
    title: "مقدمة",
    body: "تحرص شركة مسارات المستكشف للاتصالات وتقنية المعلومات على حماية خصوصية زوّار موقعها وعملائها. توضّح هذه السياسة كيفية جمع المعلومات واستخدامها وحمايتها عند استخدامك لهذا الموقع.",
  },
  {
    title: "المعلومات التي نجمعها",
    body: "نقوم بجمع المعلومات التي تزوّدنا بها طوعًا عبر نموذج التواصل، مثل الاسم والبريد الإلكتروني ورقم الجوال ونوع الخدمة ومحتوى رسالتك. كما قد نجمع بيانات تقنية غير معرّفة للهوية (مثل نوع المتصفح وصفحات الزيارة) لأغراض تحسين الموقع.",
  },
  {
    title: "كيفية استخدام المعلومات",
    body: "نستخدم معلوماتك للرد على استفساراتك وتقديم الخدمات وتحسين تجربتك على الموقع. لا نستخدم بياناتك لأي غرض آخر دون موافقتك.",
  },
  {
    title: "مشاركة المعلومات",
    body: "لا نبيع أو نؤجّر معلوماتك الشخصية لأطراف ثالثة. قد نشارك بعض البيانات مع مزوّدي خدمات موثوقين (مثل خدمة إرسال البريد الإلكتروني) لغرض تشغيل الموقع فقط، وبما يلتزم بحماية بياناتك.",
  },
  {
    title: "حماية البيانات",
    body: "نتّخذ تدابير تقنية وتنظيمية مناسبة لحماية معلوماتك من الوصول أو الاستخدام غير المصرّح به، بما يتوافق مع أفضل الممارسات في أمن المعلومات.",
  },
  {
    title: "ملفات تعريف الارتباط (Cookies)",
    body: "قد يستخدم الموقع ملفات تعريف الارتباط وأدوات التحليل لتحسين الأداء وفهم سلوك الزوّار. يمكنك ضبط متصفحك لرفض ملفات تعريف الارتباط، مع العلم أن ذلك قد يؤثّر على بعض وظائف الموقع.",
  },
  {
    title: "حقوقك",
    body: "يحق لك طلب الاطلاع على بياناتك الشخصية أو تصحيحها أو حذفها. للتواصل بشأن أي من هذه الحقوق، يرجى مراسلتنا عبر البريد الإلكتروني الموضّح أدناه.",
  },
  {
    title: "التعديلات على هذه السياسة",
    body: "قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سيتم نشر أي تعديلات على هذه الصفحة مع تحديث تاريخ السريان.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="سياسة الخصوصية"
        subtitle="نوضّح في هذه الصفحة كيفية تعاملنا مع بياناتك الشخصية وحمايتها."
      />

      <section className="py-16">
        <Container className="max-w-3xl space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="mb-2 text-2xl font-head font-semibold text-primary">
                {s.title}
              </h2>
              <p className="leading-loose text-on-surface-variant">{s.body}</p>
            </div>
          ))}

          <div className="rounded-xl border-t-4 border-secondary bg-surface-container-lowest p-6 soft-shadow">
            <h2 className="mb-2 text-2xl font-head font-semibold text-primary">
              التواصل معنا
            </h2>
            <p className="leading-loose text-on-surface-variant">
              لأي استفسار يتعلّق بسياسة الخصوصية، يمكنك مراسلتنا على{" "}
              <a href={`mailto:${site.email}`} dir="ltr" className="text-secondary hover:underline">
                {site.email}
              </a>{" "}
              أو الاتصال على{" "}
              <a href={`tel:${site.phone}`} dir="ltr" className="text-secondary hover:underline">
                {site.phoneDisplay}
              </a>
              .
            </p>
          </div>

          <p className="text-sm text-on-surface-variant/70">
            آخر تحديث: مايو 2026 — هذه مسودّة أولية، يُنصح بمراجعتها قانونيًا قبل
            الاعتماد النهائي.
          </p>
        </Container>
      </section>
    </>
  );
}
