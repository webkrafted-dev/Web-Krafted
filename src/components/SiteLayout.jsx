import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingMessage from "@/components/FloatingMessage";

export default function SiteLayout() {
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
        <Outlet />
      </main>
      <FloatingMessage />
      <Footer />
    </div>
  );
}