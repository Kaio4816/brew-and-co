type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subhead?: string;
  align?: "center" | "start";
};

/** Eyebrow + title + subhead pattern. See docs/design/components.md § 3. */
export function SectionHeader({
  eyebrow,
  title,
  subhead,
  align = "center",
}: SectionHeaderProps) {
  const alignClasses = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignClasses}`}>
      {eyebrow ? (
        <p className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-muted">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-black tracking-[-0.015em] text-foreground sm:text-4xl">
        {title}
      </h2>
      {subhead ? (
        <p className="max-w-prose font-sans text-lg text-foreground/80">{subhead}</p>
      ) : null}
    </div>
  );
}
