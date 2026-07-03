# Brew & Co — Component Specs

Each entry follows: **Purpose · Anatomy · Variants · States · Responsive behavior · Token usage · Accessibility notes · Content guidelines**. Token names reference [tokens.md](./tokens.md); rationale references [style-guide.md](./style-guide.md).

**Status: implemented (second pass).** NavBar, Hero, SectionHeader, MenuTile (photo + text), PriceStamp, Button, Divider, Footer, Tag/Badge (§ 10), ReservationDialog (§ 12), and EventCard (§ 13) are all implemented in `app/components/`, wired into three real routes (`/`, `/sobre`, `/menu`). Card/Surface (§ 9) is not a standalone component — its visual language (Oat, `radius-md`, `shadow-card`) is applied inline wherever needed (`MenuItemCard`, `EventCard`) rather than factored out, since no second consumer has needed it broken out yet. LocationCard (§ 11) remains unbuilt — still blocked on a locations-page scope decision. Code snippets in this doc remain **illustrative** — refer to the actual `.tsx` files in `app/components/` as the source of truth for implementation details; this doc is the source of truth for intent and rationale.

---

## 1. NavBar

**Purpose.** Primary site navigation and brand presence — the first thing a visitor sees, and the strongest single expression of the Marigold brand color.

**Anatomy.** Marigold band (full-width) → logo mark (left) → link list (right, desktop) / hamburger trigger (right, mobile) → optional mobile drawer panel.

**Variants.** Static (default) vs. sticky-on-scroll. Recommend sticky, since the reference's nav band is a strong enough element to remain visible as a wayfinding anchor.

**States.**
- Link default: Espresso text on Marigold (9.1:1 contrast, see style-guide).
- Link hover: underline or weight shift to Archivo Bold — no color change needed given the strong existing contrast.
- Link active/current page: persistent underline, distinct from hover.
- Focus-visible: 2px Espresso ring with 2px offset, visible against Marigold.
- Mobile drawer open/closed: slide/fade transition using `--duration-base` / `--ease-standard`.

**Responsive behavior.** Desktop: horizontal link list. Below `md`: collapse to hamburger trigger + full-height drawer panel on Oat background (not Marigold, to visually separate "drawer content" from "brand band").

**Token usage.** `--color-primary` (band), `--foreground` (link text/icons), `--spacing-nav-height`, `--font-sans` (Archivo Bold for links), `--text-sm`, `--duration-base`, `--ease-standard`.

**Accessibility notes.** `<nav aria-label="Primary">`. Hamburger trigger is a real `<button>` with `aria-expanded`/`aria-controls`. Drawer traps focus while open and returns focus to the trigger on close. Skip-to-content link precedes the nav in DOM order.

**Content guidelines.** PT-BR link labels ("Sobre", "Menu & Produtos"); keep to 2–4 top-level links so the band never wraps on desktop. Implemented links are real routes (`/sobre`, `/menu`), not anchors — "As Nossas Lojas" was dropped from this pass (no locations page in scope; see § 11) and a "Reservar Mesa" CTA button was added as the 3rd nav-band item, opening the ReservationDialog (§ 12) via `useReservationDialog()`. Active-link state is implemented via `usePathname()`.

```
Illustrative structure:
<header class="bg-primary h-[--spacing-nav-height]">
  <nav aria-label="Primary" class="flex items-center justify-between px-6">
    <a href="/" class="font-display">•B•</a>
    <ul class="hidden md:flex gap-8 font-sans font-bold text-sm">…</ul>
    <button aria-expanded="false" aria-controls="nav-drawer" class="md:hidden">…</button>
  </nav>
</header>
```

---

## 2. Hero

**Purpose.** The thesis of the homepage — the single most characteristic expression of "warm, artisanal cafe," setting expectations before the menu grid.

**Anatomy.** Eyebrow label (Toffee, all-caps) → Fraunces headline → subhead (Archivo Regular) → optional CTA button → background treatment (warm blurred interior photo, per style-guide § 6).

**Variants.** Photo-background hero (matches reference) vs. plain Parchment hero (simpler, for interior pages). Homepage uses the photo-background variant.

