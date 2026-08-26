# -*- coding: utf-8 -*-
"""Generic MV guide wiring: remove Quiz* functions, replace call sites, add imports."""
from __future__ import annotations
import re
from pathlib import Path


def remove_function(text: str, name: str) -> str:
    m = re.search(rf"function {name}\s*\([^)]*\)\s*\{{", text)
    if not m:
        print(f"  warn: function {name} not found")
        return text
    start = m.start()
    i = text.index("{", m.start())
    depth = 0
    j = i
    while j < len(text):
        if text[j] == "{":
            depth += 1
        elif text[j] == "}":
            depth -= 1
            if depth == 0:
                j += 1
                break
        j += 1
    while j < len(text) and text[j] in "\r\n":
        j += 1
    return text[:start] + text[j:]


def remove_inline_section(text: str, section_id: str) -> str:
    """Remove <section className=\"mcq-section\" id=\"...\">...</section> by id."""
    m = re.search(
        rf'<section className="mcq-section" id="{re.escape(section_id)}"[\s\S]*?</section>',
        text,
    )
    if not m:
        print(f"  warn: section id={section_id} not found")
        return text
    return text[: m.start()] + text[m.end() :]


CONFIGS = [
    {
        "file": "src/pages/LagrangeMultipliersGuide.jsx",
        "module": "../data/mvLagrangeQuizzes",
        "exports": [
            "LAGRANGE_GEOMETRY_QUIZ",
            "LAGRANGE_MATH_QUIZ",
            "LAGRANGE_FIELDS_QUIZ",
            "LAGRANGE_CALC_QUIZ",
            "LAGRANGE_MULTI_QUIZ",
            "LAGRANGE_VERIFY_QUIZ",
            "LAGRANGE_INDUSTRY_QUIZ",
            "LAGRANGE_CHALLENGE_QUIZ",
        ],
        "remove_fns": [
            "QuizMcq151", "QuizMcq152", "QuizMcq153", "QuizMcq154",
            "QuizMcq155", "QuizMcq156", "QuizMcq157", "QuizChallengeLagrange",
        ],
        "call_reps": {
            "<QuizMcq151 />": '<GuideMcqSection id="quiz-151" badge="Practice" title="Geometric Intuition Assessments" scoreId="scorelagrange-geometry" section="lagrange-geometry" questions={LAGRANGE_GEOMETRY_QUIZ} />',
            "<QuizMcq152 />": '<GuideMcqSection id="quiz-152" badge="Practice" title="Mathematical Structure Verifications" scoreId="scorelagrange-math" section="lagrange-math" questions={LAGRANGE_MATH_QUIZ} />',
            "<QuizMcq153 />": '<GuideMcqSection id="quiz-153" badge="Practice" title="Field Deconstruction Drills" scoreId="scorelagrange-fields" section="lagrange-fields" questions={LAGRANGE_FIELDS_QUIZ} />',
            "<QuizMcq154 />": '<GuideMcqSection id="quiz-154" badge="Practice" title="Workflow Calculation Drills" scoreId="scorelagrange-calc" section="lagrange-calc" questions={LAGRANGE_CALC_QUIZ} />',
            "<QuizMcq155 />": '<GuideMcqSection id="quiz-155" badge="Practice" title="Multi-Constraint System Drills" scoreId="scorelagrange-multi" section="lagrange-multi" questions={LAGRANGE_MULTI_QUIZ} />',
            "<QuizMcq156 />": '<GuideMcqSection id="quiz-156" badge="Practice" title="Verification Theory Assessments" scoreId="scorelagrange-verify" section="lagrange-verify" questions={LAGRANGE_VERIFY_QUIZ} />',
            "<QuizMcq157 />": '<GuideMcqSection id="quiz-157" badge="Practice" title="Industrial Physics Applications" scoreId="scorelagrange-industry" section="lagrange-industry" questions={LAGRANGE_INDUSTRY_QUIZ} />',
            "<QuizChallengeLagrange />": '<GuideMcqSection id="quiz-lagrange-challenge" badge="Challenge" title="Medium & Hard Practice" scoreId="scorelagrange-challenge" section="lagrange-challenge" questions={LAGRANGE_CHALLENGE_QUIZ} />',
        },
    },
    {
        "file": "src/pages/DivergenceAndCurlGuide.jsx",
        "module": "../data/mvDivCurlQuizzes",
        "exports": [
            "FIELD_CONCEPT_QUIZ", "DIV_FORMULA_QUIZ", "CURL_CORE_QUIZ", "VECTOR_CATALOG_QUIZ",
            "VECTOR_IDENTITY_QUIZ", "DIV_THEOREM_QUIZ", "STOKES_THEOREM_QUIZ", "DIVCURL_CHALLENGE_QUIZ",
        ],
        "remove_fns": [
            "QuizMcq161", "QuizMcq162", "QuizMcq163", "QuizMcq164",
            "QuizMcq165", "QuizMcq166", "QuizMcq167", "QuizChallengeDivCurl",
        ],
        "call_reps": {
            "<QuizMcq161 />": '<GuideMcqSection id="quiz-161" badge="Practice" title="Vector Field Concepts" scoreId="scorefield-concept" section="field-concept" questions={FIELD_CONCEPT_QUIZ} />',
            "<QuizMcq162 />": '<GuideMcqSection id="quiz-162" badge="Practice" title="Divergence Formula" scoreId="scorediv-formula" section="div-formula" questions={DIV_FORMULA_QUIZ} />',
            "<QuizMcq163 />": '<GuideMcqSection id="quiz-163" badge="Practice" title="Curl Core" scoreId="scorecurl-core" section="curl-core" questions={CURL_CORE_QUIZ} />',
            "<QuizMcq164 />": '<GuideMcqSection id="quiz-164" badge="Practice" title="Vector Catalog" scoreId="scorevector-catalog" section="vector-catalog" questions={VECTOR_CATALOG_QUIZ} />',
            "<QuizMcq165 />": '<GuideMcqSection id="quiz-165" badge="Practice" title="Vector Identities" scoreId="scorevector-identity" section="vector-identity" questions={VECTOR_IDENTITY_QUIZ} />',
            "<QuizMcq166 />": '<GuideMcqSection id="quiz-166" badge="Practice" title="Divergence Theorem" scoreId="scorediv-theorem" section="div-theorem" questions={DIV_THEOREM_QUIZ} />',
            "<QuizMcq167 />": '<GuideMcqSection id="quiz-167" badge="Practice" title="Stokes Framework" scoreId="scorestokes-theorem" section="stokes-theorem" questions={STOKES_THEOREM_QUIZ} />',
            "<QuizChallengeDivCurl />": '<GuideMcqSection id="quiz-divcurl-challenge" badge="Challenge" title="Mixed Challenge" scoreId="scoredivcurl-challenge" section="divcurl-challenge" questions={DIVCURL_CHALLENGE_QUIZ} />',
        },
    },
    {
        "file": "src/pages/TaylorSeriesGuide.jsx",
        "module": "../data/mvTaylorQuizzes",
        "exports": [
            "TAYLOR_CONCEPT_QUIZ", "TAYLOR_FORMULA_QUIZ", "MACLAURIN_CORE_QUIZ", "TAYLOR_CATALOG_QUIZ",
            "TAYLOR_CONVERGENCE_QUIZ", "TAYLOR_ERROR_QUIZ", "TAYLOR_ENGINEERING_QUIZ", "TAYLOR_CHALLENGE_QUIZ",
        ],
        "remove_fns": [
            "QuizMcq171", "QuizMcq172", "QuizMcq173", "QuizMcq174",
            "QuizMcq175", "QuizMcq176", "QuizMcq177", "QuizChallengeTaylor",
        ],
        "call_reps": {
            "<QuizMcq171 />": '<GuideMcqSection id="quiz-171" badge="Practice" title="Taylor Concept" scoreId="scoretaylor-concept" section="taylor-concept" questions={TAYLOR_CONCEPT_QUIZ} />',
            "<QuizMcq172 />": '<GuideMcqSection id="quiz-172" badge="Practice" title="Taylor Formula" scoreId="scoretaylor-formula" section="taylor-formula" questions={TAYLOR_FORMULA_QUIZ} />',
            "<QuizMcq173 />": '<GuideMcqSection id="quiz-173" badge="Practice" title="Maclaurin Core" scoreId="scoremaclaurin-core" section="maclaurin-core" questions={MACLAURIN_CORE_QUIZ} />',
            "<QuizMcq174 />": '<GuideMcqSection id="quiz-174" badge="Practice" title="Series Catalog" scoreId="scoretaylor-catalog" section="taylor-catalog" questions={TAYLOR_CATALOG_QUIZ} />',
            "<QuizMcq175 />": '<GuideMcqSection id="quiz-175" badge="Practice" title="Convergence" scoreId="scoretaylor-convergence" section="taylor-convergence" questions={TAYLOR_CONVERGENCE_QUIZ} />',
            "<QuizMcq176 />": '<GuideMcqSection id="quiz-176" badge="Practice" title="Error Bounds" scoreId="scoretaylor-error" section="taylor-error" questions={TAYLOR_ERROR_QUIZ} />',
            "<QuizMcq177 />": '<GuideMcqSection id="quiz-177" badge="Practice" title="Engineering Uses" scoreId="scoretaylor-engineering" section="taylor-engineering" questions={TAYLOR_ENGINEERING_QUIZ} />',
            "<QuizChallengeTaylor />": '<GuideMcqSection id="quiz-taylor-challenge" badge="Challenge" title="Mixed Challenge" scoreId="scoretaylor-challenge" section="taylor-challenge" questions={TAYLOR_CHALLENGE_QUIZ} />',
        },
    },
    {
        "file": "src/pages/StokesTheoremGuide.jsx",
        "module": "../data/mvIntegralsStokesQuizzes",
        "exports": ["MV_STOKES_F_QUIZ", "MV_STOKES_A_QUIZ"],
        "remove_fns": ["QuizPart1", "QuizPart2"],
        "call_reps": {
            "<QuizPart1 />": '<GuideMcqSection id="st-quiz1" badge="Practice" title="Stokes Foundations Quiz" scoreId="scorestokes-f" section="stokes-f" questions={MV_STOKES_F_QUIZ} />',
            "<QuizPart2 />": '<GuideMcqSection id="st-quiz2" badge="Practice" title="Stokes Applications Quiz" scoreId="scorestokes-a" section="stokes-a" questions={MV_STOKES_A_QUIZ} />',
        },
    },
]


