import { Link, Navigate, useParams } from "react-router-dom";
import { getCourseById } from "../../data/courses";
import { useProgress } from "../../context/ProgressContext";
import {
  isCourseCertificateEligible,
  isCourseComplete,
  getRemainingSections,
} from "../../data/courseCompletion";

function CourseOverview({ course }) {
  if (!course || !course.overview) return null;
  const { overview } = course;
  const paragraphs = Array.isArray(overview.longDescription)
    ? overview.longDescription
    : [overview.longDescription];

  return (
    <section className="guide-section" aria-labelledby="overview-heading">
      <div className="section-kicker">Course Overview</div>
      <h2 id="overview-heading">In-Depth Curriculum &amp; Learning Roadmap</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}
      >
        {/* Main Comprehensive Overview Card */}
        <div
          className={`guide-card guide-card--${course.color} overview-main-card`}
          style={{
            minHeight: "auto",
            padding: "clamp(1.5rem, 3.5vw, 2.4rem)",
            cursor: "default",
          }}
        >
          <div className="guide-card-icon">{course.icon}</div>
          <span>Comprehensive Curriculum · Detailed Course Breakdown</span>
          <h3 style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.3rem)", margin: "0.75rem 0 1.25rem" }}>
            {course.title} — Complete Overview
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.1rem",
              color: "#38332b",
              lineHeight: 1.85,
              fontSize: "1.02rem",
              paddingBottom: "0.5rem",
            }}
          >
            {paragraphs.map((p, idx) => (
              <p key={idx} style={{ margin: 0, paddingBottom: 0, color: "#38332b" }}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Side-by-Side Topics & Prerequisites Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Key Topics Card */}
          <div
            className={`guide-card guide-card--${course.color} overview-sub-card`}
            style={{ minHeight: "auto", padding: "1.8rem", cursor: "default" }}
          >
            <div className="guide-card-icon" style={{ fontSize: "1.6rem" }}>✦</div>
            <span>Core Syllabus</span>
            <h3 style={{ fontSize: "1.45rem", margin: "0.5rem 0 1rem" }}>
              Key Topics &amp; Mastery Checklist
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {overview.highlights.map((h, i) => (
                <li
                  key={i}
                  style={{
                    padding: "0.45rem 0",
                    fontSize: "0.95rem",
                    color: "#38332b",
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.6rem",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "var(--teal)", fontSize: "0.75rem", flexShrink: 0 }}>
                    ✔
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Prerequisites & Verification Card */}
          <div
            className={`guide-card guide-card--${course.color} overview-sub-card`}
            style={{ minHeight: "auto", padding: "1.8rem", cursor: "default" }}
          >
            <div className="guide-card-icon" style={{ fontSize: "1.6rem" }}>🎓</div>
            <span>Requirements &amp; Credentials</span>
            <h3 style={{ fontSize: "1.45rem", margin: "0.5rem 0 1rem" }}>
              Prerequisites &amp; Certification
            </h3>
            <p style={{ fontSize: "0.98rem", color: "#38332b", lineHeight: 1.75, marginBottom: "1.2rem", paddingBottom: 0 }}>
              <strong>Recommended Background:</strong> {overview.prerequisites}
            </p>
            <p style={{ fontSize: "0.95rem", color: "#5a5347", lineHeight: 1.65, margin: 0, paddingBottom: 0 }}>
              <strong>Certificate of Completion:</strong> Complete all theory modules and pass the 30-question final quiz with 80%+ score to earn a verifiable digital certificate.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .overview-main-card::after,
        .overview-sub-card::after {
          display: none !important;
        }
        .overview-main-card:hover,
        .overview-sub-card:hover {
          transform: none !important;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06) !important;
        }
      `}</style>
    </section>
  );
}

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

      {/* ── Course Overview ── */}
      <CourseOverview course={course} />

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
                className={`guide-card guide-card--${course.color}${mod.start ? " guide-card--start" : ""}`}
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

