import Image from "next/image";
import type { MenuItem } from "@/app/lib/menu";
import { menuItemImages } from "@/app/lib/images";
import { PriceStamp } from "./price-stamp";
import { Badge } from "./badge";

type MenuItemCardProps = {
  item: MenuItem;
  rotate?: number;
};

/**
 * Full-menu card for /menu — sibling to PhotoMenuTile, not a reuse of it:
 * this needs a visible description line the tile spec doesn't have.
 * See docs/design/components.md § 4 (rationale) and § 5 (PriceStamp).
 */
export function MenuItemCard({ item, rotate = -8 }: MenuItemCardProps) {
  const image = menuItemImages[item.slug];

  return (
    <article className="flex flex-col overflow-hidden rounded-md bg-surface shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-toffee/40 via-marigold/30 to-toffee/60">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center text-6xl opacity-80"
          >
            ☕
          </span>
        )}
        <PriceStamp price={item.price} rotate={rotate} className="absolute right-3 top-3" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-sans text-lg font-black tracking-[-0.01em] text-foreground">
            {item.name}
          </p>
          {item.badge ? <Badge>{item.badge}</Badge> : null}
        </div>
        <p className="font-sans text-sm text-foreground/70">{item.description}</p>
      </div>
    </article>
  );
}
