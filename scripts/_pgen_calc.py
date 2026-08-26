# -*- coding: utf-8 -*-
"""Problem families for the Calculus & Analytical Geometry topics."""
from fractions import Fraction as F
from math import factorial

from _pgen_core import fam, num, mono, poly, sup, pt, rt, is_square, pim

TRIPLES = [(3, 4, 5), (6, 8, 10), (5, 12, 13), (8, 15, 17), (9, 12, 15),
           (7, 24, 25), (12, 16, 20), (20, 21, 29), (10, 24, 26),
           (15, 20, 25), (18, 24, 30), (9, 40, 41), (12, 35, 37)]


# ============================================================ DIFFERENTIATION
@fam("Differentiation", "Easy")
def d_e_power():
    for a in range(2, 10):
        for n in range(2, 8):
            yield {
                "q": f"Differentiate f(x) = {mono(a, 'x', n)}. What is f′(x)?",
                "correct": mono(a * n, "x", n - 1),
                "wrongs": [mono(a, "x", n - 1), mono(a * n, "x", n),
                           mono(a * (n + 1), "x", n + 1)],
                "expl": f"Power rule: multiply by the exponent and drop it by one — {a}·{n} = {a * n}, exponent {n} → {n - 1}.",
            }


@fam("Differentiation", "Easy")
def d_e_trig():
    for a in range(2, 8):
        for b in range(2, 8):
            yield {
                "q": f"Differentiate f(x) = {a}sin({b}x).",
                "correct": f"{a * b}cos({b}x)",
                "wrongs": [f"{a}cos({b}x)", f"{a * b}sin({b}x)", f"-{a * b}cos({b}x)"],
                "expl": f"d/dx sin(u) = cos(u)·u′ with u = {b}x, so the answer is {a}·{b}cos({b}x).",
            }


@fam("Differentiation", "Easy")
def d_e_exp():
    for a in range(2, 8):
        for b in range(2, 7):
            yield {
                "q": f"Differentiate f(x) = {a}e^({b}x).",
                "correct": f"{a * b}e^({b}x)",
                "wrongs": [f"{a}e^({b}x)", f"{a * b}e^({b - 1}x)", f"{a}e^({b}x)/{b}"],
                "expl": f"Chain rule on e^({b}x) gives {b}e^({b}x); times {a} makes {a * b}e^({b}x).",
            }


@fam("Differentiation", "Easy")
def d_e_value():
    for a in range(1, 6):
        for b in range(1, 7):
            for d in range(2, 5):
                yield {
                    "q": f"If f(x) = {poly([(a, 'x', 2), (b, 'x', 1), (3, '', 0)])}, find f′({d}).",
                    "correct": num(2 * a * d + b),
                    "wrongs": [num(a * d * d + b * d + 3), num(2 * a * d), num(2 * a + b)],
                    "expl": f"f′(x) = {mono(2 * a, 'x', 1)} + {b}, so f′({d}) = {2 * a}·{d} + {b} = {2 * a * d + b}.",
                }


@fam("Differentiation", "Easy")
def d_e_log():
    for a in range(2, 10):
        for b in range(2, 8):
            yield {
                "q": f"Differentiate f(x) = {a}ln({b}x).",
                "correct": f"{a}/x",
                "wrongs": [f"{a}/({b}x)", f"{a * b}/x", f"{a}ln(x)"],
                "expl": f"d/dx ln({b}x) = {b}/({b}x) = 1/x, so the derivative is {a}/x — the inner constant cancels.",
            }


@fam("Differentiation", "Easy")
def d_e_slope():
    for n in range(2, 7):
        for c in range(2, 9):
            yield {
                "q": f"What is the slope of the tangent to y = x{sup(n)} at x = {c}?",
                "correct": num(n * c ** (n - 1)),
                "wrongs": [num(c ** n), num(n * c ** n), num((n - 1) * c ** (n - 1))],
                "expl": f"y′ = {n}x{sup(n - 1)}; at x = {c} that is {n}·{c ** (n - 1)} = {n * c ** (n - 1)}.",
            }


@fam("Differentiation", "Easy")
def d_e_recip():
    for a in range(2, 12):
        yield {
            "q": f"Differentiate f(x) = {a}/x.",
            "correct": f"-{a}/x²",
            "wrongs": [f"{a}/x²", f"-{a}/x", f"{a}ln|x|"],
            "expl": f"Write {a}/x = {a}x⁻¹; the power rule gives -{a}x⁻² = -{a}/x².",
        }
    for k in range(1, 10):
        yield {
            "q": f"Differentiate f(x) = {2 * k}√x.",
            "correct": f"{k}/√x",
            "wrongs": [f"{2 * k}/√x", f"{k}√x", f"{2 * k}√x/2"],
            "expl": f"{2 * k}x^(1/2) differentiates to {2 * k}·(1/2)x^(-1/2) = {k}/√x.",
        }


@fam("Differentiation", "Medium")
def d_m_chain():
    for a in range(2, 7):
        for b in range(1, 6):
            for n in range(2, 6):
                yield {
                    "q": f"Differentiate f(x) = ({a}x + {b}){sup(n)}.",
                    "correct": f"{n * a}({a}x + {b}){sup(n - 1)}",
                    "wrongs": [f"{n}({a}x + {b}){sup(n - 1)}",
                               f"{n * a}({a}x + {b}){sup(n)}",
                               f"{a}({a}x + {b}){sup(n - 1)}"],
                    "expl": f"Chain rule: {n}({a}x + {b}){sup(n - 1)} · {a} = {n * a}({a}x + {b}){sup(n - 1)}.",
                }


@fam("Differentiation", "Medium")
def d_m_product():
    for n in range(2, 9):
        yield {
            "q": f"Differentiate f(x) = x{sup(n)}·e^x.",
            "correct": f"x{sup(n - 1)}e^x({n} + x)",
            "wrongs": [f"{n}x{sup(n - 1)}e^x", f"x{sup(n)}e^x", f"{n}x{sup(n - 1)}e^x·x{sup(n)}"],
            "expl": f"Product rule: {n}x{sup(n - 1)}e^x + x{sup(n)}e^x = x{sup(n - 1)}e^x({n} + x).",
        }
    for a in range(2, 9):
        for n in range(2, 5):
            yield {
                "q": f"Differentiate f(x) = {a}x{sup(n)}·ln x.",
                "correct": f"{a}x{sup(n - 1)}({n}ln x + 1)",
                "wrongs": [f"{a * n}x{sup(n - 1)}ln x", f"{a}x{sup(n - 1)}", f"{a}x{sup(n)}/x"],
                "expl": f"Product rule: {a * n}x{sup(n - 1)}ln x + {a}x{sup(n)}·(1/x) = {a}x{sup(n - 1)}({n}ln x + 1).",
            }


@fam("Differentiation", "Medium")
def d_m_quotient():
    for a in range(2, 8):
        for b in range(1, 5):
            for c in range(1, 5):
                for d in (2, 3, 5):
                    if a * d == b * c:
                        continue
                    val = F(a * d - b * c, d * d)
                    yield {
                        "q": f"For f(x) = ({a}x + {b})/({c}x + {d}), compute f′(0).",
                        "correct": num(val),
                        "wrongs": [num(F(a, d)), num(-val), num(F(a * d - b * c, d))],
                        "expl": f"f′(x) = (ad − bc)/({c}x + {d})² = ({a}·{d} − {b}·{c})/{d}² = {num(val)}.",
                    }


@fam("Differentiation", "Medium")
def d_m_implicit():
    for (p, q, r) in TRIPLES:
        for sx, sy in ((1, 1), (-1, 1), (1, -1)):
            x0, y0 = sx * p, sy * q
            yield {
                "q": f"The circle x² + y² = {r * r} passes through {pt(x0, y0)}. Find dy/dx at that point.",
                "correct": num(F(-x0, y0)),
                "wrongs": [num(F(x0, y0)), num(F(-y0, x0)), num(F(y0, x0))],
                "expl": f"Implicit differentiation gives 2x + 2y·y′ = 0, so y′ = −x/y = −({x0})/({y0}) = {num(F(-x0, y0))}.",
            }


@fam("Differentiation", "Medium")
def d_m_second():
    for a in range(2, 9):
        for n in range(3, 8):
            yield {
                "q": f"Find f″(x) for f(x) = {mono(a, 'x', n)}.",
                "correct": mono(a * n * (n - 1), "x", n - 2),
                "wrongs": [mono(a * n, "x", n - 1), mono(a * n * n, "x", n - 2),
                           mono(a * (n - 1), "x", n - 2)],
                "expl": f"f′ = {mono(a * n, 'x', n - 1)}, then f″ = {a * n}·{n - 1}x{sup(n - 2)} = {mono(a * n * (n - 1), 'x', n - 2)}.",
            }


@fam("Differentiation", "Medium")
def d_m_critical():
    for a in range(1, 7):
        for b in range(1, 13):
            yield {
                "q": f"At which x does f(x) = {poly([(a, 'x', 2), (-b, 'x', 1), (7, '', 0)])} have its only critical point?",
                "correct": num(F(b, 2 * a)),
                "wrongs": [num(F(-b, 2 * a)), num(F(b, a)), num(F(2 * a, b))],
                "expl": f"f′(x) = {2 * a}x − {b} = 0 gives x = {b}/{2 * a} = {num(F(b, 2 * a))}.",
            }


