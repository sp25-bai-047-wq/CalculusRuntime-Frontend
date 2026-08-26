import StudyGuideShell from "../courses/StudyGuideShell";
import "../multivariableCalculus/PartialDerivativesGuide.css";
import { LaMcqSection } from "../linearAlgebra/LaMcq";
import {
  TheoryBox,
  PracticalTheory,
  RealLifeUse,
  ProcedureBox,
} from "./CalcBlocks";
import {
  EightExamples,
  INT_P1_EXAMPLES,
  INT_P2_EXAMPLES,
} from "../../data/calcAgLengthyExamples";
import { INT_FUND_QUIZ, INT_TECH_QUIZ } from "../../data/calcAgStudyQuizzes";

function Divider() {
  return <hr className="divider" />;
}

function OpeningNote() {
  return (
    <div className="opening-note-box">
      <p className="opening-note">
        <strong>Operational Blueprint:</strong>{" "}
        {"This study guide formalizes integral calculus, bridging accumulation concepts with the Fundamental Theorem of Calculus. Definite integrals quantify net signed area, accumulated physical quantities, and continuous volume sums via Riemann limits $\\int_a^b f(x)dx = \\lim_{n \\to \\infty} \\sum_{i=1}^n f(x_i^*)\\Delta x$. The curriculum develops systematic integration strategies including $u$-substitution, integration by parts ($\\int u\\,dv = uv - \\int v\\,du$), trigonometric substitutions, partial fraction decompositions, and improper integral convergence evaluations. These integral tools provide the essential mathematical machinery for computing physical work, fluid pressure, centers of mass, structural stress distributions, and probability density functions in engineering science."}
      </p>
    </div>
  );
}

