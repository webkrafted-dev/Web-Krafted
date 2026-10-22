import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Wordmark from "@/components/Wordmark";

const links = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "Insights", to: "/insights" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="mt-5 font-heading text-lg font-semibold text-paper">
              WK Web Krafted Studios
            </p>
            <span aria-hidden="true" className="mt-4 block h-[2px] w-10 bg-lime" />
            <p className="mt-3 text-sm text-mist">Ideas. Websites. Real Impact.</p>
            <p className="mt-6 text-sm text-mist/80">Founded by Wanangwa Kamanga</p>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm text-mist transition-colors duration-200 hover:border-lime hover:text-lime"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="3.6" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
              </svg>
              Instagram
            </a>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.24em] text-mist/70">
              Explore
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-y-2.5 sm:gap-y-3">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex min-h-[32px] items-center text-sm text-mist transition-colors hover:text-lime"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="font-heading text-[11px] font-semibold uppercase tracking-[0.24em] text-mist/70">
              Start a project
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-mist">
              Tell us what you need and we'll reply with a clear next step.
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-lime transition-opacity hover:opacity-80"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <ul className="mt-6 space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-mist/80 transition-colors hover:text-lime">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-mist/80 transition-colors hover:text-lime">
                  Terms of Use
                </Link>
              </li>
            </ul>
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