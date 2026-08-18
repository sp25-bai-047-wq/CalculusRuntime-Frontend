import React from "react";
import { GuideMcqSection } from "../components/GuideMcq";
import {
  LAGRANGE_GEOMETRY_QUIZ,
  LAGRANGE_MATH_QUIZ,
  LAGRANGE_FIELDS_QUIZ,
  LAGRANGE_CALC_QUIZ,
  LAGRANGE_MULTI_QUIZ,
  LAGRANGE_VERIFY_QUIZ,
  LAGRANGE_INDUSTRY_QUIZ,
  LAGRANGE_CHALLENGE_QUIZ,
} from "../data/mvLagrangeQuizzes";
import { Link } from "react-router-dom";
import StudyGuideShell from "./StudyGuideShell";
import "./PartialDerivativesGuide.css";
import { RealLifeUse } from "./calculus/CalcBlocks";
import {
  LagrangeExtendedPart1,
  LagrangeExtendedPart2,
} from "./GuideExtendedMaterials";
import MvCertificateBoost from "./MvCertificateBoost";

function Divider() {
  return <hr className="divider" />;
}

function OpeningNote() {
  return (
    <div className="opening-note-box">
      <p className="opening-note">
        <strong>Operational Blueprint:</strong> This study guide delivers an exhaustive treatment of constrained optimization via the method of Lagrange Multipliers. In multivariable calculus, optimizing an objective function over an unrestricted domain relies simply on locating critical points where the gradient vanishes. However, physical systems—such as thermodynamic equilibrium boundaries, structural load constraints, and machine learning loss surfaces—are universally bound by operational restrictions. This module formalizes the geometric alignment mechanics required to resolve these complex systems.
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
        <div className="sb-title">Lagrange Multipliers · Part 1</div>
      </div>
      <div className="sb-group">Sections</div>
      <a className="sb-link" href="#s151">Geometric Intuition</a>
      <a className="sb-link" href="#quiz-151">Quiz 15.1</a>
      <a className="sb-link" href="#s152">Gradient Alignment</a>
      <a className="sb-link" href="#quiz-152">Quiz 15.2</a>
      <a className="sb-link" href="#s153">Objective vs Constraint</a>
      <a className="sb-link" href="#quiz-153">Quiz 15.3</a>
    </nav>
  );
}

function GuideHeaderPart1() {
  return (
    <header className="ch-hdr">
      <div className="ch-eye">Multivariable Calculus Study Guide · Part 1 of 2</div>
      <h1 className="ch-title">Lagrange Multipliers</h1>
      <p className="ch-sub">Geometric Tangency, Vector Alignments &amp; Boundary Physics</p>
      <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
    </header>
  );
}

function TableOfContentsPart1() {
  return (
    <nav className="toc">
      <div className="toc-h">Contents — Part 1 of 2</div>
      <div className="toc-grid">
        <a className="toc-a" href="#s151">Geometric Intuition</a>
        <a className="toc-a" href="#s152">Gradient Alignment</a>
        <a className="toc-a" href="#s153">Objective vs Constraint</a>
        <a className="toc-a" href="#quiz-151">Practice Quizzes</a>
      </div>
    </nav>
  );
}

function SectionS151() {
  return (
    <section className="section" id="s151">
      <div className="sec-badge">{"Section 15.1"}</div>
      <h2 className="sec-title">{"The Geometric Core Intuition"}</h2>
      <p>
        {"Imagine you are hiking on a 3D topographic terrain map defined by an objective elevation function $f(x, y)$. Your explicit mathematical goal is to find the highest peak or lowest valley. If there are no rules restriction parameters, you simply search for standard unconstrained critical points where the surface flattens completely. However, suppose you are forced to stay strictly on a paved path laid across the mountain. This path represents a constraint function curve, modeled as a level curve set to a constant value: $g(x,y) = c$."}
      </p>
      <p>
        {"To track this visually, project the level curves of $f(x,y)$ down onto a 2D coordinate plane alongside the constraint line $g(x,y) = c$. As you walk along the path, you cross various contours of $f(x,y)$. If your path cuts directly across a level curve line of $f$, it means your elevation is actively changing as you move forward. Therefore, that specific coordinate point cannot possibly be an extreme value along your path."}
      </p>
      <p>
        {"The elevation along your path stops changing only when the path runs completely parallel to a contour line of $f(x,y)$ for an infinitesimal moment. Geometrically, this means the constraint curve $g(x,y) = c$ is perfectly tangent to a level curve of $f(x,y)$. The moment these two distinct geometric curves share a tangent line, their corresponding orthogonal normal vectors must line up along the exact same linear path axis."}
      </p>
    </section>
  );
}

