import { ArrowRight, ArrowUpRight } from "lucide-react";
import CTA from "@/components/CTA";
import Magnetic from "@/components/Magnetic";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-20 sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_0%,rgba(184,255,59,0.14),transparent_60%)]" />
      <div aria-hidden="true" className="hairline" />
      <div className="shell relative text-center">
        <p className="eyebrow justify-center text-lime"><span className="h-px w-7 bg-lime/80" aria-hidden="true" />Start a project</p>
        <h2 className="mx-auto mt-6 max-w-4xl font-heading text-balance text-[clamp(2.4rem,5.5vw,5rem)] font-bold leading-[0.92] tracking-[-0.05em] text-paper">
          Have an idea worth putting online?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-mist sm:text-[1.12rem]">
          Tell us what you need — business, portfolio, creator page, community, event, or something custom — and we'll come back with a clear next step.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic><CTA to="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>Start a Project</CTA></Magnetic>
          <CTA to="/pricing" variant="outlineDark" icon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}>View Pricing</CTA>
        </div>
      </div>
    </section>
  );
}
