# -*- coding: utf-8 -*-
"""Problem families for Linear Algebra and Probability & Statistics topics."""
from fractions import Fraction as F
from math import comb, factorial, exp

from _pgen_core import fam, num, sup, pt, vec, is_square, rt

TRIPLES = [(3, 4, 5), (6, 8, 10), (5, 12, 13), (8, 15, 17), (9, 12, 15),
           (7, 24, 25), (12, 16, 20), (20, 21, 29), (10, 24, 26),
           (15, 20, 25), (18, 24, 30), (9, 40, 41), (12, 35, 37)]


def mat2(a, b, c, d):
    return f"[[{a}, {b}], [{c}, {d}]]"


def det2(a, b, c, d):
    return a * d - b * c


# ==================================================== VECTORS & VECTOR SPACES
@fam("Vectors & Vector Spaces", "Easy")
def vs_e_add():
    for a in range(-5, 6):
        for b in range(-5, 6):
            if a == 0 and b == 0:
                continue
            c, d = b + 2, a - 3
            yield {
                "q": f"Compute ⟨{a}, {b}⟩ + ⟨{c}, {d}⟩.",
                "correct": vec(a + c, b + d),
                "wrongs": [vec(a - c, b - d), vec(a * c, b * d), vec(a + d, b + c)],
                "expl": f"Add componentwise: ({a} + {c}, {b} + {d}) = ({a + c}, {b + d}).",
            }


@fam("Vectors & Vector Spaces", "Easy")
def vs_e_scalar():
    for k in range(2, 9):
        for a in range(1, 7):
            b = a + 3
            yield {
                "q": f"Compute {k}⟨{a}, {b}⟩.",
                "correct": vec(k * a, k * b),
                "wrongs": [vec(a + k, b + k), vec(k * a, b), vec(k * b, k * a)],
                "expl": f"Scale both components: ({k}·{a}, {k}·{b}).",
            }


@fam("Vectors & Vector Spaces", "Easy")
def vs_e_dot3():
    for a in range(1, 7):
        for b in range(1, 7):
            for c in range(1, 6):
                yield {
                    "q": f"Compute ⟨{a}, {b}, {c}⟩ · ⟨2, 3, 4⟩.",
                    "correct": num(2 * a + 3 * b + 4 * c),
                    "wrongs": [num(a + b + c), num(2 * a * 3 * b * 4 * c), num(4 * a + 3 * b + 2 * c)],
                    "expl": f"2·{a} + 3·{b} + 4·{c} = {2 * a + 3 * b + 4 * c}.",
                }


@fam("Vectors & Vector Spaces", "Easy")
def vs_e_norm():
    for (u, v, r) in TRIPLES:
        for s in (1, -1):
            yield {
                "q": f"Find the magnitude of ⟨{s * u}, {v}⟩.",
                "correct": num(r),
                "wrongs": [num(u + v), num(r * r), num(abs(v - u))],
                "expl": f"√({u * u} + {v * v}) = √{r * r} = {r}.",
            }


@fam("Vectors & Vector Spaces", "Easy")
def vs_e_sub():
    for a in range(1, 8):
        for b in range(1, 8):
            c, d = a + 4, b - 5
            yield {
                "q": f"Compute ⟨{c}, {d}⟩ − ⟨{a}, {b}⟩.",
                "correct": vec(c - a, d - b),
                "wrongs": [vec(a - c, b - d), vec(c + a, d + b), vec(c - b, d - a)],
                "expl": f"Subtract componentwise: ({c} − {a}, {d} − {b}) = ({c - a}, {d - b}).",
            }


@fam("Vectors & Vector Spaces", "Easy")
def vs_e_combo():
    for s in range(2, 7):
        for t in range(1, 6):
            yield {
                "q": f"Compute {s}⟨1, 2⟩ + {t}⟨3, −1⟩.",
                "correct": vec(s + 3 * t, 2 * s - t),
                "wrongs": [vec(s + t, 2 * s + t), vec(3 * s + t, 2 * t - s), vec(s * 3 * t, 2 * s * t)],
                "expl": f"({s} + 3·{t}, 2·{s} − {t}) = ({s + 3 * t}, {2 * s - t}).",
            }


@fam("Vectors & Vector Spaces", "Medium")
def vs_m_cross():
    for a in range(1, 7):
        for b in range(1, 7):
            for c in range(1, 5):
                # ⟨a, b, 0⟩ × ⟨0, c, 1⟩ = ⟨b·1 − 0·c, 0·0 − a·1, a·c − 0⟩
                res = (b, -a, a * c)
                yield {
                    "q": f"Compute ⟨{a}, {b}, 0⟩ × ⟨0, {c}, 1⟩.",
                    "correct": vec(*res),
                    "wrongs": [vec(-b, a, -a * c), vec(b, a, a * c), vec(a * c, b, -a)],
                    "expl": f"Expanding the determinant gives ⟨{b}, −{a}, {a * c}⟩.",
                }


@fam("Vectors & Vector Spaces", "Medium")
def vs_m_angle():
    for a in range(1, 9):
        for b in range(1, 9):
            yield {
                "q": f"What is the angle between ⟨{a}, {b}⟩ and ⟨{-b}, {a}⟩?",
                "correct": "90°",
                "wrongs": ["0°", "45°", "180°"],
                "expl": f"Their dot product is −{a * b} + {a * b} = 0, so the vectors are perpendicular.",
            }


@fam("Vectors & Vector Spaces", "Medium")
def vs_m_projection():
    for (u, v, r) in TRIPLES:
        for k in range(1, 5):
            comp = F(k * u + k * v * 0 + 0, 1)
            scal = F(k * u, r)
            yield {
                "q": f"Find the scalar projection of ⟨{k}, 0⟩ onto ⟨{u}, {v}⟩.",
                "correct": num(scal),
                "wrongs": [num(F(k * u, r * r)), num(k * u), num(F(k, r))],
                "expl": f"comp = (u·v)/|v| = {k * u}/{r} = {num(scal)}.",
            }


@fam("Vectors & Vector Spaces", "Medium")
def vs_m_parallelogram():
    for a in range(1, 7):
        for b in range(1, 7):
            for c in range(1, 6):
                d = c + 3
                area = abs(a * d - b * c)
                if area == 0:
                    continue
                yield {
                    "q": f"Find the area of the parallelogram spanned by ⟨{a}, {b}⟩ and ⟨{c}, {d}⟩.",
                    "correct": num(area),
                    "wrongs": [num(a * d + b * c), num(F(area, 2)), num(a * c + b * d)],
                    "expl": f"Area = |{a}·{d} − {b}·{c}| = {area}.",
                }


@fam("Vectors & Vector Spaces", "Medium")
def vs_m_independence():
    for a in range(1, 8):
        for b in range(1, 8):
            for k in range(2, 5):
                dep = True
                yield {
                    "q": f"Are ⟨{a}, {b}⟩ and ⟨{k * a}, {k * b}⟩ linearly independent?",
                    "correct": "No — one is a multiple of the other",
                    "wrongs": ["Yes", "Only if a ≠ b", "Only in ℝ³"],
                    "expl": f"The second vector is {k} times the first, so the set is dependent.",
                }


@fam("Vectors & Vector Spaces", "Medium")
def vs_m_unit3():
    for a in range(1, 7):
        for b in range(1, 7):
            for c in range(1, 7):
                s = a * a + b * b + c * c
                if not is_square(s):
                    continue
                r = int(round(s ** 0.5))
                yield {
                    "q": f"Find |⟨{a}, {b}, {c}⟩|.",
                    "correct": num(r),
                    "wrongs": [num(a + b + c), num(s), num(r + 1)],
                    "expl": f"√({a * a} + {b * b} + {c * c}) = √{s} = {r}.",
                }


@fam("Vectors & Vector Spaces", "Hard")
def vs_h_parallelepiped():
    for a in range(1, 7):
        for b in range(1, 7):
            for c in range(1, 6):
                yield {
                    "q": f"Find the volume of the parallelepiped spanned by ⟨{a}, 0, 0⟩, ⟨1, {b}, 0⟩ and ⟨2, 1, {c}⟩.",
                    "correct": num(a * b * c),
                    "wrongs": [num(a + b + c), num(F(a * b * c, 6)), num(a * b + c)],
                    "expl": f"The matrix is lower triangular, so the determinant is {a}·{b}·{c} = {a * b * c}.",
                }


@fam("Vectors & Vector Spaces", "Hard")
def vs_h_point_plane():
    for (u, v, r) in TRIPLES[:8]:
        for k in range(1, 7):
            yield {
                "q": f"Find the distance from the origin to the plane {u}x + {v}y + 0z = {k * r}.",
                "correct": num(k),
                "wrongs": [num(F(k * r, u + v)), num(k * r), num(F(k, r))],
                "expl": f"|{k * r}|/√({u * u} + {v * v}) = {k * r}/{r} = {k}.",
            }


@fam("Vectors & Vector Spaces", "Hard")
def vs_h_rank():
    for a in range(1, 8):
        for b in range(1, 8):
            for k in range(2, 5):
                yield {
                    "q": f"What is the dimension of span{{⟨{a}, {b}⟩, ⟨{k * a}, {k * b}⟩, ⟨0, 0⟩}}?",
                    "correct": "1",
                    "wrongs": ["2", "3", "0"],
                    "expl": "All non-zero vectors listed are multiples of one another, so the span is a single line.",
                }


@fam("Vectors & Vector Spaces", "Hard")
def vs_h_triple():
    for a in range(1, 7):
        for b in range(1, 7):
            for c in range(1, 6):
                yield {
                    "q": f"Compute the scalar triple product ⟨{a}, 1, 0⟩ · (⟨0, {b}, 1⟩ × ⟨1, 0, {c}⟩).",
                    "correct": num(a * b * c + 1),
                    "wrongs": [num(a * b * c - 1), num(a * b * c), num(a + b + c)],
                    "expl": f"⟨0,{b},1⟩ × ⟨1,0,{c}⟩ = ⟨{b * c}, 1, −{b}⟩, and the dot with ⟨{a},1,0⟩ is {a * b * c} + 1.",
                }


@fam("Vectors & Vector Spaces", "Hard")
def vs_h_complement():
    for n in range(2, 9):
        for k in range(1, n):
            yield {
                "q": f"A subspace W of ℝ^{n} has dim W = {k}. What is dim W⊥?",
                "correct": num(n - k),
                "wrongs": [num(n), num(k), num(n + k)],
                "expl": f"dim W + dim W⊥ = {n}, so dim W⊥ = {n} − {k} = {n - k}.",
            }


@fam("Vectors & Vector Spaces", "Hard")
def vs_h_gram():
    for a in range(1, 9):
        for b in range(1, 9):
            yield {
                "q": f"Gram–Schmidt on v₁ = ⟨1, 0⟩ and v₂ = ⟨{a}, {b}⟩: what is the second orthogonal vector?",
                "correct": vec(0, b),
                "wrongs": [vec(a, 0), vec(a, b), vec(0, a)],
                "expl": f"v₂ − (v₂·v₁)v₁ = ⟨{a}, {b}⟩ − {a}⟨1, 0⟩ = ⟨0, {b}⟩.",
            }


# ==================================================== MATRICES & DETERMINANTS
@fam("Matrices & Determinants", "Easy")
def md_e_det2():
    for a in range(1, 8):
        for b in range(1, 8):
            for c in range(1, 6):
                d = c + 4
                yield {
                    "q": f"Compute the determinant of {mat2(a, b, c, d)}.",
                    "correct": num(det2(a, b, c, d)),
                    "wrongs": [num(a * d + b * c), num(a * b - c * d), num(a + d - b - c)],
                    "expl": f"ad − bc = {a}·{d} − {b}·{c} = {det2(a, b, c, d)}.",
                }