@fam("Differentiation", "Medium")
def d_m_cubic_value():
    for a in range(1, 6):
        for b in range(1, 8):
            for c in range(2, 5):
                yield {
                    "q": f"If f(x) = {poly([(a, 'x', 3), (b, 'x', 1)])}, evaluate f′({c}).",
                    "correct": num(3 * a * c * c + b),
                    "wrongs": [num(a * c ** 3 + b * c), num(3 * a * c * c), num(3 * a * c + b)],
                    "expl": f"f′(x) = {3 * a}x² + {b}; at x = {c} it is {3 * a}·{c * c} + {b} = {3 * a * c * c + b}.",
                }


@fam("Differentiation", "Hard")
def d_h_rates_circle():
    for r in range(2, 11):
        for dr in range(1, 6):
            yield {
                "q": f"A circular ripple's radius grows at {dr} cm/s. How fast is its area growing when r = {r} cm?",
                "correct": pim(2 * r * dr, "cm²/s"),
                "wrongs": [pim(r * dr, "cm²/s"), pim(2 * r * r * dr, "cm²/s"), pim(r * r * dr, "cm²/s")],
                "expl": f"A = πr² → dA/dt = 2πr·dr/dt = 2π·{r}·{dr} = {pim(2 * r * dr, 'cm²/s')}.",
            }


@fam("Differentiation", "Hard")
def d_h_rates_sphere():
    for r in range(2, 10):
        for dr in range(1, 5):
            yield {
                "q": f"A balloon's radius increases at {dr} cm/s. How fast is its volume increasing when r = {r} cm?",
                "correct": pim(4 * r * r * dr, "cm³/s"),
                "wrongs": [pim(2 * r * dr, "cm³/s"), pim(F(4, 3) * r ** 3, "cm³/s"),
                           pim(4 * r * dr, "cm³/s")],
                "expl": f"V = (4/3)πr³ → dV/dt = 4πr²·dr/dt = 4π·{r * r}·{dr} = {pim(4 * r * r * dr, 'cm³/s')}.",
            }


@fam("Differentiation", "Hard")
def d_h_lhopital():
    for a in range(2, 10):
        for b in range(2, 10):
            if a == b:
                continue
            yield {
                "q": f"Evaluate lim(x→0) sin({a}x)/({b}x).",
                "correct": num(F(a, b)),
                "wrongs": [num(F(b, a)), "1", "0"],
                "expl": f"L'Hôpital: {a}cos({a}x)/{b} → {a}/{b} = {num(F(a, b))}.",
            }


@fam("Differentiation", "Hard")
def d_h_cos_limit():
    for a in range(2, 10):
        for b in range(1, 6):
            yield {
                "q": f"Evaluate lim(x→0) (1 − cos({a}x))/({b}x²).",
                "correct": num(F(a * a, 2 * b)),
                "wrongs": [num(F(a, 2 * b)), num(F(a * a, b)), "0"],
                "expl": f"1 − cos(u) ≈ u²/2, so the limit is {a}²/(2·{b}) = {num(F(a * a, 2 * b))}.",
            }


@fam("Differentiation", "Hard")
def d_h_mvt():
    for a in range(0, 8):
        for b in range(a + 2, a + 9):
            yield {
                "q": f"For f(x) = x² on [{a}, {b}], the Mean Value Theorem guarantees some c. Find c.",
                "correct": num(F(a + b, 2)),
                "wrongs": [num(F(b - a, 2)), num(a + b), num(F(a * b, 2))],
                "expl": f"2c = (b² − a²)/(b − a) = a + b = {a + b}, so c = {num(F(a + b, 2))}.",
            }


@fam("Differentiation", "Hard")
def d_h_optimize():
    for c in range(3, 25):
        yield {
            "q": f"What is the maximum value of f(x) = {c}x − x²?",
            "correct": num(F(c * c, 4)),
            "wrongs": [num(F(c, 2)), num(c * c), num(F(c * c, 2))],
            "expl": f"f′ = {c} − 2x = 0 → x = {num(F(c, 2))}, and f there equals {c}²/4 = {num(F(c * c, 4))}.",
        }


@fam("Differentiation", "Hard")
def d_h_ladder():
    for (p, q, r) in TRIPLES:
        for s in (1, 2, 3):
            val = F(-s * p, q)
            yield {
                "q": f"A {r} m ladder leans on a wall; its foot slides out at {s} m/s. When the foot is {p} m from the wall (top at {q} m), how fast is the top moving?",
                "correct": f"{num(val)} m/s",
                "wrongs": [f"{num(-val)} m/s", f"{num(F(-s * q, p))} m/s", f"{num(F(s * p, r))} m/s"],
                "expl": f"x² + y² = {r * r} → x·dx/dt + y·dy/dt = 0, so dy/dt = −{p}·{s}/{q} = {num(val)} m/s.",
            }


@fam("Differentiation", "Hard")
def d_h_linearize():
    for a in range(2, 12):
        for h in (1, 2, 3):
            yield {
                "q": f"Use a linear approximation at x = {a * a} to estimate √({a * a + h}).",
                "correct": num(a + F(h, 2 * a)),
                "wrongs": [num(a + F(h, a)), num(a + h), num(a + F(h, 4 * a))],
                "expl": f"√(a² + h) ≈ a + h/(2a) = {a} + {h}/{2 * a} = {num(a + F(h, 2 * a))}.",
            }


# ================================================================ INTEGRATION
@fam("Integration", "Easy")
def i_e_power():
    for n in range(2, 8):
        for k in range(1, 9):
            a = k * (n + 1)
            yield {
                "q": f"Evaluate ∫ {mono(a, 'x', n)} dx.",
                "correct": f"{mono(k, 'x', n + 1)} + C",
                "wrongs": [f"{mono(a, 'x', n + 1)} + C", f"{mono(a * n, 'x', n - 1)} + C",
                           f"{mono(k, 'x', n)} + C"],
                "expl": f"Raise the power: {a}x{sup(n + 1)}/{n + 1} = {mono(k, 'x', n + 1)}, then add C.",
            }


@fam("Integration", "Easy")
def i_e_definite_line():
    for a in range(2, 12, 2):
        for b in range(2, 9):
            yield {
                "q": f"Evaluate the definite integral of {a}x from x = 0 to x = {b}.",
                "correct": num(F(a * b * b, 2)),
                "wrongs": [num(a * b * b), num(a * b), num(F(a * b, 2))],
                "expl": f"∫{a}x dx = {a}x²/2; at x = {b} that gives {a}·{b * b}/2 = {num(F(a * b * b, 2))}.",
            }


@fam("Integration", "Easy")
def i_e_sin():
    for b in range(2, 8):
        for k in range(1, 8):
            a = k * b
            yield {
                "q": f"Evaluate ∫ {a}sin({b}x) dx.",
                "correct": f"-{k}cos({b}x) + C",
                "wrongs": [f"{k}cos({b}x) + C", f"-{a}cos({b}x) + C", f"-{a * b}cos({b}x) + C"],
                "expl": f"∫sin({b}x) dx = −cos({b}x)/{b}; times {a} gives −{k}cos({b}x) + C.",
            }


@fam("Integration", "Easy")
def i_e_exp():
    for b in range(2, 8):
        for k in range(1, 8):
            a = k * b
            yield {
                "q": f"Evaluate ∫ {a}e^({b}x) dx.",
                "correct": f"{k}e^({b}x) + C",
                "wrongs": [f"{a}e^({b}x) + C", f"{a * b}e^({b}x) + C", f"{k}e^({b}x)/{b} + C"],
                "expl": f"∫e^({b}x) dx = e^({b}x)/{b}; times {a} gives {k}e^({b}x) + C.",
            }


@fam("Integration", "Easy")
def i_e_linear_definite():
    for a in range(1, 7):
        for c in range(1, 7):
            for b in range(2, 6):
                yield {
                    "q": f"Evaluate the definite integral of ({a}x + {c}) from x = 0 to x = {b}.",
                    "correct": num(F(a * b * b, 2) + c * b),
                    "wrongs": [num(F(a * b * b, 2)), num(a * b + c), num(a * b * b + c * b)],
                    "expl": f"Antiderivative {a}x²/2 + {c}x at x = {b}: {num(F(a * b * b, 2))} + {c * b} = {num(F(a * b * b, 2) + c * b)}.",
                }


@fam("Integration", "Easy")
def i_e_recip_cos():
    for a in range(2, 12):
        yield {
            "q": f"Evaluate ∫ {a}/x dx.",
            "correct": f"{a}ln|x| + C",
            "wrongs": [f"{a}/x² + C", f"-{a}/x² + C", f"ln|{a}x| + C"],
            "expl": f"∫dx/x = ln|x|, so the integral is {a}ln|x| + C.",
        }
    for b in range(2, 8):
        for k in range(1, 7):
            a = k * b
            yield {
                "q": f"Evaluate ∫ {a}cos({b}x) dx.",
                "correct": f"{k}sin({b}x) + C",
                "wrongs": [f"{a}sin({b}x) + C", f"-{k}sin({b}x) + C", f"{a * b}sin({b}x) + C"],
                "expl": f"∫cos({b}x) dx = sin({b}x)/{b}; times {a} gives {k}sin({b}x) + C.",
            }


@fam("Integration", "Medium")
def i_m_usub():
    for a in range(1, 9):
        yield {
            "q": f"Evaluate ∫ {2 * a}x·cos({a}x²) dx.",
            "correct": f"sin({a}x²) + C",
            "wrongs": [f"{2 * a}sin({a}x²) + C", f"-sin({a}x²) + C", f"sin({a}x²)/{2 * a} + C"],
            "expl": f"Let u = {a}x², du = {2 * a}x dx, so the integral is ∫cos u du = sin({a}x²) + C.",
        }
    for a in range(1, 9):
        yield {
            "q": f"Evaluate ∫ {2 * a}x·e^({a}x²) dx.",
            "correct": f"e^({a}x²) + C",
            "wrongs": [f"{2 * a}e^({a}x²) + C", f"e^({a}x²)/{2 * a} + C", f"{a}x²e^({a}x²) + C"],
            "expl": f"With u = {a}x², du = {2 * a}x dx the integral becomes ∫e^u du = e^({a}x²) + C.",
        }


