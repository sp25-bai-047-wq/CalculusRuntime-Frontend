# -*- coding: utf-8 -*-
"""Replace inline QuizMcq*/QuizPart* JSX blocks with GuideMcqSection wired to data banks."""
from __future__ import annotations
import re
from pathlib import Path

# guide -> list of (fn_name, id, badge, title, scoreId, section, export)
# and import module + exports

GUIDES = {
    "src/pages/PartialDerivativesGuide.jsx": {
        "import_from": "../data/mvPartialQuizzes",
        "component_import": 'import { GuideMcqSection } from "../components/GuideMcq";\n',
        "quizzes": [
            ("QuizMcq141", "mcq141", "Practice", "Functions of Several Variables — Quiz", "score141", "141", "MV_141_QUIZ"),
            ("QuizMcq142", "mcq142", "Practice", "Limits and Continuity — Quiz", "score142", "142", "MV_142_QUIZ"),
            ("QuizMcq143", "mcq143", "Practice", "Partial Derivatives — Quiz", "score143", "143", "MV_143_QUIZ"),
            ("QuizMcq144", "mcq144", "Practice", "The Chain Rule — Quiz", "score144", "144", "MV_144_QUIZ"),
            ("QuizMcq145", "mcq145", "Practice", "Directional Derivatives & Gradient — Quiz", "score145", "145", "MV_145_QUIZ"),
            ("QuizMcq146", "mcq146", "Practice", "Tangent Planes & Differentials — Quiz", "score146", "146", "MV_146_QUIZ"),
            ("QuizMcq147", "mcq147", "Practice", "Extreme Values — Quiz", "score147", "147", "MV_147_QUIZ"),
        ],
    },
    "src/pages/MultipleIntegralsGuide.jsx": {
        "import_from": "../data/mvIntegralsStokesQuizzes",
        "component_import": 'import { GuideMcqSection } from "../components/GuideMcq";\n',
        "inline_sections": [
            # MultipleIntegrals may use inline section not named function — handled separately
        ],
        "quizzes": [],
        "section_replacements": [
            {
                "section": "integrals-p1",
                "id": "mi-quiz1",
                "badge": "Practice",
                "title": "Part 1 Quiz",
                "scoreId": "score-mi1",
                "export": "MV_INTEGRALS_P1_QUIZ",
            },
            {
                "section": "integrals-p2",
                "id": "mi-quiz2",
                "badge": "Practice",
                "title": "Part 2 Quiz",
                "scoreId": "score-mi2",
                "export": "MV_INTEGRALS_P2_QUIZ",
            },
        ],
    },
    "src/pages/StokesTheoremGuide.jsx": {
        "import_from": "../data/mvIntegralsStokesQuizzes",
        "component_import": 'import { GuideMcqSection } from "../components/GuideMcq";\n',
        "quizzes": [
            ("QuizPart1", "stokes-quiz-1", "Practice", "Stokes Fundamentals Quiz", "score-stokes-f", "stokes-f", "MV_STOKES_F_QUIZ"),
            ("QuizPart2", "stokes-quiz-2", "Practice", "Stokes Applications Quiz", "score-stokes-a", "stokes-a", "MV_STOKES_A_QUIZ"),
        ],
    },
    "src/pages/LagrangeMultipliersGuide.jsx": {
        "import_from": "../data/mvLagrangeQuizzes",
        "component_import": 'import { GuideMcqSection } from "../components/GuideMcq";\n',
        "quizzes": [
            ("QuizMcq151", "quiz-lagrange-geometry", "Practice", "Geometry Quiz", "score-lagrange-geometry", "lagrange-geometry", "LAGRANGE_GEOMETRY_QUIZ"),
            ("QuizMcq152", "quiz-lagrange-math", "Practice", "Math Structure Quiz", "score-lagrange-math", "lagrange-math", "LAGRANGE_MATH_QUIZ"),
            ("QuizMcq153", "quiz-lagrange-fields", "Practice", "Fields & Constraints Quiz", "score-lagrange-fields", "lagrange-fields", "LAGRANGE_FIELDS_QUIZ"),
            ("QuizMcq154", "quiz-lagrange-calc", "Practice", "Calculation Quiz", "score-lagrange-calc", "lagrange-calc", "LAGRANGE_CALC_QUIZ"),
            ("QuizMcq155", "quiz-lagrange-multi", "Practice", "Multiple Constraints Quiz", "score-lagrange-multi", "lagrange-multi", "LAGRANGE_MULTI_QUIZ"),
            ("QuizMcq156", "quiz-lagrange-verify", "Practice", "Verification Quiz", "score-lagrange-verify", "lagrange-verify", "LAGRANGE_VERIFY_QUIZ"),
            ("QuizMcq157", "quiz-lagrange-industry", "Practice", "Applications Quiz", "score-lagrange-industry", "lagrange-industry", "LAGRANGE_INDUSTRY_QUIZ"),
        ],
        # challenge quiz may be QuizMcq158
    },
    "src/pages/DivergenceAndCurlGuide.jsx": {
        "import_from": "../data/mvDivCurlQuizzes",
        "component_import": 'import { GuideMcqSection } from "../components/GuideMcq";\n',
        "quizzes": [
            ("QuizMcq161", "quiz-field-concept", "Practice", "Vector Fields Quiz", "score-field-concept", "field-concept", "FIELD_CONCEPT_QUIZ"),
            ("QuizMcq162", "quiz-div-formula", "Practice", "Divergence Quiz", "score-div-formula", "div-formula", "DIV_FORMULA_QUIZ"),
            ("QuizMcq163", "quiz-curl-core", "Practice", "Curl Quiz", "score-curl-core", "curl-core", "CURL_CORE_QUIZ"),
            ("QuizMcq164", "quiz-vector-catalog", "Practice", "Catalog Quiz", "score-vector-catalog", "vector-catalog", "VECTOR_CATALOG_QUIZ"),
            ("QuizMcq165", "quiz-vector-identity", "Practice", "Identities Quiz", "score-vector-identity", "vector-identity", "VECTOR_IDENTITY_QUIZ"),
            ("QuizMcq166", "quiz-div-theorem", "Practice", "Divergence Theorem Quiz", "score-div-theorem", "div-theorem", "DIV_THEOREM_QUIZ"),
            ("QuizMcq167", "quiz-stokes-theorem", "Practice", "Stokes Framework Quiz", "score-stokes-theorem", "stokes-theorem", "STOKES_THEOREM_QUIZ"),
        ],
    },
    "src/pages/TaylorSeriesGuide.jsx": {
        "import_from": "../data/mvTaylorQuizzes",
        "component_import": 'import { GuideMcqSection } from "../components/GuideMcq";\n',
        "quizzes": [
            ("QuizMcq171", "quiz-171", "Quiz Section 17.1", "Approximation Space Assessments", "score-taylor-concept", "taylor-concept", "TAYLOR_CONCEPT_QUIZ"),
            ("QuizMcq172", "quiz-172", "Quiz Section 17.2", "Formula Structure Verifications", "score-taylor-formula", "taylor-formula", "TAYLOR_FORMULA_QUIZ"),
            ("QuizMcq173", "quiz-173", "Quiz Section 17.3", "Maclaurin Reduction Drills", "score-maclaurin-core", "maclaurin-core", "MACLAURIN_CORE_QUIZ"),
            ("QuizMcq174", "quiz-174", "Quiz Section 17.4", "Catalog Manipulation Drills", "score-taylor-catalog", "taylor-catalog", "TAYLOR_CATALOG_QUIZ"),
            ("QuizMcq175", "quiz-175", "Quiz Section 17.5", "Convergence Assessments", "score-taylor-convergence", "taylor-convergence", "TAYLOR_CONVERGENCE_QUIZ"),
            ("QuizMcq176", "quiz-176", "Quiz Section 17.6", "Error Bound Drills", "score-taylor-error", "taylor-error", "TAYLOR_ERROR_QUIZ"),
            ("QuizMcq177", "quiz-177", "Quiz Section 17.7", "Engineering Applications", "score-taylor-engineering", "taylor-engineering", "TAYLOR_ENGINEERING_QUIZ"),
        ],
    },
}


