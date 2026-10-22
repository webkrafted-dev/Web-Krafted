import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Wordmark from "@/components/Wordmark";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import useInsightCategories from "@/hooks/useInsightCategories";

const exploreLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Use", to: "/terms" },
];
const linkStyle = "inline-flex min-h-8 items-center text-sm text-mist transition-colors hover:text-lime";

export default function Footer() {
  const insightCategories = useInsightCategories();

  return (
    <footer className="border-t border-white/10 bg-navy">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-3">
            <Wordmark />
            <span aria-hidden="true" className="mt-4 block h-[2px] w-10 bg-lime" />
            <p className="mt-3 text-sm text-mist">Ideas. Websites. Real Impact.</p>
            <p className="mt-6 text-sm text-mist/80">Founded by Wanangwa Kamanga</p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-lime px-4 py-2.5 font-heading text-sm font-semibold text-navy transition-transform duration-200 hover:-translate-y-0.5"
            >
              Start a Project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <nav aria-label="Explore" className="lg:col-span-2">
            <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.24em] text-mist/70">
              Explore
            </h2>
            <ul className="mt-4 space-y-1">
              {exploreLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkStyle}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.24em] text-mist/70">
              Services
            </h2>
            <ul className="mt-4 space-y-1">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link to={`/services#${service.slug}`} className={linkStyle}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-8 sm:grid-cols-2 sm:col-span-2 lg:col-span-4">
            <nav aria-label="Selected work">
              <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.24em] text-mist/70">
                Selected work
              </h2>
              <ul className="mt-4 space-y-1">
                {projects.map((project) => (
                  <li key={project.slug}>
                    <Link to={`/work/${project.slug}`} className={linkStyle}>{project.name}</Link>
                  </li>
                ))}
                <li><Link to="/work" className={`${linkStyle} font-semibold text-lime`}>All projects</Link></li>
              </ul>
            </nav>

            <nav aria-label="Insights by category">
              <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.24em] text-mist/70">
                Insights
              </h2>
              <ul className="mt-4 space-y-1">
                {insightCategories.map((category) => (
                  <li key={category}>
                    <Link to={`/insights?category=${encodeURIComponent(category)}`} className={linkStyle}>{category}</Link>
                  </li>
                ))}
                <li><Link to="/insights" className={`${linkStyle} font-semibold text-lime`}>All insights</Link></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-mist/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WK Web Krafted Studios. All rights reserved.</p>
          <p className="text-mist/60">Concept projects on this site are illustrative, not client work.</p>
        </div>
      </div>
    </footer>
  );
}
