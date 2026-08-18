import StudyGuideShell from "../StudyGuideShell";
import "../PartialDerivativesGuide.css";
import { LaMcqSection } from "../linearAlgebra/LaMcq";
import {
  PS_H_FRAMEWORK_QUIZ,
  PS_H_TESTS_QUIZ,
  PS_H_PVAL_QUIZ,
  PS_H_ERRORS_QUIZ,
} from "../../data/psStatsQuizzes";
import { TheoryBox, TheoremBox, ProcedureBox, WorkedExample, RealLifeUse, PracticalTheory } from "../linearAlgebra/LaBlocks";

import PsCertificateBoost from "./PsCertificateBoost";

function Divider() {
  return <hr className="divider" />;
}

function HypothesisTestingGuide({ part = 1 }) {
  if (part === 2) {
    return (
      <StudyGuideShell guideClass="partial-derivatives-guide" title="Hypothesis Testing (Part 2)">
        <nav className="sidebar">
          <div className="sb-brand"><div className="sb-title">Testing · Part 2</div></div>
          <a className="sb-link" href="#ps-h-pval">p-values</a>
          <a className="sb-link" href="#ps-h-proc2">Method</a>
          <a className="sb-link" href="#ps-h-ex-p2">Examples</a>
          <a className="sb-link" href="#quiz-ps-h-pval">Quiz</a>
          <a className="sb-link" href="#ps-h-errors">Errors &amp; power</a>
          <a className="sb-link" href="#quiz-ps-h-errors">Quiz</a>
          <a className="sb-link" href="#ps-cert-hypothesis-p2">Eight examples</a>
        </nav>
        <main className="main">
          <header className="ch-hdr">
            <div className="ch-eye">Probability &amp; Statistics · Part 2 of 2</div>
            <h1 className="ch-title">p-values, Errors &amp; Power</h1>
            <p className="ch-sub">How strong is the evidence against $H_0$?</p>
            <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
          </header>

          <section className="section" id="ps-h-pval">
            <div className="sec-badge">Section 4.3</div>
            <h2 className="sec-title">p-values</h2>
            <TheoryBox title="Definition">
              <p>
                {"The p-value is the probability, under $H_0$, of a result at least as extreme as observed. Small p ⇒ data are surprising if $H_0$ were true."}
              </p>
            </TheoryBox>
            <PracticalTheory title="Errors and power in one sentence each">
              <p>
                {"Type I: false alarm (reject a true H0). Type II: miss (keep a false H0). Power is the chance you correctly catch a real effect — raise it with larger n or a bigger true effect, not by abusing α after the fact."}
              </p>
            </PracticalTheory>
            <TheoremBox title="Decision rule">
              <p>
                {"Fix significance level $\\alpha$ (often 0.05). Reject $H_0$ if p ≤ $\\alpha$. Equivalently, reject if the test statistic falls in the critical region."}
              </p>
            </TheoremBox>
          </section>

          <section className="section" id="ps-h-proc2">
            <div className="sec-badge">Procedure</div>
            <ProcedureBox
              title="From statistic to decision"
              steps={[
                { text: "Compute the test statistic (z, t, …)." },
                { text: "Find the p-value from the null sampling distribution (one- or two-sided as designed).", why: "Name the events/parameters exactly as the problem states them." },
                { text: "Compare to $\\alpha$; state reject / fail to reject in context.", why: "Carry out the hypothesis-testing decision using α and the correct tail(s)." },
                { text: "Report effect size and CI when possible — significance ≠ importance." },
                { text: "Discuss Type I/II risk if the decision has real costs.", why: "Carry out the hypothesis-testing decision using α and the correct tail(s)." }
              ]}
            />
          </section>

          <section className="section" id="ps-h-ex-p2">
            <div className="sec-badge">Worked examples</div>
            <WorkedExample
              number={1}
              title="Two-sided z-test"
              setup={"$H_0:\\mu=100$, $n$ large, $z=2.1$, $\\alpha=0.05$. Decision?"}
              steps={[
                { text: "Two-sided p ≈ $2(1-\\Phi(2.1))\\approx 0.036$.", why: "Finish the arithmetic and state the conclusion in the problem's units." },
                { text: "$0.036<0.05$ ⇒ reject $H_0$.", why: "State the precise criterion (independence product, hypotheses, or decision rule) before computing." }
              ]}
              result={"Reject $H_0$ at 5%."}
              check={"Critical values ±1.96; $|2.1|>1.96$."}
              mistake={"Forgetting to double the one-tailed probability for a two-sided test — using $1-\\Phi(2.1)\\approx 0.018$ alone understates the true p-value."}
            />
            <WorkedExample
              number={2}
              title="Fail to reject"
              setup={"Same setup but $z=1.2$, $\\alpha=0.05$."}
              steps={[
                { text: "Two-sided p ≈ 0.23 > 0.05.", why: "Finish the arithmetic and state the conclusion in the problem's units." },
                { text: "Do not reject $H_0$ — evidence is weak, not proof that $H_0$ is true.", why: "State the precise criterion (independence product, hypotheses, or decision rule) before computing." }
              ]}
              result={"Fail to reject $H_0$."}
              check={"Absence of evidence ≠ evidence of absence."}
              mistake={"Concluding 'we proved $H_0$ is true' — failing to reject only means the evidence wasn't strong enough, never that the null has been confirmed."}
            />
            <WorkedExample
              number={3}
              title="Type I vs II"
              setup={"Drug is truly ineffective ($H_0$ true) but you reject $H_0$. Error type?"}
              steps={[
                { text: "False positive: rejecting a true null.", why: "Name the events/parameters exactly as the problem states them." },
                { text: "That is a Type I error; rate controlled by $\\alpha$.", why: "Carry out the hypothesis-testing decision using α and the correct tail(s)." }
              ]}
              result={"Type I error."}
              check={"Type II = failing to reject a false $H_0$."}
              mistake={"Swapping the two error types — remembering it as 'Type I = you did something (rejected), Type II = you did nothing (failed to reject)' helps keep them straight."}
            />
            <WorkedExample
              number={4}
              title="Power"
              setup={"Power is 0.80 at a specific alternative. What is $\\beta$?"}
              steps={[
                { text: "Power $=1-\\beta$.", why: "Carry out the hypothesis-testing decision using α and the correct tail(s)." },
                { text: "$\\beta=1-0.80=0.20$." }
              ]}
              result={"$\\beta=0.20$."}
              check={"Power rises with $n$, effect size, and $\\alpha$."}
              mistake={"Confusing power with $\\alpha$ — power (0.80) and significance level $\\alpha$ (often 0.05) are independent choices, not the same number."}
            />
          </section>

          <LaMcqSection
            id="quiz-ps-h-pval"
            badge="Quiz 4.3"
            title="p-values"
            scoreId="score-ps-h-pval"
            section="ps-h-pval"
            questions={PS_H_PVAL_QUIZ}
          />

          <Divider />
          <section className="section" id="ps-h-errors">
            <div className="sec-badge">Section 4.4</div>
            <h2 className="sec-title">Errors and power</h2>
            <TheoryBox title="Trade-offs">
              <p>
                {"Lower $\\alpha$ reduces Type I errors but can increase Type II errors (lower power) unless you gather more data. Design studies for adequate power at scientifically meaningful effects."}
              </p>
            </TheoryBox>
            <TheoremBox title="Power and sample size">
              <p>
                {"Power $=1-\\beta=P(\\text{reject }H_0\\mid H_0\\text{ false})$. For a fixed effect size, power increases with larger sample size $n$, larger true effect, larger $\\alpha$, and smaller population variance."}
              </p>
            </TheoremBox>
            <ProcedureBox
              title="Diagnosing a hypothesis test's error profile"
              steps={[
                { text: "State what a Type I error means in context (false alarm) and a Type II error (missed effect).", why: "Plug into the matching center/spread formula for this data type." },
                { text: "Identify which error is more costly for this specific problem." },
                { text: "Choose $\\alpha$ accordingly — smaller $\\alpha$ if false alarms are worse.", why: "Carry out the hypothesis-testing decision using α and the correct tail(s)." },
                { text: "If power is too low, the fix is usually a larger sample size, not a looser $\\alpha$.", why: "Carry out the hypothesis-testing decision using α and the correct tail(s)." },
                { text: "Report power alongside p-values when planning a study, not just after the fact.", why: "Carry out the hypothesis-testing decision using α and the correct tail(s)." }
              ]}
            />
            <WorkedExample
              number={1}
              title="Identifying the errors in context"
              setup={"A court trial tests $H_0:$ defendant is innocent. Describe what a Type I and Type II error mean here."}
              steps={[
                { text: "Type I error: reject $H_0$ when true — convict an innocent person.", why: "State the precise criterion (independence product, hypotheses, or decision rule) before computing." },
                { text: "Type II error: fail to reject $H_0$ when false — acquit a guilty person.", why: "State the precise criterion (independence product, hypotheses, or decision rule) before computing." },
                { text: "Courts set a very small $\\alpha$ (\"beyond reasonable doubt\") because Type I is judged far costlier.", why: "Name the events/parameters exactly as the problem states them." }
              ]}
              result={"Type I = wrongful conviction; Type II = wrongful acquittal."}
              check={"The asymmetric cost of errors, not just probability, drives the choice of $\\alpha$."}
              mistake={"Assuming both error types are equally bad by default — in reality the acceptable trade-off is a judgment call specific to the situation, not a fixed 50/50 split."}
            />
            <WorkedExample
              number={2}
              title="Effect of sample size on power"
              setup={"A drug trial has 68% power to detect a true effect with $n=50$. Explain qualitatively what happens to power if $n$ is increased to 200, all else equal."}
              steps={[
                { text: "Larger $n$ shrinks the standard error of the sampling distribution." },
                { text: "A shrunken sampling distribution separates more clearly from $H_0$ for a true effect.", why: "State the precise criterion (independence product, hypotheses, or decision rule) before computing." },
                { text: "This increases the probability of correctly rejecting $H_0$ — i.e., power rises above 68%.", why: "State the precise criterion (independence product, hypotheses, or decision rule) before computing." }
              ]}
              result={"Power increases with larger $n$ (commonly toward 80%+ in practice, the typical target)."}
              check={"This is why underpowered studies (small $n$) often fail to detect real effects — not because the effect is absent."}
              mistake={"Assuming a non-significant result with small $n$ means 'there's no effect' — it may simply mean the study was underpowered to detect the effect that's actually there."}
            />
          </section>

          <LaMcqSection
            id="quiz-ps-h-errors"
            badge="Quiz 4.4"
            title="Errors"
            scoreId="score-ps-h-errors"
            section="ps-h-errors"
            questions={PS_H_ERRORS_QUIZ}
          />

          <Divider />
          <PsCertificateBoost topic="hypothesis" part={2} />

          <section className="section" id="summary">
            <div className="sec-badge">Reference</div>
            <h2 className="sec-title">Part 2 complete</h2>
            <RealLifeUse>{"A pharmaceutical company runs a hypothesis test to confirm a new drug outperforms a placebo before seeking approval, A/B testing teams at tech companies decide whether a new feature really improved conversion or the change was just noise, and courts effectively require 'beyond reasonable doubt' — an intentionally very small $\\alpha$ — before convicting."}</RealLifeUse>
            <p>{"Next: regression and correlation — quantifying linear relationships between variables."}</p>
          </section>
        </main>
      </StudyGuideShell>
    );
  }

  return (
    <StudyGuideShell guideClass="partial-derivatives-guide" title="Hypothesis Testing (Part 1)">
      <nav className="sidebar">
        <div className="sb-brand"><div className="sb-title">Testing · Part 1</div></div>
        <a className="sb-link" href="#ps-h-framework">Framework</a>
        <a className="sb-link" href="#ps-h-proc1">Method</a>
        <a className="sb-link" href="#ps-h-ex-p1">Examples</a>
        <a className="sb-link" href="#quiz-ps-h-framework">Quiz</a>
        <a className="sb-link" href="#ps-h-tests">Common tests</a>
        <a className="sb-link" href="#quiz-ps-h-tests">Quiz</a>
        <a className="sb-link" href="#ps-cert-hypothesis-p1">Eight examples</a>
      </nav>
      <main className="main">
        <header className="ch-hdr">
          <div className="ch-eye">Probability &amp; Statistics · Part 1 of 2</div>
          <h1 className="ch-title">Hypothesis Testing</h1>
          <p className="ch-sub">Formal decisions from noisy data</p>
          <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
        </header>

        <section className="section" id="ps-h-framework">
          <div className="sec-badge">Section 4.1</div>
          <h2 className="sec-title">Hypotheses and significance</h2>
          <TheoryBox title="Null and alternative">
            <p>
              {"$H_0$ is the status-quo claim (often 'no effect'). $H_1$ is the research claim. We never 'prove' $H_0$; we either reject it or fail to reject it based on evidence."}
            </p>
          </TheoryBox>
          <PracticalTheory title="Write H0/H1 before touching the data">
            <p>
              {"Translate the research claim into H1 (direction matters). H0 is the skepticism baseline. Choose α in advance, compute the test statistic, then compare p to α — do not peek and then pick a tail."}
            </p>
          </PracticalTheory>
          <TheoremBox title="One-sided vs two-sided">
            <p>
              {"Two-sided $H_1:\\mu\\ne\\mu_0$ looks for any departure. One-sided alternatives look only higher or only lower — choose before seeing the data."}
            </p>
          </TheoremBox>
        </section>

        <section className="section" id="ps-h-proc1">
          <div className="sec-badge">Procedure</div>
          <ProcedureBox
            title="Test workflow"
            steps={[
                { text: "State $H_0$ and $H_1$ in symbols and words.", why: "State the precise criterion (independence product, hypotheses, or decision rule) before computing." },
                { text: "Choose test (z / t / …) matching design and assumptions." },
                { text: "Fix $\\alpha$ and the rejection region direction.", why: "Carry out the hypothesis-testing decision using α and the correct tail(s)." },
                { text: "Compute the statistic from the sample." },
                { text: "Decide and interpret in the problem’s context." }
              ]}
          />
        </section>

        <section className="section" id="ps-h-ex-p1">
          <div className="sec-badge">Worked examples</div>
          <WorkedExample
            number={1}
            title="State hypotheses"
            setup={"Claim: average battery life is still 10 hours. Researchers suspect it dropped."}
            steps={[
                { text: "$H_0:\\mu=10$.", why: "State the precise criterion (independence product, hypotheses, or decision rule) before computing." },
                { text: "$H_1:\\mu<10$ (one-sided lower).", why: "State the precise criterion (independence product, hypotheses, or decision rule) before computing." }
              ]}
            result={"Lower-tailed test for a decrease."}
            check={"Alternative matches the scientific suspicion."}
            mistake={"Writing $H_1:\\mu\\ne 10$ (two-sided) when the research question specifically suspects a decrease — the direction of $H_1$ should be chosen before looking at the data, based on the suspicion stated."}
          />
          <WorkedExample
            number={2}
            title="z-statistic"
            setup={"$\\bar x=9.6$, $\\mu_0=10$, $\\sigma=2$, $n=100$. Compute $z$."}
            steps={[
                { text: "$z=(\\bar x-\\mu_0)/(\\sigma/\\sqrt n)=(9.6-10)/(2/10)=-2$." }
              ]}
            result={"$z=-2$."}
            check={"SE $=\\sigma/\\sqrt n=0.2$."}
            mistake={"Dividing by $\\sigma$ directly instead of the standard error $\\sigma/\\sqrt n$ — that would give $z=-0.2$, ignoring how sample size shrinks the spread of $\\bar x$."}
          />
          <WorkedExample
            number={3}
            title="When to use t"
            setup={"$\\sigma$ unknown, $n=20$, roughly normal data. Which test?"}
            steps={[
                { text: "Use one-sample t with $df=n-1=19$." },
                { text: "Replace $\\sigma$ by sample $s$ in the SE." }
              ]}
            result={"t-test, df 19."}
            check={"z needs known $\\sigma$ or very large $n$."}
            mistake={"Defaulting to a z-test just because $n=20$ 'feels large enough' — with $\\sigma$ unknown and a modest sample, t is the correct choice, not z."}
          />
          <WorkedExample
            number={4}
            title="Critical value"
            setup={"Two-sided $\\alpha=0.05$ normal test. Critical values?"}
            steps={[
                { text: "Split $\\alpha/2=0.025$ in each tail.", why: "Carry out the hypothesis-testing decision using α and the correct tail(s)." },
                { text: "Reject if $|z|>1.96$.", why: "Carry out the hypothesis-testing decision using α and the correct tail(s)." }
              ]}
            result={"±1.96."}
            check={"Standard normal quantiles."}
            mistake={"Using the one-sided critical value 1.645 for a two-sided test — a two-sided test splits $\\alpha$ across both tails, giving ±1.96, not a single-tail cutoff."}
          />
        </section>

        <LaMcqSection
          id="quiz-ps-h-framework"
          badge="Quiz 4.1"
          title="Framework"
          scoreId="score-ps-h-framework"
          section="ps-h-framework"
          questions={PS_H_FRAMEWORK_QUIZ}
        />

        <Divider />
        <section className="section" id="ps-h-tests">
          <div className="sec-badge">Section 4.2</div>
          <h2 className="sec-title">Common one-sample tests</h2>
          <TheoryBox title="z and t">
            <p>
              {"Mean with known $\\sigma$ (or huge $n$): z-test. Unknown $\\sigma$: t-test. Both compare $\\bar x$ to $\\mu_0$ using an estimated standard error."}
            </p>
          </TheoryBox>
        </section>

        <LaMcqSection
          id="quiz-ps-h-tests"
          badge="Quiz 4.2"
          title="Tests"
          scoreId="score-ps-h-tests"
          section="ps-h-tests"
          questions={PS_H_TESTS_QUIZ}
        />

        <Divider />
        <PsCertificateBoost topic="hypothesis" part={1} />

        <section className="section" id="summary">
          <div className="sec-badge">Reference</div>
          <h2 className="sec-title">Part 1 complete</h2>
          <p>{"Part 2 focuses on p-values, Type I/II errors, and power."}</p>
        </section>
      </main>
    </StudyGuideShell>
  );
}

export default HypothesisTestingGuide;
