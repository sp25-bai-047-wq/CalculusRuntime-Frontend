from pathlib import Path
import re

for f in Path(".").glob("_gen_*.py"):
    t = f.read_text(encoding="utf-8")
    banks = re.findall(r'banks\["([^"]+)"\]', t)
    print(f.name, "banks", len(banks), banks[:3], "..." if len(banks) > 3 else "", "q(", t.count("q("))
