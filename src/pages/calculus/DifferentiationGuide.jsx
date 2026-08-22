import StudyGuideShell from "../StudyGuideShell";
import "../PartialDerivativesGuide.css";
import { LaMcqSection } from "../linearAlgebra/LaMcq";
import {
  TheoryBox,
  PracticalTheory,
  RealLifeUse,
  ProcedureBox,
} from "./CalcBlocks";
import {
  EightExamples,
  DIFF_P1_EXAMPLES,
  DIFF_P2_EXAMPLES,
} from "../../data/calcAgLengthyExamples";
import {
  DIFF_RULES_QUIZ,
  DIFF_APPS_QUIZ,
  DIFF_ADV_QUIZ,
} from "../../data/calcAgStudyQuizzes";

function Divider() {
  return <hr className="divider" />;
}

function OpeningNote() {
  return (
    <div className="opening-note-box">
      <p className="opening-note">
        <strong>Operational Blueprint:</strong>{" "}
        {"This study guide delivers an exhaustive treatment of differential calculus, from fundamental difference quotients to advanced optimization and related rates. Differentiation measures the instantaneous rate of change and the slope of a curve, defined as $f'(x) = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}$. We establish core operational rules—power, product, quotient, and chain rules—alongside implicit and parametric differentiation techniques. Applications include analyzing curve concavity, locating critical points, classifying extrema, utilizing the Mean Value Theorem, and resolving indeterminate limits via L'Hôpital's Rule. These mathematical techniques form the foundational computational machinery for classical physics, mechanical engineering, pharmacokinetics, and economic optimization models."}
      </p>
    </div>
  );
}

