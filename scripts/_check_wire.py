# -*- coding: utf-8 -*-
"""Quick wiring sanity check."""
from pathlib import Path
import re
for p in Path("src/pages").rglob("*.jsx"):
    t = p.read_text(encoding="utf-8")
    for m in re.finditer(r'from "(\.\./\.\./data/[^"]+)"', t):
        print(f"{p}: {m.group(1)}")
    for m in re.finditer(r"questions=\{([A-Z0-9_]+)\}", t):
        print(f"  qref {m.group(1)}")
