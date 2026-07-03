# Brew & Co — Style Guide

Source reference: [`references/1.png`](./references/1.png). See [tokens.md](./tokens.md) for implementation-ready values and [components.md](./components.md) for how these rules apply per component.

## 1. Brand narrative & principles

Brew & Co is a neighborhood cafe-bakery: fresh sandwiches, pastries, and coffee, sold with the tactile warmth of a place that stamps your receipt by hand. The brand should feel:

- **Artisanal** — made by people, not a chain. Textures, warm photography, and a hand-stamped motif over slick gradients or glassmorphism.
- **Warm** — mustard, espresso-brown, and cream read as a lit interior, not a sterile storefront.
- **Unpretentious** — direct product names and prices, no marketing fluff. "Bauru, R$22,00" tells you exactly what you get.
- **Playfully stamped** — the one place the brand allows itself a wink is the price badge: a rotated circular stamp, like something pressed onto a paper bag at the counter.

**What we're deliberately avoiding:** the generic "AI cafe site" default — a thin high-contrast serif (Playfair/Fraunces-at-light-weight) on a beige-on-beige field with a muted terracotta accent. That look reads as decorative rather than intentional. Brew & Co instead pairs a **heavy, soft-edged slab serif** (not thin/high-contrast) with a **saturated raspberry-pink accent** (not muted terracotta) and a **monospace price treatment** that has no equivalent in that generic pattern. Every choice below should trace back to something in the reference mockup or the brand narrative above — if a future addition doesn't, reconsider it.

## 2. Logo & mark