@fam("Integration", "Medium")
def i_m_parts():
    for a in range(1, 8):
        yield {
            "q": f"Evaluate ∫ x·e^({a}x) dx.",
            "correct": f"e^({a}x)({a}x − 1)/{a * a} + C",
            "wrongs": [f"e^({a}x)({a}x + 1)/{a * a} + C", f"x·e^({a}x)/{a} + C",
                       f"e^({a}x)({a}x − 1)/{a} + C"],
            "expl": f"Integration by parts with u = x, dv = e^({a}x)dx gives xe^({a}x)/{a} − e^({a}x)/{a * a}.",
        }
    for a in range(2, 10):
        yield {
            "q": f"Evaluate ∫ {a}ln x dx.",
            "correct": f"{a}x·ln x − {a}x + C",
            "wrongs": [f"{a}x·ln x + {a}x + C", f"{a}/x + C", f"{a}ln x − x + C"],
            "expl": f"By parts, ∫ln x dx = x ln x − x; multiply by {a}.",
        }


@fam("Integration", "Medium")
def i_m_definite_sub():
    for a in range(1, 5):
        for n in range(1, 4):
            val = F((1 + a) ** (n + 1) - a ** (n + 1), 2 * (n + 1))
            yield {
                "q": f"Evaluate the definite integral of x(x² + {a}){sup(n)} from x = 0 to x = 1.",
                "correct": num(val),
                "wrongs": [num(2 * val), num(F(val, 2)), num((1 + a) ** (n + 1) - a ** (n + 1))],
                "expl": f"u = x² + {a} turns it into (1/2)∫u{sup(n)}du from {a} to {1 + a} = {num(val)}.",
            }


@fam("Integration", "Medium")
def i_m_arctan():
    for a in range(1, 10):
        yield {
            "q": f"Evaluate ∫ dx/(x² + {a * a}).",
            "correct": f"(1/{a})arctan(x/{a}) + C",
            "wrongs": [f"arctan(x/{a}) + C", f"(1/{a * a})arctan(x/{a}) + C", f"{a}arctan({a}x) + C"],
            "expl": f"Standard form ∫dx/(x² + a²) = (1/a)arctan(x/a) with a = {a}.",
        }
    for a in range(1, 10):
        yield {
            "q": f"Evaluate ∫ dx/√({a * a} − x²).",
            "correct": f"arcsin(x/{a}) + C",
            "wrongs": [f"(1/{a})arcsin(x/{a}) + C", f"arctan(x/{a}) + C", f"{a}arcsin({a}x) + C"],
            "expl": f"Standard form ∫dx/√(a² − x²) = arcsin(x/a) with a = {a}.",
        }


@fam("Integration", "Medium")
def i_m_area_average():
    for n in range(2, 6):
        for b in range(2, 8):
            yield {
                "q": f"Find the area between y = x{sup(n)}, the x-axis, and x = {b} (starting at x = 0).",
                "correct": num(F(b ** (n + 1), n + 1)),
                "wrongs": [num(b ** (n + 1)), num(F(b ** n, n)), num(F(b ** (n + 1), n))],
                "expl": f"Area = b^{n + 1}/{n + 1} = {b ** (n + 1)}/{n + 1} = {num(F(b ** (n + 1), n + 1))}.",
            }
    for b in range(2, 12):
        yield {
            "q": f"What is the average value of f(x) = x² on [0, {b}]?",
            "correct": num(F(b * b, 3)),
            "wrongs": [num(F(b * b, 2)), num(b * b), num(F(b ** 3, 3))],
            "expl": f"Average = (1/{b})·∫₀^{b} x²dx = (1/{b})·{b ** 3}/3 = {num(F(b * b, 3))}.",
        }


@fam("Integration", "Hard")
def i_h_improper():
    for p in range(2, 12):
        yield {
            "q": f"Evaluate the improper integral of x^(−{p}) from x = 1 to ∞.",
            "correct": num(F(1, p - 1)),
            "wrongs": [num(F(1, p)), num(F(1, p + 1)), "divergent"],
            "expl": f"∫₁^∞ x^(−p)dx = 1/(p − 1) for p > 1, so the value is 1/{p - 1}.",
        }
    for a in range(1, 9):
        yield {
            "q": f"Evaluate the improper integral of x·e^(−{a}x) from x = 0 to ∞.",
            "correct": num(F(1, a * a)),
            "wrongs": [num(F(1, a)), num(F(2, a * a)), num(a * a)],
            "expl": f"∫₀^∞ x e^(−ax)dx = 1/a² = 1/{a * a}.",
        }


@fam("Integration", "Hard")
def i_h_partial_fractions():
    for a in range(1, 6):
        for b in range(a + 1, a + 6):
            yield {
                "q": f"Evaluate ∫ dx/((x − {a})(x − {b})).",
                "correct": f"(1/{b - a})ln|(x − {b})/(x − {a})| + C",
                "wrongs": [f"(1/{b - a})ln|(x − {a})/(x − {b})| + C",
                           f"ln|(x − {b})(x − {a})| + C",
                           f"(1/{a * b})ln|(x − {b})/(x − {a})| + C"],
                "expl": f"Partial fractions give 1/({b} − {a})·[1/(x − {b}) − 1/(x − {a})], then integrate each log term.",
            }


@fam("Integration", "Hard")
def i_h_volume():
    for n in range(1, 4):
        for b in range(1, 6):
            e = 2 * n + 1
            yield {
                "q": f"The region under y = x{sup(n)} on [0, {b}] is revolved about the x-axis. Find the volume.",
                "correct": pim(F(b ** e, e)),
                "wrongs": [pim(F(b ** e, e + 1)), pim(b ** e), pim(F(b ** (n + 1), n + 1))],
                "expl": f"V = π∫₀^{b} x^{2 * n}dx = π·{b}^{e}/{e} = {pim(F(b ** e, e))}.",
            }


@fam("Integration", "Hard")
def i_h_quarter_circle():
    for a in range(1, 11):
        yield {
            "q": f"Evaluate the definite integral of √({a * a} − x²) from x = 0 to x = {a}.",
            "correct": pim(F(a * a, 4)),
            "wrongs": [pim(F(a * a, 2)), pim(a * a), pim(F(a, 4))],
            "expl": f"That integral is a quarter of the circle of radius {a}: (1/4)π·{a * a} = {pim(F(a * a, 4))}.",
        }


@fam("Integration", "Hard")
def i_h_gamma():
    for n in range(2, 9):
        yield {
            "q": f"Evaluate the improper integral of x{sup(n)}·e^(−x) from x = 0 to ∞.",
            "correct": num(factorial(n)),
            "wrongs": [num(factorial(n + 1)), num(factorial(n - 1)), num(n * n)],
            "expl": f"∫₀^∞ xⁿe^(−x)dx = n! = {n}! = {factorial(n)}.",
        }
    for a in range(2, 9):
        yield {
            "q": f"Evaluate ∫ tan²({a}x) dx.",
            "correct": f"tan({a}x)/{a} − x + C",
            "wrongs": [f"tan({a}x)/{a} + x + C", f"sec²({a}x)/{a} + C", f"{a}tan({a}x) − x + C"],
            "expl": f"tan²u = sec²u − 1, so the integral is tan({a}x)/{a} − x + C.",
        }


@fam("Integration", "Hard")
def i_h_trig_definite():
    for n in range(1, 8):
        yield {
            "q": f"Evaluate the definite integral of cos²({n}x) from x = 0 to x = 2π.",
            "correct": pim(1),
            "wrongs": [pim(2), pim(F(1, 2)), "0"],
            "expl": f"cos²({n}x) = (1 + cos({2 * n}x))/2 and the cosine term integrates to 0, leaving (1/2)(2π) = π.",
        }
    for a in range(2, 10):
        yield {
            "q": f"Evaluate the definite integral of sin({a}x) from x = 0 to x = π/{a}.",
            "correct": num(F(2, a)),
            "wrongs": [num(F(1, a)), num(F(2, a * a)), "0"],
            "expl": f"[−cos({a}x)/{a}] from 0 to π/{a} = (1 + 1)/{a} = {num(F(2, a))}.",
        }


@fam("Integration", "Medium")
def i_m_more():
    for a in range(1, 11):
        yield {
            "q": f"Evaluate ∫ x/(x² + {a}) dx.",
            "correct": f"(1/2)ln(x² + {a}) + C",
            "wrongs": [f"ln(x² + {a}) + C", f"(1/2)ln(x² + {a})/{a} + C", f"arctan(x/{a}) + C"],
            "expl": f"u = x² + {a} gives (1/2)∫du/u = (1/2)ln(x² + {a}) + C.",
        }
    for a in range(2, 7):
        for n in range(2, 6):
            yield {
                "q": f"Evaluate ∫ ({a}x + 1){sup(n)} dx.",
                "correct": f"({a}x + 1){sup(n + 1)}/{a * (n + 1)} + C",
                "wrongs": [f"({a}x + 1){sup(n + 1)}/{n + 1} + C",
                           f"{a * (n + 1)}({a}x + 1){sup(n + 1)} + C",
                           f"({a}x + 1){sup(n)}/{a * n} + C"],
                "expl": f"Substituting u = {a}x + 1 divides by the inner derivative {a}: u^{n + 1}/({a}·{n + 1}).",
            }


