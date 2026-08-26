# -*- coding: utf-8 -*-
import re
from pathlib import Path

t = Path("src/data/mvTaylorQuizzes.js").read_text(encoding="utf-8")
for name in re.findall(r"export const (\w+)", t):
    i = t.index("[", t.index(f"export const {name}"))
    d = 0
    j = i
    while True:
        if t[j] == "[":
            d += 1
        elif t[j] == "]":
            d -= 1
            if d == 0:
                break
        j += 1
    body = t[i : j + 1]
    prompts = len(re.findall(r"\bprompt\s*:", body))
    answers = re.findall(r'answer:\s*"([ABC])"', body)
    print(name, "prompts", prompts, "answers", len(answers), "".join(answers))

print("==== GUIDES ====")
for f in [
    "LagrangeMultipliersGuide.jsx",
    "DivergenceAndCurlGuide.jsx",
    "TaylorSeriesGuide.jsx",
    "StokesTheoremGuide.jsx",
    "MultipleIntegralsGuide.jsx",
]:
    p = Path("src/pages") / f
    text = p.read_text(encoding="utf-8")
    refs = re.findall(r"questions=\{([A-Z0-9_]+)\}", text)
    print(f, "refs", refs)
    print("  imports", re.findall(r'from "\.\./data/([^"]+)"', text))