def wire_one(cfg, dry=False):
    p = Path(cfg["file"])
    if not p.exists():
        print("missing", p)
        return
    # require data module exists
    mod = Path("src/data") / (cfg["module"].split("/")[-1] + ".js")
    # module path like ../data/foo -> src/data/foo.js
    data_name = cfg["module"].rsplit("/", 1)[-1] + ".js"
    data_path = Path("src/data") / data_name
    if not data_path.exists():
        print("SKIP (no data yet)", cfg["file"], "needs", data_path)
        return
    text = p.read_text(encoding="utf-8")
    for fn in cfg["remove_fns"]:
        text = remove_function(text, fn)
    for old, new in cfg["call_reps"].items():
        count = text.count(old)
        if count == 0:
            print("  warn missing", old, "in", cfg["file"])
        text = text.replace(old, new)
    # imports
    text = re.sub(r'import \{ GuideMcqSection \} from "[^"]+";\n', "", text)
    exports = cfg["exports"]
    esc = "|".join(re.escape(e) for e in exports)
    text = re.sub(
        rf'import \{{\n(?:  (?:{esc}),\n)+\}} from "[^"]+";\n',
        "",
        text,
    )
    imp = (
        'import { GuideMcqSection } from "../components/GuideMcq";\n'
        "import {\n  "
        + ",\n  ".join(exports)
        + f',\n}} from "{cfg["module"]}";\n'
    )
    m = re.search(r"^import .+;\n", text, re.M)
    text = text[: m.end()] + imp + text[m.end() :]
    text = text.replace("5 questions", "15 questions").replace("0 / 5", "0 / 15")
    if dry:
        print("dry", cfg["file"])
        return
    p.write_text(text, encoding="utf-8")
    print("wired", cfg["file"])


