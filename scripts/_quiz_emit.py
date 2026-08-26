# -*- coding: utf-8 -*-
"""Shared helpers to emit balanced 15-question quiz banks as JS modules."""
from __future__ import annotations

import random
from pathlib import Path

OUT = Path("src/data")
rng = random.Random(20260808)


def q(prompt, options, answer_idx, explanation):
    assert len(options) == 3, prompt
    assert 0 <= answer_idx <= 2
    return {
        "prompt": prompt,
        "options": list(options),
        "answer_idx": answer_idx,
        "explanation": explanation,
    }


def balance_bank(items, bank_name=""):
    n = len(items)
    assert n == 15, f"{bank_name}: got {n}"
    for _ in range(8000):
        letters = []
        out = []
        counts = {"A": 0, "B": 0, "C": 0}
        ok = True
        for it in items:
            opts = list(it["options"])
            correct = opts[it["answer_idx"]]
            candidates = ["A", "B", "C"]
            rng.shuffle(candidates)
            candidates.sort(key=lambda LTR: counts[LTR])
            chosen = None
            for LTR in candidates:
                if counts[LTR] >= 7:
                    continue
                if len(letters) >= 2 and letters[-1] == LTR and letters[-2] == LTR:
                    continue
                chosen = LTR
                break
            if chosen is None:
                ok = False
                break
            wrongs = [o for o in opts if o != correct]
            rng.shuffle(wrongs)
            new_opts = [None, None, None]
            idx = ord(chosen) - 65
            new_opts[idx] = correct
            j = 0
            for k in range(3):
                if new_opts[k] is None:
                    new_opts[k] = wrongs[j]
                    j += 1
            letters.append(chosen)
            counts[chosen] += 1
            out.append(
                {
                    "prompt": it["prompt"],
                    "options": new_opts,
                    "answer": chosen,
                    "explanation": it["explanation"],
                }
            )
        if not ok:
            continue
        if min(counts.values()) < 3 or max(counts.values()) > 7:
            continue
        if all(letters[i] == letters[i % 3] for i in range(15)):
            continue
        return out
    raise RuntimeError(f"Could not balance {bank_name}")


def js_escape(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')


def emit_file(path: Path, header: str, banks: dict):
    parts = [header.rstrip() + "\n"]
    for name, items in banks.items():
        assert len(items) == 15, f"{name}: {len(items)}"
        balanced = balance_bank(items, name)
        parts.append(f"\nexport const {name} = [")
        for it in balanced:
            parts.append("  {")
            parts.append(f'    prompt: "{js_escape(it["prompt"])}",')
            opts = ", ".join(f'"{js_escape(o)}"' for o in it["options"])
            parts.append(f"    options: [{opts}],")
            parts.append(f'    answer: "{it["answer"]}",')
            parts.append(f'    explanation: "{js_escape(it["explanation"])}",')
            parts.append("  },")
        parts.append("];\n")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(parts).replace("\n\n\n", "\n\n"), encoding="utf-8")
    print(f"wrote {path} ({len(banks)} banks, {sum(len(v) for v in banks.values())} Q)")
