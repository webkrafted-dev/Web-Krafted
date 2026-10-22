import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { pricingTiers } from "@/data/pricing";
import SectionHeading from "@/components/SectionHeading";

export default function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-20 bg-white py-16 sm:py-20">
      <div className="shell">
        <SectionHeading
          eyebrow="Indicative pricing"
          title="A clear starting point"
          description="Every project is scoped individually. Share what you need and we will confirm a written quote before any work begins."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <article
              key={tier.slug}
              className="flex flex-col rounded-xl border border-mist/80 bg-paper p-5 sm:p-6"
            >
              <h3 className="font-heading text-lg font-semibold text-navy">{tier.name}</h3>
              <p className="mt-3 font-heading text-2xl font-bold tracking-tight text-navy">
                {tier.price}
              </p>
              <p className="mt-1 text-[13px] text-charcoal/60">{tier.timeline}</p>
              <p className="mt-4 text-[14px] leading-relaxed text-charcoal/75">{tier.summary}</p>
              <ul className="mt-5 space-y-2 border-t border-mist/80 pt-4">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] leading-relaxed text-charcoal/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-deep" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to={`/contact?type=${encodeURIComponent(tier.projectType)}`}
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-heading text-[13px] font-semibold text-navy hover:text-navy/70"
              >
                Ask about this service
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-7 text-sm leading-relaxed text-charcoal/60">
          Website maintenance starts at $20 per month. Hosting, domains, and third-party service fees are
          separate; exact project pricing is confirmed in a written quote.
        </p>
      </div>
    </section>
  );
}
