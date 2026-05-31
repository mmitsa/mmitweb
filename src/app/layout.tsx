import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Tajawal } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { OrganizationJsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
});

const description =
  "مسارات المستكشف: شريكك الموثوق في رحلة التحول الرقمي وحلول الاتصالات وتقنية المعلومات المتقدمة في المملكة العربية السعودية.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — للاتصالات وتقنية المعلومات`,
    template: `%s — ${site.name}`,
  },
  description,
  keywords: [
    "مسارات المستكشف",
    "اتصالات وتقنية معلومات",
    "التحول الرقمي",
    "الأمن السيبراني",
    "شبكات",
    "السعودية",
    "MMIT",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: site.name,
    title: `${site.name} — للاتصالات وتقنية المعلومات`,
    description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — للاتصالات وتقنية المعلومات`,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${ibmPlexArabic.variable} ${tajawal.variable} h-full`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <OrganizationJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-background">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFab />
        <Analytics />
      </body>
    </html>
  );
}
