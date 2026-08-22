import React from "react";
import { GuideMcqSection } from "../components/GuideMcq";
import {
  TAYLOR_CONCEPT_QUIZ,
  TAYLOR_FORMULA_QUIZ,
  MACLAURIN_CORE_QUIZ,
  TAYLOR_CATALOG_QUIZ,
  TAYLOR_CONVERGENCE_QUIZ,
  TAYLOR_ERROR_QUIZ,
  TAYLOR_ENGINEERING_QUIZ,
  TAYLOR_CHALLENGE_QUIZ,
} from "../data/mvTaylorQuizzes";
import { Link } from "react-router-dom";
import StudyGuideShell from "./StudyGuideShell";
import "./PartialDerivativesGuide.css";
import {
  TaylorExtendedPart1,
  TaylorExtendedPart2,
} from "./GuideExtendedMaterials";
import { TaylorCertificateBoost } from "./calculus/CertificateBoost";

function Divider() {
  return <hr className="divider" />;
}

function OpeningNote() {
  return (
    <div className="opening-note-box">
      <p className="opening-note">
        <strong>Operational Blueprint:</strong>{" "}
        {"This study guide delivers an exhaustive treatment of Taylor and Maclaurin Series expansions in calculus. By leveraging successive higher-order derivatives, we can approximate complex, non-linear functions as infinite polynomial series centered at an arbitrary coordinate point $a$. When the expansion center is specifically positioned at the origin ($a = 0$), the construction simplifies directly into a canonical Maclaurin series. This module formalizes general derivation formulas, standard transcendental catalog expansions ($e^x, \\sin x, \\cos x$), convergence intervals via ratio tests, and Taylor remainder error bounds, equipping you with essential analytic tools for numerical computing, scientific modeling, and precise problem-solving."}
      </p>
    </div>
  );
}

// ==========================================
// SECTION 1: COMPONENTS (FUNDAMENTALS)
// ==========================================

function GuideSidebarPart1() {
  return (
    <nav className="sidebar">
      <div className="sb-brand">
        <div className="sb-sub">Multivariable Calculus</div>
        <div className="sb-title">Taylor Series · Part 1</div>
      </div>
      <div className="sb-group">Sections</div>
      <a className="sb-link" href="#s171">Polynomial Approximation</a>
      <a className="sb-link" href="#quiz-171">Quiz 17.1</a>
      <a className="sb-link" href="#s172">The Taylor Formula</a>
      <a className="sb-link" href="#quiz-172">Quiz 17.2</a>
      <a className="sb-link" href="#s173">Maclaurin Series &amp; Reductions</a>
      <a className="sb-link" href="#quiz-173">Quiz 17.3</a>
      <a className="sb-link" href="#taylor-cert-p1">Certificate examples</a>
    </nav>
  );
}

function GuideHeaderPart1() {
  return (
    <header className="ch-hdr">
      <div className="ch-eye">Multivariable Calculus Study Guide · Part 1 of 2</div>
      <h1 className="ch-title">Taylor &amp; Maclaurin Series</h1>
      <p className="ch-sub">Polynomial Approximations, The Taylor Formula &amp; Maclaurin Series Foundations</p>
      <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
    </header>
  );
}

function TableOfContentsPart1() {
  return (
    <nav className="toc">
      <div className="toc-h">Contents — Part 1 of 2</div>
      <div className="toc-grid">
        <a className="toc-a" href="#s171">Polynomial Approximation</a>
        <a className="toc-a" href="#s172">The Taylor Formula</a>
        <a className="toc-a" href="#s173">Maclaurin Series Foundations</a>
        <a className="toc-a" href="#quiz-171">Practice Quizzes</a>
      </div>
    </nav>
  );
}

function SectionS171() {
  return (
    <section className="section" id="s171">
      <div className="sec-badge">{"Section 17.1"}</div>
      <h2 className="sec-title">{"Conceptual Polynomial Approximation Space"}</h2>
      <p>
        {"To approximate a non-linear continuous curve $f(x)$ at a specific coordinate center point $x = a$, we build a customizable polynomial expansion. A basic constant approximation matches only the exact function height coordinate value $f(a)$."}
        {"To match the tilting slope line, we incorporate the first derivative $f'(a)$. By continuously adding higher-order derivatives, we incrementally align the polynomial's bending curvature, twist, and higher rate changes to wrap perfectly around our target function curve."}
      </p>
    </section>
  );
}

