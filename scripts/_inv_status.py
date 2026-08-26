# -*- coding: utf-8 -*-
"""Report quiz blocks still under 15 and bank completeness."""
import re
import collections
from pathlib import Path

SRC = Path("src")
rows = []

# JSX cards
for p in SRC.rglob("*.jsx"):
    text = p.read_text(encoding="utf-8")
    cards = re.findall(
        r'data-section="([^"]+)"\s+data-q="([^"]+)"\s+data-answer="([^"]+)"', text
    )
    if cards:
        counts = collections.OrderedDict()
        for sec, q, a in cards:
            counts.setdefault(sec, []).append(a)
        for sec, answers in counts.items():
            rows.append(("jsx-card", str(p), sec, len(answers), "".join(answers)))

# LaMcq inline
for p in SRC.rglob("*.jsx"):
    text = p.read_text(encoding="utf-8")
    for m in re.finditer(r"<LaMcqSection\b", text):
        start = m.start()
        tail = text[start : start + 500]
        sec = re.search(r'section="([^"]+)"', tail)
        # questions={CONST} or questions={[
        const = re.search(r"questions=\{([A-Z0-9_]+)\}", tail)
        if const:
            rows.append(
                (
                    "la-ref",
                    str(p),
                    sec.group(1) if sec else "?",
                    -1,
                    const.group(1),
                )
            )
            continue
        qidx = text.find("questions={[", start)
        if qidx < 0 or qidx > start + 800:
            continue
        i = text.index("[", qidx)
        depth = 0
        j = i
        while True:
            if text[j] == "[":
                depth += 1
            elif text[j] == "]":
                depth -= 1
                if depth == 0:
                    break
            j += 1
        body = text[i : j + 1]
        answers = re.findall(r'answer:\s*"([^"]+)"', body)
        rows.append(
            (
                "la-inline",
                str(p),
                sec.group(1) if sec else "?",
                len(answers),
                "".join(answers),
            )
        )

# GuideMcq
for p in SRC.rglob("*.jsx"):
    text = p.read_text(encoding="utf-8")
    for m in re.finditer(r"<GuideMcqSection\b", text):
        start = m.start()
        tail = text[start : start + 500]
        sec = re.search(r'section="([^"]+)"', tail)
        const = re.search(r"questions=\{([A-Z0-9_]+)\}", tail)
        if const:
            rows.append(
                (
                    "guide-ref",
                    str(p),
                    sec.group(1) if sec else "?",
                    -1,
                    const.group(1),
                )
            )

# Data banks
bank_map = {}
for fn in sorted((SRC / "data").glob("*.js")):
    if "PracticeBank" in fn.name:
        continue
    text = fn.read_text(encoding="utf-8")
    for m in re.finditer(r"export const (\w+)\s*=\s*\[", text):
        name = m.group(1)
        i = text.index("[", m.start())
        depth = 0
        j = i
        while True:
            if text[j] == "[":
                depth += 1
            elif text[j] == "]":
                depth -= 1
                if depth == 0:
                    break
            j += 1
        body = text[i : j + 1]
        answers = re.findall(r'answer:\s*"([^"]+)"', body)
        if answers:
            bank_map[name] = (str(fn), len(answers), "".join(answers))
            rows.append(("data", str(fn), name, len(answers), "".join(answers)))

print("=== UNDER 15 (inline/jsx/data) ===")
under = [r for r in rows if r[0] in ("jsx-card", "la-inline", "data") and r[3] < 15]
for r in under:
    print(f"{r[0]:10} {r[3]:3}  {r[2]:28} {r[4][:30]:30} {r[1]}")
print(f"under_count={len(under)}")

print("\n=== REFS (wired to consts) ===")
refs = [r for r in rows if r[0] in ("la-ref", "guide-ref")]
for r in refs:
    n = bank_map.get(r[4], (None, "MISSING", ""))[1]
    flag = "OK" if n == 15 else f"BAD:{n}"
    print(f"{r[0]:10} {flag:10} {r[2]:24} -> {r[4]}  {r[1]}")
print(f"refs={len(refs)}")

print("\n=== ALL DATA BANKS ===")
for name, (path, n, ans) in sorted(bank_map.items()):
    flag = "OK" if n == 15 else "SHORT"
    print(f"{flag:5} {n:3} {name:28} {path}")

missing_files = [
    "src/data/laSystemsEigenQuizzes.js",
    "src/data/psStatsQuizzes.js",
    "src/data/mvDivCurlQuizzes.js",
    "src/data/mvLagrangeQuizzes.js",
    "src/data/mvIntegralsQuizzes.js",
    "src/data/mvStokesQuizzes.js",
    "src/data/mvTaylorQuizzes.js",
]
print("\n=== EXPECTED FILES ===")
for f in missing_files:
    print(f"{'EXISTS' if Path(f).exists() else 'MISSING'}: {f}")

print(f"\nTOTAL ROW KINDS: {collections.Counter(r[0] for r in rows)}")
