/** Search index for the header search box: pages, guides, tools and formulas. */
import { COURSES } from "./courses";
import formulaData from "./formulaData";

const PAGES = [
  { title: "Home", path: "/", description: "Choose a study path and see the four subjects." },
  { title: "Dashboard", path: "/dashboard", description: "Your progress, streaks and enrolled courses." },
  { title: "Simple Concepts", path: "/simple-concepts", description: "Plain-language explanations of the core ideas." },
  { title: "AI Solver", path: "/ai-solver", description: "Step-by-step solutions from the calculus assistant." },
  { title: "Cheat Sheet", path: "/cheatsheet", description: "Every formula grouped by topic." },
  { title: "Practice Arena", path: "/practice", description: "100 Easy, Medium and Hard questions per topic." },
  { title: "Saved Examples", path: "/saved", description: "Examples you bookmarked while reading a guide." },
  { title: "Leaderboard", path: "/leaderboard", description: "Quiz scores across all learners." },
  { title: "Certificates", path: "/certificates", description: "Certificates you have unlocked." },
  { title: "Personalized Study Plan", path: "/study-plan", description: "A schedule built from your progress." },
];

const PRACTICE_TOPICS = [
  "Lagrange Multipliers", "Divergence & Curl", "Stokes' Theorem",
  "Taylor Series for Multivariable Functions", "Partial Derivatives", "Vector Calculus",
  "Limits and Continuity", "Differentiation", "Integration", "Sequences and Infinite Series",
  "Conic Sections and Analytic Geometry", "Multiple Integrals", "Vectors & Vector Spaces",
  "Matrices & Determinants", "Systems of Linear Equations", "Eigenvalues & Eigenvectors",
  "Probability Basics", "Random Variables & Distributions", "Descriptive Statistics",
  "Hypothesis Testing", "Regression & Correlation",
];

function build() {
  const entries = [];

  PAGES.forEach((p) => entries.push({ ...p, kind: "Page" }));

  COURSES.forEach((course) => {
    entries.push({
      title: course.title,
      path: course.path,
      description: course.description,
      kind: "Subject",
    });
    course.modules.forEach((mod) => {
      const isGuide = /\/1$/.test(mod.path);
      entries.push({
        title: mod.title,
        path: mod.path,
        description: mod.description,
        kind: isGuide ? "Guide" : "Tool",
        context: course.title,
      });
      if (isGuide) {
        entries.push({
          title: `${mod.title} — Part 2`,
          path: mod.path.replace(/\/1$/, "/2"),
          description: mod.description,
          kind: "Guide",
          context: course.title,
        });
      }
    });
  });

  PRACTICE_TOPICS.forEach((topic) => {
    entries.push({
      title: `Practice: ${topic}`,
      path: "/practice",
      description: `300 generated questions across Easy, Medium and Hard for ${topic}.`,
      kind: "Practice",
    });
  });

  Object.values(formulaData).forEach((group) => {
    (group.formulas || []).forEach((f) => {
      entries.push({
        title: f.name,
        path: "/cheatsheet",
        description: f.formula,
        kind: "Formula",
        context: group.title,
      });
    });
  });

  return entries;
}

export const SEARCH_INDEX = build();

function score(entry, query) {
  const title = entry.title.toLowerCase();
  if (title === query) return 100;
  if (title.startsWith(query)) return 80;
  if (title.includes(query)) return 60;
  if ((entry.context || "").toLowerCase().includes(query)) return 35;
  if ((entry.description || "").toLowerCase().includes(query)) return 25;
  return 0;
}

const KIND_BONUS = { Subject: 6, Guide: 5, Page: 4, Tool: 3, Practice: 2, Formula: 1 };

export function searchSite(rawQuery, limit = 8) {
  const query = (rawQuery || "").trim().toLowerCase();
  if (query.length < 2) return [];
  return SEARCH_INDEX
    .map((entry) => ({ entry, s: score(entry, query) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => (b.s + (KIND_BONUS[b.entry.kind] || 0)) - (a.s + (KIND_BONUS[a.entry.kind] || 0)))
    .slice(0, limit)
    .map((r) => r.entry);
}
