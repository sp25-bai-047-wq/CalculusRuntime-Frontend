"""Print, for each quiz block, the section key plus the surrounding guide headings."""
import re, os

TARGETS = [
    "src/pages/PartialDerivativesGuide.jsx",
    "src/pages/MultipleIntegralsGuide.jsx",
    "src/pages/StokesTheoremGuide.jsx",
    "src/pages/LagrangeMultipliersGuide.jsx",
    "src/pages/DivergenceAndCurlGuide.jsx",
    "src/pages/TaylorSeriesGuide.jsx",
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
for p in TARGETS:
    text = open(p, encoding="utf-8").read()
    out.append("=" * 90)
    out.append(p)
    # guide section titles
    for m in re.finditer(r'<h2 className="(?:sec-title|mcq-section-title)">\{?"?([^<{"]+)"?\}?</h2>', text):
        out.append("   heading: " + m.group(1).strip())
    out.append("   --- quiz keys ---")
    for m in re.finditer(r'section="([a-z0-9-]+)"', text):
        out.append("   quiz section: " + m.group(1))
    for m in re.finditer(r'data-section="([^"]+)"', text):
        pass
    keys = []
    for m in re.finditer(r'data-section="([^"]+)"', text):
        if m.group(1) not in keys:
            keys.append(m.group(1))
    for k in keys:
        out.append("   data-section: " + k)
    # quiz titles
    for m in re.finditer(r'title="([^"]+)"\s*\n\s*scoreId', text):
        out.append("   quiz title: " + m.group(1))
open("_quiz_context.txt", "w", encoding="utf-8").write("\n".join(out))
print("wrote _quiz_context.txt", len(out), "lines")
