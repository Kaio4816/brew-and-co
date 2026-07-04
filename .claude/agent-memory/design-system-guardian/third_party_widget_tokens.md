---
name: third-party-widget-tokens
description: How third-party library theming blocks (e.g. @n8n/chat) relate to the token governance rules in tokens.md — precedent set during the 2026-07-04 chat-widget review, and the full remediation applied same-day.
metadata:
  type: project
---

**Precedent (2026-07-04 review of `app/components/n8n-chat.tsx` integration):** a `:root` block added to the *end* of `app/globals.css` (after the `body {}` base style) purely to override a third-party package's own CSS custom-property namespace (e.g. `@n8n/chat`'s `--chat--*` vars) is a legitimate, documented exception to "keep `tokens.reference.css` byte-identical" — **provided**:
1. It only *consumes* existing `--palette-*`/raw tokens via `var()`/`color-mix()`, never redefines `--palette-*`/`--color-*`/`--font-*`/`--radius-*`/etc.
2. It's clearly commented as out-of-scope for the token block.
3. `tokens.md` § 9 and `tokens.reference.css`'s own header comment name this as a *second* excluded-block category (not just "minus the body base style"). **Status: done as of 2026-07-04** — both now explicitly call out the `@n8n/chat` widget-theming block as excluded.

**Why:** `tokens.reference.css`'s whole purpose (per its own header + `tokens.md` § 9) is a portable mirror of *this project's own* design-token system, meant to be readable without pulling in a third-party stylesheet import. `--chat--*` variables have no meaning without `@n8n/chat/style.css` already loaded, so they don't belong there. The "new tokens must land in all three places" rule in `tokens.md` § 10 is about new *members of the palette/type-scale/radius/shadow/motion tables* — not about adapter/integration layers that only reference those tokens.

**How to apply:** if another third-party widget gets themed via CSS vars in the future, expect the same pattern (isolated `:root` block, `var(--palette-*)`/`color-mix()` reads only, excluded from `tokens.reference.css`, both docs updated to name it) to be acceptable — don't flag the exclusion itself as a violation.

**2026-07-04 full remediation (revisar-e-corrigir mode, applied directly to `app/globals.css`):**
- **Critical Oat-on-Oat fixed** — via the *other* valid resolution than originally suggested: instead of repointing `--chat--color-light` away from Oat, it was **kept** at `var(--palette-oat)` (the window/body/footer "panel" surface) and `--chat--message--bot--background` was repointed to `var(--palette-parchment)` (recessed, sitting on top of the Oat panel) — plus a subtle `--chat--message--bot--border` added as belt-and-suspenders. This mirrors a real precedent already shipped in `app/components/reservation-dialog.tsx`: the dialog panel is `bg-surface` (Oat) with `shadow-elevated`, while its `<input>` fields sit on `bg-background` (Parchment) with a `border-foreground/15` hairline and a 2px Espresso focus-visible outline. The chat window now reuses that exact Oat-panel/Parchment-recessed-field pairing (window vs. bot-bubble/input-field). This Oat-panel/Parchment-recessed pattern is worth reusing for any future floating-panel component — it's an inference from shipped code, not a rule written in style-guide.md/tokens.md itself.
- All hand-picked hex shades (`#d1a52f`, `#b8912a`, `#3d2a1e`) replaced with `color-mix(in srgb, var(--palette-marigold|--palette-espresso) X%, black|white)`.
- Input field + send/file buttons re-themed off the package's white/gray defaults onto the palette (Parchment field recessed in Oat panel, Marigold/Espresso send button matching Button-primary spec, Oat/Espresso secondary buttons matching Button-secondary spec per components.md § 6).
- Cool-gray package neutrals (`--chat--color-light-shade-50/100`, `--chat--color-disabled`, `--chat--color-typing`) re-themed warm via `color-mix()` from `--palette-toffee`. `--chat--color-medium` was deliberately left untouched — verified via grep against `node_modules/@n8n/chat/dist/style.css` that no shipped CSS rule in this package version actually consumes it, so theming it would be dead code.
- Added `.chat-window`/`.chat-window-toggle` box-shadow rules (literal values mirroring `--shadow-elevated`/`--shadow-card`) since **no upstream `--chat--*` variable controls window/toggle box-shadow** (only `--chat--window--border` exists) — a deliberate, commented exception to "only override `--chat--*` variables," using raw class-selector overrides instead, because no variable hook exists. Worth a second look if `@n8n/chat` ships a shadow variable in a future version (grep `node_modules/@n8n/chat/dist/style.css` for `box-shadow`/`--chat--window` before assuming this is still needed).
- `--chat--heading--font-size` changed from the package default `2em` (~32px, oversized in a compact window) to a literal `1.375rem` mirroring `--text-xl`.
- Fixed the block's own doc comment, which had over-generalized the "literal value, no runtime var" justification to cover `--chat--font-family` — that variable correctly uses `var(--font-archivo)`, a real next/font CSS variable, not a `@theme`-baked literal; only the radius/heading-size lines needed that justification.
- Added an inline comment in `n8n-chat.tsx` explaining why pt-BR strings live under the `i18n.en` key (package's default-locale key, not a stray English leftover).
- `npm run build` passed clean after all changes (verified 2026-07-04).

See [[design-doc-inconsistencies]] for the pre-existing doc-vs-doc contradictions unrelated to this widget.
