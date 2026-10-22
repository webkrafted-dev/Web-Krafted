export default function ConceptBadge({ tone = "dark", className = "" }) {
  const styles =
    tone === "dark"
      ? "border-lime/40 bg-lime/10 text-lime"
      : "border-navy/25 bg-navy/[0.04] text-navy";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-heading text-[10px] font-semibold uppercase tracking-[0.16em] ${styles} ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" aria-hidden="true" />
      Concept Project
    </span>
  );
}