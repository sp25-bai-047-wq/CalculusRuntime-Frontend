# -*- coding: utf-8 -*-
"""Inserts the eight-example certificate block into every LA / P&S guide part.

For each guide the part-2 branch appears first in the file, then part 1, so the
first insertion point belongs to part 2 and the second to part 1.
"""
import io
import re
import sys

GUIDES = [
    ("src/pages/linearAlgebra/VectorsGuide.jsx", "LaCertificateBoost", "./LaCertificateBoost", "vectors", "la-cert"),
    ("src/pages/linearAlgebra/MatricesGuide.jsx", "LaCertificateBoost", "./LaCertificateBoost", "matrices", "la-cert"),
    ("src/pages/linearAlgebra/SystemsGuide.jsx", "LaCertificateBoost", "./LaCertificateBoost", "systems", "la-cert"),
    ("src/pages/linearAlgebra/EigenGuide.jsx", "LaCertificateBoost", "./LaCertificateBoost", "eigen", "la-cert"),
    ("src/pages/probabilityStatistics/ProbabilityBasicsGuide.jsx", "PsCertificateBoost", "./PsCertificateBoost", "probability", "ps-cert"),
    ("src/pages/probabilityStatistics/RandomVariablesGuide.jsx", "PsCertificateBoost", "./PsCertificateBoost", "randomvars", "ps-cert"),
    ("src/pages/probabilityStatistics/DescriptiveStatsGuide.jsx", "PsCertificateBoost", "./PsCertificateBoost", "descriptive", "ps-cert"),
    ("src/pages/probabilityStatistics/HypothesisTestingGuide.jsx", "PsCertificateBoost", "./PsCertificateBoost", "hypothesis", "ps-cert"),
    ("src/pages/probabilityStatistics/RegressionGuide.jsx", "PsCertificateBoost", "./PsCertificateBoost", "regression", "ps-cert"),
]

SUMMARY = re.compile(r'^([ \t]*)<section className="section" id="summary[^"]*">', re.M)
NAV_END = re.compile(r"^([ \t]*)</nav>", re.M)

report = []

for path, comp, imp, topic, prefix in GUIDES:
    text = io.open(path, encoding="utf-8").read()
    if comp in text:
        report.append("%s: already wired, skipped" % path)
        continue

    summaries = list(SUMMARY.finditer(text))
    navs = list(NAV_END.finditer(text))
    if len(summaries) != 2 or len(navs) != 2:
        report.append(
            "%s: UNEXPECTED structure (summaries=%d navs=%d) - skipped"
            % (path, len(summaries), len(navs))
        )
        continue

    # Insert from the end backwards so earlier offsets stay valid.
    # Order in file: nav(part2), summary(part2), nav(part1), summary(part1).
    inserts = []
    for idx, m in enumerate(summaries):
        part = 2 if idx == 0 else 1
        indent = m.group(1)
        inserts.append(
            (m.start(), "%s<%s topic=\"%s\" part={%d} />\n\n" % (indent, comp, topic, part))
        )
    for idx, m in enumerate(navs):
        part = 2 if idx == 0 else 1
        indent = m.group(1)
        inserts.append(
            (
                m.start(),
                '%s  <a className="sb-link" href="#%s-%s-p%d">Eight examples</a>\n'
                % (indent, prefix, topic, part),
            )
        )

    for pos, snippet in sorted(inserts, key=lambda p: -p[0]):
        text = text[:pos] + snippet + text[pos:]

    # Import goes after the final existing import statement.
    imports = list(re.finditer(r"^import .*?;\s*$", text, re.M))
    last = imports[-1]
    text = (
        text[: last.end()]
        + '\nimport %s from "%s";' % (comp, imp)
        + text[last.end():]
    )

    io.open(path, "w", encoding="utf-8", newline="\n").write(text)
    report.append("%s: wired (%s parts 1 and 2)" % (path, topic))

out = "\n".join(report)
io.open("_wire_cert.txt", "w", encoding="utf-8").write(out)
print(out)
sys.exit(0)
