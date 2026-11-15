import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Wordmark from "@/components/Wordmark";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import useInsightCategories from "@/hooks/useInsightCategories";
import { TAGLINE } from "@/lib/site";

const exploreLinks = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "Pricing", to: "/pricing" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Use", to: "/terms" },
  { label: "Payment Policy & Terms", to: "/terms-and-conditions" },
];
const linkStyle = "inline-flex min-h-8 items-center text-sm text-mist/80 transition-colors hover:text-lime";

export default function Footer() {
  const insightCategories = useInsightCategories();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-navy-deep">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_320px_at_15%_0%,rgba(184,255,59,0.08),transparent_60%)]" />
      <div className="shell relative py-16 lg:py-20">
        <div className="mb-14 grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="eyebrow text-lime">
              <span className="h-px w-7 bg-lime/80" aria-hidden="true" />
              Start something considered
            </p>
            <h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold leading-[0.98] tracking-[-0.04em] text-paper sm:text-4xl">
              A website that feels as intentional as the idea behind it.
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <Link
              to="/contact"
              className="motion-cta inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 font-heading text-sm font-semibold text-navy shadow-glow"
            >
              Start a Project <ArrowUpRight className="motion-arrow h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-3">
            <Wordmark />
            <p className="mt-5 text-sm text-mist">{TAGLINE}</p>
            <p className="mt-6 text-sm text-mist/70">Founded by Wanangwa Kamanga</p>
          </div>

          <nav aria-label="Explore" className="lg:col-span-2">
            <h2 className="font-heading text-[10px] font-semibold uppercase tracking-[0.26em] text-mist/60">Explore</h2>
            <ul className="mt-4 space-y-1.5">
              {exploreLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkStyle}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="font-heading text-[10px] font-semibold uppercase tracking-[0.26em] text-mist/60">Services</h2>
            <ul className="mt-4 space-y-1.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link to={`/services#${service.slug}`} className={linkStyle}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-8 sm:grid-cols-2 sm:col-span-2 lg:col-span-4">
            <nav aria-label="Selected work">
              <h2 className="font-heading text-[10px] font-semibold uppercase tracking-[0.26em] text-mist/60">Selected work</h2>
              <ul className="mt-4 space-y-1.5">
                {projects.map((project) => (
                  <li key={project.slug}>
                    <Link to={`/work/${project.slug}`} className={linkStyle}>
                      {project.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/work" className={`${linkStyle} font-semibold text-lime`}>
                    All projects
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Insights by category">
              <h2 className="font-heading text-[10px] font-semibold uppercase tracking-[0.26em] text-mist/60">Insights</h2>
              <ul className="mt-4 space-y-1.5">
                {insightCategories.map((category) => (
                  <li key={category}>
                    <Link to={`/insights?category=${encodeURIComponent(category)}`} className={linkStyle}>
                      {category}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/insights" className={`${linkStyle} font-semibold text-lime`}>
                    All insights
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-mist/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WK Web Krafted Studios. All rights reserved.</p>
          <p>Concept projects on this site are illustrative, not client work.</p>
        </div>
      </div>
    </footer>
  );
}
