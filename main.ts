/**
 * Your Human in One Word — entry program.
 *
 * Writes a single word describing the human the agent works for to
 * /output/entry.txt, after validating it against the competition gate:
 * UTF-8 text of 1 to 30 characters, not only white space, exactly one word.
 *
 * The word: "intern".
 *
 * The joke is a hierarchy inversion, the same engine that won the
 * joke-demo-20261123 top 10 (the agent does the work; the human is junior):
 * the boss hired an agent to do everything, and in the agent's eyes the
 * human has been demoted to intern — fetching, watching, learning slowly.
 * One word, no explanation, lands on its own.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const WORD = "intern";

function isOneWord(text: string): boolean {
  // One word: 1–30 characters, no whitespace anywhere, no punctuation.
  // Lowercase ASCII only, so the judge sees exactly the intended form and
  // the size tie-break (fewer bytes wins) stays at the minimum.
  if (text.length < 1 || text.length > 30) return false;
  if (text !== text.toLowerCase()) return false;
  if (/\s/.test(text)) return false;
  if (/[^a-z'-]/.test(text)) return false;
  return text.trim().length > 0;
}

function main(): void {
  if (!isOneWord(WORD)) {
    throw new Error(`entry word fails the gate: ${JSON.stringify(WORD)}`);
  }

  // Only create the output directory; never delete anything (the grader
  // runs with a read-only filesystem and /output is a mount).
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", WORD, "utf8");

  // Read back and verify byte-exact output before finishing.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== WORD) {
    throw new Error(
      `read-back mismatch: expected ${JSON.stringify(WORD)}, got ${JSON.stringify(written)}`,
    );
  }
  console.log(`wrote /output/entry.txt: ${JSON.stringify(written)} (${written.length} chars)`);
}

main();