**States.** CTA button follows the Button spec (§ 6). No other interactive states at the hero level.

**Responsive behavior.** Headline drops one type-scale step below `md` (`--text-5xl` → `--text-4xl`, see tokens.md § 4) rather than fluid-scaling, to keep PT/EN line breaks predictable. Background photo crops to a taller aspect ratio on mobile to keep the subject centered.

**Token usage.** `--font-display` + `--text-5xl`/`--text-4xl` (headline), `--color-primary` (Marigold) + `--text-sm` (eyebrow — **implemented exception**: on the Hero's dark photo scrim, Toffee-on-Espresso only reaches ~4.3:1, below AA for this text size, while Marigold-on-Espresso reaches ~9:1; Toffee remains correct everywhere else the eyebrow pattern is used on light backgrounds), `--font-sans` + `--text-lg` (subhead), `--spacing-section-y`, `--shadow-elevated` (if headline sits on a card over the photo).

**Accessibility notes.** Headline is a real `<h1>` (one per page). If background photo is decorative, mark it `aria-hidden`/empty `alt=""`; if it's meaningful (e.g. the storefront itself), give it a real `alt`. Ensure headline/subhead contrast against the photo — add a scrim (Espresso at low opacity) behind text if the underlying photo varies in brightness.

**Content guidelines.** Eyebrow: 1–3 words. Headline: short enough to hold at `--text-5xl` without wrapping past 2 lines (aim ≤6 words PT, ≤7 EN). Subhead: one sentence, matching the reference's tone ("Faça uma pausa com sabores e preços apetitosos.").

---

## 3. SectionHeader

**Purpose.** The reusable eyebrow+title+divider pattern that opens every content section in the reference (e.g. "MENUS · PRODUTOS").

**Anatomy.** Eyebrow (optional) → Fraunces title → optional dot-divider beneath.

**Variants.** Centered (matches reference's section-opening usage) vs. left-aligned (for denser interior sections).

**States.** Static — no interactive states.

**Responsive behavior.** Title drops from `--text-3xl` to `--text-2xl` below `sm`.

**Token usage.** `--font-display` + `--text-3xl`, `--color-muted` + `--text-sm` (eyebrow), `--color-muted` (divider line/dots).

**Accessibility notes.** Use the correct heading level for document structure (`h2` for a top-level section, not always `h1`/`h2` by visual size) — visual scale and semantic level are set independently via the token, not by swapping heading tags for size.

**Content guidelines.** Title is typically a category name or short phrase, not a full sentence — mirrors the reference's "MENUS · PRODUTOS."

---

## 4. MenuTile

**Purpose.** The core repeating unit of the site — the alternating photo/text grid that presents products and prices.

**Anatomy — Photo variant.** Full-bleed image (rounded `--radius-sm`) → optional PriceStamp badge overlaid, rotated, top-right or bottom-left corner → name caption in a translucent Espresso bar along the bottom edge. **Implemented exception**: the caption uses `--text-base`/font-extrabold, not the `--text-xl` token documented below for "product name in a MenuTile" — the narrow caption bar over a photo needs a smaller size than the Text variant's product name to avoid wrapping; the `--text-xl` token still applies as documented to the Text variant.

**Anatomy — Text variant.** Oat card (`--radius-md`, `--shadow-card`) → eyebrow label (Toffee, all-caps) → product name (Archivo Black, `--text-xl`) → optional modifier line ("+ Bebida").

**Variants.** Photo, Text — always used together in an alternating grid, never as a photo-only or text-only page.

**States.** Hover (desktop): `--shadow-card` → `--shadow-elevated`, slight scale (1.01–1.02) using `--duration-base`/`--ease-standard`. Focus-visible (if the tile itself is a link): visible ring, same treatment as Button.

**Responsive behavior.** 3-column grid desktop (`lg`) → 2-column `sm` → 1-column below `sm`, gutter `--spacing-tile-gap`. Photo tiles keep a ~4:3 aspect ratio at every breakpoint so the grid stays visually even regardless of text-tile content length.

**Token usage.** `--spacing-tile-gap`, `--radius-sm`/`--radius-md`, `--shadow-card`/`--shadow-elevated`, `--color-surface` (Text variant background), `--color-muted` (eyebrow), `--font-sans` `--text-xl` (product name).

**Accessibility notes.** If a tile is a link to a product detail page, the whole tile is one `<a>` (not nested interactive elements) with a real accessible name combining product + price. Photo tiles need `alt` text per style-guide § 9 — implemented via an optional `image?: SourcedImage` prop (`app/lib/images.ts`) carrying real, descriptive `alt` text; when a slug isn't mapped, the component falls back to the original aria-hidden emoji-gradient placeholder rather than breaking.

**Content guidelines.** Product name 1–3 words (fits `--text-xl` Archivo Black without wrapping awkwardly); eyebrow is the category ("DOÇARIA", "SANDES"); modifier line is short and starts with "+".

---

## 5. PriceStamp badge

**The signature element.** A rotated circular badge in Raspberry with Space Mono numerals, evoking a hand-pressed rubber stamp — the one place the brand allows itself ornament (see style-guide § 1).

**Purpose.** Show a price with enough visual weight to read at a glance across a busy photo tile, while reinforcing the "stamped" brand motif.

**Anatomy.** Circle (Raspberry fill, `--radius-full`) → currency + price in Space Mono → subtle rotation (−8° to −12°, varied slightly per instance so repeated badges don't look mechanically identical) → stamped/rough-edge treatment.

**Rough-edge treatment — candidate approaches (not committed):**
1. **Dashed/double border** — a Raspberry circle with an inset dashed ring in a slightly darker shade; cheapest to implement, least convincing "stamp" feel.
2. **SVG mask** — a hand-drawn irregular circular path used as a `clip-path`/mask on the badge background; most convincing texture, requires a one-time SVG asset.
3. **CSS filter (`feTurbulence`/blur+contrast)** — procedural roughness via an SVG filter applied to the badge edge; convincing and asset-free, but filter performance/browser support should be checked before committing.

Recommend option 2 (SVG mask) for visual quality, with option 1 as a fallback if asset production isn't feasible in the first implementation pass. **Implemented: option 1** (dashed inset ring, no SVG asset) — the simpler treatment was sufficient at implementation time; revisit option 2 if the stamp needs to read as more convincingly hand-pressed on closer inspection.

**Variants.** Primary (on photo tiles, as in the reference) — Secondary/small reuse as a "new" or "limited" tag elsewhere, same visual language at a smaller scale (see also Tag/Badge, § 10, for the decision point this creates).

**States.** Default (static). On interactive surfaces (e.g. used inside a Button, § 6), a hover "thud": scale 1 → 1.06 → 1 using `--ease-stamp` over `--duration-base`, evoking a stamp press.

**Responsive behavior.** Fixed size across breakpoints (doesn't scale down with the tile) so it reads consistently; position (top-right vs. bottom-left overlay on its parent tile) may need to shift on mobile to avoid covering the tile's focal subject.

**Token usage.** `--color-accent` (fill), `--color-surface` (numeral text — Oat on Raspberry is 4.8:1, AA; see style-guide contrast table — do **not** use Espresso text here), `--font-mono`, `--radius-full`, `--shadow-stamp`, `--ease-stamp`, `--duration-base`.

**Accessibility notes.** Minimum 44×44px hit area even though the visual badge may render smaller — pad the touch target. Price text must remain in the DOM as real text (not a background image) for screen readers/zoom. If overlaid on a photo, ensure the badge's own background (not the photo) is what the text sits on, so contrast is guaranteed regardless of the underlying image.

**Content guidelines.** Currency format is Real, PT-BR convention (`R$22,00` — symbol prefix, comma decimal). Implemented at `--text-xs` (not `--text-sm`) inside a 4.5rem circle (not the originally-specced default token size) — the longer `R$XX,XX` strings (up to 7 characters, e.g. "R$22,00" for Bauru) needed the larger circle + smaller type to stay readable without overflowing; verified against the actual longest price in the live menu data rather than assumed.

---

## 6. Button

**Purpose.** Primary calls to action (hero CTA, "Ver menu completo", form submits).

**Variants.**
- **Primary**: Marigold fill, Espresso text (9.1:1 contrast) — highest emphasis.
- **Secondary**: Oat fill, Espresso border + text — medium emphasis.
- **Ghost**: transparent, Espresso text, underline on hover — low emphasis, inline/text-adjacent actions.

**States (all variants).** Default → Hover (`--duration-fast`, slight brightness/shadow shift, `--shadow-card` → `--shadow-elevated` for Primary/Secondary) → Focus-visible (2px Espresso ring, 2px offset, visible on every variant including Primary-on-Marigold) → Active/pressed (scale 0.98, `--ease-stamp` — the same "thud" language as the PriceStamp, since both are the brand's tactile-press motif) → Disabled (reduced opacity, `cursor: not-allowed`, `pointer-events: none` so hover/active states can't visually trigger even on stray pointer movement).

**Responsive behavior.** Full-width on mobile within its container where used as a primary page CTA; inline/auto-width elsewhere. Minimum 44px height at every breakpoint.

**Token usage.** `--color-primary`/`--color-surface` (fills), `--foreground` (text/border), `--radius-full` (pill shape, consistent with the PriceStamp's circular language), `--font-sans` `--text-sm`/`--text-base` Bold, `--duration-fast`, `--ease-stamp`.

**Accessibility notes.** Real `<button>` or `<a>` depending on action vs. navigation — never a `<div>` with a click handler. Disabled buttons use the `disabled` attribute (or `aria-disabled` if the action must remain focusable for messaging), not just a visual style.

**Content guidelines.** Active-voice, plain verbs matching what happens ("Ver menu", "Reservar mesa") — not vague labels like "Saiba mais" without a clear destination.

---

## 7. Divider with dot ornament

**Purpose.** The hairline-rule-plus-dots motif separating sections/tiles in the reference — a quiet structural device, not decoration for its own sake.

**Anatomy.** 1px horizontal rule (Toffee, low opacity) → one or more small circular dots (Toffee) centered or offset on the line.

**Variants.** Full-width section divider vs. short inline divider (between an eyebrow and its content, as in individual MenuTiles).

**States.** Static.

**Responsive behavior.** Full-width variant's dot position may shift (e.g. always centered on mobile regardless of desktop offset) to stay visually balanced at narrow widths.

**Token usage.** `--color-muted` (Toffee), consistent stroke width regardless of breakpoint.

**Accessibility notes.** Purely decorative — `role="presentation"`/`aria-hidden="true"`, never conveys meaning through the dot count or position alone.

---

## 8. Footer

**Purpose.** Secondary navigation, practical info (hours/address), and brand sign-off.

**Anatomy.** Link groups (columns) → hours/address block → optional newsletter signup form → legal line (copyright, bottom).

**States.** Links follow the same hover/focus treatment as NavBar links, adjusted for the Footer's background (Espresso or Oat — not Marigold, to visually close the page rather than reopen the nav band's brand statement).

**Responsive behavior.** Multi-column desktop → stacked single column mobile, hours/address block prioritized near the top of the stack (practical info should be reachable without scrolling the whole footer on mobile).

**Token usage.** `--color-surface` or `--foreground`-as-background (Footer background decision — recommend Espresso background with Oat text for a clear "close of page" visual break from the Parchment content above), `--font-sans`, `--text-sm`, `--spacing-section-y`.

**Accessibility notes.** `<footer>` landmark; newsletter form (if present) has a real `<label>` (visually hidden if needed), not placeholder-only labeling.

**Content guidelines.** Hours in local format, address matching how the brand would appear on a map listing. Newsletter CTA copy in active voice ("Receber novidades", not "Submeter").

---

## 9. Card/Surface primitive

**Purpose.** The base Oat surface other components (Text MenuTile, form panels, drawer content) compose from, so elevation/radius/padding stay consistent.

**Anatomy.** Oat background → `--radius-md` → `--shadow-card` → internal padding (consistent scale, e.g. `--spacing-tile-gap` equivalent).

**States.** Optional hover elevation (`--shadow-card` → `--shadow-elevated`) only when the card itself is interactive (e.g. a linked MenuTile) — static cards (like a form panel) don't need a hover state.

**Token usage.** `--color-surface`, `--radius-md`, `--shadow-card`/`--shadow-elevated`.

**Accessibility notes.** No semantic weight of its own — the semantics come from its content; don't wrap unrelated content in one Card just for visual grouping if it isn't actually one unit of meaning.

---

## 10. Tag/Badge (secondary)

**Status: implemented** as `app/components/badge.tsx`, matching the recommendation below exactly.

**Purpose.** Small dietary/status labels (vegan, gluten-free, "new"). Implemented use case: rendering the CSV `badge` field ("Popular", "Favorito da Casa") inline in `MenuItemCard` — the same category of secondary status label this spec anticipated, not a new visual concept.

**Decision point — not fully resolved:** should this reuse the PriceStamp's stamped-circle visual language at a smaller scale (reinforcing the one signature motif everywhere), or be a visually distinct pill (avoiding overloading the stamp motif's meaning, which is specifically "price")? **Recommendation:** keep Tag/Badge visually distinct — a simple rounded-rectangle pill (`--radius-full` but rectangular, not circular) in Toffee-on-Oat — so the circular Raspberry stamp continues to mean "price" unambiguously wherever it appears, per the "spend your boldness in one place" principle from the style guide.

**Anatomy.** Small pill, Toffee border/text on Oat fill, `--text-sm` (not `--text-xs` — Toffee-on-Oat only clears AA at large/bold text sizes per the style-guide's contrast table, and `--text-sm` bold all-caps is the smallest size that qualifies).

**Accessibility notes.** If conveying dietary information, text must be present (not icon-only without an accessible label) — e.g. "Vegan" as visible/accessible text, an icon may accompany but not replace it.

---

## 11. LocationCard (not fully specced)

The reference's nav includes "As nossas lojas" ("Our stores"), implying a store-locator page or section. Whether the site is a single scrolling page (matching the reference exactly) or multi-page (with a dedicated locations page) wasn't decided in this documentation pass — see [README.md § Scope notes](./README.md#scope-notes). Flagged as future scope rather than specced now; when that page-structure decision is made, a LocationCard spec (address, hours, map embed or static map image, following the Card/Surface primitive above) should be added here.

---

## 12. ReservationDialog

**Purpose.** Lets a visitor request a table (name, party size, date, time) from anywhere on the site — triggered from both the NavBar's "Reservar Mesa" button (every page) and the Hero's secondary CTA (Home only).

**Anatomy.** Native `<dialog>` element → header (title + close button) → form (name text input, party-size number input, date input, time input, submit button) → OR, in the success state, a confirmation message echoing the saved reservation + a close button.

**Implementation choice.** Uses the native HTML `<dialog>` (`showModal()`/`close()`) rather than a custom overlay or a dependency like Radix — this gives a built-in focus trap, ESC-to-close, top-layer stacking (no z-index conflicts with the sticky NavBar), and `::backdrop` dimming for free, keeping the project's zero-UI-library footprint. A single instance is mounted once via `ReservationDialogProvider` in `app/layout.tsx`, exposed to any descendant component through a `useReservationDialog()` context hook — necessary because the NavBar and Hero triggers are sibling components, not parent/child.

**States.** `idle` (form, empty) → `submitting` (inputs disabled, submit button reads "Enviando...") → `success` (form replaced with a confirmation sentence naming the confirmed party size/date/time/name, dialog stays open rather than auto-closing or redirecting) → `error` (an inline `role="alert"` message from the failed request, form remains editable for retry). Backed by a real `POST /api/reservations` — see the route's own validation rules for what triggers the `error` state.

**Responsive behavior.** Fixed max-width (`28rem`) centered via the dialog's default top-layer centering, `90vw` cap so it never touches the viewport edges on mobile. Date/time inputs sit side-by-side above `sm`, unchanged below (native inputs stay usable at any width).

**Token usage.** `--color-surface` (panel), `--radius-lg`, `--shadow-elevated`, `--font-display` (title), `--color-accent` (error text), `Button` component reuse for both the submit and close actions.

**Accessibility notes.** `aria-labelledby` pointing at the dialog title; the native `<dialog>` handles focus trap and ESC-to-close without extra JS. Every field has a real `<label htmlFor>`. The error message uses `role="alert"` so screen readers announce it immediately. Submit button disables during `submitting` to prevent double-submission, with its label text (not just a spinner) communicating state.

**Content guidelines.** Field labels are plain nouns ("Nome", "Número de pessoas", "Data", "Horário"). Success copy names back exactly what was confirmed, in the same order the form asked for it, so the user can visually double-check it.

---

## 13. EventCard

**Purpose.** Displays one recurring cafe event (the Friday open mic night, the Saturday coffee tasting) with its next concrete upcoming date, in the Home page's "Próximos Eventos" section.

**Anatomy.** Card/Surface base (§ 9, applied inline) → eyebrow line combining the formatted date + time (e.g. "Sexta-feira, 4 de julho · 20:00") → title (Fraunces) → description (Archivo).

**Variants.** None — a single presentational shape, reused for both event types.

**States.** Static, no interactivity — matches the Divider/SectionHeader pattern of purely presentational components.

**Responsive behavior.** Part of a 2-column grid on Home that collapses to 1 column below `sm`; the card itself has no internal responsive behavior beyond text reflow.

**Token usage.** `--color-surface`, `--radius-md`, `--shadow-card`, `--color-muted` (eyebrow), `--font-display` (title), `--font-sans` (body).

**Accessibility notes.** Plain content flow, no ARIA needed — date/time is real visible text (via `Intl.DateTimeFormat("pt-BR", …)`), not conveyed through color or icon alone.

**Content guidelines.** Title names the event, not the day ("Noite de Microfone Aberto", not "Sexta-feira às 20h"); the day/time lives in the eyebrow so the pattern stays scannable across both cards.

---

## 14. MenuItemCard

**Purpose.** The full-menu card for `/menu` — retroactively documented here after implementation surfaced it needed its own spec, distinct from MenuTile (§ 4).

**Anatomy.** Card/Surface base (§ 9, applied inline: Oat, `--radius-md`, `--shadow-card`) → image (real photo via `app/lib/images.ts`, or the same gradient+emoji fallback as PhotoMenuTile) → PriceStamp overlaid top-right → name + optional Badge (§ 10) on one line → description line beneath.

**Variants.** None — one shape, reused across all 20 menu items and all 4 categories.

**States.** Static — **no hover elevation**, unlike MenuTile. The card isn't a link or otherwise interactive, so per the Card/Surface rule ("static cards don't need a hover state"), it stays at `--shadow-card` always rather than implying clickability it doesn't have.

**Responsive behavior.** 4-column grid at `lg`, 2-column at `sm`, 1-column below — one column wider than MenuTile's 3-column cap, since `/menu`'s category sections are denser lists rather than a curated highlight grid.

**Token usage.** `--color-surface`, `--radius-md`, `--shadow-card`, `PriceStamp` and `Badge` component reuse.

**Accessibility notes.** Image `alt` text sourced from `SourcedImage.alt` (real, dish-specific); falls back to the aria-hidden emoji treatment when unmapped, same as PhotoMenuTile.

**Content guidelines.** Description is the CSV `description` field verbatim — one sentence, no truncation logic, since the source data is already written to fit.

---

## Open implementation notes

- **Icon library**: still no package installed. NavBar's hamburger/close icons were implemented as small inline `<svg>` markup rather than adding Lucide/Heroicons — sufficient for the two icons needed so far; revisit if icon needs grow (e.g. a future Footer social-links row).
- **Logo asset**: see [style-guide.md § 2](./style-guide.md#2-logo--mark) — NavBar's logo mark is still a placeholder direction only ("B" in a dashed circle), unchanged by this implementation pass.
