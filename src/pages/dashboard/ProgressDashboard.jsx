// src/pages/ProgressDashboard.jsx
import { useProgress } from "../../hooks/useProgress";

// ── Small reusable components ─────────────────────────────────
const StatCard = ({ label, value, sub, color = "#667eea" }) => (
  <div style={{ background: "var(--cv-bg-surface)", borderRadius: "12px", padding: "20px", boxShadow: "var(--cv-shadow-md)", borderTop: `4px solid ${color}` }}>
    <div style={{ fontSize: "13px", color: "var(--cv-text-secondary)", fontWeight: 600, marginBottom: "6px", textTransform: "uppercase" }}>{label}</div>
    <div style={{ fontSize: "2em", fontWeight: 900, color }}>{value}</div>
    {sub && <div style={{ fontSize: "12px", color: "var(--cv-text-muted)", marginTop: "4px" }}>{sub}</div>}
  </div>
);

const ProgressBar = ({ percent, color = "#667eea", height = 10 }) => (
  <div style={{ background: "var(--cv-bg-sunken)", borderRadius: "99px", height, overflow: "hidden" }}>
    <div style={{ width: `${Math.min(percent, 100)}%`, height: "100%", background: color, borderRadius: "99px", transition: "width 0.6s ease" }} />
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 style={{ fontSize: "1.1em", fontWeight: 800, color: "var(--cv-text-primary)", margin: "32px 0 16px", borderBottom: "2px solid var(--cv-border)", paddingBottom: "8px" }}>
    {children}
  </h2>
);

// ── Topic color map ───────────────────────────────────────────
const TOPIC_COLORS = {
  "partial-derivatives":  "#667eea",
  "vector-calculus":      "#f093fb",
  "limits-continuity":    "#4facfe",
  "multiple-integrals":   "#43e97b",
  "taylor-series":        "#fa709a",
  "lagrange-multipliers": "#f6d365",
  "stokes-theorem":       "#a18cd1",
  "divergence-curl":      "#fda085",
};

