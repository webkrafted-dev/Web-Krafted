import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import BrowserMockup from "@/components/BrowserMockup";
import { projects } from "@/data/projects";

const previewLabels = {
  sports: "Sports",
  restaurant: "Hospitality",
  consulting: "Consulting",
};

export default function HeroVisual() {
  const cardRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const activeProject = projects[activeIndex] ?? projects[0];

  const handlePointerMove = (event) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = cardRef.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1));
    card.style.setProperty("--tilt-x", `${-y * 2.2}deg`);
    card.style.setProperty("--tilt-y", `${x * 3.2}deg`);
  };

  const resetPointerTilt = () => {
    cardRef.current?.style.setProperty("--tilt-x", "0deg");
    cardRef.current?.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[540px] lg:max-w-none"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointerTilt}
    >
      <div
        className="pointer-events-none absolute -inset-8 rounded-full bg-lime/[0.08] blur-3xl"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 top-10 hidden h-28 w-px bg-lime/70 sm:block"
      />

      <div
        ref={cardRef}
        className="hero-browser-card relative rounded-2xl border border-white/10 bg-navy-soft p-2.5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.85)]"
      >
        <div className="rounded-xl border border-white/10 bg-[#0d243f] p-2.5 sm:p-3">
          <div className="flex items-center justify-between gap-3 px-1 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded-md bg-lime font-heading text-[9px] font-bold text-navy" aria-hidden="true">
                WK
              </span>
              <span className="font-heading text-[9px] font-semibold uppercase tracking-[0.17em] text-mist">
                Interactive concept previews
              </span>
            </div>
            <span className="font-mono text-[9px] text-mist/60">
              {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeProject.slug}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: "easeOut" }}
            >
              <BrowserMockup
                variant={activeProject.mockup}
                label={`Illustrative ${activeProject.category.toLowerCase()} website concept for ${activeProject.name}. ${activeProject.tagline}`}
              />
            </motion.div>
          </AnimatePresence>

          <div className="mt-3 grid grid-cols-3 gap-2" role="group" aria-label="Choose an illustrative website concept">
            {projects.map((project, index) => {
              const active = index === activeIndex;
              return (
                <button
                  key={project.slug}
                  type="button"
                  aria-pressed={active}
                  aria-label={`Show ${project.name} ${previewLabels[project.mockup]} concept`}
                  onClick={() => setActiveIndex(index)}
                  className={`min-h-10 cursor-pointer rounded-lg border px-2 py-2 text-left font-heading text-[10px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d243f] sm:text-[11px] ${
                    active
                      ? "border-lime/50 bg-lime/10 text-lime"
                      : "border-white/10 bg-white/[0.03] text-mist hover:border-white/25 hover:text-white"
                  }`}
                >
                  <span className="block truncate">{previewLabels[project.mockup]}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-2.5 flex items-center justify-between gap-3 border-t border-white/10 px-1 pt-2.5">
            <p className="min-w-0 truncate text-[10px] text-mist/70" aria-live="polite">
              Concept: <span className="font-semibold text-paper">{activeProject.name}</span>
            </p>
            <Link
              to={`/work/${activeProject.slug}`}
              className="inline-flex shrink-0 items-center gap-1 font-heading text-[10px] font-semibold text-lime transition-colors hover:text-white"
            >
              Explore concept <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 right-2 rounded-lg border border-white/10 bg-navy-soft px-4 py-3 shadow-xl sm:right-6">
        <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-mist">
          Built with purpose
        </p>
        <p className="mt-1 font-heading text-sm font-semibold text-paper">Clear. Useful. Yours.</p>
      </div>
    </div>
  );
}