@fam("Integration", "Medium")
def i_m_definite_quad():
    for a in range(1, 7):
        for b in range(1, 7):
            val = F(a * b ** 3, 3) + b
            yield {
                "q": f"Evaluate the definite integral of ({a}x² + 1) from x = 0 to x = {b}.",
                "correct": num(val),
                "wrongs": [num(F(a * b ** 3, 3)), num(a * b * b + b), num(F(a * b * b, 3) + b)],
                "expl": f"{a}x³/3 + x at x = {b} gives {num(F(a * b ** 3, 3))} + {b} = {num(val)}.",
            }
    for a in range(2, 9):
        yield {
            "q": f"Evaluate ∫ sec²({a}x) dx.",
            "correct": f"tan({a}x)/{a} + C",
            "wrongs": [f"{a}tan({a}x) + C", f"tan({a}x) + C", f"sec({a}x)/{a} + C"],
            "expl": f"d/dx tan({a}x) = {a}sec²({a}x), so divide by {a}.",
        }


@fam("Integration", "Hard")
def i_h_more():
    for a in range(1, 11):
        yield {
            "q": f"Evaluate the improper integral of 1/(x² + {a * a}) from x = 0 to ∞.",
            "correct": f"π/{2 * a}",
            "wrongs": [f"π/{a}", f"π/{4 * a}", f"π/{2 * a * a}"],
            "expl": f"(1/{a})arctan(x/{a}) → (1/{a})(π/2) = π/{2 * a}.",
        }
    for n in range(1, 9):
        yield {
            "q": f"Evaluate the definite integral of x{sup(n) if n > 1 else ''}·ln x from x = 0 to x = 1.",
            "correct": num(F(-1, (n + 1) ** 2)),
            "wrongs": [num(F(1, (n + 1) ** 2)), num(F(-1, n + 1)), num(F(-1, n * n))],
            "expl": f"By parts the value is −1/(n + 1)² = −1/{(n + 1) ** 2}.",
        }


@fam("Integration", "Hard")
def i_h_more2():
    for a in range(1, 11):
        yield {
            "q": f"Evaluate the definite integral of x·√({a * a} − x²) from x = 0 to x = {a}.",
            "correct": num(F(a ** 3, 3)),
            "wrongs": [num(F(a ** 3, 2)), num(F(a * a, 3)), num(a ** 3)],
            "expl": f"u = {a * a} − x² gives (1/2)∫₀^{a * a}√u du = {a}³/3 = {num(F(a ** 3, 3))}.",
        }
    for a in range(2, 8):
        yield {
            "q": f"Evaluate ∫ x·ln({a}x) dx.",
            "correct": f"(x²/2)ln({a}x) − x²/4 + C",
            "wrongs": [f"(x²/2)ln({a}x) + x²/4 + C", f"x·ln({a}x) − x + C",
                       f"(x²/2)ln({a}x) − x²/2 + C"],
            "expl": "Parts with u = ln(ax), dv = x dx gives (x²/2)ln(ax) − x²/4.",
        }


# ====================================================== LIMITS AND CONTINUITY
@fam("Limits and Continuity", "Easy")
def l_e_infty():
    for a in range(1, 10):
        for c in range(1, 10):
            for b in (1, 3, 5):
                yield {
                    "q": f"Evaluate lim(x→∞) ({a}x + {b})/({c}x + 2).",
                    "correct": num(F(a, c)),
                    "wrongs": [num(F(c, a)), num(F(b, 2)), "∞"],
                    "expl": f"Divide by x: the limit is the ratio of leading coefficients {a}/{c} = {num(F(a, c))}.",
                }


@fam("Limits and Continuity", "Easy")
def l_e_factor():
    for a in range(2, 16):
        yield {
            "q": f"Evaluate lim(x→{a}) (x² − {a * a})/(x − {a}).",
            "correct": num(2 * a),
            "wrongs": [num(a), num(a * a), "0"],
            "expl": f"Factor: (x − {a})(x + {a})/(x − {a}) = x + {a} → {2 * a}.",
        }


@fam("Limits and Continuity", "Easy")
def l_e_sinc():
    for a in range(2, 16):
        yield {
            "q": f"Evaluate lim(x→0) sin({a}x)/x.",
            "correct": num(a),
            "wrongs": ["1", "0", num(F(1, a))],
            "expl": f"sin(kx)/x → k as x → 0, so the limit is {a}.",
        }


@fam("Limits and Continuity", "Easy")
def l_e_poly():
    for a in range(1, 5):
        for b in range(1, 6):
            for c in range(1, 5):
                val = a * c * c + b * c - 3
                yield {
                    "q": f"Evaluate lim(x→{c}) ({poly([(a, 'x', 2), (b, 'x', 1), (-3, '', 0)])}).",
                    "correct": num(val),
                    "wrongs": [num(val + 3), num(2 * a * c + b), num(a * c + b)],
                    "expl": f"Polynomials are continuous, so substitute x = {c}: {a}·{c * c} + {b}·{c} − 3 = {val}.",
                }


@fam("Limits and Continuity", "Easy")
def l_e_ratio_sq():
    for a in range(1, 8):
        for c in range(1, 8):
            for d in (2, 4, 6):
                yield {
                    "q": f"Evaluate lim(x→∞) ({a}x² + {d}x)/({c}x² + 5).",
                    "correct": num(F(a, c)),
                    "wrongs": [num(F(d, 5)), num(F(c, a)), "0"],
                    "expl": f"Leading terms dominate: {a}x²/{c}x² = {num(F(a, c))}.",
                }


@fam("Limits and Continuity", "Medium")
def l_m_factor2():
    for a in range(2, 9):
        for b in range(1, 9):
            if a == b:
                continue
            s, p = a + b, a * b
            yield {
                "q": f"Evaluate lim(x→{a}) (x² − {s}x + {p})/(x − {a}).",
                "correct": num(a - b),
                "wrongs": [num(b - a), num(a + b), num(a * b)],
                "expl": f"The numerator factors as (x − {a})(x − {b}), so the limit is {a} − {b} = {a - b}.",
            }


@fam("Limits and Continuity", "Medium")
def l_m_rationalize():
    for k in range(2, 11):
        for c in range(1, 7):
            yield {
                "q": f"Evaluate lim(x→0) (√({k * k} + {c}x) − {k})/x.",
                "correct": num(F(c, 2 * k)),
                "wrongs": [num(F(c, k)), num(F(1, 2 * k)), "0"],
                "expl": f"Multiply by the conjugate: the limit is {c}/(2·{k}) = {num(F(c, 2 * k))}.",
            }


@fam("Limits and Continuity", "Medium")
def l_m_continuity_k():
    for c in range(1, 7):
        for m in range(1, 8):
            rhs = c * c + m
            yield {
                "q": f"f(x) = kx + 1 for x ≤ {c} and x² + {m} for x > {c}. Which k makes f continuous?",
                "correct": num(F(rhs - 1, c)),
                "wrongs": [num(F(rhs, c)), num(rhs - 1), num(F(c, rhs - 1))],
                "expl": f"Match the pieces at x = {c}: k·{c} + 1 = {c * c} + {m} = {rhs}, so k = {num(F(rhs - 1, c))}.",
            }


@fam("Limits and Continuity", "Medium")
def l_m_e_limit():
    for a in range(1, 10):
        yield {
            "q": f"Evaluate lim(x→∞) (1 + {a}/x)^x.",
            "correct": f"e^{a}",
            "wrongs": [f"e^(1/{a})", "e", f"{a}e"],
            "expl": f"(1 + a/x)^x → e^a, so the limit is e^{a}.",
        }
    for a in range(1, 10):
        yield {
            "q": f"Evaluate lim(x→0) (1 + {a}x)^(1/x).",
            "correct": f"e^{a}",
            "wrongs": [f"e^(1/{a})", "1", f"{a}"],
            "expl": f"Take logs: (1/x)·ln(1 + {a}x) → {a}, so the limit is e^{a}.",
        }


@fam("Limits and Continuity", "Medium")
def l_m_tan():
    for a in range(2, 10):
        for b in range(2, 10):
            if a == b:
                continue
            yield {
                "q": f"Evaluate lim(x→0) tan({a}x)/({b}x).",
                "correct": num(F(a, b)),
                "wrongs": [num(F(b, a)), "1", "0"],
                "expl": f"tan(u) ≈ u near 0, so the limit is {a}/{b} = {num(F(a, b))}.",
            }


@fam("Limits and Continuity", "Medium")
def l_m_removable():
    for a in range(2, 12):
        yield {
            "q": f"g(x) = (x³ − {a ** 3})/(x − {a}) for x ≠ {a}. What value at x = {a} makes g continuous?",
            "correct": num(3 * a * a),
            "wrongs": [num(a * a), num(2 * a * a), num(a ** 3)],
            "expl": f"x³ − a³ = (x − a)(x² + ax + a²), so the limit is 3a² = 3·{a * a} = {3 * a * a}.",
        }


@fam("Limits and Continuity", "Hard")
def l_h_exp():
    for a in range(2, 10):
        for b in range(2, 8):
            if a == b:
                continue
            yield {
                "q": f"Evaluate lim(x→0) (e^({a}x) − 1)/({b}x).",
                "correct": num(F(a, b)),
                "wrongs": [num(F(b, a)), "1", "0"],
                "expl": f"e^u − 1 ≈ u, so the limit is {a}/{b} = {num(F(a, b))}.",
            }


@fam("Limits and Continuity", "Hard")
def l_h_log():
    for a in range(2, 10):
        for b in range(2, 8):
            if a == b:
                continue
            yield {
                "q": f"Evaluate lim(x→0) ln(1 + {a}x)/({b}x).",
                "correct": num(F(a, b)),
                "wrongs": [num(F(b, a)), "0", "1"],
                "expl": f"ln(1 + u) ≈ u near 0, giving {a}/{b} = {num(F(a, b))}.",
            }


