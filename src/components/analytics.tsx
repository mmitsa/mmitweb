import Script from "next/script";

/**
 * Privacy-friendly, self-hostable analytics. Renders nothing unless
 * configured via env vars — enable EITHER Umami or Plausible:
 *
 *   Umami:     NEXT_PUBLIC_UMAMI_SRC + NEXT_PUBLIC_UMAMI_WEBSITE_ID
 *   Plausible: NEXT_PUBLIC_PLAUSIBLE_DOMAIN (+ optional NEXT_PUBLIC_PLAUSIBLE_SRC)
 */
export function Analytics() {
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const plausibleSrc =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.js";

  if (umamiSrc && umamiId) {
    return (
      <Script
        src={umamiSrc}
        data-website-id={umamiId}
        strategy="afterInteractive"
        defer
      />
    );
  }

  if (plausibleDomain) {
    return (
      <Script
        src={plausibleSrc}
        data-domain={plausibleDomain}
        strategy="afterInteractive"
        defer
      />
    );
  }

  return null;
}
