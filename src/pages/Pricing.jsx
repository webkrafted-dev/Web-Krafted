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
    "Explore one-time USD launch pricing: landing pages $50–$150, business websites $150–$350, premium websites $350–$700+, and custom websites or web apps $500–$1,500+."
  );

  return (
    <>
      <PageHeader
        eyebrow="Launch pricing · USD"
        title="Four clear starting ranges. Scope matched to your goals."
        description="Landing pages from $50, business websites from $150, premium websites from $350, and custom websites or web apps from $500. All project fees are one-time unless marked monthly."
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