@fam("Limits and Continuity", "Hard")
def l_h_sqrt_infty():
    for a in range(1, 13):
        yield {
            "q": f"Evaluate lim(x→∞) x(√(x² + {a}) − x).",
            "correct": num(F(a, 2)),
            "wrongs": [num(a), "0", "∞"],
            "expl": f"Rationalize: x·{a}/(√(x² + {a}) + x) → {a}/2 = {num(F(a, 2))}.",
        }


@fam("Limits and Continuity", "Hard")
def l_h_cubic_order():
    for a in range(1, 9):
        yield {
            "q": f"Evaluate lim(x→0) (sin({a}x) − {a}x)/x³.",
            "correct": num(F(-a ** 3, 6)),
            "wrongs": [num(F(a ** 3, 6)), num(F(-a, 6)), "0"],
            "expl": f"sin u = u − u³/6 + …, so the limit is −{a}³/6 = {num(F(-a ** 3, 6))}.",
        }


@fam("Limits and Continuity", "Hard")
def l_h_path():
    for m in range(1, 10):
        yield {
            "q": f"Along the line y = {m}x, what value does xy/(x² + y²) take (x ≠ 0)?",
            "correct": num(F(m, 1 + m * m)),
            "wrongs": [num(F(1, 1 + m * m)), num(F(m * m, 1 + m * m)), "0"],
            "expl": f"Substitute y = {m}x: {m}x²/(1 + {m * m})x² = {num(F(m, 1 + m * m))} — path dependence proves the 2-D limit fails.",
        }


@fam("Limits and Continuity", "Hard")
def l_h_compound():
    for a in range(1, 8):
        for b in range(2, 7):
            yield {
                "q": f"Evaluate lim(n→∞) (1 + {a}/n)^({b}n).",
                "correct": f"e^{a * b}",
                "wrongs": [f"e^{a + b}", f"e^{a}", f"e^{b}"],
                "expl": f"(1 + a/n)^(bn) = [(1 + a/n)^n]^b → (e^{a})^{b} = e^{a * b}.",
            }


# ================================================= SEQUENCES AND INFINITE SERIES
@fam("Sequences and Infinite Series", "Easy")
def s_e_geom():
    for a in range(1, 10):
        for k in range(2, 8):
            yield {
                "q": f"Find the sum of the infinite geometric series {a} + {a}/{k} + {a}/{k}² + …",
                "correct": num(F(a * k, k - 1)),
                "wrongs": [num(F(a, k - 1)), num(F(a * k, k + 1)), num(a * k)],
                "expl": f"S = a/(1 − r) = {a}/(1 − 1/{k}) = {a}·{k}/{k - 1} = {num(F(a * k, k - 1))}.",
            }


@fam("Sequences and Infinite Series", "Easy")
def s_e_limit():
    for a in range(1, 10):
        for c in range(1, 10):
            for b in (1, 4, 7):
                yield {
                    "q": f"Find lim(n→∞) ({a}n + {b})/({c}n + 3).",
                    "correct": num(F(a, c)),
                    "wrongs": [num(F(c, a)), num(F(b, 3)), "0"],
                    "expl": f"Leading coefficients dominate: {a}/{c} = {num(F(a, c))}.",
                }


@fam("Sequences and Infinite Series", "Easy")
def s_e_arith():
    for a1 in range(1, 10):
        for d in range(2, 9):
            for n in (10, 15, 20):
                yield {
                    "q": f"An arithmetic sequence starts at {a1} with common difference {d}. What is term number {n}?",
                    "correct": num(a1 + (n - 1) * d),
                    "wrongs": [num(a1 + n * d), num(a1 * d ** (n - 1)), num(a1 + (n - 1) * d + d)],
                    "expl": f"aₙ = a₁ + (n − 1)d = {a1} + {n - 1}·{d} = {a1 + (n - 1) * d}.",
                }


