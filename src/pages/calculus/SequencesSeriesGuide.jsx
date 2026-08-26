import StudyGuideShell from "../courses/StudyGuideShell";
import "../multivariableCalculus/PartialDerivativesGuide.css";
import { LaMcqSection } from "../linearAlgebra/LaMcq";
import { TheoryBox, PracticalTheory, RealLifeUse, ProcedureBox } from "./CalcBlocks";
import {
  EightExamples,
  SERIES_P1_EXAMPLES,
  SERIES_P2_EXAMPLES,
} from "../../data/calcAgSeriesConicsExamples";
import { SERIES_P1_QUIZ, SERIES_P2_QUIZ } from "../../data/calcAgStudyQuizzes";

function Divider() {
  return <hr className="divider" />;
}

function OpeningNote() {
  return (
    <div className="opening-note-box">
      <p className="opening-note">
        <strong>Operational Blueprint:</strong>{" "}
        {"This study guide establishes the theory of infinite sequences, infinite series, and power series representations in calculus. Sequences represent ordered lists of real numbers whose limits dictate asymptotic stability. An infinite series sums infinite discrete terms $\\sum a_n$, requiring rigorous convergence testing. We master essential diagnostic tests—the Divergence Test, Integral Test, Direct and Limit Comparison Tests, Alternating Series Test, Ratio Test, and Root Test—while distinguishing absolute from conditional convergence. Finally, power series $\\sum c_n(x-a)^n$ establish functional representations with explicit radii and intervals of convergence, underpinning Fourier analysis, financial annuities, and digital signal processing algorithms."}
      </p>
    </div>
  );
}