export default function IntegrationGuide({ part = 1 }) {
  if (part === 2) {
    return (
      <StudyGuideShell guideClass="partial-derivatives-guide" title="Integration (Part 2)">
        <nav className="sidebar">
          <div className="sb-brand"><div className="sb-title">Integration - Part 2</div></div>
          <a className="sb-link" href="#int-tech">Techniques</a>
          <a className="sb-link" href="#int-proc2">Method</a>
          <a className="sb-link" href="#int-ex-p2">Examples (8)</a>
          <a className="sb-link" href="#quiz-int-tech">Quiz 1 - 15 Qs</a>
          <a className="sb-link" href="#int-life2">Real-life use</a>
        </nav>
        <main className="main">
          <header className="ch-hdr">
            <div className="ch-eye">Calculus certificate track - Part 2 of 2</div>
            <h1 className="ch-title">Techniques &amp; Improper Integrals</h1>
            <p className="ch-sub">Substitution, parts, partial fractions, improper integrals</p>
            <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
          </header>

          <OpeningNote />
          <Divider />

          <section className="section" id="int-tech">
            <div className="sec-badge">Section 2.1</div>
            <h2 className="sec-title">Advanced techniques</h2>
            <TheoryBox title="Toolkit">
              <p>
                {"Substitution undoes the chain rule. Integration by parts undoes the product rule: $\\int u\\,dv=uv-\\int v\\,du$. Rational functions often need partial fractions. Improper integrals replace infinite limits or singularities with a limit of proper integrals."}
              </p>
            </TheoryBox>
            <PracticalTheory title="Choosing a method">
              <p>
                {"See a composition with derivative of the inside nearby -> substitution. Product of unrelated families (poly × ln, poly × exp/trig) -> parts. Proper rational with factorable denominator -> partial fractions. Infinite bound or vertical asymptote in interval -> improper."}
              </p>
            </PracticalTheory>
            <RealLifeUse>
              Technique choice is what separates a solvable plant-balance integral from an algebraic
              dead end - the same judgment HEC markers score when they ask "which method?".
            </RealLifeUse>
          </section>

          <section className="section" id="int-proc2">
            <ProcedureBox
              title="Integration by parts LIATE hint"
              steps={[
                "Prefer $u$ in order: Log, Inverse trig, Algebraic, Trig, Exponential (LIATE).",
                "Set $dv$ to the rest (easy to integrate).",
                "Compute $du$ and $v$, apply $uv-\\int v\\,du$.",
                "For definite integrals, evaluate $uv$ at bounds then integrate the remaining piece.",
              ]}
            />
            <RealLifeUse>
              LIATE is a field heuristic, like a lab SOP: it does not always win, but it prevents the
              most common first wrong branch on exam day.
            </RealLifeUse>
          </section>

          <section className="section" id="int-ex-p2">
            <div className="sec-badge">Eight lengthy certificate examples</div>
            <h2 className="sec-title">Techniques - detailed solutions (≥8 steps each)</h2>
            <EightExamples items={INT_P2_EXAMPLES} />
          </section>

          <LaMcqSection
            id="quiz-int-tech"
            badge="Quiz 1"
            title="Techniques (15 questions)"
            scoreId="score-int-tech"
            section="int-tech"
            questions={INT_TECH_QUIZ}
          />

          <section className="section" id="int-life2">
            <div className="sec-badge">Certificate close</div>
            <h2 className="sec-title">Why techniques matter outside class</h2>
            <RealLifeUse>
              Improper integrals decide whether a probability density has a finite mean; substitution
              and parts rebuild closed forms for decaying exponentials and oscillatory forcing in
              circuits. Part 2 is the toolkit that turns "set up the integral" into a finished number.
            </RealLifeUse>
          </section>
        </main>
      </StudyGuideShell>
    );
  }

  return (
    <StudyGuideShell guideClass="partial-derivatives-guide" title="Integration (Part 1)">
      <nav className="sidebar">
        <div className="sb-brand"><div className="sb-title">Integration - Part 1</div></div>
        <a className="sb-link" href="#int-theory">Theory</a>
        <a className="sb-link" href="#int-proc1">Method</a>
        <a className="sb-link" href="#int-ex-p1">Examples (8)</a>
        <a className="sb-link" href="#quiz-int-fund">Quiz 1 - 15 Qs</a>
        <a className="sb-link" href="#int-life1">Real-life use</a>
      </nav>
      <main className="main">
        <header className="ch-hdr">
          <div className="ch-eye">Calculus certificate track - Part 1 of 2</div>
          <h1 className="ch-title">Antiderivatives &amp; the FTC</h1>
          <p className="ch-sub">Area, net change, and the Fundamental Theorem</p>
          <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
        </header>

        <OpeningNote />
        <Divider />

        <section className="section" id="int-theory">
          <div className="sec-badge">Section 1.1</div>
          <h2 className="sec-title">Antiderivatives and the FTC</h2>
          <TheoryBox title="Formal core">
            <p>
              {`An antiderivative of $f$ is any $F$ with $F'=f$. The indefinite integral $\\int f(x)\\,dx=F(x)+C$ names that family. The Fundamental Theorem links area/accumulation to antiderivatives: continuous $f$ on $[a,b]$ satisfies $\\int_a^b f=F(b)-F(a)$, and $\\frac{d}{dx}\\int_a^x f(t)\\,dt=f(x)$.`}
            </p>
            <p style={{ marginTop: "0.75rem" }}>
              {`Signed area matters: negative integrand subtracts. Certificate answers state indefinite vs definite clearly and verify by differentiating.`}
            </p>
          </TheoryBox>
          <PracticalTheory title="How to read a definite integral">
            <p>
              {`Translate first ("net displacement", "total mass"), then reverse differentiation rules. Always differentiate your antiderivative as a one-line check.`}
            </p>
          </PracticalTheory>
          <RealLifeUse>
            The FTC is why a flow meter's rate curve can be turned into total volume delivered - the
            same move as "integrate velocity to get net displacement."
          </RealLifeUse>
        </section>

        <section className="section" id="int-proc1">
          <ProcedureBox
            title="Evaluate a definite integral"
            steps={[
              "Find an antiderivative $F$ (power rule reverse, rewrite first if needed).",
              "Compute $F(b)-F(a)$ carefully with parentheses on negatives.",
              "Interpret sign: negative integrand => signed area below the axis.",
              "Differentiate your $F$ to verify before trusting the number.",
            ]}
          />
          <RealLifeUse>
            Site engineers evaluating cut-and-fill volumes follow the same four steps: antiderivative,
            evaluate bounds, watch sign, verify.
          </RealLifeUse>
        </section>

        <section className="section" id="int-ex-p1">
          <div className="sec-badge">Eight lengthy certificate examples</div>
          <h2 className="sec-title">Foundations - detailed solutions (≥8 steps each)</h2>
          <EightExamples items={INT_P1_EXAMPLES} />
        </section>

        <LaMcqSection
          id="quiz-int-fund"
          badge="Quiz 1"
          title="Foundations (15 questions)"
          scoreId="score-int-fund"
          section="int-fund"
          questions={INT_FUND_QUIZ}
        />

        <section className="section" id="int-life1">
          <div className="sec-badge">Real-world bridge</div>
          <h2 className="sec-title">Where integrals show up outside the exam hall</h2>
          <RealLifeUse>
            Integration accumulates earthworks, spillway discharge over monsoon hours, and total cost
            from marginal-cost curves. Part 1 builds FTC fluency before substitution and parts in
            Part 2 - the same fluency Pakistani board and HEC papers test.
          </RealLifeUse>
        </section>
      </main>
    </StudyGuideShell>
  );
}
