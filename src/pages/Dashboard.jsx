import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import { formatCompletionDate } from "../utils/progressUtils";
import "./Dashboard.css";

const CURRICULUM = [
  // ── Calculus and Analytical Geometry ──────────────────────────────────
  {
    id: "limits",
    title: "Limits & Continuity",
    icon: "lim",
    color: "purple",
    subject: "Calculus and Analytical Geometry",
    parts: [
      { id: "limits-1", label: "Part 1 — Limits of Multivariable Functions", path: "/limits-continuity/1" },
      { id: "limits-2", label: "Part 2 — Continuity", path: "/limits-continuity/2" },
    ],
  },
  {
    id: "diff",
    title: "Differentiation",
    icon: "d/dx",
    color: "gold",
    subject: "Calculus and Analytical Geometry",
    parts: [
      { id: "calc-diff-1", label: "Part 1 — Rules & Rates", path: "/differentiation/1" },
      { id: "calc-diff-2", label: "Part 2 — MVT & L'Hôpital", path: "/differentiation/2" },
    ],
  },
  {
    id: "int",
    title: "Integration",
    icon: "∫",
    color: "gold",
    subject: "Calculus and Analytical Geometry",
    parts: [
      { id: "calc-int-1", label: "Part 1 — FTC & Area", path: "/integration/1" },
      { id: "calc-int-2", label: "Part 2 — Techniques & Improper", path: "/integration/2" },
    ],
  },
  {
    id: "taylor",
    title: "Taylor Series",
    icon: "Σ",
    color: "gold",
    subject: "Calculus and Analytical Geometry",
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
    parts: [
      { id: "partial-1", label: "Part 1 — Functions, Limits & Continuity", path: "/partial-derivatives/1" },
      { id: "partial-2", label: "Part 2 — Derivatives, Chain Rule & Extrema", path: "/partial-derivatives/2" },
    ],
  },
  {
    id: "vector",
    title: "Vector Calculus",
    icon: "∇",
    color: "blue",
    subject: "Multivariable Calculus",
    parts: [
      { id: "vector-1", label: "Part 1 — Vector Functions & Line Integrals", path: "/vector-calculus/1" },
      { id: "vector-2", label: "Part 2 — Green's Theorem & Surfaces", path: "/vector-calculus/2" },
    ],
  },
  {
    id: "integrals",
    title: "Multiple Integrals",
    icon: "∬",
    color: "teal",
    subject: "Multivariable Calculus",
    parts: [
      { id: "integrals-1", label: "Part 1 — Double Integrals & Fubini's Theorem", path: "/multiple-integrals/1" },
      { id: "integrals-2", label: "Part 2 — Triple Integrals & Coordinates", path: "/multiple-integrals/2" },
    ],
  },
  {
    id: "lagrange",
    title: "Lagrange Multipliers",
    icon: "λ",
    color: "purple",
    subject: "Multivariable Calculus",
    parts: [
      { id: "lagrange-1", label: "Part 1 — Geometric Intuition & Alignment", path: "/lagrange-multipliers/1" },
      { id: "lagrange-2", label: "Part 2 — Applications & Multi-Constraints", path: "/lagrange-multipliers/2" },
    ],
  },
  {
    id: "divergence",
    title: "Divergence & Curl",
    icon: "∇·",
    color: "blue",
    subject: "Multivariable Calculus",
    parts: [
      { id: "divergence-1", label: "Part 1 — Operators & Vector Fields", path: "/divergence-curl/1" },
      { id: "divergence-2", label: "Part 2 — Identities & Theorems", path: "/divergence-curl/2" },
    ],
  },
  {
    id: "stokes",
    title: "Stokes' Theorem",
    icon: "∮",
    color: "teal",
    subject: "Multivariable Calculus",
    parts: [
      { id: "stokes-1", label: "Part 1 — Circulation & The Statement", path: "/stokes-theorem/1" },
      { id: "stokes-2", label: "Part 2 — Applications & Workflows", path: "/stokes-theorem/2" },
    ],
  },

  // ── Linear Algebra ──────────────────────────────────────────────────────
  {
    id: "vectors",
    title: "Vectors & Vector Spaces",
    icon: "v",
    color: "blue",
    subject: "Linear Algebra",
    parts: [
      { id: "la-vectors-1", label: "Part 1 — Fundamentals", path: "/linear-algebra/vectors/1" },
      { id: "la-vectors-2", label: "Part 2 — Basis & Span", path: "/linear-algebra/vectors/2" },
    ],
  },
  {
    id: "matrices",
    title: "Matrices & Determinants",
    icon: "M",
    color: "blue",
    subject: "Linear Algebra",
    parts: [
      { id: "la-matrices-1", label: "Part 1 — Operations", path: "/linear-algebra/matrices/1" },
      { id: "la-matrices-2", label: "Part 2 — Inverses & Determinants", path: "/linear-algebra/matrices/2" },
    ],
  },
  {
    id: "systems",
    title: "Systems of Linear Equations",
    icon: "Σ",
    color: "blue",
    subject: "Linear Algebra",
    parts: [
      { id: "la-systems-1", label: "Part 1 — Row Reduction", path: "/linear-algebra/systems/1" },
      { id: "la-systems-2", label: "Part 2 — Rank & Consistency", path: "/linear-algebra/systems/2" },
    ],
  },
  {
    id: "eigen",
    title: "Eigenvalues & Eigenvectors",
    icon: "λ",
    color: "blue",
    subject: "Linear Algebra",
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
    parts: [
      { id: "la-transform-1", label: "Part 1 — Definition & Properties", path: "/linear-algebra/transformations/1" },
      { id: "la-transform-2", label: "Part 2 — Matrix Representation & Applications", path: "/linear-algebra/transformations/2" },
    ],
  },
  {
    id: "orthogonality",
    title: "Orthogonality & Least Squares",
    icon: "⊥",
    color: "blue",
    parts: [
      { id: "la-ortho-1", label: "Part 1 — Orthogonality & Gram–Schmidt", path: "/linear-algebra/orthogonality/1" },
      { id: "la-ortho-2", label: "Part 2 — Projections & Least Squares", path: "/linear-algebra/orthogonality/2" },
    ],
  },
  {
    id: "svd",
    title: "Singular Value Decomposition",
    icon: "Σ",
    color: "blue",
    parts: [
      { id: "la-svd-1", label: "Part 1 — Definition & Geometry", path: "/linear-algebra/svd/1" },
      { id: "la-svd-2", label: "Part 2 — Applications & Low-rank Approximation", path: "/linear-algebra/svd/2" },
    ],
  },
  // ── Probability & Statistics ───────────────────────────────────────────
  {
    id: "prob",
    title: "Probability Basics",
    icon: "P",
    color: "purple",
    subject: "Probability & Statistics",
    parts: [
      { id: "ps-basics-1", label: "Part 1 — Axioms & Events", path: "/probability-statistics/probability-basics/1" },
      { id: "ps-basics-2", label: "Part 2 — Conditionals & Bayes", path: "/probability-statistics/probability-basics/2" },
    ],
  },
  {
    id: "rv",
    title: "Random Variables & Distributions",
    icon: "X",
    color: "purple",
    subject: "Probability & Statistics",
    parts: [
      { id: "ps-rv-1", label: "Part 1 — Discrete RVs", path: "/probability-statistics/random-variables/1" },
      { id: "ps-rv-2", label: "Part 2 — Continuous RVs", path: "/probability-statistics/random-variables/2" },
    ],
  },
  {
    id: "desc",
    title: "Descriptive Statistics",
    icon: "μ",
    color: "purple",
    subject: "Probability & Statistics",
    parts: [
      { id: "ps-desc-1", label: "Part 1 — Central Tendency & Spread", path: "/probability-statistics/descriptive-statistics/1" },
      { id: "ps-desc-2", label: "Part 2 — Z-Scores & Data Displays", path: "/probability-statistics/descriptive-statistics/2" },
    ],
  },
  {
    id: "hyp",
    title: "Hypothesis Testing",
    icon: "H",
    color: "purple",
    subject: "Probability & Statistics",
    parts: [
      { id: "ps-hyp-1", label: "Part 1 — Null Hypotheses & P-Values", path: "/probability-statistics/hypothesis-testing/1" },
      { id: "ps-hyp-2", label: "Part 2 — Errors & Power", path: "/probability-statistics/hypothesis-testing/2" },
    ],
  },
  {
    id: "reg",
    title: "Regression & Correlation",
    icon: "ρ",
    color: "purple",
    subject: "Probability & Statistics",
    parts: [
      { id: "ps-reg-1", label: "Part 1 — Linear Association", path: "/probability-statistics/regression-correlation/1" },
      { id: "ps-reg-2", label: "Part 2 — Least Squares & Residuals", path: "/probability-statistics/regression-correlation/2" },
    ],
  },
];

