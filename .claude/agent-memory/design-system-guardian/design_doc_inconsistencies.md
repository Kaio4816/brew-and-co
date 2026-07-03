---
name: design-doc-inconsistencies
description: Known contradictions between docs/design files themselves (not code deviations) — found during the 2026-07-02 review of the 3-page site + reservation flow. Don't re-flag these as fresh findings; either they've been resolved or they're still open.
metadata:
  type: project
---

Found while reviewing `app/` against `docs/design/` on 2026-07-02 (3-page site: Home/Sobre/Menu + reservation dialog). These are internal doc contradictions, not implementation bugs — the code made reasonable choices given the conflict.

1. **style-guide.md type-scale weight column vs. actually-loaded Fraunces weights.** `--text-3xl` row says "Fraunces Bold/Black (800)" but `app/layout.tsx` only loads 600/700/900 (matches tokens.md §4). No component uses 800. Code uses `font-black` (900) everywhere at text-3xl (e.g. `section-header.tsx`). Recommend correcting style-guide.md's table to say 900, not 800.

2. **style-guide.md §3 Raspberry usage rule vs. components.md §6 Button spec.** style-guide.md lists Raspberry's role as "Accent — CTAs, the PriceStamp badge, sparingly," implying CTA buttons use Raspberry. But components.md §6 defines Button Primary as **Marigold** fill, Espresso text — no button variant uses Raspberry at all. `button.tsx` correctly follows components.md (the more specific/implementation-oriented spec). Recommend narrowing style-guide.md's wording (e.g. "the occasional inline highlight," dropping "CTAs," or clarifying it means something other than the Button component).

3. **components.md §10 Badge anatomy vs. style-guide.md §9 accessibility commitment.** Badge's anatomy explicitly specifies Toffee text at `--text-xs` on Oat fill. But Toffee-on-Oat is 3.7:1 (style-guide.md §3 contrast table), which fails AA — and the table's own stated exception ("large-text/bold-caps only, matches the eyebrow-label use case") refers to `--text-sm` eyebrow usage, not the smaller `--text-xs` Badge uses. `badge.tsx` matches the documented anatomy exactly, so this is a spec-level self-contradiction, not a coding error. Open decision: either bump Badge to `--text-sm`, or explicitly document why `--text-xs` is an accepted exception.

4. **Hero eyebrow color.** components.md §2 anatomy says "Eyebrow label (Toffee, all-caps)" (this describes the SectionHeader-style eyebrow used on light Parchment/Oat backgrounds). But Hero's photo-background variant sits on a dark Espresso-gradient photo overlay, where Toffee-on-Espresso computes to ~4.3:1 (fails AA at that text size) vs. Marigold-on-Espresso at ~9:1. `hero.tsx` uses `text-marigold` for its eyebrow instead of Toffee — a well-justified deviation given the dark background, not present elsewhere. Recommend documenting Hero's eyebrow as an explicit Marigold-on-dark exception rather than leaving it implied by the generic Toffee rule.

If any of these get resolved (doc updated or code changed), update this memory rather than leaving it stale.