@fam("Sequences and Infinite Series", "Easy")
def s_e_sum_first():
    for n in range(5, 40):
        yield {
            "q": f"What is the sum of the first {n} positive integers?",
            "correct": num(n * (n + 1) // 2),
            "wrongs": [num(n * n), num(n * (n - 1) // 2), num(n * (n + 1))],
            "expl": f"n(n + 1)/2 = {n}·{n + 1}/2 = {n * (n + 1) // 2}.",
        }


@fam("Sequences and Infinite Series", "Easy")
def s_e_pseries():
    for p in (F(1, 2), F(2, 3), F(3, 4), F(5, 4), F(3, 2), F(7, 4), 2, 3, 4, 5, F(9, 8), F(1, 3)):
        conv = p > 1
        yield {
            "q": f"Does the p-series Σ 1/n^({num(p)}) converge or diverge?",
            "correct": "Converges" if conv else "Diverges",
            "wrongs": ["Diverges" if conv else "Converges",
                       "Converges only conditionally", "Cannot be determined"],
            "expl": f"Σ1/n^p converges exactly when p > 1, and here p = {num(p)}.",
        }


@fam("Sequences and Infinite Series", "Medium")
def s_m_telescope():
    for a in range(1, 12):
        yield {
            "q": f"Evaluate Σ(n=1 to ∞) {a}/(n(n + 1)).",
            "correct": num(a),
            "wrongs": [num(F(a, 2)), num(2 * a), "divergent"],
            "expl": f"1/(n(n+1)) = 1/n − 1/(n+1) telescopes to 1, so the sum is {a}.",
        }
    for N in range(4, 20):
        yield {
            "q": f"Evaluate the partial sum Σ(n=1 to {N}) (1/n − 1/(n + 1)).",
            "correct": num(F(N, N + 1)),
            "wrongs": [num(F(N + 1, N)), num(F(1, N + 1)), "1"],
            "expl": f"Telescoping leaves 1 − 1/{N + 1} = {num(F(N, N + 1))}.",
        }


@fam("Sequences and Infinite Series", "Medium")
def s_m_tail():
    for m in range(2, 8):
        for k in range(2, 6):
            val = F(1, m ** (k - 1) * (m - 1))
            yield {
                "q": f"Evaluate Σ(n={k} to ∞) (1/{m})ⁿ.",
                "correct": num(val),
                "wrongs": [num(F(1, m ** k * (m - 1))), num(F(m, m - 1)), num(F(1, m - 1))],
                "expl": f"The tail is r^{k}/(1 − r) with r = 1/{m}, giving {num(val)}.",
            }


@fam("Sequences and Infinite Series", "Medium")
def s_m_n_rn():
    for m in range(2, 10):
        val = F(m, (m - 1) ** 2)
        yield {
            "q": f"Evaluate Σ(n=1 to ∞) n/{m}ⁿ.",
            "correct": num(val),
            "wrongs": [num(F(1, m - 1)), num(F(m, m - 1)), num(F(1, (m - 1) ** 2))],
            "expl": f"Σ n rⁿ = r/(1 − r)² with r = 1/{m}, which equals {m}/{(m - 1) ** 2} = {num(val)}.",
        }


@fam("Sequences and Infinite Series", "Medium")
def s_m_partial_geo():
    for r in (2, 3, 4, 5):
        for n in range(3, 9):
            val = F(r ** n - 1, r - 1)
            yield {
                "q": f"Evaluate the partial sum 1 + {r} + {r}² + … + {r}^{n - 1}.",
                "correct": num(val),
                "wrongs": [num(r ** n), num(F(r ** (n + 1) - 1, r - 1)), num(r ** (n - 1))],
                "expl": f"(rⁿ − 1)/(r − 1) = ({r ** n} − 1)/{r - 1} = {num(val)}.",
            }


@fam("Sequences and Infinite Series", "Medium")
def s_m_radius():
    for a in range(2, 12):
        yield {
            "q": f"Find the radius of convergence of Σ xⁿ/({a}ⁿ·n).",
            "correct": num(a),
            "wrongs": [num(F(1, a)), "1", "∞"],
            "expl": f"The ratio test gives |x|/{a} < 1, so R = {a}.",
        }
    for a in range(2, 10):
        yield {
            "q": f"Find the radius of convergence of Σ ({a}x)ⁿ/n!.",
            "correct": "∞",
            "wrongs": [num(F(1, a)), num(a), "0"],
            "expl": "Factorials beat powers, so the exponential-type series converges for every x.",
        }


@fam("Sequences and Infinite Series", "Hard")
def s_h_n2():
    for m in range(2, 9):
        val = F(m * (m + 1), (m - 1) ** 3)
        yield {
            "q": f"Evaluate Σ(n=1 to ∞) n²/{m}ⁿ.",
            "correct": num(val),
            "wrongs": [num(F(m, (m - 1) ** 2)), num(F(m + 1, (m - 1) ** 3)), num(F(m * m, (m - 1) ** 3))],
            "expl": f"Σn²rⁿ = r(1 + r)/(1 − r)³ with r = 1/{m} gives {m}·{m + 1}/{(m - 1) ** 3} = {num(val)}.",
        }


@fam("Sequences and Infinite Series", "Hard")
def s_h_interval():
    for c in range(1, 7):
        for a in range(2, 7):
            yield {
                "q": f"Σ (x − {c})ⁿ/({a}ⁿ·n²) converges on which open interval?",
                "correct": f"({c - a}, {c + a})",
                "wrongs": [f"({c - 1}, {c + 1})", f"(−{a}, {a})", f"({c}, {c + a})"],
                "expl": f"R = {a} centred at x = {c}, so the interval is ({c} − {a}, {c} + {a}).",
            }


@fam("Sequences and Infinite Series", "Hard")
def s_h_taylor_coef():
    for a in range(2, 8):
        for n in range(2, 7):
            yield {
                "q": f"In the Maclaurin series of e^({a}x), what is the coefficient of x{sup(n)}?",
                "correct": num(F(a ** n, factorial(n))),
                "wrongs": [num(F(a, factorial(n))), num(F(a ** n, factorial(n - 1))), num(a ** n)],
                "expl": f"e^(ax) = Σ aⁿxⁿ/n!, so the coefficient is {a}^{n}/{n}! = {num(F(a ** n, factorial(n)))}.",
            }


@fam("Sequences and Infinite Series", "Hard")
def s_h_harmonic_shift():
    for k in range(2, 12):
        val = sum(F(1, j) for j in range(1, k + 1)) / k
        yield {
            "q": f"Evaluate Σ(n=1 to ∞) 1/(n(n + {k})).",
            "correct": num(val),
            "wrongs": [num(F(1, k)), num(val * 2), num(F(1, k * k))],
            "expl": f"The sum equals (1/{k})·(1 + 1/2 + … + 1/{k}) = {num(val)}.",
        }


@fam("Sequences and Infinite Series", "Hard")
def s_h_basel():
    for a in range(2, 14):
        yield {
            "q": f"Evaluate Σ(n=1 to ∞) {a}/n² (leave π in the answer).",
            "correct": f"{num(F(a, 6))}π²",
            "wrongs": [f"{num(F(a, 4))}π²", f"{num(F(a, 12))}π²", f"{num(F(a, 6))}π"],
            "expl": f"Σ1/n² = π²/6, so multiplying by {a} gives {num(F(a, 6))}π².",
        }


@fam("Sequences and Infinite Series", "Hard")
def s_h_alt_error():
    for N in range(3, 15):
        yield {
            "q": f"For the alternating series Σ (−1)^(n+1)/n, what error bound does truncating after {N} terms guarantee?",
            "correct": num(F(1, N + 1)),
            "wrongs": [num(F(1, N)), num(F(1, N * N)), num(F(1, 2 * N))],
            "expl": f"|Rₙ| ≤ a₍ₙ₊₁₎ = 1/{N + 1}.",
        }


@fam("Sequences and Infinite Series", "Hard")
def s_h_extra():
    for m in range(2, 12):
        yield {
            "q": f"Evaluate Σ(n=0 to ∞) (−1)ⁿ/{m}ⁿ.",
            "correct": num(F(m, m + 1)),
            "wrongs": [num(F(m, m - 1)), num(F(1, m + 1)), num(F(m + 1, m))],
            "expl": f"Geometric with r = −1/{m}: 1/(1 + 1/{m}) = {m}/{m + 1}.",
        }
    for m in range(2, 12):
        yield {
            "q": f"Evaluate Σ(n=0 to ∞) (n + 1)/{m}ⁿ.",
            "correct": num(F(m * m, (m - 1) ** 2)),
            "wrongs": [num(F(m, (m - 1) ** 2)), num(F(1, (m - 1) ** 2)), num(F(m * m, m - 1))],
            "expl": f"Σ(n+1)rⁿ = 1/(1 − r)² with r = 1/{m} gives {m * m}/{(m - 1) ** 2}.",
        }
    for a in range(1, 10):
        yield {
            "q": f"Evaluate Σ(n=1 to ∞) {a}/((2n − 1)(2n + 1)).",
            "correct": num(F(a, 2)),
            "wrongs": [num(a), num(F(a, 4)), num(2 * a)],
            "expl": f"The telescoping partial fractions sum to 1/2, so the total is {a}/2.",
        }


# ==================================== CONIC SECTIONS AND ANALYTIC GEOMETRY
@fam("Conic Sections and Analytic Geometry", "Easy")
def c_e_center():
    for d in range(-8, 9, 2):
        for e in range(-8, 9, 2):
            if d == 0 and e == 0:
                continue
            yield {
                "q": f"Find the centre of the circle x² + y² {'+' if d >= 0 else '−'} {abs(d)}x {'+' if e >= 0 else '−'} {abs(e)}y − 12 = 0.",
                "correct": pt(F(-d, 2), F(-e, 2)),
                "wrongs": [pt(F(d, 2), F(e, 2)), pt(-d, -e), pt(F(-e, 2), F(-d, 2))],
                "expl": f"Centre is (−D/2, −E/2) = ({num(F(-d, 2))}, {num(F(-e, 2))}).",
            }


@fam("Conic Sections and Analytic Geometry", "Easy")
def c_e_radius():
    for h in range(1, 8):
        for k in range(1, 8):
            for r in range(2, 7):
                fconst = h * h + k * k - r * r
                yield {
                    "q": f"Find the radius of x² + y² − {2 * h}x − {2 * k}y + {fconst} = 0.",
                    "correct": num(r),
                    "wrongs": [num(r * r), num(h + k), num(r + 1)],
                    "expl": f"Complete the square: (x − {h})² + (y − {k})² = {r * r}, so r = {r}.",
                }


@fam("Conic Sections and Analytic Geometry", "Easy")
def c_e_distance():
    for (p, q, r) in TRIPLES:
        for x0 in (0, 1, 2):
            yield {
                "q": f"Find the distance between {pt(x0, 0)} and {pt(x0 + p, q)}.",
                "correct": num(r),
                "wrongs": [num(p + q), num(r * r), num(abs(q - p))],
                "expl": f"√({p}² + {q}²) = √{r * r} = {r}.",
            }


@fam("Conic Sections and Analytic Geometry", "Easy")
def c_e_vertex():
    for a in range(1, 6):
        for b in range(2, 12, 2):
            yield {
                "q": f"Find the x-coordinate of the vertex of y = {poly([(a, 'x', 2), (-b, 'x', 1), (4, '', 0)])}.",
                "correct": num(F(b, 2 * a)),
                "wrongs": [num(F(-b, 2 * a)), num(F(b, a)), num(F(2 * a, b))],
                "expl": f"x = −B/(2A) = {b}/{2 * a} = {num(F(b, 2 * a))}.",
            }


@fam("Conic Sections and Analytic Geometry", "Easy")
def c_e_ecc():
    for (b, c, a) in TRIPLES:
        yield {
            "q": f"Find the eccentricity of the ellipse x²/{a * a} + y²/{b * b} = 1.",
            "correct": num(F(c, a)),
            "wrongs": [num(F(b, a)), num(F(a, c)), num(F(c, b))],
            "expl": f"c = √({a * a} − {b * b}) = {c}, so e = c/a = {num(F(c, a))}.",
        }


@fam("Conic Sections and Analytic Geometry", "Easy")
def c_e_midpoint():
    for x1 in range(-6, 7, 3):
        for y1 in range(-6, 7, 3):
            for d in (4, 6, 8):
                yield {
                    "q": f"Find the midpoint of the segment joining {pt(x1, y1)} and {pt(x1 + d, y1 + 2 * d)}.",
                    "correct": pt(x1 + F(d, 2), y1 + d),
                    "wrongs": [pt(x1 + d, y1 + 2 * d), pt(F(d, 2), d), pt(x1 + d, y1 + d)],
                    "expl": f"Average the coordinates: x = ({x1} + ({x1 + d}))/2 = {num(x1 + F(d, 2))} and y = ({y1} + ({y1 + 2 * d}))/2 = {num(y1 + d)}.",
                }


@fam("Conic Sections and Analytic Geometry", "Medium")
def c_m_foci():
    for (b, c, a) in TRIPLES:
        yield {
            "q": f"Give the foci of the ellipse x²/{a * a} + y²/{b * b} = 1.",
            "correct": f"(±{c}, 0)",
            "wrongs": [f"(0, ±{c})", f"(±{a}, 0)", f"(±{b}, 0)"],
            "expl": f"c² = a² − b² = {a * a} − {b * b} = {c * c}, so the foci are (±{c}, 0).",
        }


@fam("Conic Sections and Analytic Geometry", "Medium")
def c_m_asymptote():
    for a in range(2, 9):
        for b in range(2, 9):
            if a == b:
                continue
            yield {
                "q": f"What are the asymptote slopes of the hyperbola x²/{a * a} − y²/{b * b} = 1?",
                "correct": f"±{num(F(b, a))}",
                "wrongs": [f"±{num(F(a, b))}", f"±{num(F(b * b, a * a))}", "±1"],
                "expl": f"Slopes are ±b/a = ±{b}/{a} = ±{num(F(b, a))}.",
            }


@fam("Conic Sections and Analytic Geometry", "Medium")
def c_m_parabola_focus():
    for k in range(4, 40, 4):
        yield {
            "q": f"Find the focus of the parabola y² = {k}x.",
            "correct": pt(F(k, 4), 0),
            "wrongs": [pt(F(k, 2), 0), pt(k, 0), pt(0, F(k, 4))],
            "expl": f"4p = {k} → p = {num(F(k, 4))}, and the focus is (p, 0).",
        }
    for k in range(4, 32, 4):
        yield {
            "q": f"Find the directrix of the parabola y² = {k}x.",
            "correct": f"x = {num(F(-k, 4))}",
            "wrongs": [f"x = {num(F(k, 4))}", f"y = {num(F(-k, 4))}", f"x = {num(F(-k, 2))}"],
            "expl": f"The directrix of y² = 4px is x = −p = {num(F(-k, 4))}.",
        }


@fam("Conic Sections and Analytic Geometry", "Medium")
def c_m_latus():
    for (b, c, a) in TRIPLES:
        yield {
            "q": f"Find the latus rectum length of the ellipse x²/{a * a} + y²/{b * b} = 1.",
            "correct": num(F(2 * b * b, a)),
            "wrongs": [num(F(2 * a * a, b)), num(F(b * b, a)), num(2 * b)],
            "expl": f"Length = 2b²/a = 2·{b * b}/{a} = {num(F(2 * b * b, a))}.",
        }


@fam("Conic Sections and Analytic Geometry", "Medium")
def c_m_hyp_ecc():
    for a in range(2, 10):
        for b in range(2, 10):
            if not is_square(a * a + b * b):
                continue
            c = int(round((a * a + b * b) ** 0.5))
            yield {
                "q": f"Find the eccentricity of the hyperbola x²/{a * a} − y²/{b * b} = 1.",
                "correct": num(F(c, a)),
                "wrongs": [num(F(a, c)), num(F(b, a)), num(F(c, b))],
                "expl": f"c = √({a * a} + {b * b}) = {c}, so e = {c}/{a} = {num(F(c, a))}.",
            }


@fam("Conic Sections and Analytic Geometry", "Medium")
def c_m_line_circle():
    for r in range(2, 16):
        for x0 in range(1, r):
            if not is_square(r * r - x0 * x0):
                continue
            s = int(round((r * r - x0 * x0) ** 0.5))
            yield {
                "q": f"The line x = {x0} cuts the circle x² + y² = {r * r}. What is the chord length?",
                "correct": num(2 * s),
                "wrongs": [num(s), num(2 * r), num(r * r - x0 * x0)],
                "expl": f"Half-chord = √({r * r} − {x0 * x0}) = {s}, so the full chord is {2 * s}.",
            }


@fam("Conic Sections and Analytic Geometry", "Hard")
def c_h_classify():
    for a in range(1, 5):
        for b in range(1, 7):
            for c in range(1, 5):
                disc = b * b - 4 * a * c
                kind = "Hyperbola" if disc > 0 else ("Parabola" if disc == 0 else "Ellipse")
                yield {
                    "q": f"Classify the conic {a}x² + {b}xy + {c}y² + 3x − 5 = 0.",
                    "correct": kind,
                    "wrongs": [k for k in ("Hyperbola", "Parabola", "Ellipse", "Circle") if k != kind][:3],
                    "expl": f"B² − 4AC = {b * b} − 4·{a}·{c} = {disc}, which is {'positive' if disc > 0 else ('zero' if disc == 0 else 'negative')}.",
                }


@fam("Conic Sections and Analytic Geometry", "Hard")
def c_h_area():
    for a in range(2, 12):
        for b in range(1, a):
            yield {
                "q": f"Find the area enclosed by the ellipse x²/{a * a} + y²/{b * b} = 1.",
                "correct": pim(a * b),
                "wrongs": [pim(a * a * b * b), pim(F(a * b, 2)), pim(a + b)],
                "expl": f"Area = πab = π·{a}·{b} = {pim(a * b)}.",
            }


@fam("Conic Sections and Analytic Geometry", "Hard")
def c_h_tangent():
    for (p, q, r) in TRIPLES:
        yield {
            "q": f"Find the tangent line to x² + y² = {r * r} at {pt(p, q)}.",
            "correct": f"{p}x + {q}y = {r * r}",
            "wrongs": [f"{q}x + {p}y = {r * r}", f"{p}x − {q}y = {r * r}", f"{p}x + {q}y = {r}"],
            "expl": f"The tangent at (x₀, y₀) on x² + y² = r² is x₀x + y₀y = r².",
        }


@fam("Conic Sections and Analytic Geometry", "Hard")
def c_h_point_line():
    for (p, q, r) in TRIPLES:
        for c in range(1, 6):
            yield {
                "q": f"Find the distance from the origin to the line {p}x + {q}y = {c * r}.",
                "correct": num(c),
                "wrongs": [num(F(c * r, p + q)), num(c * r), num(F(c, r))],
                "expl": f"Distance = |{c * r}|/√({p}² + {q}²) = {c * r}/{r} = {c}.",
            }


@fam("Conic Sections and Analytic Geometry", "Hard")
def c_h_focal():
    for a in range(3, 14):
        for e_den in (2, 3, 4, 5):
            if a % e_den:
                continue
            c = a // e_den
            yield {
                "q": f"An ellipse has semi-major axis {a} and eccentricity 1/{e_den}. How far apart are its foci?",
                "correct": num(2 * c),
                "wrongs": [num(c), num(F(a, e_den) + a), num(a)],
                "expl": f"c = ae = {a}/{e_den} = {c}, so the foci are 2c = {2 * c} apart.",
            }


@fam("Conic Sections and Analytic Geometry", "Hard")
def c_h_intersect():
    for m in range(1, 8):
        for k in range(1, 8):
            disc = m * m + 4 * k
            n_sol = 2 if disc > 0 else (1 if disc == 0 else 0)
            yield {
                "q": f"How many times does y = {m}x + {k} meet the parabola y = x²?",
                "correct": num(n_sol),
                "wrongs": ["0", "1", "infinitely many"] if n_sol == 2 else ["2", "0", "infinitely many"],
                "expl": f"x² − {m}x − {k} = 0 has discriminant {m * m} + 4·{k} = {disc} > 0, so there are two intersections.",
            }


@fam("Conic Sections and Analytic Geometry", "Medium")
def c_m_extra():
    for a in range(2, 12):
        for b in range(1, a):
            yield {
                "q": f"What is the length of the major axis of the ellipse x²/{a * a} + y²/{b * b} = 1?",
                "correct": num(2 * a),
                "wrongs": [num(2 * b), num(a), num(a + b)],
                "expl": f"The major axis has length 2a = {2 * a}.",
            }
    for h in range(1, 8):
        for k in range(1, 8):
            yield {
                "q": f"Give the centre of the hyperbola (x − {h})²/9 − (y + {k})²/16 = 1.",
                "correct": pt(h, -k),
                "wrongs": [pt(-h, k), pt(h, k), pt(-h, -k)],
                "expl": f"The shifts read off directly: centre ({h}, −{k}).",
            }


# ============================ TAYLOR SERIES FOR MULTIVARIABLE FUNCTIONS
@fam("Taylor Series for Multivariable Functions", "Easy")
def t_e_maclaurin():
    for a in range(2, 9):
        yield {
            "q": f"Write the degree-2 Maclaurin polynomial of e^({a}x).",
            "correct": f"1 + {a}x + {num(F(a * a, 2))}x²",
            "wrongs": [f"1 + {a}x + {a * a}x²", f"1 + {a}x + {num(F(a, 2))}x²", f"1 + x + {num(F(a * a, 2))}x²"],
            "expl": f"e^u = 1 + u + u²/2 with u = {a}x gives 1 + {a}x + {num(F(a * a, 2))}x².",
        }
    for n in range(1, 6):
        k = 2 * n + 1
        yield {
            "q": f"What is the coefficient of x{sup(k)} in the Maclaurin series of sin x?",
            "correct": num(F((-1) ** n, factorial(k))),
            "wrongs": [num(F(1, factorial(k))), num(F((-1) ** n, factorial(k - 1))), num(F((-1) ** n, k))],
            "expl": f"sin x = Σ (−1)ⁿx^(2n+1)/(2n+1)!, so the coefficient is (−1)^{n}/{k}!.",
        }


@fam("Taylor Series for Multivariable Functions", "Easy")
def t_e_linear_quad():
    for a in range(1, 7):
        for b in range(1, 7):
            yield {
                "q": f"For f(x, y) = {a}x² + {b}y², find the linearization at (1, 1).",
                "correct": f"{2 * a}x + {2 * b}y − {a + b}",
                "wrongs": [f"{a}x + {b}y − {a + b}", f"{2 * a}x + {2 * b}y + {a + b}",
                           f"{2 * a}x + {2 * b}y − {2 * (a + b)}"],
                "expl": f"f(1,1) = {a + b}, f_x = {2 * a}, f_y = {2 * b}, so L = {a + b} + {2 * a}(x − 1) + {2 * b}(y − 1).",
            }


@fam("Taylor Series for Multivariable Functions", "Easy")
def t_e_product_lin():
    for a in range(2, 8):
        for b in range(2, 8):
            yield {
                "q": f"For f(x, y) = xy, what is the linearization at ({a}, {b})?",
                "correct": f"{b}x + {a}y − {a * b}",
                "wrongs": [f"{a}x + {b}y − {a * b}", f"{b}x + {a}y + {a * b}", f"{b}x + {a}y"],
                "expl": f"L = ab + b(x − a) + a(y − b) = {b}x + {a}y − {a * b}.",
            }


@fam("Taylor Series for Multivariable Functions", "Easy")
def t_e_partials_point():
    for a in range(1, 7):
        for b in range(1, 7):
            for x0 in (1, 2):
                yield {
                    "q": f"For f(x, y) = {a}x²y + {b}y², compute f_x at ({x0}, 2).",
                    "correct": num(2 * a * x0 * 2),
                    "wrongs": [num(a * x0 * x0 + 2 * b * 2), num(2 * a * x0), num(a * x0 * 2)],
                    "expl": f"f_x = {2 * a}xy, so at ({x0}, 2) it is {2 * a}·{x0}·2 = {2 * a * x0 * 2}.",
                }


@fam("Taylor Series for Multivariable Functions", "Easy")
def t_e_cos_coef():
    for n in range(1, 7):
        k = 2 * n
        yield {
            "q": f"What is the coefficient of x{sup(k)} in the Maclaurin series of cos x?",
            "correct": num(F((-1) ** n, factorial(k))),
            "wrongs": [num(F(1, factorial(k))), num(F((-1) ** n, factorial(k + 1))), num(F((-1) ** n, k))],
            "expl": f"cos x = Σ (−1)ⁿx^(2n)/(2n)!, so the coefficient is (−1)^{n}/{k}!.",
        }
    for n in range(2, 9):
        yield {
            "q": f"What is the coefficient of x{sup(n)} in the Maclaurin series of ln(1 + x)?",
            "correct": num(F((-1) ** (n + 1), n)),
            "wrongs": [num(F((-1) ** n, n)), num(F(1, factorial(n))), num(F((-1) ** (n + 1), n + 1))],
            "expl": f"ln(1 + x) = Σ (−1)^(n+1)xⁿ/n, so the coefficient is {num(F((-1) ** (n + 1), n))}.",
        }


@fam("Taylor Series for Multivariable Functions", "Easy")
def t_e_extra():
    for a in range(2, 12):
        yield {
            "q": f"Write the degree-1 Maclaurin polynomial of e^({a}x).",
            "correct": f"1 + {a}x",
            "wrongs": [f"{a}x", f"1 + x", f"1 + {a}x + {a}x²"],
            "expl": f"L(x) = f(0) + f′(0)x = 1 + {a}x.",
        }
    for a in range(2, 8):
        for n in range(2, 6):
            yield {
                "q": f"What is the coefficient of x{sup(n)} in the Maclaurin series of 1/(1 − {a}x)?",
                "correct": num(a ** n),
                "wrongs": [num(a), num(a * n), num(F(1, a ** n))],
                "expl": f"1/(1 − ax) = Σ aⁿxⁿ, so the coefficient is {a}^{n} = {a ** n}.",
            }
    for a in range(1, 7):
        for b in range(1, 7):
            yield {
                "q": f"For f(x, y) = {a}xy², compute f_y at (2, {b}).",
                "correct": num(4 * a * b),
                "wrongs": [num(a * b * b), num(2 * a * b), num(4 * a)],
                "expl": f"f_y = {2 * a}xy = {2 * a}·2·{b} = {4 * a * b}.",
            }


@fam("Taylor Series for Multivariable Functions", "Medium")
def t_m_hessian():
    for a in range(1, 8):
        for x0 in range(1, 6):
            yield {
                "q": f"For f(x, y) = x³ + {a}xy², compute f_xx at ({x0}, 3).",
                "correct": num(6 * x0),
                "wrongs": [num(3 * x0 * x0), num(2 * a * x0), num(6 * a * x0)],
                "expl": f"f_x = 3x² + {a}y², so f_xx = 6x = 6·{x0} = {6 * x0}.",
            }
    for a in range(1, 8):
        for y0 in range(1, 6):
            yield {
                "q": f"For f(x, y) = x³ + {a}xy², compute f_xy at (2, {y0}).",
                "correct": num(2 * a * y0),
                "wrongs": [num(a * y0 * y0), num(2 * a), num(4 * a * y0)],
                "expl": f"f_x = 3x² + {a}y² → f_xy = {2 * a}y = {2 * a}·{y0} = {2 * a * y0}.",
            }


@fam("Taylor Series for Multivariable Functions", "Medium")
def t_m_exp_sum():
    for a in range(1, 5):
        for b in range(1, 5):
            label = ("x" if a == 1 else f"x{sup(a)}") + ("y" if b == 1 else f"y{sup(b)}")
            yield {
                "q": f"In the Taylor expansion of e^(x+y) about (0, 0), what is the coefficient of {label}?",
                "correct": num(F(1, factorial(a) * factorial(b))),
                "wrongs": [num(F(1, factorial(a + b))), num(F(1, factorial(a) + factorial(b))), "1"],
                "expl": f"e^(x+y) = Σ xᵃyᵇ/(a!b!), so the coefficient is 1/({a}!·{b}!) = {num(F(1, factorial(a) * factorial(b)))}.",
            }


@fam("Taylor Series for Multivariable Functions", "Medium")
def t_m_estimate():
    for a in range(2, 8):
        for b in range(2, 8):
            est = F(a * b) + F(b, 10) + F(a, 10)
            yield {
                "q": f"Use the linearization of f(x, y) = xy at ({a}, {b}) to estimate f({a}.1, {b}.1).",
                "correct": num(est),
                "wrongs": [num(est + F(1, 100)), num(F(a * b)), num(est + F(a + b, 10))],
                "expl": f"L = ab + b(0.1) + a(0.1) = {a * b} + {num(F(b, 10))} + {num(F(a, 10))} = {num(est)} (true value is 0.01 more).",
            }


@fam("Taylor Series for Multivariable Functions", "Medium")
def t_m_differential():
    for a in range(1, 7):
        for b in range(1, 7):
            df = F(a, 10) - F(b, 20)
            yield {
                "q": f"For f(x, y) = {a}x + {b}y, estimate Δf when x increases by 0.1 and y decreases by 0.05.",
                "correct": num(df),
                "wrongs": [num(-df), num(F(a, 10) + F(b, 20)), num(F(a + b, 10))],
                "expl": f"df = {a}(0.1) + {b}(−0.05) = {num(F(a, 10))} − {num(F(b, 20))} = {num(df)}.",
            }


@fam("Taylor Series for Multivariable Functions", "Medium")
def t_m_power_lin():
    for a in range(2, 8):
        for b in range(2, 8):
            yield {
                "q": f"For f(x, y) = x{sup(a)}y{sup(b)}, find the linearization at (1, 1).",
                "correct": f"1 + {a}(x − 1) + {b}(y − 1)",
                "wrongs": [f"1 + {b}(x − 1) + {a}(y − 1)", f"{a}(x − 1) + {b}(y − 1)",
                           f"1 + {a * b}(x − 1) + {a * b}(y − 1)"],
                "expl": f"f(1,1) = 1, f_x = a = {a}, f_y = b = {b} at (1, 1).",
            }


@fam("Taylor Series for Multivariable Functions", "Hard")
def t_h_quadratic_form():
    for h in range(1, 6):
        for k in range(1, 6):
            val = F(6 * h * h + 2 * 2 * h * k + 4 * k * k, 2)
            yield {
                "q": f"f has f_xx = 6, f_xy = 2, f_yy = 4 at a point. Evaluate the quadratic Taylor term for (h, k) = ({h}, {k}).",
                "correct": num(val),
                "wrongs": [num(2 * val), num(val + h * k), num(F(6 * h * h + 4 * k * k, 2))],
                "expl": f"Q = ½(f_xx h² + 2f_xy hk + f_yy k²) = ½(6·{h * h} + 4·{h * k} + 4·{k * k}) = {num(val)}.",
            }


@fam("Taylor Series for Multivariable Functions", "Hard")
def t_h_error():
    for n in range(2, 9):
        yield {
            "q": f"Bounding the degree-{n} Taylor error of e^x on [0, 1], what factor multiplies e in the Lagrange bound?",
            "correct": f"1/{factorial(n + 1)}",
            "wrongs": [f"1/{factorial(n)}", f"1/{factorial(n + 2)}", f"1/{n + 1}"],
            "expl": f"|Rₙ(x)| ≤ M|x|^(n+1)/(n+1)! with M = e and |x| ≤ 1, giving e/{factorial(n + 1)}.",
        }


@fam("Taylor Series for Multivariable Functions", "Hard")
def t_h_arctan():
    for n in range(1, 7):
        k = 2 * n + 1
        yield {
            "q": f"What is the coefficient of x{sup(k)} in the Maclaurin series of arctan x?",
            "correct": num(F((-1) ** n, k)),
            "wrongs": [num(F((-1) ** n, factorial(k))), num(F(1, k)), num(F((-1) ** n, k + 2))],
            "expl": f"arctan x = Σ (−1)ⁿx^(2n+1)/(2n+1), so the coefficient is {num(F((-1) ** n, k))}.",
        }


@fam("Taylor Series for Multivariable Functions", "Hard")
def t_h_second_order_value():
    for a in range(1, 6):
        for b in range(1, 6):
            yield {
                "q": f"For f(x, y) = e^({a}x + {b}y), what is the coefficient of xy in its Taylor expansion about (0, 0)?",
                "correct": num(a * b),
                "wrongs": [num(a + b), num(F(a * b, 2)), num(a * a * b * b)],
                "expl": f"f_xy(0,0) = {a}·{b} = {a * b} and the xy coefficient is f_xy/1!1!.",
            }


@fam("Taylor Series for Multivariable Functions", "Hard")
def t_h_mixed_sin():
    for a in range(1, 7):
        for b in range(1, 7):
            yield {
                "q": f"For f(x, y) = sin({a}x)cos({b}y), find the degree-1 Taylor polynomial about (0, 0).",
                "correct": f"{a}x",
                "wrongs": [f"{a}x + {b}y", f"{a}x − {b}y", f"1 + {a}x"],
                "expl": f"f(0,0) = 0, f_x = {a}cos({a}x)cos({b}y) → {a}, f_y = 0 at the origin.",
            }


@fam("Taylor Series for Multivariable Functions", "Hard")
def t_h_series_value():
    for a in range(2, 10):
        yield {
            "q": f"Evaluate Σ(n=0 to ∞) {a}ⁿ/n!.",
            "correct": f"e^{a}",
            "wrongs": [f"e^(1/{a})", f"{a}e", f"e^{a} − 1"],
            "expl": f"That is the Maclaurin series of e^x evaluated at x = {a}.",
        }
    for a in range(2, 10):
        yield {
            "q": f"Evaluate Σ(n=1 to ∞) {a}ⁿ/n! (note the series starts at n = 1).",
            "correct": f"e^{a} − 1",
            "wrongs": [f"e^{a}", f"e^{a} + 1", f"e^({a} − 1)"],
            "expl": f"Remove the n = 0 term (which is 1) from e^{a}.",
        }
