# -*- coding: utf-8 -*-
"""Problem families for the Multivariable Calculus topics."""
from fractions import Fraction as F

from _pgen_core import fam, num, mono, sup, pw, pt, vec, pim, rt, is_square

TRIPLES = [(3, 4, 5), (6, 8, 10), (5, 12, 13), (8, 15, 17), (9, 12, 15),
           (7, 24, 25), (12, 16, 20), (20, 21, 29), (10, 24, 26),
           (15, 20, 25), (18, 24, 30), (9, 40, 41), (12, 35, 37)]


# ========================================================= PARTIAL DERIVATIVES
@fam("Partial Derivatives", "Easy")
def p_e_fx():
    for a in range(2, 8):
        for n in range(2, 6):
            for m in range(1, 5):
                yield {
                    "q": f"For f(x, y) = {a}x{sup(n)}y{sup(m) if m > 1 else ''}, find f_x.",
                    "correct": f"{a * n}x{sup(n - 1) if n > 2 else ''}y{sup(m) if m > 1 else ''}",
                    "wrongs": [f"{a * m}x{sup(n)}y{sup(m - 1) if m > 2 else ''}",
                               f"{a * n}x{sup(n)}y{sup(m) if m > 1 else ''}",
                               f"{a}x{sup(n - 1) if n > 2 else ''}y{sup(m) if m > 1 else ''}"],
                    "expl": f"Treat y as a constant: {a}·{n}x{sup(n - 1)}y{sup(m)}.",
                }


@fam("Partial Derivatives", "Easy")
def p_e_fy():
    for a in range(2, 8):
        for n in range(1, 5):
            for m in range(2, 6):
                yield {
                    "q": f"For f(x, y) = {a}x{sup(n) if n > 1 else ''}y{sup(m)}, find f_y.",
                    "correct": f"{a * m}x{sup(n) if n > 1 else ''}y{sup(m - 1) if m > 2 else ''}",
                    "wrongs": [f"{a * n}x{sup(n - 1) if n > 2 else ''}y{sup(m)}",
                               f"{a * m}x{sup(n) if n > 1 else ''}y{sup(m)}",
                               f"{a}x{sup(n) if n > 1 else ''}y{sup(m - 1) if m > 2 else ''}"],
                    "expl": f"Hold x fixed: {a}·{m}x{sup(n)}y{sup(m - 1)}.",
                }


@fam("Partial Derivatives", "Easy")
def p_e_grad_point():
    for a in range(1, 7):
        for b in range(1, 7):
            for x0 in range(1, 4):
                yield {
                    "q": f"For f(x, y) = {a}x² + {b}y², find ∇f at ({x0}, 2).",
                    "correct": vec(2 * a * x0, 4 * b),
                    "wrongs": [vec(a * x0, 2 * b), vec(2 * a * x0, 2 * b), vec(4 * b, 2 * a * x0)],
                    "expl": f"∇f = ⟨{2 * a}x, {2 * b}y⟩ = ⟨{2 * a * x0}, {4 * b}⟩ at ({x0}, 2).",
                }


@fam("Partial Derivatives", "Easy")
def p_e_exp_partial():
    for a in range(1, 8):
        for b in range(1, 8):
            yield {
                "q": f"For f(x, y) = e^({a}x + {b}y), find f_x.",
                "correct": f"{a}e^({a}x + {b}y)",
                "wrongs": [f"{b}e^({a}x + {b}y)", f"e^({a}x + {b}y)", f"{a * b}e^({a}x + {b}y)"],
                "expl": f"Differentiate the exponent with respect to x: the factor is {a}.",
            }


@fam("Partial Derivatives", "Easy")
def p_e_value():
    for a in range(1, 7):
        for b in range(1, 7):
            for y0 in range(1, 4):
                val = a * 4 + b * y0 * y0
                yield {
                    "q": f"Evaluate f(2, {y0}) for f(x, y) = {a}x² + {b}y².",
                    "correct": num(val),
                    "wrongs": [num(val + a), num(2 * a + b * y0), num(a * 2 + b * y0 * y0)],
                    "expl": f"{a}·4 + {b}·{y0 * y0} = {val}.",
                }


@fam("Partial Derivatives", "Easy")
def p_e_mixed_sin():
    for a in range(1, 8):
        for b in range(1, 8):
            yield {
                "q": f"For f(x, y) = sin({a}x)·y{sup(b) if b > 1 else ''}, find f_x.",
                "correct": f"{a}cos({a}x)y{sup(b) if b > 1 else ''}",
                "wrongs": [f"cos({a}x)y{sup(b) if b > 1 else ''}",
                           f"{a}sin({a}x)y{sup(b) if b > 1 else ''}",
                           f"{b}sin({a}x)y{sup(b - 1) if b > 2 else ''}"],
                "expl": f"y is constant for f_x, so f_x = {a}cos({a}x)·y{sup(b)}.",
            }


@fam("Partial Derivatives", "Medium")
def p_m_directional():
    for (u, v, r) in TRIPLES[:8]:
        for a in range(1, 6):
            for b in range(1, 6):
                val = F(2 * a * u + 2 * b * v, r)
                yield {
                    "q": f"For f(x, y) = {a}x² + {b}y², find the directional derivative at (1, 1) toward ⟨{u}, {v}⟩.",
                    "correct": num(val),
                    "wrongs": [num(2 * a * u + 2 * b * v), num(F(a * u + b * v, r)), num(F(2 * a * u + 2 * b * v, u + v))],
                    "expl": f"∇f(1,1) = ⟨{2 * a}, {2 * b}⟩ and the unit vector is ⟨{u}/{r}, {v}/{r}⟩, so D = {num(val)}.",
                }


@fam("Partial Derivatives", "Medium")
def p_m_grad_mag():
    for (u, v, r) in TRIPLES:
        yield {
            "q": f"For f(x, y) = {u}x + {v}y, what is |∇f|?",
            "correct": num(r),
            "wrongs": [num(u + v), num(r * r), num(F(u, v))],
            "expl": f"∇f = ⟨{u}, {v}⟩, so |∇f| = √({u * u} + {v * v}) = {r}.",
        }
    for (u, v, r) in TRIPLES:
        yield {
            "q": f"f has ∇f = ⟨{u}, {v}⟩ at P. What is the maximum rate of increase of f at P?",
            "correct": num(r),
            "wrongs": [num(u + v), num(-r), num(F(v, u))],
            "expl": f"The maximum rate equals |∇f| = {r}, achieved along ∇f.",
        }


@fam("Partial Derivatives", "Medium")
def p_m_chain():
    for a in range(1, 8):
        for b in range(1, 8):
            yield {
                "q": f"z = {a}x² + {b}y² with x = t², y = t³. Find dz/dt at t = 1.",
                "correct": num(4 * a + 6 * b),
                "wrongs": [num(2 * a + 3 * b), num(4 * a * 6 * b), num(2 * a + 2 * b)],
                "expl": f"dz/dt = {2 * a}x·2t + {2 * b}y·3t² = {4 * a}t³ + {6 * b}t⁵ → {4 * a} + {6 * b} = {4 * a + 6 * b}.",
            }


@fam("Partial Derivatives", "Medium")
def p_m_tangent_plane():
    for a in range(1, 7):
        for b in range(1, 7):
            yield {
                "q": f"Find the tangent plane to z = {a}x² + {b}y² at (1, 1, {a + b}).",
                "correct": f"z = {2 * a}x + {2 * b}y − {a + b}",
                "wrongs": [f"z = {a}x + {b}y − {a + b}", f"z = {2 * a}x + {2 * b}y + {a + b}",
                           f"z = {2 * a}x + {2 * b}y"],
                "expl": f"z = {a + b} + {2 * a}(x − 1) + {2 * b}(y − 1) simplifies to z = {2 * a}x + {2 * b}y − {a + b}.",
            }


