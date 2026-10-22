import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Wordmark from "@/components/Wordmark";

const nav = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "Pricing", to: "/pricing" },
  { label: "Insights", to: "/insights" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { pathname } = useLocation();
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const getFocusable = () =>
      panel ? Array.from(panel.querySelectorAll('a[href], button:not([disabled])')) : [];

    getFocusable()[0]?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-white/10 transition-colors duration-300 ${
        scrolled ? "bg-navy/95 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.8)] backdrop-blur" : "bg-navy/85 backdrop-blur-sm"
      }`}
    >
      <div className="shell flex h-[68px] items-center justify-between gap-6">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-0 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `relative whitespace-nowrap rounded-md px-2.5 py-2 font-heading text-[13px] font-medium tracking-wide transition-colors duration-200 xl:px-3 ${
                  isActive ? "text-lime" : "text-mist hover:text-paper"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="primary-navigation-indicator"
                      aria-hidden="true"
                      className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-lime xl:inset-x-3"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden items-center gap-1.5 rounded-lg bg-lime px-5 py-2.5 font-heading text-[13px] font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:bg-lime-deep sm:inline-flex"
          >
            Start a Project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 text-paper transition-colors hover:border-lime hover:text-lime lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {open &&
        createPortal(
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 flex flex-col bg-navy lg:hidden"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="shell flex h-[68px] items-center justify-between">
            <Wordmark />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 text-paper transition-colors hover:border-lime hover:text-lime"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile" className="shell flex flex-1 flex-col gap-1 overflow-y-auto pb-8 pt-4">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex min-h-[56px] items-center justify-between border-b border-white/10 font-heading text-2xl font-semibold tracking-tight transition-colors ${
                    isActive ? "text-lime" : "text-paper"
                  }`
                }
              >
                {item.label}
                <ArrowUpRight className="h-5 w-5 opacity-50" aria-hidden="true" />
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded-lg bg-lime px-6 font-heading text-base font-semibold text-navy"
            >
              Start a Project
            </Link>
          </nav>
        </motion.div>,
        document.body
      )}
    </header>
  );
}
