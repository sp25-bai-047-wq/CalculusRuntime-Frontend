from pathlib import Path
import re

p = Path("_gen_ps_stats.py")
t = p.read_text(encoding="utf-8")
# Fix banks["NAME"] = [ ... )  -> ]
# Pattern: after a bank list that wrongly closes with )
fixed = 0
# Find sequences like banks["X"] = [ ... )\n\n    banks
def fix_closers(text):
    out = []
    i = 0
    while True:
        m = re.search(r'banks\["[^"]+"\]\s*=\s*\[', text[i:])
        if not m:
            out.append(text[i:])
            break
        start = i + m.start()
        out.append(text[i:start])
        bracket_pos = i + m.end() - 1  # position of [
        # walk to matching closer that should be ]
        depth = 0
        j = bracket_pos
        while j < len(text):
            ch = text[j]
            if ch == "[":
                depth += 1
            elif ch == "]":
                depth -= 1
                if depth == 0:
                    out.append(text[start : j + 1])
                    i = j + 1
                    break
            elif ch == "(":
                # track parens inside but don't use for bank close
                pass
            elif ch == ")":
                # if this ) would incorrectly close when depth==1 and next nonspace is blank/banks
                # check if we're at depth 1 and this looks like end of bank
                if depth == 1:
                    rest = text[j + 1 : j + 30].lstrip()
                    if rest.startswith("banks[") or rest.startswith("emit_file") or rest.startswith("return"):
                        # treat as mistaken ]
                        out.append(text[start:j] + "]")
                        i = j + 1
                        break
            j += 1
        else:
            raise RuntimeError("unclosed bank")
    return "".join(out)

t2 = fix_closers(t)
# also fix common `), 0,` that should be `], 0,` inside q() - those are wrong option list closers
# Look for lines like: ["...", "...", "..."), 0,
t2, n = re.subn(r'(\["[^"]*",\s*"[^"]*",\s*"[^"]*"\))\s*,\s*0\s*,', lambda m: m.group(1)[:-1] + "], 0,", t2)
print("option-list fixes", n)
p.write_text(t2, encoding="utf-8")
print("rewrote", p)
