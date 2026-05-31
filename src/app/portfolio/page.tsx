import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { PageHero } from "@/components/section";
import { cn } from "@/lib/utils";
import { projects } from "@/lib/site";

export const metadata: Metadata = { title: "أعمالنا" };

const featured = [
  {
    icon: "inventory",
    title: "إدارة نظام إلكتروني للمخزون والأصول",
    client: "المركز السعودي لكفاءة الطاقة",
    span: true,
  },
  {
    icon: "videocam",
    title: "صيانة وتوريد كاميرات المراقبة",
    client: "بلدية تربة منطقة حائل",
  },
  {
    icon: "build",
    title: "تطوير الخدمات التقنية بالمرافق",
    client: "بلدية محافظة بقعاء",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        title="أعمالنا ومشاريعنا"
        subtitle="نفخر بثقة عملائنا من الجهات الحكومية والمؤسسات في المملكة. هذه نبذة من سابقة أعمالنا في مجالات الصيانة التقنية وتطوير البرمجيات وأنظمة المراقبة."
      />

      {/* Featured projects */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featured.map((p) => (
              <div
                key={p.title}
                className={cn(
                  "flex flex-col justify-between rounded-lg border-t-4 border-primary bg-surface-container-lowest p-6 soft-shadow transition-shadow hover:shadow-lg",
                  p.span && "md:col-span-2"
                )}
              >
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container text-secondary">
                    <Icon name={p.icon} className="text-3xl" />
                  </div>
                  <h3 className="mb-2 text-xl font-head font-semibold text-primary">
                    {p.title}
                  </h3>
                  <p className="text-on-surface-variant">{p.client}</p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-xs text-on-surface-variant">قائم</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Projects table */}
      <section className="bg-surface-container-lowest py-16">
        <Container>
          <div className="mb-8 flex items-center gap-3">
            <Icon name="table_chart" className="text-3xl text-secondary" />
            <h2 className="text-3xl font-head font-semibold text-primary">
              سابقة الأعمال
            </h2>
          </div>
          <div className="overflow-hidden rounded-lg border border-surface-container-highest soft-shadow">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-right">
                <thead>
                  <tr className="border-b-2 border-surface-container-highest bg-surface-container-low">
                    <th className="whitespace-nowrap px-6 py-4 font-head text-sm font-medium text-on-surface-variant">
                      الجهة
                    </th>
                    <th className="px-6 py-4 font-head text-sm font-medium text-on-surface-variant">
                      وصف العمل
                    </th>
                    <th className="whitespace-nowrap px-6 py-4 font-head text-sm font-medium text-on-surface-variant">
                      الحالة
                    </th>
                  </tr>
                </thead>
                <tbody className="text-primary">
                  {projects.map((p, i) => {
                    const active = p.status === "قائم";
                    return (
                      <tr
                        key={`${p.client}-${i}`}
                        className={cn(
                          "border-b border-surface-container-highest transition-colors",
                          active
                            ? "bg-secondary-fixed/20 hover:bg-secondary-fixed/30"
                            : "hover:bg-surface-container-low"
                        )}
                      >
                        <td className="px-6 py-4 font-medium">{p.client}</td>
                        <td className="px-6 py-4 text-on-surface-variant">
                          {p.work}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                              active
                                ? "bg-secondary text-on-secondary"
                                : "bg-surface-container text-on-surface-variant"
                            )}
                          >
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
