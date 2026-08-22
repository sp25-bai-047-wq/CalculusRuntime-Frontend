/**
 * Guide MCQ keys (data-section / LaMcq `section`) required before
 * "Mark as complete" unlocks for a progress sectionId.
 * Scores are stored as quizScores[`guide-mcq-${key}`].
 * Sections with an empty list (or missing entry) stay unlocked.
 */
export const SECTION_GUIDE_QUIZ_KEYS = {
  // Calculus & Analytical Geometry
  "limits-1": ["limits-p1"],
  "limits-2": ["limits-p2"],
  "calc-diff-1": ["diff-rules"],
  "calc-diff-2": ["diff-apps", "diff-adv"],
  "calc-int-1": ["int-fund"],
  "calc-int-2": ["int-tech"],
  "calc-series-1": ["ser-p1"],
  "calc-series-2": ["ser-p2"],
  "calc-conics-1": ["con-p1"],
  "calc-conics-2": ["con-p2"],
  "taylor-1": ["taylor-concept", "taylor-formula", "maclaurin-core"],
  "taylor-2": [
    "taylor-catalog",
    "taylor-convergence",
    "taylor-error",
    "taylor-engineering",
    "taylor-challenge",
  ],

  // Multivariable Calculus
  "partial-1": ["141", "142", "143"],
  "partial-2": ["144", "145", "146", "147"],
  "vector-1": [],
  "vector-2": [],
  "integrals-1": ["integrals-p1"],
  "integrals-2": ["integrals-p2"],
  "lagrange-1": ["lagrange-geometry", "lagrange-math", "lagrange-fields"],
  "lagrange-2": [
    "lagrange-calc",
    "lagrange-multi",
    "lagrange-verify",
    "lagrange-industry",
    "lagrange-challenge",
  ],
  "divergence-1": ["field-concept", "div-formula", "curl-core"],
  "divergence-2": [
    "vector-catalog",
    "vector-identity",
    "div-theorem",
    "stokes-theorem",
    "divcurl-challenge",
  ],
  "stokes-1": ["stokes-f"],
  "stokes-2": ["stokes-a"],

  // Linear Algebra
  "la-lineq-1": ["la-le-forms", "la-le-graph"],
  "la-lineq-2": ["la-le-sys", "la-le-solve"],
  "la-vectors-1": ["la-v-intro", "la-v-ops"],
  "la-vectors-2": ["la-v-span", "la-v-indep"],
  "la-matrices-1": ["la-m-intro", "la-m-ops"],
  "la-matrices-2": ["la-m-det", "la-m-inv"],
  "la-systems-1": ["la-s-intro", "la-s-gauss"],
  "la-systems-2": ["la-s-rank", "la-s-geo"],
  "la-eigen-1": ["la-e-intro", "la-e-char"],
  "la-eigen-2": ["la-e-diag", "la-e-apps"],

  // Probability & Statistics
  "ps-basics-1": ["ps-b-intro", "ps-b-combo"],
  "ps-basics-2": ["ps-b-cond", "ps-b-bayes"],
  "ps-rv-1": ["ps-rv-intro", "ps-rv-moments"],
  "ps-rv-2": ["ps-rv-cont", "ps-rv-named"],
  "ps-desc-1": ["ps-d-center", "ps-d-quant"],
  "ps-desc-2": ["ps-d-spread", "ps-d-plots"],
  "ps-hyp-1": ["ps-h-framework", "ps-h-tests"],
  "ps-hyp-2": ["ps-h-pval", "ps-h-errors"],
  "ps-reg-1": ["ps-r-corr", "ps-r-assoc"],
  "ps-reg-2": ["ps-r-fit", "ps-r-resid"],
};

export const SECTION_QUIZ_PASS_PERCENT = 80;

export function guideQuizId(sectionKey) {
  return `guide-mcq-${sectionKey}`;
}

export function getSectionGuideQuizKeys(sectionId) {
  return SECTION_GUIDE_QUIZ_KEYS[sectionId] || [];
}

export function getQuizAttemptPercent(attempt) {
  if (!attempt || !attempt.total) return null;
  return Math.round((attempt.score / attempt.total) * 100);
}

/** True when every required guide quiz for this section is ≥ 80%. */
export function hasPassedSectionQuizzes(sectionId, quizScores = {}) {
  const keys = getSectionGuideQuizKeys(sectionId);
  if (!keys.length) return true;
  return keys.every((key) => {
    const pct = getQuizAttemptPercent(quizScores[guideQuizId(key)]);
    return pct !== null && pct >= SECTION_QUIZ_PASS_PERCENT;
  });
}

export function getSectionQuizGateStatus(sectionId, quizScores = {}) {
  const keys = getSectionGuideQuizKeys(sectionId);
  if (!keys.length) {
    return { locked: false, required: [], missing: [], failed: [] };
  }
  const missing = [];
  const failed = [];
  keys.forEach((key) => {
    const id = guideQuizId(key);
    const pct = getQuizAttemptPercent(quizScores[id]);
    if (pct === null) missing.push(key);
    else if (pct < SECTION_QUIZ_PASS_PERCENT) failed.push({ key, pct });
  });
  return {
    locked: missing.length > 0 || failed.length > 0,
    required: keys,
    missing,
    failed,
  };
}
