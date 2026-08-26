# -*- coding: utf-8 -*-
"""Verify every guide quiz import resolves to an exported 15-question bank."""
import ast
import io
import pathlib
import re
import sys

ROOT = pathlib.Path(r"d:\OneDrive\Desktop\calculus runtime\frontend\src")

IMPORT_RE = re.compile(
    r'import\s*\{([^}]+)\}\s*from\s*["\'](\.\./)+(data/[^"\']+)["\']',
    re.M,
)
EXPORT_RE = re.compile(r"^export const (\w+)\s*=", re.M)


def resolve(from_file: pathlib.Path, mod: str) -> pathlib.Path:
    # mod like data/psStatsQuizzes
    return (ROOT / mod).with_suffix(".js")


problems = []
checked = 0
for guide in list(ROOT.rglob("*Guide.jsx")) + list(ROOT.rglob("LimitsGuide.jsx")) + list(ROOT.rglob("TaylorSeriesGuide.jsx")):
    text = guide.read_text(encoding="utf-8")
    for m in IMPORT_RE.finditer(text):
        names = [n.strip() for n in m.group(1).split(",") if n.strip()]
        mod = m.group(2)  # wrong - need full path
    # re-parse properly
    for m in re.finditer(
        r'import\s*\{([^}]+)\}\s*from\s*["\']((?:\.\./)+data/[^"\']+)["\']',
        text,
    ):
        names = [n.strip() for n in m.group(1).split(",") if n.strip() and "QUIZ" in n]
        if not names:
            continue
        rel = m.group(2)
        # resolve relative to guide parent
        target = (guide.parent / rel).resolve().with_suffix(".js")
        if not target.exists():
            # try .jsx
            target = target.with_suffix(".jsx")
        if not target.exists():
            problems.append(f"MISSING MODULE {target} imported by {guide.name}")
            continue
        exports = set(EXPORT_RE.findall(target.read_text(encoding="utf-8")))
        body = target.read_text(encoding="utf-8")
        for name in names:
            checked += 1
            if name not in exports:
                problems.append(f"{guide.name}: {name} not exported from {target.name}")
                continue
            # count prompts in that export block roughly
            block_m = re.search(
                rf"export const {name}\s*=\s*\[(.*?)\n\];",
                body,
                re.S,
            )
            if not block_m:
                problems.append(f"{target.name}: could not parse array for {name}")
                continue
            n = len(re.findall(r"\bprompt\s*:", block_m.group(1)))
            if n != 15:
                problems.append(f"{name} has {n} questions (want 15)")

# also flag undefined JSX identifiers commonly broken during wiring
for guide in ROOT.rglob("*.jsx"):
    t = guide.read_text(encoding="utf-8")
    for bad in ("IntegralsQuiz", "StokesQuiz", "PartialQuiz"):
        if re.search(rf"<{bad}\b", t) and f"function {bad}" not in t and f"const {bad}" not in t:
            problems.append(f"{guide.name}: uses <{bad}> but it is not defined")

out = [f"checked_exports={checked}", f"problems={len(problems)}"] + problems
path = ROOT.parent / "_fix_localhost_check.txt"
path.write_text("\n".join(out), encoding="utf-8")
print("\n".join(out[:50]))
sys.exit(1 if problems else 0)
