# -*- coding: utf-8 -*-
"""Generate study-guide quiz banks (15 Q × 3 options) with verified answers."""
from __future__ import annotations

import json
import math
import random
import re
from pathlib import Path

OUT = Path("src/data")
rng = random.Random(20260808)


def L(s: str) -> str:
    """Wrap as KaTeX inline math for JS (caller still escapes backslashes)."""
    return s


def q(prompt, options, answer_idx, explanation):
    """Build a question; options is list of 3 strings; answer_idx is 0/1/2 before shuffle."""
    assert len(options) == 3, prompt
    assert 0 <= answer_idx <= 2
    order = [0, 1, 2]
    # Will rebalance later; keep identity for now — balance_bank shuffles.
    return {
        "prompt": prompt,
        "options": list(options),
        "answer_idx": answer_idx,
        "explanation": explanation,
    }


def balance_bank(items, bank_name=""):
    """Assign A/B/C with 3–7 each, no 3-in-a-row, no ABCABC cycle."""
    n = len(items)
    assert n == 15, bank_name
    for attempt in range(5000):
        letters = []
        out = []
        counts = {"A": 0, "B": 0, "C": 0}
        ok = True
        for it in items:
            opts = list(it["options"])
            correct = opts[it["answer_idx"]]
            # Prefer underused letters
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
            # Place correct at chosen index; shuffle wrongs into other slots
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
        # Reject ABCABCABCABCABC
        if all(letters[i] == letters[i % 3] for i in range(15)):
            continue
        return out
    raise RuntimeError(f"Could not balance {bank_name}: {letters if 'letters' in dir() else ''}")


