export const SITE_NAME = "WK Web Krafted Studios";
export const SITE_SHORT = "WK Studios";
export const DEFAULT_TITLE = "WK Web Krafted Studios — Web design & development";
export const DEFAULT_DESCRIPTION =
  "Thoughtfully designed websites for businesses, creators, individuals, clubs, and communities. Business sites, portfolios, creator link pages, events, e-commerce, and custom web apps.";
export const OG_IMAGE = "/atmosphere/tools.jpg";
export const TAGLINE = "Ideas. Websites. Real Impact.";

export function absoluteUrl(path = "/") {
  if (typeof window === "undefined") return path;
  const origin = window.location.origin;
  if (!path) return origin;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationJsonLd() {
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    alternateName: SITE_SHORT,
    description: DEFAULT_DESCRIPTION,
    url: origin || undefined,
    image: origin ? `${origin}${OG_IMAGE}` : undefined,
    founder: {
      "@type": "Person",
      name: "Wanangwa Kamanga",
    },
    areaServed: "Worldwide",
    serviceType: [
      "Website design",
      "Website development",
      "Landing pages",
      "E-commerce websites",
      "Web applications",
    ],
  };
}
