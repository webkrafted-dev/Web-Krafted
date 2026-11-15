import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Wordmark from "@/components/Wordmark";
import Magnetic from "@/components/Magnetic";

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
    const onScroll = () => setScrolled(window.scrollY > 12);
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
      panel ? Array.from(panel.querySelectorAll("a[href], button:not([disabled])")) : [];
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
    open: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.045, delayChildren: prefersReducedMotion ? 0 : 0.04 } },
  };
  const mobileLinkVariants = {
    closed: prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 },
    open: { opacity: 1, x: 0, transition: { duration: prefersReducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`border-b transition-all duration-500 ${
          scrolled ? "border-white/10 bg-ink/70 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-4 sm:h-[78px]">
          <Wordmark />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `relative rounded-full px-3.5 py-2 font-heading text-[12px] font-medium tracking-[0.04em] transition-colors duration-200 xl:px-4 ${
                    isActive ? "text-lime" : "text-mist hover:text-paper"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="primary-nav-pill"
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full border border-lime/20 bg-lime/10"
                        transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden sm:inline-flex">
              <Link
                to="/contact"
                className="motion-cta inline-flex items-center gap-1.5 rounded-full border border-lime/40 bg-lime px-5 py-2.5 font-heading text-[12px] font-semibold text-navy shadow-glow"
              >
                Start a Project
                <ArrowUpRight className="motion-arrow h-4 w-4" aria-hidden="true" />
              </Link>
            </Magnetic>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              className="motion-cta grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-paper backdrop-blur hover:border-lime/50 hover:text-lime lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
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
                className="fixed inset-0 z-[60] flex flex-col bg-ink/98 backdrop-blur-xl lg:hidden"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                onClick={(event) => {
                  if (event.target === event.currentTarget) setOpen(false);
                }}
              >
                <div className="shell flex h-[72px] items-center justify-between">
                  <Wordmark onClick={() => setOpen(false)} />
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      toggleRef.current?.focus();
                    }}
                    className="motion-cta grid h-11 w-11 place-items-center rounded-full border border-white/15 text-paper hover:border-lime hover:text-lime"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <motion.nav
                  aria-label="Mobile"
                  className="shell flex flex-1 flex-col overflow-y-auto pb-10 pt-4"
                  variants={mobileNavVariants}
                  initial={prefersReducedMotion ? false : "closed"}
                  animate="open"
                >
                  {nav.map((item, i) => (
                    <motion.div key={item.to} variants={mobileLinkVariants}>
                      <NavLink
                        to={item.to}
                        end={item.to === "/"}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `group flex min-h-[62px] items-center justify-between border-b border-white/10 font-heading text-[1.75rem] font-semibold tracking-[-0.03em] transition-colors ${
                            isActive ? "text-lime" : "text-paper hover:text-lime"
                          }`
                        }
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="font-mono text-[10px] tracking-[0.2em] text-mist/50">0{i + 1}</span>
                          {item.label}
                        </span>
                        <ArrowUpRight
                          className="h-5 w-5 opacity-40 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </NavLink>
                    </motion.div>
                  ))}
                  <motion.div variants={mobileLinkVariants} className="mt-8">
                    <Link
                      to="/contact"
                      onClick={() => setOpen(false)}
                      className="motion-cta inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-lime px-6 font-heading text-base font-semibold text-navy"
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