@fam("Partial Derivatives", "Medium")
def p_m_second():
    for a in range(2, 9):
        for n in range(2, 5):
            for m in range(2, 5):
                yield {
                    "q": f"For f(x, y) = {a}x{sup(n)}y{sup(m)}, find f_xy.",
                    "correct": f"{a * n * m}x{sup(n - 1) if n > 2 else ''}y{sup(m - 1) if m > 2 else ''}",
                    "wrongs": [f"{a * n}x{sup(n - 1) if n > 2 else ''}y{sup(m)}",
                               f"{a * n * (n - 1)}x{sup(n - 2) if n > 3 else ''}y{sup(m)}",
                               f"{a * m}x{sup(n)}y{sup(m - 1) if m > 2 else ''}"],
                    "expl": f"f_x = {a * n}x{sup(n - 1)}y{sup(m)}, then differentiate in y: {a * n}·{m} = {a * n * m}.",
                }


@fam("Partial Derivatives", "Medium")
def p_m_implicit():
    for r in range(2, 12):
        for z0 in range(1, r):
            yield {
                "q": f"On the sphere x² + y² + z² = {r * r}, find ∂z/∂x at a point where x = 2 and z = {z0}.",
                "correct": num(F(-2, z0)),
                "wrongs": [num(F(2, z0)), num(F(-z0, 2)), num(F(z0, 2))],
                "expl": f"Implicit differentiation gives ∂z/∂x = −x/z = −2/{z0} = {num(F(-2, z0))}.",
            }


@fam("Partial Derivatives", "Hard")
def p_h_classify():
    for a in range(1, 9):
        for b in range(1, 9):
            yield {
                "q": f"f(x, y) = {a}x² − {b}y² has a critical point at the origin. Classify it.",
                "correct": "Saddle point",
                "wrongs": ["Local minimum", "Local maximum", "Inconclusive (D = 0)"],
                "expl": f"D = f_xx f_yy − f_xy² = ({2 * a})(−{2 * b}) = {-4 * a * b} < 0, so the origin is a saddle.",
            }
    for a in range(1, 9):
        for b in range(1, 9):
            yield {
                "q": f"f(x, y) = {a}x² + {b}y² + 7 has a critical point at the origin. Classify it.",
                "correct": "Local minimum",
                "wrongs": ["Local maximum", "Saddle point", "Inconclusive (D = 0)"],
                "expl": f"D = ({2 * a})({2 * b}) = {4 * a * b} > 0 with f_xx = {2 * a} > 0, so it is a local minimum.",
            }


@fam("Partial Derivatives", "Hard")
def p_h_disc():
    for a in range(1, 8):
        for b in range(1, 8):
            for c in range(1, 8):
                yield {
                    "q": f"At a critical point f_xx = {2 * a}, f_yy = {2 * b}, f_xy = {c}. Compute the discriminant D.",
                    "correct": num(4 * a * b - c * c),
                    "wrongs": [num(4 * a * b + c * c), num(4 * a * b - c), num(2 * a * b - c * c)],
                    "expl": f"D = f_xx f_yy − f_xy² = {4 * a * b} − {c * c} = {4 * a * b - c * c}.",
                }


@fam("Partial Derivatives", "Hard")
def p_h_steepest():
    for (u, v, r) in TRIPLES:
        yield {
            "q": f"∇f = ⟨{u}, {v}⟩ at P. Give the unit vector of steepest ascent at P.",
            "correct": f"⟨{num(F(u, r))}, {num(F(v, r))}⟩",
            "wrongs": [f"⟨{num(F(-u, r))}, {num(F(-v, r))}⟩", f"⟨{u}, {v}⟩",
                       f"⟨{num(F(v, r))}, {num(F(u, r))}⟩"],
            "expl": f"Normalise ∇f by |∇f| = {r}.",
        }


@fam("Partial Derivatives", "Hard")
def p_h_zero_dir():
    for a in range(1, 9):
        for b in range(1, 9):
            yield {
                "q": f"∇f = ⟨{a}, {b}⟩ at P. In which direction is the directional derivative zero?",
                "correct": f"⟨{-b}, {a}⟩",
                "wrongs": [f"⟨{a}, {b}⟩", f"⟨{-a}, {-b}⟩", f"⟨{b}, {a}⟩"],
                "expl": f"Any direction perpendicular to ∇f works, and ⟨−{b}, {a}⟩·⟨{a}, {b}⟩ = 0.",
            }


@fam("Partial Derivatives", "Hard")
def p_h_error_prop():
    for a in range(1, 8):
        for b in range(2, 8):
            val = F(a * (1 + b), 20)
            yield {
                "q": f"For f(x, y) = {a}xy{sup(b)} at (1, 1), estimate Δf when x rises 0.05 and y rises 0.05.",
                "correct": num(val),
                "wrongs": [num(F(a, 20)), num(F(a * b, 20)), num(2 * val)],
                "expl": f"f_x = {a}y{sup(b)} = {a} and f_y = {a * b}xy{sup(b - 1)} = {a * b} at (1, 1), so Δf ≈ 0.05({a} + {a * b}) = {num(val)}.",
            }


@fam("Partial Derivatives", "Hard")
def p_h_laplacian():
    for a in range(2, 7):
        for b in range(2, 7):
            yield {
                "q": f"Compute the Laplacian of f(x, y) = x{sup(a)} + y{sup(b)} at (1, 1).",
                "correct": num(a * (a - 1) + b * (b - 1)),
                "wrongs": [num(a + b), num(a * a + b * b), num(a * (a - 1) * b * (b - 1))],
                "expl": f"f_xx + f_yy = {a * (a - 1)}·{pw('x', a - 2)} + {b * (b - 1)}·{pw('y', b - 2)} = {a * (a - 1)} + {b * (b - 1)} at (1, 1).",
            }


# ============================================================= VECTOR CALCULUS
@fam("Vector Calculus", "Easy")
def v_e_deriv():
    for a in range(1, 8):
        for b in range(1, 8):
            yield {
                "q": f"For r(t) = ⟨{a}t², {b}t³⟩, find r′(1).",
                "correct": vec(2 * a, 3 * b),
                "wrongs": [vec(a, b), vec(2 * a, 2 * b), vec(3 * b, 2 * a)],
                "expl": f"r′(t) = ⟨{2 * a}t, {3 * b}t²⟩, so r′(1) = ⟨{2 * a}, {3 * b}⟩.",
            }


@fam("Vector Calculus", "Easy")
def v_e_speed():
    for (u, v, r) in TRIPLES:
        yield {
            "q": f"For r(t) = ⟨{u}t, {v}t⟩, what is the speed |r′(t)|?",
            "correct": num(r),
            "wrongs": [num(u + v), num(r * r), num(F(v, u))],
            "expl": f"r′ = ⟨{u}, {v}⟩ and |r′| = √({u * u} + {v * v}) = {r}.",
        }


@fam("Vector Calculus", "Easy")
def v_e_dot():
    for a in range(1, 8):
        for b in range(1, 8):
            for c in range(1, 6):
                yield {
                    "q": f"Compute ⟨{a}, {b}⟩ · ⟨{c}, {c + 1}⟩.",
                    "correct": num(a * c + b * (c + 1)),
                    "wrongs": [num(a * c - b * (c + 1)), num(a * (c + 1) + b * c), num(a * b * c)],
                    "expl": f"{a}·{c} + {b}·{c + 1} = {a * c + b * (c + 1)}.",
                }


@fam("Vector Calculus", "Easy")
def v_e_div2d():
    for a in range(1, 8):
        for b in range(1, 8):
            yield {
                "q": f"Compute the divergence of F = ⟨{a}x, {b}y⟩.",
                "correct": num(a + b),
                "wrongs": [num(a * b), num(a - b), num(2 * (a + b))],
                "expl": f"div F = ∂({a}x)/∂x + ∂({b}y)/∂y = {a} + {b} = {a + b}.",
            }


@fam("Vector Calculus", "Easy")
def v_e_curl2d():
    for a in range(1, 8):
        for b in range(1, 8):
            yield {
                "q": f"For F = ⟨{a}y, {b}x⟩, compute the scalar curl ∂N/∂x − ∂M/∂y.",
                "correct": num(b - a),
                "wrongs": [num(a - b), num(a + b), num(a * b)],
                "expl": f"∂({b}x)/∂x − ∂({a}y)/∂y = {b} − {a} = {b - a}.",
            }


