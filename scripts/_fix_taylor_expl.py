# -*- coding: utf-8 -*-
from pathlib import Path

p = Path("src/data/mvTaylorQuizzes.js")
lines = p.read_text(encoding="utf-8").splitlines(keepends=True)
fixed = False
for i, line in enumerate(lines):
    if line.lstrip().startswith('explanation: "Product of series: known'):
        lines[i] = (
            '    explanation: "With $e^x=1+x+x^2/2+x^3/6+x^4/24$ and '
            '$\\\\cos x=1-x^2/2+x^4/24$, the $x^4$ coefficient is '
            '$1/24+(1/2)(-1/2)+1/24=-1/6$.",\n'
        )
        fixed = True
        print(f"replaced line {i+1}")
        break
if not fixed:
    raise SystemExit("not found")
p.write_text("".join(lines), encoding="utf-8")
print("done")
