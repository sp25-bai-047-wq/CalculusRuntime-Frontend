import StudyGuideShell from "../courses/StudyGuideShell";
import "../multivariableCalculus/PartialDerivativesGuide.css";
import { LaMcqSection } from "../linearAlgebra/LaMcq";
import {
  PS_B_INTRO_QUIZ,
  PS_B_COMBO_QUIZ,
  PS_B_COND_QUIZ,
  PS_B_BAYES_QUIZ,
} from "../../data/psProbRvQuizzes";
import { TheoryBox, TheoremBox, ProcedureBox, WorkedExample, RealLifeUse, PracticalTheory } from "../linearAlgebra/LaBlocks";

import PsCertificateBoost from "./PsCertificateBoost";

function Divider() {
  return <hr className="divider" />;
}

function ProbabilityBasicsGuide({ part = 1 }) {
  if (part === 2) {
    return (
      <StudyGuideShell guideClass="partial-derivatives-guide" title="Probability Basics (Part 2)">
        <nav className="sidebar">
          <div className="sb-brand"><div className="sb-title">Prob Basics · Part 2</div></div>
          <a className="sb-link" href="#ps-b-cond">Conditional probability</a>
          <a className="sb-link" href="#ps-b-proc2">Method</a>
          <a className="sb-link" href="#ps-b-ex-p2">Examples</a>
          <a className="sb-link" href="#quiz-ps-b-cond">Quiz</a>
          <a className="sb-link" href="#ps-b-bayes">Bayes</a>
          <a className="sb-link" href="#quiz-ps-b-bayes">Quiz</a>
          <a className="sb-link" href="#ps-cert-probability-p2">Eight examples</a>
        </nav>
        <main className="main">
          <header className="ch-hdr">
            <div className="ch-eye">Probability &amp; Statistics · Part 2 of 2</div>
            <h1 className="ch-title">Conditional Probability &amp; Bayes</h1>
            <p className="ch-sub">Update beliefs when new information arrives</p>
            <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
          </header>

          <section className="section" id="ps-b-cond">
            <div className="sec-badge">Section 1.3</div>
            <h2 className="sec-title">Conditional probability — deep theory</h2>
            <TheoryBox title="Restricting the sample space">
              <p>
                {"$P(A\\mid B)=P(A\\cap B)/P(B)$ when $P(B)>0$. Conditioning on $B$ shrinks the universe to outcomes inside $B$, then renormalizes."}
              </p>
              <p>
                {"Independence means $P(A\\cap B)=P(A)P(B)$, equivalently $P(A\\mid B)=P(A)$. Dependence is the default in real problems — always check rather than assume."}
              </p>
            </TheoryBox>
            <PracticalTheory title="When to open Bayes">
              <p>
                {"Use Bayes when you are given P(evidence|cause) but asked for P(cause|evidence). Write priors, likelihoods, then the total-probability denominator. Sanity-check: posteriors over a partition must sum to 1. Try the interactive "}
                <a href="/probability-statistics/bayes-lab">Bayes Lab</a>
                {" to watch prevalence move P(D|+)."}
              </p>
            </PracticalTheory>
            <TheoremBox title="Law of total probability">
              <p>
                {"If $B_1,\\ldots,B_k$ partition $\\Omega$, then $P(A)=\\sum_i P(A\\mid B_i)P(B_i)$. This is the bridge to Bayes’ theorem."}
              </p>
            </TheoremBox>
          </section>

          <section className="section" id="ps-b-proc2">
            <div className="sec-badge">Procedure</div>
            <h2 className="sec-title">How to compute conditionals</h2>
            <ProcedureBox
              title="Checklist"
              steps={[
                { text: "Identify the event you condition on (the new information)." },
                { text: "Write $P(A\\cap B)$ carefully — often via a tree or table." },
                { text: "Divide by $P(B)$; never skip the denominator." },
                { text: "For Bayes: compute $P(B\\mid A)$ from $P(A\\mid B)P(B)/P(A)$, using total probability for $P(A)$.", why: "Build the marginal of the evidence with the law of total probability." },
                { text: "Sanity-check: answers must lie in $[0,1]$." }
              ]}
            />
          </section>

          <section className="section" id="ps-b-ex-p2">
            <div className="sec-badge">Worked examples</div>
            <h2 className="sec-title">Four detailed examples</h2>
            <WorkedExample
              number={1}
              title="Cards given a red card"
              setup={"Draw one card from a 52-card deck. Let $A=$ ace, $B=$ red. Find $P(A\\mid B)$."}
              steps={[
                { text: "$B$ has 26 red cards; among them 2 are aces (hearts, diamonds).", why: "Count equally likely outcomes in the conditioning set carefully (order matters for dice)." },
                { text: "So $P(A\\mid B)=2/26=1/13$.", why: "Apply Bayes: posterior ∝ likelihood × prior, then normalize." },
                { text: "Note $P(A)=4/52=1/13$ as well — here $A$ and $B$ are independent.", why: "State the precise criterion (independence product, hypotheses, or decision rule) before computing." }
              ]}
              result={"$P(A\\mid B)=1/13$."}
              check={"$P(A\\cap B)=(2/52)$, $P(B)=26/52$, ratio $2/26$."}
              mistake={"Dividing by 52 instead of 26 — once you condition on $B$, the denominator shrinks to $B$'s own count, not the full sample space."}
            />
            <WorkedExample
              number={2}
              title="Two dice, given sum ≥ 10"
              setup={"Fair dice. $A=$ sum is 11, $B=$ sum ≥ 10. Find $P(A\\mid B)$."}
              steps={[
                { text: "Sums ≥ 10: (4,6),(5,5),(5,6),(6,4),(6,5),(6,6) → 6 outcomes.", why: "Count equally likely outcomes in the conditioning set carefully (order matters for dice)." },
                { text: "Sum 11: (5,6),(6,5) → 2 outcomes.", why: "Count equally likely outcomes in the conditioning set carefully (order matters for dice)." },
                { text: "$P(A\\mid B)=2/6=1/3$.", why: "Apply Bayes: posterior ∝ likelihood × prior, then normalize." }
              ]}
              result={"$1/3$."}
              check={"Equally likely outcomes restricted to $B$."}
              mistake={"Forgetting that (5,6) and (6,5) are two distinct outcomes, not one — treating dice as unordered undercounts the sample space."}
            />
            <WorkedExample
              number={3}
              title="Medical test (Bayes)"
              setup={"Disease rate 1%. Test: sensitivity 99%, false positive 2%. Given positive test, find $P(\\text{disease})$."}
              steps={[
                { text: "Let $D=$ disease, $+=$ positive. $P(D)=0.01$, $P(+\\mid D)=0.99$, $P(+\\mid D^c)=0.02$.", why: "Name the events/parameters exactly as the problem states them." },
                { text: "$P(+)=0.99(0.01)+0.02(0.99)=0.0099+0.0198=0.0297$.", why: "Build the marginal of the evidence with the law of total probability." },
                { text: "$P(D\\mid +)=0.0099/0.0297\\approx 0.333$.", why: "Apply Bayes: posterior ∝ likelihood × prior, then normalize." }
              ]}
              result={"About $33\\%$ — still more likely healthy than sick after one positive."}
              check={"Most positives come from the large healthy population."}
              mistake={"Assuming a positive result means 99% chance of disease (confusing $P(+\\mid D)$ with $P(D\\mid +)$) — these are not the same quantity."}
            />
            <WorkedExample
              number={4}
              title="Independence check"
              setup={"$P(A)=0.4$, $P(B)=0.5$, $P(A\\cap B)=0.2$. Are $A,B$ independent?"}
              steps={[
                { text: "Need $P(A\\cap B)=P(A)P(B)=0.20$.", why: "State the precise criterion (independence product, hypotheses, or decision rule) before computing." },
                { text: "Observed intersection is also $0.2$.", why: "Finish the arithmetic and state the conclusion in the problem's units." },
                { text: "Yes — independent. Also $P(A\\mid B)=0.2/0.5=0.4=P(A)$.", why: "State the precise criterion (independence product, hypotheses, or decision rule) before computing." }
              ]}
              result={"Independent."}
              check={"Product rule holds exactly."}
              mistake={"Assuming disjoint ($A\\cap B=\\varnothing$) means independent — the two ideas are unrelated; disjoint events with nonzero probability are actually always dependent."}
            />
          </section>

          <LaMcqSection
            id="quiz-ps-b-cond"
            badge="Quiz 1.3"
            title="Conditionals"
            scoreId="score-ps-b-cond"
            section="ps-b-cond"
            questions={PS_B_COND_QUIZ}
          />

          <Divider />
          <section className="section" id="ps-b-bayes">
            <div className="sec-badge">Section 1.4</div>
            <h2 className="sec-title">Bayes’ theorem</h2>
            <TheoryBox title="Flipping the conditioning">
              <p>
                {"$P(B\\mid A)=P(A\\mid B)P(B)/P(A)$. Prior $P(B)$ becomes posterior $P(B\\mid A)$ after observing $A$."}
              </p>
            </TheoryBox>
            <TheoremBox title="Bayes with several hypotheses">
              <p>
                {"If $B_1,\\ldots,B_k$ partition $\\Omega$ (mutually exclusive causes), then $P(B_i\\mid A)=\\dfrac{P(A\\mid B_i)P(B_i)}{\\sum_j P(A\\mid B_j)P(B_j)}$. The denominator is the law of total probability applied to $A$."}
              </p>
            </TheoremBox>
            <ProcedureBox
              title="Multi-hypothesis Bayes checklist"
              steps={[
                { text: "List every mutually exclusive cause $B_1,\\ldots,B_k$ and their priors $P(B_i)$." },
                { text: "Write the likelihood $P(A\\mid B_i)$ for each cause.", why: "Apply Bayes: posterior ∝ likelihood × prior, then normalize." },
                { text: "Compute the total probability $P(A)=\\sum_j P(A\\mid B_j)P(B_j)$ — the shared denominator.", why: "Build the marginal of the evidence with the law of total probability." },
                { text: "Divide the numerator for the cause you care about by this denominator.", why: "Finish the arithmetic and state the conclusion in the problem's units." },
                { text: "Sanity-check: all resulting posteriors $P(B_i\\mid A)$ must sum to 1.", why: "Apply Bayes: posterior ∝ likelihood × prior, then normalize." }
              ]}
            />
            <WorkedExample
              number={1}
              title="Three factories, one defective part"
              setup={"Factories $F_1,F_2,F_3$ supply $50\\%,30\\%,20\\%$ of parts, with defect rates $2\\%,5\\%,1\\%$. A part is defective — find $P(F_2\\mid \\text{defective})$."}
              steps={[
                { text: "$P(D)=0.5(0.02)+0.3(0.05)+0.2(0.01)=0.010+0.015+0.002=0.027$.", why: "Build the marginal of the evidence with the law of total probability." },
                { text: "$P(F_2\\mid D)=P(D\\mid F_2)P(F_2)/P(D)=0.015/0.027$.", why: "Build the marginal of the evidence with the law of total probability." },
                { text: "$0.015/0.027\\approx 0.556$." }
              ]}
              result={"About $55.6\\%$ — despite supplying only 30% of parts, $F_2$'s higher defect rate makes it the most likely source."}
              check={"Posteriors for all three factories sum to 1: check $0.010/0.027+0.015/0.027+0.002/0.027=1$."}
              mistake={"Picking $F_2$ just because it has the highest defect rate, ignoring its market share — Bayes weighs both the likelihood and the prior together."}
            />
            <WorkedExample
              number={2}
              title="Spam filter"
              setup={"20% of emails are spam. A filter flags 90% of spam and 5% of non-spam as 'flagged'. Given an email is flagged, find $P(\\text{spam})$."}
              steps={[
                { text: "$P(\\text{flagged})=0.2(0.9)+0.8(0.05)=0.18+0.04=0.22$." },
                { text: "$P(\\text{spam}\\mid \\text{flagged})=0.18/0.22$." },
                { text: "$\\approx 0.818$." }
              ]}
              result={"About $81.8\\%$ chance a flagged email is truly spam."}
              check={"Even a 5% false-positive rate on the large 'non-spam' group contributes meaningfully to flagged emails — the same rare-disease-style effect as the medical test earlier."}
              mistake={"Reading '90% of spam gets flagged' as 'if flagged, 90% chance it's spam' — that swaps $P(\\text{flagged}\\mid\\text{spam})$ for $P(\\text{spam}\\mid\\text{flagged})$."}
            />
          </section>

          <LaMcqSection
            id="quiz-ps-b-bayes"
            badge="Quiz 1.4"
            title="Bayes"
            scoreId="score-ps-b-bayes"
            section="ps-b-bayes"
            questions={PS_B_BAYES_QUIZ}
          />

          <Divider />
          <PsCertificateBoost topic="probability" part={2} />

          <section className="section" id="summary">
            <div className="sec-badge">Reference</div>
            <h2 className="sec-title">Part 2 complete</h2>
            <RealLifeUse>{"Insurers price policies using axioms and conditional probability, doctors interpret diagnostic tests with Bayes' theorem, and fraud-detection systems flag transactions by updating probabilities as new evidence (location, amount, device) arrives — the same Bayes machinery from this guide."}</RealLifeUse>
            <p>{"Next: random variables turn events into numbers you can average and model with distributions."}</p>
          </section>
        </main>
      </StudyGuideShell>
    );
  }

  return (
    <StudyGuideShell guideClass="partial-derivatives-guide" title="Probability Basics (Part 1)">
      <nav className="sidebar">
        <div className="sb-brand"><div className="sb-title">Prob Basics · Part 1</div></div>
        <a className="sb-link" href="#ps-b-intro">Axioms</a>
        <a className="sb-link" href="#ps-b-proc1">Method</a>
        <a className="sb-link" href="#ps-b-ex-p1">Examples</a>
        <a className="sb-link" href="#quiz-ps-b-intro">Quiz</a>
        <a className="sb-link" href="#ps-b-combo">Counting</a>
        <a className="sb-link" href="#quiz-ps-b-combo">Quiz</a>
        <a className="sb-link" href="#ps-cert-probability-p1">Eight examples</a>
      </nav>
      <main className="main">
        <header className="ch-hdr">
          <div className="ch-eye">Probability &amp; Statistics · Part 1 of 2</div>
          <h1 className="ch-title">Probability Basics</h1>
          <p className="ch-sub">Sample spaces, events, and the axioms</p>
          <span className="ch-orn">✦ &nbsp; ✦ &nbsp; ✦</span>
        </header>

        <div className="opening-note-box">
          <p className="opening-note">
            <strong>Operational Blueprint:</strong>{" "}
            {"This foundational study guide introduces the mathematical theory of probability, formalizing methods to quantify uncertainty and analyze random phenomena. Starting from first principles, an experiment is characterized by a sample space $\\Omega$ comprising all possible outcomes, with events defined as outcome subsets. We introduce Kolmogorov's probability axioms—non-negativity, unit measure, and countable additivity—to establish rigorous mathematical consistency. The curriculum advances through combinatorial counting techniques, conditional probability definitions, joint distributions, statistical independence criteria, and Bayes' Theorem for updating belief states given empirical evidence. This framework provides the essential mathematical bedrock for inferential statistics, machine learning risk estimation, and data-driven decision theory."}
          </p>
        </div>

        <section className="section" id="ps-b-intro">
          <div className="sec-badge">Section 1.1</div>
          <h2 className="sec-title">Sample spaces and axioms</h2>
          <TheoryBox title="What probability is">
            <p>
              {"A sample space $\\Omega$ lists all possible outcomes of an experiment. An event $A\\subseteq\\Omega$ is a set of outcomes. Probability $P$ assigns each event a number in $[0,1]$."}
            </p>
          </TheoryBox>
          <PracticalTheory title="Reading a probability word problem">
            <p>
              {"Underline the event you want and the information you condition on. Draw a tiny table or tree before writing symbols. If the story mentions 'given that' or a positive test, reach for conditional probability or Bayes — not a raw base rate."}
            </p>
          </PracticalTheory>
          <TheoremBox title="Kolmogorov axioms">
            <p>
              {"(1) $P(A)\\ge 0$. (2) $P(\\Omega)=1$. (3) For countable disjoint events, $P(\\bigcup A_i)=\\sum P(A_i)$. From these: $P(A^c)=1-P(A)$ and $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$."}
            </p>
          </TheoremBox>
        </section>

        <section className="section" id="ps-b-proc1">
          <div className="sec-badge">Procedure</div>
          <h2 className="sec-title">How to set up a probability model</h2>
          <ProcedureBox
            title="Setup checklist"
            steps={[
                { text: "Define $\\Omega$ clearly (what counts as one outcome?).", why: "Name the events/parameters exactly as the problem states them." },
                { text: "Decide if outcomes are equally likely; if yes, $P(A)=|A|/|\\Omega|$.", why: "State the precise criterion (independence product, hypotheses, or decision rule) before computing." },
                { text: "Otherwise assign probabilities that sum to 1.", why: "Count equally likely outcomes in the conditioning set carefully (order matters for dice)." },
                { text: "Translate the word problem into unions, intersections, complements." },
                { text: "Use axioms and identities — avoid inventing new rules mid-problem." }
              ]}
          />
        </section>

        <section className="section" id="ps-b-ex-p1">
          <div className="sec-badge">Worked examples</div>
          <h2 className="sec-title">Four detailed examples</h2>
          <WorkedExample
            number={1}
            title="Fair die"
            setup={"Roll a fair six-sided die. Find $P(\\text{even})$ and $P(\\text{at least }5)$."}
            steps={[
                { text: "$\\Omega=\\{1,2,3,4,5,6\\}$, each probability $1/6$." },
                { text: "Even: $\\{2,4,6\\}$ → $3/6=1/2$." },
                { text: "At least 5: $\\{5,6\\}$ → $2/6=1/3$." }
              ]}
            result={"$1/2$ and $1/3$."}
            check={"Counts over 6 equally likely faces."}
            mistake={"Reading 'at least 5' as only $\\{5\\}$ — 'at least' includes the endpoint and everything above it, so 6 belongs too."}
          />
          <WorkedExample
            number={2}
            title="Complement"
            setup={"$P(A)=0.35$. Find $P(A^c)$."}
            steps={[
                { text: "Axiom: $P(A)+P(A^c)=1$." },
                { text: "$P(A^c)=1-0.35=0.65$." }
              ]}
            result={"$0.65$."}
            check={"Sums with $P(A)$ to 1."}
            mistake={"Multiplying instead of subtracting (e.g. writing $P(A^c)=1\\times 0.35$) — the complement rule is additive, not multiplicative."}
          />
          <WorkedExample
            number={3}
            title="Inclusion–exclusion"
            setup={"$P(A)=0.4$, $P(B)=0.5$, $P(A\\cap B)=0.15$. Find $P(A\\cup B)$."}
            steps={[
                { text: "$P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$." },
                { text: "$=0.4+0.5-0.15=0.75$." }
              ]}
            result={"$0.75$."}
            check={"Intersection was subtracted once to avoid double-counting."}
            mistake={"Forgetting to subtract $P(A\\cap B)$ at all, giving $0.9$ — this double-counts the overlap region."}
          />
          <WorkedExample
            number={4}
            title="Two coins"
            setup={"Two fair coins. Find $P(\\text{exactly one head})$."}
            steps={[
                { text: "$\\Omega=\\{HH,HT,TH,TT\\}$, each $1/4$." },
                { text: "Exactly one head: $\\{HT,TH\\}$." },
                { text: "Probability $2/4=1/2$." }
              ]}
            result={"$1/2$."}
            check={"Not $1/3$ — outcomes are equally likely only if listed this way."}
            mistake={"Treating outcomes as {0 heads, 1 head, 2 heads} and giving each 1/3 — those three outcomes are not equally likely; HT and TH must be counted separately."}
          />
        </section>

        <LaMcqSection
          id="quiz-ps-b-intro"
          badge="Quiz 1.1"
          title="Axioms"
          scoreId="score-ps-b-intro"
          section="ps-b-intro"
          questions={PS_B_INTRO_QUIZ}
        />

        <Divider />
        <section className="section" id="ps-b-combo">
          <div className="sec-badge">Section 1.2</div>
          <h2 className="sec-title">Equally likely outcomes &amp; counting</h2>
          <TheoryBox title="Classical probability">
            <p>
              {String.raw`When all outcomes are equally likely, $P(A)=|A|/|\Omega|$. Combinations $\binom{n}{k}$ and permutations $P(n,k)$ build $|\Omega|$ and $|A|$ for cards, committees, and passwords.`}
            </p>
          </TheoryBox>
        </section>

        <LaMcqSection
          id="quiz-ps-b-combo"
          badge="Quiz 1.2"
          title="Counting"
          scoreId="score-ps-b-combo"
          section="ps-b-combo"
          questions={PS_B_COMBO_QUIZ}
        />

        <Divider />
        <PsCertificateBoost topic="probability" part={1} />

        <section className="section" id="summary">
          <div className="sec-badge">Reference</div>
          <h2 className="sec-title">Part 1 complete</h2>
          <p>{"Continue to Part 2 for conditionals and Bayes — the tools used in every diagnostic and classification problem."}</p>
        </section>
      </main>
    </StudyGuideShell>
  );
}

export default ProbabilityBasicsGuide;
