import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { Icon } from "@/components/icon";
import { PathsBackdrop } from "@/components/paths";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getService, services } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "الخدمة غير موجودة" };
  return {
    title: service.title,
    description: service.overview,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "الرئيسية", path: "/" },
          { name: "الخدمات", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
      />
      {/* Hero */}
      <section className="paths-surface relative overflow-hidden border-b border-outline-variant/30 bg-surface-container-lowest py-16 md:py-20">
        <PathsBackdrop className="opacity-60" />
        <Container className="relative z-10">
          <nav className="mb-6 flex items-center gap-2 text-sm text-on-surface-variant">
            <Link href="/" className="hover:text-secondary">الرئيسية</Link>
            <Icon name="chevron_left" className="text-[16px]" />
            <Link href="/services" className="hover:text-secondary">الخدمات</Link>
            <Icon name="chevron_left" className="text-[16px]" />
            <span className="text-primary">{service.title}</span>
          </nav>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div
              className={`flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl ${
                service.accent === "secondary"
                  ? "bg-secondary-fixed text-secondary"
                  : "bg-primary-fixed text-primary"
              }`}
            >
              <Icon name={service.icon} className="text-5xl" />
            </div>
            <div>
              <h1 className="text-3xl font-head font-bold text-primary md:text-5xl">
                {service.title}
              </h1>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
                {service.description}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Overview + features */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-head font-semibold text-primary">نظرة عامة</h2>
              <p className="mt-4 text-lg leading-loose text-on-surface-variant">
                {service.overview}
              </p>

              <h2 className="mt-10 text-2xl font-head font-semibold text-primary">ماذا نقدّم</h2>
              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {service.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 rounded-lg border border-outline-variant/20 bg-surface-container-lowest p-4 soft-shadow"
                  >
                    <Icon name="check_circle" filled className="mt-0.5 flex-shrink-0 text-secondary" />
                    <span className="text-on-surface-variant">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border-t-4 border-secondary bg-surface-container-lowest p-6 soft-shadow">
                <h3 className="text-xl font-head font-semibold text-primary">
                  مهتم بهذه الخدمة؟
                </h3>
                <p className="mt-2 text-sm text-on-surface-variant">
                  تواصل مع فريقنا للحصول على استشارة وعرض سعر يناسب احتياجات
                  مؤسستك.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <ButtonLink href="/contact" variant="primary" className="w-full">
                    اطلب عرض سعر
                  </ButtonLink>
                  <ButtonLink href="/services" variant="outline" className="w-full">
                    كل الخدمات
                  </ButtonLink>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related services */}
      <section className="bg-surface-container-low py-16">
        <Container>
          <h2 className="mb-8 text-2xl font-head font-semibold text-primary">خدمات أخرى</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-5 soft-shadow transition-all hover:-translate-y-1 hover:border-secondary"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary-fixed text-secondary">
                  <Icon name={s.icon} />
                </div>
                <h3 className="font-head font-semibold leading-snug text-primary">{s.title}</h3>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
