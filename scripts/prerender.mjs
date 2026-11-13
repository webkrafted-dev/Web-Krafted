import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { projects } from "../src/data/projects.js";
import { insightsSeed } from "../src/data/insightsSeed.js";
import { pricingTiers } from "../src/data/pricing.js";
import { services } from "../src/data/services.js";
import {
  BRAND_NAME,
  LOGO_PATH,
  SITE_ORIGIN,
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_PATH,
  absoluteSiteUrl,
} from "../src/data/siteMeta.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const templatePath = path.join(dist, "index.html");
const template = await readFile(templatePath, "utf8");

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function page(pathname, title, description, h1, intro, sections = [], options = {}) {
  const cleanDescription = String(description || "").trim();
  const boundedDescription = cleanDescription.length <= 160
    ? cleanDescription
    : `${cleanDescription.slice(0, 157).replace(/\s+\S*$/, "").trimEnd()}…`;
  return { pathname, title, description: boundedDescription, h1, intro, sections, ...options };
}

function section(title, html) {
  return { title, html };
}

function seoArticleTitle(postTitle) {
  const suffix = ` — ${BRAND_NAME}`;
  if (`${postTitle}${suffix}`.length <= 60) return `${postTitle}${suffix}`;
  let shortened = String(postTitle).replace(/^How to\s+/i, "").trim();
  const maxPrefix = 60 - suffix.length;
  if (shortened.length > maxPrefix) {
    shortened = shortened.slice(0, maxPrefix).replace(/\s+\S*$/, "").trimEnd();
  }
  return `${shortened.charAt(0).toUpperCase()}${shortened.slice(1)}${suffix}`;
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function internalLink(href, label) {
  return `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
}

function stripMarkdown(markdown = "") {
  return String(markdown)
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*(?:[-*+]\s+|\d+\.\s+)/gm, "")
    .replace(/[`*_~]/g, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function paragraphMarkup(text) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
}

