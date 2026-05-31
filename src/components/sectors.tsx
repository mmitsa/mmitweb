import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section";

const sectors = [
  { icon: "account_balance", title: "القطاع الحكومي", desc: "وزارات وجهات حكومية ومراكز متخصصة." },
  { icon: "location_city", title: "القطاع البلدي", desc: "أمانات وبلديات في مختلف المناطق." },
  { icon: "health_and_safety", title: "القطاع الصحي", desc: "مستشفيات ومرافق ومختبرات صحية." },
  { icon: "bolt", title: "قطاع الطاقة", desc: "جهات ومراكز كفاءة الطاقة." },
  { icon: "local_police", title: "القطاع الأمني", desc: "جهات أمنية ومرافقها الحيوية." },
  { icon: "business_center", title: "القطاع الخاص", desc: "مؤسسات وشركات تتطلّع للتحول الرقمي." },
];

export function Sectors() {
  return (
    <section className="bg-surface-container-low py-20">
      <Container>
        <Reveal>
          <SectionHeading
            title="القطاعات التي نخدمها"
            eyebrow="نطاق أوسع"
            subtitle="خبرة ممتدة عبر قطاعات متنوّعة، نفهم متطلبات كل قطاع ونصمّم له الحلول المناسبة."
            centered
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 90}>
              <div className="card-hover group flex items-start gap-4 rounded-xl border border-outline-variant/15 bg-surface-container-lowest p-6 soft-shadow">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-secondary-fixed text-secondary transition-transform group-hover:scale-110">
                  <Icon name={s.icon} className="text-[26px]" />
                </div>
                <div>
                  <h3 className="font-head text-lg font-semibold text-primary">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
