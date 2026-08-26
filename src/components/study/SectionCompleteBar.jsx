import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";
import { Link } from "react-router-dom";
import { isCourseCertificateEligible, isCourseComplete } from "../../data/courseCompletion";
import {
  SECTION_QUIZ_PASS_PERCENT,
  getSectionQuizGateStatus,
  hasPassedSectionQuizzes,
} from "../../data/sectionQuizGates";
import "./SectionCompleteBar.css";

/**
 * courseId is optional — pass it from the guide page that represents the
 * LAST section of a certificate-eligible course (see courseCompletion.js).
 * Once that section (and therefore the whole course) is complete, this bar
 * surfaces a "claim your certificate" trigger to /certificate/:courseId.
 *
 * Mark as complete stays locked until every in-guide quiz for this section
 * is finished at ≥80% (see sectionQuizGates.js).
 */
function SectionCompleteBar({ sectionId, nextPath, nextLabel, courseId }) {
  const { user } = useAuth();
  const { progress, markSectionComplete } = useProgress();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const done = !!progress.completedSections[sectionId];
  const quizzesUnlocked = hasPassedSectionQuizzes(sectionId, progress.quizScores);
  const gate = getSectionQuizGateStatus(sectionId, progress.quizScores);
  const showCertificateCta =
    !!user &&
    !!courseId &&
    isCourseCertificateEligible(courseId) &&
    isCourseComplete(courseId, progress.completedSections);

  const handleMark = async () => {
    if (busy || done || !quizzesUnlocked) return;
    setBusy(true);
    setError("");
    try {
      await markSectionComplete(sectionId);
    } catch {
      setError("Could not sync to server. Marked complete on this device.");
    } finally {
      setBusy(false);
    }
  };

  if (!user) {
    return (
      <div className="scb-wrap scb-wrap--guest">
        <span>
          <Link to="/signup">Create a free account</Link> to track your progress.
        </span>
        {nextPath ? (
          <Link to={nextPath} className="scb-next">
            {nextLabel || "Continue to next section"}
            <span aria-hidden="true"> →</span>
          </Link>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={`scb-wrap${done ? " scb-wrap--done" : ""}${
        !done && gate.locked ? " scb-wrap--locked" : ""
      }`}
    >
      {done ? (
        <span className="scb-done-label">✓ Section complete</span>
      ) : (
        <div className="scb-mark-col">
          <button
            type="button"
            className="scb-mark-btn"
            onClick={handleMark}
            disabled={busy || gate.locked}
            title={
              gate.locked
                ? `Score ${SECTION_QUIZ_PASS_PERCENT}%+ on every quiz in this section to unlock`
                : undefined
            }
          >
            {busy
              ? "Saving…"
              : gate.locked
                ? "Mark as complete (locked)"
                : "Mark as complete"}
          </button>
          {gate.locked ? (
            <span className="scb-lock-hint">
              Complete every quiz in this section with {SECTION_QUIZ_PASS_PERCENT}%+ to unlock
              Mark as complete
              {gate.failed.length
                ? ` (retry: ${gate.failed.map((f) => `${f.pct}%`).join(", ")})`
                : ""}
              {gate.missing.length && !gate.failed.length
                ? " — finish unanswered quizzes above"
                : ""}
              .
            </span>
          ) : null}
        </div>
      )}
      {error ? <span className="scb-error">{error}</span> : null}
      {showCertificateCta ? (
        <Link to={`/certificate/${courseId}`} className="scb-cert-cta">
          🎓 Claim your certificate
        </Link>
      ) : null}
      {nextPath ? (
        <Link to={nextPath} className="scb-next">
          {nextLabel || "Continue to next section"}
          <span aria-hidden="true"> →</span>
        </Link>
      ) : null}
    </div>
  );
}

export default SectionCompleteBar;