@fam("Matrices & Determinants", "Easy")
def md_e_trace():
    for a in range(1, 10):
        for d in range(1, 10):
            for b in (2, 5):
                yield {
                    "q": f"What is the trace of {mat2(a, b, 3, d)}?",
                    "correct": num(a + d),
                    "wrongs": [num(a * d), num(a + b + 3 + d), num(a - d)],
                    "expl": f"Add the diagonal entries: {a} + {d} = {a + d}.",
                }


@fam("Matrices & Determinants", "Easy")
def md_e_sum_entry():
    for a in range(1, 9):
        for b in range(1, 9):
            yield {
                "q": f"A = {mat2(a, 2, 3, 4)} and B = {mat2(1, b, 5, 6)}. What is the (1,2) entry of A + B?",
                "correct": num(2 + b),
                "wrongs": [num(a + 1), num(2 * b), num(b - 2)],
                "expl": f"Add matching entries: 2 + {b} = {2 + b}.",
            }


@fam("Matrices & Determinants", "Easy")
def md_e_scalar_det():
    for k in range(2, 8):
        for a in range(1, 8):
            d = a + 2
            base = det2(a, 1, 2, d)
            yield {
                "q": f"If A = {mat2(a, 1, 2, d)}, what is det({k}A)?",
                "correct": num(k * k * base),
                "wrongs": [num(k * base), num(k ** 3 * base), num(base)],
                "expl": f"For 2×2 matrices det(kA) = k²det A = {k * k}·{base} = {k * k * base}.",
            }


@fam("Matrices & Determinants", "Easy")
def md_e_transpose():
    for a in range(1, 9):
        for b in range(1, 9):
            yield {
                "q": f"For A = {mat2(a, b, 7, 9)}, what is the (2,1) entry of Aᵀ?",
                "correct": num(b),
                "wrongs": [num(a), "7", "9"],
                "expl": f"Transposing swaps indices, so (2,1) of Aᵀ is (1,2) of A = {b}.",
            }


@fam("Matrices & Determinants", "Easy")
def md_e_diag_det():
    for a in range(1, 8):
        for b in range(1, 8):
            for c in range(2, 6):
                yield {
                    "q": f"Compute the determinant of the diagonal matrix diag({a}, {b}, {c}).",
                    "correct": num(a * b * c),
                    "wrongs": [num(a + b + c), num(a * b + c), num(F(a * b * c, 2))],
                    "expl": f"For a diagonal matrix the determinant is the product {a}·{b}·{c} = {a * b * c}.",
                }


@fam("Matrices & Determinants", "Medium")
def md_m_inverse():
    for a in range(1, 8):
        for d in range(1, 8):
            for b in (1, 2, 3):
                det = a * d - b * 1
                if det == 0:
                    continue
                yield {
                    "q": f"For A = {mat2(a, b, 1, d)}, what is the (1,1) entry of A⁻¹?",
                    "correct": num(F(d, det)),
                    "wrongs": [num(F(a, det)), num(F(-d, det)), num(F(det, d))],
                    "expl": f"A⁻¹ = (1/det)[[d, −b], [−c, a]] with det = {det}, so the (1,1) entry is {d}/{det}.",
                }


@fam("Matrices & Determinants", "Medium")
def md_m_product_entry():
    for a in range(1, 8):
        for b in range(1, 8):
            for c in range(1, 6):
                yield {
                    "q": f"A = {mat2(a, b, 2, 3)}, B = {mat2(c, 1, 4, 5)}. What is the (1,1) entry of AB?",
                    "correct": num(a * c + 4 * b),
                    "wrongs": [num(a * c), num(a * c + b), num(a + c)],
                    "expl": f"Row 1 of A dotted with column 1 of B: {a}·{c} + {b}·4 = {a * c + 4 * b}.",
                }


@fam("Matrices & Determinants", "Medium")
def md_m_triangular3():
    for a in range(1, 7):
        for b in range(1, 7):
            for c in range(1, 6):
                yield {
                    "q": f"Compute det of the upper-triangular matrix [[{a}, 5, 7], [0, {b}, 2], [0, 0, {c}]].",
                    "correct": num(a * b * c),
                    "wrongs": [num(a * b * c + 5), num(a + b + c), num(a * b + c)],
                    "expl": f"Triangular determinants multiply the diagonal: {a}·{b}·{c} = {a * b * c}.",
                }


@fam("Matrices & Determinants", "Medium")
def md_m_cramer():
    for a in range(1, 7):
        for b in range(1, 7):
            for x0 in range(1, 6):
                y0 = x0 + 1
                c1 = a * x0 + b * y0
                c2 = x0 + 2 * y0
                det = a * 2 - b * 1
                if det == 0:
                    continue
                yield {
                    "q": f"Use Cramer's rule on {a}x + {b}y = {c1}, x + 2y = {c2}. What is x?",
                    "correct": num(x0),
                    "wrongs": [num(y0), num(x0 + y0), num(F(c1, a))],
                    "expl": f"x = (2·{c1} − {b}·{c2})/{det} = {x0}.",
                }


@fam("Matrices & Determinants", "Medium")
def md_m_singular():
    for a in range(1, 9):
        for b in range(1, 9):
            for c in range(1, 6):
                # a*k - b*c = 0 -> k = bc/a, keep integer
                if (b * c) % a:
                    continue
                k = b * c // a
                yield {
                    "q": f"For which k is {mat2(a, b, c, 'k')} singular?",
                    "correct": num(k),
                    "wrongs": [num(k + 1), num(F(a * c, b)), num(a * b * c)],
                    "expl": f"Singular means {a}k − {b}·{c} = 0, so k = {b * c}/{a} = {k}.",
                }


@fam("Matrices & Determinants", "Medium")
def md_m_symmetric_check():
    for a in range(1, 9):
        for b in range(1, 9):
            if a == b:
                continue
            yield {
                "q": f"Is {mat2(1, a, b, 4)} symmetric?",
                "correct": "No",
                "wrongs": ["Yes", "Only if the diagonal is equal", "Only after transposing"],
                "expl": f"Symmetry needs the (1,2) and (2,1) entries to match, but {a} ≠ {b}.",
            }


@fam("Matrices & Determinants", "Hard")
def md_h_det3():
    for a in range(1, 6):
        for b in range(1, 6):
            for c in range(1, 5):
                # det [[a,1,2],[0,b,3],[1,0,c]] = a(bc-0) -1(0-3) + 2(0-b)
                det = a * (b * c) - 1 * (0 - 3) + 2 * (0 - b)
                yield {
                    "q": f"Compute det [[{a}, 1, 2], [0, {b}, 3], [1, 0, {c}]].",
                    "correct": num(det),
                    "wrongs": [num(det + 3), num(a * b * c), num(det - 2 * b)],
                    "expl": f"Expanding along the first row: {a}({b}·{c}) + 3 − 2·{b} = {det}.",
                }


@fam("Matrices & Determinants", "Hard")
def md_h_powers():
    for a in range(1, 8):
        for d in range(1, 8):
            det = a * d - 6
            if det == 0:
                continue
            yield {
                "q": f"If A = {mat2(a, 2, 3, d)}, compute det(A²).",
                "correct": num(det * det),
                "wrongs": [num(det), num(2 * det), num(det ** 3)],
                "expl": f"det(A²) = (det A)² = ({det})² = {det * det}.",
            }


@fam("Matrices & Determinants", "Hard")
def md_h_inverse_det():
    for a in range(1, 9):
        for d in range(2, 9):
            det = a * d - 2
            if det == 0:
                continue
            yield {
                "q": f"If A = {mat2(a, 1, 2, d)}, what is det(A⁻¹)?",
                "correct": num(F(1, det)),
                "wrongs": [num(det), num(F(-1, det)), num(F(1, det * det))],
                "expl": f"det(A⁻¹) = 1/det A = 1/{det}.",
            }


@fam("Matrices & Determinants", "Hard")
def md_h_product_det():
    for da in range(2, 9):
        for db in range(2, 9):
            yield {
                "q": f"det A = {da} and det B = {db} for 3×3 matrices. What is det(AB)?",
                "correct": num(da * db),
                "wrongs": [num(da + db), num(F(da, db)), num(da * db * 3)],
                "expl": f"det(AB) = det A·det B = {da}·{db} = {da * db}.",
            }


@fam("Matrices & Determinants", "Hard")
def md_h_row_ops():
    for a in range(2, 10):
        for k in range(2, 8):
            yield {
                "q": f"det A = {a} for a 3×3 matrix. If one row is multiplied by {k}, what is the new determinant?",
                "correct": num(a * k),
                "wrongs": [num(a), num(a * k ** 3), num(a + k)],
                "expl": f"Scaling a single row scales the determinant once: {a}·{k} = {a * k}.",
            }


@fam("Matrices & Determinants", "Hard")
def md_h_swap():
    for a in range(2, 14):
        yield {
            "q": f"det A = {a}. Two rows of A are swapped to form B. What is det B?",
            "correct": num(-a),
            "wrongs": [num(a), num(2 * a), "0"],
            "expl": "A single row swap flips the sign of the determinant.",
        }
    for a in range(2, 12):
        yield {
            "q": f"det A = {a} for a 4×4 matrix. What is det(2A)?",
            "correct": num(16 * a),
            "wrongs": [num(2 * a), num(8 * a), num(4 * a)],
            "expl": f"det(kA) = k⁴det A for 4×4, so 16·{a} = {16 * a}.",
        }


# ================================================ SYSTEMS OF LINEAR EQUATIONS
@fam("Systems of Linear Equations", "Easy")
def sl_e_2x2():
    for x0 in range(1, 7):
        for y0 in range(1, 7):
            for a in range(1, 5):
                b = a + 2
                c1 = a * x0 + b * y0
                c2 = x0 - y0
                yield {
                    "q": f"Solve {a}x + {b}y = {c1} and x − y = {c2}. What is x?",
                    "correct": num(x0),
                    "wrongs": [num(y0), num(x0 + y0), num(c2)],
                    "expl": f"From x = y + {c2}, substitution gives y = {y0} and x = {x0}.",
                }


@fam("Systems of Linear Equations", "Easy")
def sl_e_y():
    for x0 in range(1, 6):
        for y0 in range(1, 8):
            c1 = 2 * x0 + y0
            c2 = x0 + 3 * y0
            yield {
                "q": f"Solve 2x + y = {c1} and x + 3y = {c2}. What is y?",
                "correct": num(y0),
                "wrongs": [num(x0), num(c1 - c2), num(x0 + y0)],
                "expl": f"Eliminating x gives 5y = {2 * c2 - c1}, so y = {y0}.",
            }


@fam("Systems of Linear Equations", "Easy")
def sl_e_check():
    for x0 in range(1, 7):
        for y0 in range(1, 7):
            c1 = 3 * x0 + 2 * y0
            yield {
                "q": f"Is ({x0}, {y0}) a solution of 3x + 2y = {c1}?",
                "correct": "Yes",
                "wrongs": ["No", "Only if x = y", "Cannot tell"],
                "expl": f"3·{x0} + 2·{y0} = {c1}, so the point satisfies the equation.",
            }


@fam("Systems of Linear Equations", "Easy")
def sl_e_count():
    for a in range(1, 8):
        for b in range(1, 8):
            k = 2 * a
            m = 2 * b
            yield {
                "q": f"How many solutions does {a}x + {b}y = 1, {k}x + {m}y = 3 have?",
                "correct": "No solution",
                "wrongs": ["Exactly one", "Infinitely many", "Exactly two"],
                "expl": f"The left sides are proportional (factor 2) but 2·1 ≠ 3, so the lines are parallel and distinct.",
            }


