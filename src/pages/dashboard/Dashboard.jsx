import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";
import { formatCompletionDate } from "../../utils/progressUtils";
import "./Dashboard.css";

export const CURRICULUM = [
  // ── Calculus and Analytical Geometry ──────────────────────────────────
  {
    id: "limits",
    title: "Limits & Continuity",
    icon: "lim",
    color: "purple",
    subject: "Calculus and Analytical Geometry",
    courseId: "calculus-analytical-geometry",
    parts: [
      { id: "limits-1", label: "Part 1 — Limits & Path Tests", path: "/limits-continuity/1" },
      { id: "limits-2", label: "Part 2 — Continuity & Epsilon-Delta", path: "/limits-continuity/2" },
    ],
  },
  {
    id: "diff",
    title: "Differentiation",
    icon: "d/dx",
    color: "gold",
    subject: "Calculus and Analytical Geometry",
    courseId: "calculus-analytical-geometry",
    parts: [
      { id: "calc-diff-1", label: "Part 1 — Rules, Rates & Extrema", path: "/differentiation/1" },
      { id: "calc-diff-2", label: "Part 2 — MVT & L'Hôpital", path: "/differentiation/2" },
    ],
  },
  {
    id: "int",
    title: "Integration",
    icon: "∫",
    color: "gold",
    subject: "Calculus and Analytical Geometry",
    courseId: "calculus-analytical-geometry",
    parts: [
      { id: "calc-int-1", label: "Part 1 — FTC & Accumulation", path: "/integration/1" },
      { id: "calc-int-2", label: "Part 2 — Techniques & Improper Integrals", path: "/integration/2" },
    ],
  },
  {
    id: "sequences-series",
    title: "Sequences & Infinite Series",
    icon: "Σ",
    color: "gold",
    subject: "Calculus and Analytical Geometry",
    courseId: "calculus-analytical-geometry",
    parts: [
      { id: "calc-series-1", label: "Part 1 — Convergence Tests", path: "/sequences-series/1" },
      { id: "calc-series-2", label: "Part 2 — Power Series & Radius", path: "/sequences-series/2" },
    ],
  },
  {
    id: "conic-sections",
    title: "Conic Sections",
    icon: "◯",
    color: "gold",
    subject: "Calculus and Analytical Geometry",
    courseId: "calculus-analytical-geometry",
    parts: [
      { id: "calc-conics-1", label: "Part 1 — Parabolas & Ellipses", path: "/conic-sections/1" },
      { id: "calc-conics-2", label: "Part 2 — Hyperbolas & Analytic Geometry", path: "/conic-sections/2" },
    ],
  },
  {
    id: "taylor",
    title: "Taylor Series",
    icon: "Σ",
    color: "gold",
    subject: "Calculus and Analytical Geometry",
    courseId: "calculus-analytical-geometry",
    parts: [
      { id: "taylor-1", label: "Part 1 — Foundations & Maclaurin", path: "/taylor-series/1" },
      { id: "taylor-2", label: "Part 2 — Convergence & Error Bounds", path: "/taylor-series/2" },
    ],
  },

  // ── Multivariable Calculus ─────────────────────────────────────────────
  {
    id: "partial",
    title: "Partial Derivatives",
    icon: "∂",
    color: "teal",
    subject: "Multivariable Calculus",
    courseId: "multivariable-calculus",
    parts: [
      { id: "partial-1", label: "Part 1 — Functions, Limits & Tangent Planes", path: "/partial-derivatives/1" },
      { id: "partial-2", label: "Part 2 — Gradients, Chain Rule & Extrema", path: "/partial-derivatives/2" },
    ],
  },
  {
    id: "vector",
    title: "Vector Calculus",
    icon: "∇",
    color: "blue",
    subject: "Multivariable Calculus",
    courseId: "multivariable-calculus",
    parts: [
      { id: "vector-1", label: "Part 1 — Vector Fields & Line Integrals", path: "/vector-calculus/1" },
      { id: "vector-2", label: "Part 2 — Green's Theorem & Work Integrals", path: "/vector-calculus/2" },
    ],
  },
  {
    id: "integrals",
    title: "Multiple Integrals",
    icon: "∬",
    color: "teal",
    subject: "Multivariable Calculus",
    courseId: "multivariable-calculus",
    parts: [
      { id: "integrals-1", label: "Part 1 — Double Integrals & Fubini's Theorem", path: "/multiple-integrals/1" },
      { id: "integrals-2", label: "Part 2 — Triple Integrals & Cylindrical/Spherical", path: "/multiple-integrals/2" },
    ],
  },
  {
    id: "lagrange",
    title: "Lagrange Multipliers",
    icon: "λ",
    color: "purple",
    subject: "Multivariable Calculus",
    courseId: "multivariable-calculus",
    parts: [
      { id: "lagrange-1", label: "Part 1 — Geometric Alignment & Single Constraints", path: "/lagrange-multipliers/1" },
      { id: "lagrange-2", label: "Part 2 — Multi-Constraints & Global Optima", path: "/lagrange-multipliers/2" },
    ],
  },
  {
    id: "divergence",
    title: "Divergence & Curl",
    icon: "∇·",
    color: "blue",
    subject: "Multivariable Calculus",
    courseId: "multivariable-calculus",
    parts: [
      { id: "divergence-1", label: "Part 1 — Divergence & Curl Operators", path: "/divergence-curl/1" },
      { id: "divergence-2", label: "Part 2 — Gauss Divergence Theorem", path: "/divergence-curl/2" },
    ],
  },
  {
    id: "stokes",
    title: "Stokes' Theorem",
    icon: "∮",
    color: "teal",
    subject: "Multivariable Calculus",
    courseId: "multivariable-calculus",
    parts: [
      { id: "stokes-1", label: "Part 1 — Boundary Curves & Circulation", path: "/stokes-theorem/1" },
      { id: "stokes-2", label: "Part 2 — Surface Integrals & Stokes Applications", path: "/stokes-theorem/2" },
    ],
  },

  // ── Linear Algebra ──────────────────────────────────────────────────────
  {
    id: "linear-equations",
    title: "Linear Equations",
    icon: "=",
    color: "blue",
    subject: "Linear Algebra",
    courseId: "linear-algebra",
    parts: [
      { id: "la-linear-equations-1", label: "Part 1 — Equations & Intercepts", path: "/linear-algebra/linear-equations/1" },
      { id: "la-linear-equations-2", label: "Part 2 — Systems & Geometry", path: "/linear-algebra/linear-equations/2" },
    ],
  },
  {
    id: "vectors",
    title: "Vectors & Vector Spaces",
    icon: "v",
    color: "blue",
    subject: "Linear Algebra",
    courseId: "linear-algebra",
    parts: [
      { id: "la-vectors-1", label: "Part 1 — Vectors, Dot Product & Norms", path: "/linear-algebra/vectors/1" },
      { id: "la-vectors-2", label: "Part 2 — Span, Basis & Independence", path: "/linear-algebra/vectors/2" },
    ],
  },
  {
    id: "matrices",
    title: "Matrices & Determinants",
    icon: "M",
    color: "blue",
    subject: "Linear Algebra",
    courseId: "linear-algebra",
    parts: [
      { id: "la-matrices-1", label: "Part 1 — Matrix Arithmetic & Multiplication", path: "/linear-algebra/matrices/1" },
      { id: "la-matrices-2", label: "Part 2 — Inverses & Determinants", path: "/linear-algebra/matrices/2" },
    ],
  },
  {
    id: "systems",
    title: "Systems of Linear Equations",
    icon: "Σ",
    color: "blue",
    subject: "Linear Algebra",
    courseId: "linear-algebra",
    parts: [
      { id: "la-systems-1", label: "Part 1 — Gaussian Row Reduction", path: "/linear-algebra/systems/1" },
      { id: "la-systems-2", label: "Part 2 — Rank & Consistency", path: "/linear-algebra/systems/2" },
    ],
  },
  {
    id: "eigen",
    title: "Eigenvalues & Eigenvectors",
    icon: "λ",
    color: "blue",
    subject: "Linear Algebra",
    courseId: "linear-algebra",
    parts: [
      { id: "la-eigen-1", label: "Part 1 — Characteristic Polynomials", path: "/linear-algebra/eigen/1" },
      { id: "la-eigen-2", label: "Part 2 — Eigenspaces & Diagonalization", path: "/linear-algebra/eigen/2" },
    ],
  },
  {
    id: "transformations",
    title: "Linear Transformations",
    icon: "T",
    color: "blue",
    subject: "Linear Algebra",
    courseId: "linear-algebra",
    parts: [
      { id: "la-transform-1", label: "Part 1 — Standard Matrices, Kernel & Image", path: "/linear-algebra/transformations/1" },
      { id: "la-transform-2", label: "Part 2 — Composition & Invertibility", path: "/linear-algebra/transformations/2" },
    ],
  },
  {
    id: "orthogonality",
    title: "Orthogonality & Least Squares",
    icon: "⊥",
    color: "blue",
    subject: "Linear Algebra",
    courseId: "linear-algebra",
    parts: [
      { id: "la-ortho-1", label: "Part 1 — Orthogonal Subspaces & Gram–Schmidt", path: "/linear-algebra/orthogonality/1" },
      { id: "la-ortho-2", label: "Part 2 — QR Factorization & Least Squares", path: "/linear-algebra/orthogonality/2" },
    ],
  },
  {
    id: "svd",
    title: "Singular Value Decomposition",
    icon: "Σ",
    color: "blue",
    subject: "Linear Algebra",
    courseId: "linear-algebra",
    parts: [
      { id: "la-svd-1", label: "Part 1 — SVD Geometry & Singular Values", path: "/linear-algebra/svd/1" },
      { id: "la-svd-2", label: "Part 2 — Low-Rank Approximation & Pseudoinverse", path: "/linear-algebra/svd/2" },
    ],
  },

  // ── Probability & Statistics ───────────────────────────────────────────
  {
    id: "prob",
    title: "Probability Basics",
    icon: "P",
    color: "purple",
    subject: "Probability and Statistics",
    courseId: "probability-statistics",
    parts: [
      { id: "ps-basics-1", label: "Part 1 — Sample Spaces & Axioms", path: "/probability-statistics/probability-basics/1" },
      { id: "ps-basics-2", label: "Part 2 — Conditionals & Bayes' Rule", path: "/probability-statistics/probability-basics/2" },
    ],
  },
  {
    id: "rv",
    title: "Random Variables & Distributions",
    icon: "X",
    color: "purple",
    subject: "Probability and Statistics",
    courseId: "probability-statistics",
    parts: [
      { id: "ps-rv-1", label: "Part 1 — Discrete RVs & Named PMFs", path: "/probability-statistics/random-variables/1" },
      { id: "ps-rv-2", label: "Part 2 — Continuous RVs & Normal Density", path: "/probability-statistics/random-variables/2" },
    ],
  },
  {
    id: "desc",
    title: "Descriptive Statistics",
    icon: "μ",
    color: "purple",
    subject: "Probability and Statistics",
    courseId: "probability-statistics",
    parts: [
      { id: "ps-desc-1", label: "Part 1 — Mean, Median & Spread", path: "/probability-statistics/descriptive-statistics/1" },
      { id: "ps-desc-2", label: "Part 2 — Z-Scores & Data Visualization", path: "/probability-statistics/descriptive-statistics/2" },
    ],
  },
  {
    id: "hyp",
    title: "Hypothesis Testing",
    icon: "H",
    color: "purple",
    subject: "Probability and Statistics",
    courseId: "probability-statistics",
    parts: [
      { id: "ps-hyp-1", label: "Part 1 — Null Hypotheses, Z-tests & P-Values", path: "/probability-statistics/hypothesis-testing/1" },
      { id: "ps-hyp-2", label: "Part 2 — Type I/II Errors & Statistical Power", path: "/probability-statistics/hypothesis-testing/2" },
    ],
  },
  {
    id: "reg",
    title: "Regression & Correlation",
    icon: "ρ",
    color: "purple",
    subject: "Probability and Statistics",
    courseId: "probability-statistics",
    parts: [
      { id: "ps-reg-1", label: "Part 1 — Linear Association & Pearson r", path: "/probability-statistics/regression-correlation/1" },
      { id: "ps-reg-2", label: "Part 2 — OLS Least Squares & Residuals", path: "/probability-statistics/regression-correlation/2" },
    ],
  },
];

