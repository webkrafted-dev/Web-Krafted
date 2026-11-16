import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CTA from "@/components/CTA";
import GradientASCII from "@/components/GradientASCII";
import Magnetic from "@/components/Magnetic";
import RotatingText from "@/components/RotatingText";
import SplitTextHeading from "@/components/reactbits/SplitTextHeading";
import { heroServices } from "@/data/services";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AUDIENCES = ["businesses", "creators", "communities", "events", "individuals"];
const HERO_COLORS = ["#0b1f3b", "#132f54", "#b8ff3b"];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const fieldRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.to(fieldRef.current, {
        yPercent: -9,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative isolate min-h-[92svh] overflow-hidden border-b border-white/10 bg-ink">
      <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_75%_20%,rgba(184,255,59,0.12),transparent_55%),radial-gradient(700px_400px_at_20%_80%,rgba(19,47,84,0.45),transparent_60%)]" />
      <div ref={fieldRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <GradientASCII
          className="opacity-[0.35]"
          colors={HERO_COLORS}
          shape="horizon"
          characters=" .:-=+*#@"
          cellSize={17}
          density={0.65}
          glyphOpacity={0.38}
          glow={0.18}
          depthOfField={0}
          flicker={0}
          softness={0.55}
          scale={1}
          flow={0.2}
          speed={0.3}
          gradientOpacity={0.55}
          grain={0.02}
          variation={0}
          mouseInteraction={false}
          scrambleRadius={0.1}
          clickEffect="none"
          intro={false}
          lightMode={false}
        />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,7,11,0.12),rgba(5,7,11,0.35)_40%,rgba(5,7,11,0.92))]" />

      <div className="shell relative z-10 flex min-h-[92svh] flex-col justify-end pb-14 pt-28 sm:pb-18 lg:pb-20">
        <div className="max-w-5xl">
          <motion.span
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow text-lime"
          >
            <span className="h-px w-8 bg-lime/80" aria-hidden="true" />
            Ideas. Websites. Real Impact.
          </motion.span>

          <h1 className="mt-6 font-heading text-balance text-[clamp(2.8rem,8.5vw,7.6rem)] font-bold leading-[0.88] tracking-[-0.055em] text-paper">
            <SplitTextHeading as="span" splitType="words" delay={0.055} duration={0.75} trigger={false} className="block">
              Digital work
            </SplitTextHeading>
            <SplitTextHeading
              as="span"
              splitType="words"
              delay={0.055}
              duration={0.75}
              trigger={false}
              className="block text-mist"
            >
              crafted with
            </SplitTextHeading>
            <SplitTextHeading
              as="span"
              splitType="words"
              delay={0.055}
              duration={0.75}
              trigger={false}
              className="block text-lime"
            >
              intent.
            </SplitTextHeading>
          </h1>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-2"
          >
            <span className="font-heading text-lg font-medium text-mist sm:text-xl">Made for</span>
            <RotatingText
              texts={AUDIENCES}
              effect="flip"
              rotationInterval={2800}
              auto={!prefersReducedMotion}
              pauseOnHover
              splitBy="words"
              staggerDuration={0.012}
              mainClassName="inline-flex align-baseline font-heading text-2xl font-semibold leading-none text-lime sm:text-4xl"
            />{" "}
          </motion.div>
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-mist sm:text-[1.15rem]"
          >
            We build distinctive websites with clear purpose, considered detail, and room to grow.
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.66, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <CTA to="/contact" icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
                Start a Project
              </CTA>
            </Magnetic>
            <CTA to="/work" variant="outlineDark" icon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}>
              Explore Concept Work
            </CTA>
          </motion.div>
        </div>

        <motion.ul
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-12 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-[12px] text-mist/90 sm:grid-cols-3 lg:max-w-4xl lg:grid-cols-6"
          aria-label="Services at a glance"
        >
          {heroServices.map((service) => (
            <li key={service.label} className="truncate">
              {service.label}
            </li>
          ))}
        </motion.ul>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-mist/60 lg:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-lime/70 to-transparent" />
      </div>
    </section>
  );
}