function SectionS172() {
  return (
    <section className="section" id="s172">
      <div className="sec-badge">{"Section 17.2"}</div>
      <h2 className="sec-title">{"The General Taylor Series Formula"}</h2>
      <p>
        {"The mathematical identity for building a Taylor Series scales infinitely. Each polynomial term is explicitly weighted by a corresponding derivative value evaluated at the center point $a$, scaled inversely by its matching factorial index value to balance power rule operations."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Definition Formula — Infinite Taylor Series"}</div>
        <p>{"The expansion of an infinitely differentiable function $f(x)$ centered at point $x = a$ is given by:"}</p>
        <div className="fml">
          {"$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x-a)^n$$"}
        </div>
        <p>{"Expanded form: $$f(x) = f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2 + \\frac{f'''(a)}{3!}(x-a)^3 + \\dots$$"}</p>
      </div>
    </section>
  );
}

function SectionS173() {
  return (
    <section className="section" id="s173">
      <div className="sec-badge">{"Section 17.3"}</div>
      <h2 className="sec-title">{"Maclaurin Series: The Origin-Centered Foundation"}</h2>
      <p>
        {"A Maclaurin series is the special, universally applied case of the Taylor Series where the approximation center point is placed precisely at the origin ($a = 0$). Setting $a = 0$ simplifies the binomial powers $(x-a)^n$ directly to $x^n$, producing the cleanest and most practical power series representation for mathematical physics and numerical algorithms."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Definition — Maclaurin Series Formula"}</div>
        <p>{"For any smooth function $f(x)$ whose derivatives exist at $x = 0$, its Maclaurin series is defined as:"}</p>
        <div className="fml">
          {"$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(0)}{n!} x^n = f(0) + f'(0)x + \\frac{f''(0)}{2!}x^2 + \\frac{f'''(0)}{3!}x^3 + \\frac{f^{(4)}(0)}{4!}x^4 + \\dots$$"}
        </div>
      </div>

      <div className="box exm">
        <div className="box-lbl">{"Step-by-Step Derivation: Maclaurin Series for $e^x$"}</div>
        <div className="exm-title">{"Find the Maclaurin series for $f(x) = e^x$ and state its general term."}</div>
        <div className="sol">
          <div className="sol-lbl">{"Solution Steps"}</div>
          <ol className="steps">
            <li>
              {"Compute the derivatives: $f(x) = e^x$, $f'(x) = e^x$, $f''(x) = e^x$, and generally $f^{(n)}(x) = e^x$ for all integers $n \\geq 0$."}
            </li>
            <li>
              {"Evaluate all derivatives at the origin $x = 0$: $f^{(n)}(0) = e^0 = 1$ for every $n$."}
            </li>
            <li>
              {"Substitute into the Maclaurin formula: $c_n = \\frac{f^{(n)}(0)}{n!} = \\frac{1}{n!}$, giving:"}
              <div className="fml">{"$$e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\frac{x^4}{4!} + \\dots = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}$$"}</div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// SECTION 2: COMPONENTS (APPLICATIONS)
// ==========================================

function GuideSidebarPart2() {
  return (
    <nav className="sidebar">
      <div className="sb-brand">
        <div className="sb-sub">Multivariable Calculus</div>
        <div className="sb-title">Taylor Series · Part 2</div>
      </div>
      <div className="sb-group">Sections</div>
      <a className="sb-link" href="#s174">Common Maclaurin Expansions</a>
      <a className="sb-link" href="#quiz-174">Quiz 17.4</a>
      <a className="sb-link" href="#s175">Radius of Convergence</a>
      <a className="sb-link" href="#quiz-175">Quiz 17.5</a>
      <a className="sb-link" href="#s176">Taylor Error Estimation</a>
      <a className="sb-link" href="#quiz-176">Quiz 17.6</a>
      <a className="sb-link" href="#s177">Engineering Computations</a>
      <a className="sb-link" href="#quiz-177">Quiz 17.7</a>
      <a className="sb-link" href="#taylor-cert-p2">Certificate examples</a>
    </nav>
  );
}

function GuideHeaderPart2() {
  return (
    <header className="ch-hdr">
      <div className="ch-eye">Multivariable Calculus Study Guide · Part 2 of 2</div>
      <h1 className="ch-title">Taylor Series</h1>
      <p className="ch-sub">Convergence, Error Bounds &amp; Engineering Applications</p>
      <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
    </header>
  );
}

function TableOfContentsPart2() {
  return (
    <nav className="toc">
      <div className="toc-h">Contents — Part 2 of 2</div>
      <div className="toc-grid">
        <a className="toc-a" href="#s174">Common Maclaurin Expansions</a>
        <a className="toc-a" href="#s175">Radius of Convergence</a>
        <a className="toc-a" href="#s176">Taylor Error Estimation</a>
        <a className="toc-a" href="#s177">Engineering Computations</a>
      </div>
    </nav>
  );
}

function SectionS174() {
  return (
    <section className="section" id="s174">
      <div className="sec-badge">{"Section 17.4"}</div>
      <h2 className="sec-title">{"The Canonical Maclaurin Series Catalog"}</h2>
      <p>
        {"Rather than repeatedly calculating derivatives from scratch, mathematicians and engineers manipulate known canonical Maclaurin expansions via algebraic substitution, term-by-term differentiation, and integration."}
      </p>
      <div className="box ex">
        <div className="box-lbl">{"Standard Maclaurin Series Master Catalog"}</div>
        <ul className="summary-list" style={{ gap: "12px", padding: "12px" }}>
          <li>
            <strong>{"Exponential:"}</strong>{" "}
            {"$e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots$"}
            <span style={{ color: "var(--gold)", marginLeft: "8px" }}>{"(Valid for all $x \\in \\mathbb{R}, R = \\infty$)"}</span>
          </li>
          <li>
            <strong>{"Sine (Odd):"}</strong>{" "}
            {"$\\sin(x) = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!} = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots$"}
            <span style={{ color: "var(--gold)", marginLeft: "8px" }}>{"(Valid for all $x \\in \\mathbb{R}, R = \\infty$)"}</span>
          </li>
          <li>
            <strong>{"Cosine (Even):"}</strong>{" "}
            {"$\\cos(x) = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n}}{(2n)!} = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots$"}
            <span style={{ color: "var(--gold)", marginLeft: "8px" }}>{"(Valid for all $x \\in \\mathbb{R}, R = \\infty$)"}</span>
          </li>
          <li>
            <strong>{"Geometric Series:"}</strong>{" "}
            {"$\\frac{1}{1-x} = \\sum_{n=0}^{\\infty} x^n = 1 + x + x^2 + x^3 + \\dots$"}
            <span style={{ color: "var(--gold)", marginLeft: "8px" }}>{"(Valid for $|x| < 1, R = 1$)"}</span>
          </li>
          <li>
            <strong>{"Natural Logarithm:"}</strong>{" "}
            {"$\\ln(1+x) = \\sum_{n=1}^{\\infty} \\frac{(-1)^{n-1} x^n}{n} = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots$"}
            <span style={{ color: "var(--gold)", marginLeft: "8px" }}>{"(Valid for $-1 < x \\leq 1, R = 1$)"}</span>
          </li>
          <li>
            <strong>{"Arctangent:"}</strong>{" "}
            {"$\\arctan(x) = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{2n+1} = x - \\frac{x^3}{3} + \\frac{x^5}{5} - \\dots$"}
            <span style={{ color: "var(--gold)", marginLeft: "8px" }}>{"(Valid for $|x| \\leq 1, R = 1$)"}</span>
          </li>
        </ul>
      </div>

      <div className="box exm">
        <div className="box-lbl">{"Catalog Substitution Example"}</div>
        <div className="exm-title">{"Find the Maclaurin series for $g(x) = x^2 e^{-x^2}$ up to degree 6."}</div>
        <div className="sol">
          <div className="sol-lbl">{"Solution Steps"}</div>
          <ol className="steps">
            <li>
              {"Start with the standard exponential series: $e^u = 1 + u + \\frac{u^2}{2!} + \\frac{u^3}{3!} + \\dots$"}
            </li>
            <li>
              {"Substitute $u = -x^2$: $e^{-x^2} = 1 - x^2 + \\frac{(-x^2)^2}{2!} - \\frac{(-x^2)^3}{3!} + \\dots = 1 - x^2 + \\frac{x^4}{2} - \\frac{x^6}{6} + \\dots$"}
            </li>
            <li>
              {"Multiply the entire expansion by $x^2$: $x^2 e^{-x^2} = x^2 - x^4 + \\frac{x^6}{2} - \\frac{x^8}{6} + \\dots$"}
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

function SectionS175() {
  return (
    <section className="section" id="s175">
      <div className="sec-badge">{"Section 17.5"}</div>
      <h2 className="sec-title">{"Radius & Intervals of Convergence Boundaries"}</h2>
      <p>
        {"An infinite series polynomial must be evaluated to ensure it doesn't add up to an infinite value. We use the Ratio Test to find the safe window of operation, setting up the absolute limit inequality:"}
        {"$$\\lim_{n \\to \\infty} \\left| \\frac{a_{n+1}}{a_n} \\right| < 1$$"}
        {"Solving this inequality reveals the Radius of Convergence $R$, defining the valid boundary domain where our polynomial cleanly matches our function."}
      </p>
    </section>
  );
}

function SectionS176() {
  return (
    <section className="section" id="s176">
      <div className="sec-badge">{"Section 17.6"}</div>
      <h2 className="sec-title">{"Taylor's Inequality & Remainder Error Bounds"}</h2>
      <p>
        {"In practical applications, we can't sum infinite terms; we have to truncate (cut off) the polynomial at a certain degree $n$. The leftover part is the remainder error, $R_n(x) = f(x) - P_n(x)$. We use Taylor's Inequality to find the exact maximum upper bound of this error margin:"}
        {"$$\\left| R_n(x) \\right| \\leq \\frac{M}{(n+1)!} \\left| x - a \\right|^{n+1}$$"}
        {"Here, $M$ represents the maximum absolute value achieved by the $(n+1)$-th derivative within the tracking region range."}
      </p>
    </section>
  );
}

function SectionS177() {
  return (
    <section className="section" id="s177">
      <div className="sec-badge">{"Section 17.7"}</div>
      <h2 className="sec-title">{"Applied Computational Engineering Workflows"}</h2>
      <p>
        {"In engineering contexts, Taylor series simplify complex physics equations. For instance, dropping everything after the linear term in a sine expansion gives us the small-angle approximation: $\\sin(x) \\approx x$. Additionally, they let us evaluate non-elementary integrals (like $\\int e^{-x^2} dx$) by converting the integrand into its polynomial series format and integrating term-by-term instead."}
      </p>
    </section>
  );
}

function SectionObj18Enrichment() {
  return (
    <section className="section" id="taylor-enrich">
      <div className="sec-badge">{"Deeper Dive"}</div>
      <h2 className="sec-title">{"Remainder Estimates and Catalog Moves"}</h2>
      <p>
        {"After building $T_n(x)$, the size of the next term (or a Lagrange remainder bound) tells you whether the truncation is accurate enough for the interval you care about."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Theory"}</div>
        <p>{"If $|f^{(n+1)}|\\le M$ on an interval containing $a$ and $x$, then $|R_n(x)|\\le \\frac{M}{(n+1)!}|x-a|^{n+1}$. Smaller intervals and larger $n$ shrink the error."}</p>
      </div>
      <div className="box exm">
        <div className="box-lbl">{"Worked Example"}</div>
        <div className="exm-title">{"Approximate $e^{0.1}$ with $T_2(x)=1+x+x^2/2$ about 0."}</div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"$T_2(0.1)=1.105$. True $e^{0.1}\\approx 1.10517$, so absolute error is about $1.7\\times 10^{-4}$."}</p>
        </div>
      </div>
    </section>
  );
}

function SectionSummary() {
  return (
    <section className="section summary-box">
      <h2 className="summary-title">Taylor Series Operational Checklist</h2>
      <ul className="summary-list">
        <li>{"Construct expansions using higher derivatives scaled by matching factorials ($n!$)"}</li>
        <li>{"Simplify calculations at the origin ($a=0$) using standard Maclaurin template conversions."}</li>
        <li>{"Verify valid calculation zones by running a Ratio Test to find the radius of convergence $R$."}</li>
        <li>{"Bound your truncation errors using Taylor's inequality remainder checkpoints."}</li>
      </ul>
    </section>
  );
}

// ==========================================
// CENTRAL ROUTER ROUTING CONTAINER
// ==========================================

function TaylorSeriesGuide({ section }) {
  if (section === 2) {
    return (
      <StudyGuideShell
        guideClass="partial-derivatives-guide"
        title="Taylor Series: Applications (Part 2)"
      >
        <GuideSidebarPart2 />
        <main className="main">
          <GuideHeaderPart2 />
          <TableOfContentsPart2 />
          <Divider />
          <OpeningNote />
          <Divider />
          <SectionS174 />
          <GuideMcqSection id="quiz-174" badge="Practice" title="Series Catalog" scoreId="scoretaylor-catalog" section="taylor-catalog" questions={TAYLOR_CATALOG_QUIZ} />
          <Divider />
          <SectionS175 />
          <GuideMcqSection id="quiz-175" badge="Practice" title="Convergence" scoreId="scoretaylor-convergence" section="taylor-convergence" questions={TAYLOR_CONVERGENCE_QUIZ} />
          <Divider />
          <SectionS176 />
          <GuideMcqSection id="quiz-176" badge="Practice" title="Error Bounds" scoreId="scoretaylor-error" section="taylor-error" questions={TAYLOR_ERROR_QUIZ} />
          <Divider />
          <SectionS177 />
          <GuideMcqSection id="quiz-177" badge="Practice" title="Engineering Uses" scoreId="scoretaylor-engineering" section="taylor-engineering" questions={TAYLOR_ENGINEERING_QUIZ} />
          <Divider />
          <SectionObj18Enrichment />
          <Divider />
          <TaylorExtendedPart2 />
          <Divider />
          <TaylorCertificateBoost part={2} />
          <Divider />
          <GuideMcqSection id="quiz-taylor-challenge" badge="Challenge" title="Mixed Challenge" scoreId="scoretaylor-challenge" section="taylor-challenge" questions={TAYLOR_CHALLENGE_QUIZ} />
          <Divider />
          <SectionSummary />
        </main>
      </StudyGuideShell>
    );
  }

  return (
    <StudyGuideShell
      guideClass="partial-derivatives-guide"
      title="Taylor Series: Foundations (Part 1)"
    >
      <GuideSidebarPart1 />
      <main className="main">
        <GuideHeaderPart1 />
        <TableOfContentsPart1 />
        <Divider />
        <OpeningNote />
        <Divider />
        <SectionS171 />
        <GuideMcqSection id="quiz-171" badge="Practice" title="Taylor Concept" scoreId="scoretaylor-concept" section="taylor-concept" questions={TAYLOR_CONCEPT_QUIZ} />
        <Divider />
        <SectionS172 />
        <GuideMcqSection id="quiz-172" badge="Practice" title="Taylor Formula" scoreId="scoretaylor-formula" section="taylor-formula" questions={TAYLOR_FORMULA_QUIZ} />
        <Divider />
        <SectionS173 />
        <GuideMcqSection id="quiz-173" badge="Practice" title="Maclaurin Core" scoreId="scoremaclaurin-core" section="maclaurin-core" questions={MACLAURIN_CORE_QUIZ} />
        <Divider />
        <SectionObj18Enrichment />
        <Divider />
        <TaylorExtendedPart1 />
        <Divider />
        <TaylorCertificateBoost part={1} />
        <Divider />
        <Divider />
        <section id="summary1" className="section">
          <div className="sec-badge">{"Reference"}</div>
          <h2 className="sec-title">{"Part 1 Foundations Complete"}</h2>
          <p>
            {"Continue to "}
            <Link to="/taylor-series/2" style={{ color: "var(--gold)", fontWeight: 600 }}>
              {"Part 2: Convergence, Error Bounds & Applications"}
            </Link>
            {"."}
          </p>
        </section>
      </main>
    </StudyGuideShell>
  );
}

export default TaylorSeriesGuide;