def thin_quiz_fn(fn, id_, badge, title, score_id, section, export):
    return (
        f"function {fn}() {{\n"
        f"  return (\n"
        f"    <GuideMcqSection\n"
        f'      id="{id_}"\n'
        f'      badge="{badge}"\n'
        f'      title="{title}"\n'
        f'      scoreId="{score_id}"\n'
        f'      section="{section}"\n'
        f"      questions={{{export}}}\n"
        f"    />\n"
        f"  );\n"
        f"}}\n"
    )


def replace_function(text: str, fn: str, replacement: str) -> str:
    # Match function Name() { ... } with brace counting
    start = re.search(rf"function {re.escape(fn)}\s*\(\s*\)\s*\{{", text)
    if not start:
        raise RuntimeError(f"function {fn} not found")
    i = start.end() - 1  # at '{'
    depth = 0
    for j in range(i, len(text)):
        if text[j] == "{":
            depth += 1
        elif text[j] == "}":
            depth -= 1
            if depth == 0:
                # include trailing newline if present
                end = j + 1
                if end < len(text) and text[end] == "\n":
                    end += 1
                return text[: start.start()] + replacement + text[end:]
    raise RuntimeError(f"unclosed function {fn}")


def replace_mcq_section_by_data_section(text: str, meta: dict, export: str) -> str:
    """Replace <section className=\"mcq-section\" ...> ... </section> containing data-section=meta."""
    section = meta["section"]
    # Find a card with this data-section, then expand to surrounding mcq-section
    card = re.search(rf'<div className="mcq-card" data-section="{re.escape(section)}"', text)
    if not card:
        raise RuntimeError(f"no mcq-card for section={section}")
    # walk back to <section className="mcq-section"
    before = text.rfind('<section className="mcq-section"', 0, card.start())
    if before < 0:
        raise RuntimeError(f"no mcq-section before {section}")
    # find matching closing </section> with depth
    i = before
    # find first '>' of opening tag
    open_end = text.find(">", i)
    depth = 1
    k = open_end + 1
    while k < len(text) and depth > 0:
        next_open = text.find("<section", k)
        next_close = text.find("</section>", k)
        if next_close < 0:
            raise RuntimeError("no closing section")
        if next_open >= 0 and next_open < next_close:
            depth += 1
            k = next_open + 8
        else:
            depth -= 1
            k = next_close + len("</section>")
    end = k
    if end < len(text) and text[end] == "\n":
        end += 1
    replacement = (
        f'<GuideMcqSection\n'
        f'        id="{meta["id"]}"\n'
        f'        badge="{meta["badge"]}"\n'
        f'        title="{meta["title"]}"\n'
        f'        scoreId="{meta["scoreId"]}"\n'
        f'        section="{meta["section"]}"\n'
        f'        questions={{{export}}}\n'
        f'      />\n'
    )
    return text[:before] + replacement + text[end:]


