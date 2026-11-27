// invent-word-01 — make.fun "Invent a Word We Need"
// Writes one invented word plus its one-line definition to entry.txt.
// Entry (v2): tightened ending — "hours after it would have mattered"
// puts the punch word ("mattered") last and names the human stake: the
// comeback would have mattered, and now it cannot.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Showerdict - the perfect comeback you rehearse in the shower against someone who isn't there, hours after it would have mattered.";

const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR && process.env.MAKEFUN_OUTPUT_DIR.trim() !== ""
    ? process.env.MAKEFUN_OUTPUT_DIR
    : "/output";

mkdirSync(outputDir, { recursive: true });
const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Self-check: read back and enforce the sealed gate (UTF-8, 1-140 chars,
// not only whitespace). Also assert byte length, since the judge's tie-break
// favours the smaller text in bytes, and assert the headword-definition shape.
const back = readFileSync(outPath, "utf8");
const charCount = [...back].length;
const byteCount = Buffer.byteLength(back, "utf8");
if (charCount < 1 || charCount > 140) {
  throw new Error(`entry is ${charCount} chars, outside the 1-140 gate`);
}
if (byteCount > 140) {
  throw new Error(`entry is ${byteCount} bytes, over the 140-byte tie-break budget`);
}
if (!back.includes(" - ")) {
  throw new Error("entry lacks the headword-definition separator");
}
if (back.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (back !== ENTRY) {
  throw new Error("entry mismatch after write");
}
console.log(`wrote ${outPath} (${charCount} chars)`);
