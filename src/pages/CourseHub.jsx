import { Link, Navigate, useParams } from "react-router-dom";
import { getCourseById } from "../data/courses";
import { useProgress } from "../context/ProgressContext";
import {
  isCourseCertificateEligible,
  isCourseComplete,
  getRemainingSections,
} from "../data/courseCompletion";

function CourseHub() {
  const { courseId } = useParams();
  const course = getCourseById(courseId);
  const { progress } = useProgress();

  if (!course) {
    return <Navigate to="/" replace />;
  }

  const quizPath = `/quiz/${courseId}`;
  const eligible = isCourseCertificateEligible(courseId);
  const complete = isCourseComplete(courseId, progress.completedSections);
  const remaining = getRemainingSections(courseId, progress.completedSections);

  return (
    <main className="home-page">
      <section className="home-hero" style={{ minHeight: "auto" }}>
        <div className="hero-copy">
          <p className="eyebrow">Course path</p>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div className="hero-actions">
            <Link className="secondary-action" to="/">
              ← All courses
            </Link>
            {course.modules[0] && (
              <Link className="primary-action" to={course.modules[0].path}>
                Start first module →
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="guide-section" aria-labelledby="modules-heading">
        <div className="section-kicker">Modules</div>
        <h2 id="modules-heading">Choose a module</h2>
        <div className="guide-grid">
          {course.modules.map((mod) => {
            // Certification Quiz is locked until every required study
            // section for this course is complete — everything else
            // (theory modules, tools/calculators) stays open as before.
            const isQuizModule = eligible && mod.path === quizPath;
            const locked = isQuizModule && !complete;

            if (locked) {
              return (
                <div
                  className={`guide-card guide-card--${course.color} guide-card--locked`}
                  key={mod.path}
                  role="group"
                  aria-disabled="true"
                >
                  <div className="guide-card-icon">🔒</div>
                  <span>Locked</span>
                  <h3>{mod.title}</h3>
                  <p>
                    Complete the {remaining.length} remaining section
                    {remaining.length === 1 ? "" : "s"} in this course to
                    unlock the certification quiz.
                  </p>
                </div>
              );
            }

            return (
              <Link
                className={`guide-card guide-card--${course.color}`}
                key={mod.path}
                to={mod.path}
              >
                <div className="guide-card-icon">{mod.icon}</div>
                <span>{mod.meta}</span>
                <h3>{mod.title}</h3>
                <p>{mod.description}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default CourseHub;
