import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { pricingTiers } from "@/data/pricing";

const launchTiers = pricingTiers.filter((tier) => tier.slug !== "maintenance");

export default function PricingTeaser() {
  return (
    <section className="section bg-paper text-navy">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tone="light"
            eyebrow="Launch pricing — USD"
            title="Clear ranges, shaped by scope"
            description="From creator pages and portfolios to business, community, and custom builds — choose a starting range that fits what you need. All project fees are one-time unless marked monthly."
          />
          <Link to="/pricing" className="motion-cta inline-flex items-center gap-2 font-heading text-sm font-semibold text-navy">
            Full pricing details <ArrowUpRight className="motion-arrow h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {launchTiers.map((tier, index) => (
            <Reveal key={tier.slug} delay={index * 0.05} className="h-full">
              <Link
                to={`/contact?type=${encodeURIComponent(tier.projectType)}`}
                className="group flex h-full flex-col rounded-[1.25rem] border border-navy/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-navy/20 hover:shadow-[0_30px_70px_-45px_rgba(11,31,59,0.45)]"
              >
                <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal/50">{tier.name}</p>
                <p className="mt-4 font-heading text-3xl font-bold tracking-[-0.04em] text-navy">{tier.price}</p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-charcoal/45">USD · one-time</p>
                <p className="mt-5 flex-1 text-[14px] leading-relaxed text-charcoal/70">{tier.summary}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-heading text-[13px] font-semibold text-navy">
                  Discuss this scope <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-charcoal/65">
          Need ongoing care? <Link to="/pricing#pricing" className="font-semibold text-navy underline decoration-lime-deep decoration-2 underline-offset-4">Website maintenance from $20 per month</Link>.
        </p>
      </div>
    </section>
  );
}
