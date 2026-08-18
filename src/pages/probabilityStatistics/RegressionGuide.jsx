import StudyGuideShell from "../StudyGuideShell";
import "../PartialDerivativesGuide.css";
import { LaMcqSection } from "../linearAlgebra/LaMcq";
import {
  PS_R_CORR_QUIZ,
  PS_R_ASSOC_QUIZ,
  PS_R_FIT_QUIZ,
  PS_R_RESID_QUIZ,
} from "../../data/psStatsQuizzes";
import { TheoryBox, TheoremBox, ProcedureBox, WorkedExample, RealLifeUse, PracticalTheory } from "../linearAlgebra/LaBlocks";

import PsCertificateBoost from "./PsCertificateBoost";

function Divider() {
  return <hr className="divider" />;
}

function RegressionGuide({ part = 1 }) {
  if (part === 2) {
    return (
      <StudyGuideShell guideClass="partial-derivatives-guide" title="Regression (Part 2)">
        <nav className="sidebar">
          <div className="sb-brand"><div className="sb-title">Regression · Part 2</div></div>
          <a className="sb-link" href="#ps-r-fit">Least squares</a>
          <a className="sb-link" href="#ps-r-proc2">Method</a>
          <a className="sb-link" href="#ps-r-ex-p2">Examples</a>
          <a className="sb-link" href="#quiz-ps-r-fit">Quiz</a>
          <a className="sb-link" href="#ps-r-resid">Residuals</a>
          <a className="sb-link" href="#quiz-ps-r-resid">Quiz</a>
          <a className="sb-link" href="#ps-cert-regression-p2">Eight examples</a>
        </nav>
        <main className="main">
          <header className="ch-hdr">
            <div className="ch-eye">Probability &amp; Statistics · Part 2 of 2</div>
            <h1 className="ch-title">Fitting Lines &amp; Residuals</h1>
            <p className="ch-sub">Predict $y$ from $x$ and check the fit</p>
            <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
          </header>

          <section className="section" id="ps-r-fit">
            <div className="sec-badge">Section 5.3</div>
            <h2 className="sec-title">Least-squares line</h2>
            <TheoryBox title="Minimize squared error">
              <p>
                {"Fit $\\hat y=b_0+b_1 x$ by minimizing $\\sum(y_i-\\hat y_i)^2$. Slope $b_1=r\\,s_y/s_x$ and intercept $b_0=\\bar y-b_1\\bar x$. The line always passes through $(\\bar x,\\bar y)$."}
              </p>
            </TheoryBox>
            <PracticalTheory title="Correlation is not the regression line">
              <p>
                {"r is symmetric in x and y; the least-squares line is not. If the question swaps predictor and response, rebuild b0,b1 — do not reuse the same equation."}
              </p>
            </PracticalTheory>
            <TheoremBox title="Interpretation">
              <p>
                {"$b_1$: expected change in $y$ per one-unit increase in $x$ (holding the linear model). $b_0$: predicted $y$ when $x=0$ — only meaningful if $x=0$ is in range."}
              </p>
            </TheoremBox>
          </section>

          <section className="section" id="ps-r-proc2">
            <div className="sec-badge">Procedure</div>
            <ProcedureBox
              title="Fit and check"
              steps={[
                { text: "Plot the scatterplot first — look for linearity." },
                { text: "Compute $r$, then $b_1=r s_y/s_x$, $b_0=\\bar y-b_1\\bar x$." },
                { text: "Predict with $\\hat y=b_0+b_1 x$ (avoid wild extrapolation).", why: "Apply the least-squares / correlation identity that matches the asked quantity." },
                { text: "Residuals $e_i=y_i-\\hat y_i$; plot $e$ vs $\\hat y$ for patterns.", why: "Apply the least-squares / correlation identity that matches the asked quantity." },
                { text: "If curved or fan-shaped residuals, linear model is inadequate.", why: "Apply the least-squares / correlation identity that matches the asked quantity." }
              ]}
            />
          </section>

          <section className="section" id="ps-r-ex-p2">
            <div className="sec-badge">Worked examples</div>
            <WorkedExample
              number={1}
              title="Slope from r"
              setup={"$r=0.8$, $s_x=2$, $s_y=5$. Find $b_1$."}
              steps={[
                { text: "$b_1=r s_y/s_x=0.8\\cdot 5/2=2$." }
              ]}
              result={"$b_1=2$."}
              check={"Positive r ⇒ positive slope."}
              mistake={"Writing $b_1=r s_x/s_y$ (spreads flipped) — the formula divides by $s_x$ (the predictor's spread), not $s_y$."}
            />
            <WorkedExample
              number={2}
              title="Intercept"
              setup={"$\\bar x=3$, $\\bar y=10$, $b_1=2$. Find $b_0$."}
              steps={[
                { text: "$b_0=\\bar y-b_1\\bar x=10-2\\cdot 3=4$." },
                { text: "Line: $\\hat y=4+2x$.", why: "Apply the least-squares / correlation identity that matches the asked quantity." }
              ]}
              result={"$b_0=4$."}
              check={"Passes through $(3,10)$: $4+6=10$."}
              mistake={"Adding instead of subtracting: computing $b_0=\\bar y+b_1\\bar x=16$ — the intercept formula subtracts the slope's contribution at $\\bar x$."}
            />
            <WorkedExample
              number={3}
              title="Prediction"
              setup={"$\\hat y=4+2x$. Predict at $x=5$."}
              steps={[
                { text: "$\\hat y=4+10=14$.", why: "Apply the least-squares / correlation identity that matches the asked quantity." }
              ]}
              result={"$14$."}
              check={"Only trust if $x=5$ is near the observed $x$-range."}
              mistake={"Plugging in an $x$ value far outside the original data range without flagging it — the linear pattern is only verified within the observed range; predictions outside it are extrapolation."}
            />
            <WorkedExample
              number={4}
              title="Residual"
              setup={"Observed $y=16$ at $x=5$, $\\hat y=14$. Residual?"}
              steps={[
                { text: "$e=y-\\hat y=16-14=2$.", why: "Apply the least-squares / correlation identity that matches the asked quantity." },
                { text: "Positive residual ⇒ point above the line.", why: "Apply the least-squares / correlation identity that matches the asked quantity." }
              ]}
              result={"$e=2$."}
              check={"Observed minus predicted."}
              mistake={"Computing $\\hat y-y$ instead of $y-\\hat y$ — this flips the sign, which then misleads about whether the point is above or below the line."}
            />
          </section>

          <LaMcqSection
            id="quiz-ps-r-fit"
            badge="Quiz 5.3"
            title="Least squares"
            scoreId="score-ps-r-fit"
            section="ps-r-fit"
            questions={PS_R_FIT_QUIZ}
          />

          <Divider />
          <section className="section" id="ps-r-resid">
            <div className="sec-badge">Section 5.4</div>
            <h2 className="sec-title">Residual diagnostics</h2>
            <TheoryBox title="What good residuals look like">
              <p>
                {"Ideally: scatter randomly about 0 with constant spread. Patterns (curves, funnels, clumps) warn that linearity, equal variance, or independence may fail."}
              </p>
            </TheoryBox>
            <TheoremBox title="Coefficient of determination">
              <p>
                {"$R^2=1-\\dfrac{\\sum(y_i-\\hat y_i)^2}{\\sum(y_i-\\bar y)^2}$ — the proportion of variance in $y$ explained by the linear fit. For simple linear regression, $R^2=r^2$ (the square of the correlation coefficient)."}
              </p>
            </TheoremBox>
            <ProcedureBox
              title="Full diagnostic checklist"
              steps={[
                { text: "Plot residuals ($y_i-\\hat y_i$) against $x$ or fitted values.", why: "Apply the least-squares / correlation identity that matches the asked quantity." },
                { text: "Check for curvature — if present, a linear model is the wrong shape." },
                { text: "Check for a funnel shape — spreading residuals signal non-constant variance.", why: "Plug into the matching center/spread formula for this data type." },
                { text: "Compute $R^2$ to quantify overall fit quality, not just visually inspect.", why: "Apply the least-squares / correlation identity that matches the asked quantity." },
                { text: "Never extrapolate $\\hat y$ far outside the observed range of $x$.", why: "Apply the least-squares / correlation identity that matches the asked quantity." }
              ]}
            />
            <WorkedExample
              number={1}
              title="Computing R-squared"
              setup={"A regression gives $\\sum(y_i-\\hat y_i)^2=40$ and $\\sum(y_i-\\bar y)^2=200$. Find $R^2$ and interpret it."}
              steps={[
                { text: "$R^2=1-40/200=1-0.2=0.8$.", why: "Apply the least-squares / correlation identity that matches the asked quantity." },
                { text: "This means 80% of the variability in $y$ is explained by the linear relationship with $x$.", why: "Plug into the matching center/spread formula for this data type." }
              ]}
              result={"$R^2=0.8$ — a strong linear fit."}
              check={"$R^2$ always lies in $[0,1]$; higher means a better-fitting line."}
              mistake={"Computing $R^2$ as $\\sum(y_i-\\hat y_i)^2/\\sum(y_i-\\bar y)^2$ directly (forgetting the $1-$) — that gives the unexplained proportion, not $R^2$ itself."}
            />
            <WorkedExample
              number={2}
              title="Spotting a bad fit from a residual plot"
              setup={"A residual plot shows points forming a clear U-shape (curving up on both ends) rather than a random scatter. What does this indicate, and what should be done?"}
              steps={[
                { text: "A curved residual pattern means the true relationship is nonlinear.", why: "Plug into the matching center/spread formula for this data type." },
                { text: "A straight-line model is systematically wrong at the extremes even if $R^2$ looks decent.", why: "Apply the least-squares / correlation identity that matches the asked quantity." },
                { text: "Fix: consider a quadratic or transformed model rather than trusting the linear fit." }
              ]}
              result={"The linear model is misspecified; a curved/transformed model is needed."}
              check={"A high $R^2$ can still hide a curved residual pattern — always plot residuals, don't rely on $R^2$ alone."}
              mistake={"Trusting a high $R^2$ alone as proof the linear model is 'good' — $R^2$ can look strong even while the residual plot clearly shows the model is the wrong shape."}
            />
          </section>

          <LaMcqSection
            id="quiz-ps-r-resid"
            badge="Quiz 5.4"
            title="Residuals"
            scoreId="score-ps-r-resid"
            section="ps-r-resid"
            questions={PS_R_RESID_QUIZ}
          />

          <Divider />
          <PsCertificateBoost topic="regression" part={2} />

          <section className="section" id="summary">
            <div className="sec-badge">Reference</div>
            <h2 className="sec-title">Course module complete</h2>
            <RealLifeUse>{"Agriculture researchers use regression to link fertilizer dosage to crop yield and find the optimal amount, real-estate platforms predict house prices from square footage and location using a fitted regression line, and economists use correlation and regression to study how minimum wage changes relate to employment levels."}</RealLifeUse>
            <p>{"You finished Probability & Statistics study guides — return to the course hub or drill in Practice Arena."}</p>
          </section>
        </main>
      </StudyGuideShell>
    );
  }

  return (
    <StudyGuideShell guideClass="partial-derivatives-guide" title="Regression (Part 1)">
      <nav className="sidebar">
        <div className="sb-brand"><div className="sb-title">Regression · Part 1</div></div>
        <a className="sb-link" href="#ps-r-corr">Correlation</a>
        <a className="sb-link" href="#ps-r-proc1">Method</a>
        <a className="sb-link" href="#ps-r-ex-p1">Examples</a>
        <a className="sb-link" href="#quiz-ps-r-corr">Quiz</a>
        <a className="sb-link" href="#ps-r-assoc">Association</a>
        <a className="sb-link" href="#quiz-ps-r-assoc">Quiz</a>
        <a className="sb-link" href="#ps-cert-regression-p1">Eight examples</a>
      </nav>
      <main className="main">
        <header className="ch-hdr">
          <div className="ch-eye">Probability &amp; Statistics · Part 1 of 2</div>
          <h1 className="ch-title">Regression &amp; Correlation</h1>
          <p className="ch-sub">Measure and model linear association</p>
          <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
        </header>

        <section className="section" id="ps-r-corr">
          <div className="sec-badge">Section 5.1</div>
          <h2 className="sec-title">Correlation coefficient</h2>
          <TheoryBox title="What r measures">
            <p>
              {"Pearson $r$ measures strength and direction of linear association: $-1\\le r\\le 1$. $r>0$ rises together; $r<0$ moves oppositely; $r\\approx 0$ means little linear pattern (nonlinear links can still exist)."}
            </p>
          </TheoryBox>
          <PracticalTheory title="Fit, then criticize the fit">
            <p>
              {"Compute slope/intercept from summaries or software, then immediately plot residuals. A high r or R² does not forgive a curved residual plot or wild extrapolation outside the x-range."}
            </p>
          </PracticalTheory>
          <TheoremBox title="Properties">
            <p>
              {"$r$ is unitless and symmetric in $x$ and $y$. Outliers can inflate or deflate $r$. Correlation ≠ causation."}
            </p>
          </TheoremBox>
        </section>

        <section className="section" id="ps-r-proc1">
          <div className="sec-badge">Procedure</div>
          <ProcedureBox
            title="Assess association"
            steps={[
                { text: "Draw the scatterplot before trusting any number.", why: "Name the events/parameters exactly as the problem states them." },
                { text: "Compute $r$ (or read it from software)." },
                { text: "Describe direction, form (linear?), and strength." },
                { text: "Flag outliers and subgroups." },
                { text: "Only then move to fitting a regression line.", why: "Apply the least-squares / correlation identity that matches the asked quantity." }
              ]}
          />
        </section>

        <section className="section" id="ps-r-ex-p1">
          <div className="sec-badge">Worked examples</div>
          <WorkedExample
            number={1}
            title="Interpret r"
            setup={"$r=-0.85$ between study hours of video games and exam score."}
            steps={[
                { text: "Negative: more games ↔ lower scores on average." },
                { text: "$|r|=0.85$ is strong linear association." },
                { text: "Does not prove games cause lower scores." }
              ]}
            result={"Strong negative linear association."}
            check={"Always pair $r$ with a plot."}
            mistake={"Saying 'video games cause lower scores' — correlation this strong still doesn't establish causation; a lurking variable (e.g. less study time overall) could explain both."}
          />
          <WorkedExample
            number={2}
            title="r = 0"
            setup={"A perfect U-shaped curve of $y$ vs $x$. What can $r$ be?"}
            steps={[
                { text: "Linear correlation can be near 0.", why: "Apply the least-squares / correlation identity that matches the asked quantity." },
                { text: "Strong nonlinear association is invisible to $r$." }
              ]}
            result={"$r$ near 0 despite clear pattern."}
            check={"Plot first."}
            mistake={"Concluding 'no relationship exists' just because $r\\approx 0$ — $r$ only detects linear association; a strong nonlinear (e.g. quadratic) relationship can still be present."}
          />
          <WorkedExample
            number={3}
            title="Swap axes"
            setup={"If you swap $x$ and $y$, what happens to $r$?"}
            steps={[
                { text: "$r$ is unchanged — it is symmetric." },
                { text: "Regression slope would change (different roles).", why: "Apply the least-squares / correlation identity that matches the asked quantity." }
              ]}
            result={"$r$ same; regression of $y$ on $x$ ≠ $x$ on $y$."}
            check={"Correlation ≠ slope."}
            mistake={"Assuming the regression line for predicting $y$ from $x$ is the same line as predicting $x$ from $y$ — they're generally different lines, even though $r$ itself doesn't change."}
          />
          <WorkedExample
            number={4}
            title="Outlier effect"
            setup={"Cloud with $r\\approx 0.2$, plus one far outlier aligning the cloud. Effect?"}
            steps={[
                { text: "Outlier can push $r$ much higher." },
                { text: "Report $r$ with and without the point; show the plot." }
              ]}
            result={"$r$ is outlier-sensitive."}
            check={"Robustness check is good practice."}
            mistake={"Trusting a headline $r$ value without checking whether a single point is driving it — always inspect the scatterplot, not just the number."}
          />
        </section>

        <LaMcqSection
          id="quiz-ps-r-corr"
          badge="Quiz 5.1"
          title="Correlation"
          scoreId="score-ps-r-corr"
          section="ps-r-corr"
          questions={PS_R_CORR_QUIZ}
        />

        <Divider />
        <section className="section" id="ps-r-assoc">
          <div className="sec-badge">Section 5.2</div>
          <h2 className="sec-title">Association vocabulary</h2>
          <TheoryBox title="Describe the scatter">
            <p>
              {"Comment on direction, form, strength, and outliers. Mention clusters or lurking variables when relevant."}
            </p>
          </TheoryBox>
        </section>

        <LaMcqSection
          id="quiz-ps-r-assoc"
          badge="Quiz 5.2"
          title="Association"
          scoreId="score-ps-r-assoc"
          section="ps-r-assoc"
          questions={PS_R_ASSOC_QUIZ}
        />

        <Divider />
        <PsCertificateBoost topic="regression" part={1} />

        <section className="section" id="summary">
          <div className="sec-badge">Reference</div>
          <h2 className="sec-title">Part 1 complete</h2>
          <p>{"Part 2 builds the least-squares line and residual checks."}</p>
        </section>
      </main>
    </StudyGuideShell>
  );
}

export default RegressionGuide;
