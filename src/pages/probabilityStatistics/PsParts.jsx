import PsTopicPart from "./PsTopicPart";
import ProbabilityBasicsGuide from "./ProbabilityBasicsGuide";
import RandomVariablesGuide from "./RandomVariablesGuide";
import DescriptiveStatsGuide from "./DescriptiveStatsGuide";
import HypothesisTestingGuide from "./HypothesisTestingGuide";
import RegressionGuide from "./RegressionGuide";

export function ProbBasicsPart1() {
  return (
    <PsTopicPart
      sectionId="ps-basics-1"
      title="Probability Basics — Part 1"
      path="/probability-statistics/probability-basics/1"
      Guide={ProbabilityBasicsGuide}
      part={1}
      nextPath="/probability-statistics/probability-basics/2"
      nextLabel="Next: Part 2 — Conditional probability & Bayes"
    />
  );
}

export function ProbBasicsPart2() {
  return (
    <PsTopicPart
      sectionId="ps-basics-2"
      title="Probability Basics — Part 2"
      path="/probability-statistics/probability-basics/2"
      Guide={ProbabilityBasicsGuide}
      part={2}
      nextPath="/probability-statistics/random-variables/1"
      nextLabel="Next: Random Variables & Distributions"
    />
  );
}

export function RandomVarsPart1() {
  return (
    <PsTopicPart
      sectionId="ps-rv-1"
      title="Random Variables — Part 1"
      path="/probability-statistics/random-variables/1"
      Guide={RandomVariablesGuide}
      part={1}
      nextPath="/probability-statistics/random-variables/2"
      nextLabel="Next: Part 2 — Continuous RVs & named distributions"
    />
  );
}

export function RandomVarsPart2() {
  return (
    <PsTopicPart
      sectionId="ps-rv-2"
      title="Random Variables — Part 2"
      path="/probability-statistics/random-variables/2"
      Guide={RandomVariablesGuide}
      part={2}
      nextPath="/probability-statistics/descriptive-statistics/1"
      nextLabel="Next: Descriptive Statistics"
    />
  );
}

export function DescriptivePart1() {
  return (
    <PsTopicPart
      sectionId="ps-desc-1"
      title="Descriptive Statistics — Part 1"
      path="/probability-statistics/descriptive-statistics/1"
      Guide={DescriptiveStatsGuide}
      part={1}
      nextPath="/probability-statistics/descriptive-statistics/2"
      nextLabel="Next: Part 2 — Spread, z-scores, and visuals"
    />
  );
}

export function DescriptivePart2() {
  return (
    <PsTopicPart
      sectionId="ps-desc-2"
      title="Descriptive Statistics — Part 2"
      path="/probability-statistics/descriptive-statistics/2"
      Guide={DescriptiveStatsGuide}
      part={2}
      nextPath="/probability-statistics/hypothesis-testing/1"
      nextLabel="Next: Hypothesis Testing"
    />
  );
}

export function HypothesisPart1() {
  return (
    <PsTopicPart
      sectionId="ps-hyp-1"
      title="Hypothesis Testing — Part 1"
      path="/probability-statistics/hypothesis-testing/1"
      Guide={HypothesisTestingGuide}
      part={1}
      nextPath="/probability-statistics/hypothesis-testing/2"
      nextLabel="Next: Part 2 — p-values, errors, and power"
    />
  );
}

export function HypothesisPart2() {
  return (
    <PsTopicPart
      sectionId="ps-hyp-2"
      title="Hypothesis Testing — Part 2"
      path="/probability-statistics/hypothesis-testing/2"
      Guide={HypothesisTestingGuide}
      part={2}
      nextPath="/probability-statistics/regression-correlation/1"
      nextLabel="Next: Regression & Correlation"
    />
  );
}

export function RegressionPart1() {
  return (
    <PsTopicPart
      sectionId="ps-reg-1"
      title="Regression & Correlation — Part 1"
      path="/probability-statistics/regression-correlation/1"
      Guide={RegressionGuide}
      part={1}
      nextPath="/probability-statistics/regression-correlation/2"
      nextLabel="Next: Part 2 — Fitting lines and residuals"
    />
  );
}

export function RegressionPart2() {
  return (
    <PsTopicPart
      sectionId="ps-reg-2"
      title="Regression & Correlation — Part 2"
      path="/probability-statistics/regression-correlation/2"
      Guide={RegressionGuide}
      part={2}
      courseId="probability-statistics"
      nextPath="/courses/probability-statistics"
      nextLabel="Back to Probability & Statistics course hub"
    />
  );
}
