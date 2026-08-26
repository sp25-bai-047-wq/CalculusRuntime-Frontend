# -*- coding: utf-8 -*-
"""Inventory all wired study-guide quiz blocks in JSX + data modules."""
from __future__ import annotations
import re
from pathlib import Path

ROOT = Path("src")

# Find GuideMcqSection / LaMcqSection usages
jsx_pat = re.compile(
    r"<(?:GuideMcqSection|LaMcqSection)\b([^>]*)>",
    re.S,
)
attr = re.compile(r'(\w+)=\{?["\']?([^"\'}\s]+)["\']?\}?')

blocks = []
for path in ROOT.rglob("*.jsx"):
    text = path.read_text(encoding="utf-8")
    for m in jsx_pat.finditer(text):
        props = dict(attr.findall(m.group(1)))
        section = props.get("section", "?")
        questions = props.get("questions", "?")
        blocks.append((str(path).replace("\\", "/"), section, questions))

print(f"WIRED JSX BLOCKS: {len(blocks)}")
for b in sorted(blocks):
    print(f"  {b[0]:55} section={b[1]:22} q={b[2]}")

# Count banks
bank_n = 0
q_n = 0
for f in sorted(Path("src/data").glob("*Quizzes.js")):
    if f.name == "courseQuizzes.js":
        continue
    text = f.read_text(encoding="utf-8")
    for name in re.findall(r"export const (\w+)\s*=\s*\[", text):
        m = re.search(rf"export const {name}\s*=\s*\[(.*?)\];", text, re.S)
        if not m:
            continue
        n = len(re.findall(r"\bprompt\s*:", m.group(1)))
        bank_n += 1
        q_n += n
        if n != 15:
            print(f"BAD SIZE {f.name}/{name} = {n}")

print(f"\nDATA BANKS: {bank_n}  QUESTIONS: {q_n}")
