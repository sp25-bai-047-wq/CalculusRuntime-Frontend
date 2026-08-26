// Renders every math segment in the new certificate example banks through KaTeX
// with throwOnError enabled, so malformed LaTeX shows up here instead of on the page.
import fs from "node:fs";
import path from "node:path";
import katex from "katex";

const files = fs
  .readdirSync("src/data")
  .filter((f) => /^(la|ps).*CertExamples\.js$/.test(f));

const tmp = ".katexcheck";
fs.rmSync(tmp, { recursive: true, force: true });
fs.mkdirSync(tmp);

const MATH = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
let segments = 0;
let strings = 0;
const failures = [];

function walk(label, value) {
  if (typeof value === "string") {
    strings += 1;
    let m;
    MATH.lastIndex = 0;
    while ((m = MATH.exec(value)) !== null) {
      const latex = m[1] ?? m[2];
      segments += 1;
      try {
        katex.renderToString(latex, { throwOnError: true, strict: false, displayMode: m[1] != null });
      } catch (err) {
        failures.push(`${label}: ${err.message}\n    in: ${latex}`);
      }
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((v, i) => walk(`${label}[${i}]`, v));
    return;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) walk(`${label}.${k}`, v);
  }
}

for (const file of files) {
  const target = path.join(tmp, file.replace(/\.js$/, ".mjs"));
  fs.copyFileSync(path.join("src/data", file), target);
  const mod = await import(path.resolve(target).replace(/\\/g, "/").replace(/^/, "file:///"));
  for (const [name, bank] of Object.entries(mod)) {
    bank.forEach((ex) => walk(`${file}/${name}/#${ex.number} ${ex.title}`, ex));
  }
}

fs.rmSync(tmp, { recursive: true, force: true });

const summary = [
  `files: ${files.length}`,
  `strings scanned: ${strings}`,
  `math segments rendered: ${segments}`,
  `failures: ${failures.length}`,
  ...failures,
].join("\n");

fs.writeFileSync("_katex_check.txt", summary);
console.log(summary);
process.exit(failures.length ? 1 : 0);
