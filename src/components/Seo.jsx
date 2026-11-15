import { useEffect } from "react";
import { organizationJsonLd } from "@/lib/site";

export default function Seo() {
  useEffect(() => {
    const existing = document.getElementById("wk-org-jsonld");
    const script = existing || document.createElement("script");
    script.id = "wk-org-jsonld";
    script.type = "application/ld+json";
    script.text = JSON.stringify(organizationJsonLd());
    if (!existing) document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) script.remove();
    };
  }, []);

  return null;
}
