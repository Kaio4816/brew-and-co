import Image from "next/image";
import type { SourcedImage } from "@/app/lib/images";
import { PriceStamp } from "./price-stamp";

type PhotoMenuTileProps = {
  name: string;
  price: string;
  /** Fallback emoji, used only when `image` isn't provided. */
  icon?: string;
  rotate?: number;
  /** Real photography, when sourced (see app/lib/images.ts). Falls back to the emoji-gradient placeholder when absent. */
  image?: SourcedImage;
};

/**
 * Photo variant of the MenuTile. Renders real photography via `image`
 * when provided (app/lib/images.ts); otherwise falls back to a warm
 * gradient + emoji placeholder for items without sourced photos yet
 * (see docs/design/style-guide.md § 6). The decorative emoji fallback is
 * aria-hidden; the dish name below carries the accessible label in that
 * case, while real photos carry their own descriptive `alt` text.
 */
export function PhotoMenuTile({ name, price, icon = "☕", rotate, image }: PhotoMenuTileProps) {
  return (
    <figure className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-sm bg-gradient-to-br from-toffee/40 via-marigold/30 to-toffee/60 shadow-card transition-shadow duration-200 hover:shadow-elevated">
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
        />
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center text-7xl opacity-80 transition-transform duration-200 group-hover:scale-[1.02]"
        >
          {icon}
        </span>
      )}
      <PriceStamp price={price} rotate={rotate} className="absolute right-3 top-3" />
      <figcaption className="relative bg-espresso/70 px-4 py-3 font-sans text-base font-extrabold text-oat backdrop-blur-sm">
        {name}
      </figcaption>
    </figure>
  );
}

type TextMenuTileProps = {
  eyebrow: string;
  title: string;
  modifier?: string;
};

/** Text variant of the MenuTile. See docs/design/components.md § 4. */
export function TextMenuTile({ eyebrow, title, modifier }: TextMenuTileProps) {
  return (
    <div className="flex aspect-[4/3] flex-col justify-center gap-3 rounded-md bg-surface px-6 py-8 text-center shadow-card">
      <p className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-muted">
        {eyebrow}
      </p>
      <p className="font-sans text-xl font-black tracking-[-0.01em] text-foreground">
        {title}
      </p>
      {modifier ? (
        <p className="font-sans text-sm text-foreground/70">{modifier}</p>
      ) : null}
    </div>
  );
}
