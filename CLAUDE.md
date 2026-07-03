# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start the dev server (Turbopack) at localhost:3000
- `npm run build` — production build; also runs the TypeScript check (fails the build on type errors)
- `npm run start` — serve the production build (required for the reservations API route — see below)
- `npm run lint` — ESLint (`eslint-config-next` core-web-vitals + typescript configs)

There is no test suite in this repository.

## Architecture

This is a 3-page Next.js App Router site (`/`, `/sobre`, `/menu`) for **Brew & Co**, a fictional cafe in Vila Madalena, São Paulo. Content and locale are **pt-BR / R$** — not pt-PT/Euro; an earlier pass used a placeholder Lisbon identity that was deliberately corrected, so don't reintroduce European Portuguese vocabulary or Euro formatting.

### Design system (`docs/design/`)

`docs/design/README.md`, `style-guide.md`, `tokens.md`, and `components.md` are the governing spec for brand rationale, design tokens, and component anatomy/states — read them before adding or changing UI. They're written to track real implementation status (each doc states what's built vs. not), not just aspirational intent.

`docs/design/tokens.reference.css` must stay **byte-identical** to the token block in `app/globals.css` whenever a token changes — update both in the same change.

A project-level `design-system-guardian` subagent (`.claude/agents/`) checks new/changed UI against these docs. Invoke it proactively after UI work, not just when asked.

### Design tokens (`app/globals.css`)

Tailwind v4, CSS-first config — there is no `tailwind.config.js`. Tokens use a three-tier structure inside `globals.css`:

1. **Raw palette** — `--palette-espresso`, `--palette-marigold`, etc. in `:root`, prefixed `--palette-` (not `--color-`) specifically so they never share a name with the Tailwind-facing keys below (a CSS custom property can't safely alias itself via `var()` under the same name).
2. **Tailwind-facing aliases** — inside `@theme inline`, e.g. `--color-primary: var(--palette-marigold)`. This is what generates utility classes (`bg-primary`, `text-accent`, etc.), plus raw-shade utilities (`bg-espresso`, `bg-toffee`) for one-off compositing like gradients.
3. **Motion tokens** (`--duration-*`, `--ease-*`) are deliberately kept **outside** `@theme` as plain `:root` variables, consumed via inline `style={{ transitionDuration: 'var(--duration-fast)' }}` rather than Tailwind `duration-*` classes. Reason: `@theme inline` bakes literal values directly into generated utility CSS with no runtime variable, so the `prefers-reduced-motion` override in `globals.css` would have nothing to override if these went through Tailwind's theme system.

### Menu data pipeline

`docs/menu-items.csv` is the single source of truth for menu content (category, name, description, price, badge). `app/lib/menu.ts` reads and parses it server-side via Node `fs` with a hand-rolled parser — deliberately not a dependency like `papaparse`, since the file is small, self-authored, and consistently double-quoted (see the parser's doc comment for the one format assumption it relies on).

Each `MenuItem` gets a derived `slug` (ASCII-normalized kebab-case of `name`). That slug is the join key into `app/lib/images.ts`'s `menuItemImages` map. Photos are local WebP files under `public/images/` (downloaded and optimized from Pexels via the `image-optimizer` skill in `.claude/skills/`), not hotlinked at runtime — `photographer`/`pexelsUrl` fields are kept only for attribution/provenance. **If you rename or add a menu item, its slug changes** — update the corresponding entry in `images.ts` (and add the matching file in `public/images/menu/`, via the `image-optimizer` skill) in the same change, or the item silently falls back to the gradient+emoji placeholder in `PhotoMenuTile`/`MenuItemCard` instead of breaking.

`app/lib/events.ts` computes the next occurrence of the recurring weekly events (Friday open mic, Saturday coffee tasting) from a real `Date`, taking `now` as a parameter rather than reading `new Date()` internally, so it stays render-time-correct.

### Reservation flow

Three parts work together:
- `ReservationDialogProvider` (`app/components/reservation-dialog.tsx`) is a context provider mounted once in `app/layout.tsx`, wrapping `{children}`. It renders a single native `<dialog>` (not a custom overlay/Radix) and exposes `useReservationDialog().open()` so both the NavBar and the Hero — sibling components — can trigger the same dialog instance.
- `app/api/reservations/route.ts` validates the POST body server-side and appends each reservation to `data/reservations.json`.
- `data/reservations.json` is gitignored, local runtime data. Writing to it requires the Node runtime (`npm run start`, not a static export or edge deployment) — the route doesn't opt into `edge` runtime, which is what makes `fs` writes work at all.
