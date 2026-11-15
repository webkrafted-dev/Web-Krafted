import { useEffect } from "react";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";

function setMeta(attr, key, value) {
  if (!value) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function usePageMeta(title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION, image = OG_IMAGE) {
  useEffect(() => {
    const path = window.location.pathname || "/";
    const url = absoluteUrl(path);
    const imageUrl = image?.startsWith("http") ? image : absoluteUrl(image || OG_IMAGE);
    const resolvedTitle = title || DEFAULT_TITLE;
    const resolvedDescription = description || DEFAULT_DESCRIPTION;

    document.title = resolvedTitle;
    setMeta("name", "description", resolvedDescription);
    setMeta("name", "robots", "index,follow,max-image-preview:large");
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", "en_US");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:title", resolvedTitle);
    setMeta("property", "og:description", resolvedDescription);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", imageUrl);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", resolvedTitle);
    setMeta("name", "twitter:description", resolvedDescription);
    setMeta("name", "twitter:image", imageUrl);
    setLink("canonical", url);
  }, [title, description, image]);
}
