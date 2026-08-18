import StudyGuideShell from "../StudyGuideShell";
import "../PartialDerivativesGuide.css";
import { LaMcqSection } from "../linearAlgebra/LaMcq";
import { TheoryBox, PracticalTheory, RealLifeUse, ProcedureBox } from "./CalcBlocks";
import {
  EightExamples,
  CONICS_P1_EXAMPLES,
  CONICS_P2_EXAMPLES,
} from "../../data/calcAgSeriesConicsExamples";
import { CONICS_P1_QUIZ, CONICS_P2_QUIZ } from "../../data/calcAgStudyQuizzes";

function Divider() {
  return <hr className="divider" />;
}

export default function ConicsGuide({ part = 1 }) {
  if (part === 2) {
    return (
      <StudyGuideShell guideClass="partial-derivatives-guide" title="Conic Sections (Part 2)">
        <nav className="sidebar">
          <div className="sb-brand"><div className="sb-title">Conics · Part 2</div></div>
          <a className="sb-link" href="#con-class">Classification &amp; applications</a>
          <a className="sb-link" href="#con-proc2">Method</a>
          <a className="sb-link" href="#con-ex-p2">Examples (8)</a>
          <a className="sb-link" href="#quiz-con-p2">Quiz · 15 Qs</a>
          <a className="sb-link" href="#con-life2">Real-life use</a>
        </nav>
        <main className="main">
          <header className="ch-hdr">
            <div className="ch-eye">Calculus &amp; Analytical Geometry · Part 2 of 2</div>
            <h1 className="ch-title">General Conics, Rotation &amp; Applications</h1>
            <p className="ch-sub">Discriminant $B^2-4AC$, optics, orbits, navigation</p>
            <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
          </header>

          <section className="section" id="con-class">
            <div className="sec-badge">Section 2.1</div>
            <h2 className="sec-title">From general equation to the real world</h2>
            <TheoryBox title="Discriminant and applications">
              <p>
                {"For $Ax^2+Bxy+Cy^2+Dx+Ey+F=0$, the invariant $B^2-4AC$ classifies the nondegenerate type: $<0$ ellipse, $=0$ parabola, $>0$ hyperbola. An $xy$ term is removed by rotating through $\\theta$ with $\\cot 2\\theta=(A-C)/B$. Reflection properties of the parabola, the string property of the ellipse, and the difference property of the hyperbola power dishes, gardens, and LORAN-style navigation. Inverse-square gravity yields conic orbits with a focus at the sun."}
              </p>
            </TheoryBox>
            <PracticalTheory title="Exam / design workflow">
              <p>
                {"Identify $A,B,C$. Compute $B^2-4AC$. Translate to remove linear terms; rotate if $B\\neq 0$. Read $a,b,c,e$. Then answer the application question (focus, asymptote, orbit type) from the standard form."}
              </p>
            </PracticalTheory>
            <RealLifeUse>
              Satellite dishes and car headlights use the parabolic reflection property; planetary
              orbits are ellipses with the sun at a focus; hyperbolic multilateration turns timing
              differences into position fixes.
            </RealLifeUse>
          </section>

          <section className="section" id="con-proc2">
            <ProcedureBox
              title="General conic checklist"
              steps={[
                "Write coefficients $A,B,C,D,E,F$.",
                "Compute $B^2-4AC$ to classify the type.",
                "Translate (complete the square) and rotate if needed.",
                "Read $a,b,c,e$, foci, directrices, asymptotes.",
                "Match the application: optics, orbits, or navigation.",
              ]}
            />
          </section>

          <section className="section" id="con-ex-p2">
            <div className="sec-badge">Eight lengthy certificate examples</div>
            <h2 className="sec-title">Classification &amp; applications — detailed solutions</h2>
            <EightExamples items={CONICS_P2_EXAMPLES} />
          </section>

          <LaMcqSection
            id="quiz-con-p2"
            badge="Quiz"
            title="General conics & applications (15 questions)"
            scoreId="score-con-p2"
            section="con-p2"
            questions={CONICS_P2_QUIZ}
          />

          <Divider />
          <section className="section" id="con-life2">
            <div className="sec-badge">Certificate close</div>
            <h2 className="sec-title">Analytical geometry in the wild</h2>
            <RealLifeUse>
              Finishing Part 2 means you can classify a general second-degree equation and connect
              standard forms to dishes, orbits, and navigation — the “analytical geometry” half of
              this course title made concrete.
            </RealLifeUse>
          </section>
        </main>
      </StudyGuideShell>
    );
  }

  return (
    <StudyGuideShell guideClass="partial-derivatives-guide" title="Conic Sections (Part 1)">
      <nav className="sidebar">
        <div className="sb-brand"><div className="sb-title">Conics · Part 1</div></div>
        <a className="sb-link" href="#con-theory">Lines, circles, conics</a>
        <a className="sb-link" href="#con-proc1">Method</a>
        <a className="sb-link" href="#con-ex-p1">Examples (8)</a>
        <a className="sb-link" href="#quiz-con-p1">Quiz · 15 Qs</a>
        <a className="sb-link" href="#con-life1">Real-life use</a>
      </nav>
      <main className="main">
        <header className="ch-hdr">
          <div className="ch-eye">Calculus &amp; Analytical Geometry · Part 1 of 2</div>
          <h1 className="ch-title">Distance, Circles &amp; Standard Conics</h1>
          <p className="ch-sub">Distance/midpoint, circle, parabola, ellipse, hyperbola, eccentricity</p>
          <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
        </header>

        <section className="section" id="con-theory">
          <div className="sec-badge">Section 1.1</div>
          <h2 className="sec-title">The classical plane curves</h2>
          <TheoryBox title="Standard forms">
            <p>
              {"Distance and midpoint formulas underpin line geometry. The circle $(x-h)^2+(y-k)^2=r^2$ is the simplest conic. Parabola $y^2=4ax$, ellipse $x^2/a^2+y^2/b^2=1$, and hyperbola $x^2/a^2-y^2/b^2=1$ are classified by eccentricity $e$: circle $e=0$, ellipse $0<e<1$, parabola $e=1$, hyperbola $e>1$. The focus–directrix definition $PF=e\\cdot$(distance to directrix) unifies them. Completing the square turns a general circle equation into standard form."}
            </p>
          </TheoryBox>
          <PracticalTheory title="Reading a conic on sight">
            <p>
              {"Complete the square for circles. Match $4a$, $a^2$, $b^2$ for parabola/ellipse/hyperbola. Compute $c$ and $e=c/a$. Sketch vertices, foci, and directrices before answering word problems."}
            </p>
          </PracticalTheory>
          <RealLifeUse>
            Architects’ arches, whispering galleries (ellipse reflection), and the path of a tossed
            ball (ideal projectile parabola) are standard conics you can write with coordinates.
          </RealLifeUse>
        </section>

        <section className="section" id="con-proc1">
          <ProcedureBox
            title="Standard-form checklist"
            steps={[
              "Identify the curve family from the equation’s shape.",
              "Complete the square or divide to reach standard form.",
              "Read $a$, $b$, $c$, $e$, focus, directrix, asymptotes.",
              "Sketch and mark the geometric features asked for.",
              "Verify one sample point or the focus–directrix relation.",
            ]}
          />
        </section>

        <section className="section" id="con-ex-p1">
          <div className="sec-badge">Eight lengthy certificate examples</div>
          <h2 className="sec-title">Standard conics — detailed solutions</h2>
          <EightExamples items={CONICS_P1_EXAMPLES} />
        </section>

        <LaMcqSection
          id="quiz-con-p1"
          badge="Quiz"
          title="Distance, circles & standard conics (15 questions)"
          scoreId="score-con-p1"
          section="con-p1"
          questions={CONICS_P1_QUIZ}
        />

        <section className="section" id="con-life1">
          <div className="sec-badge">Certificate close</div>
          <h2 className="sec-title">Geometry you can measure</h2>
          <RealLifeUse>
            Surveying, CAD sketches, and school laboratory optics boards all begin with distance,
            circles, and the four eccentricity cases — Part 1 of analytical geometry.
          </RealLifeUse>
        </section>
      </main>
    </StudyGuideShell>
  );
}