function SectionS152() {
  return (
    <section className="section" id="s152">
      <div className="sec-badge">{"Section 15.2"}</div>
      <h2 className="sec-title">{"Mathematical Derivation of Gradient Alignment"}</h2>
      <p>
        {"Since the gradient vector $\\nabla f(x, y)$ is mathematically defined to always point perpendicular to its function's level curves, and $\\nabla g(x, y)$ points perpendicular to its constraint curve, our geometric tangency condition translates into a clean vector equation system. If two vectors point along the exact same straight line axis, one must be a scalar multiple of the other."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"The Definitive Core Lagrange Vector Identity"}</div>
        {"The master equation governing all constrained optimization spaces states:"}
        <div className="fml">
          {"$$\\nabla f(x, y) = \\lambda \\nabla g(x, y)$$"}
        </div>
        {"Where the scalar variable parameter $\\lambda$ (Lambda) is called the Lagrange Multiplier."}
      </div>
      <RealLifeUse>
        Budget caps, material limits, and production quotas are constraints $g=c$; Lagrange multipliers find the best design on that boundary — optimize under a fixed budget.
      </RealLifeUse>

      <p>
        {"To solve this practically, we break this vector identity down into individual component algebraic equations. For a standard 2D space coordinate tracking system, this expands into a set of three independent equations with three variables ($x, y, \\lambda$):"}
      </p>
      <div className="box ex">
        <div className="box-lbl">{"Expanded System of Equations"}</div>
        {"1. Component X alignment: $$\\frac{\\partial f}{\\partial x} = \\lambda \\frac{\\partial g}{\\partial x}$$"}
        {"2. Component Y alignment: $$\\frac{\\partial f}{\\partial y} = \\lambda \\frac{\\partial g}{\\partial y}$$"}
        {"3. Constraint closure verification: $$g(x, y) = c$$"}
      </div>
    </section>
  );
}

function SectionS153() {
  return (
    <section className="section" id="s153">
      <div className="sec-badge">{"Section 15.3"}</div>
      <h2 className="sec-title">{"Deconstructing Objective vs Constraint Fields"}</h2>
      <p>
        {"A common point of confusion is accidentally mixing up the objective function and the constraint function during setup. The objective function $f(x,y)$ represents the field quantity you want to maximize or minimize—like profit margins, heat distribution, or structural efficiency. This function doesn't have a fixed value set in stone; its value shifts as you explore different parts of the map."}
      </p>
      <p>
        {"The constraint function $g(x,y)$, on the other hand, represents a hard limit or rule. It is always locked to a constant value ($g(x,y) = c$). This constant value defines the boundary of your searchable world, restricting you to a specific subset of coordinates inside your input space."}
      </p>
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
        <div className="sb-title">Lagrange Multipliers · Part 2</div>
      </div>
      <div className="sb-group">Sections</div>
      <a className="sb-link" href="#s154">Single Constraint Workflows</a>
      <a className="sb-link" href="#quiz-154">Quiz 15.4</a>
      <a className="sb-link" href="#s155">Multi-Constraint Systems</a>
      <a className="sb-link" href="#quiz-155">Quiz 15.5</a>
      <a className="sb-link" href="#s156">Extreme Value Verifications</a>
      <a className="sb-link" href="#quiz-156">Quiz 15.6</a>
      <a className="sb-link" href="#s157">Industrial Physics Dynamics</a>
      <a className="sb-link" href="#quiz-157">Quiz 15.7</a>
    </nav>
  );
}

function GuideHeaderPart2() {
  return (
    <header className="ch-hdr">
      <div className="ch-eye">Multivariable Calculus Study Guide · Part 2 of 2</div>
      <h1 className="ch-title">Lagrange Multipliers</h1>
      <p className="ch-sub">Applications, Dual Constraints &amp; Engineering Workflows</p>
      <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
    </header>
  );
}

