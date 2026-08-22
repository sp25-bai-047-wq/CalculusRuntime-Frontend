import { Link } from "react-router-dom";
import { getCourseById } from "../../data/courses";
import "./LinearAlgebraOverview.css";

const CORE_CERT_PATHS = new Set([
  "/linear-algebra/vectors/1",
  "/linear-algebra/matrices/1",
  "/linear-algebra/systems/1",
  "/linear-algebra/eigen/1",
]);

const EXCLUDED_FROM_ROADMAP = new Set([
  "/linear-algebra/overview",
  "/practice",
  "/quiz/linear-algebra",
]);

function LinearAlgebraOverview() {
  const course = getCourseById("linear-algebra");
  const roadmap = (course?.modules || []).filter((m) => !EXCLUDED_FROM_ROADMAP.has(m.path));
  const firstTopicPath = roadmap[0]?.path || "/linear-algebra/linear-equations/1";

  return (
    <main className="home-page la-overview">
      <section className="home-hero" style={{ minHeight: "auto" }}>
        <div className="hero-copy">
          <p className="eyebrow">Start here · Course overview</p>
          <h1>Linear Algebra, from first principles</h1>
          <p>
            Linear algebra is the mathematics of lines, planes, and the flat spaces they live in — and
            it quietly powers everything from computer graphics and machine learning to the calculus
            you may already know. This page is your map: what you'll learn, in what order, and how the
            course is put together, before you dive into the first module.
          </p>
          <div className="hero-actions">
            <Link className="secondary-action" to="/courses/linear-algebra">
              ← All modules
            </Link>
            <Link className="primary-action" to={firstTopicPath}>
              Begin with {roadmap[0]?.title || "Linear Equations"} →
            </Link>
          </div>
        </div>
      </section>

      <section className="guide-section" aria-labelledby="why-heading">
        <div className="section-kicker">Why it matters</div>
        <h2 id="why-heading">What linear algebra actually gives you</h2>
        <p className="la-overview-lead">
          Every topic in this course is one idea, applied over and over: keep everything straight —
          lines, planes, transformations — and track it with coordinates instead of pictures once the
          picture gets too big to draw. That single trick is what lets a computer represent a 3D scene,
          a search engine rank web pages, or a neural network process an image.
        </p>
        <ul className="la-overview-bullets">
          <li>Solve systems of equations that show up in engineering, economics, and physics.</li>
          <li>Represent rotations, scaling, and 3D graphics as matrices you can multiply.</li>
          <li>Understand the linear algebra underneath machine learning, statistics, and data science.</li>
        </ul>
      </section>

      <section className="guide-section" aria-labelledby="roadmap-heading">
        <div className="section-kicker">Roadmap</div>
        <h2 id="roadmap-heading">What you'll learn, in order</h2>
        <ol className="la-roadmap">
          {roadmap.map((mod, i) => {
            const isCore = CORE_CERT_PATHS.has(mod.path);
            return (
              <li key={mod.path}>
                <Link to={mod.path} className="la-roadmap-row">
                  <span className="la-roadmap-num">{i + 1}</span>
                  <span className="la-roadmap-copy">
                    <span className="la-roadmap-title">
                      {mod.title}
                      <span className={`la-roadmap-tag${isCore ? " la-roadmap-tag--core" : ""}`}>
                        {isCore ? "Core · certificate" : "Extra depth"}
                      </span>
                    </span>
                    <small>{mod.description}</small>
                  </span>
                  <span className="la-roadmap-arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="guide-section" aria-labelledby="structure-heading">
        <div className="section-kicker">How this course works</div>
        <h2 id="structure-heading">Structure &amp; certificate</h2>
        <p className="la-overview-lead">
          Every topic module has the same shape: two parts of theory and worked examples, with a short
          MCQ quiz after each major section. Score 80%+ on a section's quizzes to unlock "Mark as
          complete" — your progress and quiz scores are saved to your account automatically.
        </p>
        <p className="la-overview-lead">
          <strong>Vectors &amp; Vector Spaces</strong>, <strong>Matrices &amp; Determinants</strong>,{" "}
          <strong>Systems of Linear Equations</strong>, and <strong>Eigenvalues &amp; Eigenvectors</strong>{" "}
          form the core certificate track — complete all eight of their parts to unlock the 30-question
          certification quiz. <strong>Linear Equations</strong>, <strong>Linear Transformations</strong>,{" "}
          <strong>Orthogonality &amp; Least Squares</strong>, and <strong>Singular Value Decomposition</strong>{" "}
          are additional depth you can study any time, in any order.
        </p>
      </section>

      <section className="guide-section" aria-labelledby="prereq-heading">
        <div className="section-kicker">Before you start</div>
        <h2 id="prereq-heading">Prerequisites</h2>
        <p className="la-overview-lead">
          Comfort with basic algebra is all you need — solving an equation for a variable, and plotting
          a point on the x–y plane. No calculus is required to begin; the first module, Linear
          Equations, starts from that exact algebra and builds up from there.
        </p>
      </section>
    </main>
  );
}

export default LinearAlgebraOverview;