@fam("Systems of Linear Equations", "Easy")
def sl_e_substitute():
    for m in range(1, 8):
        for c in range(1, 8):
            # y = mx + c and y = 2x  ->  x = c/(2-m)
            if m == 2:
                continue
            x0 = F(c, 2 - m)
            yield {
                "q": f"Where do y = {m}x + {c} and y = 2x intersect (give x)?",
                "correct": num(x0),
                "wrongs": [num(-x0), num(F(c, m)), num(F(c, m + 2))],
                "expl": f"{m}x + {c} = 2x gives x = {c}/(2 − {m}) = {num(x0)}.",
            }


@fam("Systems of Linear Equations", "Medium")
def sl_m_3x3():
    for x0 in range(1, 5):
        for y0 in range(1, 5):
            for z0 in range(1, 5):
                c1 = x0 + y0 + z0
                c2 = 2 * x0 - y0 + z0
                c3 = x0 + 2 * y0 - z0
                yield {
                    "q": f"Solve x + y + z = {c1}, 2x − y + z = {c2}, x + 2y − z = {c3}. What is x?",
                    "correct": num(x0),
                    "wrongs": [num(y0), num(z0), num(c1 - c2)],
                    "expl": f"Elimination gives (x, y, z) = ({x0}, {y0}, {z0}).",
                }


@fam("Systems of Linear Equations", "Medium")
def sl_m_3x3_z():
    for x0 in range(1, 5):
        for y0 in range(1, 5):
            for z0 in range(1, 6):
                c1 = x0 + 2 * y0 + 3 * z0
                c2 = x0 - y0 + z0
                c3 = 2 * x0 + y0 - z0
                yield {
                    "q": f"Solve x + 2y + 3z = {c1}, x − y + z = {c2}, 2x + y − z = {c3}. What is z?",
                    "correct": num(z0),
                    "wrongs": [num(x0), num(y0), num(c2 - c3)],
                    "expl": f"The unique solution is ({x0}, {y0}, {z0}), so z = {z0}.",
                }


@fam("Systems of Linear Equations", "Medium")
def sl_m_consistency():
    for a in range(1, 8):
        for b in range(1, 8):
            k = 3 * a
            m = 3 * b
            yield {
                "q": f"How many solutions does {a}x + {b}y = 2, {k}x + {m}y = 6 have?",
                "correct": "Infinitely many",
                "wrongs": ["No solution", "Exactly one", "Exactly three"],
                "expl": "The second equation is exactly 3 times the first, so the two lines coincide.",
            }


@fam("Systems of Linear Equations", "Medium")
def sl_m_det_unique():
    for a in range(1, 9):
        for d in range(1, 9):
            det = a * d - 6
            yield {
                "q": f"Does {a}x + 2y = 5, 3x + {d}y = 7 have a unique solution?",
                "correct": "Yes" if det else "No",
                "wrongs": ["No" if det else "Yes", "Only when the right sides match",
                           "Only for positive coefficients"],
                "expl": f"The coefficient determinant is {a}·{d} − 6 = {det}, which is {'non-zero' if det else 'zero'}.",
            }


@fam("Systems of Linear Equations", "Medium")
def sl_m_param():
    for a in range(1, 8):
        for b in range(1, 8):
            yield {
                "q": f"The system {a}x + {b}y + z = 0 (one equation, three unknowns) has a solution space of what dimension?",
                "correct": "2",
                "wrongs": ["1", "3", "0"],
                "expl": "Three unknowns minus one independent equation leaves a 2-dimensional solution space.",
            }


@fam("Systems of Linear Equations", "Medium")
def sl_m_back_sub():
    for z0 in range(1, 7):
        for y0 in range(1, 7):
            c = y0 + 2 * z0
            yield {
                "q": f"After elimination a system reduces to y + 2z = {c} and z = {z0}. What is y?",
                "correct": num(y0),
                "wrongs": [num(c), num(z0), num(c + 2 * z0)],
                "expl": f"Back-substitute z = {z0}: y = {c} − 2·{z0} = {y0}.",
            }


@fam("Systems of Linear Equations", "Hard")
def sl_h_infinite_k():
    for a in range(1, 8):
        for b in range(1, 8):
            for t in range(2, 6):
                yield {
                    "q": f"For which k does {a}x + {b}y = {t}, kx + {t * b}y = {t * t} have infinitely many solutions?",
                    "correct": num(t * a),
                    "wrongs": [num(a), num(F(a, t)), num(t * b)],
                    "expl": f"The second equation must be {t} times the first, so k = {t}·{a} = {t * a}.",
                }


@fam("Systems of Linear Equations", "Hard")
def sl_h_no_solution():
    for a in range(1, 9):
        for b in range(1, 9):
            for t in range(2, 5):
                yield {
                    "q": f"For which k does {a}x + {b}y = 1, kx + {t * b}y = 5 have no solution?",
                    "correct": num(t * a),
                    "wrongs": [num(a), num(5 * a), num(F(a, t))],
                    "expl": f"k = {t * a} makes the left sides proportional while {t}·1 = {t} ≠ 5, so the lines are parallel.",
                }


@fam("Systems of Linear Equations", "Hard")
def sl_h_homogeneous():
    for a in range(1, 9):
        for b in range(1, 9):
            for c in range(1, 7):
                if (b * c) % a:
                    continue
                k = b * c // a
                yield {
                    "q": f"For which k does {a}x + {b}y = 0, {c}x + ky = 0 have a non-trivial solution?",
                    "correct": num(k),
                    "wrongs": [num(k + 1), num(F(a * c, b)), num(a * b * c)],
                    "expl": f"Need {a}k − {b}{c} = 0, so k = {b * c}/{a} = {k}.",
                }


@fam("Systems of Linear Equations", "Hard")
def sl_h_rank_nullity():
    for n in range(3, 9):
        for r in range(1, n):
            yield {
                "q": f"A homogeneous system has {n} unknowns and coefficient-matrix rank {r}. How many free variables are there?",
                "correct": num(n - r),
                "wrongs": [num(r), num(n), num(n + r)],
                "expl": f"Free variables = unknowns − rank = {n} − {r} = {n - r}.",
            }


@fam("Systems of Linear Equations", "Hard")
def sl_h_overdetermined():
    for x0 in range(1, 7):
        for y0 in range(1, 7):
            c3 = 4 * x0 + 5 * y0
            yield {
                "q": f"x + y = {x0 + y0}, x − y = {x0 - y0}, 4x + 5y = {c3}. Is the system consistent?",
                "correct": "Yes",
                "wrongs": ["No", "Only if x = y", "Only for positive values"],
                "expl": f"({x0}, {y0}) satisfies all three equations, so the extra equation is redundant.",
            }


@fam("Systems of Linear Equations", "Hard")
def sl_h_three_unknown_two_eq():
    for a in range(1, 8):
        for b in range(1, 8):
            yield {
                "q": f"Two independent equations in {a + 3} unknowns (with {b} on the right) leave how many free parameters?",
                "correct": num(a + 1),
                "wrongs": [num(a + 3), num(2), num(a)],
                "expl": f"{a + 3} unknowns − 2 independent equations = {a + 1} free parameters.",
            }


# ==================================================== EIGENVALUES & EIGENVECTORS
@fam("Eigenvalues & Eigenvectors", "Easy")
def ev_e_diag():
    for a in range(1, 10):
        for b in range(1, 10):
            if a == b:
                continue
            yield {
                "q": f"What are the eigenvalues of diag({a}, {b})?",
                "correct": f"{a} and {b}",
                "wrongs": [f"{a + b} and 0", f"{a * b} and 1", f"{-a} and {-b}"],
                "expl": "A diagonal matrix has its diagonal entries as eigenvalues.",
            }


@fam("Eigenvalues & Eigenvectors", "Easy")
def ev_e_triangular():
    for a in range(1, 9):
        for d in range(1, 9):
            if a == d:
                continue
            for b in (2, 5):
                yield {
                    "q": f"What are the eigenvalues of {mat2(a, b, 0, d)}?",
                    "correct": f"{a} and {d}",
                    "wrongs": [f"{a} and {b}", f"{a + d} and {b}", f"{a * d} and 0"],
                    "expl": "For a triangular matrix the eigenvalues sit on the diagonal.",
                }


@fam("Eigenvalues & Eigenvectors", "Easy")
def ev_e_trace_sum():
    for l1 in range(1, 10):
        for l2 in range(1, 10):
            if l1 == l2:
                continue
            yield {
                "q": f"A 2×2 matrix has eigenvalues {l1} and {l2}. What is its trace?",
                "correct": num(l1 + l2),
                "wrongs": [num(l1 * l2), num(abs(l1 - l2)), num(F(l1 + l2, 2))],
                "expl": f"Trace = sum of eigenvalues = {l1} + {l2} = {l1 + l2}.",
            }


@fam("Eigenvalues & Eigenvectors", "Easy")
def ev_e_det_prod():
    for l1 in range(1, 10):
        for l2 in range(2, 10):
            if l1 == l2:
                continue
            yield {
                "q": f"A 2×2 matrix has eigenvalues {l1} and {l2}. What is its determinant?",
                "correct": num(l1 * l2),
                "wrongs": [num(l1 + l2), num(F(l2, l1)), num(l2 - l1)],
                "expl": f"Determinant = product of eigenvalues = {l1}·{l2} = {l1 * l2}.",
            }


@fam("Eigenvalues & Eigenvectors", "Easy")
def ev_e_identity():
    for k in range(2, 15):
        yield {
            "q": f"What is the only eigenvalue of {k}I (2×2)?",
            "correct": num(k),
            "wrongs": [num(k * k), "1", num(2 * k)],
            "expl": f"{k}I scales every vector by {k}, so {k} is the eigenvalue for all directions.",
        }


@fam("Eigenvalues & Eigenvectors", "Easy")
def ev_e_charpoly():
    for a in range(1, 8):
        for d in range(1, 8):
            for b in (1, 2, 3):
                tr, det = a + d, a * d - b * 1
                yield {
                    "q": f"Write the characteristic polynomial of {mat2(a, b, 1, d)}.",
                    "correct": f"λ² − {tr}λ + {det}" if det >= 0 else f"λ² − {tr}λ − {abs(det)}",
                    "wrongs": [f"λ² + {tr}λ + {det}", f"λ² − {det}λ + {tr}", f"λ² − {tr}λ"],
                    "expl": f"λ² − (trace)λ + det = λ² − {tr}λ + ({det}).",
                }


@fam("Eigenvalues & Eigenvectors", "Medium")
def ev_m_integer_eigs():
    seen = set()
    for a in range(1, 8):
        for b in range(1, 8):
            for c in range(1, 8):
                for d in range(1, 8):
                    tr, det = a + d, a * d - b * c
                    disc = tr * tr - 4 * det
                    if disc <= 0 or not is_square(disc):
                        continue
                    s = int(round(disc ** 0.5))
                    if (tr + s) % 2:
                        continue
                    l1, l2 = (tr + s) // 2, (tr - s) // 2
                    key = (a, b, c, d)
                    if key in seen:
                        continue
                    seen.add(key)
                    yield {
                        "q": f"Find the eigenvalues of {mat2(a, b, c, d)}.",
                        "correct": f"{l1} and {l2}",
                        "wrongs": [f"{a} and {d}", f"{l1 + 1} and {l2 - 1}", f"{tr} and {det}"],
                        "expl": f"λ² − {tr}λ + {det} = 0 factors as (λ − {l1})(λ − {l2}).",
                    }