function TableOfContentsPart2() {
  return (
    <nav className="toc">
      <div className="toc-h">Contents — Part 2 of 2</div>
      <div className="toc-grid">
        <a className="toc-a" href="#s154">Single Constraint Workflows</a>
        <a className="toc-a" href="#s155">Multi-Constraint Systems</a>
        <a className="toc-a" href="#s156">Extreme Value Verifications</a>
        <a className="toc-a" href="#s157">Industrial Physics Dynamics</a>
      </div>
    </nav>
  );
}

function SectionS154() {
  return (
    <section className="section" id="s154">
      <div className="sec-badge">{"Section 15.4"}</div>
      <h2 className="sec-title">{"Single Constraint Computational Workflows"}</h2>
      <p>
        {"When solving a single-constraint problem manually, the most efficient tactic is usually to isolate and eliminate the multiplier parameter $\\lambda$ as quickly as possible. Let's work through a practical optimization problem step by step to see how this works."}
      </p>
      <div className="box ex">
        <div className="box-lbl">{"Step-by-Step Engineering Calculation"}</div>
        <p>{"Maximize the function $f(x,y) = xy$ subject to the boundary constraint equation $x^2 + y^2 = 8$."}</p>
        <p>{"Step 1: Compute your gradients."}</p>
        {"$$\\nabla f = \\langle y, x \\rangle, \\quad \\nabla g = \\langle 2x, 2y \\rangle$$"}
        <p>{"Step 2: Set up your component balance equations using your multiplier."}</p>
        {"$$y = \\lambda(2x) \\quad \\Rightarrow \\quad \\lambda = \\frac{y}{2x}$$"}
        {"$$x = \\lambda(2y) \\quad \\Rightarrow \\quad \\lambda = \\frac{x}{2y}$$"}
        <p>{"Step 3: Equate your lambda expressions to build a direct relationship between your inputs."}</p>
        {"$$\\frac{y}{2x} = \\frac{x}{2y} \\quad \\Rightarrow \\quad 2y^2 = 2x^2 \\quad \\Rightarrow \\quad y^2 = x^2$$"}
        <p>{"Step 4: Plug this relationship back into your constraint equation to solve for your coordinates."}</p>
        {"$$x^2 + x^2 = 8 \\quad \\Rightarrow \\quad 2x^2 = 8 \\quad \\Rightarrow \\quad x^2 = 4 \\quad \\Rightarrow \\quad x = \\pm 2$$"}
        <p>{"This yields four distinct critical coordinate points to check: $(2,2), (2,-2), (-2,2),$ and $(-2,-2)$."}</p>
      </div>
      <RealLifeUse>
        Packing the most volume into a shipping crate with a fixed surface-area budget, or maximizing utility under income constraints in economics, uses this exact single-constraint workflow.
      </RealLifeUse>

    </section>
  );
}

function SectionS155() {
  return (
    <section className="section" id="s155">
      <div className="sec-badge">{"Section 15.5"}</div>
      <h2 className="sec-title">{"Multi-Constraint Optimization Spaces"}</h2>
      <p>
        {"In advanced engineering and physics problems, you will often find yourself tracking multiple boundary rules at the same time. For example, a spacecraft might need to minimize fuel usage while staying locked onto a specific orbital trajectory line. Geometrically, if you have two distinct constraints, $g(x,y,z) = c$ and $h(x,y,z) = d$, your boundary path is formed by the intersection line where these two surfaces meet."}
      </p>
      <p>
        {"For an objective function to hit an extreme value along this intersection curve, its gradient $\\nabla f$ must sit inside the flat plane spanned by the normal vectors of both constraint surfaces. This means we must introduce a second distinct multiplier variable ($\\mu$, Mu) to balance our vector equation space:"}
      </p>
      <div className="box def">
        <div className="box-lbl">{"The Multi-Constraint Lagrange Vector Identity"}</div>
        <div className="fml">
          {"$$\\nabla f = \\lambda \\nabla g + \\mu \\nabla h$$"}
        </div>
      </div>
    </section>
  );
}