/** Groups the flat CURRICULUM list into {subject, topics} buckets, preserving
 * the order subjects/topics first appear in — so the Dashboard can render a
 * course heading followed by only that course's modules, instead of all
 * topics interleaved in one flat list. */
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
  { label: "Practice Section", path: "/practice", icon: "✎" },
  { label: "Leaderboard", path: "/leaderboard", icon: "🏆" },
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
  const completedParts = curriculum.reduce((sum, c) =>
    sum + c.parts.filter((p) => progress.completedSections[p.id]).length, 0);
  const inProgressParts = curriculum.reduce((sum, c) => {
    const done = c.parts.filter((p) => progress.completedSections[p.id]).length;
    return sum + (done > 0 && done < c.parts.length ? 1 : 0);
  }, 0);
  const notStarted = totalParts - completedParts;

  const groups = groupCurriculumBySubject(curriculum);

  return (
    <div className="db-chart-wrapper">
      <h3 className="db-chart-title">Progress Overview</h3>
      <div className="db-chart-bars">
        {groups.map(({ subject, topics }) => (
          <div key={subject} className="db-chart-subject-group">
            <div className="db-chart-subject-heading">{subject}</div>
            {topics.map((course) => {
              const done = course.parts.filter((p) => progress.completedSections[p.id]).length;
              const pct = (done / course.parts.length) * 100;
              return (
                <div key={course.id} className="db-chart-row">
                  <span className="db-chart-label">{course.title}</span>
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
        <span className="db-bookmark-count">{filtered.length} / {bookmarks.length}</span>
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

  // Study streak is now managed by ProgressContext and increments on activity, not just visits.

  if (!user) return null;

  const overallPct = stats.totalSections > 0
    ? Math.round((stats.completedCount / stats.totalSections) * 100)
    : 0;

  return (
    <main className="dashboard">
      {/* Top bar */}
      <div className="db-topbar">
        <div className="db-welcome">
          <span className="db-avatar">{user.username[0].toUpperCase()}</span>
          <div>
            <div className="db-username">{user.username}</div>
            <div className="db-tagline">Keep going — you're doing great.</div>
          </div>
        </div>
        <button className="db-logout" onClick={logout}>Sign out</button>
      </div>

      {/* Stats row */}
      <div className="db-stats-row">
        <div className="db-stat">
          <span className="db-stat-num">{stats.completedCount}</span>
          <span className="db-stat-label">Sections done</span>
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
        <h2 className="db-section-title">Overall progress</h2>
        <div className="db-overall">
          <div className="db-overall-label">
            <span>{stats.completedCount} / {stats.totalSections} sections</span>
            <span className="db-overall-pct">{overallPct}%</span>
          </div>
          <ProgressBar value={stats.completedCount} max={stats.totalSections} />
        </div>
      </section>

      {/* Review reminders */}
      <section className="db-section">
        <h2 className="db-section-title">Review Reminders</h2>
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

      {/* Curriculum */}
      <section className="db-section">
        <h2 className="db-section-title">Curriculum</h2>
        {groupCurriculumBySubject(CURRICULUM).map(({ subject, topics }) => (
          <div key={subject} className="db-curriculum-subject">
            <h3 className="db-curriculum-subject-title">{subject}</h3>
            <div className="db-curriculum">
              {topics.map((course) => {
                const done = course.parts.filter((p) => progress.completedSections[p.id]).length;
                return (
                  <div key={course.id} className={`db-course db-course--${course.color}`}>
                    <div className="db-course-head">
                      <span className="db-course-icon">{course.icon}</span>
                      <div>
                        <div className="db-course-title">{course.title}</div>
                        <div className="db-course-meta">{done} / {course.parts.length} parts complete</div>
                      </div>
                    </div>
                    <ProgressBar value={done} max={course.parts.length} />
                    <div className="db-parts">
                      {course.parts.map((part) => {
                        const complete = !!progress.completedSections[part.id];
                        return (
                          <Link key={part.id} to={part.path} className={`db-part${complete ? " db-part--done" : ""}`}>
                            <span className="db-part-check">{complete ? "✓" : "○"}</span>
                            <span>{part.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Tools */}
      <section className="db-section">
        <h2 className="db-section-title">Tools</h2>
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
      <BookmarksSection
        bookmarks={progress.bookmarks}
        removeBookmark={removeBookmark}
      />

      <section className="db-section">
        <h2 className="db-section-title">Saved examples</h2>
        <p style={{ color: "var(--muted)", marginBottom: "0.75rem" }}>
          Jump back to worked examples you starred in study guides.
        </p>
        <Link to="/saved" className="db-tool-card" style={{ display: "inline-flex", maxWidth: "16rem" }}>
          <span className="db-tool-icon">☆</span>
          <span>Open saved examples</span>
        </Link>
      </section>

      {/* Quiz scores */}
      {Object.keys(progress.quizScores).length > 0 && (
        <section className="db-section">
          <h2 className="db-section-title">Quiz scores</h2>
          <div className="db-quiz-scores">
            {Object.entries(progress.quizScores).map(([id, { score, total }]) => (
              <div key={id} className="db-quiz-row">
                <span className="db-quiz-id">{id.replace(/-/g, " ")}</span>
                <span className="db-quiz-score">{score} / {total}</span>
                <ProgressBar value={score} max={total} />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default Dashboard;
