type DividerProps = {
  align?: "center" | "start";
  className?: string;
};

/** Hairline rule + dot ornament. See docs/design/components.md § 7. Purely decorative. */
export function Divider({ align = "center", className = "" }: DividerProps) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`relative h-px w-full bg-muted/30 ${className}`}
    >
      <span
        className={`absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-muted ${
          align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"
        }`}
      />
    </div>
  );
}
