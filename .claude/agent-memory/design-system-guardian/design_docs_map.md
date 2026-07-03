---
name: design-docs-map
description: Location and purpose of each file in docs/design/, and how they relate — read this first in any design review.
metadata:
  type: project
---

`docs/design/` contains the full design system for Brew & Co (cafeteria de bairro, Vila Madalena, SP):

- `README.md` — reading order + scope notes (status: 3-page site implemented — Home, /sobre, /menu — plus a reservation flow).
- `style-guide.md` — the *why*: brand narrative, color usage rules + WCAG contrast table (§3), typography rules + type-scale table (§4), spacing/grid (§5), imagery direction (§6), motion principles (§7), voice/tone pt-BR (§8), accessibility commitments (§9).
- `tokens.md` — the *what*: concrete CSS variable spec, three-tier token architecture (`--palette-*` raw → `@theme inline` `--color-*` aliases → Tailwind utilities). Explains why motion tokens deliberately stay outside `@theme` (see [[motion-tokens-outside-theme]]).
- `tokens.reference.css` — byte-identical mirror of the token block in `app/globals.css` (verified in the 2026-07-02 review: still in sync).
- `components.md` — the *how*: per-component spec (Purpose/Anatomy/Variants/States/Responsive/Token usage/Accessibility/Content). Numbered sections: §1 NavBar, §2 Hero, §3 SectionHeader, §4 MenuTile, §5 PriceStamp, §6 Button, §7 Divider, §8 Footer, §9 Card/Surface (not standalone — inlined), §10 Badge, §11 LocationCard (unbuilt, out of scope), §12 ReservationDialog, §13 EventCard. Component code snippets in this doc are explicitly "illustrative" — actual `.tsx` files are the implementation source of truth.
- `references/1.png` — the single visual mockup ("Baggo") this whole system derives from.

Live implementation lives in `app/components/*.tsx`, `app/globals.css` (tokens), `app/layout.tsx` (font loading + lang="pt-BR"), plus routes `app/page.tsx`, `app/sobre/page.tsx`, `app/menu/page.tsx`.

See [[design-tokens-facts]] for the concrete token values worth remembering, and [[design-doc-inconsistencies]] for known doc-vs-doc or doc-vs-reality gaps found during review.