function groupCurriculumBySubject(curriculum) {
  const order = [];
  const bySubject = new Map();
  curriculum.forEach((topic) => {
    const subject = topic.subject || "Other";
    if (!bySubject.has(subject)) {
      bySubject.set(subject, []);
      order.push(subject);
    }
    bySubject.get(subject).push(topic);
  });
  return order.map((subject) => ({ subject, topics: bySubject.get(subject) }));
}

const TOOLS = [
  { label: "Continuity Finder", path: "/test", icon: "≈" },
  { label: "Extreme Value Finder", path: "/extreme", icon: "⬆" },
  { label: "Volume Calculator", path: "/volumecalculator", icon: "∬" },
  { label: "AI Calculus Solver", path: "/ai-solver", icon: "🤖" },
  { label: "Vector Field Visualizer", path: "/vectorfield", icon: "∇" },
  { label: "Matrix Sandbox", path: "/linear-algebra/matrix-sandbox", icon: "▦" },
  { label: "Practice Section", path: "/practice", icon: "✎" },
  { label: "Leaderboard", path: "/leaderboard", icon: "🏆" },
  { label: "My Certificates", path: "/my-certificates", icon: "🎓" },
];

function ProgressBar({ value, max }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="db-progress-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="db-progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}



// ── Study Streak Component ──
function StudyStreak({ streak }) {
  return (
    <div className="db-streak-card">
      <span className="db-streak-fire">🔥</span>
      <div className="db-streak-info">
        <span className="db-streak-num">{streak}</span>
        <span className="db-streak-label">day streak</span>
      </div>
      <p className="db-streak-msg">
        {streak === 0
          ? "Start studying today to begin your streak!"
          : streak === 1
          ? "Great start! Come back tomorrow to continue."
          : `Amazing! You've studied ${streak} days in a row!`}
      </p>
    </div>
  );
}