def js_escape(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')


def emit_file(path: Path, header: str, banks: dict):
    parts = [header.rstrip() + "\n"]
    for name, items in banks.items():
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
    path.write_text("\n".join(parts).replace("\n\n\n", "\n\n"), encoding="utf-8")
    print(f"wrote {path} ({len(banks)} banks, {sum(len(v) for v in banks.values())} Q)")


# ---------------------------------------------------------------------------
# Helpers for building computational items
# ---------------------------------------------------------------------------

def frac(a, b=None):
    if b is None:
        return f"${a}$"
    return f"$\\dfrac{{{a}}}{{{b}}}$"


# ========================= CALC AG =========================================

def build_calc_ag():
    banks = {}

    # ---- LIMITS_P1 ----
    banks["LIMITS_P1_QUIZ"] = [
        q("Evaluate $\\lim_{x\\to 3}\\dfrac{x^2-9}{x-3}$.", ["$6$", "$0$", "The limit does not exist"], 0,
          "Factor $(x-3)(x+3)$ and cancel to get $x+3\\to 6$."),
        q("Evaluate $\\lim_{x\\to 0}\\dfrac{\\sqrt{x+4}-2}{x}$.", ["$\\dfrac{1}{4}$", "$2$", "$0$"], 0,
          "Rationalize the numerator; the conjugate yields $\\dfrac{1}{\\sqrt{x+4}+2}\\to\\dfrac{1}{4}$."),
        q("For $f(x)=\\begin{cases}2x+1&x<1\\\\3&x\\ge 1\\end{cases}$, $\\lim_{x\\to 1^-}f(x)$ equals:",
          ["$3$", "$2$", "$1$"], 0, "From the left, $2(1)+1=3$."),
        q("If $|f(x)|\\le x^2$ near $0$, then $\\lim_{x\\to 0}f(x)$ equals:",
          ["$0$", "$1$", "The limit need not exist"], 0, "Squeeze: $-x^2\\le f(x)\\le x^2$ and both sides go to $0$."),
        q("Evaluate $\\lim_{x\\to 2}\\dfrac{x^2-5x+6}{x-2}$.", ["$-1$", "$1$", "$0$"], 0,
          "Factor $(x-2)(x-3)$ and cancel: $x-3\\to-1$."),
        q("$f$ is continuous at $a$ when:",
          ["$\\lim_{x\\to a}f(x)=f(a)$", "$f'(a)$ exists", "$f$ is differentiable nearby"], 0,
          "Definition: limit exists and equals the function value."),
        q("Evaluate $\\lim_{x\\to 4}\\dfrac{x-4}{\\sqrt{x}-2}$.", ["$4$", "$2$", "$1$"], 0,
          "Rationalize: multiply by $\\sqrt{x}+2$ to get $\\sqrt{x}+2\\to 4$."),
        q("The jump discontinuity of $g(x)=\\begin{cases}0&x<0\\\\1&x\\ge 0\\end{cases}$ at $0$ occurs because:",
          ["Left and right limits differ", "Both one-sided limits equal $1$", "$g(0)$ is undefined"], 0,
          "Left limit is $0$, right limit is $1$."),
        q("Evaluate $\\lim_{x\\to -2}\\dfrac{x^2-4}{x+2}$.", ["$-4$", "$4$", "$0$"], 0,
          "Factor $(x-2)(x+2)$: cancel to $x-2\\to-4$."),
        q("Evaluate $\\lim_{x\\to 0}\\dfrac{\\sin(5x)}{x}$.", ["$5$", "$1$", "$0$"], 0,
          "Write $\\dfrac{\\sin(5x)}{5x}\\cdot 5\\to 1\\cdot 5=5$."),
        q("For removable discontinuity at $c$, which must be true?",
          ["Limit exists but $f(c)$ is wrong or missing", "One-sided limits disagree", "Vertical asymptote at $c$"], 0,
          "Removable means the two-sided limit exists."),
        q("Evaluate $\\lim_{x\\to 1}\\dfrac{x^3-1}{x-1}$.", ["$3$", "$1$", "$0$"], 0,
          "Factor $x^3-1=(x-1)(x^2+x+1)$: at $1$ get $3$."),
        q("$\\lim_{x\\to 0^+}\\dfrac{1}{x}$ equals:",
          ["$+\\infty$", "$0$", "$-\\infty$"], 0, "As $x\\to 0^+$, $1/x$ diverges to $+\\infty$."),
        q("Evaluate $\\lim_{x\\to 9}\\dfrac{x-9}{\\sqrt{x}-3}$.", ["$6$", "$3$", "$0$"], 0,
          "Rationalize: $\\sqrt{x}+3\\to 6$."),
        q("If $\\lim_{x\\to a}f(x)=L$ and $\\lim_{x\\to a}g(x)=M$, then $\\lim(f+g)$ equals:",
          ["$L+M$", "$LM$", "$L/M$"], 0, "Sum rule for limits."),
    ]

    # ---- LIMITS_P2 ----
    banks["LIMITS_P2_QUIZ"] = [
        q("Evaluate $\\lim_{x\\to\\infty}\\dfrac{3x^2+1}{x^2-5}$.", ["$3$", "$0$", "$\\infty$"], 0,
          "Divide by $x^2$: coefficients of leading terms give $3$."),
        q("$\\lim_{x\\to\\infty}\\dfrac{\\sin x}{x}$ equals:", ["$0$", "$1$", "Does not exist"], 0,
          "Squeeze: $|\\sin x/x|\\le 1/|x|\\to 0$."),
        q("A horizontal asymptote $y=L$ means:",
          ["$\\lim_{x\\to\\infty}f(x)=L$ or $\\lim_{x\\to-\\infty}f(x)=L$", "$f'(x)=0$", "$f(L)=0$"], 0,
          "Definition of horizontal asymptote."),
        q("Evaluate $\\lim_{x\\to 0}\\dfrac{1-\\cos x}{x^2}$.", ["$\\dfrac{1}{2}$", "$1$", "$0$"], 0,
          "Use $1-\\cos x=2\\sin^2(x/2)$ or L'Hôpital twice."),
        q("IVT guarantees a root of continuous $f$ on $[a,b]$ when:",
          ["$f(a)$ and $f(b)$ have opposite signs", "$f'(a)=0$", "$f$ is differentiable"], 0,
          "Opposite signs force a zero by IVT."),
        q("Evaluate $\\lim_{x\\to\\infty}\\left(\\sqrt{x^2+x}-x\\right)$.", ["$\\dfrac{1}{2}$", "$0$", "$\\infty$"], 0,
          "Rationalize: $\\dfrac{x}{\\sqrt{x^2+x}+x}\\to\\dfrac{1}{2}$."),
        q("Vertical asymptote of $f(x)=\\dfrac{1}{x-2}$ occurs at:",
          ["$x=2$", "$y=0$", "$x=0$"], 0, "Denominator zero while numerator nonzero."),
        q("Evaluate $\\lim_{x\\to 0}\\dfrac{\\tan(3x)}{x}$.", ["$3$", "$1$", "$0$"], 0,
          "$\\dfrac{\\sin(3x)}{\\cos(3x)\\,x}=3\\cdot\\dfrac{\\sin(3x)}{3x}\\cdot\\dfrac{1}{\\cos(3x)}\\to 3$."),
        q("The form $\\infty/\\infty$ is:",
          ["Indeterminate", "Always $1$", "Always $\\infty$"], 0, "Needs further analysis (algebra or L'Hôpital)."),
        q("For $f(x,y)=\\dfrac{xy}{x^2+y^2}$, as $(x,y)\\to(0,0)$ along $y=mx$ the limit is:",
          ["$\\dfrac{m}{1+m^2}$", "$0$", "$1$"], 0,
          "Substitute $y=mx$: $\\dfrac{mx^2}{x^2(1+m^2)}=\\dfrac{m}{1+m^2}$."),
        q("Because path limits for $xy/(x^2+y^2)$ depend on $m$, the 2D limit:",
          ["Does not exist", "Equals $0$", "Equals $1/2$"], 0, "Different paths give different values."),
        q("Evaluate $\\lim_{x\\to\\infty}\\dfrac{5x^3-2}{2x^3+x}$.", ["$\\dfrac{5}{2}$", "$0$", "$\\infty$"], 0,
          "Leading coefficients: $5/2$."),
        q("Slant asymptote appears for rational $f$ when:",
          ["Degree(numerator)=degree(denominator)+1", "Degrees are equal", "Denominator degree is larger"], 0,
          "Polynomial division yields a linear quotient."),
        q("Evaluate $\\lim_{x\\to(\\pi/2)^-}\\tan x$.", ["$+\\infty$", "$0$", "$-\\infty$"], 0,
          "Approaching $\\pi/2$ from the left, $\\tan x\\to+\\infty$."),
        q("If $f$ is continuous on $[0,1]$ with $f(0)=-1$ and $f(1)=2$, then $f(c)=0$ for some $c$ in:",
          ["$(0,1)$", "Only at an endpoint", "Nowhere necessarily"], 0, "IVT applies."),
    ]

    # ---- DIFF_RULES ----
    banks["DIFF_RULES_QUIZ"] = [
        q("Derivative of $x^7$ is:", ["$7x^6$", "$x^6$", "$7x^7$"], 0, "Power rule $nx^{n-1}$."),
        q("If $f(x)=3x^2-5x+1$, then $f'(2)$ equals:", ["$7$", "$3$", "$12$"], 0, "$f'=6x-5$; at $2$: $12-5=7$."),
        q("$(uv)'$ equals:", ["$u'v+uv'$", "$u'+v'$", "$u'v'$"], 0, "Product rule."),
        q("$\\dfrac{d}{dx}\\sin(3x)$ equals:", ["$3\\cos(3x)$", "$\\cos(3x)$", "$-3\\sin(3x)$"], 0, "Chain rule."),
        q("$\\dfrac{d}{dx}\\ln(5x)$ for $x>0$ equals:", ["$\\dfrac{1}{x}$", "$\\dfrac{1}{5x}$", "$5/x$"], 0,
          "$\\ln(5x)=\\ln 5+\\ln x$, so derivative is $1/x$."),
        q("Quotient rule for $f=u/v$ is:",
          ["$(u'v-uv')/v^2$", "$(u'v+uv')/v^2$", "$(uv'-u'v)/v^2$"], 0, "Standard quotient rule."),
        q("$\\dfrac{d}{dx}e^{2x}$ equals:", ["$2e^{2x}$", "$e^{2x}$", "$2xe^{2x}$"], 0, "Chain rule on exponential."),
        q("If $y=\\cos x$, then $y'$ equals:", ["$-\\sin x$", "$\\sin x$", "$-\\cos x$"], 0, "Standard trig derivative."),
        q("$\\dfrac{d}{dx}(x^2\\sin x)$ equals:",
          ["$2x\\sin x+x^2\\cos x$", "$2x\\cos x$", "$x^2\\cos x$"], 0, "Product rule."),
        q("$\\dfrac{d}{dx}\\tan x$ equals:", ["$\\sec^2 x$", "$\\sec x$", "$-\\csc^2 x$"], 0, "Standard."),
        q("Chain rule: $\\dfrac{d}{dx}f(g(x))$ equals:",
          ["$f'(g(x))g'(x)$", "$f'(x)g'(x)$", "$f(g'(x))$"], 0, "Outer times inner."),
        q("If $f(x)=1/x$, then $f'(x)$ equals:", ["$-1/x^2$", "$1/x^2$", "$-1/x$"], 0, "Power $-1$: $-x^{-2}$."),
        q("$\\dfrac{d}{dx}\\sqrt{x}$ equals:", ["$\\dfrac{1}{2\\sqrt{x}}$", "$\\sqrt{x}/2$", "$1/\\sqrt{x}$"], 0,
          "$x^{1/2}$ differentiates to $\\tfrac12 x^{-1/2}$."),
        q("If $h(x)=\\dfrac{x^2+1}{x}$, then $h'(x)$ equals:",
          ["$1-1/x^2$", "$2x$", "$1+1/x^2$"], 0, "Write $x+x^{-1}$: derivative $1-x^{-2}$."),
        q("$\\dfrac{d}{dx}\\ln(\\cos x)$ on $(-\\pi/2,\\pi/2)$ equals:",
          ["$-\\tan x$", "$\\tan x$", "$-\\sec x$"], 0, "$(1/\\cos x)\\cdot(-\\sin x)=-\\tan x$."),
    ]

    # ---- DIFF_APPS ----
    banks["DIFF_APPS_QUIZ"] = [
        q("If $A=\\pi r^2$ and $dr/dt=2$, then at $r=3$, $dA/dt$ equals:",
          ["$12\\pi$", "$6\\pi$", "$9\\pi$"], 0, "$dA/dt=2\\pi r\\,dr/dt=2\\pi\\cdot 3\\cdot 2=12\\pi$."),
        q("Critical points of differentiable $f$ occur where:",
          ["$f'=0$ or $f'$ undefined", "Only $f''=0$", "Only endpoints"], 0, "Definition of critical point."),
        q("If $f'(c)=0$ and $f''(c)<0$, then at $c$:",
          ["Local maximum", "Local minimum", "Inflection"], 0, "Second derivative test."),
        q("$f$ is increasing on an interval when:",
          ["$f'>0$ throughout", "$f''>0$", "$f'<0$"], 0, "First derivative sign."),
        q("L'Hôpital applies to which indeterminate forms?",
          ["$0/0$ or $\\infty/\\infty$", "Only $0\\cdot\\infty$", "Any quotient"], 0, "Classical hypotheses."),
        q("Evaluate $\\lim_{x\\to 0}\\dfrac{\\sin x-x}{x^3}$ using L'Hôpital as needed.",
          ["$-1/6$", "$0$", "$1/6$"], 0, "Three applications yield $-1/6$."),
        q("Absolute extrema of continuous $f$ on $[a,b]$ occur at:",
          ["Critical points or endpoints", "Only where $f''=0$", "Only inflection points"], 0,
          "Extreme Value Theorem candidates."),
        q("For $f(x)=x^3-3x$, local min occurs at:",
          ["$x=1$", "$x=-1$", "$x=0$"], 0, "$f'=3x^2-3=0$ at $\\pm 1$; $f''(1)>0$."),
        q("A ladder $10$ ft slides: base moves away at $2$ ft/s. When base is $6$ ft, height drops at:",
          ["$1.5$ ft/s", "$2$ ft/s", "$3$ ft/s"], 0,
          "$x^2+y^2=100$, $2x x'+2y y'=0$; $y=8$, so $y'=- (6/8)\\cdot 2=-1.5$."),
        q("Concavity upward means:",
          ["$f''>0$", "$f'>0$", "$f''<0$"], 0, "Definition via second derivative."),
        q("Maximize product $xy$ given $x+y=10$. Max product is:",
          ["$25$", "$50$", "$100$"], 0, "$y=10-x$, $P=x(10-x)$; max at $x=5$, $P=25$."),
        q("Inflection candidate where:",
          ["$f''$ changes sign", "$f'=0$ only", "$f=0$"], 0, "Concavity change."),
        q("Related rates: differentiate the constraint:",
          ["With respect to $t$ before plugging numbers", "After substituting all numbers", "Only at $t=0$"], 0,
          "Keep variables symbolic until after $d/dt$."),
        q("If $f'(x)=x^2(x-2)$, then $f$ has a local:",
          ["Neither max nor min at $x=0$", "Local max at $x=0$", "Local min at $x=0$"], 0,
          "Sign of $f'$ does not change through $0$ (even power)."),
        q("Evaluate $\\lim_{x\\to\\infty}\\dfrac{\\ln x}{x}$.", ["$0$", "$1$", "$\\infty$"], 0,
          "L'Hôpital: $(1/x)/1\\to 0$."),
    ]

    # ---- DIFF_ADV ----
    banks["DIFF_ADV_QUIZ"] = [
        q("Implicitly, for $x^2+y^2=25$, $dy/dx$ equals:",
          ["$-x/y$", "$x/y$", "$-y/x$"], 0, "$2x+2y y'=0\\Rightarrow y'=-x/y$."),
        q("MVT says there is $c\\in(a,b)$ with $f'(c)$ equal to:",
          ["$\\dfrac{f(b)-f(a)}{b-a}$", "$f''(c)$", "$0$"], 0, "Secant slope."),
        q("Rolle's theorem additionally needs:",
          ["$f(a)=f(b)$", "$f'>0$", "$f$ linear"], 0, "Special case of MVT."),
        q("Logarithmic differentiation is handy for:",
          ["Products/quotients of powers", "Only polynomials", "Only trig integrals"], 0,
          "Take $\\ln|y|$ then differentiate."),
        q("If $y=x^x$ ($x>0$), then $y'$ equals:",
          ["$x^x(\\ln x+1)$", "$x\\cdot x^{x-1}$", "$x^x\\ln x$"], 0,
          "$\\ln y=x\\ln x$; $y'/y=\\ln x+1$."),
        q("Linear approximation of $f$ near $a$ is:",
          ["$f(a)+f'(a)(x-a)$", "$f'(a)+f''(a)(x-a)$", "$f(a)f'(a)$"], 0, "Tangent line."),
        q("Second derivative of $\\sin x$ is:", ["$-\\sin x$", "$\\cos x$", "$-\\cos x$"], 0,
          "First $\\cos$, second $-\\sin$."),
        q("If $x=\\cos t$, $y=\\sin t$, then $dy/dx$ equals:",
          ["$-\\cot t$", "$\\tan t$", "$-\\tan t$"], 0, "$(dy/dt)/(dx/dt)=\\cos t/(-\\sin t)=-\\cot t$."),
        q("Differential $dy$ equals:",
          ["$f'(x)\\,dx$", "$f(x)\\,dx$", "$f''(x)\\,dx$"], 0, "Definition of differential."),
        q("Derivative of $\\arcsin x$ is:",
          ["$1/\\sqrt{1-x^2}$", "$1/(1+x^2)$", "$-1/\\sqrt{1-x^2}$"], 0, "Inverse trig standard."),
        q("For $e^y=x$, $dy/dx$ equals:", ["$1/x$", "$e^y$", "$x$"], 0, "$y=\\ln x$ for $x>0$."),
        q("Higher-order: if $f(x)=e^{2x}$, then $f''(x)$ equals:",
          ["$4e^{2x}$", "$2e^{2x}$", "$e^{2x}$"], 0, "$f'=2e^{2x}$, $f''=4e^{2x}$."),
        q("Approximate $\\sqrt{9.1}$ using $f(x)=\\sqrt{x}$ at $a=9$:",
          ["$3+0.1/6$", "$3+0.1/3$", "$3.1$"], 0, "$f'=1/(2\\sqrt{x})$; $3+(0.1)/(6)$."),
        q("Implicit $xy=1$ gives $y'$ equal to:",
          ["$-y/x$", "$y/x$", "$-x/y$"], 0, "$y+xy'=0\\Rightarrow y'=-y/x$."),
        q("If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$ with $f(a)=f(b)$, Rolle guarantees:",
          ["Some $c$ with $f'(c)=0$", "$f''=0$ somewhere", "$f$ constant everywhere"], 0, "Rolle conclusion."),
    ]

    # ---- INT_FUND ----
    banks["INT_FUND_QUIZ"] = [
        q("$\\int 3x^2\\,dx$ equals:", ["$x^3+C$", "$6x+C$", "$3x^3+C$"], 0, "Antiderivative of $3x^2$."),
        q("$\\int_0^2 3x^2\\,dx$ equals:", ["$8$", "$4$", "$24$"], 0, "$[x^3]_0^2=8$."),
        q("FTC: $\\dfrac{d}{dx}\\int_0^x f(t)\\,dt$ equals:", ["$f(x)$", "$f'(x)$", "$F(0)$"], 0, "FTC I."),
        q("$\\int\\cos x\\,dx$ equals:", ["$\\sin x+C$", "$-\\sin x+C$", "$\\cos x+C$"], 0, "Standard."),
        q("Average value of continuous $f$ on $[a,b]$ is:",
          ["$\\dfrac{1}{b-a}\\int_a^b f$", "$\\int_a^b f$", "$f((a+b)/2)$"], 0, "Definition."),
        q("$\\int 2x\\cos(x^2)\\,dx$ equals:", ["$\\sin(x^2)+C$", "$\\cos(x^2)+C$", "$2\\sin(x^2)+C$"], 0,
          "$u=x^2$, $du=2x\\,dx$."),
        q("Area between $y=x$ and $y=x^2$ on $[0,1]$ equals:", ["$1/6$", "$1/2$", "$1/3$"], 0,
          "$\\int_0^1(x-x^2)\\,dx=[x^2/2-x^3/3]_0^1=1/6$."),
        q("$\\int e^{3x}\\,dx$ equals:", ["$\\dfrac{1}{3}e^{3x}+C$", "$e^{3x}+C$", "$3e^{3x}+C$"], 0, "Chain factor $1/3$."),
        q("FTC II: $\\int_a^b f=F(b)-F(a)$ when $F'=f$ and:",
          ["$f$ is continuous on $[a,b]$", "$f$ is any function", "$F$ is quadratic"], 0, "Hypotheses of FTC."),
        q("$\\int_1^e\\dfrac{1}{x}\\,dx$ equals:", ["$1$", "$e$", "$0$"], 0, "$[\\ln x]_1^e=1$."),
        q("Indefinite integrals differ by:", ["A constant $C$", "A linear term", "Zero always"], 0,
          "Family of antiderivatives."),
        q("$\\int_0^{\\pi/2}\\sin x\\,dx$ equals:", ["$1$", "$0$", "$2$"], 0, "$[-\\cos x]_0^{\\pi/2}=1$."),
        q("Substitution $u=g(x)$ converts $\\int f(g(x))g'(x)\\,dx$ into:",
          ["$\\int f(u)\\,du$", "$\\int f'(u)\\,du$", "$\\int u\\,du$ always"], 0, "Chain rule in reverse."),
        q("If $F(x)=\\int_2^{x^2}\\sin t\\,dt$, then $F'(x)$ equals:",
          ["$2x\\sin(x^2)$", "$\\sin(x^2)$", "$2x\\cos(x^2)$"], 0, "FTC + chain rule."),
        q("$\\int(4x-1)\\,dx$ equals:", ["$2x^2-x+C$", "$4x^2-x+C$", "$2x^2+C$"], 0, "Termwise antiderivatives."),
    ]

    # ---- INT_TECH ----
    banks["INT_TECH_QUIZ"] = [
        q("Integration by parts uses:",
          ["$\\int u\\,dv=uv-\\int v\\,du$", "$\\int u\\,dv=u'v$", "$\\int uv=u'v'$"], 0, "Undo product rule."),
        q("$\\int\\ln x\\,dx$ equals:", ["$x\\ln x-x+C$", "$x\\ln x+C$", "$1/x+C$"], 0, "Parts with $u=\\ln x$."),
        q("$\\int_1^{\\infty}x^{-2}\\,dx$ converges to:", ["$1$", "$2$", "$\\infty$"], 0, "$[-1/x]_1^{\\infty}=1$."),
        q("Partial fractions for proper rational functions need:",
          ["Numerator degree less than denominator", "Equal degrees", "Numerator constant only"], 0,
          "Otherwise divide first."),
        q("$\\int\\dfrac{1}{x^2+1}\\,dx$ equals:", ["$\\arctan x+C$", "$\\ln|x^2+1|+C$", "$\\arcsin x+C$"], 0, "Standard."),
        q("Trig sub for $\\sqrt{a^2-x^2}$ often uses:",
          ["$x=a\\sin\\theta$", "$x=a\\tan\\theta$", "$x=a\\sec\\theta$"], 0, "Classic substitution."),
        q("$\\int\\sin^2 x\\,dx$ strategy starts with:",
          ["Power-reduction $\\sin^2=\\dfrac{1-\\cos 2x}{2}$", "Parts only", "Partial fractions"], 0,
          "Even powers of sine/cosine."),
        q("Disk method volume about $x$-axis for $y=f(x)$ from $a$ to $b$:",
          ["$\\pi\\int_a^b [f(x)]^2\\,dx$", "$\\int_a^b f(x)\\,dx$", "$2\\pi\\int_a^b f(x)\\,dx$"], 0, "Disk formula."),
        q("$\\int xe^{x}\\,dx$ equals:", ["$e^{x}(x-1)+C$", "$xe^{x}+C$", "$e^{x}+C$"], 0, "Parts: $u=x$, $dv=e^x dx$."),
        q("Arc length of $y=f(x)$ on $[a,b]$ is:",
          ["$\\int_a^b\\sqrt{1+(f')^2}\\,dx$", "$\\int_a^b|f'|\\,dx$", "$\\int_a^b f\\,dx$"], 0, "Arc-length formula."),
        q("$\\int_0^{\\infty}e^{-x}\\,dx$ equals:", ["$1$", "$0$", "$\\infty$"], 0, "$[-e^{-x}]_0^{\\infty}=1$."),
        q("Decompose $\\dfrac{1}{(x-1)(x+2)}$ as:",
          ["$\\dfrac{1/3}{x-1}-\\dfrac{1/3}{x+2}$", "$\\dfrac{1}{x-1}+\\dfrac{1}{x+2}$", "$\\dfrac{x}{x-1}$"], 0,
          "$A(x+2)+B(x-1)=1$ yields $A=1/3$, $B=-1/3$."),
        q("Trig integral $\\int\\sin^3 x\\,dx$ uses:",
          ["Save one $\\sin$, convert rest to $\\cos$", "Only $u=x$", "Partial fractions"], 0,
          "Odd power of sine."),
        q("Washer method includes:",
          ["$\\pi\\int(R^2-r^2)\\,dx$", "$\\pi\\int(R-r)\\,dx$", "$\\int R r\\,dx$"], 0, "Outer^2 minus inner^2."),
        q("$\\int\\sec x\\tan x\\,dx$ equals:", ["$\\sec x+C$", "$\\tan x+C$", "$-\\csc x+C$"], 0, "Standard."),
    ]

    # ---- SERIES_P1 ----
    banks["SERIES_P1_QUIZ"] = [
        q("If $a_n=\\dfrac{n}{n+1}$, then $\\lim a_n$ equals:", ["$1$", "$0$", "$\\infty$"], 0, "Divide by $n$: $1/(1+1/n)\\to 1$."),
        q("Geometric $\\sum_{n=0}^{\\infty}(1/3)^n$ sums to:", ["$\\dfrac{3}{2}$", "$3$", "$1/3$"], 0, "$1/(1-1/3)=3/2$."),
        q("If $a_n\\not\\to 0$, then $\\sum a_n$:", ["Diverges", "Converges", "Is geometric"], 0, "nth-term test."),
        q("Harmonic series $\\sum 1/n$:", ["Diverges", "Converges to $1$", "Converges to $e$"], 0, "Classic divergence."),
        q("p-series $\\sum 1/n^p$ converges when:", ["$p>1$", "$p\\ge 1$", "$p>0$"], 0, "p-test."),
        q("Telescoping $\\sum_{n=1}^{N}\\left(\\dfrac{1}{n}-\\dfrac{1}{n+1}\\right)$ equals:",
          ["$1-\\dfrac{1}{N+1}$", "$N$", "$1/(N+1)$"], 0, "Most terms cancel."),
        q("A sequence converges to $L$ means eventually terms are:",
          ["Arbitrarily close to $L$", "Equal to $L$ always", "Increasing"], 0, "Epsilon definition."),
        q("$\\sum_{n=0}^{\\infty}3\\left(\\dfrac{2}{5}\\right)^n$ equals:", ["$5$", "$3$", "$15/2$"], 0,
          "$a/(1-r)=3/(1-2/5)=5$."),
        q("Partial sum $s_N=\\sum_{n=1}^{N}a_n$. Series converges when:",
          ["$\\{s_N\\}$ converges", "$a_n\\to 0$ only", "$s_N$ is bounded above only"], 0, "Definition."),
        q("For $|r|\\ge 1$, geometric $\\sum r^n$:", ["Diverges (unless all zero)", "Converges", "Sums to $1/(1-r)$"], 0,
          "Terms fail to go to $0$ when $|r|\\ge 1$."),
        q("$a_n=(-1)^n$ has limit:", ["Does not exist", "$0$", "$1$"], 0, "Oscillates between $-1$ and $1$."),
        q("$\\sum 1/n^2$:", ["Converges", "Diverges", "Equals $1$"], 0, "p-series with $p=2>1$."),
        q("If $s_N=2-1/N$, then $\\sum a_n$ converges to:", ["$2$", "$0$", "$1$"], 0, "$\\lim s_N=2$."),
        q("Geometric first term $a=4$, ratio $r=-1/2$. Sum is:", ["$\\dfrac{8}{3}$", "$4$", "$-4$"], 0,
          "$4/(1-(-1/2))=4/(3/2)=8/3$."),
        q("Bounded monotonic sequences:", ["Converge", "Always diverge", "Oscillate"], 0, "Monotone convergence theorem."),
    ]

    # ---- SERIES_P2 ----
    banks["SERIES_P2_QUIZ"] = [
        q("Ratio test: if $L=\\lim|a_{n+1}/a_n|<1$, then $\\sum a_n$:",
          ["Converges absolutely", "Diverges", "Is inconclusive"], 0, "Ratio test."),
        q("If the ratio limit is $L=1$, the test is:", ["Inconclusive", "Divergence", "Absolute convergence"], 0,
          "Borderline case."),
        q("Alternating series $\\sum(-1)^{n+1}b_n$ with $b_n\\downarrow 0$:",
          ["Converges", "Diverges", "Converges absolutely always"], 0, "Leibniz test."),
        q("Absolute convergence means:",
          ["$\\sum|a_n|$ converges", "$\\sum a_n$ diverges", "Terms alternate"], 0, "Definition."),
        q("Alternating harmonic series is:",
          ["Conditionally convergent", "Absolutely convergent", "Divergent"], 0,
          "Converges by AST; absolute is harmonic."),
        q("Root test uses:",
          ["$\\limsup\\sqrt[n]{|a_n|}$", "$a_{n+1}/a_n$ only", "Integral of $a_n$"], 0, "Root test."),
        q("For $\\sum\\dfrac{(-1)^n}{n}$, AST error after $N$ terms is at most:",
          ["$b_{N+1}=1/(N+1)$", "$1$", "$N$"], 0, "Alternating remainder bound."),
        q("Power series $\\sum c_n(x-a)^n$ has radius $R$ when ratio gives:",
          ["Convergence for $|x-a|<R$", "Convergence only at $a$", "Always all $x$"], 0, "Definition of $R$."),
        q("Interval of convergence of $\\sum x^n$ is:",
          ["$-1<x<1$", "$-1\\le x\\le 1$", "All real $x$"], 0, "Geometric; endpoints diverge."),
        q("Limit comparison with positive $b_n$: if $\\lim a_n/b_n=c\\in(0,\\infty)$, then:",
          ["Both converge or both diverge", "Only $a_n$ converges", "Inconclusive"], 0, "Limit comparison."),
        q("Ratio for $\\sum n!/n^n$: $L$ equals:", ["$0$", "$1$", "$\\infty$"], 0,
          "$(n+1)!/(n+1)^{n+1}\\cdot n^n/n!\\to 0$; converges."),
        q("Direct comparison: if $0\\le a_n\\le b_n$ and $\\sum b_n$ converges, then:",
          ["$\\sum a_n$ converges", "$\\sum a_n$ diverges", "Inconclusive"], 0, "Comparison test."),
        q("Radius of $\\sum\\dfrac{(x-2)^n}{n\\,3^n}$ is:", ["$3$", "$1$", "$2$"], 0,
          "Ratio: $|x-2|/3<1\\Rightarrow R=3$."),
        q("At an endpoint, a power series may:",
          ["Converge or diverge — must test separately", "Always converge", "Always diverge"], 0,
          "Endpoint behavior is independent."),
        q("If $\\sum|a_n|$ converges, then $\\sum a_n$:",
          ["Converges", "May diverge", "Oscillates"], 0, "Absolute implies ordinary convergence."),
    ]

    # ---- CONICS_P1 ----
    banks["CONICS_P1_QUIZ"] = [
        q("Distance between $(1,2)$ and $(4,6)$ is:", ["$5$", "$7$", "$\\sqrt{7}$"], 0,
          "$\\sqrt{3^2+4^2}=5$."),
        q("Circle $(x-1)^2+(y+2)^2=9$ has radius:", ["$3$", "$9$", "$1$"], 0, "$r=\\sqrt{9}=3$."),
        q("Midpoint of $(0,0)$ and $(4,6)$ is:", ["$(2,3)$", "$(4,6)$", "$(1,2)$"], 0, "Average coordinates."),
        q("Parabola $y^2=8x$ has focus:", ["$(2,0)$", "$(0,2)$", "$(8,0)$"], 0, "$4a=8\\Rightarrow a=2$; focus $(a,0)$."),
        q("Ellipse $x^2/25+y^2/9=1$ has vertices at:",
          ["$(\\pm 5,0)$", "$(0,\\pm 5)$", "$(\\pm 3,0)$"], 0, "$a=5$ along $x$."),
        q("Eccentricity of a circle is:", ["$0$", "$1$", "$1/2$"], 0, "$e=0$ for circles."),
        q("Complete the square: $x^2+y^2-4x+6y=0$ is circle center:",
          ["$(2,-3)$", "$(-2,3)$", "$(4,-6)$"], 0, "$(x-2)^2+(y+3)^2=13$."),
        q("Directrix of $y^2=4ax$ is:", ["$x=-a$", "$x=a$", "$y=-a$"], 0, "Standard."),
        q("For ellipse $x^2/a^2+y^2/b^2=1$ ($a>b$), $c=\\sqrt{a^2-b^2}$. Eccentricity is:",
          ["$c/a$", "$c/b$", "$a/c$"], 0, "$e=c/a$."),
        q("Hyperbola $x^2/9-y^2/16=1$ has asymptotes:",
          ["$y=\\pm\\dfrac{4}{3}x$", "$y=\\pm\\dfrac{3}{4}x$", "$y=\\pm x$"], 0, "$y=\\pm(b/a)x$."),
        q("Standard circle center $(h,k)$ radius $r$:",
          ["$(x-h)^2+(y-k)^2=r^2$", "$x^2+y^2=r$", "$y-k=r(x-h)$"], 0, "Standard form."),
        q("Parabola $x=y^2$ opens:", ["Right", "Up", "Left"], 0, "$x=y^2$ opens along $+x$."),
        q("Foci of $x^2/16+y^2/9=1$ are at:",
          ["$(\\pm\\sqrt{7},0)$", "$(0,\\pm\\sqrt{7})$", "$(\\pm 4,0)$"], 0, "$c=\\sqrt{16-9}=\\sqrt{7}$."),
        q("Radius of $x^2+y^2=49$ is:", ["$7$", "$49$", "$14$"], 0, "$\\sqrt{49}=7$."),
        q("Definition: parabola is locus of points equidistant from:",
          ["A focus and a directrix", "Two foci", "Center and vertex"], 0, "Focus-directrix definition."),
    ]

    # ---- CONICS_P2 ----
    banks["CONICS_P2_QUIZ"] = [
        q("Discriminant $B^2-4AC<0$ (nondegenerate) indicates:",
          ["Ellipse type", "Hyperbola", "Parabola"], 0, "Classification invariant."),
        q("$B^2-4AC=0$ indicates:", ["Parabola type", "Ellipse", "Hyperbola"], 0, "Classification."),
        q("$B^2-4AC>0$ indicates:", ["Hyperbola type", "Ellipse", "Circle"], 0, "Classification."),
        q("Polar conic $r=\\dfrac{ed}{1-e\\cos\\theta}$ with $e=1$ is a:",
          ["Parabola", "Ellipse", "Hyperbola"], 0, "$e=1$ parabola."),
        q("If $e>1$ in that polar form, the curve is a:",
          ["Hyperbola", "Ellipse", "Circle"], 0, "$e>1$ hyperbola."),
        q("Rotation of axes is used when the $xy$ term:",
          ["Is present ($B\\ne 0$)", "Is zero", "Equals $A$"], 0, "Eliminate $Bxy$ by rotation."),
        q("Parametric circle $x=3\\cos t$, $y=3\\sin t$ has radius:", ["$3$", "$9$", "$1$"], 0, "Amplitude $3$."),
        q("Reflective property of a parabola: rays parallel to the axis reflect toward:",
          ["The focus", "The directrix", "The vertex only"], 0, "Optical property."),
        q("Translate $X=x-2$, $Y=y+1$. Point $(x,y)=(2,-1)$ maps to:",
          ["$(0,0)$", "$(2,-1)$", "$(4,0)$"], 0, "Origin of translated system."),
        q("For $e=0$ polar conic you get a:", ["Circle", "Parabola", "Hyperbola"], 0, "$e=0$ circle."),
        q("General second-degree $Ax^2+Bxy+Cy^2+Dx+Ey+F=0$ represents a conic when:",
          ["Not all of $A,B,C$ are zero", "$F=0$", "$D=E=0$"], 0, "Quadratic part nontrivial."),
        q("Ellipse eccentricity satisfies:", ["$0\\le e<1$", "$e=1$", "$e>1$"], 0, "Range for ellipses."),
        q("Parametric $x=a\\cosh t$, $y=b\\sinh t$ traces a:",
          ["Hyperbola branch", "Ellipse", "Parabola"], 0, "Hyperbolic identity."),
        q("After translating to remove linear terms, an ellipse equation looks like:",
          ["$X^2/a^2+Y^2/b^2=1$", "$XY=1$", "$Y=X^2$"], 0, "Standard translated form."),
        q("Satellite dish design uses which reflective property?",
          ["Parabola focus property", "Ellipse two-foci property only", "Hyperbola asymptotes"], 0,
          "Parallel rays to focus."),
    ]

    # Note: LIMITS_P1 currently has MV content in old file; new topics are single-variable as per spec.
    # Reorder exports to match existing import names / conventional order in old file:
    ordered = {
        "DIFF_RULES_QUIZ": banks["DIFF_RULES_QUIZ"],
        "DIFF_APPS_QUIZ": banks["DIFF_APPS_QUIZ"],
        "DIFF_ADV_QUIZ": banks["DIFF_ADV_QUIZ"],
        "INT_FUND_QUIZ": banks["INT_FUND_QUIZ"],
        "INT_TECH_QUIZ": banks["INT_TECH_QUIZ"],
        "LIMITS_P1_QUIZ": banks["LIMITS_P1_QUIZ"],
        "LIMITS_P2_QUIZ": banks["LIMITS_P2_QUIZ"],
        "SERIES_P1_QUIZ": banks["SERIES_P1_QUIZ"],
        "SERIES_P2_QUIZ": banks["SERIES_P2_QUIZ"],
        "CONICS_P1_QUIZ": banks["CONICS_P1_QUIZ"],
        "CONICS_P2_QUIZ": banks["CONICS_P2_QUIZ"],
    }
    emit_file(
        OUT / "calcAgStudyQuizzes.js",
        "/** Study-guide quiz banks for Calculus & Analytical Geometry — 15 MCQs per section. */",
        ordered,
    )


if __name__ == "__main__":
    build_calc_ag()
    print("phase1 done")
