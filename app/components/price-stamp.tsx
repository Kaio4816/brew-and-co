type PriceStampProps = {
  price: string;
  rotate?: number;
  className?: string;
};

/**
 * The brand's signature element: a rotated circular "price stamp" badge.
 * See docs/design/components.md § 5.
 */
export function PriceStamp({ price, rotate = -9, className = "" }: PriceStampProps) {
  return (
    <span
      className={`relative inline-flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full bg-accent text-surface shadow-stamp ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span
        aria-hidden="true"
        className="absolute h-[4.5rem] w-[4.5rem] rounded-full border-2 border-dashed border-surface/40"
      />
      <span className="font-mono text-xs font-bold tracking-tighter whitespace-nowrap">
        {price}
      </span>
    </span>
  );
}
