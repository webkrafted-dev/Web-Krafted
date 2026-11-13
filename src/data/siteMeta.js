export const BRAND_NAME = "WK Studios";
export const SITE_ORIGIN = "https://web-krafted.vercel.app";
export const SOCIAL_IMAGE_PATH = "/images/wk-studios-og.png";
export const SOCIAL_IMAGE_ALT = "WK Studios — thoughtful websites for businesses, creators, portfolios, and communities";
export const LOGO_PATH = "/wk-mark-on-light.png";

export function absoluteSiteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, SITE_ORIGIN).toString();
}
