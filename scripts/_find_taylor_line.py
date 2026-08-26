# -*- coding: utf-8 -*-
from pathlib import Path

p = Path("src/data/mvTaylorQuizzes.js")
lines = p.read_text(encoding="utf-8").splitlines()
for i, line in enumerate(lines, 1):
    if "Product of series" in line or "Coefficient of $x^4$ in $e" in line:
        print(i, repr(line[:200]))
