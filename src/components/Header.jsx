import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
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
    if (!open) return undefined;
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

  const mobileNavVariants = {
    closed: {},
    open: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.045,
        delayChildren: prefersReducedMotion ? 0 : 0.035,
      },
    },
  };
  const mobileLinkVariants = {
    closed: prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 14 },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] },
    },
  };

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
                  isActive
                    ? "text-lime"
                    : "text-mist after:pointer-events-none after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:rounded-full after:bg-lime/80 after:transition-transform after:duration-200 hover:text-paper hover:after:scale-x-100 xl:after:inset-x-3"
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
                      transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
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
            className="motion-cta hidden items-center gap-1.5 rounded-lg bg-lime px-5 py-2.5 font-heading text-[13px] font-semibold text-navy shadow-[0_10px_24px_-14px_rgba(0,0,0,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-lime-deep sm:inline-flex"
          >
            Start a Project
            <ArrowUpRight className="motion-arrow h-4 w-4" aria-hidden="true" />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            className="motion-cta grid h-11 w-11 place-items-center rounded-lg border border-white/15 text-paper transition-all duration-200 hover:border-lime hover:text-lime lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="mobile-menu"
                id="mobile-menu"
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label="Site menu"
                className="fixed inset-0 z-50 flex flex-col bg-navy lg:hidden"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                onClick={(event) => {
                  if (event.target === event.currentTarget) setOpen(false);
                }}
              >
                <div className="shell flex h-[68px] items-center justify-between">
                  <Wordmark onClick={() => setOpen(false)} />
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      toggleRef.current?.focus();
                    }}
                    className="motion-cta grid h-11 w-11 place-items-center rounded-lg border border-white/15 text-paper transition-all duration-200 hover:border-lime hover:text-lime"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <motion.nav
                  aria-label="Mobile"
                  className="shell flex flex-1 flex-col gap-1 overflow-y-auto pb-8 pt-4"
                  variants={mobileNavVariants}
                  initial={prefersReducedMotion ? false : "closed"}
                  animate="open"
                >
                  {nav.map((item) => (
                    <motion.div key={item.to} variants={mobileLinkVariants} className="w-full">
                      <NavLink
                        to={item.to}
                        end={item.to === "/"}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `group flex min-h-[56px] items-center justify-between border-b border-white/10 font-heading text-2xl font-semibold tracking-tight transition-colors ${
                            isActive ? "text-lime" : "text-paper hover:text-lime"
                          }`
                        }
                      >
                        {item.label}
                        <ArrowUpRight className="h-5 w-5 opacity-50 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                      </NavLink>
                    </motion.div>
                  ))}
                  <motion.div variants={mobileLinkVariants} className="mt-6">
                    <Link
                      to="/contact"
                      onClick={() => setOpen(false)}
                      className="motion-cta inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-lime px-6 font-heading text-base font-semibold text-navy"
                    >
                      Start a Project
                      <ArrowUpRight className="motion-arrow h-4 w-4" aria-hidden="true" />
                    </Link>
                  </motion.div>
                </motion.nav>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
}
