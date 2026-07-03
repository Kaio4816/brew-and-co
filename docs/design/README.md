# Brew & Co — Design System

This folder is the design system for the Brew & Co site: brand rationale, design tokens, and component specs, derived from the reference mockup at [`references/1.png`](./references/1.png).

**Status: implemented (second pass) — a real 3-page site.** The tokens and components described here are live across three routes: `/` (Home — hero, "Mais Pedidos" highlights, "Próximos Eventos", a Sobre teaser), `/sobre` (the founders' story), and `/menu` (all 20 menu items, grouped by category, each with real sourced photography). `app/globals.css` carries the full token set, `app/layout.tsx` loads Fraunces/Archivo/Space Mono and sets `lang="pt-BR"`, and a working table-reservation flow (`ReservationDialogProvider` + `POST /api/reservations`) is wired in from both the NavBar and the Hero. `tokens.reference.css` remains a standalone mirror of the live tokens for quick copy-reference. Not yet built: the Card/Surface primitive as a standalone component (its styles are inlined where used) and LocationCard (see [components.md § 11](./components.md#11-locationcard-not-fully-specced) — still blocked on a page-structure decision, now moot for the 3-page scope actually shipped).

## Reading order

1. **[style-guide.md](./style-guide.md)** — the *why*. Brand narrative, color and typography rationale, spacing/grid, imagery direction, motion principles, voice & tone, accessibility commitments. Read this first to understand the intent behind every value in `tokens.md`.
2. **[tokens.md](./tokens.md)** — the *what*. The concrete, developer-facing token spec — every color, type scale step, spacing value, radius, shadow, and motion value — plus how they map onto this project's Tailwind v4 `@theme inline` pattern, as actually implemented.
3. **[tokens.reference.css](./tokens.reference.css)** — the same tokens as literal CSS, kept byte-identical to the token block in `app/globals.css`.
4. **[components.md](./components.md)** — the *how*. Component-by-component specs (NavBar, Hero, MenuTile, the PriceStamp signature element, Button, Footer, etc.), each referencing tokens from `tokens.md`. Implemented components live in `app/components/`.

## Source material

[`references/1.png`](./references/1.png) is a browser-chrome mockup of a Portuguese cafe/bakery site ("Baggo") — the single visual reference this entire system was extracted from. It set the mustard-and-espresso palette, the bold slab-serif headline treatment, the alternating photo/text tile grid, and the rotated pink "price stamp" badges that became this system's signature element.

## Scope notes

- **Dark mode is deferred.** The current starter has a naive `prefers-color-scheme` auto-inversion; this system replaces it with light-mode tokens only. See [tokens.md § Dark mode](./tokens.md#3-dark-mode) for the reasoning and future-phase note.
- **Site page structure is now resolved**: 3 pages (Home, Sobre Nós, Menu), no locations page in scope. LocationCard (components.md § 11) stays unbuilt as a result, not because the decision is still pending.
- **Locale**: the brand moved from a placeholder Lisbon/pt-PT/Euro identity to its real setting — Vila Madalena, São Paulo — so the site is pt-BR/R$ throughout. See [style-guide.md § 8](./style-guide.md#8-voice--tone--bilingual-copy-guidelines) for what that changed, including a few menu item renames for Portugal-specific vocabulary that don't translate directly (e.g. "Prego no Pão" → "Bauru").
