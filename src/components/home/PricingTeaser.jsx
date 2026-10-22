import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { pricingTiers } from "@/data/pricing";

export default function PricingTeaser() {
  const tiers = pricingTiers.slice(0, 4);
  return (
    <section className="section bg-paper">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Pricing"
            title="Clear starting points"
            description="Indicative starting estimates, so you can judge fit before a conversation. Every project is scoped individually."
          />
          <Link
            to="/services#pricing"
            className="inline-flex items-center gap-1.5 border-b border-navy/20 pb-1 font-heading text-sm font-semibold text-navy transition-colors hover:border-navy"
          >
            Full pricing
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.slug}
              className="flex flex-col rounded-xl border border-mist/70 bg-white p-5 transition-colors duration-200 hover:border-navy/25"
            >
              <p className="font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal/55">
                {tier.name}
              </p>
              <p className="mt-3 font-heading text-2xl font-bold tracking-tight text-navy">
                {tier.price}
              </p>
              <p className="mt-2 text-[13px] text-charcoal/65">{tier.timeline}</p>
              <div className="mt-4 h-px w-10 bg-lime" aria-hidden="true" />
              <p className="mt-4 flex-1 text-[14px] leading-relaxed text-charcoal/75">{tier.summary}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-charcoal/60">
          Also available:{" "}
          <Link to="/services#pricing" className="underline decoration-lime decoration-2 underline-offset-4">
            website maintenance from $20 per month
          </Link>
          .
        </p>
      </div>
    </section>
  );
}