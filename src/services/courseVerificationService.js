import {
  getRequiredSections,
  getRemainingSections,
  isCourseCertificateEligible,
  isCourseComplete,
} from "../data/courseCompletion";

/**
 * Client-side course completion check used by verificationAPI.js.
 * userProgress.completedSections: string[] of completed section IDs
 * courseData.id: course id; courseData.requiredSections optional override
 */
export function verifyCourseCompletion(userProgress, courseData) {
  const courseId = courseData?.id;
  if (!courseId || !isCourseCertificateEligible(courseId)) {
    return {
      verified: false,
      courseId,
      completedCount: 0,
      requiredCount: 0,
      remaining: [],
      reason: "Course is not certificate-eligible.",
    };
  }

  const completedList = Array.isArray(userProgress?.completedSections)
    ? userProgress.completedSections
    : Object.keys(userProgress?.completedSections || {}).filter(
        (id) => userProgress.completedSections[id],
      );

  const completedMap = Object.fromEntries(completedList.map((id) => [id, true]));
  const required =
    Array.isArray(courseData.requiredSections) && courseData.requiredSections.length
      ? courseData.requiredSections
      : getRequiredSections(courseId);
  const remaining = required.filter((id) => !completedMap[id]);
  const verified =
    remaining.length === 0 && isCourseComplete(courseId, completedMap);

  return {
    verified,
    courseId,
    completedCount: required.length - remaining.length,
    requiredCount: required.length,
    remaining: getRemainingSections(courseId, completedMap),
    reason: verified
      ? "All required sections are complete."
      : "One or more required sections are incomplete.",
  };
}
