import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { conceptCarousel } from "@/data/conceptCarousel";

function relativeOffset(index, activeIndex, count) {
  const offset = (index - activeIndex + count) % count;
  return offset > count / 2 ? offset - count : offset;
}

export default function ConcavePreviewGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stageWidth, setStageWidth] = useState(0);
  const stageRef = useRef(null);
  const pointerStart = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const activeProject = conceptCarousel[activeIndex];

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const measure = () => setStageWidth(stage.getBoundingClientRect().width);
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const move = useCallback((step) => {
    setActiveIndex((current) => (current + step + conceptCarousel.length) % conceptCarousel.length);
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }
    },
    [move]
  );

  const handlePointerDown = useCallback((event) => {
    if (event.target && typeof event.target.closest === "function" && event.target.closest("a, button")) return;
    pointerStart.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const handlePointerUp = useCallback(
    (event) => {
      if (pointerStart.current === null) return;
      const distance = event.clientX - pointerStart.current;
      pointerStart.current = null;
      if (Math.abs(distance) > 46) move(distance < 0 ? 1 : -1);
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    [move]
  );

  const cardWidth = stageWidth
    ? Math.min(stageWidth * (stageWidth < 640 ? 0.84 : 0.73), 700)
    : 520;
  const cardStep = cardWidth * 0.68;
  const spring = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 88, damping: 18, mass: 0.82 };

  return (
    <section className="mt-16 sm:mt-20" aria-labelledby="concept-gallery-title">
      <div className="mb-5 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-navy/60">One studio · Many contexts</p>
          <h2 id="concept-gallery-title" className="mt-3 font-heading text-2xl font-semibold leading-tight text-navy sm:text-3xl">
            Explore a range of ideas.
          </h2>
        </div>
        <p className="max-w-md text-[14px] leading-relaxed text-charcoal/70">
          Business, creator, portfolio, club, and community-event websites — each preview is a real page built for a different audience.
        </p>
      </div>

      <div
        ref={stageRef}
        role="region"
        aria-label="Website concept preview carousel"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative h-[390px] overflow-hidden rounded-2xl bg-[#e8edf2] outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-4 sm:h-[520px] lg:h-[640px]"
        style={{ perspective: "1600px", touchAction: "pan-y" }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,.9), transparent 67%)" }} />
        {conceptCarousel.map((project, index) => {
          const offset = relativeOffset(index, activeIndex, conceptCarousel.length);
          const distance = Math.abs(offset);
          const centered = offset === 0;
          const opacity = distance === 0 ? 1 : distance === 1 ? 0.52 : 0;

          return (
            <div
              key={project.title}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: "translate(-50%, -50%)",
                width: cardWidth,
                perspective: "1600px",
                zIndex: 10 - distance,
                pointerEvents: distance > 1 ? "none" : "auto",
              }}
            >
              <motion.figure
                aria-hidden={!centered}
                initial={false}
                animate={{
                  x: offset * cardStep,
                  y: distance * 8,
                  z: -distance * 110,
                  rotateY: -offset * 25,
                  rotateZ: offset * -1.2,
                  scale: 1 - distance * 0.105,
                  opacity,
                }}
                transition={spring}
                onClick={() => {
                  if (!centered) setActiveIndex(index);
                }}
                className={`overflow-hidden rounded-xl border bg-white ${centered ? "border-white shadow-[0_28px_70px_rgba(11,31,59,0.24)]" : "border-white/70 shadow-[0_18px_45px_rgba(11,31,59,0.18)]"}`}
                style={{
                  width: cardWidth,
                  transformStyle: "preserve-3d",
                  transformPerspective: 1600,
                  cursor: centered ? "default" : "pointer",
                }}
              >
                <img
                  src={project.src}
                  alt={centered ? project.alt : ""}
                  draggable="false"
                  loading={distance > 1 ? "lazy" : "eager"}
                  className="block w-full select-none bg-[#e6ebf0] object-contain"
                  style={{ aspectRatio: "1.28" }}
                />
                {centered && (
                <figcaption className="flex min-h-[82px] items-center justify-between gap-3 border-t border-navy/10 px-4 py-3 sm:px-5">
                  <div className="min-w-0">
                    <p className="truncate font-heading text-[15px] font-semibold leading-tight text-navy sm:text-base">{project.title}</p>
                    <p className="mt-1 truncate text-[11px] font-medium text-charcoal/65 sm:text-xs">{project.subtitle}</p>
                  </div>
                  {centered && (
                    <Link
                      to={project.href}
                      className="motion-cta inline-flex shrink-0 items-center gap-1.5 rounded-md bg-navy px-3 py-2 text-[11px] font-semibold text-paper hover:bg-[#18395c] focus-visible:outline-lime sm:text-xs"
                      aria-label={`View the ${project.title} concept case study`}
                      onPointerDown={(event) => event.stopPropagation()}
                    >
                      View concept <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </figcaption>
                )}
              </motion.figure>
            </div>
          );
        })}
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {activeProject.title}, {activeIndex + 1} of {conceptCarousel.length}
        </span>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-lime to-transparent opacity-80" />
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between gap-4 sm:justify-start">
          <button
            type="button"
            onClick={() => move(-1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 bg-white text-navy shadow-sm transition hover:border-navy hover:bg-navy hover:text-paper focus-visible:outline-lime"
            aria-label="Previous website preview"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <p className="min-w-[190px] text-center sm:text-left">
            <span className="block font-heading text-sm font-semibold text-navy">{activeProject.title}</span>
            <span className="mt-0.5 block text-[11px] uppercase tracking-[0.15em] text-charcoal/55">
              {String(activeIndex + 1).padStart(2, "0")} / {String(conceptCarousel.length).padStart(2, "0")}
            </span>
          </p>
          <button
            type="button"
            onClick={() => move(1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 bg-white text-navy shadow-sm transition hover:border-navy hover:bg-navy hover:text-paper focus-visible:outline-lime"
            aria-label="Next website preview"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 sm:justify-end" aria-label="Choose a website preview">
          {conceptCarousel.map((project, index) => (
            <button
              key={project.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-lime ${index === activeIndex ? "w-8 bg-navy" : "w-2.5 bg-navy/20 hover:bg-navy/50"}`}
              aria-label={`Show ${project.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] text-charcoal/55 sm:text-left">Swipe, drag, use the arrows, or press ← / → to browse.</p>
    </section>
  );
}
