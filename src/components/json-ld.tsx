export type OrgSettings = {
  name: string;
  url: string;
  email: string;
  phone: string;
};

export function OrganizationJsonLd({ settings }: { settings: OrgSettings }) {
  const tel = `+966${settings.phone.replace(/^0/, "")}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.name,
    alternateName: "MMIT",
    url: settings.url,
    email: settings.email,
    telephone: tel,
    description:
      "مسارات المستكشف للاتصالات وتقنية المعلومات — حلول الاتصالات والشبكات، البنية التحتية، الأمن السيبراني، والتحول الرقمي في المملكة العربية السعودية.",
    areaServed: "SA",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
      addressRegion: "الرياض",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: tel,
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

export function BreadcrumbJsonLd({
  items,
  baseUrl,
}: {
  items: { name: string; path: string }[];
  baseUrl: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${baseUrl}${it.path}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