@fam("Vector Calculus", "Easy")
def v_e_unit():
    for (u, v, r) in TRIPLES:
        yield {
            "q": f"Find the unit vector along ⟨{u}, {v}⟩.",
            "correct": f"⟨{num(F(u, r))}, {num(F(v, r))}⟩",
            "wrongs": [f"⟨{num(F(u, u + v))}, {num(F(v, u + v))}⟩", f"⟨{u}, {v}⟩",
                       f"⟨{num(F(v, r))}, {num(F(u, r))}⟩"],
            "expl": f"Divide by the length {r}.",
        }


@fam("Vector Calculus", "Medium")
def v_m_work_const():
    for a in range(1, 7):
        for b in range(1, 7):
            for p in range(1, 6):
                q = p + 2
                yield {
                    "q": f"Find the work done by the constant field F = ⟨{a}, {b}⟩ along the straight path from (0, 0) to ({p}, {q}).",
                    "correct": num(a * p + b * q),
                    "wrongs": [num(a * q + b * p), num(a * p - b * q), num(a * b * p)],
                    "expl": f"For a constant field, W = F·d = {a}·{p} + {b}·{q} = {a * p + b * q}.",
                }


@fam("Vector Calculus", "Medium")
def v_m_potential():
    for a in range(1, 9):
        for b in range(1, 9):
            yield {
                "q": f"Find a potential function for F = ⟨{2 * a}x, {2 * b}y⟩.",
                "correct": f"{a}x² + {b}y²",
                "wrongs": [f"{2 * a}x² + {2 * b}y²", f"{a}x + {b}y", f"{a}x²y²"],
                "expl": f"∂/∂x({a}x² + {b}y²) = {2 * a}x and ∂/∂y = {2 * b}y, so it is a potential.",
            }


@fam("Vector Calculus", "Medium")
def v_m_conservative_work():
    for a in range(1, 7):
        for p in range(1, 7):
            q = p + 1
            val = a * (p * p + q * q)
            yield {
                "q": f"F = ∇f with f = {a}(x² + y²). Find the work along any path from (0, 0) to ({p}, {q}).",
                "correct": num(val),
                "wrongs": [num(a * (p + q)), num(2 * val), "0"],
                "expl": f"Work = f({p},{q}) − f(0,0) = {a}({p * p} + {q * q}) = {val}.",
            }


@fam("Vector Calculus", "Medium")
def v_m_flux_circle():
    for R in range(1, 12):
        yield {
            "q": f"Find the outward flux of F = ⟨x, y⟩ across the circle of radius {R} centred at the origin.",
            "correct": pim(2 * R * R),
            "wrongs": [pim(R * R), pim(2 * R), pim(4 * R * R)],
            "expl": f"div F = 2, so the flux is 2·area = 2π·{R * R} = {pim(2 * R * R)}.",
        }
    for R in range(1, 12):
        yield {
            "q": f"Find the circulation of F = ⟨−y, x⟩ counterclockwise around the circle of radius {R}.",
            "correct": pim(2 * R * R),
            "wrongs": [pim(R * R), pim(2 * R), "0"],
            "expl": f"The scalar curl is 2, so by Green's theorem the circulation is 2π{R * R}.",
        }


@fam("Vector Calculus", "Medium")
def v_m_conservative_test():
    for a in range(1, 8):
        for b in range(1, 8):
            same = a == b
            yield {
                "q": f"Is F = ⟨{a}y, {b}x⟩ conservative on the plane?",
                "correct": "Yes" if same else "No",
                "wrongs": ["No" if same else "Yes", "Only on a disk", "Only away from the origin"],
                "expl": f"∂M/∂y = {a} and ∂N/∂x = {b}; they {'match' if same else 'differ'}, so the field is {'conservative' if same else 'not conservative'}.",
            }


@fam("Vector Calculus", "Medium")
def v_m_scalar_line():
    for a in range(2, 12):
        yield {
            "q": f"Evaluate ∫_C x ds where C is the segment from (0, 0) to ({a}, 0).",
            "correct": num(F(a * a, 2)),
            "wrongs": [num(a * a), num(a), num(F(a, 2))],
            "expl": f"ds = dx here, so the integral is ∫₀^{a} x dx = {a * a}/2 = {num(F(a * a, 2))}.",
        }


@fam("Vector Calculus", "Hard")
def v_h_helix():
    for (u, v, r) in TRIPLES:
        yield {
            "q": f"Find the arc length of the helix r(t) = ⟨{u}cos t, {u}sin t, {v}t⟩ for 0 ≤ t ≤ 2π.",
            "correct": pim(2 * r),
            "wrongs": [pim(2 * (u + v)), pim(r), pim(2 * r * r)],
            "expl": f"|r′| = √({u * u} + {v * v}) = {r} is constant, so length = {r}·2π = {pim(2 * r)}.",
        }


@fam("Vector Calculus", "Hard")
def v_h_green_area():
    for p in range(2, 9):
        for q in range(1, p):
            yield {
                "q": f"Use Green's theorem to find the area enclosed by the ellipse with semi-axes {p} and {q}.",
                "correct": pim(p * q),
                "wrongs": [pim(2 * p * q), pim(F(p * q, 2)), pim(p + q)],
                "expl": f"A = ½∮(x dy − y dx) = πab = π·{p}·{q} = {pim(p * q)}.",
            }


@fam("Vector Calculus", "Hard")
def v_h_flux_div():
    for a in range(1, 6):
        for b in range(1, 6):
            for c in range(1, 6):
                s = a + b + c
                yield {
                    "q": f"Find the outward flux of F = ⟨{a}x, {b}y, {c}z⟩ through the unit cube [0,1]³.",
                    "correct": num(s),
                    "wrongs": [num(a * b * c), num(2 * s), num(F(s, 3))],
                    "expl": f"div F = {a} + {b} + {c} = {s} and the volume is 1, so the flux is {s}.",
                }


@fam("Vector Calculus", "Hard")
def v_h_flux_sphere():
    for R in range(1, 9):
        yield {
            "q": f"Find the outward flux of F = ⟨x, y, z⟩ through the sphere of radius {R}.",
            "correct": pim(4 * R ** 3),
            "wrongs": [pim(F(4 * R ** 3, 3)), pim(4 * R * R), pim(3 * R ** 3)],
            "expl": f"div F = 3 and the ball's volume is (4/3)π{R ** 3}, so flux = 3·(4/3)π{R ** 3} = {pim(4 * R ** 3)}.",
        }


@fam("Vector Calculus", "Hard")
def v_h_curvature():
    for R in range(2, 14):
        yield {
            "q": f"What is the curvature of a circle of radius {R}?",
            "correct": num(F(1, R)),
            "wrongs": [num(R), num(F(1, R * R)), num(F(2, R))],
            "expl": f"A circle of radius R has constant curvature 1/R = 1/{R}.",
        }
    for a in range(2, 12):
        yield {
            "q": f"For r(t) = ⟨t, {a}t⟩, what is the curvature at t = 1?",
            "correct": "0",
            "wrongs": [num(F(1, a)), num(a), "1"],
            "expl": "The path is a straight line, so its curvature is 0 everywhere.",
        }


@fam("Vector Calculus", "Hard")
def v_h_normal_line():
    for a in range(1, 8):
        for b in range(1, 8):
            yield {
                "q": f"Find a normal vector to the surface {a}x + {b}y + z = 10.",
                "correct": vec(a, b, 1),
                "wrongs": [vec(a, b, 0), vec(1, a, b), vec(-a, -b, 10)],
                "expl": f"The gradient of {a}x + {b}y + z is ⟨{a}, {b}, 1⟩.",
            }


