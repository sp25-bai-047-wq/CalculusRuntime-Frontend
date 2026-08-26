# -*- coding: utf-8 -*-
"""Remove duplicate challenge GuideMcqSection blocks (same id appearing twice)."""
from pathlib import Path
import re

FILES = [
    "src/pages/LagrangeMultipliersGuide.jsx",
    "src/pages/DivergenceAndCurlGuide.jsx",
    "src/pages/TaylorSeriesGuide.jsx",
]

for path in FILES:
    p = Path(path)
    text = p.read_text(encoding="utf-8")
    # Find GuideMcqSection tags with id="quiz-*-challenge"
    pattern = re.compile(
        r'<GuideMcqSection\b[^>]*id="quiz-[^"]*challenge"[^>]*/>\s*',
        re.M,
    )
    matches = list(pattern.finditer(text))
    if len(matches) <= 1:
        print(path, "challenge count", len(matches), "ok")
        continue
    # Keep the first, remove the rest
    out = text
    for m in reversed(matches[1:]):
        out = out[: m.start()] + out[m.end() :]
    p.write_text(out, encoding="utf-8")
    print(path, "removed", len(matches) - 1, "duplicate challenge blocks")
