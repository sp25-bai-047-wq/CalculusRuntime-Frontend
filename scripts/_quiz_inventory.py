"""Inventory every study-guide quiz block: file, section key, kind, question count."""
import re, os, json, collections

SRC = "src"
rows = []

# 1. Raw JSX mcq-card blocks (MV guides)
for root, _dirs, files in os.walk(SRC):
    for fn in files:
        if not fn.endswith(".jsx"):
            continue
        p = os.path.join(root, fn)
        text = open(p, encoding="utf-8").read()
        cards = re.findall(r'data-section="([^"]+)"\s+data-q="([^"]+)"\s+data-answer="([^"]+)"', text)
        if cards:
            counts = collections.OrderedDict()
            for sec, q, a in cards:
                counts.setdefault(sec, []).append(a)
            for sec, answers in counts.items():
                rows.append(("jsx-card", p, sec, len(answers), "".join(answers)))

# 2. LaMcqSection invocations
for root, _dirs, files in os.walk(SRC):
    for fn in files:
        if not fn.endswith(".jsx"):
            continue
        p = os.path.join(root, fn)
        text = open(p, encoding="utf-8").read()
        for m in re.finditer(r'<LaMcqSection\b', text):
            start = m.start()
            # find section="..."
            tail = text[start:start + 400]
            sec = re.search(r'section="([^"]+)"', tail)
            qidx = text.find("questions={[", start)
            if qidx < 0:
                continue
            # brace match
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
            body = text[i:j + 1]
            answers = re.findall(r'answer:\s*"([^"]+)"', body)
            rows.append(("la-mcq", p, sec.group(1) if sec else "?", len(answers), "".join(answers)))

# 3. Data module banks
for fn in sorted(os.listdir("src/data")):
    if not fn.endswith(".js"):
        continue
    if "PracticeBank" in fn:
        continue
    text = open(os.path.join("src/data", fn), encoding="utf-8").read()
    for m in re.finditer(r'export const (\w+)\s*=\s*\[', text):
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
        body = text[i:j + 1]
        answers = re.findall(r'answer:\s*"([^"]+)"', body)
        if answers:
            rows.append(("data", "src/data/" + fn, m.group(1), len(answers), "".join(answers)))

out = []
for kind, path, sec, n, ans in rows:
    out.append(f"{kind:9} {n:3}  {sec:24} {ans:20} {path}")
print("\n".join(out))
print(f"\nTOTAL BLOCKS: {len(rows)}  TOTAL QUESTIONS: {sum(r[3] for r in rows)}")
open("_quiz_inventory.txt", "w", encoding="utf-8").write("\n".join(out) + f"\n\nTOTAL BLOCKS: {len(rows)}  TOTAL QUESTIONS: {sum(r[3] for r in rows)}\n")