# ============================================================ MULTIPLE INTEGRALS
@fam("Multiple Integrals", "Easy")
def mi_e_xy():
    for a in range(1, 7):
        for b in range(1, 7):
            yield {
                "q": f"Evaluate the double integral of xy over the rectangle 0 ≤ x ≤ {a}, 0 ≤ y ≤ {b}.",
                "correct": num(F(a * a * b * b, 4)),
                "wrongs": [num(F(a * a * b * b, 2)), num(a * b), num(F(a * b, 4))],
                "expl": f"∫∫xy = (a²/2)(b²/2) = {a * a}/2 · {b * b}/2 = {num(F(a * a * b * b, 4))}.",
            }


@fam("Multiple Integrals", "Easy")
def mi_e_sum():
    for a in range(1, 7):
        for b in range(1, 7):
            yield {
                "q": f"Evaluate the double integral of (x + y) over 0 ≤ x ≤ {a}, 0 ≤ y ≤ {b}.",
                "correct": num(F(a * b * (a + b), 2)),
                "wrongs": [num(a * b * (a + b)), num(F(a * b, 2)), num(F(a * a * b * b, 2))],
                "expl": f"∫∫(x + y) = ab(a + b)/2 = {a}·{b}·{a + b}/2 = {num(F(a * b * (a + b), 2))}.",
            }


@fam("Multiple Integrals", "Easy")
def mi_e_const():
    for c in range(2, 10):
        for a in range(2, 7):
            b = a + 1
            yield {
                "q": f"Evaluate the double integral of {c} over the rectangle [0, {a}]×[0, {b}].",
                "correct": num(c * a * b),
                "wrongs": [num(c * (a + b)), num(a * b), num(F(c * a * b, 2))],
                "expl": f"A constant integrand gives {c}·area = {c}·{a * b} = {c * a * b}.",
            }


@fam("Multiple Integrals", "Easy")
def mi_e_disk_area():
    for R in range(1, 13):
        yield {
            "q": f"Evaluate the double integral of 1 over the disk of radius {R}.",
            "correct": pim(R * R),
            "wrongs": [pim(2 * R), pim(F(R * R, 2)), pim(R ** 3)],
            "expl": f"That is just the area of the disk: π{R * R}.",
        }


@fam("Multiple Integrals", "Easy")
def mi_e_power_square():
    for a in range(1, 6):
        for b in range(1, 6):
            yield {
                "q": f"Evaluate the double integral of x{sup(a)}y{sup(b)} over the unit square [0,1]×[0,1].",
                "correct": num(F(1, (a + 1) * (b + 1))),
                "wrongs": [num(F(1, a + b)), num(F(1, a * b + 1)), num(F(1, (a + 1) + (b + 1)))],
                "expl": f"Separate the integrals: (1/{a + 1})(1/{b + 1}) = {num(F(1, (a + 1) * (b + 1)))}.",
            }


@fam("Multiple Integrals", "Easy")
def mi_e_triangle():
    for a in range(2, 12):
        yield {
            "q": f"Find the area of the triangle with vertices (0, 0), ({a}, 0), (0, {a + 1}) using a double integral.",
            "correct": num(F(a * (a + 1), 2)),
            "wrongs": [num(a * (a + 1)), num(F(a * a, 2)), num(a + a + 1)],
            "expl": f"Area = ½·base·height = ½·{a}·{a + 1} = {num(F(a * (a + 1), 2))}.",
        }


@fam("Multiple Integrals", "Medium")
def mi_m_polar_r():
    for R in range(1, 11):
        yield {
            "q": f"Evaluate the double integral of √(x² + y²) over the disk of radius {R}.",
            "correct": pim(F(2 * R ** 3, 3)),
            "wrongs": [pim(F(R ** 3, 3)), pim(2 * R * R), pim(F(4 * R ** 3, 3))],
            "expl": f"In polar form: ∫₀^2π∫₀^{R} r·r dr dθ = 2π·{R ** 3}/3 = {pim(F(2 * R ** 3, 3))}.",
        }


@fam("Multiple Integrals", "Medium")
def mi_m_plane_triangle():
    for a in range(2, 12):
        yield {
            "q": f"Find the volume under z = {a} − x − y above the triangle x, y ≥ 0, x + y ≤ {a}.",
            "correct": num(F(a ** 3, 6)),
            "wrongs": [num(F(a ** 3, 3)), num(F(a ** 3, 2)), num(F(a * a, 6))],
            "expl": f"The solid is a tetrahedron-style wedge with volume a³/6 = {a ** 3}/6 = {num(F(a ** 3, 6))}.",
        }


@fam("Multiple Integrals", "Medium")
def mi_m_mass():
    for a in range(1, 7):
        for b in range(1, 7):
            if a == b:
                continue
            yield {
                "q": f"A plate [0, {a}]×[0, {b}] has density ρ(x, y) = x + y. Find its mass.",
                "correct": num(F(a * b * (a + b), 2)),
                "wrongs": [num(a * b), num(F(a * b, 2)), num(a * b * (a + b))],
                "expl": f"Mass = ∫∫(x + y)dA = ab(a + b)/2 = {num(F(a * b * (a + b), 2))}.",
            }


@fam("Multiple Integrals", "Medium")
def mi_m_order_swap():
    for n in range(1, 8):
        yield {
            "q": f"Evaluate ∫₀¹∫₀ˣ y{sup(n) if n > 1 else ''} dy dx.",
            "correct": num(F(1, (n + 1) * (n + 2))),
            "wrongs": [num(F(1, n + 1)), num(F(1, n + 2)), num(F(1, 2 * (n + 1)))],
            "expl": f"Inner integral gives x^{n + 1}/{n + 1}; integrating again gives 1/({n + 1}·{n + 2}).",
        }


@fam("Multiple Integrals", "Medium")
def mi_m_paraboloid():
    for R in range(1, 9):
        yield {
            "q": f"Find the volume between z = {R * R} − x² − y² and the plane z = 0.",
            "correct": pim(F(R ** 4, 2)),
            "wrongs": [pim(F(R ** 4, 4)), pim(R ** 4), pim(F(R ** 3, 3))],
            "expl": f"V = ∫₀^2π∫₀^{R}({R * R} − r²)r dr dθ = π{R}⁴/2 = {pim(F(R ** 4, 2))}.",
        }


@fam("Multiple Integrals", "Medium")
def mi_m_cylinder_shell():
    for R in range(1, 8):
        for h in range(1, 8):
            yield {
                "q": f"Find the volume of the cylinder of radius {R} and height {h} using a double integral.",
                "correct": pim(R * R * h),
                "wrongs": [pim(2 * R * h), pim(F(R * R * h, 3)), pim(R * h)],
                "expl": f"V = ∫∫ h dA = h·π{R * R} = {pim(R * R * h)}.",
            }


@fam("Multiple Integrals", "Medium")
def mi_m_extra():
    for a in range(1, 7):
        for b in range(1, 7):
            yield {
                "q": f"Evaluate the double integral of x²y over 0 ≤ x ≤ {a}, 0 ≤ y ≤ {b}.",
                "correct": num(F(a ** 3 * b * b, 6)),
                "wrongs": [num(F(a ** 3 * b * b, 3)), num(F(a * a * b, 6)), num(F(a ** 3 * b, 6))],
                "expl": f"(a³/3)(b²/2) = {a ** 3}/3 · {b * b}/2 = {num(F(a ** 3 * b * b, 6))}.",
            }
    for R in range(1, 10):
        yield {
            "q": f"Evaluate the double integral of (x² + y²) over the disk of radius {R}.",
            "correct": pim(F(R ** 4, 2)),
            "wrongs": [pim(F(R ** 4, 4)), pim(R ** 4), pim(F(2 * R ** 3, 3))],
            "expl": f"Polar: ∫₀^2π∫₀^{R} r²·r dr dθ = 2π{R}⁴/4 = {pim(F(R ** 4, 2))}.",
        }
    for a in range(2, 10):
        for b in range(2, 10):
            if a == b:
                continue
            yield {
                "q": f"What is the average value of f(x, y) = x over the rectangle [0, {a}]×[0, {b}]?",
                "correct": num(F(a, 2)),
                "wrongs": [num(F(b, 2)), num(F(a * b, 2)), num(F(a + b, 2))],
                "expl": f"The average of x over [0, {a}] is {a}/2, and y does not matter.",
            }


