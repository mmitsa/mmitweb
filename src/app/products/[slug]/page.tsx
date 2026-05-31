import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button";
import { Icon } from "@/components/icon";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getProduct, products, site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "المنتج غير موجود" };
  return {
    title: product.title,
    description: product.overview,
    alternates: { canonical: `/products/${product.slug}` },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "الرئيسية", path: "/" },
          { name: "المنتجات", path: "/products" },
          { name: product.title, path: `/products/${product.slug}` },
        ]}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-16 text-on-primary md:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.08) 12px, rgba(255,255,255,0.08) 24px)",
          }}
        />
        <Container className="relative z-10">
          <nav className="mb-6 flex items-center gap-2 text-sm text-on-primary/60">
            <Link href="/" className="hover:text-on-primary">الرئيسية</Link>
            <Icon name="chevron_left" className="text-[16px]" />
            <Link href="/products" className="hover:text-on-primary">المنتجات</Link>
            <Icon name="chevron_left" className="text-[16px]" />
            <span className="text-on-primary">{product.title}</span>
          </nav>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-secondary text-on-secondary">
              <Icon name={product.icon} className="text-5xl" />
            </div>
            <div>
              <h1 className="text-4xl font-head font-bold md:text-5xl">{product.title}</h1>
              <p className="mt-2 text-lg text-tertiary-fixed-dim">{product.tagline}</p>
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
                {product.overview}
              </p>

              <h2 className="mt-10 text-2xl font-head font-semibold text-primary">أبرز المزايا</h2>
              <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {product.features.map((f) => (
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

            {/* Sidebar CTA */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border-t-4 border-secondary bg-surface-container-lowest p-6 soft-shadow">
                <h3 className="text-xl font-head font-semibold text-primary">
                  جاهز للبدء مع {product.title}؟
                </h3>
                <p className="mt-2 text-sm text-on-surface-variant">
                  تواصل معنا للحصول على عرض توضيحي أو عرض سعر يناسب مؤسستك.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  {product.href && (
                    <ButtonLink href={product.href} variant="primary" className="w-full">
                      <span>زيارة النظام</span>
                      <Icon name="open_in_new" className="text-[18px]" />
                    </ButtonLink>
                  )}
                  <ButtonLink href="/contact" variant={product.href ? "outline" : "primary"} className="w-full">
                    اطلب عرضًا توضيحيًا
                  </ButtonLink>
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded border border-outline-variant py-3 font-head text-sm text-on-surface-variant transition-colors hover:bg-surface-container"
                  >
                    <Icon name="chat" className="text-[18px]" />
                    استفسار عبر واتساب
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Related products */}
      <section className="bg-surface-container-low py-16">
        <Container>
          <h2 className="mb-8 text-2xl font-head font-semibold text-primary">منتجات أخرى</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-5 soft-shadow transition-all hover:-translate-y-1 hover:border-secondary"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary-fixed text-secondary">
                  <Icon name={p.icon} />
                </div>
                <div>
                  <h3 className="font-head font-semibold text-primary">{p.title}</h3>
                  <p className="text-sm text-on-surface-variant">{p.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