No logo asset exists yet. The reference shows a circular stamped monogram ("•B•", dot-flanked, in a dark badge) in the nav bar. **Placeholder direction only, flagged TBD**: a circular stamped monogram using the first letter of "Brew", rendered in Espresso on Marigold or Oat, echoing the same stamped-circle language as the PriceStamp component (see [components.md](./components.md#5-pricestamp-badge)). Do not finalize a logo from this direction alone — it needs its own design pass.

## 3. Color system

| Token name | Hex | Role |
|---|---|---|
| Espresso | `#2A1A12` | Primary text/ink, high-emphasis surfaces |
| Marigold | `#E7B93A` | Brand color — nav band, high-emphasis accents |
| Parchment | `#F6EEDD` | Page background |
| Oat | `#FBF8F2` | Card/surface background (one step lighter than Parchment, for layering) |
| Raspberry | `#C93368` | Accent — the PriceStamp badge, error/alert states, sparingly |
| Toffee | `#A9764F` | Dividers, eyebrow labels, muted/secondary text |

### Usage rules

- **Marigold** is the nav band and highest-emphasis brand moments only. Do not use it as a body-text color or spread it across large content areas — it's a signal, not a wallpaper.
- **Raspberry** is capped to a small usage share per screen: the PriceStamp badge and error/alert text (e.g. the ReservationDialog's validation message) are its only implemented uses. **Primary CTA buttons use Marigold, not Raspberry** (see components.md § 6) — Raspberry never appears as a button fill. If more than ~10% of a viewport is Raspberry, pull back — it should read as a stamp of emphasis, not a theme color.
- **Parchment vs. Oat**: Parchment is the page background; Oat is one step lighter and used for cards/tiles sitting *on* Parchment, so surfaces read as layered paper rather than flat color blocks. Never use Oat as the outermost page background.
- **Espresso** is the default text color everywhere except on Raspberry (see contrast table — use Oat text on Raspberry instead).
- **Toffee** is for short, bold, all-caps labels (eyebrows like "DOÇARIA", "SANDES") and decorative dividers — not for paragraph body copy (see contrast caveat below).

### Contrast checklist (WCAG)

Computed from the hex values above. "Normal text" threshold is 4.5:1 (AA) / 7:1 (AAA); "large text" (≥18px regular or ≥14px bold) threshold is 3:1 (AA) / 4.5:1 (AAA).

| Pair | Ratio | Verdict |
|---|---|---|
| Espresso text on Parchment | 14.5:1 | AAA — safe for any text size |
| Espresso text on Oat | 15.8:1 | AAA — safe for any text size |
| Espresso text on Marigold | 9.1:1 | AAA — safe for any text size |
| Oat text on Raspberry | 4.8:1 | AA (normal text) — use Oat/light text on Raspberry, not Espresso |
| Espresso text on Raspberry | 3.3:1 | **Fails AA normal text.** Large/bold-only (≥18px), and only where unavoidable — prefer Oat text instead |
| Toffee text on Parchment | 3.4:1 | **Fails AA normal text.** Large-text/bold-caps only — matches the eyebrow-label use case, never body copy |
| Toffee text on Oat | 3.7:1 | Same caveat as above |

**Rule of thumb:** Espresso-on-light and light-on-Marigold are always safe. Raspberry and Toffee are accent/label colors — pair Raspberry with light (Oat) text, and reserve Toffee for large, bold, short labels rather than body paragraphs.

## 4. Typography system

Three roles, all loaded via `next/font/google` (see [tokens.md § Typography tokens](./tokens.md#4-typography-tokens) for the target CSS variable names — actually swapping the fonts in `app/layout.tsx` is a future implementation step).

| Role | Family | Weight range | Used for |
|---|---|---|---|
| Display | **Fraunces** | 600–900 | Hero headline, section titles only |
| Workhorse | **Archivo** | 400–800 | Body copy, nav, buttons, product names |
| Utility | **Space Mono** | 400, 700 | PriceStamp badge numerals — nowhere else |

**Why this pairing:** Fraunces at heavy weight has a soft, slightly wonky slab character — warm and handmade rather than the thin high-contrast serif the generic AI-cafe default reaches for. Archivo is a sturdy grotesk that reads as "stamped signage" at black weight (product names) and disappears cleanly at regular weight (body copy) — one family covering two very different jobs keeps the system lean. Space Mono is used in exactly one place, the price badge, so that seeing tabular monospace numerals becomes a learned signal: "this is a price."

### Type scale

| Token | Size | Line-height | Tracking | Role/family | Example use |
|---|---|---|---|---|---|
| `--text-xs` | 0.75rem / 12px | 1.4 | 0.02em | Archivo Regular | Legal, fine print |
| `--text-sm` | 0.875rem / 14px | 1.5 | 0.01em (0.14em if all-caps) | Archivo Bold, all-caps | Eyebrow labels ("SANDES", "MENU") |
| `--text-base` | 1rem / 16px | 1.6 | 0 | Archivo Regular | Body copy |
| `--text-lg` | 1.125rem / 18px | 1.6 | 0 | Archivo Regular | Lead paragraph, subhead |
| `--text-xl` | 1.375rem / 22px | 1.3 | -0.01em | Archivo Black, condensed | Product name in a MenuTile ("CROISSANT") |
| `--text-2xl` | 1.75rem / 28px | 1.25 | -0.01em | Fraunces Bold (700) | Subsection headline |
| `--text-3xl` | 2.25rem / 36px | 1.15 | -0.015em | Fraunces Black (900) | Section title ("MENUS · PRODUTOS") |
| `--text-4xl` | 3rem / 48px | 1.1 | -0.02em | Fraunces Black (900) | Hero headline, mobile |
| `--text-5xl` | 3.75rem / 60px | 1.05 | -0.02em | Fraunces Black (900) | Hero headline, desktop |

Mobile note: drop one step on the scale for hero/section headings below the `md` breakpoint (e.g. desktop `--text-5xl` hero becomes `--text-4xl` on mobile) rather than only shrinking via `clamp()` — keeps line breaks predictable in translated (PT/EN) copy of varying length.

## 5. Spacing & grid

- Base unit: Tailwind v4's default 4px scale — no override, no reinvented spacing system (see [tokens.md § Spacing tokens](./tokens.md#5-spacing-tokens)).
- Section vertical rhythm: generous — `--spacing-section-y` (6rem/96px desktop, 3rem/48px mobile) between major page sections, matching the reference's airy content card floating over a busy background.
- Container max-width: `--spacing-content-max` (72rem/1152px), centered, matching the "browser window" framing in the reference.
- **Tile grid**: the reference's signature layout — a 3-column grid alternating photo tiles and text tiles, gutter `--spacing-tile-gap` (1.5rem/24px). Collapses to 2 columns at `md`, 1 column at `sm`. Photo tiles keep a consistent aspect ratio (approx. 4:3) so the grid stays visually even even as text-tile content length varies.

## 6. Imagery direction

**Status: implemented.** All hero, "Sobre Nós," and menu-item photography is now live, sourced from free-to-use Pexels stock photography and hotlinked (not downloaded into `/public`) — see `app/lib/images.ts` for the full mapping (keyed by `MenuItem.slug`) and `next.config.ts` for the `images.pexels.com` remote pattern. Each entry carries real, dish-specific `alt` text and a photographer credit.

- **Style**: warm, natural light, close crops on food texture (crust, steam, condensation) — matching the reference's sandwich/tart/croissant photography, not studio-white product shots.
- **Backgrounds**: moody, blurred cafe-interior photography behind the main content card is acceptable for hero-style sections (as in the reference), but should stay subordinate — never compete with foreground text contrast.
- **Do**: crop tight, let one hero ingredient fill the frame, keep a consistent warm color grade across all photography so tiles feel like one shoot.
- **Don't**: flat product-on-white e-commerce photography, cool/blue color grading, stock photography with visible generic branding.
- **Treatment per tile type**: photo tiles are full-bleed within their radius (no padding around the image); text tiles sit on Oat with generous internal padding — the contrast between "tight photo" and "airy text" is what makes the grid read as alternating rather than uniform.

## 7. Motion & interaction principles

Philosophy only — concrete duration/easing tokens live in [tokens.md § Motion tokens](./tokens.md#8-motion-tokens).

- Motion should feel **tactile**, like a physical stamp or press, not like a slick SaaS product. The PriceStamp badge and buttons get a subtle "thud" on press (slight overshoot, not a bounce loop) rather than a smooth ease-out.
- Everywhere else, motion is minimal: a fade/slight-rise on scroll reveal for section content, nothing more elaborate. The signature moment (the stamp interaction) should stand out precisely because the rest of the page is quiet.
- `prefers-reduced-motion` must be respected everywhere — the stamp "thud" and any scroll reveals fall back to an instant/near-instant state transition.

## 8. Voice & tone / bilingual copy guidelines

**Superseded locale decision:** this system originally specified PT-PT as the primary voice, based on the reference mockup's own Portugal-Portuguese copy. Once Brew & Co was placed in a real neighborhood — Vila Madalena, São Paulo — that assumption no longer fit: the brand's actual voice is **pt-BR**, and pricing is **R$** (Real), not Euro. `app/layout.tsx`'s `lang` attribute, `docs/menu-items.csv`, and all site copy now reflect pt-BR. A few menu item names were renamed for this reason (not just re-priced) where the original name was Portugal-specific vocabulary with no natural pt-BR equivalent — e.g. "Bica" → "Cafezinho," "Sandes" → "Sanduíche," "Prego no Pão" → **Bauru** (a real São Paulo sandwich, a deliberate authenticity touch replacing a Portugal-only dish name). See the implementation plan's menu-data table for the full rename list.

- **Primary voice: pt-BR.** Direct, warm, unpretentious Brazilian Portuguese — matching how a real Vila Madalena neighborhood cafe would actually talk to its regulars.
- **Secondary: EN.** English copy exists for an international audience but is secondary — write it as a plain, direct translation of the pt-BR voice, not a separate marketing tone.
- **Eyebrow-label pattern**: short, all-caps, single nouns or short noun phrases naming a category ("DOÇARIA", "SANDES", "MENU") — never a full sentence.
- **Product copy pattern**: bold product name + a short "+" modifier line where relevant ("PREGO" / "+ Bebida"), price set separately in the PriceStamp badge. Keep product names to 1–3 words so they hold up at `--text-xl` Archivo Black.
- **General tone**: direct, warm, unpretentious — describe what's in the sandwich, not why you should feel good about buying it.

## 9. Accessibility commitments

- **AA minimum** for all text/background pairs — see the contrast table above, and re-check any new color combination against it before use.
- **Focus states are always visible.** Every interactive element gets an explicit `focus-visible` treatment (see per-component specs in [components.md](./components.md)) — never `outline: none` without a replacement.
- **Alt text**: every food photograph needs alt text describing the dish, not the layout (e.g. "Grilled steak sandwich with tomato and lettuce on a wooden board," not "food photo").
- **Touch targets**: interactive elements are ≥44×44px on touch viewports, even where the visual element (like a PriceStamp badge) is smaller — pad the hit area.
- **Motion**: `prefers-reduced-motion` is respected everywhere motion is used (see § 7).

## 10. Do's and Don'ts

| Do | Don't |
|---|---|
| Heavy-weight Fraunces for headlines | Thin/light-weight Fraunces or a high-contrast didone serif |
| Raspberry as a sparing accent (stamps, alerts) | Raspberry/terracotta as a large background wash or a button fill |
| Oat text on Raspberry surfaces | Espresso (dark) text on Raspberry — fails contrast |
| Toffee for short bold all-caps labels | Toffee for paragraph body text — fails contrast |
| Warm, close-cropped food photography | Flat white-background product shots |
| One signature motion moment (the stamp) | Scroll animations on every element |
| Space Mono reserved for prices only | Space Mono used as a general UI or body font |