function SectionS156() {
  return (
    <section className="section" id="s156">
      <div className="sec-badge">{"Section 15.6"}</div>
      <h2 className="sec-title">{"Extreme Value Verification Tests"}</h2>
      <p>
        {"The classic Lagrange method has a major limitation: it only highlights critical points. It doesn't tell you whether those points are maximums or minimums. Even worse, you cannot use the standard unconstrained Second Derivative Test here because we are only looking for extreme values along a constrained boundary line."}
      </p>
      <p>
        {"If your constraint boundary forms a closed, bounded shape—like a solid sphere or a locked bounding box—the Extreme Value Theorem guarantees that an absolute maximum and minimum must exist. In these scenarios, you can simply calculate the objective function's value at all your critical points and compare them directly: the highest result is your maximum, and the lowest is your minimum."}
      </p>
    </section>
  );
}

function SectionS157() {
  return (
    <section className="section" id="s157">
      <div className="sec-badge">{"Section 15.7"}</div>
      <h2 className="sec-title">{"Industrial Physics & Economic Dynamics"}</h2>
      <p>
        {"In industrial physics and macroeconomics, the Lagrange multiplier $\\lambda$ has a powerful physical meaning beyond acting as a basic balancing scalar. It tracks the shadow price or sensitivity rate of your system. Specifically, $\\lambda$ measures exactly how much your optimized objective value would increase or decrease if you loosened your constraint boundary rule by a single unit index."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"The Sensitivity Interpretation Formula"}</div>
        <div className="fml">
          {"$$\\lambda = \\frac{\\partial f^*}{\\partial c}$$"}
        </div>
        {"Where $f^*$ represents the optimal value achieved by your objective function under a constraint level value $c$."}
      </div>
    </section>
  );
}

function SectionObj18Enrichment() {
  return (
    <section className="section" id="lagrange-enrich">
      <div className="sec-badge">{"Deeper Dive"}</div>
      <h2 className="sec-title">{"Sensitivity of $\\lambda$ and Second Checks"}</h2>
      <p>
        {"Once $\\nabla f = \\lambda \\nabla g$ and $g=c$ are solved, compare objective values at every candidate. On a compact constraint the extreme values must occur among those candidates (provided $\\nabla g \\ne \\mathbf{0}$)."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Theory"}</div>
        <p>{"$\\lambda$ is the rate of change of the optimal value of $f$ with respect to the constraint level $c$. A large $|\\lambda|$ means the optimum is very sensitive to small budget or resource changes."}</p>
      </div>
      <div className="box exm">
        <div className="box-lbl">{"Worked Example"}</div>
        <div className="exm-title">{"Maximize $f=xy$ on $x+y=10$."}</div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"$\\nabla f=(y,x)$, $\\nabla g=(1,1)$ gives $y=\\lambda$, $x=\\lambda$, so $x=y$. With $x+y=10$, $x=y=5$, $f=25$, and $\\lambda=5$."}</p>
        </div>
      </div>
    </section>
  );
}

function SectionRealWorld() {
  return (
    <section className="section" id="lagrange-real-world">
      <div className="sec-badge">{"Applications"}</div>
      <h2 className="sec-title">{"Where This Shows Up in Real Life"}</h2>
      <div className="box def">
        <div className="box-lbl">{"Real-World Use"}</div>
        <p>
          {"Lagrange multipliers are the mathematical engine behind almost every "}
          <strong>{"constrained optimization"}</strong>
          {" problem in engineering and economics. Airlines use them to maximize seating revenue subject to fuel-weight limits; portfolio managers maximize expected return subject to a fixed risk budget; and structural engineers minimize material cost subject to a required load-bearing strength."}
        </p>
        <p>
          {"In machine learning, Support Vector Machines \u2014 a widely used classification algorithm \u2014 are trained by solving a Lagrange multiplier problem: maximizing the margin between classes subject to every data point being correctly classified. And the $\\lambda$ we computed throughout this guide is exactly what economists call a "}
          <strong>{"shadow price"}</strong>
          {" \u2014 the value of relaxing a constraint by one unit, which is precisely how a factory manager decides whether it's worth buying more raw material or a government decides whether to loosen a regulatory limit."}
        </p>
      </div>
    </section>
  );
}

function SectionSummary() {
  return (
    <section className="section summary-box">
      <h2 className="summary-title">Lagrange Multipliers Operational Checklist</h2>
      <ul className="summary-list">
        <li>{"Isolate your objective target function $f$ from your boundary rule constraint equation $g=c$."}</li>
        <li>{"Compute your partial derivative gradients and set up the balancing system: $\\nabla f = \\lambda \\nabla g$."}</li>
        <li>{"Eliminate the scalar parameter $\\lambda$ early to map out your coordinate relationships cleanly."}</li>
        <li>{"Verify your final critical points by comparing their values directly over compact boundary regions."}</li>
      </ul>
    </section>
  );
}

