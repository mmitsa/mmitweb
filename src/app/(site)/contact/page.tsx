import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { PageHero } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { getSettings } from "@/lib/data";
import { site as fallback } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description:
    "تواصل مع فريق مسارات المستكشف عبر النموذج أو الهاتف أو واتساب أو البريد الإلكتروني للحصول على استشارة تقنية أو عرض سعر.",
};

export default async function ContactPage() {
  const site = (await getSettings()) ?? fallback;
  return (
    <>
      <PageHero
        title="تواصل معنا"
        eyebrow="نحن بخدمتك"
        subtitle="نحن هنا لمساعدتك في تحقيق أهدافك الرقمية. فريق مسارات المستكشف مستعد للإجابة على استفساراتك وتقديم الحلول التقنية المناسبة لعملك."
      />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Form */}
            <div className="lg:col-span-8">
              <ContactForm turnstileSiteKey={("turnstileSiteKey" in site && site.turnstileSiteKey) || undefined} />
            </div>

            {/* Info sidebar */}
            <div className="lg:col-span-4">
              <div className="h-full rounded-xl bg-primary p-6 text-on-primary soft-shadow md:p-8">
                <h3 className="mb-6 text-2xl font-head font-semibold">
                  معلومات الاتصال
                </h3>
                <div className="space-y-6">
                  <ContactRow icon="email" label="البريد الإلكتروني">
                    <a href={`mailto:${site.email}`} dir="ltr" className="block hover:text-secondary-fixed-dim">
                      {site.email}
                    </a>
                  </ContactRow>
                  <ContactRow icon="call" label="رقم الهاتف">
                    <a href={`tel:${site.phone}`} dir="ltr" className="block hover:text-secondary-fixed-dim">
                      {site.phoneDisplay}
                    </a>
                  </ContactRow>
                  <ContactRow icon="location_on" label="العنوان">
                    المملكة العربية السعودية
                    <br />
                    الرياض، حي الصحافة
                  </ContactRow>
                </div>

                <div className="mt-10 border-t border-surface-tint/30 pt-6 text-center">
                  <p className="mb-4 font-head text-sm text-on-primary-fixed-variant">
                    نحن متاحون أيضًا عبر واتساب
                  </p>
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-head text-sm text-white transition-colors hover:bg-[#128C7E]"
                  >
                    <Icon name="chat" className="text-[20px]" />
                    محادثة عبر واتساب
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Map placeholder */}
      <section className="bg-surface-container-low py-16">
        <Container className="text-center">
          <h2 className="mb-8 flex items-center justify-center gap-2 text-3xl font-head font-semibold text-primary">
            <Icon name="location_on" className="text-secondary" />
            موقعنا على الخريطة
          </h2>
          <div className="mb-3 aspect-video w-full overflow-hidden rounded-xl border border-outline-variant bg-surface-container-highest soft-shadow md:h-[450px]">
            <iframe
              title="موقع مسارات المستكشف على الخريطة"
              src="https://www.google.com/maps?q=%D8%AD%D9%8A%20%D8%A7%D9%84%D8%B5%D8%AD%D8%A7%D9%81%D8%A9%D8%8C%20%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="text-on-surface-variant">{site.address}</p>
        </Container>
      </section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 rounded-full bg-surface-tint/20 p-2">
        <Icon name={icon} filled className="text-secondary-fixed-dim" />
      </div>
      <div className="flex-grow">
        <p className="mb-1 font-head text-sm text-on-primary-fixed-variant">
          {label}
        </p>
        <div>{children}</div>
      </div>
    </div>
  );
}
