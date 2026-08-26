// Structural + KaTeX validator for the study-guide quiz banks.
//
//   node _quiz_check.mjs                 -> checks every registered bank file
//   node _quiz_check.mjs src/data/x.js   -> checks just those files
//
// Asserts per bank: exactly 15 questions, 3 options, a valid answer letter,
// unique prompts (per file and globally), no banned filler, no stray currency
// dollars, and every $...$ segment rendering through KaTeX with throwOnError.
import fs from "node:fs";
import path from "node:path";
import katex from "katex";

const REGISTERED = [
  "src/data/calcAgStudyQuizzes.js",
  "src/data/mvPartialQuizzes.js",
  "src/data/mvIntegralsStokesQuizzes.js",
  "src/data/mvLagrangeQuizzes.js",
  "src/data/mvDivCurlQuizzes.js",
  "src/data/mvTaylorQuizzes.js",
  "src/data/laVectorsMatricesQuizzes.js",
  "src/data/laSystemsEigenQuizzes.js",
  "src/data/psProbRvQuizzes.js",
  "src/data/psStatsQuizzes.js",
];

const EXPECTED = 15;
const BANNED = [
  "a quick consistency check is to",
  "which statement is always safe exam advice",
  "checkpoint",
  "correct characterization for this section",
  "a distractor that misstates the definition",
  "an unrelated formula from a different chapter",
  "another incorrect computational shortcut",
  "which statement fits this section",
  "all of the above",
  "none of the above",
];
const LETTER_REF = /\boption\s+[ABC]\b|\(\s*[ABC]\s*\)\s*is\s+correct/i;

const args = process.argv.slice(2);
const files = (args.length ? args : REGISTERED).map((f) => f.replace(/\\/g, "/"));

const tmp = ".quizcheck";
fs.rmSync(tmp, { recursive: true, force: true });
fs.mkdirSync(tmp);

const failures = [];
const warnings = [];
const globalPrompts = new Map();
const letterTotals = { A: 0, B: 0, C: 0 };
let bankCount = 0;
let questionCount = 0;
let mathSegments = 0;

const MATH = /\$([^$]*)\$/g;

function checkString(label, value) {
  if (typeof value !== "string") {
    failures.push(`${label}: expected a string, got ${typeof value}`);
    return;
  }
  if (!value.trim()) failures.push(`${label}: empty string`);
  if (/\\\$/.test(value)) failures.push(`${label}: literal escaped currency dollar`);
  if (/\uFFFD|Ã.|â€/.test(value)) failures.push(`${label}: looks like mojibake -> ${value.slice(0, 60)}`);
  const dollars = (value.match(/\$/g) || []).length;
  if (dollars % 2 !== 0) failures.push(`${label}: unbalanced $ delimiters -> ${value.slice(0, 80)}`);
  MATH.lastIndex = 0;
  let m;
  while ((m = MATH.exec(value)) !== null) {
    mathSegments += 1;
    try {
      katex.renderToString(m[1], { throwOnError: true, strict: false, displayMode: false });
    } catch (err) {
      failures.push(`${label}: KaTeX -> ${err.message}\n    in: ${m[1]}`);
    }
  }
  const lower = value.toLowerCase();
  for (const phrase of BANNED) {
    if (lower.includes(phrase)) failures.push(`${label}: banned filler phrase "${phrase}"`);
  }
  if (LETTER_REF.test(value)) warnings.push(`${label}: references an option letter -> ${value.slice(0, 70)}`);
}

for (const file of files) {
  if (!fs.existsSync(file)) {
    failures.push(`${file}: missing`);
    continue;
  }
  const target = path.join(tmp, path.basename(file).replace(/\.js$/, ".mjs"));
  fs.copyFileSync(file, target);
  let mod;
  try {
    mod = await import(`file:///${path.resolve(target).replace(/\\/g, "/")}`);
  } catch (err) {
    failures.push(`${file}: import failed -> ${err.message}`);
    continue;
  }
  const filePrompts = new Set();
  for (const [name, bank] of Object.entries(mod)) {
    if (!Array.isArray(bank)) continue;
    bankCount += 1;
    const label = `${path.basename(file)}/${name}`;
    if (bank.length !== EXPECTED) failures.push(`${label}: ${bank.length} questions, expected ${EXPECTED}`);
    const letters = [];
    bank.forEach((q, i) => {
      questionCount += 1;
      const qLabel = `${label}[${i + 1}]`;
      checkString(`${qLabel}.prompt`, q.prompt);
      checkString(`${qLabel}.explanation`, q.explanation);
      if (!Array.isArray(q.options) || q.options.length !== 3) {
        failures.push(`${qLabel}: expected 3 options, got ${q.options?.length}`);
      } else {
        q.options.forEach((opt, j) => checkString(`${qLabel}.options[${j}]`, opt));
        if (new Set(q.options.map((o) => o.trim())).size !== 3) {
          failures.push(`${qLabel}: duplicate option text`);
        }
      }
      if (!["A", "B", "C"].includes(q.answer)) failures.push(`${qLabel}: bad answer "${q.answer}"`);
      else {
        letters.push(q.answer);
        letterTotals[q.answer] += 1;
      }
      const key = (q.prompt || "").replace(/\s+/g, " ").trim().toLowerCase();
      if (filePrompts.has(key)) failures.push(`${qLabel}: duplicate prompt inside file -> ${key.slice(0, 70)}`);
      filePrompts.add(key);
      if (globalPrompts.has(key)) {
        failures.push(`${qLabel}: duplicate prompt, also in ${globalPrompts.get(key)} -> ${key.slice(0, 70)}`);
      } else {
        globalPrompts.set(key, qLabel);
      }
    });
    // Letter balance within the bank.
    const counts = { A: 0, B: 0, C: 0 };
    letters.forEach((l) => (counts[l] += 1));
    const min = Math.min(counts.A, counts.B, counts.C);
    const max = Math.max(counts.A, counts.B, counts.C);
    if (letters.length === EXPECTED && (min < 3 || max > 7)) {
      failures.push(`${label}: unbalanced answers A=${counts.A} B=${counts.B} C=${counts.C}`);
    }
    for (let i = 2; i < letters.length; i += 1) {
      if (letters[i] === letters[i - 1] && letters[i] === letters[i - 2]) {
        failures.push(`${label}: three identical answers in a row at Q${i + 1} (${letters.join("")})`);
        break;
      }
    }
    const alternating = letters.every((l, i) => i < 3 || l === letters[i - 3]);
    if (letters.length === EXPECTED && alternating) {
      failures.push(`${label}: answers follow a repeating 3-cycle (${letters.join("")})`);
    }
  }
}

fs.rmSync(tmp, { recursive: true, force: true });

const total = letterTotals.A + letterTotals.B + letterTotals.C;
const pct = (n) => (total ? ((n / total) * 100).toFixed(1) : "0.0");
const summary = [
  `files checked:      ${files.length}`,
  `banks:              ${bankCount}`,
  `questions:          ${questionCount}`,
  `math segments:      ${mathSegments}`,
  `answer letters:     A=${letterTotals.A} (${pct(letterTotals.A)}%)  B=${letterTotals.B} (${pct(
    letterTotals.B,
  )}%)  C=${letterTotals.C} (${pct(letterTotals.C)}%)`,
  `warnings:           ${warnings.length}`,
  `failures:           ${failures.length}`,
  ...warnings.slice(0, 40).map((w) => "  WARN " + w),
  ...failures.map((f) => "  FAIL " + f),
].join("\n");

fs.writeFileSync("_quiz_check.txt", summary);
console.log(summary);
process.exit(failures.length ? 1 : 0);
