---
name: design-tokens-facts
description: Concrete, frequently-needed token values and font-loading facts for Brew & Co — saves re-reading tokens.md/globals.css every review.
metadata:
  type: project
---

**Colors** (`app/globals.css`, matches `tokens.md` §2 exactly, verified byte-identical against `tokens.reference.css` on 2026-07-02):
Espresso `#2A1A12` (ink), Marigold `#E7B93A` (brand/nav band), Parchment `#F6EEDD` (page bg), Oat `#FBF8F2` (card surface — must sit ON Parchment, never as outermost bg, never stacked Oat-on-Oat), Raspberry `#C93368` (accent, capped ~10% viewport — PriceStamp + error states only, NOT used for Button primary fill despite style-guide §3 implying it should be — see [[design-doc-inconsistencies]]), Toffee `#A9764F` (muted/eyebrow/divider, fails AA below "large text" size).

**Fonts loaded in `app/layout.tsx`** (this is the ground truth, more reliable than style-guide.md's type-scale weight column):
- Fraunces: weights **600, 700, 900 only** — no 800, despite style-guide.md's type-scale table listing "Fraunces Bold/Black (800)" for `--text-3xl`. Code correctly substitutes `font-black` (900) instead — doc is stale, not the code.
- Archivo: 400, 500, 700, 800.
- Space Mono: 400, 700 — reserved for PriceStamp numerals only, never body/UI text (style-guide.md §4 rule, verified respected everywhere in the 2026-07-02 review).

**Recurring implementation pattern to check each review**: every `text-2xl` usage in the codebase (`event-card.tsx`, `reservation-dialog.tsx`, `sobre/page.tsx` ×2) uses `font-bold` (700) rather than the type-scale-specified "Fraunces SemiBold (600)". This is systemic, not a one-off typo — worth asking whether style-guide.md's type scale should be updated to say 700, or whether these four call sites should switch to `font-semibold`.

**PriceStamp actual implementation** (`price-stamp.tsx`): 4.5rem circle, `text-xs`, dashed-ring rough-edge treatment (option 1 from components.md §5, not the SVG-mask option 2). Verified against `docs/menu-items.csv`: "R$22,00" (Bauru) is genuinely the longest price string, so the doc's stated rationale checks out.