def ensure_imports(text: str, component_import: str, module: str, exports: list[str]) -> str:
    if "GuideMcqSection" not in text:
        # after first import
        m = re.search(r"^import .+;\n", text, re.M)
        if m:
            text = text[: m.end()] + component_import + text[m.end() :]
        else:
            text = component_import + text
    # data imports
    text = re.sub(
        rf'import\s*\{{[^}}]*\}}\s*from\s*"{re.escape(module)}";\s*\n?',
        "",
        text,
    )
    imp = "import {\n  " + ",\n  ".join(exports) + f',\n}} from "{module}";\n'
    # insert after GuideMcq import if present
    m = re.search(r'import \{ GuideMcqSection \} from "[^"]+";\n', text)
    if m:
        text = text[: m.end()] + imp + text[m.end() :]
    else:
        m2 = re.search(r"^import .+;\n", text, re.M)
        if m2:
            text = text[: m2.end()] + imp + text[m2.end() :]
        else:
            text = imp + text
    return text


def process_guide(path: str, cfg: dict):
    p = Path(path)
    text = p.read_text(encoding="utf-8")
    exports = []

    # Discover challenge quiz functions if present
    quizzes = list(cfg.get("quizzes") or [])
    if path.endswith("LagrangeMultipliersGuide.jsx"):
        if "function QuizMcq158" in text or re.search(r'data-section="lagrange-challenge"', text):
            # try find function for challenge
            if "function QuizMcq158" in text:
                quizzes.append(
                    ("QuizMcq158", "quiz-lagrange-challenge", "Practice", "Challenge Quiz",
                     "score-lagrange-challenge", "lagrange-challenge", "LAGRANGE_CHALLENGE_QUIZ")
                )
            else:
                # may be inside another function — use section replacement later
                pass
    if path.endswith("DivergenceAndCurlGuide.jsx"):
        if "function QuizMcq168" in text or re.search(r'data-section="divcurl-challenge"', text):
            if "function QuizMcq168" in text:
                quizzes.append(
                    ("QuizMcq168", "quiz-divcurl-challenge", "Practice", "Challenge Quiz",
                     "score-divcurl-challenge", "divcurl-challenge", "DIVCURL_CHALLENGE_QUIZ")
                )
    if path.endswith("TaylorSeriesGuide.jsx"):
        if "function QuizMcq178" in text or re.search(r'data-section="taylor-challenge"', text):
            if "function QuizMcq178" in text:
                quizzes.append(
                    ("QuizMcq178", "quiz-178", "Quiz Challenge", "Challenge Assessments",
                     "score-taylor-challenge", "taylor-challenge", "TAYLOR_CHALLENGE_QUIZ")
                )

    for fn, id_, badge, title, score_id, section, export in quizzes:
        text = replace_function(text, fn, thin_quiz_fn(fn, id_, badge, title, score_id, section, export))
        exports.append(export)

    for meta in cfg.get("section_replacements") or []:
        text = replace_mcq_section_by_data_section(text, meta, meta["export"])
        exports.append(meta["export"])

    # Handle remaining data-section blocks for challenge quizzes without dedicated fn
    remaining = {
        "lagrange-challenge": ("quiz-lagrange-challenge", "Practice", "Challenge Quiz", "score-lagrange-challenge", "LAGRANGE_CHALLENGE_QUIZ"),
        "divcurl-challenge": ("quiz-divcurl-challenge", "Practice", "Challenge Quiz", "score-divcurl-challenge", "DIVCURL_CHALLENGE_QUIZ"),
        "taylor-challenge": ("quiz-taylor-challenge", "Quiz Challenge", "Challenge Assessments", "score-taylor-challenge", "TAYLOR_CHALLENGE_QUIZ"),
    }
    for section, (id_, badge, title, score_id, export) in remaining.items():
        if export in exports:
            continue
        if f'data-section="{section}"' in text:
            meta = {"section": section, "id": id_, "badge": badge, "title": title, "scoreId": score_id}
            text = replace_mcq_section_by_data_section(text, meta, export)
            exports.append(export)

    exports = list(dict.fromkeys(exports))
    text = ensure_imports(text, cfg["component_import"], cfg["import_from"], exports)
    text = text.replace("0 / 5", "0 / 15")
    text = text.replace("5 questions", "15 questions")
    p.write_text(text, encoding="utf-8")
    print(f"updated {path} ({len(exports)} banks: {', '.join(exports)})")


if __name__ == "__main__":
    for path, cfg in GUIDES.items():
        try:
            process_guide(path, cfg)
        except Exception as e:
            print(f"ERROR {path}: {e}")
            import traceback
            traceback.print_exc()
