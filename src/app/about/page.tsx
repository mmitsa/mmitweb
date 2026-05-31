import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/section";
import { ProductCard } from "@/components/cards";
import { products } from "@/lib/site";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرّف على مسارات المستكشف: رؤيتنا ورسالتنا وقيمنا، ومجالات عملنا في الاتصالات وتقنية المعلومات والأمن السيبراني والتحول الرقمي بالمملكة.",
};

const values = [
  { icon: "verified_user", label: "الالتزام" },
  { icon: "lightbulb", label: "الابتكار" },
  { icon: "speed", label: "الكفاءة" },
  { icon: "eco", label: "الاستدامة" },
  { icon: "handshake", label: "الشراكة" },
];

const fields = [
  { icon: "lan", title: "البنية التحتية", desc: "تصميم وتنفيذ شبكات اتصالات قوية ومراكز بيانات تضمن استمرارية الأعمال وأداءً عالي الموثوقية." },
  { icon: "dns", title: "الأنظمة الرقمية", desc: "تطوير ودمج أنظمة برمجية متقدمة لتسهيل إدارة العمليات المعقدة بفاعلية ودقة." },
  { icon: "transform", title: "التحول الرقمي", desc: "تمكين المؤسسات من الانتقال السلس إلى العمليات الرقمية الشاملة لزيادة الإنتاجية وتقليل التكاليف." },
  { icon: "devices", title: "الأجهزة التقنية", desc: "توريد وتركيب أحدث الأجهزة والمعدات التقنية لدعم البنية التحتية للمشاريع الكبرى." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[420px] items-center overflow-hidden bg-primary py-20">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.08) 12px, rgba(255,255,255,0.08) 24px)",
          }}
        />
        <Container className="relative z-10">
          <div className="max-w-2xl space-y-6 text-right">
            <nav className="flex items-center gap-2 text-sm text-on-primary/60">
              <span>الرئيسية</span>
              <Icon name="chevron_left" className="text-[16px]" />
              <span className="text-on-primary">من نحن</span>
            </nav>
            <h1 className="text-5xl font-head font-bold leading-tight text-on-primary md:text-6xl">
              من نحن
            </h1>
            <div className="h-1 w-24 rounded-full bg-secondary" />
            <p className="text-lg leading-relaxed text-on-primary/90">
              نحن في &quot;مسارات المستكشف&quot; رواد في تقديم الحلول التقنية
              المتقدمة وخدمات الاتصالات في المملكة. نسعى لتمكين المؤسسات من خلال
              بنية تحتية رقمية قوية، أنظمة مبتكرة، وأمن معلومات لا يضاهى، لدفع
              عجلة التحول الرقمي بثقة واستدامة.
            </p>
          </div>
        </Container>
      </section>

      {/* Vision / Mission / Values */}
      <section className="bg-surface-container-lowest py-16">
        <Container className="space-y-12">
          <h2 className="text-center text-3xl font-head font-semibold text-primary">
            نبذة مختصرة عن الشركة
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="group relative overflow-hidden rounded-lg border-t-4 border-secondary bg-surface p-6 soft-shadow transition-shadow hover:shadow-md">
              <Icon name="visibility" filled className="absolute left-4 top-4 text-[80px] text-secondary opacity-10" />
              <div className="mb-4 flex items-center gap-4">
                <Icon name="visibility" className="text-[32px] text-secondary" />
                <h3 className="text-2xl font-head font-semibold text-primary">الرؤية</h3>
              </div>
              <p className="relative z-10 leading-relaxed text-on-surface-variant">
                أن نكون الشريك التقني الأول والموثوق في المملكة، ونساهم في بناء
                مستقبل رقمي متكامل يعتمد على الابتكار والاستدامة في قطاع الاتصالات
                وتقنية المعلومات.
              </p>
            </div>
            <div className="group relative overflow-hidden rounded-lg border-t-4 border-tertiary-fixed-dim bg-surface p-6 soft-shadow transition-shadow hover:shadow-md">
              <Icon name="track_changes" filled className="absolute left-4 top-4 text-[80px] text-tertiary-fixed-dim opacity-10" />
              <div className="mb-4 flex items-center gap-4">
                <Icon name="track_changes" className="text-[32px] text-tertiary-fixed-dim" />
                <h3 className="text-2xl font-head font-semibold text-primary">الرسالة</h3>
              </div>
              <p className="relative z-10 leading-relaxed text-on-surface-variant">
                تقديم حلول تقنية مبتكرة وموثوقة تفوق توقعات عملائنا، من خلال فريق
                عمل محترف وشراكات استراتيجية، لتمكين القطاعات الحكومية والخاصة من
                تحقيق أهدافها التشغيلية بأعلى كفاءة.
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-center text-2xl font-head font-semibold text-primary">
              قيمنا الأساسية
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {values.map((v) => (
                <div
                  key={v.label}
                  className="flex items-center gap-2 rounded-full border border-secondary-fixed-dim bg-secondary-fixed/30 px-6 py-3 font-head text-sm text-on-secondary-fixed transition-colors hover:bg-secondary-fixed/50"
                >
                  <Icon name={v.icon} className="text-[20px]" />
                  {v.label}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Fields of work */}
      <section className="bg-surface py-16">
        <Container>
          <SectionHeading title="مجالات العمل" />
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-xl bg-primary p-6 text-on-primary md:col-span-2">
              <Icon name="security" className="absolute right-6 top-6 text-[48px] text-tertiary-fixed-dim" />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)",
                }}
              />
              <div className="relative z-10">
                <h3 className="mb-2 text-2xl font-head font-semibold">أمن المعلومات</h3>
                <p className="max-w-lg leading-relaxed opacity-80">
                  حماية الأصول الرقمية للمؤسسات من خلال بروتوكولات أمان صارمة،
                  تقييم المخاطر، وحلول استباقية لضمان سلامة البيانات وسريتها في
                  بيئة متصلة.
                </p>
              </div>
            </div>
            {fields.map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border border-surface-container-high bg-surface-container p-6 soft-shadow transition-colors hover:border-secondary"
              >
                <Icon name={f.icon} className="mb-4 block text-[40px] text-secondary transition-transform group-hover:scale-110" />
                <h3 className="mb-2 text-2xl font-head font-semibold text-primary">{f.title}</h3>
                <p className="leading-relaxed text-on-surface-variant">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Products */}
      <section className="bg-surface-container-lowest py-16">
        <Container>
          <SectionHeading
            title="منتجاتنا"
            subtitle="مجموعة متكاملة من الحلول الرقمية المصممة لتلبية احتياجات مختلف القطاعات وإدارة الموارد بذكاء."
            centered
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.title} product={p} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
