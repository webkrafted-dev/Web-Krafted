import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingMessage from "@/components/FloatingMessage";
import Seo from "@/components/Seo";

export default function SiteLayout() {
  const { pathname } = useLocation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-ink text-paper">
      <Seo />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-lime focus:px-5 focus:py-3 focus:font-heading focus:text-sm focus:font-semibold focus:text-navy"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="relative flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
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