async function getPublishedPosts() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL
    || process.env.NEXT_PUBLIC_SUPABASE_URL
    || process.env.SUPABASE_URL;
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY
    || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    || process.env.SUPABASE_ANON_KEY
    || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    || process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !anonKey) return insightsSeed;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    const endpoint = new URL("/rest/v1/posts", supabaseUrl);
    endpoint.search = new URLSearchParams({
      select: "title,slug,excerpt,content,category,read_time,published_date",
      published: "eq.true",
      order: "published_date.desc",
    }).toString();
    const response = await fetch(endpoint, {
      headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
      signal: controller.signal,
    });
    if (!response.ok) {
      console.warn(`Prerender: published articles were not fetched (HTTP ${response.status}); article routes are omitted from the generated sitemap.`);
      return [];
    }
    const posts = await response.json();
    return Array.isArray(posts)
      ? posts.filter((post) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post?.slug || "") && post?.title)
      : [];
  } catch (error) {
    console.warn(`Prerender: published articles were not fetched (${error.name === "AbortError" ? "timeout" : "network error"}); article routes are omitted from the generated sitemap.`);
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

const posts = await getPublishedPosts();
const serviceItems = services.map((item) =>
  `<li>${internalLink(`/services#${item.slug}`, item.title)} — ${escapeHtml(item.oneLine)}</li>`
);
const projectLinks = projects.map((project) =>
  `<li>${internalLink(`/work/${project.slug}`, project.name)} — ${escapeHtml(project.tagline)} <span>Concept project.</span></li>`
);
const priceItems = pricingTiers.map((tier) =>
  `<li><strong>${escapeHtml(tier.name)}: ${escapeHtml(tier.price)}.</strong> ${escapeHtml(tier.summary)}</li>`
);
const articleLinks = posts.map((post) =>
  `<li>${internalLink(`/insights/${post.slug}`, post.title)} — ${escapeHtml(post.excerpt || "Read this WK Studios insight.")}</li>`
);

const pages = [
  page(
    "/",
    "WK Studios — Web design & development",
    "Thoughtfully designed websites for businesses, creators, portfolios, communities, and events. Explore clear pricing, concept work, and project services.",
    "Digital experiences, built around your next idea.",
    "From business websites and online shops to portfolios, creator link pages, clubs, and event sites, we build around the people and purpose behind each idea.",
    [
      section("What we build", `<p>We plan, design, and build websites for businesses, creators, personal projects, clubs, communities, events, and online shops.</p>${list(serviceItems)}`),
      section("Selected concept work", `<p>These demonstrations show a range of digital experiences. Each is a fictional concept project, not commissioned client work.</p>${list(projectLinks)}`),
      section("Clear starting prices", `<p>One-time project fees in USD, unless a monthly amount is marked.</p>${list(priceItems)}<p>${internalLink("/pricing", "View package details and scope notes")}</p>`),
      section("Ideas and insights", articleLinks.length ? list(articleLinks) : `<p>Practical articles about website planning, mobile-first design, and preparing project content will appear here.</p>`),
    ]
  ),
  page(
    "/work",
    "Concept Website Portfolio — WK Studios",
    "Explore fictional website concepts for hospitality, creators, sports clubs, consulting, and community events. Each project is labelled as concept work.",
    "Selected concept work",
    "Concept projects created to demonstrate our design and development approach. They are not commissioned client work.",
    [
      section("About these concepts", `<p>Summit Sports Academy, Ember &amp; Oak, Northline Consulting, Lena Rowe, and Fieldnote Market are fictional brands spanning business, creator, portfolio, club, and community-event websites. Each demonstration is designed and built by WK Studios. No client quotes, results, or metrics are claimed.</p>`),
      section("Explore the projects", list(projectLinks)),
    ]
  ),
  page(
    "/services",
    "Website Design & Development Services — WK Studios",
    "Business websites, personal portfolios, creator link pages, community and event sites, e-commerce, web apps, and ongoing care.",
    "Websites for businesses, personal projects, and everything between",
    "Business websites remain a key part of our work. We also build personal portfolios, creator link pages, club and community sites, event and leisure pages, shops, and custom web apps—shaped around each project's purpose and audience.",
    [
      section("Services", list(serviceItems)),
      section("How projects start", `<p>A short conversation, a clear written scope, and a timeline you can plan around. The agreed pages, features, and deliverables are confirmed before work begins.</p>${internalLink("/contact", "Tell us about your project")}`),
    ]
  ),
  page(
    "/pricing",
    "Website Pricing & Packages — WK Studios",
    "Explore one-time USD launch pricing for business websites, portfolios, creator pages, community sites, shops, and web apps. Prices start at $50.",
    "Four clear starting ranges. Scope matched to your goals.",
    "Business sites remain central, alongside personal portfolios, creator link pages, club and leisure sites, shops, and more. All project fees are one-time unless marked monthly.",
    [
      section("Starting packages", list(priceItems)),
      section("Project-specific scope", `<p>Complex projects receive a custom quote. Final pricing depends on the agreed pages, features, content, integrations, and timeline. The prices shown are starting ranges, not a binding offer.</p><p>${internalLink("/terms-and-conditions", "Read the Payment Policy & Terms & Conditions")}</p>`),
    ]
  ),
  page(
    "/insights",
    "Website & Design Insights — WK Studios",
    "Practical ideas about websites, design, mobile-first experiences, content preparation, and building a stronger online presence.",
    "Thoughtful advice for a better web presence.",
    "Practical ideas about websites, design, and building a stronger online presence.",
    [section("Latest articles", articleLinks.length ? list(articleLinks) : `<p>There are no published insights yet. Check back soon.</p>`)]
  ),
  page(
    "/about",
    "About WK Studios — Web Design & Development",
    "Learn about WK Studios and our collaborative approach to websites for businesses, creators, individuals, clubs, and organisations.",
    "Thoughtful work, clear process, no guesswork",
    "WK Studios helps businesses, individuals, creators, clubs, and organisations turn ideas into useful online experiences. The process is collaborative, the scope is written down, and the finished site belongs to you.",
    [
      section("How we work", list([
        "<strong>Precision.</strong> Layouts follow a consistent grid, type scale, and spacing system; each element earns its place.",
        "<strong>Clear communication.</strong> Plain-language updates explain what is in progress, what is waiting, and what happens next.",
        "<strong>Reliable delivery.</strong> A written scope, agreed timeline, and tested build lead to a clear handover.",
      ])),
      section("A process you can follow", list([
        "Discovery: agree the idea, audience, and requirements.",
        "Clear scope: receive a written proposal covering pages, features, timing, and price.",
        "Design and build: create the site for real content, devices, and users.",
        "Review and handover: test the agreed flows and transfer the files and accounts in your control.",
      ])),
    ]
  ),
  page(
    "/contact",
    "Start a Website Project — WK Studios",
    "Tell WK Studios about a business website, portfolio, creator page, club, event, or personal project and receive a clear next step.",
    "Start a project",
    "Tell us what you have in mind. A few sentences is enough to begin; we will come back with questions or a clear next step.",
    [
      section("What happens next", list([
        "We review your enquiry and any links you share.",
        "We reply with questions or a proposed next step.",
        "You receive a clear scope, timeline, and quote.",
      ])),
      section("Enquiry details", `<p>The interactive form asks for your name, email address, project type, a short project description, and optional budget or deadline details. Form submissions are handled by the website application.</p><p>${internalLink("/privacy", "Read the Privacy Policy")}</p>`),
    ]
  ),
  page(
    "/privacy",
    "Privacy Policy & Data Use — WK Studios",
    "How WK Studios handles information submitted through the project enquiry and quick message forms, how it is used, and how to request deletion.",
    "Privacy Policy",
    "This page explains the information the website collects through its forms, how it is used, and how to request a copy or deletion.",
    [
      section("What the site collects", `<p>Project enquiries and quick messages can include your name, email address, optional organisation or project name, and details you choose to share.</p>`),
      section("How information is used", `<p>Submission details are used to respond to enquiries, prepare project scopes or quotes, and keep track of the conversation. The published policy also describes database storage, service providers, retention, and deletion requests.</p>`),
      section("Draft status", `<p>The published Privacy Policy is labelled as a starter draft and should be reviewed before being relied on as a final policy.</p>`),
    ]
  ),
  page(
    "/terms",
    "Website Terms of Use — WK Studios",
    "Terms covering use of the WK Studios website, clearly labelled concept work, and the indicative nature of published prices.",
    "Terms of Use",
    "These terms cover use of this website, concept projects, indicative pricing, enquiries, and website content.",
    [
      section("Concept work", `<p>Projects shown on the site are fictional concept projects created to demonstrate design and development approach. They are not commissioned client work.</p>`),
      section("Indicative pricing", `<p>Published prices are starting estimates. Final pricing is confirmed in a written quote after scope and requirements are discussed.</p>`),
      section("Client project terms", `<p>${internalLink("/terms-and-conditions", "Read the Payment Policy & Terms & Conditions")}</p>`),
    ]
  ),
  page(
    "/terms-and-conditions",
    "Payment Policy & Terms — WK Studios",
    "How website project scope, milestone payments, revisions, handover, ownership, cancellations, and related services are handled.",
    "Payment Policy & Terms & Conditions",
    "A clear starting point for how projects are scoped, paid for, delivered, and handed over. Each written proposal confirms the terms for its project.",
    [
      section("Payment policy", `<p>Unless another schedule is agreed in writing, the usual payment sequence is 50% to confirm and book the project, 30% at an agreed progress milestone, and 20% before final handover.</p>`),
      section("Scope, revisions, and handover", `<p>Project scope, price, milestone dates, included revisions, exclusions, and handover are confirmed in a written proposal or agreement. Work outside the agreed scope requires discussion and approval.</p>`),
      section("Important note", `<p>This page is a general draft, not legal advice. Laws vary by location; have it reviewed by a qualified legal professional before relying on it.</p>`),
    ]
  ),
];

for (const project of projects) {
  pages.push(page(
    `/work/${project.slug}`,
    `${project.name} — Concept Website | ${BRAND_NAME}`,
    project.summary,
    project.name,
    project.tagline,
    [
      section("The brief", `<p>${escapeHtml(project.objective)}</p><p>${escapeHtml(project.summary)}</p>`),
      section("Audience and approach", `<p>${escapeHtml(project.audience)}</p>${list(project.design.map((item) => escapeHtml(item)))}`),
      section("Key features", list(project.features.map((feature) => escapeHtml(feature)))),
      section("Concept disclosure", `<p>This is a fictional concept project created to demonstrate design and development approach. It is not commissioned client work.</p>`),
      section("Next steps", `<p>${internalLink("/work", "Explore all concept work")} · ${internalLink("/contact", "Discuss a project")}</p>`),
    ],
    { type: "website" }
  ));
}

for (const post of posts) {
  const articleText = stripMarkdown(post.content || "");
  const articleBody = articleText
    ? paragraphMarkup(articleText)
    : `<p>This article is being prepared. Please check back soon.</p>`;
  pages.push(page(
    `/insights/${post.slug}`,
    seoArticleTitle(post.title),
    post.excerpt || `Ideas about ${post.category || "websites"}, design, and building a stronger online presence.`,
    post.title,
    post.excerpt || "A WK Studios insight about websites, design, and building a useful online presence.",
    [
      section(post.category || "Insights", articleBody),
      section("More ideas", `<p>${internalLink("/insights", "Browse all insights")}</p>`),
    ],
    { type: "article" }
  ));
}

const privateRoutes = [
  ["/admin", "Studio admin", "Sign in to access private website administration."],
  ["/admin/posts", "Studio posts admin", "Sign in to manage published insight content."],
  ["/login", "Sign in", "Sign in to your WK Studios account."],
  ["/register", "Create account", "Create an account for WK Studios site administration."],
  ["/forgot-password", "Reset password", "Request a secure account password reset."],
  ["/reset-password", "Set a new password", "Set a new password for your WK Studios account."],
].map(([pathname, label, description]) => page(
  pathname,
  `${label} — ${BRAND_NAME}`,
  description,
  label,
  description,
  [section("Private area", `<p>This route is not intended for search indexing. ${internalLink("/", "Return to the public website")}</p>`)],
  { noindex: true }
));

pages.push(...privateRoutes);

function renderSnapshot(currentPage) {
  const sectionMarkup = currentPage.sections.map((item) =>
    `<section class="seo-snapshot__section"><h2>${escapeHtml(item.title)}</h2>${item.html}</section>`
  ).join("");
  const title = escapeHtml(currentPage.h1);
  const intro = escapeHtml(currentPage.intro);
  return `<div class="seo-snapshot"><a class="seo-snapshot__skip" href="#main">Skip to content</a><header class="seo-snapshot__header"><div class="seo-snapshot__bar"><a class="seo-snapshot__brand" href="/" aria-label="${BRAND_NAME} home"><img src="${LOGO_PATH}" width="266" height="112" alt="${BRAND_NAME}" /></a><nav class="seo-snapshot__nav" aria-label="Main navigation"><a href="/work">Work</a><a href="/services">Services</a><a href="/pricing">Pricing</a><a href="/insights">Insights</a><a href="/about">About</a><a href="/contact">Contact</a></nav></div></header><main class="seo-snapshot__main" id="main"><div class="seo-snapshot__content"><p class="seo-snapshot__eyebrow">${escapeHtml(currentPage.pathname === "/" ? "Ideas · Websites · Real Impact" : BRAND_NAME)}</p><h1 class="seo-snapshot__title">${title}</h1><p class="seo-snapshot__intro">${intro}</p>${sectionMarkup}<section class="seo-snapshot__section"><h2>Start a conversation</h2><p>Share the idea, audience, and features you have in mind. ${internalLink("/contact", "Start a project")}</p></section></div></main><footer class="seo-snapshot__footer"><div class="seo-snapshot__bar"><span>© ${new Date().getUTCFullYear()} ${BRAND_NAME}</span><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/terms-and-conditions">Payment policy</a></div></footer></div>`;
}

function setMetaTag(html, attribute, key, value) {
  const safeAttribute = escapeHtml(attribute);
  const safeKey = escapeHtml(key);
  const tag = `<meta ${safeAttribute}="${safeKey}" content="${escapeHtml(value)}" />`;
  const pattern = new RegExp(`<meta\\s+${safeAttribute}="${safeKey}"[^>]*>`, "i");
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function buildHtml(currentPage) {
  let html = template;
  const canonical = absoluteSiteUrl(currentPage.pathname);
  const image = absoluteSiteUrl(SOCIAL_IMAGE_PATH);
  const title = currentPage.title;
  const description = currentPage.description;

  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(/<link\s+rel="canonical"[^>]*>/i, "");
  html = html.replace("</head>", `    <link rel="canonical" href="${escapeHtml(canonical)}" />\n  </head>`);
  html = setMetaTag(html, "name", "description", description);
  html = setMetaTag(html, "property", "og:type", currentPage.type || "website");
  html = setMetaTag(html, "property", "og:site_name", BRAND_NAME);
  html = setMetaTag(html, "property", "og:title", title);
  html = setMetaTag(html, "property", "og:description", description);
  html = setMetaTag(html, "property", "og:url", canonical);
  html = setMetaTag(html, "property", "og:image", image);
  html = setMetaTag(html, "property", "og:image:alt", SOCIAL_IMAGE_ALT);
  html = setMetaTag(html, "property", "og:image:width", "1200");
  html = setMetaTag(html, "property", "og:image:height", "630");
  html = setMetaTag(html, "name", "twitter:card", "summary_large_image");
  html = setMetaTag(html, "name", "twitter:title", title);
  html = setMetaTag(html, "name", "twitter:description", description);
  html = setMetaTag(html, "name", "twitter:image", image);
  html = setMetaTag(html, "name", "twitter:image:alt", SOCIAL_IMAGE_ALT);

  const robotsPattern = /<meta\s+name="robots"[^>]*>/i;
  html = html.replace(robotsPattern, "");
  if (currentPage.noindex) {
    html = html.replace("</head>", `    <meta name="robots" content="noindex,nofollow" />\n  </head>`);
  }

  html = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, "");
  if (currentPage.pathname === "/") {
    const organization = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_ORIGIN,
      logo: absoluteSiteUrl(LOGO_PATH),
    };
    const json = JSON.stringify(organization).replace(/</g, "\\u003c");
    html = html.replace("</head>", `    <script type="application/ld+json">${json}</script>\n  </head>`);
  }

  const rootPattern = /<div id="root"><\/div>/i;
  if (!rootPattern.test(html)) throw new Error("Prerender: expected an empty #root element in dist/index.html.");
  html = html.replace(rootPattern, `<div id="root">${renderSnapshot(currentPage)}</div>`);
  return html;
}

for (const currentPage of pages) {
  const routePath = currentPage.pathname === "/"
    ? path.join(dist, "index.html")
    : path.join(dist, currentPage.pathname.slice(1), "index.html");
  await mkdir(path.dirname(routePath), { recursive: true });
  await writeFile(routePath, buildHtml(currentPage), "utf8");
}

const indexablePages = pages.filter((currentPage) => !currentPage.noindex);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexablePages.map((currentPage) => `  <url><loc>${escapeHtml(absoluteSiteUrl(currentPage.pathname))}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap, "utf8");

console.log(`Prerendered ${indexablePages.length} public routes and ${privateRoutes.length} noindex application routes.`);