@fam("Multiple Integrals", "Hard")
def mi_h_triple_xyz():
    for a in range(1, 6):
        for b in range(1, 6):
            for c in range(1, 5):
                yield {
                    "q": f"Evaluate the triple integral of xyz over the box [0,{a}]×[0,{b}]×[0,{c}].",
                    "correct": num(F(a * a * b * b * c * c, 8)),
                    "wrongs": [num(F(a * a * b * b * c * c, 4)), num(a * b * c),
                               num(F(a * b * c, 8))],
                    "expl": f"Separate: (a²/2)(b²/2)(c²/2) = {a * a}·{b * b}·{c * c}/8 = {num(F(a * a * b * b * c * c, 8))}.",
                }


@fam("Multiple Integrals", "Hard")
def mi_h_triple_sum():
    for a in range(1, 6):
        for b in range(1, 6):
            for c in range(1, 5):
                yield {
                    "q": f"Evaluate the triple integral of (x + y + z) over [0,{a}]×[0,{b}]×[0,{c}].",
                    "correct": num(F(a * b * c * (a + b + c), 2)),
                    "wrongs": [num(a * b * c * (a + b + c)), num(F(a * b * c, 2)),
                               num(F(a * b * c * (a + b + c), 3))],
                    "expl": f"Each variable contributes abc·(that side)/2, giving abc(a + b + c)/2 = {num(F(a * b * c * (a + b + c), 2))}.",
                }


@fam("Multiple Integrals", "Hard")
def mi_h_sphere_rho():
    for R in range(1, 10):
        yield {
            "q": f"Evaluate the triple integral of √(x² + y² + z²) over the ball of radius {R}.",
            "correct": pim(R ** 4),
            "wrongs": [pim(F(4 * R ** 3, 3)), pim(F(R ** 4, 2)), pim(4 * R ** 4)],
            "expl": f"∫₀^{R} ρ·ρ²dρ·4π = 4π{R}⁴/4 = π{R ** 4}.",
        }


@fam("Multiple Integrals", "Hard")
def mi_h_cone():
    for R in range(1, 8):
        for h in range(2, 9):
            yield {
                "q": f"Find the volume of the cone of base radius {R} and height {h} by integration.",
                "correct": pim(F(R * R * h, 3)),
                "wrongs": [pim(R * R * h), pim(F(R * R * h, 2)), pim(F(R * h, 3))],
                "expl": f"V = (1/3)πR²h = π·{R * R}·{h}/3 = {pim(F(R * R * h, 3))}.",
            }


@fam("Multiple Integrals", "Hard")
def mi_h_centroid():
    for R in range(1, 12):
        yield {
            "q": f"Find x̄ for the quarter disk of radius {R} in the first quadrant.",
            "correct": f"{num(4 * R)}/(3π)",
            "wrongs": [f"{num(R)}/(3π)", f"{num(4 * R)}/(3π²)", f"{num(2 * R)}/(3π)"],
            "expl": f"x̄ = 4R/(3π) = {4 * R}/(3π).",
        }


@fam("Multiple Integrals", "Hard")
def mi_h_gaussian_like():
    for a in range(1, 9):
        yield {
            "q": f"Evaluate the double integral of e^(−(x² + y²)) over the disk of radius {a} (leave π and e).",
            "correct": f"π(1 − e^(−{a * a}))",
            "wrongs": [f"π(1 − e^(−{a}))", f"2π(1 − e^(−{a * a}))", f"π e^(−{a * a})"],
            "expl": f"Polar form: 2π∫₀^{a} re^(−r²)dr = π(1 − e^(−{a * a})).",
        }


# ========================================================= LAGRANGE MULTIPLIERS
@fam("Lagrange Multipliers", "Easy")
def lg_e_min_circle():
    for k in range(2, 26):
        yield {
            "q": f"Minimise f(x, y) = x² + y² subject to x + y = {k}. What is the minimum value?",
            "correct": num(F(k * k, 2)),
            "wrongs": [num(F(k * k, 4)), num(k * k), num(F(k, 2))],
            "expl": f"Symmetry gives x = y = {num(F(k, 2))}, so f = 2·({k}/2)² = {num(F(k * k, 2))}.",
        }


@fam("Lagrange Multipliers", "Easy")
def lg_e_max_product():
    for k in range(2, 26):
        yield {
            "q": f"Maximise f(x, y) = xy subject to x + y = {k}. What is the maximum value?",
            "correct": num(F(k * k, 4)),
            "wrongs": [num(F(k * k, 2)), num(F(k, 2)), num(k * k)],
            "expl": f"x = y = {num(F(k, 2))} gives xy = {k}²/4 = {num(F(k * k, 4))}.",
        }


@fam("Lagrange Multipliers", "Easy")
def lg_e_lambda():
    for k in range(2, 24):
        yield {
            "q": f"For minimising x² + y² on x + y = {k}, what is the multiplier λ?",
            "correct": num(k),
            "wrongs": [num(F(k, 2)), num(2 * k), num(F(k * k, 2))],
            "expl": f"2x = λ and 2y = λ with x = y = {num(F(k, 2))} give λ = {k}.",
        }


@fam("Lagrange Multipliers", "Easy")
def lg_e_point():
    for k in range(2, 24, 1):
        yield {
            "q": f"Where does x² + y² attain its minimum on the line x + y = {k}?",
            "correct": pt(F(k, 2), F(k, 2)),
            "wrongs": [pt(k, 0), pt(0, k), pt(F(k, 4), F(k, 4))],
            "expl": f"The closest point to the origin on the line is ({num(F(k, 2))}, {num(F(k, 2))}).",
        }


@fam("Lagrange Multipliers", "Easy")
def lg_e_rect():
    for p in range(4, 40, 2):
        yield {
            "q": f"A rectangle has perimeter {p}. What is its greatest possible area?",
            "correct": num(F(p * p, 16)),
            "wrongs": [num(F(p * p, 4)), num(F(p, 4)), num(F(p * p, 8))],
            "expl": f"The square with side {num(F(p, 4))} maximises area: ({num(F(p, 4))})² = {num(F(p * p, 16))}.",
        }


@fam("Lagrange Multipliers", "Medium")
def lg_m_linear_circle():
    for (u, v, r) in TRIPLES:
        for R in range(1, 5):
            yield {
                "q": f"Maximise {u}x + {v}y subject to x² + y² = {R * R}. What is the maximum?",
                "correct": num(R * r),
                "wrongs": [num(R * (u + v)), num(r), num(R * R * r)],
                "expl": f"The maximum is |⟨{u},{v}⟩|·R = {r}·{R} = {R * r}.",
            }


@fam("Lagrange Multipliers", "Medium")
def lg_m_distance_line():
    for (u, v, r) in TRIPLES:
        for c in range(1, 6):
            yield {
                "q": f"Find the minimum of x² + y² subject to {u}x + {v}y = {c * r}.",
                "correct": num(c * c),
                "wrongs": [num(c), num(c * r), num(F(c * c, r))],
                "expl": f"The distance to the line is {c * r}/{r} = {c}, so the minimum of x² + y² is {c}² = {c * c}.",
            }


@fam("Lagrange Multipliers", "Medium")
def lg_m_ellipse():
    for a in range(2, 10):
        for b in range(1, a):
            yield {
                "q": f"Maximise xy on the ellipse x²/{a * a} + y²/{b * b} = 1.",
                "correct": num(F(a * b, 2)),
                "wrongs": [num(a * b), num(F(a * b, 4)), num(F(a * a * b * b, 2))],
                "expl": f"With x = a/√2 and y = b/√2 the product is ab/2 = {num(F(a * b, 2))}.",
            }


