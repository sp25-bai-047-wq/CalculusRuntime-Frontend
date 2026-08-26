# -*- coding: utf-8 -*-
"""Wire LA/PS guides to external quiz banks via LaMcqSection questions={CONST}."""
from __future__ import annotations
import re
from pathlib import Path

MAPPINGS = {
    "src/pages/linearAlgebra/VectorsGuide.jsx": {
        "module": "../../data/laVectorsMatricesQuizzes",
        "exports": ["LA_V_INTRO_QUIZ", "LA_V_OPS_QUIZ", "LA_V_SPAN_QUIZ", "LA_V_INDEP_QUIZ"],
        "section_to_export": {
            "la-v-intro": "LA_V_INTRO_QUIZ",
            "la-v-ops": "LA_V_OPS_QUIZ",
            "la-v-span": "LA_V_SPAN_QUIZ",
            "la-v-indep": "LA_V_INDEP_QUIZ",
        },
    },
    "src/pages/linearAlgebra/MatricesGuide.jsx": {
        "module": "../../data/laVectorsMatricesQuizzes",
        "exports": ["LA_M_INTRO_QUIZ", "LA_M_OPS_QUIZ", "LA_M_DET_QUIZ", "LA_M_INV_QUIZ"],
        "section_to_export": {
            "la-m-intro": "LA_M_INTRO_QUIZ",
            "la-m-ops": "LA_M_OPS_QUIZ",
            "la-m-det": "LA_M_DET_QUIZ",
            "la-m-inv": "LA_M_INV_QUIZ",
        },
    },
    "src/pages/linearAlgebra/SystemsGuide.jsx": {
        "module": "../../data/laSystemsEigenQuizzes",
        "exports": ["LA_S_INTRO_QUIZ", "LA_S_GAUSS_QUIZ", "LA_S_RANK_QUIZ", "LA_S_GEO_QUIZ"],
        "section_to_export": {
            "la-s-intro": "LA_S_INTRO_QUIZ",
            "la-s-gauss": "LA_S_GAUSS_QUIZ",
            "la-s-rank": "LA_S_RANK_QUIZ",
            "la-s-geo": "LA_S_GEO_QUIZ",
        },
    },
    "src/pages/linearAlgebra/EigenGuide.jsx": {
        "module": "../../data/laSystemsEigenQuizzes",
        "exports": ["LA_E_INTRO_QUIZ", "LA_E_CHAR_QUIZ", "LA_E_DIAG_QUIZ", "LA_E_APPS_QUIZ"],
        "section_to_export": {
            "la-e-intro": "LA_E_INTRO_QUIZ",
            "la-e-char": "LA_E_CHAR_QUIZ",
            "la-e-diag": "LA_E_DIAG_QUIZ",
            "la-e-apps": "LA_E_APPS_QUIZ",
        },
    },
    "src/pages/probabilityStatistics/ProbabilityBasicsGuide.jsx": {
        "module": "../../data/psProbRvQuizzes",
        "exports": ["PS_B_INTRO_QUIZ", "PS_B_COMBO_QUIZ", "PS_B_COND_QUIZ", "PS_B_BAYES_QUIZ"],
        "section_to_export": {
            "ps-b-intro": "PS_B_INTRO_QUIZ",
            "ps-b-combo": "PS_B_COMBO_QUIZ",
            "ps-b-cond": "PS_B_COND_QUIZ",
            "ps-b-bayes": "PS_B_BAYES_QUIZ",
        },
    },
    "src/pages/probabilityStatistics/RandomVariablesGuide.jsx": {
        "module": "../../data/psProbRvQuizzes",
        "exports": ["PS_RV_INTRO_QUIZ", "PS_RV_MOMENTS_QUIZ", "PS_RV_CONT_QUIZ", "PS_RV_NAMED_QUIZ"],
        "section_to_export": {
            "ps-rv-intro": "PS_RV_INTRO_QUIZ",
            "ps-rv-moments": "PS_RV_MOMENTS_QUIZ",
            "ps-rv-cont": "PS_RV_CONT_QUIZ",
            "ps-rv-named": "PS_RV_NAMED_QUIZ",
        },
    },
    "src/pages/probabilityStatistics/DescriptiveStatsGuide.jsx": {
        "module": "../../data/psStatsQuizzes",
        "exports": ["PS_D_CENTER_QUIZ", "PS_D_QUANT_QUIZ", "PS_D_SPREAD_QUIZ", "PS_D_PLOTS_QUIZ"],
        "section_to_export": {
            "ps-d-center": "PS_D_CENTER_QUIZ",
            "ps-d-quant": "PS_D_QUANT_QUIZ",
            "ps-d-spread": "PS_D_SPREAD_QUIZ",
            "ps-d-plots": "PS_D_PLOTS_QUIZ",
        },
    },
    "src/pages/probabilityStatistics/HypothesisTestingGuide.jsx": {
        "module": "../../data/psStatsQuizzes",
        "exports": ["PS_H_FRAMEWORK_QUIZ", "PS_H_TESTS_QUIZ", "PS_H_PVAL_QUIZ", "PS_H_ERRORS_QUIZ"],
        "section_to_export": {
            "ps-h-framework": "PS_H_FRAMEWORK_QUIZ",
            "ps-h-tests": "PS_H_TESTS_QUIZ",
            "ps-h-pval": "PS_H_PVAL_QUIZ",
            "ps-h-errors": "PS_H_ERRORS_QUIZ",
        },
    },
    "src/pages/probabilityStatistics/RegressionGuide.jsx": {
        "module": "../../data/psStatsQuizzes",
        "exports": ["PS_R_CORR_QUIZ", "PS_R_ASSOC_QUIZ", "PS_R_FIT_QUIZ", "PS_R_RESID_QUIZ"],
        "section_to_export": {
            "ps-r-corr": "PS_R_CORR_QUIZ",
            "ps-r-assoc": "PS_R_ASSOC_QUIZ",
            "ps-r-fit": "PS_R_FIT_QUIZ",
            "ps-r-resid": "PS_R_RESID_QUIZ",
        },
    },
}


