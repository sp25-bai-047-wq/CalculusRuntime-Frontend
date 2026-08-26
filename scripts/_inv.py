# -*- coding: utf-8 -*-
"""Counts worked examples per Linear Algebra / Probability guide part."""
import glob
import io

pats = [
    "src/pages/linearAlgebra/*.jsx",
    "src/pages/probabilityStatistics/*.jsx",
    "src/pages/probability*/*.jsx",
]
seen = {}
for p in pats:
    for f in glob.glob(p):
        seen[f.replace("\\", "/")] = True

rows = []
for f in sorted(seen):
    t = io.open(f, encoding="utf-8").read()
    rows.append(
        "%-60s lines=%5d worked=%2d part2blocks=%d eight=%d"
        % (f, len(t.splitlines()), t.count("<WorkedExample"), t.count("part === 2"), t.count("EightExamples"))
    )

io.open("_inv.txt", "w", encoding="utf-8").write("\n".join(rows))
print("\n".join(rows))