@fam("Lagrange Multipliers", "Medium")
def lg_m_three_plane():
    for k in range(2, 26):
        yield {
            "q": f"Minimise x² + y² + z² subject to x + y + z = {k}.",
            "correct": num(F(k * k, 3)),
            "wrongs": [num(F(k * k, 2)), num(F(k * k, 9)), num(F(k, 3))],
            "expl": f"x = y = z = {num(F(k, 3))} gives 3·({k}/3)² = {num(F(k * k, 3))}.",
        }


@fam("Lagrange Multipliers", "Medium")
def lg_m_hyperbola():
    for c in range(2, 26):
        yield {
            "q": f"Minimise x² + y² subject to xy = {c} with x, y > 0.",
            "correct": num(2 * c),
            "wrongs": [num(c), num(4 * c), num(c * c)],
            "expl": f"x = y = √{c} gives x² + y² = 2·{c} = {2 * c}.",
        }


@fam("Lagrange Multipliers", "Hard")
def lg_h_xyz():
    for k in range(3, 30, 3):
        yield {
            "q": f"Maximise xyz subject to x + y + z = {k} with x, y, z > 0.",
            "correct": num(F(k ** 3, 27)),
            "wrongs": [num(F(k ** 3, 9)), num(F(k ** 3, 3)), num(F(k * k, 27))],
            "expl": f"x = y = z = {k // 3} gives xyz = ({k}/3)³ = {num(F(k ** 3, 27))}.",
        }


@fam("Lagrange Multipliers", "Hard")
def lg_h_cobb():
    for a in range(1, 6):
        for b in range(1, 6):
            for k in (6, 12, 18, 24):
                yield {
                    "q": f"Maximise x{sup(a)}y{sup(b)} subject to x + y = {k}. What is the optimal x?",
                    "correct": num(F(k * a, a + b)),
                    "wrongs": [num(F(k * b, a + b)), num(F(k, 2)), num(F(k * a, b))],
                    "expl": f"The optimum splits the budget in the exponent ratio: x = {k}·{a}/{a + b} = {num(F(k * a, a + b))}.",
                }


@fam("Lagrange Multipliers", "Hard")
def lg_h_sphere_linear():
    for R in range(1, 10):
        yield {
            "q": f"Maximise x + 2y + 3z subject to x² + y² + z² = {R * R}.",
            "correct": f"{R}√14",
            "wrongs": [f"{R}√6", f"{R * R}√14", f"6{R}"],
            "expl": f"The maximum is |⟨1,2,3⟩|·R = √14·{R}.",
        }
    for R in range(2, 13):
        yield {
            "q": f"Maximise x + y subject to x² + y² = {R * R}.",
            "correct": f"{R}√2",
            "wrongs": [f"{R * R}√2", num(2 * R), f"{R}√3"],
            "expl": f"The maximum is √2·R = {R}√2.",
        }


@fam("Lagrange Multipliers", "Hard")
def lg_h_box():
    for V in (8, 27, 64, 125, 216, 343, 512, 729, 1000):
        s = round(V ** (1 / 3))
        yield {
            "q": f"A closed rectangular box must have volume {V}. What is the least possible surface area?",
            "correct": num(6 * s * s),
            "wrongs": [num(4 * s * s), num(6 * s), num(s ** 3)],
            "expl": f"The cube of side {s} is optimal, giving 6·{s * s} = {6 * s * s}.",
        }


@fam("Lagrange Multipliers", "Hard")
def lg_h_two_constraints():
    for c in range(1, 12):
        yield {
            "q": f"Minimise x² + y² + z² subject to x + y + z = {3 * c} and x − y = 0.",
            "correct": num(3 * c * c),
            "wrongs": [num(c * c), num(9 * c * c), num(6 * c * c)],
            "expl": f"x = y = z = {c} satisfies both constraints and gives 3·{c * c} = {3 * c * c}.",
        }


@fam("Lagrange Multipliers", "Hard")
def lg_h_cylinder():
    for V in (16, 54, 128, 250, 432, 686):
        # V = 2πr³ optimum for open-top? use closed can: r = (V/(2π))^(1/3)
        yield {
            "q": f"For a closed cylindrical can of volume {V}π, the optimal radius satisfies which relation?",
            "correct": "h = 2r",
            "wrongs": ["h = r", "h = 4r", "r = 2h"],
            "expl": "Minimising 2πr² + 2πrh with πr²h fixed forces h = 2r for every volume.",
        }


# ============================================================ DIVERGENCE & CURL
@fam("Divergence & Curl", "Easy")
def dc_e_div():
    for a in range(1, 7):
        for b in range(1, 7):
            for c in range(1, 7):
                yield {
                    "q": f"Compute div F for F = ⟨{a}x, {b}y, {c}z⟩.",
                    "correct": num(a + b + c),
                    "wrongs": [num(a * b * c), num(a + b - c), num(2 * (a + b + c))],
                    "expl": f"div F = {a} + {b} + {c} = {a + b + c}.",
                }


@fam("Divergence & Curl", "Easy")
def dc_e_curl_rot():
    for a in range(1, 13):
        yield {
            "q": f"Compute curl F for F = ⟨−{a}y, {a}x, 0⟩.",
            "correct": vec(0, 0, 2 * a),
            "wrongs": [vec(0, 0, a), vec(0, 0, -2 * a), vec(2 * a, 0, 0)],
            "expl": f"Only the k-component survives: ∂({a}x)/∂x − ∂(−{a}y)/∂y = {a} + {a} = {2 * a}.",
        }


@fam("Divergence & Curl", "Easy")
def dc_e_div_squares():
    for x0 in range(1, 6):
        for y0 in range(1, 6):
            for z0 in range(1, 5):
                s = 2 * (x0 + y0 + z0)
                yield {
                    "q": f"For F = ⟨x², y², z²⟩, compute div F at ({x0}, {y0}, {z0}).",
                    "correct": num(s),
                    "wrongs": [num(x0 + y0 + z0), num(2 * x0 * y0 * z0), num(x0 * x0 + y0 * y0 + z0 * z0)],
                    "expl": f"div F = 2x + 2y + 2z = 2({x0} + {y0} + {z0}) = {s}.",
                }


@fam("Divergence & Curl", "Easy")
def dc_e_curl_shear():
    for a in range(1, 8):
        for b in range(1, 8):
            yield {
                "q": f"Compute curl F for F = ⟨{a}y, {b}x, 0⟩.",
                "correct": vec(0, 0, b - a),
                "wrongs": [vec(0, 0, a - b), vec(0, 0, a + b), vec(b - a, 0, 0)],
                "expl": f"curl F = ({b} − {a})k = {b - a}k.",
            }


@fam("Divergence & Curl", "Easy")
def dc_e_div_power():
    for a in range(1, 6):
        for b in range(1, 6):
            for c in range(1, 6):
                yield {
                    "q": f"For F = ⟨x{sup(a)}, y{sup(b)}, z{sup(c)}⟩, compute div F at (1, 1, 1).",
                    "correct": num(a + b + c),
                    "wrongs": [num(a * b * c), num(a + b + c - 3), num(3)],
                    "expl": f"div F = ax^(a−1) + by^(b−1) + cz^(c−1) = {a} + {b} + {c} at (1, 1, 1).",
                }


@fam("Divergence & Curl", "Medium")
def dc_m_laplacian():
    for a in range(1, 7):
        for b in range(1, 7):
            for c in range(1, 7):
                yield {
                    "q": f"Compute ∇·∇f for f = {a}x² + {b}y² + {c}z².",
                    "correct": num(2 * (a + b + c)),
                    "wrongs": [num(a + b + c), num(4 * (a + b + c)), num(2 * a * b * c)],
                    "expl": f"The Laplacian is 2{a} + 2{b} + 2{c} = {2 * (a + b + c)}.",
                }


@fam("Divergence & Curl", "Medium")
def dc_m_div_point():
    for x0 in range(1, 6):
        for y0 in range(1, 6):
            for z0 in range(1, 5):
                yield {
                    "q": f"For F = ⟨xy, yz, zx⟩, compute div F at ({x0}, {y0}, {z0}).",
                    "correct": num(x0 + y0 + z0),
                    "wrongs": [num(x0 * y0 * z0), num(2 * (x0 + y0 + z0)), num(x0 * y0 + y0 * z0 + z0 * x0)],
                    "expl": f"div F = y + z + x = {y0} + {z0} + {x0} = {x0 + y0 + z0}.",
                }


