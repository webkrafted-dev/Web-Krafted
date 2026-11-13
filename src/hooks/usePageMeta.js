import { useEffect } from "react";
import { projects } from "@/data/projects";
import {
  BRAND_NAME,
  SITE_ORIGIN,
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_PATH,
} from "@/data/siteMeta";

const STATIC_PAGE_METADATA = {
  "/": {
    title: "WK Studios — Web design & development",
    description: "Thoughtfully designed websites for businesses, creators, portfolios, communities, and events. Explore clear pricing, concept work, and project services.",
  },
  "/work": {
    title: "Concept Website Portfolio — WK Studios",
    description: "Explore fictional website concepts for hospitality, creators, sports clubs, consulting, and community events. Each project is labelled as concept work.",
  },
  "/services": {
    title: "Website Design & Development Services — WK Studios",
    description: "Business websites, personal portfolios, creator link pages, community and event sites, e-commerce, web apps, and ongoing care.",
  },
  "/pricing": {
    title: "Website Pricing & Packages — WK Studios",
    description: "Explore one-time USD launch pricing for business websites, portfolios, creator pages, community sites, shops, and web apps. Prices start at $50.",
  },
  "/insights": {
    title: "Website & Design Insights — WK Studios",
    description: "Practical ideas about websites, design, mobile-first experiences, content preparation, and building a stronger online presence.",
  },
  "/about": {
    title: "About WK Studios — Web Design & Development",
    description: "Learn about WK Studios and our collaborative approach to websites for businesses, creators, individuals, clubs, and organisations.",
  },
  "/contact": {
    title: "Start a Website Project — WK Studios",
    description: "Tell WK Studios about a business website, portfolio, creator page, club, event, or personal project and receive a clear next step.",
  },
  "/privacy": {
    title: "Privacy Policy & Data Use — WK Studios",
    description: "How WK Studios handles information submitted through the project enquiry and quick message forms, how it is used, and how to request deletion.",
  },
  "/terms": {
    title: "Website Terms of Use — WK Studios",
    description: "Terms covering use of the WK Studios website, clearly labelled concept work, and the indicative nature of published prices.",
  },
  "/terms-and-conditions": {
    title: "Payment Policy & Terms — WK Studios",
    description: "How website project scope, milestone payments, revisions, handover, ownership, cancellations, and related services are handled.",
  },
};

function normalizeTitle(title) {
  const normalized = String(title || BRAND_NAME).replaceAll("WK Web Krafted Studios", BRAND_NAME);
  if (normalized.length <= 60) return normalized;
  const suffix = ` — ${BRAND_NAME}`;
  const base = normalized.endsWith(suffix) ? normalized.slice(0, -suffix.length) : normalized;
  let shortened = base.replace(/^How to\s+/i, "").trim();
  const maxPrefix = 60 - suffix.length;
  if (shortened.length > maxPrefix) {
    shortened = shortened.slice(0, maxPrefix).replace(/\s+\S*$/, "").trimEnd();
  }
  return `${shortened.charAt(0).toUpperCase()}${shortened.slice(1)}${suffix}`;
}

function normalizeDescription(description) {
  const clean = String(description || "Thoughtful websites for businesses, creators, portfolios, and communities.").trim();
  if (clean.length <= 160) return clean;
  return `${clean.slice(0, 157).replace(/\s+\S*$/, "").trimEnd()}…`;
}

function setMeta(attribute, key, value) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
}

function setCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", url);
}

function removeMeta(attribute, key) {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove();
}

export default function usePageMeta(title, description, options = {}) {
  const { noindex = false, type = "website" } = options;

  useEffect(() => {
    const pathname = window.location.pathname === "/"
      ? "/"
      : window.location.pathname.replace(/\/+$/, "");
    const canonicalUrl = new URL(pathname, SITE_ORIGIN).toString();
    const caseSlug = pathname.match(/^\/work\/([^/]+)$/)?.[1];
    const project = caseSlug ? projects.find((item) => item.slug === caseSlug) : null;
    const isArticleRoute = /^\/insights\/[^/]+$/.test(pathname);
    const staticMeta = STATIC_PAGE_METADATA[pathname];
    const resolvedTitle = staticMeta?.title
      || (project ? `${project.name} — Concept Website | ${BRAND_NAME}` : title);
    const resolvedDescription = staticMeta?.description || project?.summary || description;
    const pageTitle = normalizeTitle(resolvedTitle);
    const pageDescription = normalizeDescription(resolvedDescription);
    const pageType = isArticleRoute ? "article" : type;
    const isPrivateRoute = /^\/(admin(?:\/|$)|login$|register$|forgot-password$|reset-password$)/.test(pathname);
    const isMissingDetail = (pathname.startsWith("/work/") && !project)
      || (isArticleRoute && noindex);
    const shouldNoindex = noindex || isPrivateRoute || isMissingDetail;
    const socialImage = new URL(SOCIAL_IMAGE_PATH, SITE_ORIGIN).toString();

    document.title = pageTitle;
    setMeta("name", "description", pageDescription);
    setMeta("property", "og:type", pageType);
    setMeta("property", "og:site_name", BRAND_NAME);
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", pageDescription);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", socialImage);
    setMeta("property", "og:image:alt", SOCIAL_IMAGE_ALT);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", pageTitle);
    setMeta("name", "twitter:description", pageDescription);
    setMeta("name", "twitter:image", socialImage);
    setMeta("name", "twitter:image:alt", SOCIAL_IMAGE_ALT);
    setCanonical(canonicalUrl);

    if (shouldNoindex) {
      setMeta("name", "robots", "noindex,nofollow");
    } else {
      removeMeta("name", "robots");
    }
  }, [title, description, noindex, type]);
}
