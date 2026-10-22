import { ArrowRight } from "lucide-react";
import CTA from "@/components/CTA";

export default function FinalCta() {
  return (
    <section className="relative bg-navy-deep">
      <div className="mx-auto h-px w-full max-w-[900px] bg-lime/40" aria-hidden="true" />
      <div className="shell py-16 text-center sm:py-20">
        <h2 className="mx-auto max-w-2xl font-heading text-3xl font-bold leading-tight tracking-[-0.02em] text-paper sm:text-4xl lg:text-[2.75rem]">
          Have a project in mind?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-mist">
          Tell us what you need and we'll reply with a clear next step.
        </p>
        <div className="mt-8 flex justify-center">
          <CTA to="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
            Start a Project
          </CTA>
        </div>
      </div>
    </section>
  );
}