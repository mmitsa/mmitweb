import { site } from "@/lib/site";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: "MMIT",
    url: site.url,
    email: site.email,
    telephone: `+966${site.phone.replace(/^0/, "")}`,
    description:
      "مسارات المستكشف للاتصالات وتقنية المعلومات — حلول الاتصالات والشبكات، البنية التحتية، الأمن السيبراني، والتحول الرقمي في المملكة العربية السعودية.",
    areaServed: "SA",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
      addressRegion: "الرياض",
      addressLocality: "حي الصحافة",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+966${site.phone.replace(/^0/, "")}`,
      contactType: "customer service",
      areaServed: "SA",
      availableLanguage: ["Arabic", "English"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
