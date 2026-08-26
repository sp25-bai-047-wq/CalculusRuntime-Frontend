# -*- coding: utf-8 -*-
"""Sanity checks on the generated practice banks."""
import io
import json
import os
import re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
FILES = ["calcAgPracticeBank.js", "mvPracticeBank.js", "psPracticeBank.js", "laPracticeBank.js"]
SUSPECT = ["None", "Fraction", "undefined", "NaN", "  ", "()", "[E", "[M", "[H"]
LEFTOVER = re.compile(r"\{[A-Za-z_][A-Za-z0-9_ *\[\]().+-]*\}")
DANGLING_SUP = re.compile("[A-Za-z\\)][¹⁰](?![⁰¹²³⁴⁵⁶⁷⁸⁹])")

items = []
for f in FILES:
    path = os.path.join(HERE, "src", "data", f)
    raw = io.open(path, encoding="utf-8").read()
    body = raw[raw.index("["):raw.rindex("]") + 1]
    items.extend(json.loads(body))

print("total questions:", len(items))

counts = Counter((it["topic"], it["difficulty"]) for it in items)
bad_counts = {k: v for k, v in counts.items() if v != 100}
print("blocks:", len(counts), "| blocks not equal to 100:", bad_counts or "none")

qseen = {}
dupes = []
problems = []
slots = Counter()
for it in items:
    q = " ".join(it["question"].lower().split())
    if q in qseen:
        dupes.append(it["question"])
    qseen[q] = True
    opts = it["options"]
    slots[it["correctAnswer"]] += 1
    if len(opts) != 4:
        problems.append(f"{it['id']}: {len(opts)} options")
    if len(set(opts)) != len(opts):
        problems.append(f"{it['id']}: duplicate options {opts}")
    if not (0 <= it["correctAnswer"] < len(opts)):
        problems.append(f"{it['id']}: bad correctAnswer")
    for text in [it["question"], it["explanation"]] + opts:
        if not str(text).strip():
            problems.append(f"{it['id']}: blank field")
        for s in SUSPECT:
            if s in str(text):
                problems.append(f"{it['id']}: suspicious {s!r} in {text!r}")
        m = DANGLING_SUP.search(str(text))
        if m:
            problems.append(f"{it['id']}: dangling exponent {m.group(0)!r} in {text!r}")
        m = LEFTOVER.search(str(text))
        if m:
            problems.append(f"{it['id']}: unformatted placeholder {m.group(0)!r} in {text!r}")

print("duplicate questions:", len(dupes))
print("correct-answer slot spread:", dict(sorted(slots.items())))
print("structural problems:", len(problems))
with io.open(os.path.join(HERE, "_pgen_problems.txt"), "w", encoding="utf-8") as fh:
    fh.write("\n".join(problems))

ids = [it["id"] for it in items]
print("duplicate ids:", len(ids) - len(set(ids)))
solve_words = re.compile(r"(evaluate|find|compute|differentiate|solve|calculate|estimate|maximise|minimise|predict|how (fast|many|much)|what is the)", re.I)
computational = sum(1 for it in items if solve_words.search(it["question"]))
print(f"questions phrased as work-to-solve: {computational}/{len(items)} ({computational * 100 // len(items)}%)")
