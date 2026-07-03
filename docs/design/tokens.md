# Brew & Co — Design Tokens

Developer-facing token spec. See [style-guide.md](./style-guide.md) for the rationale behind these values, and [components.md](./components.md) for how each component consumes them.

**Status: implemented.** These tokens are live in `app/globals.css` as of the first implementation pass (NavBar, Hero, SectionHeader, MenuTile, PriceStamp, Button, Divider, Footer — see [components.md](./components.md)). This doc and [`tokens.reference.css`](./tokens.reference.css) describe the actual shipped structure, not a hypothetical future one.

## 1. How to use this doc

This project is Tailwind v4 with **no `tailwind.config.js`** — theming is entirely CSS-variable-driven inside `app/globals.css`. Three tiers are used, not two, because Tailwind v4 only generates utility classes (`bg-*`, `text-*`, `rounded-*`, etc.) from custom properties declared **inside an `@theme` / `@theme inline` block** — plain `:root` variables are invisible to Tailwind's utility generator, they're just ordinary CSS variables.

```css
:root {
  /* raw values — real CSS variables, not yet Tailwind utilities.
     Prefixed --palette- (not --color-) so they never share a name
     with the Tailwind-facing alias below — a variable can't safely
     alias itself via var() under the same name. */
  --palette-parchment: #f6eedd;
  --background: var(--palette-parchment);
}

@theme inline {
  /* Tailwind-facing alias — THIS name is what generates the utility
     (bg-background, text-background, …), and its value points back
     at the plain :root variable above so it stays reactive to any
     future runtime override (e.g. a dark-mode media query). */
  --color-background: var(--background);
}
```

Tokens that never need runtime reactivity (radius, shadow, type scale) skip the two-tier indirection and are declared directly inside `@theme inline` as literal values — see § 6–7. Motion tokens are a deliberate exception that skip Tailwind's theme system entirely — see § 8.

## 2. Color tokens

**Raw palette** — single source of truth, declared in `:root` under the `--palette-` prefix:

| Token | Value |
|---|---|
| `--palette-espresso` | `#2A1A12` |
| `--palette-marigold` | `#E7B93A` |
| `--palette-parchment` | `#F6EEDD` |
| `--palette-oat` | `#FBF8F2` |
| `--palette-raspberry` | `#C93368` |
| `--palette-toffee` | `#A9764F` |

**Tailwind-facing aliases** — declared in `@theme inline`, each pointing back at its raw token. Two families are exposed: raw-shade utilities (for when a component needs a specific palette color that isn't one of the four semantic roles — e.g. the Hero's gradient, the Footer's Espresso background) and semantic utilities (for the four brand roles):

| Token | Points to | Tailwind utility |
|---|---|---|
| `--color-espresso` | `--palette-espresso` | `bg-espresso` / `text-espresso` |
| `--color-marigold` | `--palette-marigold` | `bg-marigold` / `text-marigold` |
| `--color-parchment` | `--palette-parchment` | `bg-parchment` |
| `--color-oat` | `--palette-oat` | `bg-oat` / `text-oat` |
| `--color-raspberry` | `--palette-raspberry` | `bg-raspberry` |
| `--color-toffee` | `--palette-toffee` | `bg-toffee` / `text-toffee` |
| `--background` → `--color-background` | `--palette-parchment` | `bg-background` |
| `--foreground` → `--color-foreground` | `--palette-espresso` | `text-foreground` |
| `--color-primary` | `--palette-marigold` | `bg-primary` / `text-primary` |
| `--color-accent` | `--palette-raspberry` | `bg-accent` / `text-accent` |
| `--color-surface` | `--palette-oat` | `bg-surface` |
| `--color-muted` | `--palette-toffee` | `text-muted` |

In components, prefer the **semantic** utility (`bg-primary`, `text-muted`, …) — it documents *why* a color is used. Reach for the **raw-shade** utility only when compositing something bespoke, like a gradient or an opacity-modified overlay (e.g. `from-toffee/40`, `bg-espresso/70`), where none of the four semantic roles apply.

## 3. Dark mode

**Deferred.** The original starter's automatic `prefers-color-scheme` inversion was removed rather than kept unvalidated — the new palette (Marigold nav band, Raspberry accents on Parchment/Oat) was designed for light mode only, and a naive inversion would muddy it (see [style-guide.md § 3](./style-guide.md#3-color-system)'s contrast table). A future phase should design an intentional dark palette (Espresso as the background, not just an inverted swap).

## 4. Typography tokens

Loaded in `app/layout.tsx` via `next/font/google` and exposed as CSS variables through each font's `variable` option:

```
Fraunces    → --font-fraunces    (weights 600, 700, 900 loaded)
Archivo     → --font-archivo     (weights 400, 500, 700, 800 loaded)
Space Mono  → --font-space-mono  (weights 400, 700 loaded — not variable, static font)
```

Aliased in `@theme inline` to Tailwind's font-family namespace:

