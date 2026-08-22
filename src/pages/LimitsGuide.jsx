import StudyGuideShell from "./StudyGuideShell";
import "./PartialDerivativesGuide.css";
import {
  LimitsExtendedPart1,
  LimitsExtendedPart2,
} from "./GuideExtendedMaterials";
import { LimitsCertificateBoost } from "./calculus/CertificateBoost";
import { LaMcqSection } from "./linearAlgebra/LaMcq";
import { LIMITS_P1_QUIZ, LIMITS_P2_QUIZ } from "../data/calcAgStudyQuizzes";

function Divider() {
  return <hr className="divider" />;
}

function OpeningNote() {
  return (
    <div className="opening-note-box">
      <p className="opening-note">
        <strong>Operational Blueprint:</strong>{" "}
        {"This comprehensive study guide establishes the rigorous theoretical foundation of limits and continuity for single and multivariable functions. A limit formalizes the behavior of a function near a point, mathematically defined via the $\\varepsilon$-$\\delta$ criterion. In multivariable space, the Two-Path Test proves non-existence by demonstrating conflicting directional limits, while the Squeeze Theorem and polar coordinate conversions confirm limit values. Continuity is established when the limit matches the exact functional value across the domain. Mastering these concepts provides the vital analytical bedrock for differential calculus, tangent plane construction, and stability analysis in dynamic physical and engineering systems."}
      </p>
    </div>
  );
}

function GuideSidebarPart1() {
  return (
    <nav className="sidebar">
      <div className="sb-brand">
        <div className="sb-title">{"Limits & Continuity · Part 1"}</div>
      </div>
      <a className="sb-link" href="#lc-1">{"Limits of Two Variables"}</a>
      <a className="sb-link" href="#lc-2">{"Two-Path Test"}</a>
      <a className="sb-link" href="#lc-3">{"Squeeze Theorem"}</a>
      <a className="sb-link" href="#lc-cert-p1">{"Certificate examples (8)"}</a>
      <a className="sb-link" href="#lc-quiz1">{"Quiz 1 · 15 Qs"}</a>
    </nav>
  );
}

function GuideSidebarPart2() {
  return (
    <nav className="sidebar">
      <div className="sb-brand">
        <div className="sb-title">{"Limits & Continuity · Part 2"}</div>
      </div>
      <a className="sb-link" href="#lc-4">{"Continuity at a Point"}</a>
      <a className="sb-link" href="#lc-5">{"Continuity on a Region"}</a>
      <a className="sb-link" href="#lc-cert-p2">{"Certificate examples (8)"}</a>
      <a className="sb-link" href="#lc-quiz2">{"Quiz 2 · 15 Qs"}</a>
    </nav>
  );
}

function GuideHeaderPart1() {
  return (
    <div className="ch-hdr">
      <p className="ch-eye">{"MULTIVARIABLE CALCULUS STUDY GUIDE · PART 1 OF 2"}</p>
      <h1 className="ch-title">{"Limits & Continuity"}</h1>
      <p className="ch-sub">{"Limits of Multivariable Functions, Path Dependence & The Squeeze Theorem"}</p>
      <p className="ch-orn">{"✦ \u00a0 ✦ \u00a0 ✦"}</p>
    </div>
  );
}

function GuideHeaderPart2() {
  return (
    <div className="ch-hdr">
      <p className="ch-eye">{"MULTIVARIABLE CALCULUS STUDY GUIDE · PART 2 OF 2"}</p>
      <h1 className="ch-title">{"Continuity"}</h1>
      <p className="ch-sub">{"Continuity at a Point, Continuity on a Region & Compositions"}</p>
      <p className="ch-orn">{"✦ \u00a0 ✦ \u00a0 ✦"}</p>
    </div>
  );
}

function TableOfContentsPart1() {
  return (
    <div className="toc">
      <p className="toc-h">{"CONTENTS — PART 1 OF 2"}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        <a className="toc-a" href="#lc-1">{"Limits of Two Variables"}</a>
        <a className="toc-a" href="#lc-2">{"Two-Path Test"}</a>
        <a className="toc-a" href="#lc-3">{"Squeeze Theorem"}</a>
        <a className="toc-a" href="#lc-quiz1">{"Quiz 1 · 15 questions"}</a>
      </div>
    </div>
  );
}

