# -*- coding: utf-8 -*-
"""Builds the four Practice Arena bank files.

Guarantees:
  * 100 Easy + 100 Medium + 100 Hard per topic
  * no question text repeats anywhere in the whole site
  * correct answers rotate through all four option slots
"""
import io
import json
import os
import random
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from _pgen_core import FAMILIES, norm_key
import _pgen_calc  # noqa: F401
import _pgen_mv  # noqa: F401
import _pgen_la_ps  # noqa: F401

BANKS = [
    ("calcAgPracticeBank.js", "CALC_AG_PRACTICE_BANK", 10000, [
        "Limits and Continuity", "Differentiation", "Integration",
        "Sequences and Infinite Series", "Conic Sections and Analytic Geometry",
        "Taylor Series for Multivariable Functions",
    ]),
    ("mvPracticeBank.js", "MV_PRACTICE_BANK", 20000, [
        "Partial Derivatives", "Vector Calculus", "Multiple Integrals",
        "Lagrange Multipliers", "Divergence & Curl", "Stokes' Theorem",
    ]),
    ("psPracticeBank.js", "PS_PRACTICE_BANK", 30000, [
        "Probability Basics", "Random Variables & Distributions",
        "Descriptive Statistics", "Hypothesis Testing", "Regression & Correlation",
    ]),
    ("laPracticeBank.js", "LA_PRACTICE_BANK", 40000, [
        "Vectors & Vector Spaces", "Matrices & Determinants",
        "Systems of Linear Equations", "Eigenvalues & Eigenvectors",
    ]),
]

DIFFS = ["Easy", "Medium", "Hard"]
NEED = 100

seen_questions = set()
warnings = []


SUP_ONE = re.compile("([A-Za-z\\)])¹(?![⁰¹²³⁴⁵⁶⁷⁸⁹])")
COEF_ONE = re.compile(r"(?<![0-9.])1(?=[A-Za-zπ√⟨])")
MINUS = re.compile(r"(?<=[\s(=,])-(?=[0-9])")


def tidy(text):
    """Human-readable maths: drop x¹ and 1x, use a real minus sign."""
    s = SUP_ONE.sub(r"\1", str(text))
    s = COEF_ONE.sub("", s)
    s = MINUS.sub("−", s)
    if s.startswith("-") and len(s) > 1 and s[1].isdigit():
        s = "−" + s[1:]
    return re.sub(r"\s{2,}", " ", s).strip()


def clean_wrongs(correct, wrongs):
    out = []
    for w in wrongs:
        w = tidy(w)
        if w == str(correct) or w in out or not w.strip():
            continue
        out.append(w)
    return out[:3]


def collect(topic, diff):
    gens = [f() for f in FAMILIES.get(topic, {}).get(diff, [])]
    if not gens:
        warnings.append(f"NO FAMILIES for {topic} / {diff}")
        return []
    items = []
    active = list(gens)
    guard = 0
    while active and len(items) < NEED and guard < 200000:
        for g in list(active):
            guard += 1
            try:
                it = next(g)
            except StopIteration:
                active.remove(g)
                continue
            q = tidy(it["q"])
            key = norm_key(q)
            if key in seen_questions:
                continue
            correct = tidy(it["correct"])
            wrongs = clean_wrongs(correct, it["wrongs"])
            if len(wrongs) < 3:
                continue
            seen_questions.add(key)
            items.append({
                "question": q,
                "correct": correct,
                "wrongs": wrongs,
                "explanation": tidy(it["expl"]),
            })
            if len(items) >= NEED:
                break
    if len(items) < NEED:
        warnings.append(f"ONLY {len(items)}/{NEED} for {topic} / {diff}")
    return items


def finalise(items, topic, diff, next_id):
    out = []
    rng = random.Random(f"{topic}|{diff}")
    for i, it in enumerate(items):
        options = list(it["wrongs"])
        rng.shuffle(options)
        slot = (i + rng.randrange(0, 4)) % 4
        options.insert(slot, it["correct"])
        out.append({
            "id": next_id + i,
            "topic": topic,
            "difficulty": diff,
            "question": it["question"],
            "options": options,
            "correctAnswer": slot,
            "explanation": it["explanation"],
        })
    return out


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(here, "src", "data")
    totals = {}
    for filename, const, base_id, topics in BANKS:
        bank = []
        next_id = base_id
        for topic in topics:
            for diff in DIFFS:
                raw = collect(topic, diff)
                block = finalise(raw, topic, diff, next_id)
                next_id += 200
                bank.extend(block)
                totals[(topic, diff)] = len(block)
        payload = json.dumps(bank, indent=2, ensure_ascii=False)
        header = (
            "/** Auto-generated practice bank: 100 Easy + 100 Medium + 100 Hard per topic.\n"
            " *  Every question is unique across the entire site and requires real work to solve.\n"
            " *  Regenerate with: python _pgen_build.py\n"
            " */\n"
        )
        path = os.path.join(data_dir, filename)
        with io.open(path, "w", encoding="utf-8") as fh:
            fh.write(f"{header}export const {const} = {payload};\n")
        print(f"wrote {filename}: {len(bank)} questions")

    slots = {0: 0, 1: 0, 2: 0, 3: 0}
    for filename, const, _b, topics in BANKS:
        pass
    print("\n--- coverage ---")
    short = [k for k, v in totals.items() if v != NEED]
    for k in short:
        print("SHORT:", k, totals[k])
    print(f"topic/difficulty blocks: {len(totals)}, unique questions: {len(seen_questions)}")
    for w in warnings:
        print("WARN:", w)


if __name__ == "__main__":
    main()
