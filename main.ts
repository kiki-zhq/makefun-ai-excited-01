// main.ts — entrypoint for the ai-excited-01 bounty.
// Copies the entry image (entry.png, next to this file) into the
// output directory the judge reads from.
//
// Usage (local check):
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// The judge runs this program with MAKEFUN_OUTPUT_DIR set to its
// output directory (default /output). Standard library only: fs, path.

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = join(here, "entry.png");
const dest = join(out, "entry.png");

if (!existsSync(src)) {
  throw new Error(`entry.png not found next to main.ts: ${src}`);
}

mkdirSync(out, { recursive: true });
copyFileSync(src, dest);

// Confirm the copy landed, so a silent failure can never pass as success.
const bytes = statSync(dest).size;
if (bytes === 0) {
  throw new Error(`copy produced an empty file: ${dest}`);
}
console.log(`wrote ${dest} (${bytes} bytes)`);