// ==========================================
// CENTRAL ROUTER ROUTING CONTAINER
// ==========================================

function LagrangeMultipliersGuide({ section }) {
  if (section === 2) {
    return (
      <StudyGuideShell
        guideClass="partial-derivatives-guide"
        title="Lagrange Multipliers: Applications (Part 2)"
      >
        <GuideSidebarPart2 />
        <main className="main">
          <GuideHeaderPart2 />
          <TableOfContentsPart2 />
          <Divider />
          <SectionS154 />
          <GuideMcqSection id="quiz-154" badge="Practice" title="Workflow Calculation Drills" scoreId="scorelagrange-calc" section="lagrange-calc" questions={LAGRANGE_CALC_QUIZ} />
          <Divider />
          <SectionS155 />
          <GuideMcqSection id="quiz-155" badge="Practice" title="Multi-Constraint System Drills" scoreId="scorelagrange-multi" section="lagrange-multi" questions={LAGRANGE_MULTI_QUIZ} />
          <Divider />
          <SectionS156 />
          <GuideMcqSection id="quiz-156" badge="Practice" title="Verification Theory Assessments" scoreId="scorelagrange-verify" section="lagrange-verify" questions={LAGRANGE_VERIFY_QUIZ} />
          <Divider />
          <SectionS157 />
          <GuideMcqSection id="quiz-157" badge="Practice" title="Industrial Physics Applications" scoreId="scorelagrange-industry" section="lagrange-industry" questions={LAGRANGE_INDUSTRY_QUIZ} />
          <Divider />
          <SectionObj18Enrichment />
          <Divider />
          <LagrangeExtendedPart2 />
          <Divider />
          <MvCertificateBoost topic="lagrange" part={2} />
          <Divider />
          <GuideMcqSection id="quiz-lagrange-challenge" badge="Challenge" title="Medium & Hard Practice" scoreId="scorelagrange-challenge" section="lagrange-challenge" questions={LAGRANGE_CHALLENGE_QUIZ} />
          <Divider />
          <SectionRealWorld />
          <Divider />
          <SectionSummary />
        </main>
      </StudyGuideShell>
    );
  }

  return (
    <StudyGuideShell
      guideClass="partial-derivatives-guide"
      title="Lagrange Multipliers: Foundations (Part 1)"
    >
      <GuideSidebarPart1 />
      <main className="main">
        <GuideHeaderPart1 />
        <TableOfContentsPart1 />
        <Divider />
        <OpeningNote />
        <Divider />
        <SectionS151 />
        <GuideMcqSection id="quiz-151" badge="Practice" title="Geometric Intuition Assessments" scoreId="scorelagrange-geometry" section="lagrange-geometry" questions={LAGRANGE_GEOMETRY_QUIZ} />
        <Divider />
        <SectionS152 />
        <GuideMcqSection id="quiz-152" badge="Practice" title="Mathematical Structure Verifications" scoreId="scorelagrange-math" section="lagrange-math" questions={LAGRANGE_MATH_QUIZ} />
        <Divider />
        <SectionS153 />
        <GuideMcqSection id="quiz-153" badge="Practice" title="Field Deconstruction Drills" scoreId="scorelagrange-fields" section="lagrange-fields" questions={LAGRANGE_FIELDS_QUIZ} />
        <Divider />
        <SectionObj18Enrichment />
        <Divider />
        <LagrangeExtendedPart1 />
        <Divider />
        <MvCertificateBoost topic="lagrange" part={1} />
        <Divider />
        <Divider />
        <section id="summary1" className="section">
          <div className="sec-badge">{"Reference"}</div>
          <h2 className="sec-title">{"Part 1 Foundations Complete"}</h2>
          <p>
            {"Ready to solve high-dimensional calculations? Move on to "}
            <Link to="/lagrange-multipliers/2" style={{ color: "var(--gold)", fontWeight: 600 }}>
              {"Part 2: Applications & Multi-Constraint Frameworks"}
            </Link>
            {" to study complex algebraic substitution workflows, dual boundary systems, and sensitivity rate tracking."}
          </p>
        </section>
      </main>
    </StudyGuideShell>
  );
}

export default LagrangeMultipliersGuide;