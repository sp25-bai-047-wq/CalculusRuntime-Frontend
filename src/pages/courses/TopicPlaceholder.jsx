import { Link, useParams } from "react-router-dom";

const TITLES = {
  "probability-basics": "Probability Basics",
  "random-variables": "Random Variables & Distributions",
  "descriptive-statistics": "Descriptive Statistics",
  "hypothesis-testing": "Hypothesis Testing",
  "regression-correlation": "Regression & Correlation",
};

export default function TopicPlaceholder() {
  const { slug } = useParams();
  const title = TITLES[slug] || "Module";

  return (
    <div className="home-page" style={{ padding: "3rem 1.5rem", maxWidth: 720, margin: "0 auto" }}>
      <p style={{ opacity: 0.7, marginBottom: "0.5rem" }}>Probability and Statistics</p>
      <h1 style={{ fontFamily: "Lora, Georgia, serif", marginBottom: "1rem" }}>{title}</h1>
      <p style={{ lineHeight: 1.6, marginBottom: "1.5rem" }}>
        This module is scaffolded for the course hub and will be filled with study guides,
        quizzes, and practice problems in a follow-up sprint. The layout matches other CalcVoyager
        course topics so content can drop in without changing routes.
      </p>
      <p>
        <Link to="/courses/probability-statistics" style={{ color: "var(--gold, #c8922a)", fontWeight: 600 }}>
          ← Back to Probability and Statistics
        </Link>
      </p>
    </div>
  );
}
