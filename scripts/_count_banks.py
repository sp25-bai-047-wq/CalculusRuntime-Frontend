# -*- coding: utf-8 -*-
from pathlib import Path
import re

# fix answer counting
files = sorted(set(Path("src/data").glob("*Quizzes.js")) | {Path("src/data/calcAgStudyQuizzes.js")})
for f in files:
    if not f.exists():
        continue
    text = f.read_text(encoding="utf-8")
    exports = re.findall(r"export const (\w+)\s*=\s*\[", text)
    print(f"=== {f} ===")
    for name in exports:
        m = re.search(rf"export const {name}\s*=\s*\[(.*?)\];", text, re.S)
        if not m:
            print(f"  {name}: PARSE FAIL")
            continue
        body = m.group(1)
        prompts = len(re.findall(r"\bprompt\s*:", body))
        answers = re.findall(r'answer:\s*"([A-D])"', body)
        if not answers:
            answers = re.findall(r"answer:\s*'([A-D])'", body)
        print(f"  {name:28} n={prompts:2} ans={''.join(answers)}")

print("\n--- gen scripts ---")
for p in sorted(Path(".").glob("_gen*.py")) + sorted(Path(".").glob("_pgen*.py")):
    print(p.name, p.stat().st_size)
