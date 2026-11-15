import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GsapSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, GsapSplitText, useGSAP);
}

export default function SplitTextHeading({
  text,
  children,
  as: Tag = "h2",
  className = "",
  splitType = "words",
  delay = 0.045,
  duration = 0.7,
  trigger = true,
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!ref.current || typeof window === "undefined") return;
      if (document.hidden) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const el = ref.current;
      const mask = splitType.includes("chars") ? "chars" : splitType.includes("words") ? "words" : "lines";
      const split = GsapSplitText.create(el, {
        type: splitType,
        wordsClass: "split-word",
        charsClass: "split-char",
        linesClass: "split-line",
        mask,
        aria: "auto",
        onSplit: (instance) => {
          const targets = splitType.includes("chars")
            ? instance.chars
            : splitType.includes("words")
              ? instance.words
              : instance.lines;

          return gsap.fromTo(
            targets,
            { yPercent: 105, autoAlpha: 0, immediateRender: false },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration,
              ease: "power3.out",
              stagger: delay,
              scrollTrigger: trigger
                ? {
                    trigger: el,
                    start: "top 88%",
                    once: true,
                  }
                : undefined,
            }
          );
        },
      });
      return () => split.revert();
    },
    { scope: ref, dependencies: [text, splitType, delay, duration, trigger], revertOnUpdate: true }
  );

  return (
    <Tag ref={ref} className={className}>
      {children ?? text}
    </Tag>
  );
}
