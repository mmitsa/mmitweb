import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { Analytics } from "@/components/analytics";
import { OrganizationJsonLd } from "@/components/json-ld";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-secondary focus:px-4 focus:py-2 focus:font-head focus:text-sm focus:text-on-secondary"
      >
        تخطٍّ إلى المحتوى
      </a>
      <OrganizationJsonLd />
      <Navbar />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer />
      <WhatsAppFab />
      <Analytics />
    </div>
  );
}
