# -*- coding: utf-8 -*-
"""Dumps a random readable sample of generated questions for eyeballing."""
import io
import json
import os
import random

HERE = os.path.dirname(os.path.abspath(__file__))
items = []
for f in ["calcAgPracticeBank.js", "mvPracticeBank.js", "psPracticeBank.js", "laPracticeBank.js"]:
    raw = io.open(os.path.join(HERE, "src", "data", f), encoding="utf-8").read()
    items += json.loads(raw[raw.index("["):raw.rindex("]") + 1])

random.seed(7)
lines = []
for it in random.sample(items, 30):
    lines.append("[%s / %s] %s" % (it["topic"], it["difficulty"], it["question"]))
    for i, o in enumerate(it["options"]):
        lines.append(("  * " if i == it["correctAnswer"] else "    ") + o)
    lines.append("    why: " + it["explanation"])
    lines.append("")

io.open(os.path.join(HERE, "_pgen_sample.txt"), "w", encoding="utf-8").write("\n".join(lines))
print("sample written")