// ── Main page ─────────────────────────────────────────────────
export default function ProgressDashboard() {
  const { progress, loading, error, refetch } = useProgress();

  if (loading) return (
    <div style={{ textAlign: "center", padding: "80px", color: "var(--cv-text-muted)" }}>
      <div style={{ fontSize: "48px", marginBottom: "12px" }}>⏳</div>
      <p>Loading your progress...</p>
    </div>
  );

  if (error) return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <div style={{ fontSize: "48px", marginBottom: "12px" }}>❌</div>
      <p style={{ color: "var(--cv-error)", marginBottom: "16px" }}>{error}</p>
      <button onClick={refetch} className="cv-btn cv-btn--operator" style={{ padding: "10px 24px", borderRadius: "8px" }}>
        Try Again
      </button>
    </div>
  );

  const { user, overall, quizStats, topicStats, studyGuides, practice, courseProgress, lastActivity } = progress;

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 16px" }}>

      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "2em", fontWeight: 900, color: "var(--cv-text-primary)", margin: "0 0 4px" }}>
            📊 Progress Dashboard
          </h1>
          <p style={{ color: "var(--cv-text-secondary)", margin: 0 }}>
            Welcome back, <strong>{user.name}</strong> · {user.email}
          </p>
          {lastActivity && (
            <p style={{ color: "var(--cv-text-muted)", fontSize: "12px", margin: "4px 0 0" }}>
              Last active: {new Date(lastActivity).toLocaleString()}
            </p>
          )}
        </div>
        <button onClick={refetch} className="cv-btn cv-btn--function" style={{ padding: "9px 18px", borderRadius: "8px", fontSize: "13px" }}>
          🔄 Refresh
        </button>
      </div>

      {/* ── Overall progress bar ── */}
      <div style={{ background: "var(--cv-bg-surface)", borderRadius: "16px", padding: "24px", marginBottom: "24px", boxShadow: "var(--cv-shadow-md)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ fontWeight: 700, color: "var(--cv-text-primary)" }}>Overall Learning Progress</span>
          <span style={{ fontWeight: 900, fontSize: "1.3em", color: "#667eea" }}>{overall.progressPercent}%</span>
        </div>
        <ProgressBar percent={overall.progressPercent} color="#667eea" height={14} />
        <div style={{ fontSize: "12px", color: "var(--cv-text-muted)", marginTop: "8px" }}>
          {topicStats.completed} of {topicStats.total} topics completed · {topicStats.remaining} remaining
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginBottom: "8px" }}>
        <StatCard label="Total Score"       value={overall.totalScore}          color="#667eea" />
        <StatCard label="Avg Quiz Score"    value={`${overall.avgScore}%`}      color="#43e97b" />
        <StatCard label="Quizzes Done"      value={`${quizStats.completed}/${quizStats.total}`} color="#4facfe" />
        <StatCard label="Topics Completed"  value={`${topicStats.completed}/${topicStats.total}`} color="#f093fb" />
        <StatCard label="Practice Accuracy" value={`${practice.accuracy}%`}     color="#fa709a" sub={`${practice.totalCorrect}/${practice.totalAttempts} correct`} />
        <StatCard label="Guide Parts Done"  value={`${studyGuides.completedParts}/${studyGuides.totalParts}`} color="#fda085" />
      </div>

      {/* ── Quiz stats ── */}
      <SectionTitle>📝 Quiz Statistics</SectionTitle>
      <div style={{ background: "var(--cv-bg-surface)", borderRadius: "12px", padding: "20px", boxShadow: "var(--cv-shadow-md)" }}>
        {quizStats.scores.length === 0 ? (
          <p style={{ color: "var(--cv-text-muted)", textAlign: "center" }}>No quizzes completed yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {quizStats.scores.map((q, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "var(--cv-bg-sunken)", borderRadius: "8px" }}>
                <span style={{ fontWeight: 600, color: "var(--cv-text-primary)", fontSize: "14px" }}>{q.topic}</span>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, color: "#667eea" }}>{q.score}%</span>
                  <span style={{ fontSize: "11px", color: "var(--cv-text-muted)" }}>{new Date(q.completed_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Course-wise progress ── */}
      <SectionTitle>📚 Course-wise Progress</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {courseProgress.map((course) => {
          const color     = TOPIC_COLORS[course.topic] || "#667eea";
          const guidePercent = Math.round((course.guideParts / course.totalGuideParts) * 100);
          return (
            <div key={course.topic} style={{ background: "var(--cv-bg-surface)", borderRadius: "12px", padding: "16px 20px", boxShadow: "var(--cv-shadow-sm)", borderLeft: `5px solid ${color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <span style={{ fontWeight: 700, color: "var(--cv-text-primary)", fontSize: "14px", textTransform: "capitalize" }}>
                  {course.topic.replace(/-/g, " ")}
                </span>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  {course.topicCompleted && <span style={{ fontSize: "11px", background: "#43e97b22", color: "#43e97b", padding: "2px 8px", borderRadius: "20px", fontWeight: 700 }}>✅ Done</span>}
                  {course.quizScore !== null && <span style={{ fontSize: "12px", color, fontWeight: 700 }}>Quiz: {course.quizScore}%</span>}
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ fontSize: "11px", color: "var(--cv-text-muted)", minWidth: "80px" }}>
                  Guide {course.guideParts}/{course.totalGuideParts}
                </span>
                <div style={{ flex: 1 }}>
                  <ProgressBar percent={guidePercent} color={color} height={7} />
                </div>
                <span style={{ fontSize: "11px", color, fontWeight: 700, minWidth: "35px" }}>{guidePercent}%</span>
              </div>
              {course.practiceAttempts > 0 && (
                <div style={{ fontSize: "11px", color: "var(--cv-text-muted)", marginTop: "6px" }}>
                  Practice: {course.practiceCorrect}/{course.practiceAttempts} correct
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Study guide completion ── */}
      <SectionTitle>📖 Study Guide Completion</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "12px" }}>
        {studyGuides.byTopic.map((guide) => {
          const color   = TOPIC_COLORS[guide.topic] || "#667eea";
          const percent = Math.round((guide.completedParts / guide.totalParts) * 100);
          return (
            <div key={guide.topic} style={{ background: "var(--cv-bg-surface)", borderRadius: "10px", padding: "14px 16px", boxShadow: "var(--cv-shadow-sm)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontWeight: 600, fontSize: "13px", color: "var(--cv-text-primary)", textTransform: "capitalize" }}>
                  {guide.topic.replace(/-/g, " ")}
                </span>
                <span style={{ fontSize: "12px", fontWeight: 700, color }}>{percent}%</span>
              </div>
              <ProgressBar percent={percent} color={color} height={6} />
              <div style={{ fontSize: "11px", color: "var(--cv-text-muted)", marginTop: "6px" }}>
                {guide.completedParts} of {guide.totalParts} parts completed
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Practice progress ── */}
      <SectionTitle>🏋️ Practice Progress</SectionTitle>
      <div style={{ background: "var(--cv-bg-surface)", borderRadius: "12px", padding: "20px", boxShadow: "var(--cv-shadow-md)" }}>
        {practice.byTopic.length === 0 ? (
          <p style={{ color: "var(--cv-text-muted)", textAlign: "center" }}>No practice attempts yet.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
            {practice.byTopic.map((p, i) => {
              const accuracy = p.attempts > 0 ? Math.round((p.correct / p.attempts) * 100) : 0;
              const color    = TOPIC_COLORS[p.topic] || "#667eea";
              return (
                <div key={i} style={{ padding: "12px", background: "var(--cv-bg-sunken)", borderRadius: "8px", borderTop: `3px solid ${color}` }}>
                  <div style={{ fontWeight: 600, fontSize: "13px", color: "var(--cv-text-primary)", marginBottom: "6px", textTransform: "capitalize" }}>
                    {p.topic?.replace(/-/g, " ")}
                  </div>
                  <ProgressBar percent={accuracy} color={color} height={6} />
                  <div style={{ fontSize: "11px", color: "var(--cv-text-muted)", marginTop: "4px" }}>
                    {p.correct}/{p.attempts} · {accuracy}% accuracy
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