@fam("Divergence & Curl", "Medium")
def dc_m_curl_zero():
    for a in range(1, 10):
        yield {
            "q": f"Compute curl F for F = ⟨{a}yz, {a}xz, {a}xy⟩.",
            "correct": vec(0, 0, 0),
            "wrongs": [vec(0, 0, a), vec(a, a, a), vec(2 * a, 0, 0)],
            "expl": f"F = ∇({a}xyz), and the curl of any gradient is zero.",
        }


@fam("Divergence & Curl", "Medium")
def dc_m_laplacian_power():
    for a in range(2, 8):
        for b in range(2, 8):
            yield {
                "q": f"Compute the Laplacian of f = x{sup(a)}y{sup(b)} at (1, 1).",
                "correct": num(a * (a - 1) + b * (b - 1)),
                "wrongs": [num(a * b), num(a * (a - 1) * b * (b - 1)), num(a + b)],
                "expl": f"f_xx + f_yy = a(a−1) + b(b−1) = {a * (a - 1)} + {b * (b - 1)} at (1, 1).",
            }


@fam("Divergence & Curl", "Medium")
def dc_m_identity():
    for a in range(1, 8):
        for b in range(1, 8):
            yield {
                "q": f"What is div(curl F) for F = ⟨{a}xz, {b}y², xy⟩?",
                "correct": "0",
                "wrongs": [num(a + b), num(a * b), num(2 * b)],
                "expl": "div(curl F) = 0 for every twice-differentiable field, whatever the components are.",
            }


@fam("Divergence & Curl", "Medium")
def dc_m_curl_component():
    for a in range(1, 8):
        for b in range(1, 8):
            yield {
                "q": f"For F = ⟨0, {a}z, {b}y⟩, compute curl F.",
                "correct": vec(b - a, 0, 0),
                "wrongs": [vec(a - b, 0, 0), vec(0, 0, b - a), vec(a + b, 0, 0)],
                "expl": f"The i-component is ∂({b}y)/∂y − ∂({a}z)/∂z = {b} − {a}; the others vanish.",
            }


@fam("Divergence & Curl", "Hard")
def dc_h_flux_sphere():
    for a in range(1, 5):
        for b in range(1, 5):
            for c in range(1, 5):
                for R in (1, 2, 3):
                    s = a + b + c
                    yield {
                        "q": f"Use the divergence theorem: find the flux of F = ⟨{a}x, {b}y, {c}z⟩ out of the sphere of radius {R}.",
                        "correct": pim(F(4 * s * R ** 3, 3)),
                        "wrongs": [pim(F(4 * R ** 3, 3)), pim(4 * s * R * R), pim(s * R ** 3)],
                        "expl": f"div F = {s} and the ball volume is (4/3)π{R ** 3}, so the flux is {num(F(4 * s * R ** 3, 3))}π.",
                    }


@fam("Divergence & Curl", "Hard")
def dc_h_flux_cube():
    for a in range(1, 6):
        for b in range(1, 6):
            for s in range(1, 5):
                yield {
                    "q": f"Find the flux of F = ⟨{a}x, {b}y, z⟩ out of the cube of side {s} with a corner at the origin.",
                    "correct": num((a + b + 1) * s ** 3),
                    "wrongs": [num((a + b + 1) * s * s), num((a + b) * s ** 3), num(a * b * s ** 3)],
                    "expl": f"div F = {a + b + 1} and the volume is {s ** 3}, so flux = {(a + b + 1) * s ** 3}.",
                }


@fam("Divergence & Curl", "Hard")
def dc_h_radial():
    for n in range(1, 10):
        yield {
            "q": f"For F = ⟨x, y, z⟩, compute div({n}F).",
            "correct": num(3 * n),
            "wrongs": [num(n), num(3), num(n ** 3)],
            "expl": f"div(cF) = c·div F = {n}·3 = {3 * n}.",
        }


@fam("Divergence & Curl", "Hard")
def dc_h_curl_grad():
    for a in range(1, 10):
        for b in range(1, 6):
            yield {
                "q": f"What is curl(∇f) for f = {a}x²y + {b}yz³?",
                "correct": vec(0, 0, 0),
                "wrongs": [vec(a, b, 0), vec(0, 0, a), vec(2 * a, 3 * b, 0)],
                "expl": "Curl of a gradient is always the zero vector.",
            }


@fam("Divergence & Curl", "Hard")
def dc_h_solenoidal():
    for a in range(1, 8):
        for b in range(1, 8):
            c = a + b
            yield {
                "q": f"For which value of c is F = ⟨{a}x, {b}y, −cz⟩ divergence-free?",
                "correct": num(c),
                "wrongs": [num(a * b), num(a - b), num(2 * c)],
                "expl": f"div F = {a} + {b} − c = 0 needs c = {c}.",
            }


@fam("Divergence & Curl", "Hard")
def dc_h_stokes_link():
    for a in range(1, 10):
        for R in (1, 2, 3):
            yield {
                "q": f"F = ⟨−{a}y, {a}x, 0⟩. Find the flux of curl F through the disk of radius {R} in the plane z = 0.",
                "correct": pim(2 * a * R * R),
                "wrongs": [pim(a * R * R), pim(2 * a * R), pim(4 * a * R * R)],
                "expl": f"curl F = {2 * a}k, so the flux is {2 * a}·π{R * R} = {pim(2 * a * R * R)}.",
            }


# ============================================================== STOKES' THEOREM
@fam("Stokes' Theorem", "Easy")
def st_e_curl():
    for a in range(1, 13):
        yield {
            "q": f"For F = ⟨−{a}y, {a}x, 0⟩, what is curl F?",
            "correct": f"{2 * a}k",
            "wrongs": [f"{a}k", f"−{2 * a}k", f"{2 * a}i"],
            "expl": f"curl F = ({a} + {a})k = {2 * a}k.",
        }


@fam("Stokes' Theorem", "Easy")
def st_e_unit_circle():
    for a in range(1, 13):
        yield {
            "q": f"Find the circulation of F = ⟨−{a}y, {a}x, 0⟩ counterclockwise around the unit circle.",
            "correct": pim(2 * a),
            "wrongs": [pim(a), pim(4 * a), "0"],
            "expl": f"Stokes: flux of {2 * a}k over the unit disk = {2 * a}π.",
        }


@fam("Stokes' Theorem", "Easy")
def st_e_gradient():
    for a in range(1, 10):
        for b in range(1, 6):
            yield {
                "q": f"F = ∇({a}x²y + {b}y). What is ∮F·dr around any closed curve?",
                "correct": "0",
                "wrongs": [num(a), num(a + b), num(2 * a)],
                "expl": "curl(∇f) = 0, so Stokes gives zero circulation on every closed loop.",
            }


@fam("Stokes' Theorem", "Easy")
def st_e_orientation():
    for R in range(1, 13):
        yield {
            "q": f"For the disk of radius {R} in the plane z = 0 with counterclockwise boundary, which normal does Stokes' theorem require?",
            "correct": "+k (upward)",
            "wrongs": ["−k (downward)", "+i", "Any normal works"],
            "expl": "Right-hand rule: a counterclockwise boundary in the xy-plane pairs with the upward normal.",
        }


@fam("Stokes' Theorem", "Easy")
def st_e_area_form():
    for R in range(1, 13):
        yield {
            "q": f"Evaluate ∮ x dy counterclockwise around the circle of radius {R}.",
            "correct": pim(R * R),
            "wrongs": [pim(2 * R * R), pim(2 * R), "0"],
            "expl": f"∮x dy equals the enclosed area, π{R * R}.",
        }


