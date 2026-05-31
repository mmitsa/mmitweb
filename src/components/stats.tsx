import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { projects } from "@/lib/site";

const uniqueClients = Array.from(new Set(projects.map((p) => p.client)));

const stats = [
  { icon: "task_alt", value: `+${projects.length}`, label: "مشروع منجز" },
  { icon: "account_balance", value: `${uniqueClients.length}`, label: "جهات حكومية" },
  { icon: "apps", value: "7", label: "أنظمة رقمية" },
  { icon: "support_agent", value: "24/7", label: "دعم فني" },
];

export function Stats() {
  return (
    <section className="bg-primary py-14 text-on-primary">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <Icon name={s.icon} className="mb-3 text-[36px] text-tertiary-fixed-dim" />
              <span className="font-head text-4xl font-bold">{s.value}</span>
              <span className="mt-1 text-sm text-on-primary-fixed-variant">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ClientsStrip() {
  return (
    <section className="border-y border-outline-variant/30 bg-surface-container-low py-12">
      <Container>
        <p className="mb-8 text-center font-head text-sm font-medium tracking-wide text-on-surface-variant">
          نفخر بثقة الجهات الحكومية والمؤسسات في المملكة
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {uniqueClients.map((c) => (
            <span
              key={c}
              className="rounded-full border border-outline-variant/40 bg-surface-container-lowest px-5 py-2 text-sm text-on-surface-variant"
            >
              {c}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
