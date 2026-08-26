# -*- coding: utf-8 -*-
"""Shared helpers + registry for the Practice Arena problem generators.

Every family is a python generator that yields dicts:
    {"q": question, "correct": str, "wrongs": [str, ...], "expl": str}
Questions are produced from deterministic parameter grids so that every
generated item is textually unique, and answers are computed (not templated).
"""
from fractions import Fraction as F

FAMILIES = {}


def fam(topic, diff):
    def deco(fn):
        FAMILIES.setdefault(topic, {}).setdefault(diff, []).append(fn)
        return fn
    return deco


# ---------------------------------------------------------------- formatting
SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹"


def sup(n):
    out = ""
    for ch in str(n):
        out += "⁻" if ch == "-" else SUP[int(ch)]
    return out


def num(v):
    if isinstance(v, F):
        v = v.numerator if v.denominator == 1 else v
    if isinstance(v, F):
        return f"{v.numerator}/{v.denominator}"
    if isinstance(v, float):
        if abs(v - round(v)) < 1e-9:
            return str(int(round(v)))
        s = f"{v:.4f}".rstrip("0").rstrip(".")
        return s
    return str(v)


def mono(c, var="x", e=1):
    """6x², -x, 5, x³ ..."""
    if e == 0 or c == 0:
        return num(c)
    if c == 1:
        cs = ""
    elif c == -1:
        cs = "-"
    else:
        cs = num(c)
    vs = var if e == 1 else f"{var}{sup(e)}"
    return f"{cs}{vs}"


def pw(var, e):
    """Power of a single variable with no dangling ¹ / ⁰: pw('x', 1) -> 'x'."""
    if e == 0:
        return "1"
    if e == 1:
        return var
    return f"{var}{sup(e)}"


def poly(terms):
    """terms = [(coef, var, exp), ...] -> '3x² - 2x + 5'"""
    out = ""
    for c, v, e in terms:
        if c == 0:
            continue
        piece = mono(abs(c) if out else c, v, e)
        if not out:
            out = piece
        else:
            out += (" - " if c < 0 else " + ") + piece
    return out or "0"


def vec(*comps):
    return "⟨" + ", ".join(str(c) for c in comps) + "⟩"


def pt(*comps):
    return "(" + ", ".join(num(c) for c in comps) + ")"


def frac(a, b):
    return num(F(a, b))


def pim(coef, unit=""):
    """'6π cm²/s' style"""
    c = num(coef)
    if c == "1":
        base = "π"
    elif c == "-1":
        base = "-π"
    elif "/" in c:
        base = f"({c})π"
    else:
        base = f"{c}π"
    return f"{base} {unit}".strip()


def rt(n):
    """√ of an integer, simplified: √50 -> 5√2"""
    k = 1
    m = n
    d = 2
    while d * d <= m:
        while m % (d * d) == 0:
            m //= d * d
            k *= d
        d += 1
    if m == 1:
        return str(k)
    return f"√{m}" if k == 1 else f"{k}√{m}"


def is_square(n):
    if n < 0:
        return False
    r = int(round(n ** 0.5))
    return r * r == n


def norm_key(q):
    return " ".join(q.lower().split())