function TableOfContentsPart2() {
  return (
    <div className="toc">
      <p className="toc-h">{"CONTENTS — PART 2 OF 2"}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        <a className="toc-a" href="#lc-4">{"Continuity at a Point"}</a>
        <a className="toc-a" href="#lc-5">{"Continuity on a Region"}</a>
        <a className="toc-a" href="#lc-quiz2">{"Quiz 2 · 15 questions"}</a>
      </div>
    </div>
  );
}

function SectionLC1() {
  return (
    <section className="section" id="lc-1">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Limits of Functions of Two Variables"}</h2>
      <p>
        {"We say $\\lim_{(x,y)\\to(a,b)} f(x,y) = L$ if $f(x,y)$ can be made arbitrarily close to $L$ by taking $(x,y)$ sufficiently close to $(a,b)$, regardless of the direction of approach."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Definition \u2014 Limit"}</div>
        <p>
          {"For every $\\varepsilon > 0$ there exists $\\delta > 0$ such that $0 < \\sqrt{(x-a)^2+(y-b)^2} < \\delta \\Rightarrow |f(x,y)-L| < \\varepsilon$."}
        </p>
      </div>
      <h3 className="subsec">{"Direct Substitution"}</h3>
      <p>
        {"If $f$ is a polynomial or rational function and the denominator is non-zero at $(a,b)$, simply substitute directly."}
      </p>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Find $\\lim_{(x,y)\\to(1,2)} (3x^2 + y)$"}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"Substitute directly: $3(1)^2 + 2 = 5$."}</p>
          <div className="fml">{"$$\\lim_{(x,y)\\to(1,2)} (3x^2+y) = 5$$"}</div>
        </div>
      </div>
    </section>
  );
}

function SectionLC2() {
  return (
    <section className="section" id="lc-2">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Two-Path Test"}</h2>
      <p>
        {"If two different paths to $(a,b)$ give different limit values, the overall limit does not exist."}
      </p>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Show $\\lim_{(x,y)\\to(0,0)} \\dfrac{xy}{x^2+y^2}$ does not exist."}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"Along $y=0$: limit $= 0$."}</p>
          <p>{"Along $y=x$: limit $= \\dfrac{1}{2}$."}</p>
          <p>{"Two paths give different values \u2014 limit does not exist."}</p>
        </div>
      </div>
    </section>
  );
}

function SectionLC3() {
  return (
    <section className="section" id="lc-3">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Squeeze Theorem for Two Variables"}</h2>
      <p>
        {"If $|f(x,y)| \\leq g(x,y)$ near $(a,b)$ and $\\lim g = 0$, then $\\lim f = 0$."}
      </p>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Evaluate $\\lim_{(x,y)\\to(0,0)} \\dfrac{x^2 y}{x^2+y^2}$"}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>
            {"Since $x^2 \\leq x^2+y^2$, we get $\\left|\\dfrac{x^2 y}{x^2+y^2}\\right| \\leq |y| \\to 0$."}
          </p>
          <div className="fml">
            {"$$\\lim_{(x,y)\\to(0,0)} \\frac{x^2 y}{x^2+y^2} = 0$$"}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLC4() {
  return (
    <section className="section" id="lc-4">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Continuity at a Point"}</h2>
      <div className="box def">
        <div className="box-lbl">{"Definition \u2014 Continuity"}</div>
        <p>{"$f$ is continuous at $(a,b)$ if all three hold:"}</p>
        <ol>
          <li>{"$f(a,b)$ is defined."}</li>
          <li>{"$\\lim_{(x,y)\\to(a,b)} f(x,y)$ exists."}</li>
          <li>{"The limit equals $f(a,b)$."}</li>
        </ol>
      </div>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Is $f(x,y) = \\dfrac{x^2-y^2}{x^2+y^2}$ continuous at $(0,0)$?"}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"Along $y=0$: limit $=1$. Along $x=0$: limit $=-1$."}</p>
          <p>{"Limit does not exist \u2014 not continuous at the origin."}</p>
        </div>
      </div>
    </section>
  );
}

function SectionLC5() {
  return (
    <section className="section" id="lc-5">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Continuity on a Region"}</h2>
      <p>
        {"$f$ is continuous on an open set $D$ if it is continuous at every point in $D$. Polynomials, rational functions (away from denominator zeros), and compositions of continuous functions are all continuous on their domains."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Key Fact"}</div>
        <p>
          {"If $f$ and $g$ are continuous at $(a,b)$, then so are $f+g$, $f \\cdot g$, and $f/g$ (provided $g(a,b) \\neq 0$)."}
        </p>
      </div>
    </section>
  );
}

function SectionLCEnrichment() {
  return (
    <section className="section" id="lc-enrich">
      <div className="sec-badge">{"Deeper Dive"}</div>
      <h2 className="sec-title">{"Path Tests vs. Polar Bounds"}</h2>
      <p>
        {"Different path limits prove nonexistence, but matching paths never prove existence. When a polar bound $|f|\\le g(r)\\to 0$, the squeeze theorem closes the argument for every approach."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Theory"}</div>
        <p>{"Existence is a single number approached in every way; polar/squeeze tools are the positive tests, while two-path mismatches are the negative tests."}</p>
      </div>
      <div className="box exm">
        <div className="box-lbl">{"Worked Example"}</div>
        <div className="exm-title">{"$f=\\frac{x^2 y}{x^4+y^2}$ along $y=mx^2$."}</div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"Substitute to get $\\frac{m}{1+m^2}$, which depends on $m$ — so the overall limit at the origin does not exist."}</p>
        </div>
      </div>
    </section>
  );
}

function LimitsQuiz({ part }) {
  if (part === 1) {
    return (
      <LaMcqSection
        id="lc-quiz1"
        badge="Quiz 1"
        title="Part 1 Quiz (15 questions — harder items near the end)"
        scoreId="scorelimits-p1"
        section="limits-p1"
        questions={LIMITS_P1_QUIZ}
      />
    );
  }
  return (
    <LaMcqSection
      id="lc-quiz2"
      badge="Quiz 2"
      title="Part 2 Quiz (15 questions — harder items near the end)"
      scoreId="scorelimits-p2"
      section="limits-p2"
      questions={LIMITS_P2_QUIZ}
    />
  );
}

function GuideFooter() {
  return (
    <div className="pg-foot">
      <p>{"End of Limits & Continuity guide."}</p>
    </div>
  );
}

function LimitsContent({ part }) {
  if (part === 1) {
    return (
      <>
        <GuideSidebarPart1 />
        <main className="main">
          <GuideHeaderPart1 />
          <TableOfContentsPart1 />
          <Divider />
          <OpeningNote />
          <Divider />
          <SectionLC1 />
          <Divider />
          <SectionLC2 />
          <Divider />
          <SectionLC3 />
          <Divider />
          <SectionLCEnrichment />
          <Divider />
          <LimitsExtendedPart1 />
          <Divider />
          <LimitsCertificateBoost part={1} />
          <Divider />
          <LimitsQuiz part={1} />
          <GuideFooter />
        </main>
      </>
    );
  }

  return (
    <>
      <GuideSidebarPart2 />
      <main className="main">
        <GuideHeaderPart2 />
        <TableOfContentsPart2 />
        <Divider />
        <OpeningNote />
        <Divider />
        <SectionLC4 />
        <Divider />
        <SectionLC5 />
        <Divider />
        <SectionLCEnrichment />
        <Divider />
        <LimitsExtendedPart2 />
        <Divider />
        <LimitsCertificateBoost part={2} />
        <Divider />
        <LimitsQuiz part={2} />
        <GuideFooter />
      </main>
    </>
  );
}

function LimitsGuide({ part }) {
  return (
    <StudyGuideShell guideClass="partial-derivatives-guide">
      <LimitsContent part={part} />
    </StudyGuideShell>
  );
}

export default LimitsGuide;