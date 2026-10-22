import { ArrowRight } from "lucide-react";
import CTA from "@/components/CTA";
import HeroVisual from "@/components/home/HeroVisual";
import ServiceIcon from "@/components/ServiceIcon";
import { heroServices } from "@/data/services";

export default function Hero() {
  return (
    <section className="hero-surface bg-navy text-paper">
      <div className="shell relative z-10 pb-14 pt-14 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <span className="eyebrow text-lime">
              <span className="h-px w-8 bg-lime" aria-hidden="true" />
              Ideas. Websites. Real Impact.
            </span>
            <h1 className="mt-6 max-w-[680px] font-heading text-[2.15rem] font-bold leading-[1.06] tracking-[-0.03em] text-paper sm:text-[2.9rem] lg:text-[3.6rem]">
              Digital experiences, crafted to move{" "}
              <span className="text-lime">businesses forward.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-mist sm:text-lg">
              Thoughtfully designed websites that help businesses communicate clearly, build trust, and
              grow online.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CTA to="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
                Start a Project
              </CTA>
              <CTA to="/work" variant="outlineDark">
                Explore Our Work
              </CTA>
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-white/10 pt-6 sm:grid-cols-3">
              {heroServices.map((service) => (
                <li key={service.label} className="flex items-center gap-2 text-[12px] text-mist">
                  <ServiceIcon name={service.icon} className="h-4 w-4 text-lime" />
                  {service.label}
                </li>
              ))}
            </ul>
          </div>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
