import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const LOTTERY_GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export default function GlyphLotteryText({ text, className = "", duration = 560, stagger = 22 }) {
  const prefersReducedMotion = useReducedMotion();
  const [glyphs, setGlyphs] = useState(() => Array.from(text));

  useEffect(() => {
    const finalGlyphs = Array.from(text);
    if (prefersReducedMotion) {
      setGlyphs(finalGlyphs);
      return undefined;
    }

    let frame = 0;
    const startedAt = performance.now();
    const totalDuration = duration + Math.max(0, finalGlyphs.length - 1) * stagger;

    const advance = (now) => {
      const elapsed = now - startedAt;
      const nextGlyphs = finalGlyphs.map((finalGlyph, index) => {
        if (finalGlyph === " ") return "\u00a0";

        const localTime = elapsed - index * stagger;
        if (localTime <= 0) return LOTTERY_GLYPHS[(index * 11) % LOTTERY_GLYPHS.length];
        if (localTime >= duration) return finalGlyph;

        const slot = Math.floor(localTime / 38);
        const glyphIndex = (index * 17 + slot * 13) % LOTTERY_GLYPHS.length;
        return LOTTERY_GLYPHS[glyphIndex];
      });

      setGlyphs(nextGlyphs);
      if (elapsed < totalDuration) {
        frame = requestAnimationFrame(advance);
      } else {
        setGlyphs(finalGlyphs);
      }
    };

    frame = requestAnimationFrame(advance);
    return () => cancelAnimationFrame(frame);
  }, [duration, prefersReducedMotion, stagger, text]);

  return (
    <span className={className} role="text" aria-label={text} style={{ whiteSpace: "pre" }}>
      {glyphs.map((glyph, index) => (
        <motion.span
          key={`${index}-${glyph}`}
          aria-hidden="true"
          initial={prefersReducedMotion ? false : { rotateX: 68, y: 4, opacity: 0.48 }}
          animate={{ rotateX: 0, y: 0, opacity: 1 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 250, damping: 20, mass: 0.45 }
          }
          className="inline-block min-w-[0.48em] text-center"
          style={{ transformOrigin: "center center", transformPerspective: 600 }}
        >
          {glyph}
        </motion.span>
      ))}
    </span>
  );
}