@fam("Eigenvalues & Eigenvectors", "Medium")
def ev_m_eigenvector():
    for a in range(2, 10):
        for b in range(1, 8):
            # [[a, b], [0, a+1]] eigenvector for λ = a is ⟨1, 0⟩
            yield {
                "q": f"For {mat2(a, b, 0, a + 1)}, give an eigenvector for λ = {a}.",
                "correct": "⟨1, 0⟩",
                "wrongs": ["⟨0, 1⟩", f"⟨{b}, 1⟩", "⟨1, 1⟩"],
                "expl": f"(A − {a}I)⟨1, 0⟩ = ⟨0, 0⟩, so ⟨1, 0⟩ is an eigenvector for λ = {a}.",
            }


@fam("Eigenvalues & Eigenvectors", "Medium")
def ev_m_symmetric():
    for a in range(1, 10):
        for b in range(1, 10):
            if b == 0:
                continue
            yield {
                "q": f"Find the eigenvalues of {mat2(a, b, b, a)}.",
                "correct": f"{a + b} and {a - b}",
                "wrongs": [f"{a} and {b}", f"{a * b} and {a}", f"{a + b} and {b - a}"],
                "expl": f"⟨1,1⟩ gives {a} + {b} and ⟨1,−1⟩ gives {a} − {b}.",
            }


@fam("Eigenvalues & Eigenvectors", "Medium")
def ev_m_shift():
    for l1 in range(1, 9):
        for c in range(1, 9):
            yield {
                "q": f"λ = {l1} is an eigenvalue of A. What is the matching eigenvalue of A + {c}I?",
                "correct": num(l1 + c),
                "wrongs": [num(l1 * c), num(l1), num(c - l1)],
                "expl": f"(A + cI)v = (λ + c)v, so the eigenvalue shifts to {l1} + {c} = {l1 + c}.",
            }


@fam("Eigenvalues & Eigenvectors", "Medium")
def ev_m_scale():
    for l1 in range(2, 10):
        for c in range(2, 9):
            yield {
                "q": f"λ = {l1} is an eigenvalue of A. What is the corresponding eigenvalue of {c}A?",
                "correct": num(c * l1),
                "wrongs": [num(l1 + c), num(l1), num(F(l1, c))],
                "expl": f"({c}A)v = {c}λv, so the eigenvalue is {c}·{l1} = {c * l1}.",
            }


@fam("Eigenvalues & Eigenvectors", "Medium")
def ev_m_projection():
    for a in range(1, 12):
        yield {
            "q": f"A projection matrix P satisfies P² = P and P ≠ 0, I (size {a + 1}). What eigenvalues can it have?",
            "correct": "0 and 1",
            "wrongs": ["Only 1", "Only 0", "±1"],
            "expl": "λ² = λ forces λ ∈ {0, 1} for any projection.",
        }


@fam("Eigenvalues & Eigenvectors", "Hard")
def ev_h_power():
    for l1 in range(2, 9):
        for n in range(2, 7):
            yield {
                "q": f"λ = {l1} is an eigenvalue of A. What is the corresponding eigenvalue of A^{n}?",
                "correct": num(l1 ** n),
                "wrongs": [num(l1 * n), num(l1), num(n ** l1)],
                "expl": f"Aⁿv = λⁿv, so the eigenvalue is {l1}^{n} = {l1 ** n}.",
            }


@fam("Eigenvalues & Eigenvectors", "Hard")
def ev_h_inverse():
    for l1 in range(2, 14):
        yield {
            "q": f"A is invertible with eigenvalue λ = {l1}. What is the corresponding eigenvalue of A⁻¹?",
            "correct": num(F(1, l1)),
            "wrongs": [num(-l1), num(l1), num(F(1, l1 * l1))],
            "expl": f"A⁻¹v = (1/λ)v = (1/{l1})v.",
        }


@fam("Eigenvalues & Eigenvectors", "Hard")
def ev_h_complex():
    for a in range(1, 12):
        yield {
            "q": f"Find the eigenvalues of {mat2(0, -a, a, 0)}.",
            "correct": f"±{a}i",
            "wrongs": [f"±{a}", f"0 and {a}", f"±{a * a}i"],
            "expl": f"λ² + {a * a} = 0 gives λ = ±{a}i — a rotation-type matrix has purely imaginary eigenvalues.",
        }


@fam("Eigenvalues & Eigenvectors", "Hard")
def ev_h_irrational():
    for b in range(1, 10):
        for c in range(1, 6):
            disc = b * b + 4 * c
            if is_square(disc):
                continue
            yield {
                "q": f"Find the eigenvalues of {mat2(b, c, 1, 0)}.",
                "correct": f"({b} ± {rt(disc)})/2",
                "wrongs": [f"({b} ± {rt(b * b - 4 * c)})/2" if b * b - 4 * c >= 0 else f"({b} ± {rt(disc)})/4",
                           f"{b} ± {rt(disc)}", f"({-b} ± {rt(disc)})/2"],
                "expl": f"λ² − {b}λ − {c} = 0 gives λ = ({b} ± √{disc})/2.",
            }


@fam("Eigenvalues & Eigenvectors", "Hard")
def ev_h_diagonalizable():
    for a in range(1, 12):
        yield {
            "q": f"Is {mat2(a, 1, 0, a)} diagonalizable?",
            "correct": "No",
            "wrongs": ["Yes", "Only over ℂ", "Only if a = 0"],
            "expl": f"λ = {a} is a double root but the eigenspace is only 1-dimensional, so the matrix is defective.",
        }


@fam("Eigenvalues & Eigenvectors", "Hard")
def ev_h_trace_det_solve():
    for l1 in range(1, 9):
        for l2 in range(1, 9):
            if l1 == l2:
                continue
            yield {
                "q": f"A 2×2 matrix has trace {l1 + l2} and determinant {l1 * l2}. What is its largest eigenvalue?",
                "correct": num(max(l1, l2)),
                "wrongs": [num(min(l1, l2)), num(l1 + l2), num(l1 * l2)],
                "expl": f"λ² − {l1 + l2}λ + {l1 * l2} = 0 has roots {l1} and {l2}.",
            }


