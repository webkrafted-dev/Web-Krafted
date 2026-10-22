import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import usePageMeta from "@/hooks/usePageMeta";
import PageHeader from "@/components/PageHeader";
import PricingSection from "@/components/services/PricingSection";
import PricingFaq from "@/components/services/PricingFaq";
import FinalCta from "@/components/home/FinalCta";

export default function Pricing() {
  usePageMeta(
    "Website pricing — WK Web Krafted Studios",
    "Explore one-time USD launch pricing for business websites, personal portfolios, creator link pages, community and leisure sites, shops, and web apps. Prices start at $50."
  );

  return (
    <>
      <PageHeader
        eyebrow="Launch pricing · USD"
        title="Four clear starting ranges. Scope matched to your goals."
        description="Business sites remain central, alongside personal portfolios, creator link pages, club and leisure sites, shops, and more. Choose by project scope. All project fees are one-time unless marked monthly."
      >
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="#pricing"
            className="motion-cta inline-flex min-h-11 items-center gap-2 rounded-lg bg-lime px-5 py-2.5 font-heading text-[13px] font-semibold text-navy transition-all hover:-translate-y-0.5 hover:bg-lime-deep"
          >
            See package details <ArrowDown className="motion-arrow-down h-4 w-4" aria-hidden="true" />
          </a>
          <Link
            to="/contact"
            className="motion-cta inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/25 px-5 py-2.5 font-heading text-[13px] font-semibold text-paper transition-all hover:border-lime hover:text-lime"
          >
            Talk through your project <ArrowUpRight className="motion-arrow h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </PageHeader>
      <PricingSection />
      <PricingFaq />
      <FinalCta />
    </>
  );
}
