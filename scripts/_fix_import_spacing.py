# -*- coding: utf-8 -*-
"""Restores a blank line between the inserted import and the code that follows."""
import glob
import io
import re

paths = glob.glob("src/pages/linearAlgebra/*Guide.jsx") + glob.glob(
    "src/pages/probabilityStatistics/*Guide.jsx"
)
changed = []
for p in paths:
    text = io.open(p, encoding="utf-8").read()
    new = re.sub(
        r'(import (?:La|Ps)CertificateBoost from "\./(?:La|Ps)CertificateBoost";)\n(?!\n)',
        r"\1\n\n",
        text,
    )
    if new != text:
        io.open(p, "w", encoding="utf-8", newline="\n").write(new)
        changed.append(p)

print("\n".join(changed) or "no changes")
