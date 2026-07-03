import { readFileSync } from "node:fs";
import path from "node:path";

export type MenuCategory =
  | "Bebidas Expressas"
  | "Doces"
  | "Sanduíches"
  | "Bebidas Geladas";

export type MenuBadge = "Popular" | "Favorito da Casa";

export type MenuItem = {
  category: MenuCategory;
  name: string;
  /** ASCII-normalized kebab-case of `name` — stable key into app/lib/images.ts */
  slug: string;
  description: string;
  price: string;
  badge: MenuBadge | null;
};

const CSV_PATH = path.join(process.cwd(), "docs", "menu-items.csv");

function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Every field in docs/menu-items.csv is double-quoted except `badge`,
 * which is left bare (empty) when absent. That's the one CSV quirk this
 * parser relies on — see docs/design/tokens.md-style rationale in the
 * implementation plan: the file is small, self-authored and consistently
 * quoted, so a dependency like papaparse isn't justified here.
 */
function parseCsvLine(line: string): string[] {
  const matches = [...line.matchAll(/"([^"]*)"/g)];
  return matches.map((m) => m[1]);
}

function parseMenuCsv(raw: string): MenuItem[] {
  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  const [, ...rows] = lines; // drop header

  return rows.map((line) => {
    const [category, name, description, price, badge] = parseCsvLine(line);
    return {
      category: category as MenuCategory,
      name,
      slug: slugify(name),
      description,
      price,
      badge: badge ? (badge as MenuBadge) : null,
    };
  });
}

let cachedItems: MenuItem[] | null = null;

export function getAllMenuItems(): MenuItem[] {
  if (!cachedItems) {
    const raw = readFileSync(CSV_PATH, "utf-8");
    cachedItems = parseMenuCsv(raw);
  }
  return cachedItems;
}

export function getMenuByCategory(): Record<MenuCategory, MenuItem[]> {
  const items = getAllMenuItems();
  const categories: MenuCategory[] = [
    "Bebidas Expressas",
    "Doces",
    "Sanduíches",
    "Bebidas Geladas",
  ];

  return Object.fromEntries(
    categories.map((category) => [
      category,
      items.filter((item) => item.category === category),
    ]),
  ) as Record<MenuCategory, MenuItem[]>;
}

/**
 * Curation rule: every "Favorito da Casa" item first (already one per
 * category), then "Popular" items in CSV order, until `limit` is reached.
 */
export function getFeaturedItems(limit = 6): MenuItem[] {
  const items = getAllMenuItems();
  const favorites = items.filter((item) => item.badge === "Favorito da Casa");
  const popular = items.filter((item) => item.badge === "Popular");
  return [...favorites, ...popular].slice(0, limit);
}
