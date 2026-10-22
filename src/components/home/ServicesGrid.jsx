import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ServiceIcon from "@/components/ServiceIcon";
import { services } from "@/data/services";

export default function ServicesGrid() {
  return (
    <section className="section bg-paper">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Services"
            title="What we build"
            description="Six focused services. Every project starts with a conversation about what your business actually needs."
          />
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 border-b border-navy/20 pb-1 font-heading text-sm font-semibold text-navy transition-colors hover:border-navy"
          >
            All services & pricing
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.04} className="h-full">
              <Link
                to={`/services#${service.slug}`}
                className="group relative flex h-full flex-col rounded-xl border border-mist/70 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-navy/25 hover:shadow-[0_18px_44px_-34px_rgba(11,31,59,0.5)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-navy text-lime">
                  <ServiceIcon name={service.icon} />
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold leading-snug tracking-tight text-navy">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-charcoal/75">{service.oneLine}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-heading text-[13px] font-semibold text-navy">
                  Learn more
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}