// ── Progress Chart Component ──
function ProgressChart({ curriculum, progress }) {
  const totalParts = curriculum.reduce((sum, c) => sum + c.parts.length, 0);
  const completedParts = curriculum.reduce(
    (sum, c) => sum + c.parts.filter((p) => progress.completedSections[p.id]).length,
    0
  );
  const inProgressParts = curriculum.reduce((sum, c) => {
    const done = c.parts.filter((p) => progress.completedSections[p.id]).length;
    return sum + (done > 0 && done < c.parts.length ? 1 : 0);
  }, 0);
  const notStarted = totalParts - completedParts;

  const groups = groupCurriculumBySubject(curriculum);

  return (
    <div className="db-chart-wrapper">
      <h3 className="db-chart-title">Curriculum Progress Breakdown</h3>
      <div className="db-chart-bars">
        {groups.map(({ subject, topics }) => (
          <div key={subject} className="db-chart-subject-group">
            <div className="db-chart-subject-heading">{subject}</div>
            {topics.map((course) => {
              const done = course.parts.filter((p) => progress.completedSections[p.id]).length;
              const pct = (done / course.parts.length) * 100;
              return (
                <div key={course.id} className="db-chart-row">
                  <span className="db-chart-label" title={course.title}>
                    {course.title}
                  </span>
                  <div className="db-chart-bar-bg">
                    <div
                      className={`db-chart-bar-fill db-chart-bar--${pct === 100 ? "teal" : course.color}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="db-chart-pct">{Math.round(pct)}%</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="db-chart-legend">
        <span className="db-legend-item">
          <span className="db-legend-dot db-legend-dot--done" />
          {completedParts} completed
        </span>
        <span className="db-legend-item">
          <span className="db-legend-dot db-legend-dot--progress" />
          {inProgressParts} in progress
        </span>
        <span className="db-legend-item">
          <span className="db-legend-dot db-legend-dot--none" />
          {notStarted} not started
        </span>
      </div>
    </div>
  );
}

// ── Bookmark Search Component ──
function BookmarksSection({ bookmarks, removeBookmark }) {
  const [search, setSearch] = useState("");

  const filtered = bookmarks.filter((bm) =>
    bm.title.toLowerCase().includes(search.toLowerCase())
  );

  if (bookmarks.length === 0) return null;

  return (
    <section className="db-section">
      <h2 className="db-section-title">Bookmarks</h2>
      <div className="db-bookmark-search-wrapper">
        <input
          className="db-bookmark-search"
          type="text"
          placeholder="Search bookmarks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="db-bookmark-count">
          {filtered.length} / {bookmarks.length}
        </span>
      </div>
      {filtered.length === 0 ? (
        <p className="db-bookmark-empty">No bookmarks match your search.</p>
      ) : (
        <div className="db-bookmarks">
          {filtered.map((bm) => (
            <div key={bm.id} className="db-bookmark">
              <Link to={bm.path} className="db-bookmark-link">
                <span className="db-bookmark-icon">📖</span>
                <span>{bm.title}</span>
              </Link>
              <button
                className="db-bookmark-remove"
                onClick={() => removeBookmark(bm.id)}
                aria-label={`Remove bookmark: ${bm.title}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ── Main Dashboard ──
function Dashboard() {
  const { user, logout } = useAuth();
  const { progress, stats, removeBookmark, recordVisit, streak } = useProgress();
  const navigate = useNavigate();

  const overdueReviewTopics = useMemo(() => {
    return CURRICULUM.flatMap((course) =>
      course.parts
        .map((part) => ({
          ...part,
          courseTitle: course.title,
          courseColor: course.color,
          completedAt: progress.completedSectionTimestamps?.[part.id],
          metadata: progress.completedSectionMetadata?.[part.id] || {
            needs_review: false,
            days_since_completion: 0,
          },
        }))
        .filter((part) => part.metadata.needs_review)
    ).sort((a, b) => {
      const aTime = Number(a.completedAt) || 0;
      const bTime = Number(b.completedAt) || 0;
      return aTime - bTime;
    });
  }, [progress.completedSectionMetadata, progress.completedSectionTimestamps]);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    recordVisit("dashboard");
  }, [recordVisit]);

  if (!user) return null;

  const totalCurriculumParts = CURRICULUM.reduce((acc, c) => acc + c.parts.length, 0);
  const totalCompletedParts = CURRICULUM.reduce(
    (sum, c) => sum + c.parts.filter((p) => progress.completedSections[p.id]).length,
    0
  );

  const overallPct = totalCurriculumParts > 0
    ? Math.round((totalCompletedParts / totalCurriculumParts) * 100)
    : 0;

  return (
    <main className="dashboard">
      {/* Top bar */}
      <div className="db-topbar">
        <div className="db-welcome">
          <span className="db-avatar">{user.username[0].toUpperCase()}</span>
          <div>
            <div className="db-username">{user.username}</div>
            <div className="db-tagline">Welcome to your learning dashboard. Keep up the momentum!</div>
          </div>
        </div>
        <button className="db-logout" onClick={logout}>
          Sign out
        </button>
      </div>

      {/* Stats row */}
      <div className="db-stats-row">
        <div className="db-stat">
          <span className="db-stat-num">{totalCompletedParts}</span>
          <span className="db-stat-label">Sections completed</span>
        </div>
        <div className="db-stat">
          <span className="db-stat-num">{stats.quizzesTaken}</span>
          <span className="db-stat-label">Quizzes taken</span>
        </div>
        <div className="db-stat">
          <span className="db-stat-num">{stats.bookmarkCount}</span>
          <span className="db-stat-label">Bookmarks</span>
        </div>
        <div className="db-stat">
          <span className="db-stat-num">{stats.solverUses}</span>
          <span className="db-stat-label">AI solver uses</span>
        </div>
      </div>

      {/* Streak + Chart row */}
      <div className="db-streak-chart-row">
        <StudyStreak streak={streak} />
        <ProgressChart curriculum={CURRICULUM} progress={progress} />
      </div>

      {/* Overall progress */}
      <section className="db-section">
        <h2 className="db-section-title">Overall Curriculum Progress</h2>
        <div className="db-overall">
          <div className="db-overall-label">
            <span>
              {totalCompletedParts} / {totalCurriculumParts} theory sections completed
            </span>
            <span className="db-overall-pct">{overallPct}%</span>
          </div>
          <ProgressBar value={totalCompletedParts} max={totalCurriculumParts} />
        </div>
      </section>

      {/* Review reminders */}
      <section className="db-section">
        <h2 className="db-section-title">Spaced Repetition &amp; Review Reminders</h2>
        {overdueReviewTopics.length === 0 ? (
          <div className="db-review-empty" role="status">
            <div className="db-review-empty-icon">✨</div>
            <h3>Everything looks fresh</h3>
            <p>All of your completed topics have been reviewed recently. Keep up the momentum.</p>
          </div>
        ) : (
          <div className="db-review-list">
            {overdueReviewTopics.map((part) => (
              <article key={part.id} className="db-review-card">
                <div className="db-review-content">
                  <div className="db-review-title">{part.courseTitle}</div>
                  <div className="db-review-label">{part.label}</div>
                  <div className="db-review-meta-row">
                    <span>{formatCompletionDate(part.completedAt)}</span>
                    <span>{part.metadata.days_since_completion} days since completion</span>
                  </div>
                  <p className="db-review-copy">
                    Consider reviewing this topic before progressing further.
                  </p>
                </div>
                <Link to={part.path} className="db-review-button">
                  Review Topic
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Interactive Tools */}
      <section className="db-section">
        <h2 className="db-section-title">Interactive Math Tools &amp; Solvers</h2>
        <div className="db-tools">
          {TOOLS.map((t) => (
            <Link key={t.path} to={t.path} className="db-tool-card">
              <span className="db-tool-icon">{t.icon}</span>
              <span>{t.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Bookmarks with search */}
      <BookmarksSection bookmarks={progress.bookmarks} removeBookmark={removeBookmark} />

      {/* Saved Examples */}
      <section className="db-section">
        <h2 className="db-section-title">Saved Examples &amp; Notes</h2>
        <p style={{ color: "var(--muted)", marginBottom: "0.75rem", fontSize: "0.9rem" }}>
          Jump back to worked examples and notes you starred in study guides.
        </p>
        <Link to="/saved" className="db-tool-card" style={{ display: "inline-flex", maxWidth: "16rem" }}>
          <span className="db-tool-icon">☆</span>
          <span>Open starred examples</span>
        </Link>
      </section>
    </main>
  );
}

export default Dashboard;