def replace_questions_array(text: str, section: str, export: str) -> str:
    pat = re.compile(
        rf'(<LaMcqSection\b[\s\S]*?section="{re.escape(section)}"[\s\S]*?questions=\{{)\s*\[[\s\S]*?\]\s*(\}})'
    )
    m = pat.search(text)
    if not m:
        raise RuntimeError(f"Could not find LaMcqSection section={section}")
    return text[: m.start(1)] + m.group(1) + export + text[m.end(2) - 1 :]


def ensure_import(text: str, module: str, exports: list[str]) -> str:
    text2 = re.sub(
        rf'import\s*\{{[^}}]*\}}\s*from\s*"{re.escape(module)}";\s*\n?',
        "",
        text,
    )
    imp = "import {\n  " + ",\n  ".join(exports) + f',\n}} from "{module}";\n'
    m = re.search(r'import \{ LaMcqSection \} from "[^"]+";\n', text2)
    if m:
        return text2[: m.end()] + imp + text2[m.end() :]
    m2 = re.search(r"^import .+;\n", text2, re.M)
    if m2:
        return text2[: m2.end()] + imp + text2[m2.end() :]
    return imp + text2


def process(path: str, cfg: dict):
    p = Path(path)
    if not p.exists():
        print("MISSING", path)
        return
    text = p.read_text(encoding="utf-8")
    for section, export in cfg["section_to_export"].items():
        text = replace_questions_array(text, section, export)
    text = ensure_import(text, cfg["module"], cfg["exports"])
    text = text.replace("5 questions", "15 questions")
    p.write_text(text, encoding="utf-8")
    print("updated", path)


if __name__ == "__main__":
    for path, cfg in MAPPINGS.items():
        try:
            process(path, cfg)
        except Exception as e:
            print("ERROR", path, e)
