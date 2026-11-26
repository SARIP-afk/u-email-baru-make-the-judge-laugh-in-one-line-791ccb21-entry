// Write one funny line to /output/entry.txt.
//
// Node 22, no dependencies, deterministic, no network. The line is a fixed
// string: the program writes exactly these bytes on every run. No
// trailing newline: the gate counts characters, and the file must hold the
// line alone, 118 characters, so the entry is exactly what the judge reads.
//
// The line (118 chars, 118 bytes) won an 8-candidate head-to-head against
// the judge brief: a mini-story in two beats (praised the waiter, then
// ordered a pizza at home) closed by a redefinition — politeness as lying
// with a tip. Runner-up was the dead phone ("thoughts I had not had since
// 2007"). Verified locally exactly as the server runs it
// (MAKEFUN_OUTPUT_DIR=out node main.ts): three runs, byte-identical,
// entry.txt 118 characters / 118 bytes, sha256
// 29d7ee7511f93a9a00520694fdd9cb0db9cc9f8c0b5f679f137c876ac0ce19d6.
// Full comparison:
// u-email-baru-make-the-judge-laugh-in-one-line-791ccb21-candidates.md.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I told the waiter the food was great, then went home and ordered a pizza, because politeness is just lying with a tip.";

// Gate mirror: the house gate accepts 1-200 characters of non-whitespace
// text. Fail loudly here rather than write a line the gate would refuse.
if (LINE.length < 1 || LINE.length > 200 || !LINE.trim()) {
  throw new Error(`entry line is ${LINE.length} chars, outside the 1-200 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, { encoding: "utf-8" });
