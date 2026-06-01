import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { Analytics } from "@/components/analytics";
import { OrganizationJsonLd } from "@/components/json-ld";
import { getSettings } from "@/lib/data";
import { site } from "@/lib/site";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const s = (await getSettings()) ?? site;

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-secondary focus:px-4 focus:py-2 focus:font-head focus:text-sm focus:text-on-secondary"
      >
        تخطٍّ إلى المحتوى
      </a>
      <OrganizationJsonLd settings={{ name: s.name, url: s.url, email: s.email, phone: s.phone }} />
      <Navbar siteName={s.name} />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer
        settings={{
          name: s.name,
          email: s.email,
          phone: s.phone,
          phoneDisplay: s.phoneDisplay,
          address: s.address,
        }}
      />
      <WhatsAppFab whatsapp={s.whatsapp} />
      <Analytics />
    </div>
  );
}
