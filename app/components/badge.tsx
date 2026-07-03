type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

/** Toffee-on-Oat status pill. See docs/design/components.md § 10. */
export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-toffee/40 bg-surface px-3 py-1 font-sans text-sm font-bold uppercase tracking-[0.08em] text-toffee ${className}`}
    >
      {children}
    </span>
  );
}
