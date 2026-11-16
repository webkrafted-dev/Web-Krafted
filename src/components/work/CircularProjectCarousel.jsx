import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CircularCarousel from "@/components/CircularCarousel";
import { conceptCarousel } from "@/data/conceptCarousel";

export default function CircularProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = conceptCarousel[activeIndex] || conceptCarousel[0];

  return (
    <section className="mt-12 sm:mt-16" aria-labelledby="concept-gallery-title">
      <div className="mb-5 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-navy/60">
            <span className="h-px w-7 bg-lime-deep" aria-hidden="true" />
            Featured previews
          </p>
          <h2 id="concept-gallery-title" className="mt-3 font-heading text-2xl font-semibold leading-tight text-navy sm:text-3xl">
            Explore a range of ideas.
          </h2>
        </div>
        <p className="max-w-md text-[14px] leading-relaxed text-charcoal/70">
          Business, creator, portfolio, club, and community-event websites. Each preview is a designed concept for a different audience.
        </p>
      </div>

      <div className="h-[390px] overflow-hidden rounded-[1.5rem] border border-navy/10 bg-[#07101b] sm:h-[480px]">
        <CircularCarousel
          items={conceptCarousel}
          preset="cylinder"
          intro="rise"
          cardWidth={360}
          aspectRatio={16 / 10}
          speed={8}
          captions={false}
          gap={28}
          tilt={-5}
          curve={1}
          perspective={2500}
          autoplay="drift"
          direction="left"
          momentum={0.6}
          snap
          pauseOnHover
          focusOnClick
          draggable
          parallax={0.2}
          stretch={0.35}
          fadeColor="#05070b"
          depthFade={0.6}
          innerShade={0.5}
          cornerRadius={12}
          controls
          ariaLabel="Featured website concept previews"
          onChange={setActiveIndex}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div aria-live="polite" aria-atomic="true">
          <p className="font-heading text-sm font-semibold text-navy">{activeProject.title}</p>
          <p className="text-xs text-charcoal/65">{activeProject.subtitle}</p>
        </div>
        <Link
          to={activeProject.href}
          className="motion-cta inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full bg-navy px-5 py-2.5 font-heading text-xs font-semibold text-paper hover:bg-[#18395c] focus-visible:outline-lime sm:self-auto"
          aria-label={`View the ${activeProject.title} concept case study`}
        >
          View concept <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
