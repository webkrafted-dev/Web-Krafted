import { useRef } from "react";

export default function Magnetic({ children, strength = 18, className = "" }) {
  const ref = useRef(null);

  const reset = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "translate3d(0,0,0)";
  };

  const onPointerMove = (event) => {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = ref.current;
    if (!node) return;
    const bounds = node.getBoundingClientRect();
    const x = event.clientX - (bounds.left + bounds.width / 2);
    const y = event.clientY - (bounds.top + bounds.height / 2);
    node.style.transform = `translate3d(${(x / bounds.width) * strength}px, ${(y / bounds.height) * strength}px, 0)`;
  };

  return (
    <span
      ref={ref}
      className={`inline-flex will-change-transform ${className}`}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </span>
  );
}
