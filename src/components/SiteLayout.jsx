import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingMessage from "@/components/FloatingMessage";

export default function SiteLayout() {
  const { pathname } = useLocation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-lime focus:px-5 focus:py-3 focus:font-heading focus:text-sm focus:font-semibold focus:text-navy"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14, scale: 0.995, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8, scale: 0.998, filter: "blur(2px)" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <FloatingMessage />
      <Footer />
    </div>
  );
}