def wire_multiple_integrals(dry=False):
    data_path = Path("src/data/mvIntegralsStokesQuizzes.js")
    if not data_path.exists():
        print("SKIP MultipleIntegralsGuide (no data)")
        return
    p = Path("src/pages/MultipleIntegralsGuide.jsx")
    text = p.read_text(encoding="utf-8")
    # Remove inline quiz sections by id
    for sid in ["mi-quiz1", "mi-quiz2"]:
        text = remove_inline_section(text, sid)
    # Insert GuideMcq near previous locations — find markers from inventory headings
    # After removal, insert components before RealLife / part ends. Simpler: inject after import and
    # place components where sections were by using unique nearby comments if any.
    # Look for remaining score references or quiz links.
    if "MV_INTEGRALS_P1_QUIZ" in text:
        print("MultipleIntegrals already wired?")
        return
    # Find a spot: after part1 content before part2 switch — use href="#mi-quiz1" parent area.
    # Insert call sites next to toc anchors usage in JSX return.
    # Heuristic: replace empty leftovers — if sections removed, inject before closing of part returns.
    # Search for id="mi-quiz1" leftover or insert near 'Part 1 Quiz' heading remnants.
    marker_p1 = "Part 1 Quiz"
    marker_p2 = "Part 2 Quiz"
    # If headings still exist as h2, insert after them
    def insert_after_heading(t, heading, jsx):
        # find heading string in file
        idx = t.find(heading)
        if idx < 0:
            return t, False
        # find end of that JSX element line / section
        # insert before next <section or after current section close — simplest: replace a unique nearby comment
        return t, False

    # Simpler approach: put quizzes just before MvCertificateBoost or RealLifeUse near end of each part.
    # Read structure
    if "<QuizPart" in text or 'id="mi-quiz1"' in text:
        print("unexpected leftover quiz markup")
    text = re.sub(r'import \{ GuideMcqSection \} from "[^"]+";\n', "", text)
    text = re.sub(
        r'import \{\n  MV_INTEGRALS_P1_QUIZ,\n  MV_INTEGRALS_P2_QUIZ,\n\} from "[^"]+";\n',
        "",
        text,
    )
    imp = (
        'import { GuideMcqSection } from "../components/GuideMcq";\n'
        "import {\n"
        "  MV_INTEGRALS_P1_QUIZ,\n"
        "  MV_INTEGRALS_P2_QUIZ,\n"
        '} from "../data/mvIntegralsStokesQuizzes";\n'
    )
    m = re.search(r"^import .+;\n", text, re.M)
    text = text[: m.end()] + imp + text[m.end() :]

    q1 = (
        '<GuideMcqSection id="mi-quiz1" badge="Practice" title="Multiple Integrals Part 1 Quiz" '
        'scoreId="scoreintegrals-p1" section="integrals-p1" questions={MV_INTEGRALS_P1_QUIZ} />'
    )
    q2 = (
        '<GuideMcqSection id="mi-quiz2" badge="Practice" title="Multiple Integrals Part 2 Quiz" '
        'scoreId="scoreintegrals-p2" section="integrals-p2" questions={MV_INTEGRALS_P2_QUIZ} />'
    )
    # Insert before certificate boost or at end of main for each part
    # Prefer replacing empty lines where sections were — use RealLifeUse near quizzes historically.
    # From inventory, quizzes are near end of parts. Insert before MvCertificateBoost occurrences.
    parts = text.split("<MvCertificateBoost")
    if len(parts) >= 2:
        # first occurrence ~ part1 or part2; insert q before each? Risky.
        pass
    # Fallback: append before last </main> in file for each occurrence of scoreintegrals — 
    # Insert q1 after first </nav> block's following main content marker "Part 1" quiz toc
    if "questions={MV_INTEGRALS_P1_QUIZ}" not in text:
        # place q1 before first MvCertificateBoost if present else before first </main>
        if "<MvCertificateBoost" in text:
            text = text.replace("<MvCertificateBoost", q1 + "\n          <MvCertificateBoost", 1)
            # second boost gets q2
            idx = text.find("<MvCertificateBoost", text.find("<MvCertificateBoost") + 1)
            if idx > 0:
                text = text[:idx] + q2 + "\n          " + text[idx:]
            else:
                # only one boost — put q2 near second part
                text = text.replace("</main>", q2 + "\n      </main>", 1)
        else:
            # insert before each </main>
            mains = list(re.finditer(r"</main>", text))
            if len(mains) >= 2:
                # second from end etc — insert from end to keep indices
                i2 = mains[1].start() if len(mains) > 1 else mains[0].start()
                i1 = mains[0].start()
                # if part===2 comes first in file, order may be part2 then part1
                text = text[: i2] + q2 + "\n      " + text[i2:]
                # recompute i1
                mains = list(re.finditer(r"</main>", text))
                text = text[: mains[0].start()] + q1 + "\n      " + text[mains[0].start() :]
            else:
                text = text.replace("</main>", q1 + "\n" + q2 + "\n      </main>", 1)

    if dry:
        print("dry MultipleIntegrals")
        return
    p.write_text(text, encoding="utf-8")
    print("wired MultipleIntegralsGuide.jsx")


if __name__ == "__main__":
    import sys
    dry = "--dry" in sys.argv
    for cfg in CONFIGS:
        wire_one(cfg, dry=dry)
    wire_multiple_integrals(dry=dry)
