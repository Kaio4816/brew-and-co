#!/usr/bin/env node
import { parseArgs } from "node:util";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const repoRoot = path.resolve(fileURLToPath(import.meta.url), "../..");
const publicDir = path.join(repoRoot, "public");

function usage() {
  console.error(
    "Usage: node scripts/optimize-image.mjs --url <source URL> --out <path relative to public/> [--width <px>] [--quality <0-100>]",
  );
}

const { values } = parseArgs({
  options: {
    url: { type: "string" },
    out: { type: "string" },
    width: { type: "string", default: "800" },
    quality: { type: "string", default: "75" },
  },
});

if (!values.url || !values.out) {
  usage();
  process.exit(1);
}

const width = Number.parseInt(values.width, 10);
const quality = Number.parseInt(values.quality, 10);

if (!Number.isFinite(width) || width <= 0 || !Number.isFinite(quality) || quality <= 0 || quality > 100) {
  console.error("Invalid --width or --quality");
  process.exit(1);
}

const destPath = path.join(publicDir, values.out);
if (!destPath.startsWith(publicDir + path.sep)) {
  console.error("--out must resolve inside public/");
  process.exit(1);
}

let response;
try {
  response = await fetch(values.url);
} catch (err) {
  console.error(`Failed to fetch ${values.url}: ${err.message}`);
  process.exit(1);
}

if (!response.ok) {
  console.error(`Failed to fetch ${values.url}: HTTP ${response.status}`);
  process.exit(1);
}

const contentType = response.headers.get("content-type") ?? "";
if (!contentType.startsWith("image/")) {
  console.error(`Unexpected content-type "${contentType}" for ${values.url}`);
  process.exit(1);
}

const buffer = Buffer.from(await response.arrayBuffer());

await mkdir(path.dirname(destPath), { recursive: true });

const image = sharp(buffer).resize({ width, withoutEnlargement: true }).webp({ quality });
const info = await image.toFile(destPath);

console.log(
  `Wrote ${path.relative(repoRoot, destPath)} (${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB)`,
);
