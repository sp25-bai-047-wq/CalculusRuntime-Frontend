# -*- coding: utf-8 -*-
"""Prints the section outline of each LA / P&S guide so new example blocks match part content."""
import io
import re

FILES = [
    "src/pages/linearAlgebra/VectorsGuide.jsx",
    "src/pages/linearAlgebra/MatricesGuide.jsx",
    "src/pages/linearAlgebra/SystemsGuide.jsx",
    "src/pages/linearAlgebra/EigenGuide.jsx",
    "src/pages/probabilityStatistics/ProbabilityBasicsGuide.jsx",
    "src/pages/probabilityStatistics/RandomVariablesGuide.jsx",
    "src/pages/probabilityStatistics/DescriptiveStatsGuide.jsx",
    "src/pages/probabilityStatistics/HypothesisTestingGuide.jsx",
    "src/pages/probabilityStatistics/RegressionGuide.jsx",
]

out = []
for f in FILES:
    lines = io.open(f, encoding="utf-8").read().splitlines()
    out.append("=" * 90)
    out.append(f)
    for i, ln in enumerate(lines, 1):
        s = ln.strip()
        if (
            "part === 2" in s
            or s.startswith("<main")
            or s.startswith("</main>")
            or s.startswith("</StudyGuideShell>")
            or "sec-title" in s
            or 'className="section"' in s
            or "ch-sub" in s
            or "WorkedExample" in s and "number=" in s
        ):
            out.append("%5d| %s" % (i, s[:150]))

io.open("_outline.txt", "w", encoding="utf-8").write("\n".join(out))
print("wrote _outline.txt", len(out), "lines")