@fam("Stokes' Theorem", "Easy")
def st_e_extra():
    for R in range(1, 13):
        yield {
            "q": f"Evaluate ∮ y dx counterclockwise around the circle of radius {R}.",
            "correct": pim(-R * R),
            "wrongs": [pim(R * R), pim(2 * R * R), "0"],
            "expl": f"By Green's theorem ∮y dx = −Area = −π{R * R}.",
        }
    for a in range(1, 8):
        for b in range(1, 8):
            yield {
                "q": f"For F = ⟨{a}x, {b}y, 0⟩, what is curl F?",
                "correct": "0 (the zero vector)",
                "wrongs": [f"{a + b}k", f"{b - a}k", f"⟨{a}, {b}, 0⟩"],
                "expl": f"F is the gradient of {a}x²/2 + {b}y²/2, so its curl vanishes.",
            }


@fam("Stokes' Theorem", "Medium")
def st_m_circle_R():
    for a in range(1, 8):
        for R in range(1, 8):
            yield {
                "q": f"Find the circulation of F = ⟨−{a}y, {a}x, 0⟩ around the circle of radius {R} (counterclockwise, z = 0).",
                "correct": pim(2 * a * R * R),
                "wrongs": [pim(a * R * R), pim(2 * a * R), pim(4 * a * R * R)],
                "expl": f"curl F = {2 * a}k and the disk area is π{R * R}, so the circulation is {2 * a * R * R}π.",
            }


@fam("Stokes' Theorem", "Medium")
def st_m_shear():
    for a in range(1, 7):
        for b in range(a + 1, 9):
            for R in (1, 2, 3):
                yield {
                    "q": f"Find ∮F·dr for F = ⟨{a}y, {b}x, 0⟩ counterclockwise around the circle of radius {R}.",
                    "correct": pim((b - a) * R * R),
                    "wrongs": [pim((a + b) * R * R), pim((b - a) * R), pim((b - a) * 2 * R * R)],
                    "expl": f"The scalar curl is {b} − {a} = {b - a}, times the area π{R * R}.",
                }


@fam("Stokes' Theorem", "Medium")
def st_m_ellipse():
    for p in range(2, 8):
        for q in range(1, p):
            yield {
                "q": f"Find ∮F·dr for F = ⟨−y, x, 0⟩ around the ellipse with semi-axes {p} and {q}.",
                "correct": pim(2 * p * q),
                "wrongs": [pim(p * q), pim(4 * p * q), pim(p + q)],
                "expl": f"Scalar curl 2 times the ellipse area π·{p}·{q} gives {2 * p * q}π.",
            }


@fam("Stokes' Theorem", "Medium")
def st_m_const_curl():
    for k in range(2, 10):
        for A in (4, 6, 9, 12, 16):
            yield {
                "q": f"curl F = {k}k throughout, and S is a flat region in z = 0 of area {A}. Find ∮F·dr around ∂S.",
                "correct": num(k * A),
                "wrongs": [num(k + A), num(F(k * A, 2)), num(2 * k * A)],
                "expl": f"Flux of a constant curl = {k}·{A} = {k * A}.",
            }


@fam("Stokes' Theorem", "Medium")
def st_m_triangle():
    for u in range(2, 8):
        for v in range(2, 8):
            yield {
                "q": f"Find ∮F·dr for F = ⟨−y, x, 0⟩ around the triangle (0,0), ({u},0), (0,{v}) counterclockwise.",
                "correct": num(u * v),
                "wrongs": [num(F(u * v, 2)), num(2 * u * v), num(u + v)],
                "expl": f"Scalar curl 2 times area {num(F(u * v, 2))} gives {u * v}.",
            }


@fam("Stokes' Theorem", "Hard")
def st_h_plane_triangle():
    for a in range(1, 10):
        yield {
            "q": f"F = ⟨{a}z, {a}x, {a}y⟩. Find the circulation around the triangle cut from x + y + z = 1 by the first octant (counterclockwise from above).",
            "correct": num(F(3 * a, 2)),
            "wrongs": [num(3 * a), num(F(a, 2)), num(a)],
            "expl": f"curl F = {a}⟨1,1,1⟩; with n = ⟨1,1,1⟩/√3 and area √3/2 the flux is {a}·√3·(√3/2) = {num(F(3 * a, 2))}.",
        }


@fam("Stokes' Theorem", "Hard")
def st_h_closed_surface():
    for a in range(1, 12):
        yield {
            "q": f"What is the flux of curl F through the whole sphere x² + y² + z² = {a * a}?",
            "correct": "0",
            "wrongs": [pim(4 * a * a), num(a), pim(2 * a)],
            "expl": "A closed surface has no boundary curve, so Stokes' theorem forces the flux of a curl to vanish.",
        }


@fam("Stokes' Theorem", "Hard")
def st_h_shear_triangle():
    for a in range(1, 6):
        for b in range(a + 1, 8):
            for u in (2, 3, 4):
                area = F(u * u, 2)
                yield {
                    "q": f"Find ∮F·dr for F = ⟨{a}y, {b}x, 0⟩ around the triangle (0,0), ({u},0), (0,{u}).",
                    "correct": num((b - a) * area),
                    "wrongs": [num((a + b) * area), num((b - a) * u * u), num((b - a) * u)],
                    "expl": f"Scalar curl {b - a} times the area {num(area)} gives {num((b - a) * area)}.",
                }


@fam("Stokes' Theorem", "Hard")
def st_h_hemisphere():
    for a in range(1, 8):
        for R in (1, 2, 3):
            yield {
                "q": f"F = ⟨−{a}y, {a}x, 0⟩. Find the flux of curl F through the upper hemisphere of radius {R} (boundary the circle z = 0).",
                "correct": pim(2 * a * R * R),
                "wrongs": [pim(4 * a * R * R), pim(2 * a * R ** 3), pim(a * R * R)],
                "expl": f"Stokes replaces the hemisphere with its boundary circle, giving the same {2 * a * R * R}π as the flat disk.",
            }


@fam("Stokes' Theorem", "Hard")
def st_h_square_loop():
    for a in range(1, 7):
        for s in range(1, 7):
            yield {
                "q": f"Find ∮F·dr for F = ⟨−{a}y, {a}x, 0⟩ around the square [0,{s}]×[0,{s}] counterclockwise.",
                "correct": num(2 * a * s * s),
                "wrongs": [num(a * s * s), num(4 * a * s), num(2 * a * s)],
                "expl": f"curl F = {2 * a}k and the area is {s * s}, so the circulation is {2 * a * s * s}.",
            }


@fam("Stokes' Theorem", "Hard")
def st_h_rectangle():
    for a in range(1, 8):
        for b in range(1, 8):
            if a == b:
                continue
            yield {
                "q": f"Find ∮F·dr for F = ⟨−y, x, 0⟩ around the rectangle [0,{a}]×[0,{b}] counterclockwise.",
                "correct": num(2 * a * b),
                "wrongs": [num(a * b), num(4 * a * b), num(2 * (a + b))],
                "expl": f"Scalar curl 2 times area {a * b} = {2 * a * b}.",
            }
    for a in range(1, 6):
        for b in range(a + 1, 8):
            for s in (2, 3):
                yield {
                    "q": f"Find ∮F·dr for F = ⟨{a}y, {b}x, 0⟩ around the square [0,{s}]×[0,{s}] counterclockwise.",
                    "correct": num((b - a) * s * s),
                    "wrongs": [num((a + b) * s * s), num((b - a) * s), num((b - a) * 2 * s * s)],
                    "expl": f"({b} − {a}) times the area {s * s} gives {(b - a) * s * s}.",
                }


@fam("Stokes' Theorem", "Hard")
def st_h_projection():
    for a in range(1, 10):
        yield {
            "q": f"S is the part of z = {a} − x − y over the unit disk, and curl F = ⟨0, 0, 4⟩. Find the flux through S (upward normal).",
            "correct": pim(4),
            "wrongs": [pim(4 * a), pim(2), pim(4 * a * a)],
            "expl": "Only the k-component of the curl matters and the projected area is π, so the flux is 4π regardless of the tilt constant.",
        }