export default function DifferentiationGuide({ part = 1 }) {
  if (part === 2) {
    return (
      <StudyGuideShell guideClass="partial-derivatives-guide" title="Differentiation (Part 2)">
        <nav className="sidebar">
          <div className="sb-brand"><div className="sb-title">Differentiation - Part 2</div></div>
          <a className="sb-link" href="#diff-apps">Applications</a>
          <a className="sb-link" href="#diff-proc2">Method</a>
          <a className="sb-link" href="#diff-ex-p2">Examples (8)</a>
          <a className="sb-link" href="#quiz-diff-apps">Quiz 1 - 15 Qs</a>
          <a className="sb-link" href="#diff-advanced">Advanced tools</a>
          <a className="sb-link" href="#quiz-diff-adv">Quiz 2 - 15 Qs</a>
          <a className="sb-link" href="#diff-life2">Real-life use</a>
        </nav>
        <main className="main">
          <header className="ch-hdr">
            <div className="ch-eye">Calculus certificate track - Part 2 of 2</div>
            <h1 className="ch-title">Applications &amp; Advanced Differentiation</h1>
            <p className="ch-sub">Related rates, extrema, MVT, L&apos;Hôpital, implicit &amp; parametric</p>
            <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
          </header>

          <OpeningNote />
          <Divider />

          <section className="section" id="diff-apps">
            <div className="sec-badge">Section 2.1 - Medium -> Advanced</div>
            <h2 className="sec-title">Related rates and extrema</h2>
            <TheoryBox title="Formal ideas">
              <p>
                {"If two quantities are linked by an equation and both change with time $t$, differentiate both sides with respect to $t$ (chain rule) to relate the rates. For extrema of $f$ on an interval: find critical points where $f'=0$ or $f'$ DNE, then use first/second derivative tests or endpoint comparison. Absolute extrema on a closed interval are guaranteed by the Extreme Value Theorem when $f$ is continuous."}
              </p>
            </TheoryBox>
            <PracticalTheory title="How you actually set up related rates">
              <p>
                {"(1) Sketch and name variables. (2) Write one equation that stays true for all $t$. (3) Differentiate with respect to $t$. (4) Plug in the known rates/values at the instant asked - never plug numbers before differentiating unless they are constants."}
              </p>
            </PracticalTheory>
            <RealLifeUse>
              Related rates are how a flood-control engineer converts a river-stage rise rate into a
              volume-fill rate for a reservoir, and how a clinician reads $C'(t)$ from a concentration
              curve $C(t)$. Extrema appear whenever a design trades cost against performance under a
              closed range of admissible settings.
            </RealLifeUse>
          </section>

          <section className="section" id="diff-proc2">
            <ProcedureBox
              title="Related-rates checklist"
              steps={[
                "Draw and label every changing quantity.",
                "Write a geometric/physical equation true for all time.",
                "Differentiate both sides with respect to $t$.",
                "Insert the instant's known values and solve for the unknown rate.",
                "Attach units and sanity-check the sign.",
              ]}
            />
            <RealLifeUse>
              The checklist is the same one used in HSSC related-rates word problems and in plant
              SOPs that convert sensor rates into operator actions.
            </RealLifeUse>
          </section>

          <section className="section" id="diff-ex-p2">
            <div className="sec-badge">Eight lengthy certificate examples</div>
            <h2 className="sec-title">Applications - detailed solutions (≥8 steps each)</h2>
            <EightExamples items={DIFF_P2_EXAMPLES} />
          </section>

          <LaMcqSection
            id="quiz-diff-apps"
            badge="Quiz 1"
            title="Applications (15 questions - harder items unlock last)"
            scoreId="score-diff-apps"
            section="diff-apps"
            questions={DIFF_APPS_QUIZ}
          />

          <Divider />
          <section className="section" id="diff-advanced">
            <div className="sec-badge">Section 2.2</div>
            <h2 className="sec-title">Mean Value Theorem (HEC stretch)</h2>
            <TheoryBox title="MVT">
              <p>
                {"If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then some $c\\in(a,b)$ satisfies $f'(c)=(f(b)-f(a))/(b-a)$. Geometrically: some tangent matches the secant slope. Corollaries give constant-function tests and Lipschitz bounds."}
              </p>
            </TheoryBox>
            <PracticalTheory title="Why examiners love MVT">
              <p>
                {"Use it to prove inequalities, bound how fast $f$ can change, or show there is a point where instantaneous rate equals average rate (e.g. average speed on a highway)."}
              </p>
            </PracticalTheory>
            <RealLifeUse>
              Highway enforcement arguments ("if average speed between toll plazas exceeds the limit,
              then at some instant the instantaneous speed did too") are pure Mean Value Theorem in
              everyday language.
            </RealLifeUse>
          </section>

          <LaMcqSection
            id="quiz-diff-adv"
            badge="Quiz 2"
            title="Advanced tools (15 questions)"
            scoreId="score-diff-adv"
            section="diff-adv"
            questions={DIFF_ADV_QUIZ}
          />

          <section className="section" id="diff-life2">
            <div className="sec-badge">Certificate close</div>
            <h2 className="sec-title">Why this module earns the credential</h2>
            <RealLifeUse>
              Differentiation is the mathematics of rate across pharmacy kinetics, monsoon hydrology,
              and textile machine optimization. Finishing Part 2 means you can set up related rates,
              classify extrema, run L'Hôpital, and handle implicit/parametric models the way HEC
              Calculus I expects - with lengthy, checkable solutions, not one-line answers.
            </RealLifeUse>
          </section>
        </main>
      </StudyGuideShell>
    );
  }

  return (
    <StudyGuideShell guideClass="partial-derivatives-guide" title="Differentiation (Part 1)">
      <nav className="sidebar">
        <div className="sb-brand"><div className="sb-title">Differentiation - Part 1</div></div>
        <a className="sb-link" href="#diff-theory">Theory</a>
        <a className="sb-link" href="#diff-proc1">Method</a>
        <a className="sb-link" href="#diff-ex-p1">Examples (8)</a>
        <a className="sb-link" href="#quiz-diff-rules">Quiz 1 - 15 Qs</a>
        <a className="sb-link" href="#diff-life1">Real-life use</a>
      </nav>
      <main className="main">
        <header className="ch-hdr">
          <div className="ch-eye">Calculus certificate track - Part 1 of 2</div>
          <h1 className="ch-title">Differentiation &amp; Rules</h1>
          <p className="ch-sub">Definition, power/product/quotient/chain - Basic -> Advanced</p>
          <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
        </header>

        <OpeningNote />
        <Divider />

        <section className="section" id="diff-theory">
          <div className="sec-badge">Section 1.1</div>
          <h2 className="sec-title">What a derivative is</h2>
          <TheoryBox title="Limit definition">
            <p>
              {`The derivative of $f$ at $a$ is $f'(a)=\\lim_{h\\to 0}\\frac{f(a+h)-f(a)}{h}$ when the limit exists. It is simultaneously a limiting difference quotient, a tangent slope, and an instantaneous rate. Differentiability is stronger than continuity: corners and cusps can be continuous yet not differentiable.`}
            </p>
            <p style={{ marginTop: "0.75rem" }}>
              {`From the definition you unlock linearity, power, product, quotient, and chain rules. Certificate solutions name the outermost structure, apply the matching rule, then simplify and spot-check.`}
            </p>
          </TheoryBox>
          <PracticalTheory title="Which rule do you reach for?">
            <p>
              {`Rewrite first when helpful. Power for $x^n$. Product for two non-constant factors. Quotient for ratios (or rewrite as a product). Chain for compositions $f(g(x))$. Peel outside-in, like nested parentheses.`}
            </p>
          </PracticalTheory>
          <RealLifeUse>
            The definition is why a speedometer reading is not the same as average trip speed: one is
            an instantaneous rate (derivative), the other a secant slope over a long interval.
          </RealLifeUse>
        </section>

        <section className="section" id="diff-proc1">
          <div className="sec-badge">Procedure</div>
          <ProcedureBox
            title="Differentiate systematically"
            steps={[
              "Simplify algebraically if it removes a quotient or nested root.",
              "Identify the outermost structure (sum / product / quotient / composition).",
              "Apply the matching rule; leave inner pieces for chain rule.",
              "Expand and combine like terms only at the end if asked.",
              "Spot-check with a number or a known special value.",
            ]}
          />
          <RealLifeUse>
            Engineers debugging a symbolic derivative in software use the same checklist: simplify,
            classify, differentiate, verify by finite difference.
          </RealLifeUse>
        </section>

        <section className="section" id="diff-ex-p1">
          <div className="sec-badge">Eight lengthy certificate examples</div>
          <h2 className="sec-title">Rules - detailed solutions (≥8 steps each)</h2>
          <EightExamples items={DIFF_P1_EXAMPLES} />
        </section>

        <LaMcqSection
          id="quiz-diff-rules"
          badge="Quiz 1"
          title="Differentiation rules (15 questions)"
          scoreId="score-diff-rules"
          section="diff-rules"
          questions={DIFF_RULES_QUIZ}
        />

        <section className="section" id="diff-life1">
          <div className="sec-badge">Real-world bridge</div>
          <h2 className="sec-title">Where Part 1 rules show up outside the exam hall</h2>
          <RealLifeUse>
            Differentiation is the mathematics of rate: drug concentration decay, reservoir fill in
            monsoon inflow, and textile spindle speed versus thread tension. Mastering the rules in
            Part 1 is what lets you set up those models in Part 2 without getting lost in algebra.
          </RealLifeUse>
        </section>
      </main>
    </StudyGuideShell>
  );
}
