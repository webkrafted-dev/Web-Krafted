import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ReadingProgress({ targetRef }) {
  const progressRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !targetRef.current || !progressRef.current) return;

      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: targetRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    },
    { scope: progressRef, dependencies: [prefersReducedMotion], revertOnUpdate: true }
  );

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={progressRef}
      className="sticky top-[72px] z-40 h-[2px] origin-left bg-lime shadow-[0_0_14px_rgba(184,255,59,0.55)] pointer-events-none sm:top-[78px]"
      aria-hidden="true"
    />
  );
}
