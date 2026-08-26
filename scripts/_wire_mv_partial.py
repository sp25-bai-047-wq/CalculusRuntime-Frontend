# -*- coding: utf-8 -*-
"""Wire MV PartialDerivativesGuide to GuideMcqSection + mvPartialQuizzes."""
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


def main():
    p = Path("src/pages/PartialDerivativesGuide.jsx")
    text = p.read_text(encoding="utf-8")
    for fn in [
        "QuizMcq141", "QuizMcq142", "QuizMcq143", "QuizMcq144",
        "QuizMcq145", "QuizMcq146", "QuizMcq147",
    ]:
        text = remove_function(text, fn)

    reps = {
        "<QuizMcq141 />": (
            '<GuideMcqSection id="mcq141" badge="Practice" title="Functions of Several Variables — Quiz" '
            'scoreId="score141" section="141" questions={MV_141_QUIZ} />'
        ),
        "<QuizMcq142 />": (
            '<GuideMcqSection id="mcq142" badge="Practice" title="Limits and Continuity — Quiz" '
            'scoreId="score142" section="142" questions={MV_142_QUIZ} />'
        ),
        "<QuizMcq143 />": (
            '<GuideMcqSection id="mcq143" badge="Practice" title="Partial Derivatives — Quiz" '
            'scoreId="score143" section="143" questions={MV_143_QUIZ} />'
        ),
        "<QuizMcq144 />": (
            '<GuideMcqSection id="mcq144" badge="Practice" title="Chain Rule — Quiz" '
            'scoreId="score144" section="144" questions={MV_144_QUIZ} />'
        ),
        "<QuizMcq145 />": (
            '<GuideMcqSection id="mcq145" badge="Practice" title="Directional Derivatives and Gradient — Quiz" '
            'scoreId="score145" section="145" questions={MV_145_QUIZ} />'
        ),
        "<QuizMcq146 />": (
            '<GuideMcqSection id="mcq146" badge="Practice" title="Tangent Planes and Differentials — Quiz" '
            'scoreId="score146" section="146" questions={MV_146_QUIZ} />'
        ),
        "<QuizMcq147 />": (
            '<GuideMcqSection id="mcq147" badge="Practice" title="Extreme Values — Quiz" '
            'scoreId="score147" section="147" questions={MV_147_QUIZ} />'
        ),
    }
    for old, new in reps.items():
        if old not in text:
            raise SystemExit(f"missing {old}")
        text = text.replace(old, new)

    # strip old imports if re-run
    text = re.sub(r'import \{ GuideMcqSection \} from "[^"]+";\n', "", text)
    text = re.sub(r'import \{\n(?:  MV_\d+_QUIZ,\n)+\} from "[^"]+";\n', "", text)

    imp = (
        'import { GuideMcqSection } from "../components/GuideMcq";\n'
        "import {\n"
        "  MV_141_QUIZ,\n"
        "  MV_142_QUIZ,\n"
        "  MV_143_QUIZ,\n"
        "  MV_144_QUIZ,\n"
        "  MV_145_QUIZ,\n"
        "  MV_146_QUIZ,\n"
        "  MV_147_QUIZ,\n"
        '} from "../data/mvPartialQuizzes";\n'
    )
    m = re.search(r"^import .+;\n", text, re.M)
    text = text[: m.end()] + imp + text[m.end() :]
    p.write_text(text, encoding="utf-8")
    print("wired", p, "lines", len(text.splitlines()))


if __name__ == "__main__":
    main()
