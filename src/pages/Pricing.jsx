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
    "Compare website project options, delivery timelines, included work, and ongoing website care from $20 per month."
  );

  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Clear starting points. A quote that fits your actual project."
        description="Compare what's included and how long projects usually take. New websites are priced after a clear scope; ongoing care starts at $20 per month."
      >
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="#pricing"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-lime px-5 py-2.5 font-heading text-[13px] font-semibold text-navy transition-colors hover:bg-lime-deep"
          >
            See the price menu <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/25 px-5 py-2.5 font-heading text-[13px] font-semibold text-paper transition-colors hover:border-lime hover:text-lime"
          >
            Ask a question <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </PageHeader>
      <PricingSection />
      <PricingFaq />
      <FinalCta />
    </>
  );
}
