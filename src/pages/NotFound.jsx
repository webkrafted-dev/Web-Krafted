import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import usePageMeta from "@/hooks/usePageMeta";

export default function NotFound() {
  usePageMeta("Page not found — WK Web Krafted Studios", "That page could not be found.");

  return (
    <section className="bg-navy">
      <div className="shell flex min-h-[70vh] flex-col justify-center py-20">
        <span className="eyebrow text-lime">
          <span className="h-px w-6 bg-lime" aria-hidden="true" />
          404
        </span>
        <h1 className="mt-4 max-w-2xl font-heading text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-paper sm:text-[2.8rem]">
          This page left the layout.
        </h1>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-mist">
          The address you followed doesn&apos;t exist here — it may have moved, or the link may have a typo. The
          rest of the site is where you left it.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-lime px-6 py-3 font-heading text-sm font-semibold text-navy transition-colors hover:bg-lime-deep"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
          <Link
            to="/contact"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 font-heading text-sm font-semibold text-paper transition-colors hover:border-lime hover:text-lime"
          >
            Get in touch
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
