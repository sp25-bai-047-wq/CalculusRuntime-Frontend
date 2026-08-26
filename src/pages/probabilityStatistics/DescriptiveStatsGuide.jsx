import StudyGuideShell from "../courses/StudyGuideShell";
import "../multivariableCalculus/PartialDerivativesGuide.css";
import { LaMcqSection } from "../linearAlgebra/LaMcq";
import {
  PS_D_CENTER_QUIZ,
  PS_D_QUANT_QUIZ,
  PS_D_SPREAD_QUIZ,
  PS_D_PLOTS_QUIZ,
} from "../../data/psStatsQuizzes";
import { TheoryBox, TheoremBox, ProcedureBox, WorkedExample, RealLifeUse, PracticalTheory } from "../linearAlgebra/LaBlocks";

import PsCertificateBoost from "./PsCertificateBoost";

function Divider() {
  return <hr className="divider" />;
}

function DescriptiveStatsGuide({ part = 1 }) {
  if (part === 2) {
    return (
      <StudyGuideShell guideClass="partial-derivatives-guide" title="Descriptive Statistics (Part 2)">
        <nav className="sidebar">
          <div className="sb-brand"><div className="sb-title">Descriptive · Part 2</div></div>
          <a className="sb-link" href="#ps-d-spread">Spread &amp; z-scores</a>
          <a className="sb-link" href="#ps-d-proc2">Method</a>
          <a className="sb-link" href="#ps-d-ex-p2">Examples</a>
          <a className="sb-link" href="#quiz-ps-d-spread">Quiz</a>
          <a className="sb-link" href="#ps-d-plots">Plots</a>
          <a className="sb-link" href="#quiz-ps-d-plots">Quiz</a>
          <a className="sb-link" href="#ps-cert-descriptive-p2">Eight examples</a>
        </nav>
        <main className="main">
          <header className="ch-hdr">
            <div className="ch-eye">Probability &amp; Statistics · Part 2 of 2</div>
            <h1 className="ch-title">Spread, Standardization &amp; Displays</h1>
            <p className="ch-sub">Compare values across different scales</p>
            <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
          </header>

          <section className="section" id="ps-d-spread">
            <div className="sec-badge">Section 3.3</div>
            <h2 className="sec-title">Variance, SD, and z-scores</h2>
            <TheoryBox title="How far from the center?">
              <p>
                {"Sample variance $s^2=\\frac{1}{n-1}\\sum(x_i-\\bar x)^2$ (unbiased). SD $s=\\sqrt{s^2}$. A z-score $z=(x-\\bar x)/s$ says how many SDs above/below the mean."}
              </p>
            </TheoryBox>
            <PracticalTheory title="Reading displays quickly">
              <p>
                {"Ask what the picture emphasizes: shape (histogram), five-number summary (boxplot), or ranking (percentiles). Flag outliers with the 1.5×IQR fence before trusting a mean."}
              </p>
            </PracticalTheory>
            <TheoremBox title="IQR robustness">
              <p>
                {"IQR $=Q_3-Q_1$ resists outliers better than SD. Outlier fences often use $Q_1-1.5\\,\\mathrm{IQR}$ and $Q_3+1.5\\,\\mathrm{IQR}$."}
              </p>
            </TheoremBox>
          </section>

          <section className="section" id="ps-d-proc2">
            <div className="sec-badge">Procedure</div>
            <ProcedureBox
              title="Standardize a value"
              steps={[
                { text: "Compute mean and SD of the reference sample (or use population $\\mu,\\sigma$).", why: "Plug into the matching center/spread formula for this data type." },
                { text: "Subtract the center from $x$." },
                { text: "Divide by the SD to get $z$.", why: "Plug into the matching center/spread formula for this data type." },
                { text: "Interpret: $|z|>2$ is often unusual; $|z|>3$ is extreme." },
                { text: "For displays: choose histogram/boxplot to match the question (shape vs outliers)." }
              ]}
            />
          </section>

          <section className="section" id="ps-d-ex-p2">
            <div className="sec-badge">Worked examples</div>
            <WorkedExample
              number={1}
              title="Sample SD"
              setup={"Data: 2, 4, 4, 6. Find $s$."}
              steps={[
                { text: "$\\bar x=4$." },
                { text: "Deviations: $-2,0,0,2$; squares: $4,0,0,4$; sum $8$.", why: "Count equally likely outcomes in the conditioning set carefully (order matters for dice)." },
                { text: "$s^2=8/3$, $s=\\sqrt{8/3}\\approx 1.63$." }
              ]}
              result={"$s\\approx 1.63$."}
              check={"Divide by $n-1=3$, not $n$."}
              mistake={"Dividing by $n=4$ instead of $n-1=3$ — this gives the (biased) population variance formula instead of the unbiased sample variance formula."}
            />
            <WorkedExample
              number={2}
              title="z-score compare"
              setup={"Exam A: score 85, mean 70, SD 10. Exam B: 80, mean 60, SD 15. Which is relatively better?"}
              steps={[
                { text: "$z_A=(85-70)/10=1.5$." },
                { text: "$z_B=(80-60)/15\\approx 1.33$." },
                { text: "A is farther above its mean in SD units.", why: "Plug into the matching center/spread formula for this data type." }
              ]}
              result={"Exam A is relatively stronger."}
              check={"Compare standardized scores, not raw marks."}
              mistake={"Comparing raw scores directly (85 > 80, so 'A is better') — this ignores that the two exams have different means and spreads, which z-scores correct for."}
            />
            <WorkedExample
              number={3}
              title="IQR fences"
              setup={"$Q_1=10$, $Q_3=22$. Find upper fence."}
              steps={[
                { text: "IQR $=12$.", why: "Plug into the matching center/spread formula for this data type." },
                { text: "Upper fence $=22+1.5\\times 12=40$.", why: "Plug into the matching center/spread formula for this data type." }
              ]}
              result={"$40$."}
              check={"Points above 40 flagged as potential outliers."}
              mistake={"Multiplying $Q_3$ by 1.5 instead of the IQR — the fence formula scales the IQR, not the quartile itself."}
            />
            <WorkedExample
              number={4}
              title="Empirical rule"
              setup={"Approx. normal data, mean 50, SD 5. About what percent lie in $[40,60]$?"}
              steps={[
                { text: "$[40,60]$ is mean ± 2 SD.", why: "Plug into the matching center/spread formula for this data type." },
                { text: "Empirical rule ≈ 95%.", why: "Finish the arithmetic and state the conclusion in the problem's units." }
              ]}
              result={"About 95%."}
              check={"68 / 95 / 99.7 for 1 / 2 / 3 SD."}
              mistake={"Misreading the interval width — $[40,60]$ is $\\pm 2$ SD (since SD=5), not $\\pm 1$ SD, so the answer is 95%, not 68%."}
            />
          </section>

          <LaMcqSection
            id="quiz-ps-d-spread"
            badge="Quiz 3.3"
            title="Spread"
            scoreId="score-ps-d-spread"
            section="ps-d-spread"
            questions={PS_D_SPREAD_QUIZ}
          />

          <Divider />
          <section className="section" id="ps-d-plots">
            <div className="sec-badge">Section 3.4</div>
            <h2 className="sec-title">Visual summaries</h2>
            <TheoryBox title="Choose the right picture">
              <p>
                {"Histograms show shape (skew, modality). Boxplots highlight median, IQR, and outliers. Scatterplots preview association before regression."}
              </p>
            </TheoryBox>
            <TheoremBox title="Outlier fence rule">
              <p>
                {"Using quartiles $Q_1,Q_3$ and $\\mathrm{IQR}=Q_3-Q_1$: lower fence $=Q_1-1.5\\,\\mathrm{IQR}$, upper fence $=Q_3+1.5\\,\\mathrm{IQR}$. Points outside the fences are flagged as outliers on a boxplot."}
              </p>
            </TheoremBox>
            <ProcedureBox
              title="Reading a boxplot / histogram"
              steps={[
                { text: "Locate the box: left edge $Q_1$, right edge $Q_3$, line inside is the median.", why: "Plug into the matching center/spread formula for this data type." },
                { text: "Whiskers extend to the most extreme points within the fences.", why: "Plug into the matching center/spread formula for this data type." },
                { text: "Any point beyond a fence is plotted separately as an outlier.", why: "Plug into the matching center/spread formula for this data type." },
                { text: "For a histogram, compare the tail lengths on each side to judge skew direction." },
                { text: "A long right tail with mean $>$ median signals right (positive) skew, and vice versa.", why: "Plug into the matching center/spread formula for this data type." }
              ]}
            />
            <WorkedExample
              number={1}
              title="Fence calculation"
              setup={"A dataset has $Q_1=20$, $Q_3=32$. Find the fences and check if a value of $55$ is an outlier."}
              steps={[
                { text: "$\\mathrm{IQR}=32-20=12$.", why: "Plug into the matching center/spread formula for this data type." },
                { text: "Upper fence $=32+1.5(12)=32+18=50$.", why: "Plug into the matching center/spread formula for this data type." },
                { text: "$55>50$, so it lies beyond the upper fence.", why: "Plug into the matching center/spread formula for this data type." }
              ]}
              result={"$55$ is flagged as an outlier."}
              check={"Lower fence $=20-18=2$; any value below 2 would also be flagged."}
              mistake={"Comparing 55 to $Q_3=32$ directly and calling it an outlier — the correct comparison is against the fence (50), not the quartile itself."}
            />
            <WorkedExample
              number={2}
              title="Reading skew from mean vs. median"
              setup={"A dataset has mean $=48$, median $=42$. Describe the likely skew and boxplot shape."}
              steps={[
                { text: "Mean $>$ median means a few unusually large values are pulling the mean up.", why: "Plug into the matching center/spread formula for this data type." },
                { text: "This is characteristic of right (positive) skew." },
                { text: "On a boxplot, expect a longer whisker (or more outliers) on the upper side." }
              ]}
              result={"Right-skewed distribution."}
              check={"If mean $<$ median instead, the skew would be left (negative)."}
              mistake={"Mixing up the direction — some students say 'mean > median means left-skewed'; it's the opposite: a larger mean than median signals a long tail pulling to the right."}
            />
          </section>

          <LaMcqSection
            id="quiz-ps-d-plots"
            badge="Quiz 3.4"
            title="Plots"
            scoreId="score-ps-d-plots"
            section="ps-d-plots"
            questions={PS_D_PLOTS_QUIZ}
          />

          <Divider />
          <PsCertificateBoost topic="descriptive" part={2} />

          <section className="section" id="summary">
            <div className="sec-badge">Reference</div>
            <h2 className="sec-title">Part 2 complete</h2>
            <RealLifeUse>{"Sports analysts use z-scores to compare players across different eras and scoring scales, quality-control teams flag defective batches using outlier fences on control charts, and schools report percentile ranks (not raw scores) so parents can compare a student against their whole cohort."}</RealLifeUse>
            <p>{"Next: hypothesis testing — deciding when sample evidence is strong enough to challenge a claim."}</p>
          </section>
        </main>
      </StudyGuideShell>
    );
  }

  return (
    <StudyGuideShell guideClass="partial-derivatives-guide" title="Descriptive Statistics (Part 1)">
      <nav className="sidebar">
        <div className="sb-brand"><div className="sb-title">Descriptive · Part 1</div></div>
        <a className="sb-link" href="#ps-d-center">Center</a>
        <a className="sb-link" href="#ps-d-proc1">Method</a>
        <a className="sb-link" href="#ps-d-ex-p1">Examples</a>
        <a className="sb-link" href="#quiz-ps-d-center">Quiz</a>
        <a className="sb-link" href="#ps-d-quant">Quantiles</a>
        <a className="sb-link" href="#quiz-ps-d-quant">Quiz</a>
        <a className="sb-link" href="#ps-cert-descriptive-p1">Eight examples</a>
      </nav>
      <main className="main">
        <header className="ch-hdr">
          <div className="ch-eye">Probability &amp; Statistics · Part 1 of 2</div>
          <h1 className="ch-title">Descriptive Statistics</h1>
          <p className="ch-sub">Summarize data before modeling it</p>
          <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
        </header>

        <section className="section" id="ps-d-center">
          <div className="sec-badge">Section 3.1</div>
          <h2 className="sec-title">Measures of center</h2>
          <TheoryBox title="Mean, median, mode">
            <p>
              {"Sample mean $\\bar x=\\frac1n\\sum x_i$ uses all values (sensitive to outliers). Median is the middle order statistic (robust). Mode is the most frequent value (useful for categories)."}
            </p>
          </TheoryBox>
          <PracticalTheory title="Picking a center and a spread">
            <p>
              {"Skewed or outlier-heavy data: prefer median and IQR. Symmetric mound: mean and sd are fine. Report units, and never compare raw scores across different exams without z-scores."}
            </p>
          </PracticalTheory>
          <TheoremBox title="Skew and center">
            <p>
              {"Right skew: mean $>$ median. Left skew: mean $<$ median. Symmetric unimodal: mean ≈ median ≈ mode."}
            </p>
          </TheoremBox>
        </section>

        <section className="section" id="ps-d-proc1">
          <div className="sec-badge">Procedure</div>
          <ProcedureBox
            title="Compute center"
            steps={[
                { text: "Sort the data for median / quartiles.", why: "Plug into the matching center/spread formula for this data type." },
                { text: "Mean: sum ÷ $n$.", why: "Plug into the matching center/spread formula for this data type." },
                { text: "Odd $n$: median is middle value; even $n$: average of two middle values.", why: "Plug into the matching center/spread formula for this data type." },
                { text: "Report units and sample size with every summary." },
                { text: "Note outliers before trusting the mean alone.", why: "Plug into the matching center/spread formula for this data type." }
              ]}
          />
        </section>

        <section className="section" id="ps-d-ex-p1">
          <div className="sec-badge">Worked examples</div>
          <WorkedExample
            number={1}
            title="Mean vs median"
            setup={"Data: 3, 5, 5, 7, 100. Compare mean and median."}
            steps={[
                { text: "Mean $=(3+5+5+7+100)/5=24$.", why: "Plug into the matching center/spread formula for this data type." },
                { text: "Sorted already; median $=5$.", why: "Plug into the matching center/spread formula for this data type." },
                { text: "Outlier 100 pulled the mean far above the median.", why: "Plug into the matching center/spread formula for this data type." }
              ]}
            result={"Mean 24, median 5."}
            check={"Median resists the outlier."}
            mistake={"Reporting the mean (24) as 'typical' when a single outlier dominates it — the median (5) better represents most of this data."}
          />
          <WorkedExample
            number={2}
            title="Even-count median"
            setup={"Data: 2, 4, 6, 10. Median?"}
            steps={[
                { text: "Two middle values: 4 and 6." },
                { text: "Median $=(4+6)/2=5$.", why: "Plug into the matching center/spread formula for this data type." }
              ]}
            result={"$5$."}
            check={"Average the two central observations."}
            mistake={"Picking just one of the two middle values (e.g. saying median = 4) — with an even count, both middle values must be averaged."}
          />
          <WorkedExample
            number={3}
            title="Weighted idea"
            setup={"Scores 80 and 90 with weights 0.4 and 0.6. Weighted mean?"}
            steps={[
                { text: "$0.4\\cdot 80+0.6\\cdot 90=32+54=86$." }
              ]}
            result={"$86$."}
            check={"Weights sum to 1."}
            mistake={"Computing the plain average $(80+90)/2=85$ instead — that ignores the weights entirely, giving a different (wrong) answer."}
          />
          <WorkedExample
            number={4}
            title="Mode"
            setup={"Categories: red, blue, red, green, red. Mode?"}
            steps={[
                { text: "Red appears three times; others once." },
                { text: "Mode = red." }
              ]}
            result={"red"}
            check={"Most frequent category."}
            mistake={"Trying to compute a 'mean' or 'median' of category labels — mode is the only measure of center that makes sense for non-numeric (categorical) data."}
          />
        </section>

        <LaMcqSection
          id="quiz-ps-d-center"
          badge="Quiz 3.1"
          title="Center"
          scoreId="score-ps-d-center"
          section="ps-d-center"
          questions={PS_D_CENTER_QUIZ}
        />

        <Divider />
        <section className="section" id="ps-d-quant">
          <div className="sec-badge">Section 3.2</div>
          <h2 className="sec-title">Percentiles and quartiles</h2>
          <TheoryBox title="Order statistics">
            <p>
              {"The $p$-th percentile is a value below which roughly $p\\%$ of the data fall. Quartiles split the ordered sample into fourths: $Q_1$, median ($Q_2$), $Q_3$."}
            </p>
          </TheoryBox>
        </section>

        <LaMcqSection
          id="quiz-ps-d-quant"
          badge="Quiz 3.2"
          title="Quantiles"
          scoreId="score-ps-d-quant"
          section="ps-d-quant"
          questions={PS_D_QUANT_QUIZ}
        />

        <Divider />
        <PsCertificateBoost topic="descriptive" part={1} />

        <section className="section" id="summary">
          <div className="sec-badge">Reference</div>
          <h2 className="sec-title">Part 1 complete</h2>
          <p>{"Part 2 covers spread measures, z-scores, and choosing plots."}</p>
        </section>
      </main>
    </StudyGuideShell>
  );
}

export default DescriptiveStatsGuide;
