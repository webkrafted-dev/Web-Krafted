export default function PageHeader({ eyebrow, title, description, children }) {
  return (
    <section className="border-b border-white/10 bg-navy">
      <div className="shell py-14 sm:py-16 lg:py-20">
        {eyebrow && (
          <span className="eyebrow text-lime">
            <span className="h-px w-6 bg-lime" aria-hidden="true" />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 max-w-3xl font-heading text-[2rem] font-bold leading-[1.1] tracking-[-0.025em] text-paper sm:text-[2.6rem] lg:text-[3rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-mist sm:text-[17px]">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}