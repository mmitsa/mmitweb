import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section";

const steps = [
  {
    icon: "travel_explore",
    title: "الاستكشاف والتحليل",
    desc: "نفهم احتياجاتك ونحلّل وضعك التقني الحالي لتحديد الفرص والأولويات.",
  },
  {
    icon: "architecture",
    title: "تصميم الحل",
    desc: "نصمّم حلًا مخصّصًا يحقق أهدافك باستخدام أنسب التقنيات وأفضل الممارسات.",
  },
  {
    icon: "deployed_code",
    title: "التنفيذ والتكامل",
    desc: "ننفّذ الحل وندمجه مع أنظمتك القائمة بسلاسة وأمان وأقل تأثير على العمل.",
  },
  {
    icon: "support_agent",
    title: "الدعم والتطوير",
    desc: "ندعمك ونطوّر الحل باستمرار لضمان أعلى أداء واستمرارية دون انقطاع.",
  },
];

export function Process() {
  return (
    <section className="bg-surface-container-lowest py-20">
      <Container>
        <Reveal>
          <SectionHeading
            title="كيف نعمل"
            eyebrow="منهجيتنا"
            subtitle="منهجية واضحة من أربع مراحل تضمن تسليم حلول تقنية موثوقة وفق الخطة."
            centered
          />
        </Reveal>

        <div className="relative mt-14">
          {/* connecting line */}
          <div className="absolute right-[12%] left-[12%] top-9 hidden h-px bg-gradient-to-l from-secondary/0 via-secondary/40 to-secondary/0 lg:block" />
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-5">
                    <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-outline-variant/20 bg-surface-container-lowest text-secondary shadow-[0_10px_30px_-12px_rgba(50,76,214,0.4)]">
                      <Icon name={step.icon} className="text-[34px]" />
                    </div>
                    <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-secondary font-head text-sm font-bold text-on-secondary">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-head font-semibold text-primary">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
