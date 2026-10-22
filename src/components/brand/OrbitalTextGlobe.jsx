import { useCallback, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

export default function OrbitalTextGlobe() {
  const rotation = useMotionValue(-12);
  const counterRotation = useTransform(rotation, (value) => value * -0.72);
  const pointer = useRef({ active: false, lastX: 0 });
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (!prefersReducedMotion && !paused && !pointer.current.active) {
      rotation.set(rotation.get() + Math.min(delta, 40) * 0.012);
    }
  });

  const handlePointerDown = useCallback((event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointer.current = { active: true, lastX: event.clientX };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (event) => {
      if (!pointer.current.active) return;
      const delta = event.clientX - pointer.current.lastX;
      rotation.set(rotation.get() + delta * 0.72);
      pointer.current.lastX = event.clientX;
    },
    [rotation]
  );

  const handlePointerUp = useCallback((event) => {
    pointer.current.active = false;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        rotation.set(rotation.get() + (event.key === "ArrowRight" ? 18 : -18));
      }
    },
    [rotation]
  );

  return (
    <div className="mx-auto flex w-full max-w-[470px] flex-col items-center">
      <div
        role="group"
        aria-label="Interactive WK Studios orbital wordmark. Drag horizontally or use the arrow keys to spin the rings."
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative aspect-square w-[min(84vw,430px)] select-none outline-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ touchAction: "none" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[16%] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(184,255,59,0.16), transparent 70%)" }}
        />
        <motion.svg viewBox="0 0 400 400" className="relative h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id="wk-orbit-sphere" cx="30%" cy="25%" r="80%">
              <stop offset="0%" stopColor="#315577" />
              <stop offset="48%" stopColor="#163556" />
              <stop offset="100%" stopColor="#07172a" />
            </radialGradient>
            <linearGradient id="wk-orbit-rim" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#B8FF3B" stopOpacity="0.8" />
              <stop offset="55%" stopColor="#DDE4EC" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#B8FF3B" stopOpacity="0.72" />
            </linearGradient>
            <clipPath id="wk-orbit-globe-clip">
              <circle cx="200" cy="200" r="99" />
            </clipPath>
            <path id="wk-orbit-track-outer" d="M 200 200 m -153 0 a 153 153 0 1 1 306 0 a 153 153 0 1 1 -306 0" />
            <path id="wk-orbit-track-inner" d="M 200 200 m -128 0 a 128 128 0 1 0 256 0 a 128 128 0 1 0 -256 0" />
          </defs>

          <circle cx="200" cy="200" r="100" fill="url(#wk-orbit-sphere)" stroke="#DDE4EC" strokeOpacity="0.25" />
          <g clipPath="url(#wk-orbit-globe-clip)" fill="none" stroke="#DDE4EC" strokeOpacity="0.22">
            <ellipse cx="200" cy="200" rx="42" ry="99" />
            <ellipse cx="200" cy="200" rx="77" ry="99" />
            <ellipse cx="200" cy="200" rx="99" ry="39" />
            <ellipse cx="200" cy="200" rx="99" ry="70" />
            <path d="M 100 200 H 300" />
          </g>
          <circle cx="200" cy="200" r="99" fill="none" stroke="#DDE4EC" strokeOpacity="0.32" />

          <motion.g style={{ rotate: rotation, transformOrigin: "200px 200px" }}>
            <ellipse cx="200" cy="200" rx="171" ry="61" fill="none" stroke="url(#wk-orbit-rim)" strokeWidth="1.2" transform="rotate(-24 200 200)" />
            <circle cx="43" cy="133" r="4" fill="#B8FF3B" />
            <text fill="#B8FF3B" fontFamily="Sora, sans-serif" fontSize="10" fontWeight="600" letterSpacing="2.1">
              <textPath href="#wk-orbit-track-outer" startOffset="2%">IDEAS · BUSINESS · CREATOR · COMMUNITY · EVENTS · PERSONAL · IDEAS · BUSINESS · CREATOR · COMMUNITY · EVENTS · PERSONAL ·</textPath>
            </text>
          </motion.g>

          <motion.g style={{ rotate: counterRotation, transformOrigin: "200px 200px" }}>
            <ellipse cx="200" cy="200" rx="145" ry="42" fill="none" stroke="#DDE4EC" strokeOpacity="0.48" strokeWidth="1" transform="rotate(31 200 200)" />
            <circle cx="303" cy="286" r="3.5" fill="#DDE4EC" />
            <text fill="#DDE4EC" fillOpacity="0.9" fontFamily="Inter, sans-serif" fontSize="8.5" fontWeight="600" letterSpacing="2.4">
              <textPath href="#wk-orbit-track-inner" startOffset="0%">WEB KRAFTED STUDIOS · PURPOSEFUL DIGITAL EXPERIENCES · WEB KRAFTED STUDIOS · PURPOSEFUL DIGITAL EXPERIENCES ·</textPath>
            </text>
          </motion.g>

          <circle cx="171" cy="158" r="3" fill="#DDE4EC" fillOpacity="0.9" />
          <circle cx="250" cy="222" r="2" fill="#B8FF3B" fillOpacity="0.95" />
        </motion.svg>
      </div>

      <div className="mt-1 flex items-center gap-3 text-[12px] text-mist">
        <span aria-live="polite">{dragging ? "Rings in motion" : "Drag to spin the orbital rings"}</span>
        <span className="h-1 w-1 rounded-full bg-lime" aria-hidden="true" />
        <button
          type="button"
          className="rounded-full border border-white/20 px-3 py-1.5 font-medium text-paper transition-colors hover:border-lime/70 hover:text-lime focus-visible:outline-lime"
          aria-pressed={paused}
          onClick={() => setPaused((current) => !current)}
        >
          {paused ? "Resume orbit" : "Pause orbit"}
        </button>
      </div>
    </div>
  );
}