# =============================================================== PROBABILITY BASICS
@fam("Probability Basics", "Easy")
def pb_e_die():
    for k in range(1, 6):
        yield {
            "q": f"A fair die is rolled. What is P(outcome > {k})?",
            "correct": num(F(6 - k, 6)),
            "wrongs": [num(F(k, 6)), num(F(6 - k, 5)), num(F(1, 6))],
            "expl": f"{6 - k} of the 6 faces exceed {k}.",
        }
    for k in range(2, 7):
        yield {
            "q": f"A fair die is rolled. What is P(outcome is a multiple of {k})?",
            "correct": num(F(6 // k, 6)),
            "wrongs": [num(F(1, k)), num(F(k, 6)), num(F(6 // k, 5))],
            "expl": f"There are {6 // k} multiples of {k} among 1–6.",
        }


@fam("Probability Basics", "Easy")
def pb_e_coins():
    for n in range(2, 8):
        for k in range(0, n + 1):
            yield {
                "q": f"{n} fair coins are tossed. What is P(exactly {k} heads)?",
                "correct": num(F(comb(n, k), 2 ** n)),
                "wrongs": [num(F(1, 2 ** n)), num(F(k, n)), num(F(comb(n, k), 2 ** n) / 2)],
                "expl": f"C({n},{k})/2^{n} = {comb(n, k)}/{2 ** n}.",
            }


@fam("Probability Basics", "Easy")
def pb_e_cards():
    for k in (1, 2, 3, 4):
        yield {
            "q": f"One card is drawn from a standard deck. What is P(the card's suit is one of {k} chosen suits)?",
            "correct": num(F(k, 4)),
            "wrongs": [num(F(k, 52)), num(F(13, 52 - k)), num(F(k, 13))],
            "expl": f"Each suit has probability 1/4, so {k} suits give {num(F(k, 4))}.",
        }
    for v in range(1, 14):
        yield {
            "q": f"One card is drawn from a standard deck. What is P(the rank is at most {v})?",
            "correct": num(F(v, 13)),
            "wrongs": [num(F(v, 52)), num(F(v, 12)), num(F(4 * v, 13))],
            "expl": f"{v} of the 13 ranks qualify, each with 4 cards: {4 * v}/52 = {num(F(v, 13))}.",
        }


@fam("Probability Basics", "Easy")
def pb_e_complement():
    for n in range(3, 20):
        for k in range(1, n):
            yield {
                "q": f"An event has probability {k}/{n}. What is the probability it does not occur?",
                "correct": num(F(n - k, n)),
                "wrongs": [num(F(k, n)), num(F(n, k)), num(F(n - k, k))],
                "expl": f"1 − {k}/{n} = {num(F(n - k, n))}.",
            }


@fam("Probability Basics", "Easy")
def pb_e_union_disjoint():
    for a in range(1, 8):
        for b in range(1, 8):
            if a + b > 10:
                continue
            yield {
                "q": f"Disjoint events have P(A) = {a}/12 and P(B) = {b}/12. Find P(A ∪ B).",
                "correct": num(F(a + b, 12)),
                "wrongs": [num(F(a * b, 144)), num(F(a + b, 24)), num(F(abs(a - b), 12))],
                "expl": f"For disjoint events probabilities add: ({a} + {b})/12 = {num(F(a + b, 12))}.",
            }


@fam("Probability Basics", "Easy")
def pb_e_balls():
    for r in range(2, 9):
        for w in range(2, 9):
            yield {
                "q": f"A bag has {r} red and {w} white balls. One is drawn. What is P(red)?",
                "correct": num(F(r, r + w)),
                "wrongs": [num(F(w, r + w)), num(F(r, w)), num(F(1, r + w))],
                "expl": f"{r}/({r} + {w}) = {num(F(r, r + w))}.",
            }


@fam("Probability Basics", "Medium")
def pb_m_conditional():
    for both in range(1, 6):
        for onlyb in range(1, 6):
            for rest in (2, 4, 6):
                total = both + onlyb + rest + 3
                yield {
                    "q": f"In a class of {total}, {both + onlyb} study French and {both} of those also study German. If a French student is chosen, what is P(German)?",
                    "correct": num(F(both, both + onlyb)),
                    "wrongs": [num(F(both, total)), num(F(both + onlyb, total)), num(F(onlyb, both + onlyb))],
                    "expl": f"P(G|F) = {both}/{both + onlyb} = {num(F(both, both + onlyb))}.",
                }


@fam("Probability Basics", "Medium")
def pb_m_independent():
    for a in range(1, 7):
        for b in range(1, 7):
            yield {
                "q": f"Independent events have P(A) = {a}/8 and P(B) = {b}/9. Find P(A ∩ B).",
                "correct": num(F(a * b, 72)),
                "wrongs": [num(F(a + b, 17)), num(F(a * b, 17)), num(F(a, 8) + F(b, 9))],
                "expl": f"Multiply for independence: ({a}/8)({b}/9) = {num(F(a * b, 72))}.",
            }


@fam("Probability Basics", "Medium")
def pb_m_at_least_one():
    for n in range(2, 7):
        for d in range(2, 7):
            p = F(1, d)
            val = 1 - (1 - p) ** n
            yield {
                "q": f"An event with probability 1/{d} is tried {n} independent times. What is P(at least one success)?",
                "correct": num(val),
                "wrongs": [num(F(n, d)), num((1 - p) ** n), num(p ** n)],
                "expl": f"1 − (1 − 1/{d})^{n} = {num(val)}.",
            }


@fam("Probability Basics", "Medium")
def pb_m_combinations():
    for n in range(5, 15):
        for k in range(2, 5):
            yield {
                "q": f"How many ways can a committee of {k} be chosen from {n} people?",
                "correct": num(comb(n, k)),
                "wrongs": [num(factorial(n) // factorial(n - k)), num(n * k), num(comb(n, k + 1))],
                "expl": f"C({n},{k}) = {comb(n, k)}.",
            }


@fam("Probability Basics", "Medium")
def pb_m_two_dice():
    for s in range(2, 13):
        cnt = sum(1 for i in range(1, 7) for j in range(1, 7) if i + j == s)
        yield {
            "q": f"Two fair dice are rolled. What is P(sum = {s})?",
            "correct": num(F(cnt, 36)),
            "wrongs": [num(F(cnt, 12)), num(F(1, 36)), num(F(cnt + 1, 36))],
            "expl": f"{cnt} of the 36 equally likely pairs sum to {s}.",
        }


@fam("Probability Basics", "Medium")
def pb_m_permutations():
    for n in range(4, 12):
        for k in range(2, 4):
            val = factorial(n) // factorial(n - k)
            yield {
                "q": f"How many ordered arrangements of {k} items can be made from {n} distinct items?",
                "correct": num(val),
                "wrongs": [num(comb(n, k)), num(n ** k), num(factorial(k))],
                "expl": f"P({n},{k}) = {n}!/({n} − {k})! = {val}.",
            }


@fam("Probability Basics", "Hard")
def pb_h_bayes():
    for prev in (1, 2, 5):
        for sens in (90, 95, 99):
            p = F(prev, 100)
            se = F(sens, 100)
            sp = F(sens, 100)
            post = (p * se) / (p * se + (1 - p) * (1 - sp))
            yield {
                "q": f"A disease affects {prev}% of people. A test is {sens}% sensitive and {sens}% specific. Given a positive test, what is P(disease)?",
                "correct": num(post),
                "wrongs": [num(se), num(p), num(1 - post)],
                "expl": f"Bayes: ({num(p)}·{num(se)})/({num(p)}·{num(se)} + {num(1 - p)}·{num(1 - sp)}) = {num(post)}.",
            }


@fam("Probability Basics", "Hard")
def pb_h_inclusion():
    for a in range(2, 7):
        for b in range(2, 7):
            for c in range(1, 5):
                total = 60
                val = F(a * 10 + b * 10 - c * 5, total)
                yield {
                    "q": f"Of {total} students, {a * 10} take maths, {b * 10} take physics and {c * 5} take both. What is P(maths or physics)?",
                    "correct": num(val),
                    "wrongs": [num(F(a * 10 + b * 10, total)), num(F(c * 5, total)), num(F(a * 10 + b * 10 + c * 5, total))],
                    "expl": f"P(A ∪ B) = ({a * 10} + {b * 10} − {c * 5})/{total} = {num(val)}.",
                }


@fam("Probability Basics", "Hard")
def pb_h_hypergeometric():
    for r in range(2, 7):
        for w in range(2, 7):
            for k in (2,):
                total = r + w
                val = F(comb(r, 2), comb(total, 2))
                yield {
                    "q": f"A bag has {r} red and {w} blue balls. Two are drawn without replacement. What is P(both red)?",
                    "correct": num(val),
                    "wrongs": [num(F(r * r, total * total)), num(F(comb(r, 2), comb(total, 2)) * 2), num(F(r, total))],
                    "expl": f"C({r},2)/C({total},2) = {comb(r, 2)}/{comb(total, 2)} = {num(val)}.",
                }


@fam("Probability Basics", "Hard")
def pb_h_expected_trials():
    for d in range(2, 15):
        yield {
            "q": f"Independent trials each succeed with probability 1/{d}. What is the expected number of trials until the first success?",
            "correct": num(d),
            "wrongs": [num(F(1, d)), num(d - 1), num(d * d)],
            "expl": f"A geometric distribution has mean 1/p = {d}.",
        }


@fam("Probability Basics", "Hard")
def pb_h_conditional_dice():
    for k in range(2, 7):
        cnt = sum(1 for i in range(1, 7) for j in range(1, 7) if i + j >= k and i == 1)
        tot = sum(1 for i in range(1, 7) for j in range(1, 7) if i + j >= k)
        if tot == 0:
            continue
        yield {
            "q": f"Two dice are rolled and the sum is at least {k}. What is P(the first die shows 1)?",
            "correct": num(F(cnt, tot)),
            "wrongs": [num(F(1, 6)), num(F(cnt, 36)), num(F(tot, 36))],
            "expl": f"{cnt} of the {tot} qualifying outcomes have a 1 on the first die.",
        }


@fam("Probability Basics", "Hard")
def pb_h_birthday_like():
    for n in range(2, 12):
        val = 1
        for i in range(n):
            val *= F(12 - i, 12)
        yield {
            "q": f"{n} people are asked their birth month (assume 12 equally likely months). What is P(all different)?",
            "correct": num(val),
            "wrongs": [num(1 - val), num(F(1, 12 ** n)), num(F(n, 12))],
            "expl": f"Multiply 12/12 · 11/12 · … for {n} people to get {num(val)}.",
        }


# ================================================ RANDOM VARIABLES & DISTRIBUTIONS
@fam("Random Variables & Distributions", "Easy")
def rv_e_binom_mean():
    for n in range(5, 26):
        for d in (2, 4, 5):
            p = F(1, d)
            yield {
                "q": f"X ~ Binomial(n = {n}, p = 1/{d}). What is E[X]?",
                "correct": num(n * p),
                "wrongs": [num(n * p * (1 - p)), num(n), num(p)],
                "expl": f"E[X] = np = {n}/{d} = {num(n * p)}.",
            }


@fam("Random Variables & Distributions", "Easy")
def rv_e_binom_var():
    for n in range(4, 22):
        for d in (2, 4):
            p = F(1, d)
            yield {
                "q": f"X ~ Binomial(n = {n}, p = 1/{d}). What is Var(X)?",
                "correct": num(n * p * (1 - p)),
                "wrongs": [num(n * p), num(n * p * p), num(n)],
                "expl": f"Var = np(1 − p) = {n}·{num(p)}·{num(1 - p)} = {num(n * p * (1 - p))}.",
            }


@fam("Random Variables & Distributions", "Easy")
def rv_e_uniform():
    for a in range(0, 8):
        for b in range(a + 2, a + 10):
            yield {
                "q": f"X ~ Uniform({a}, {b}). What is E[X]?",
                "correct": num(F(a + b, 2)),
                "wrongs": [num(F(b - a, 2)), num(F(b - a, 12)), num(a + b)],
                "expl": f"E[X] = (a + b)/2 = ({a} + {b})/2 = {num(F(a + b, 2))}.",
            }


@fam("Random Variables & Distributions", "Easy")
def rv_e_die_expect():
    for n in range(1, 12):
        yield {
            "q": f"A fair die is rolled {n} times. What is the expected total?",
            "correct": num(F(7 * n, 2)),
            "wrongs": [num(F(7, 2)), num(3 * n), num(6 * n)],
            "expl": f"Each roll has mean 3.5, so the total has mean {n}·3.5 = {num(F(7 * n, 2))}.",
        }


@fam("Random Variables & Distributions", "Easy")
def rv_e_bernoulli():
    for d in range(2, 14):
        p = F(1, d)
        yield {
            "q": f"X is Bernoulli with p = 1/{d}. What is Var(X)?",
            "correct": num(p * (1 - p)),
            "wrongs": [num(p), num(p * p), num(1 - p)],
            "expl": f"Var = p(1 − p) = (1/{d})({d - 1}/{d}) = {num(p * (1 - p))}.",
        }


@fam("Random Variables & Distributions", "Easy")
def rv_e_geometric_mean():
    for d in range(2, 16):
        yield {
            "q": f"X ~ Geometric(p = 1/{d}) counting trials until the first success. What is E[X]?",
            "correct": num(d),
            "wrongs": [num(F(1, d)), num(d - 1), num(d * d)],
            "expl": f"E[X] = 1/p = {d}.",
        }


@fam("Random Variables & Distributions", "Medium")
def rv_m_binom_pmf():
    for n in range(4, 11):
        for k in range(1, n):
            yield {
                "q": f"X ~ Binomial({n}, 1/2). Find P(X = {k}).",
                "correct": num(F(comb(n, k), 2 ** n)),
                "wrongs": [num(F(comb(n, k), 2 ** (n - 1))), num(F(1, 2 ** n)), num(F(k, n))],
                "expl": f"C({n},{k})/2^{n} = {comb(n, k)}/{2 ** n}.",
            }


@fam("Random Variables & Distributions", "Medium")
def rv_m_poisson():
    for lam in range(1, 7):
        for k in range(0, 5):
            val = exp(-lam) * lam ** k / factorial(k)
            yield {
                "q": f"X ~ Poisson(λ = {lam}). Find P(X = {k}) to 4 decimals.",
                "correct": f"{val:.4f}",
                "wrongs": [f"{exp(-lam) * lam ** (k + 1) / factorial(k + 1):.4f}",
                           f"{exp(-lam):.4f}", f"{lam ** k / factorial(k):.4f}"],
                "expl": f"P = e^(−{lam})·{lam}^{k}/{k}! = {val:.4f}.",
            }


@fam("Random Variables & Distributions", "Medium")
def rv_m_exponential():
    for lam in range(1, 8):
        for t in range(1, 5):
            yield {
                "q": f"X ~ Exponential(λ = {lam}). Find P(X > {t}).",
                "correct": f"e^(−{lam * t})",
                "wrongs": [f"1 − e^(−{lam * t})", f"e^(−{lam})", f"e^(−{t})"],
                "expl": f"P(X > t) = e^(−λt) = e^(−{lam}·{t}).",
            }


@fam("Random Variables & Distributions", "Medium")
def rv_m_zscore():
    for mu in range(10, 60, 10):
        for sd in (2, 4, 5):
            for k in range(1, 6):
                xv = mu + k * sd
                yield {
                    "q": f"X ~ Normal(μ = {mu}, σ = {sd}). What is the z-score of x = {xv}?",
                    "correct": num(k),
                    "wrongs": [num(F(k, sd)), num(k * sd), num(xv - mu)],
                    "expl": f"z = ({xv} − {mu})/{sd} = {k}.",
                }


@fam("Random Variables & Distributions", "Medium")
def rv_m_geometric_pmf():
    for d in range(2, 7):
        for k in range(1, 6):
            p = F(1, d)
            val = (1 - p) ** (k - 1) * p
            yield {
                "q": f"X ~ Geometric(p = 1/{d}). Find P(X = {k}).",
                "correct": num(val),
                "wrongs": [num(p ** k), num((1 - p) ** k), num(p)],
                "expl": f"(1 − p)^({k} − 1)·p = {num(val)}.",
            }


@fam("Random Variables & Distributions", "Medium")
def rv_m_uniform_var():
    for a in range(0, 6):
        for b in range(a + 2, a + 10):
            yield {
                "q": f"X ~ Uniform({a}, {b}). What is Var(X)?",
                "correct": num(F((b - a) ** 2, 12)),
                "wrongs": [num(F(b - a, 12)), num(F((b - a) ** 2, 2)), num(F(a + b, 2))],
                "expl": f"Var = (b − a)²/12 = {(b - a) ** 2}/12 = {num(F((b - a) ** 2, 12))}.",
            }


@fam("Random Variables & Distributions", "Hard")
def rv_h_linear():
    for a in range(2, 9):
        for v in range(1, 9):
            for b in (3, 5):
                yield {
                    "q": f"Var(X) = {v}. Find Var({a}X + {b}).",
                    "correct": num(a * a * v),
                    "wrongs": [num(a * v), num(a * a * v + b), num(a * v + b)],
                    "expl": f"Var(aX + b) = a²Var(X) = {a * a}·{v} = {a * a * v}.",
                }


@fam("Random Variables & Distributions", "Hard")
def rv_h_second_moment():
    for mu in range(1, 9):
        for v in range(1, 9):
            yield {
                "q": f"E[X] = {mu} and Var(X) = {v}. Find E[X²].",
                "correct": num(mu * mu + v),
                "wrongs": [num(mu * mu), num(v), num(mu + v)],
                "expl": f"E[X²] = Var + (E[X])² = {v} + {mu * mu} = {mu * mu + v}.",
            }


@fam("Random Variables & Distributions", "Hard")
def rv_h_sum_normal():
    for v1 in range(1, 9):
        for v2 in range(1, 9):
            yield {
                "q": f"X and Y are independent with Var(X) = {v1}, Var(Y) = {v2}. Find Var(X − Y).",
                "correct": num(v1 + v2),
                "wrongs": [num(abs(v1 - v2)), num(v1 * v2), num(F(v1 + v2, 2))],
                "expl": f"Variances add even for a difference: {v1} + {v2} = {v1 + v2}.",
            }


@fam("Random Variables & Distributions", "Hard")
def rv_h_chebyshev():
    for k in range(2, 10):
        yield {
            "q": f"By Chebyshev's inequality, at least what fraction of a distribution lies within {k} standard deviations of the mean?",
            "correct": num(1 - F(1, k * k)),
            "wrongs": [num(F(1, k * k)), num(1 - F(1, k)), num(F(k - 1, k))],
            "expl": f"1 − 1/k² = 1 − 1/{k * k} = {num(1 - F(1, k * k))}.",
        }


@fam("Random Variables & Distributions", "Hard")
def rv_h_covariance():
    for c in range(1, 8):
        for v1 in range(1, 7):
            for v2 in range(1, 7):
                yield {
                    "q": f"Var(X) = {v1}, Var(Y) = {v2}, Cov(X, Y) = {c}. Find Var(X + Y).",
                    "correct": num(v1 + v2 + 2 * c),
                    "wrongs": [num(v1 + v2), num(v1 + v2 + c), num(v1 * v2 + c)],
                    "expl": f"Var(X + Y) = {v1} + {v2} + 2·{c} = {v1 + v2 + 2 * c}.",
                }


@fam("Random Variables & Distributions", "Hard")
def rv_h_binom_sd():
    for n in (16, 25, 36, 64, 100, 144, 400):
        p = F(1, 2)
        sd = F(int(round((n) ** 0.5)), 2)
        yield {
            "q": f"X ~ Binomial({n}, 1/2). What is the standard deviation of X?",
            "correct": num(sd),
            "wrongs": [num(F(n, 4)), num(2 * sd), num(F(n, 2))],
            "expl": f"σ = √(np(1 − p)) = √({n}/4) = {num(sd)}.",
        }


# ========================================================= DESCRIPTIVE STATISTICS
@fam("Descriptive Statistics", "Easy")
def ds_e_mean():
    for m in range(3, 20):
        for d in range(1, 8):
            data = [m - 2 * d, m - d, m, m + d, m + 2 * d]
            yield {
                "q": f"Find the mean of {data}.",
                "correct": num(m),
                "wrongs": [num(m + d), num(m - d), num(2 * d)],
                "expl": f"The values are symmetric about {m}, so the mean is {m}.",
            }


@fam("Descriptive Statistics", "Easy")
def ds_e_median():
    for a in range(1, 15):
        for d in range(1, 7):
            data = sorted([a, a + d, a + 2 * d, a + 5 * d])
            med = F(data[1] + data[2], 2)
            yield {
                "q": f"Find the median of {data}.",
                "correct": num(med),
                "wrongs": [num(data[1]), num(data[2]), num(F(data[0] + data[3], 2))],
                "expl": f"With four values the median averages the middle two: ({data[1]} + {data[2]})/2 = {num(med)}.",
            }


@fam("Descriptive Statistics", "Easy")
def ds_e_range():
    for a in range(1, 16):
        for d in range(2, 9):
            data = [a, a + d, a + 3 * d, a + 7 * d]
            yield {
                "q": f"Find the range of {data}.",
                "correct": num(7 * d),
                "wrongs": [num(3 * d), num(a + 7 * d), num(8 * d)],
                "expl": f"Max − min = {a + 7 * d} − {a} = {7 * d}.",
            }


@fam("Descriptive Statistics", "Easy")
def ds_e_mode():
    for a in range(1, 16):
        for d in range(1, 8):
            data = [a, a + d, a + d, a + 3 * d]
            yield {
                "q": f"Find the mode of {data}.",
                "correct": num(a + d),
                "wrongs": [num(a), num(a + 3 * d), "No mode"],
                "expl": f"{a + d} appears twice and every other value once.",
            }


@fam("Descriptive Statistics", "Easy")
def ds_e_midrange():
    for a in range(1, 15):
        for d in range(2, 9):
            data = [a, a + 2 * d, a + 4 * d]
            yield {
                "q": f"Find the midrange of {data}.",
                "correct": num(a + 2 * d),
                "wrongs": [num(2 * d), num(a + 4 * d), num(a + d)],
                "expl": f"(min + max)/2 = ({a} + {a + 4 * d})/2 = {a + 2 * d}.",
            }


@fam("Descriptive Statistics", "Medium")
def ds_m_variance():
    for m in range(3, 18):
        for d in range(1, 8):
            data = [m - 2 * d, m - d, m, m + d, m + 2 * d]
            yield {
                "q": f"Find the population variance of {data}.",
                "correct": num(2 * d * d),
                "wrongs": [num(F(5 * d * d, 2)), num(d * d), num(4 * d * d)],
                "expl": f"Deviations are ±2d, ±d, 0, so variance = (4 + 1 + 0 + 1 + 4)d²/5 = 2·{d * d} = {2 * d * d}.",
            }


@fam("Descriptive Statistics", "Medium")
def ds_m_sample_var():
    for m in range(3, 18):
        for d in range(1, 8):
            data = [m - 2 * d, m - d, m, m + d, m + 2 * d]
            yield {
                "q": f"Find the sample variance (divide by n − 1) of {data}.",
                "correct": num(F(10 * d * d, 4)),
                "wrongs": [num(2 * d * d), num(F(10 * d * d, 5)), num(d * d)],
                "expl": f"Σ(deviations²) = 10d² = {10 * d * d}, divided by 4 gives {num(F(10 * d * d, 4))}.",
            }


@fam("Descriptive Statistics", "Medium")
def ds_m_iqr():
    for a in range(1, 12):
        for d in range(1, 8):
            data = [a, a + d, a + 2 * d, a + 3 * d, a + 4 * d, a + 5 * d, a + 6 * d, a + 7 * d]
            q1 = F(data[1] + data[2], 2)
            q3 = F(data[5] + data[6], 2)
            yield {
                "q": f"Find the interquartile range of {data}.",
                "correct": num(q3 - q1),
                "wrongs": [num(7 * d), num(F(7 * d, 2)), num(2 * d)],
                "expl": f"Q3 − Q1 = {num(q3)} − {num(q1)} = {num(q3 - q1)}.",
            }


@fam("Descriptive Statistics", "Medium")
def ds_m_zscore():
    for m in range(10, 60, 5):
        for sd in (2, 3, 4, 5):
            for k in range(1, 5):
                xv = m + k * sd
                yield {
                    "q": f"A data set has mean {m} and standard deviation {sd}. What is the z-score of {xv}?",
                    "correct": num(k),
                    "wrongs": [num(F(k, sd)), num(k * sd), num(xv - m)],
                    "expl": f"z = ({xv} − {m})/{sd} = {k}.",
                }


@fam("Descriptive Statistics", "Medium")
def ds_m_weighted():
    for w1 in range(1, 7):
        for w2 in range(1, 7):
            for g1 in (60, 70, 80):
                g2 = g1 + 10
                val = F(w1 * g1 + w2 * g2, w1 + w2)
                yield {
                    "q": f"Scores {g1} and {g2} carry weights {w1} and {w2}. Find the weighted mean.",
                    "correct": num(val),
                    "wrongs": [num(F(g1 + g2, 2)), num(F(w1 * g1 + w2 * g2, 2)), num(F(g1 * w2 + g2 * w1, w1 + w2))],
                    "expl": f"({w1}·{g1} + {w2}·{g2})/({w1} + {w2}) = {num(val)}.",
                }


@fam("Descriptive Statistics", "Hard")
def ds_h_combined_mean():
    for n1 in range(2, 9):
        for n2 in range(2, 9):
            for m1 in (10, 20, 30):
                m2 = m1 + 10
                val = F(n1 * m1 + n2 * m2, n1 + n2)
                yield {
                    "q": f"Group A has {n1} values with mean {m1}; group B has {n2} values with mean {m2}. Find the combined mean.",
                    "correct": num(val),
                    "wrongs": [num(F(m1 + m2, 2)), num(F(n1 * m1 + n2 * m2, 2)), num(m1 + m2)],
                    "expl": f"({n1}·{m1} + {n2}·{m2})/{n1 + n2} = {num(val)}.",
                }


@fam("Descriptive Statistics", "Hard")
def ds_h_shift_scale():
    for m in range(5, 25):
        for sd in range(1, 9):
            for k in (2, 3, 4):
                yield {
                    "q": f"A data set has mean {m} and standard deviation {sd}. Every value is multiplied by {k} and then 7 is added. What is the new standard deviation?",
                    "correct": num(k * sd),
                    "wrongs": [num(k * sd + 7), num(sd), num(k * k * sd)],
                    "expl": f"Scaling multiplies the spread by {k}; adding a constant does not change it.",
                }


@fam("Descriptive Statistics", "Hard")
def ds_h_cv():
    for m in (20, 25, 40, 50, 80, 100):
        for sd in (2, 4, 5, 10):
            val = F(sd * 100, m)
            yield {
                "q": f"A data set has mean {m} and standard deviation {sd}. What is the coefficient of variation (%)?",
                "correct": num(val),
                "wrongs": [num(F(m * 100, sd)), num(F(sd, m)), num(sd * m)],
                "expl": f"CV = σ/μ·100 = {sd}/{m}·100 = {num(val)}%.",
            }


@fam("Descriptive Statistics", "Hard")
def ds_h_outlier():
    for q1 in range(4, 24, 2):
        for iqr in range(2, 10):
            q3 = q1 + iqr
            fence = q1 - F(3 * iqr, 2)
            yield {
                "q": f"Q1 = {q1} and Q3 = {q3}. What is the lower outlier fence (1.5·IQR rule)?",
                "correct": num(fence),
                "wrongs": [num(q1 - iqr), num(q3 + F(3 * iqr, 2)), num(q1 - 3 * iqr)],
                "expl": f"Q1 − 1.5·IQR = {q1} − 1.5·{iqr} = {num(fence)}.",
            }


@fam("Descriptive Statistics", "Hard")
def ds_h_mad():
    for m in range(4, 20):
        for d in range(1, 9):
            data = [m - 2 * d, m - d, m, m + d, m + 2 * d]
            mad = F(6 * d, 5)
            yield {
                "q": f"Find the mean absolute deviation of {data}.",
                "correct": num(mad),
                "wrongs": [num(F(6 * d, 4)), num(2 * d), num(F(4 * d, 5))],
                "expl": f"Absolute deviations sum to 6d = {6 * d}; divide by 5 to get {num(mad)}.",
            }


@fam("Descriptive Statistics", "Hard")
def ds_h_missing_value():
    for n in range(4, 12):
        for m in range(5, 20):
            known = m * n - 3
            yield {
                "q": f"{n} values have mean {m}. The first {n - 1} of them sum to {known - m + 3}. What is the last value?",
                "correct": num(m * n - (known - m + 3)),
                "wrongs": [num(m), num(m * n), num(known)],
                "expl": f"Total must be {m * n}, so the last value is {m * n} − {known - m + 3} = {m * n - (known - m + 3)}.",
            }


# ============================================================= HYPOTHESIS TESTING
@fam("Hypothesis Testing", "Easy")
def ht_e_df():
    for n in range(5, 45):
        yield {
            "q": f"A one-sample t-test uses n = {n}. How many degrees of freedom?",
            "correct": num(n - 1),
            "wrongs": [num(n), num(n - 2), num(n + 1)],
            "expl": f"df = n − 1 = {n} − 1 = {n - 1}.",
        }


@fam("Hypothesis Testing", "Easy")
def ht_e_alpha():
    for a in (1, 2, 5, 10):
        yield {
            "q": f"A test uses α = {a}%. What is the probability of a Type I error when H₀ is true?",
            "correct": f"{a}%",
            "wrongs": [f"{100 - a}%", f"{a * 2}%", "0%"],
            "expl": f"α is exactly the Type I error rate, {a}%.",
        }
    for b in (10, 15, 20, 25, 30):
        yield {
            "q": f"A test has β = {b}%. What is its power?",
            "correct": f"{100 - b}%",
            "wrongs": [f"{b}%", "95%", f"{100 - 2 * b}%"],
            "expl": f"Power = 1 − β = {100 - b}%.",
        }


@fam("Hypothesis Testing", "Easy")
def ht_e_type_errors():
    for k in range(1, 9):
        yield {
            "q": f"In test #{k} the researcher rejects H₀ although H₀ is true. Which error is that?",
            "correct": "Type I error",
            "wrongs": ["Type II error", "No error", "Sampling error"],
            "expl": "Rejecting a true null hypothesis is a Type I error.",
        }
    for k in range(1, 9):
        yield {
            "q": f"In study #{k} the researcher fails to reject H₀ although H₀ is false. Which error is that?",
            "correct": "Type II error",
            "wrongs": ["Type I error", "No error", "Measurement error"],
            "expl": "Missing a real effect is a Type II error.",
        }


@fam("Hypothesis Testing", "Easy")
def ht_e_tails():
    for mu in range(10, 60, 5):
        yield {
            "q": f"H₀: μ = {mu} versus H₁: μ ≠ {mu}. How many tails does the rejection region have?",
            "correct": "2",
            "wrongs": ["1", "0", "3"],
            "expl": "A ≠ alternative splits α between both tails.",
        }
    for mu in range(10, 60, 5):
        yield {
            "q": f"H₀: μ = {mu} versus H₁: μ > {mu}. How many tails does the rejection region have?",
            "correct": "1",
            "wrongs": ["2", "0", "It depends on n"],
            "expl": "A one-sided alternative uses a single tail.",
        }


@fam("Hypothesis Testing", "Easy")
def ht_e_critical():
    for pair in (("5% two-tailed", "±1.96"), ("1% two-tailed", "±2.576"),
                 ("10% two-tailed", "±1.645"), ("5% right-tailed", "1.645"),
                 ("1% right-tailed", "2.326"), ("2.5% right-tailed", "1.96")):
        label, val = pair
        yield {
            "q": f"What is the critical z value for a {label} test?",
            "correct": val,
            "wrongs": [v for _, v in (("a", "±1.96"), ("b", "±2.576"), ("c", "1.645"), ("d", "2.326")) if v != val][:3],
            "expl": f"Standard normal tables give {val} for a {label} test.",
        }


@fam("Hypothesis Testing", "Easy")
def ht_e_extra():
    for n1 in range(5, 13):
        for n2 in range(5, 13):
            yield {
                "q": f"A pooled two-sample t-test uses n₁ = {n1} and n₂ = {n2}. How many degrees of freedom?",
                "correct": num(n1 + n2 - 2),
                "wrongs": [num(n1 + n2), num(n1 + n2 - 1), num(min(n1, n2) - 1)],
                "expl": f"df = n₁ + n₂ − 2 = {n1} + {n2} − 2 = {n1 + n2 - 2}.",
            }
    for c in (80, 85, 90, 95, 98, 99):
        yield {
            "q": f"A confidence interval is reported at the {c}% level. What is α?",
            "correct": num(F(100 - c, 100)),
            "wrongs": [num(F(c, 100)), num(F(100 - c, 200)), "0.05"],
            "expl": f"α = 1 − {c}/100 = {num(F(100 - c, 100))}.",
        }
    for k in range(3, 12):
        yield {
            "q": f"A chi-square goodness-of-fit test uses {k} categories. How many degrees of freedom?",
            "correct": num(k - 1),
            "wrongs": [num(k), num(k - 2), num(2 * k)],
            "expl": f"df = categories − 1 = {k} − 1 = {k - 1}.",
        }


@fam("Hypothesis Testing", "Medium")
def ht_m_extra():
    for mu in range(20, 60, 5):
        for s in (3, 6, 9):
            for n in (9, 16, 25):
                se = F(s, int(round(n ** 0.5)))
                for k in (1, 2):
                    xbar = mu + k * se
                    yield {
                        "q": f"A t-test has H₀: μ = {mu}, sample mean {num(xbar)}, s = {s}, n = {n}. Compute the t statistic.",
                        "correct": num(k),
                        "wrongs": [num(k * se), num(F(k, se)), num(xbar - mu)],
                        "expl": f"t = (x̄ − μ)/(s/√n) = {num(xbar - mu)}/{num(se)} = {k}.",
                    }


@fam("Hypothesis Testing", "Medium")
def ht_m_ci_read():
    for lo in range(10, 60, 5):
        for w in (2, 4, 6, 8):
            hi = lo + 2 * w
            yield {
                "q": f"A 95% confidence interval for μ is ({lo}, {hi}). What are the sample mean and margin of error?",
                "correct": f"{lo + w} and {w}",
                "wrongs": [f"{lo + w} and {2 * w}", f"{lo} and {w}", f"{hi} and {w}"],
                "expl": f"The centre is ({lo} + {hi})/2 = {lo + w} and the half-width is {w}.",
            }


@fam("Hypothesis Testing", "Medium")
def ht_m_zstat():
    for mu in range(20, 70, 10):
        for sd in (4, 6, 10):
            for n in (4, 9, 16, 25):
                se = F(sd, int(round(n ** 0.5)))
                for k in (1, 2, 3):
                    xbar = mu + k * se
                    yield {
                        "q": f"H₀: μ = {mu}, σ = {sd}, n = {n}, sample mean = {num(xbar)}. Compute the z statistic.",
                        "correct": num(k),
                        "wrongs": [num(k * se), num(F(k, se)), num(xbar - mu)],
                        "expl": f"z = (x̄ − μ)/(σ/√n) = {num(xbar - mu)}/{num(se)} = {k}.",
                    }


@fam("Hypothesis Testing", "Medium")
def ht_m_decision():
    for z in (F(1, 2), F(3, 2), F(21, 10), F(5, 2), F(3, 1), F(9, 5), F(1, 1)):
        rej = abs(z) > F(196, 100)
        yield {
            "q": f"A two-tailed 5% test gives z = {num(z)}. What is the decision?",
            "correct": "Reject H₀" if rej else "Fail to reject H₀",
            "wrongs": ["Fail to reject H₀" if rej else "Reject H₀",
                       "Accept H₁ with certainty", "The test is invalid"],
            "expl": f"|{num(z)}| {'>' if rej else '<'} 1.96, so we {'reject' if rej else 'do not reject'} H₀.",
        }


@fam("Hypothesis Testing", "Medium")
def ht_m_pvalue():
    for p in (1, 2, 3, 4, 6, 7, 8, 9):
        for a in (5, 10):
            rej = p < a
            yield {
                "q": f"A test yields p = 0.0{p} with α = 0.{a if a == 10 else '0' + str(a)}. What is the conclusion?",
                "correct": "Reject H₀" if rej else "Fail to reject H₀",
                "wrongs": ["Fail to reject H₀" if rej else "Reject H₀",
                           "H₀ is proven true", "Increase α until it is significant"],
                "expl": f"p = 0.0{p} is {'below' if rej else 'above'} α, so we {'reject' if rej else 'retain'} H₀.",
            }


@fam("Hypothesis Testing", "Medium")
def ht_m_margin():
    for sd in (4, 6, 8, 10, 12):
        for n in (4, 9, 16, 25, 36):
            se = F(sd, int(round(n ** 0.5)))
            m = F(196, 100) * se
            yield {
                "q": f"With σ = {sd} and n = {n}, what is the 95% margin of error for the mean (z = 1.96)?",
                "correct": num(m),
                "wrongs": [num(se), num(2 * m), num(F(196, 100) * sd)],
                "expl": f"1.96·σ/√n = 1.96·{num(se)} = {num(m)}.",
            }


@fam("Hypothesis Testing", "Medium")
def ht_m_se():
    for sd in (2, 3, 4, 5, 6, 8, 10, 12):
        for n in (4, 9, 16, 25, 36, 49):
            se = F(sd, int(round(n ** 0.5)))
            yield {
                "q": f"σ = {sd} and n = {n}. What is the standard error of the sample mean?",
                "correct": num(se),
                "wrongs": [num(sd), num(F(sd, n)), num(F(sd * sd, n))],
                "expl": f"SE = σ/√n = {sd}/{int(round(n ** 0.5))} = {num(se)}.",
            }


@fam("Hypothesis Testing", "Medium")
def ht_m_proportion():
    for n in (100, 400, 900):
        for p0 in (F(1, 2), F(1, 4), F(1, 5)):
            se = (p0 * (1 - p0) / n) ** 0.5
            yield {
                "q": f"H₀: p = {num(p0)} with n = {n}. What is the standard error of p̂ (4 decimals)?",
                "correct": f"{se:.4f}",
                "wrongs": [f"{se * 2:.4f}", f"{float(p0) / n:.4f}", f"{se ** 2:.4f}"],
                "expl": f"√(p₀(1 − p₀)/n) = {se:.4f}.",
            }


@fam("Hypothesis Testing", "Hard")
def ht_h_sample_size():
    for sd in (5, 10, 15, 20):
        for E in (1, 2, 5):
            n = (2 * sd / E) ** 2
            yield {
                "q": f"Using z = 2, what sample size is needed to estimate a mean within ±{E} when σ = {sd}?",
                "correct": num(int(round(n))),
                "wrongs": [num(int(round(n / 2))), num(int(round(n * 2))), num(int(round(2 * sd / E)))],
                "expl": f"n = (zσ/E)² = (2·{sd}/{E})² = {int(round(n))}.",
            }


@fam("Hypothesis Testing", "Hard")
def ht_h_two_sample():
    for d in range(1, 9):
        for se in (1, 2, 4):
            yield {
                "q": f"Two independent samples differ by {d} with standard error of the difference {se}. Compute the z statistic.",
                "correct": num(F(d, se)),
                "wrongs": [num(d * se), num(F(se, d)), num(d)],
                "expl": f"z = difference/SE = {d}/{se} = {num(F(d, se))}.",
            }


@fam("Hypothesis Testing", "Hard")
def ht_h_power():
    for b in range(5, 45, 5):
        for k in (1, 2):
            yield {
                "q": f"Test #{k} has Type II error rate β = 0.{b:02d}. What is its power, and does raising n increase it?",
                "correct": f"{num(1 - F(b, 100))}, yes",
                "wrongs": [f"{num(F(b, 100))}, yes", f"{num(1 - F(b, 100))}, no", "0.05, no"],
                "expl": f"Power = 1 − β = {num(1 - F(b, 100))}; larger samples shrink β and raise power.",
            }


@fam("Hypothesis Testing", "Hard")
def ht_h_t_vs_z():
    for n in range(5, 35):
        yield {
            "q": f"σ is unknown and n = {n} with an approximately normal population. Which statistic should be used?",
            "correct": f"t with {n - 1} df",
            "wrongs": ["z", f"t with {n} df", "chi-square"],
            "expl": f"An unknown σ means the t distribution with n − 1 = {n - 1} degrees of freedom.",
        }


@fam("Hypothesis Testing", "Hard")
def ht_h_ci_interval():
    for xbar in range(20, 70, 5):
        for m in (2, 3, 4, 5):
            yield {
                "q": f"A sample mean is {xbar} with margin of error {m}. Give the 95% confidence interval.",
                "correct": f"({xbar - m}, {xbar + m})",
                "wrongs": [f"({xbar - 2 * m}, {xbar + 2 * m})", f"({xbar}, {xbar + m})",
                           f"({m}, {xbar})"],
                "expl": f"x̄ ± margin = {xbar} ± {m}.",
            }


@fam("Hypothesis Testing", "Hard")
def ht_h_alpha_effect():
    for a1, a2 in ((5, 1), (10, 5), (10, 1), (5, 2), (10, 2)):
        yield {
            "q": f"A test's α is tightened from {a1}% to {a2}%. What happens to the Type II error rate (n fixed)?",
            "correct": "It increases",
            "wrongs": ["It decreases", "It stays the same", "It becomes zero"],
            "expl": "Shrinking the rejection region makes it harder to detect real effects, so β rises.",
        }


# ========================================================= REGRESSION & CORRELATION
@fam("Regression & Correlation", "Easy")
def rc_e_slope():
    for r_num in (2, 4, 5, 6, 8):
        for sy in (2, 4, 6, 10):
            for sx in (2, 5):
                r = F(r_num, 10)
                b = r * F(sy, sx)
                yield {
                    "q": f"r = {num(r)}, s_y = {sy}, s_x = {sx}. Find the regression slope.",
                    "correct": num(b),
                    "wrongs": [num(r * F(sx, sy)), num(r), num(F(sy, sx))],
                    "expl": f"b = r·s_y/s_x = {num(r)}·{sy}/{sx} = {num(b)}.",
                }


@fam("Regression & Correlation", "Easy")
def rc_e_intercept():
    for b in range(1, 7):
        for xbar in range(2, 9):
            for ybar in range(5, 30, 5):
                yield {
                    "q": f"A regression line has slope {b} and passes through the means x̄ = {xbar}, ȳ = {ybar}. Find the intercept.",
                    "correct": num(ybar - b * xbar),
                    "wrongs": [num(ybar + b * xbar), num(b * xbar), num(ybar)],
                    "expl": f"a = ȳ − b·x̄ = {ybar} − {b}·{xbar} = {ybar - b * xbar}.",
                }


@fam("Regression & Correlation", "Easy")
def rc_e_predict():
    for a in range(1, 8):
        for b in range(1, 8):
            for xv in range(2, 8):
                yield {
                    "q": f"For ŷ = {a} + {b}x, predict y when x = {xv}.",
                    "correct": num(a + b * xv),
                    "wrongs": [num(a * b * xv), num(a + b), num(b * xv)],
                    "expl": f"{a} + {b}·{xv} = {a + b * xv}.",
                }


@fam("Regression & Correlation", "Easy")
def rc_e_r2():
    for r_num in range(1, 10):
        r = F(r_num, 10)
        yield {
            "q": f"A regression has r = {num(r)}. What is r²?",
            "correct": num(r * r),
            "wrongs": [num(r), num(2 * r), num(1 - r * r)],
            "expl": f"({num(r)})² = {num(r * r)}.",
        }


@fam("Regression & Correlation", "Easy")
def rc_e_sign():
    for b in range(1, 10):
        yield {
            "q": f"A least-squares line has slope −{b}. What is the sign of r?",
            "correct": "Negative",
            "wrongs": ["Positive", "Zero", "Cannot be determined"],
            "expl": "The slope and the correlation always share the same sign.",
        }


@fam("Regression & Correlation", "Medium")
def rc_m_residual():
    for a in range(1, 7):
        for b in range(1, 7):
            for xv in range(1, 7):
                yhat = a + b * xv
                yobs = yhat + (xv % 3) + 1
                yield {
                    "q": f"For ŷ = {a} + {b}x, the observed point is ({xv}, {yobs}). Find the residual.",
                    "correct": num(yobs - yhat),
                    "wrongs": [num(yhat - yobs), num(yobs), num(yhat)],
                    "expl": f"Residual = y − ŷ = {yobs} − {yhat} = {yobs - yhat}.",
                }


@fam("Regression & Correlation", "Medium")
def rc_m_slope_sums():
    for sxy in range(2, 12):
        for sxx in range(2, 10):
            yield {
                "q": f"S_xy = {sxy} and S_xx = {sxx}. Find the least-squares slope.",
                "correct": num(F(sxy, sxx)),
                "wrongs": [num(F(sxx, sxy)), num(sxy * sxx), num(F(sxy, sxx * sxx))],
                "expl": f"b = S_xy/S_xx = {sxy}/{sxx} = {num(F(sxy, sxx))}.",
            }


@fam("Regression & Correlation", "Medium")
def rc_m_change():
    for b in range(2, 9):
        for dx in range(2, 8):
            yield {
                "q": f"A regression slope is {b}. How much does ŷ change when x increases by {dx}?",
                "correct": num(b * dx),
                "wrongs": [num(b + dx), num(F(b, dx)), num(dx)],
                "expl": f"Δŷ = b·Δx = {b}·{dx} = {b * dx}.",
            }


@fam("Regression & Correlation", "Medium")
def rc_m_r2_percent():
    for r_num in range(1, 10):
        r = F(r_num, 10)
        yield {
            "q": f"With r = {num(r)}, what percentage of the variation in y does the model explain?",
            "correct": f"{num(r * r * 100)}%",
            "wrongs": [f"{num(r * 100)}%", f"{num((1 - r * r) * 100)}%", f"{num(r * r)}%"],
            "expl": f"r² = {num(r * r)}, i.e. {num(r * r * 100)}%.",
        }


@fam("Regression & Correlation", "Medium")
def rc_m_correlation_scale():
    for k in range(2, 9):
        for r_num in (3, 5, 7, 9):
            r = F(r_num, 10)
            yield {
                "q": f"Every x value is multiplied by {k}. If r was {num(r)}, what is the new r?",
                "correct": num(r),
                "wrongs": [num(r * k), num(F(r, k)), num(r * r)],
                "expl": "Correlation is unit-free, so a positive rescaling of x leaves it unchanged.",
            }


@fam("Regression & Correlation", "Medium")
def rc_m_r_from_sums():
    for sxy in (6, 12, 20, 30):
        for sxx in (4, 9, 16, 25):
            for syy in (9, 16, 25, 36):
                r = F(sxy, 1) / ((sxx * syy) ** 0.5)
                if r > 1:
                    continue
                yield {
                    "q": f"S_xy = {sxy}, S_xx = {sxx}, S_yy = {syy}. Find r to 4 decimals.",
                    "correct": f"{float(r):.4f}",
                    "wrongs": [f"{float(F(sxy, sxx)):.4f}", f"{float(r) ** 2:.4f}", f"{float(r) / 2:.4f}"],
                    "expl": f"r = S_xy/√(S_xx·S_yy) = {sxy}/√{sxx * syy} = {float(r):.4f}.",
                }


@fam("Regression & Correlation", "Hard")
def rc_h_fit_line():
    for b in range(1, 7):
        for a in range(0, 6):
            for n in (3, 4, 5):
                xs = list(range(1, n + 1))
                ys = [a + b * x for x in xs]
                yield {
                    "q": f"Fit a least-squares line to {[(x, y) for x, y in zip(xs, ys)]}. What is the slope?",
                    "correct": num(b),
                    "wrongs": [num(a), num(b + 1), num(F(b, 2))],
                    "expl": f"The points lie exactly on y = {a} + {b}x, so the slope is {b}.",
                }


@fam("Regression & Correlation", "Hard")
def rc_h_sse():
    for e1 in range(1, 7):
        for e2 in range(1, 7):
            for e3 in range(1, 5):
                sse = e1 * e1 + e2 * e2 + e3 * e3
                yield {
                    "q": f"Three residuals are {e1}, −{e2} and {e3}. Compute SSE.",
                    "correct": num(sse),
                    "wrongs": [num(e1 + e3 - e2), num(sse * 2), num(e1 * e2 * e3)],
                    "expl": f"SSE = {e1}² + {e2}² + {e3}² = {sse}.",
                }


@fam("Regression & Correlation", "Hard")
def rc_h_sst_split():
    for sst in (40, 50, 60, 80, 100, 120):
        for frac in (F(1, 2), F(1, 4), F(3, 4), F(1, 5), F(2, 5)):
            ssr = sst * frac
            yield {
                "q": f"SST = {sst} and r² = {num(frac)}. Find SSE.",
                "correct": num(sst - ssr),
                "wrongs": [num(ssr), num(sst), num(sst + ssr)],
                "expl": f"SSR = r²·SST = {num(ssr)}, so SSE = {sst} − {num(ssr)} = {num(sst - ssr)}.",
            }


@fam("Regression & Correlation", "Hard")
def rc_h_slope_data():
    for d in range(1, 7):
        for c in range(1, 6):
            xs = [1, 2, 3, 4]
            ys = [c, c + d, c + 3 * d, c + 4 * d]
            n = 4
            sx, sy = sum(xs), sum(ys)
            sxy = sum(x * y for x, y in zip(xs, ys))
            sxx = sum(x * x for x in xs)
            b = F(n * sxy - sx * sy, n * sxx - sx * sx)
            yield {
                "q": f"Find the least-squares slope for the data {[(x, y) for x, y in zip(xs, ys)]}.",
                "correct": num(b),
                "wrongs": [num(d), num(b + 1), num(F(b, 2))],
                "expl": f"b = (nΣxy − ΣxΣy)/(nΣx² − (Σx)²) = {num(b)}.",
            }


@fam("Regression & Correlation", "Hard")
def rc_h_prediction_error():
    for a in range(1, 6):
        for b in range(1, 6):
            for xv in range(2, 7):
                yhat = a + b * xv
                yield {
                    "q": f"With ŷ = {a} + {b}x, the observed y at x = {xv} is {yhat + 2}. What percentage error does the prediction have?",
                    "correct": f"{float(200 / (yhat + 2)):.2f}%",
                    "wrongs": [f"{float(200 / yhat):.2f}%", "2.00%", f"{float(100 / (yhat + 2)):.2f}%"],
                    "expl": f"|y − ŷ|/y·100 = 2/{yhat + 2}·100 = {float(200 / (yhat + 2)):.2f}%.",
                }


@fam("Regression & Correlation", "Hard")
def rc_h_extrapolation():
    for a in range(1, 7):
        for b in range(2, 8):
            yield {
                "q": f"A model ŷ = {a} + {b}x was fitted for 1 ≤ x ≤ 10. Why is predicting at x = 100 risky?",
                "correct": "It extrapolates far outside the fitted range",
                "wrongs": ["The slope becomes negative", "r² drops to zero automatically",
                           "The intercept is no longer defined"],
                "expl": "Least-squares fits are only supported inside the observed x range; beyond it the linear pattern may not hold.",
            }
