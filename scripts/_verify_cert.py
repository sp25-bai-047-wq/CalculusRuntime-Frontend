# -*- coding: utf-8 -*-
"""Sanity checks the new LA / P&S eight-example banks.

Verifies: 8 examples per part, >=8 steps per example, required fields present,
balanced inline-math delimiters, unique titles, and no placeholder text.
"""
import glob
import io
import re

FILES = sorted(glob.glob("src/data/la*CertExamples.js") + glob.glob("src/data/ps*CertExamples.js"))
BLOCK = re.compile(r"export const (\w+) = \[(.*?)\n\];", re.S)
EXAMPLE = re.compile(r"\n  \{\n(.*?)\n  \},", re.S)
STEP = re.compile(r"\{ text:")
# Note: "\\\\" is legitimate here - it is a LaTeX matrix row break inside a JS string.
BAD = ["undefined", "NaN", "TODO", "$$"]

problems = []
titles = {}
total_examples = 0
total_steps = 0

for path in FILES:
    text = io.open(path, encoding="utf-8").read()
    blocks = BLOCK.findall(text)
    if not blocks:
        problems.append("%s: no exported example arrays found" % path)
    for name, body in blocks:
        examples = EXAMPLE.findall(body + ",")
        if len(examples) != 8:
            problems.append("%s / %s: %d examples (expected 8)" % (path, name, len(examples)))
        for ex in examples:
            total_examples += 1
            steps = len(STEP.findall(ex))
            total_steps += steps
            title_match = re.search(r'title: "(.*?)",\n', ex)
            title = title_match.group(1) if title_match else "(missing title)"
            if steps < 8:
                problems.append("%s / %s / %s: only %d steps" % (path, name, title, steps))
            for field in ("number:", "tier:", "title:", "setup:", "result:", "check:", "mistake:"):
                if field not in ex:
                    problems.append("%s / %s / %s: missing %s" % (path, name, title, field))
            key = title.lower()
            if key in titles:
                problems.append("duplicate title '%s' in %s and %s" % (title, titles[key], name))
            else:
                titles[key] = name
            for bad in BAD:
                if bad in ex:
                    problems.append("%s / %s / %s: suspicious text %r" % (path, name, title, bad))
            for literal in re.findall(r'"((?:[^"\\]|\\.)*)"', ex):
                dollars = len(re.findall(r"(?<!\\)\$", literal))
                if dollars % 2:
                    problems.append(
                        "%s / %s / %s: unbalanced $ in %r" % (path, name, title, literal[:70])
                    )

    life = len(re.findall(r"\n    life:", text))
    expected_life = len(blocks)
    if life != expected_life:
        problems.append("%s: %d real-life notes for %d parts" % (path, life, expected_life))

summary = [
    "files: %d" % len(FILES),
    "examples: %d" % total_examples,
    "steps: %d (avg %.1f per example)" % (total_steps, total_steps / max(total_examples, 1)),
    "problems: %d" % len(problems),
]
out = "\n".join(summary + problems)
io.open("_verify_cert.txt", "w", encoding="utf-8").write(out)
print(out)
