import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { pricingTiers } from "@/data/pricing";

const launchTiers = pricingTiers.filter((tier) => tier.slug !== "maintenance");

export default function PricingTeaser() {
  return (
    <section className="section bg-paper">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Launch pricing · USD"
            title="Clear ranges. No guesswork."
            description="From creator link pages and personal portfolios to business and community sites, choose a one-time range by the scope you need."
          />
          <Link
            to="/pricing"
            className="group inline-flex items-center gap-1.5 border-b border-navy/20 pb-1 font-heading text-sm font-semibold text-navy transition-colors hover:border-navy"
          >
            Full price menu
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {launchTiers.map((tier, index) => (
            <Reveal key={tier.slug} delay={index * 0.055} className="h-full">
              <Link
                to={`/contact?type=${encodeURIComponent(tier.projectType)}`}
                className="motion-lift group relative flex h-full flex-col overflow-hidden rounded-xl border border-mist/70 bg-white p-5 shadow-[0_10px_28px_-28px_rgba(11,31,59,0.6)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-navy/25 hover:shadow-[0_20px_40px_-30px_rgba(11,31,59,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-deep focus-visible:ring-offset-2 motion-reduce:transform-none"
              >
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-lime transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal/55">
                  {tier.name}
                </p>
                <p className="mt-3 font-heading text-2xl font-bold tracking-tight text-navy">{tier.price}</p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.13em] text-charcoal/45">USD · one-time</p>
                <p className="mt-4 flex-1 text-[13px] leading-relaxed text-charcoal/70">{tier.audience}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-heading text-[12px] font-semibold text-navy">
                  See what's included
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-sm text-charcoal/60">
          Looking for ongoing care?{" "}
          <Link to="/pricing#pricing" className="font-medium text-navy underline decoration-lime decoration-2 underline-offset-4 transition-colors hover:text-navy-soft">
            Website maintenance from $20 per month
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