```
--font-display: var(--font-fraunces);
--font-sans:    var(--font-archivo);
--font-mono:    var(--font-space-mono);
```

**Type scale** (declared as literal values directly in `@theme inline` — no runtime reactivity needed, see [style-guide.md § 4](./style-guide.md#4-typography-system) for rationale and per-step usage):

| Token | `--text-*` | Notes |
|---|---|---|
| xs | 0.75rem | Legal, fine print |
| sm | 0.875rem | Eyebrow labels (paired with `tracking-[0.14em] uppercase` at call sites) |
| base | 1rem | Body copy |
| lg | 1.125rem | Lead paragraph, subhead |
| xl | 1.375rem | Product name in a MenuTile |
| 2xl | 1.75rem | Subsection headline |
| 3xl | 2.25rem | Section title |
| 4xl | 3rem | Hero headline, mobile |
| 5xl | 3.75rem | Hero headline, desktop |

Line-height and letter-spacing are **not** baked into the `--text-*` tokens — Tailwind v4's `text-*` utilities set `font-size` only. Each component applies its own `tracking-[…]` utility at the call site (see e.g. `SectionHeader`'s `tracking-[-0.015em]`), matching the values documented in [style-guide.md § 4](./style-guide.md#4-typography-system).

## 5. Spacing

Kept as Tailwind v4's default 4px spacing scale — no override. The four semantic spacing values from the original design brief (section rhythm, tile gap, container max-width, nav height) are **not** wired into `@theme` as named spacing tokens — Tailwind v4's utility generation for custom-named spacing keys wasn't reliable enough to depend on sight-unseen, so components consume them as plain Tailwind arbitrary values instead:

| Concept | Value | Applied as |
|---|---|---|
| Container max-width | 72rem (1152px) | `max-w-[72rem]` at each section's outer wrapper |
| Section vertical rhythm | `py-24` (6rem) | Tailwind's default scale already lands on the right value — no custom token needed |
| MenuTile grid gutter | `gap-6` (1.5rem) | Tailwind's default scale already lands on the right value — no custom token needed |
| NavBar height | 4.5rem (72px) | `h-[4.5rem]` on the `<nav>` element |

## 6. Radius tokens

Literal values in `@theme inline`:

| Token | Value | Maps to |
|---|---|---|
| `--radius-sm` | 0.375rem (6px) | Photo tile corners |
| `--radius-md` | 0.75rem (12px) | Cards, text tiles |
| `--radius-lg` | 1.25rem (20px) | Large surfaces (hero panel) |
| `--radius-full` | 9999px | PriceStamp badge, pill buttons |

## 7. Shadow tokens

Literal values in `@theme inline`:

| Token | Value | Use |
|---|---|---|
| `--shadow-card` | `0 1px 2px rgba(42,26,18,0.06), 0 4px 12px rgba(42,26,18,0.08)` | Default MenuTile/card elevation |
| `--shadow-elevated` | `0 8px 24px rgba(42,26,18,0.14)` | Hover/focus elevation |
| `--shadow-stamp` | `0 3px 0 rgba(42,26,18,0.25)` | PriceStamp badge — hard offset, no blur, sells the "pressed rubber stamp" feel |

## 8. Motion tokens

**Deliberately kept outside Tailwind's `@theme` system**, as plain `:root` variables:

```css
--duration-fast: 120ms;
--duration-base: 200ms;
--duration-slow: 360ms;
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
--ease-stamp: cubic-bezier(0.34, 1.56, 0.64, 1);
```

with a `prefers-reduced-motion` override:

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast: 0ms;
    --duration-base: 0ms;
    --duration-slow: 0ms;
    --ease-stamp: var(--ease-standard);
  }
}
```

**Why not `@theme`:** if these were declared as literal values inside `@theme inline` (Tailwind's "inline" mode), Tailwind bakes the literal value directly into each generated utility rule (e.g. `.duration-fast { transition-duration: 120ms }`) with no CSS variable in the output — the `prefers-reduced-motion` override above would then have nothing to override. Keeping them as plain `:root` variables and consuming them via `var(--duration-fast)` / `var(--ease-stamp)` directly in component `style` props (see `Button`'s implementation) guarantees the override stays live. This is a real constraint discovered during implementation, not a stylistic preference — worth remembering if more Tailwind-utility motion classes are added later.

## 9. Full reference

The complete, current `app/globals.css` structure is mirrored verbatim in [`tokens.reference.css`](./tokens.reference.css) — that file is kept byte-identical to the live app file's token block, minus the parts of `globals.css` that aren't tokens (the `body` base style).

## 10. Token naming conventions & governance

- **kebab-case** for every custom property.
- **Raw-palette-as-source-of-truth**: `--palette-*` tokens never change meaning; `--color-*` aliases may be repointed to a different raw token if the brand's use of a color shifts, without touching every call site.
- New tokens should be added to this table, to `tokens.reference.css`, and to `app/globals.css` in the same change — the three must never drift.
