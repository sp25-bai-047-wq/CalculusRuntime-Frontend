import { COURSES } from "./courses";

/**
 * Certificate requirements per course:
 *   - requiredSections: section IDs that must be marked complete
 *     (must match the `sectionId` prop on <SectionCompleteBar />)
 *   - quizId: id of this course's certification quiz (see courseQuizzes.js)
 *   - minQuizScore: minimum quiz percentage (0-100) required
 *
 * Only courses listed here are certificate-eligible.
 */
export const COURSE_CERTIFICATE_REQUIREMENTS = {
  "calculus-analytical-geometry": {
    requiredSections: [
      "limits-1",
      "limits-2",
      "calc-diff-1",
      "calc-diff-2",
      "calc-int-1",
      "calc-int-2",
      "calc-series-1",
      "calc-series-2",
      "calc-conics-1",
      "calc-conics-2",
      "taylor-1",
      "taylor-2",
    ],
    quizId: "quiz-calculus-analytical-geometry",
    minQuizScore: 80,
  },
  "multivariable-calculus": {
    requiredSections: [
      "partial-1",
      "partial-2",
      "vector-1",
      "vector-2",
      "integrals-1",
      "integrals-2",
      "lagrange-1",
      "lagrange-2",
      "divergence-1",
      "divergence-2",
      "stokes-1",
      "stokes-2",
    ],
    quizId: "quiz-multivariable-calculus",
    minQuizScore: 80,
  },
  "linear-algebra": {
    requiredSections: [
      "la-vectors-1",
      "la-vectors-2",
      "la-matrices-1",
      "la-matrices-2",
      "la-systems-1",
      "la-systems-2",
      "la-eigen-1",
      "la-eigen-2",
    ],
    quizId: "quiz-linear-algebra",
    minQuizScore: 80,
  },
  "probability-statistics": {
    requiredSections: [
      "ps-basics-1",
      "ps-basics-2",
      "ps-rv-1",
      "ps-rv-2",
      "ps-desc-1",
      "ps-desc-2",
      "ps-hyp-1",
      "ps-hyp-2",
      "ps-reg-1",
      "ps-reg-2",
    ],
    quizId: "quiz-probability-statistics",
    minQuizScore: 80,
  },
};

// Back-compat: some existing code only needs the plain section-id list.
export const COURSE_CERTIFICATE_SECTIONS = Object.fromEntries(
  Object.entries(COURSE_CERTIFICATE_REQUIREMENTS).map(([id, req]) => [
    id,
    req.requiredSections,
  ])
);

export function getCourseTitle(courseId) {
  return COURSES.find((c) => c.id === courseId)?.title || courseId;
}

export function isCourseCertificateEligible(courseId) {
  return Object.prototype.hasOwnProperty.call(COURSE_CERTIFICATE_REQUIREMENTS, courseId);
}

export function getRequiredSections(courseId) {
  return COURSE_CERTIFICATE_REQUIREMENTS[courseId]?.requiredSections || [];
}

export function getRemainingSections(courseId, completedSections = {}) {
  return getRequiredSections(courseId).filter((id) => !completedSections[id]);
}

export function isCourseComplete(courseId, completedSections = {}) {
  if (!isCourseCertificateEligible(courseId)) return false;
  return getRemainingSections(courseId, completedSections).length === 0;
}

/** True only when sectionId is the last required section for courseId. */
export function isFinalSectionOfCourse(courseId, sectionId) {
  const required = getRequiredSections(courseId);
  return required.length > 0 && required[required.length - 1] === sectionId;
}

export function getQuizId(courseId) {
  return COURSE_CERTIFICATE_REQUIREMENTS[courseId]?.quizId || null;
}

export function getMinQuizScore(courseId) {
  return COURSE_CERTIFICATE_REQUIREMENTS[courseId]?.minQuizScore ?? 80;
}

/** Percentage (0-100) the user currently has on a course's quiz, or null if not attempted. */
export function getQuizPercentage(courseId, quizScores = {}) {
  const quizId = getQuizId(courseId);
  if (!quizId) return null;
  const attempt = quizScores[quizId];
  if (!attempt || !attempt.total) return null;
  return Math.round((attempt.score / attempt.total) * 100);
}

export function hasPassedQuiz(courseId, quizScores = {}) {
  const pct = getQuizPercentage(courseId, quizScores);
  return pct !== null && pct >= getMinQuizScore(courseId);
}