export default function SequencesSeriesGuide({ part = 1 }) {
  if (part === 2) {
    return (
      <StudyGuideShell guideClass="partial-derivatives-guide" title="Sequences & Series (Part 2)">
        <nav className="sidebar">
          <div className="sb-brand"><div className="sb-title">Series · Part 2</div></div>
          <a className="sb-link" href="#ser-tests">Convergence tests</a>
          <a className="sb-link" href="#ser-proc2">Method</a>
          <a className="sb-link" href="#ser-ex-p2">Examples (8)</a>
          <a className="sb-link" href="#quiz-ser-p2">Quiz · 15 Qs</a>
          <a className="sb-link" href="#ser-life2">Real-life use</a>
        </nav>
        <main className="main">
          <header className="ch-hdr">
            <div className="ch-eye">Calculus &amp; Analytical Geometry · Part 2 of 2</div>
            <h1 className="ch-title">Tests, Absolute Convergence &amp; Power Series</h1>
            <p className="ch-sub">Ratio, root, AST, conditional vs absolute, radius of convergence</p>
            <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
          </header>

          <OpeningNote />
          <Divider />

          <section className="section" id="ser-tests">
            <div className="sec-badge">Section 2.1</div>
            <h2 className="sec-title">Stronger tests and power series</h2>
            <TheoryBox title="Ratio, root, AST, absolute convergence">
              <p>
                {"The ratio and root tests look at $L=\\lim|a_{n+1}/a_n|$ or $\\limsup|a_n|^{1/n}$: $L<1$ absolute convergence, $L>1$ divergence, $L=1$ inconclusive. The alternating series test (AST) needs $|b_n|$ eventually decreasing to $0$. Absolute convergence ($\\sum|a_n|$ converges) implies ordinary convergence; conditional convergence means $\\sum a_n$ converges but $\\sum|a_n|$ does not. A power series $\\sum c_n(x-a)^n$ has a radius $R$; inside $|x-a|<R$ you may differentiate and integrate termwise."}
              </p>
            </TheoryBox>
            <PracticalTheory title="Which test do you reach for?">
              <p>
                {"Factorials or exponentials → ratio. Pure powers → root or $p$-test. Alternating signs with decreasing size → AST. Then ask absolute vs conditional. For $\\sum c_n(x-a)^n$, find $R$ first, then check endpoints separately."}
              </p>
            </PracticalTheory>
            <RealLifeUse>
              Present-value formulas in finance are geometric or $\\sum n r^n$ series; signal-processing
              generating functions and the exponential series $e^x=\\sum x^n/n!$ are the same toolkit
              with a radius large enough for every real input.
            </RealLifeUse>
          </section>

          <section className="section" id="ser-proc2">
            <ProcedureBox
              title="Series test checklist"
              steps={[
                "Check the term test: if $a_n\\not\\to 0$, stop — diverges.",
                "Look for geometric, $p$-series, or telescoping closed forms.",
                "Try comparison / limit comparison with a known series.",
                "Use ratio or root when factorials or exponentials appear.",
                "For alternating series, verify AST; then test absolute convergence separately.",
                "For power series: compute $R$, then test each endpoint.",
              ]}
            />
          </section>

          <section className="section" id="ser-ex-p2">
            <div className="sec-badge">Eight lengthy certificate examples</div>
            <h2 className="sec-title">Tests &amp; power series — detailed solutions</h2>
            <EightExamples items={SERIES_P2_EXAMPLES} />
          </section>

          <LaMcqSection
            id="quiz-ser-p2"
            badge="Quiz"
            title="Series tests & power series (15 questions)"
            scoreId="score-ser-p2"
            section="ser-p2"
            questions={SERIES_P2_QUIZ}
          />

          <Divider />
          <section className="section" id="ser-life2">
            <div className="sec-badge">Certificate close</div>
            <h2 className="sec-title">Why series matter beyond the exam</h2>
            <RealLifeUse>
              Infinite series turn repeating discounts, Fourier modes, and Taylor remainders into
              numbers you can bound. Finishing Part 2 means you can choose a test, classify absolute
              vs conditional convergence, and find a radius of convergence with checkable work.
            </RealLifeUse>
          </section>
        </main>
      </StudyGuideShell>
    );
  }

  return (
    <StudyGuideShell guideClass="partial-derivatives-guide" title="Sequences & Series (Part 1)">
      <nav className="sidebar">
        <div className="sb-brand"><div className="sb-title">Series · Part 1</div></div>
        <a className="sb-link" href="#ser-theory">Sequences &amp; series</a>
        <a className="sb-link" href="#ser-proc1">Method</a>
        <a className="sb-link" href="#ser-ex-p1">Examples (8)</a>
        <a className="sb-link" href="#quiz-ser-p1">Quiz · 15 Qs</a>
        <a className="sb-link" href="#ser-life1">Real-life use</a>
      </nav>
      <main className="main">
        <header className="ch-hdr">
          <div className="ch-eye">Calculus &amp; Analytical Geometry · Part 1 of 2</div>
          <h1 className="ch-title">Sequences, Partial Sums &amp; Basic Series</h1>
          <p className="ch-sub">Limits of sequences, geometric &amp; $p$-series, telescoping, term test</p>
          <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
        </header>

        <OpeningNote />
        <Divider />

        <section className="section" id="ser-theory">
          <div className="sec-badge">Section 1.1</div>
          <h2 className="sec-title">From lists to infinite sums</h2>
          <TheoryBox title="Sequences and series">
            <p>
              {"A sequence $\\{a_n\\}$ is an ordered list; it converges to $L$ when $a_n$ eventually stays arbitrarily close to $L$. A series $\\sum a_n$ converges when the partial sums $s_N=a_1+\\cdots+a_N$ approach a finite limit. Geometric series $\\sum ar^n$ converge for $|r|<1$ to $a/(1-r)$. The term test says $a_n\\to 0$ is necessary. $p$-series $\\sum 1/n^p$ converge iff $p>1$; the harmonic series ($p=1$) diverges. Telescoping series cancel after partial fractions."}
            </p>
          </TheoryBox>
          <PracticalTheory title="First moves on a series problem">
            <p>
              {"Write $a_n$ clearly. Check $a_n\\to 0$. Hunt for geometric, $p$-series, or telescoping structure before heavy tests. Compute a few partial sums when the closed form is available."}
            </p>
          </PracticalTheory>
          <RealLifeUse>
            Zeno-style paradoxes, repeating decimals $0.999\\ldots=1$, and the present value of a
            perpetual payment stream are everyday geometric series in disguise.
          </RealLifeUse>
        </section>

        <section className="section" id="ser-proc1">
          <ProcedureBox
            title="Basic series workflow"
            steps={[
              "Identify $a_n$ and inspect $\\lim a_n$.",
              "If geometric, read off $a$ and $r$; apply $|r|<1$.",
              "If $p$-series, compare $p$ with $1$.",
              "If rational in $n$, try partial fractions / telescoping.",
              "Otherwise prepare comparison or (in Part 2) ratio/root/AST.",
            ]}
          />
        </section>

        <section className="section" id="ser-ex-p1">
          <div className="sec-badge">Eight lengthy certificate examples</div>
          <h2 className="sec-title">Sequences &amp; basic series — detailed solutions</h2>
          <EightExamples items={SERIES_P1_EXAMPLES} />
        </section>

        <LaMcqSection
          id="quiz-ser-p1"
          badge="Quiz"
          title="Sequences & basic series (15 questions)"
          scoreId="score-ser-p1"
          section="ser-p1"
          questions={SERIES_P1_QUIZ}
        />

        <section className="section" id="ser-life1">
          <div className="sec-badge">Certificate close</div>
          <h2 className="sec-title">Where this shows up</h2>
          <RealLifeUse>
            Population models, compound interest, and digital filters all ask whether a discrete
            sequence settles and whether an infinite sum of contributions stays finite — exactly
            Part 1 language.
          </RealLifeUse>
        </section>
      </main>
    </StudyGuideShell>
  );
}
