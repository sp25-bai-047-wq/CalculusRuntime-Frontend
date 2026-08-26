from pathlib import Path
p = Path("_gen_mv_partial.py")
t = p.read_text(encoding="utf-8")
t = t.replace("fix_and_finish()", "build()")
p.write_text(t, encoding="utf-8")
print("fixed")
