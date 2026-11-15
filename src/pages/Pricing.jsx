import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import usePageMeta from "@/hooks/usePageMeta";
import PageHeader from "@/components/PageHeader";
import PricingSection from "@/components/services/PricingSection";
import PricingFaq from "@/components/services/PricingFaq";
import FinalCta from "@/components/home/FinalCta";

export default function Pricing() {
  usePageMeta(
    "Pricing — WK Web Krafted Studios",
    "Clear USD launch pricing for business websites, portfolios, creator pages, community sites, shops, and custom web apps. One-time project fees unless marked monthly."
  );

  return (
    <>
      <PageHeader
        eyebrow="Launch pricing — USD"
        title="Clear ranges, matched to scope"
        description="Choose by project scope and goals. Business sites, portfolios, creator pages, community and event sites, shops, and custom builds each have a sensible starting range. Project fees are one-time unless marked monthly."
      >
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a href="#pricing" className="motion-cta inline-flex min-h-11 items-center gap-2 rounded-full bg-lime px-5 py-2.5 font-heading text-[13px] font-semibold text-navy shadow-glow">
            See package details <ArrowDown className="motion-arrow-down h-4 w-4" aria-hidden="true" />
          </a>
          <Link to="/contact" className="motion-cta inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-5 py-2.5 font-heading text-[13px] font-semibold text-paper hover:border-lime/60 hover:text-lime">
            Discuss your project <ArrowUpRight className="motion-arrow h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </PageHeader>
      <PricingSection />
      <PricingFaq />
      <div className="bg-paper pb-10 text-navy">
        <div className="shell text-center text-[13px] text-charcoal/65">
          Questions about milestones, invoices, or handover? <Link to="/terms-and-conditions" className="font-semibold text-navy underline decoration-lime-deep decoration-2 underline-offset-4">Read the Payment Policy &amp; Terms &amp; Conditions</Link>.
        </div>
      </div>
      <FinalCta />
    </>
  );
}
