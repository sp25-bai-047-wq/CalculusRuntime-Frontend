import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";
import "../dashboard/Leaderboard.css";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8002";

function quizAveragePercent(quizScores) {
  const entries = Object.values(quizScores || {});
  if (entries.length === 0) return 0;
  const sum = entries.reduce((acc, q) => {
    if (!q?.total) return acc;
    return acc + (q.score / q.total) * 100;
  }, 0);
  return Math.round(sum / entries.length);
}

function BarChart({ title, subtitle, rows, valueKey, maxValue, valueSuffix = "" }) {
  const ceiling = Math.max(maxValue || 1, ...rows.map((r) => Number(r[valueKey]) || 0), 1);

  if (!rows.length) {
    return (
      <section className="lb-board">
        <header className="lb-board__head">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </header>
        <p className="lb-board__empty">No scores yet. Finish a quiz and submit to appear here.</p>
      </section>
    );
  }

  return (
    <section className="lb-board">
      <header className="lb-board__head">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </header>
      <div className="lb-chart" role="img" aria-label={title}>
        {rows.map((row, index) => {
          const value = Number(row[valueKey]) || 0;
          const width = Math.max(4, Math.round((value / ceiling) * 100));
          return (
            <div
              key={row.id}
              className={`lb-chart__row${row.isYou ? " lb-chart__row--you" : ""}`}
            >
              <div className="lb-chart__meta">
                <span className="lb-rank">#{index + 1}</span>
                <span className="lb-name">
                  {row.label}
                  {row.isYou ? <em> (you)</em> : null}
                </span>
                <span className="lb-score">
                  {value}
                  {valueSuffix}
                </span>
              </div>
              <div className="lb-chart__track" aria-hidden="true">
                <div
                  className={`lb-chart__fill${row.isYou ? " lb-chart__fill--you" : ""}`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function Leaderboard() {
  const { user } = useAuth();
  const { progress, stats, setLeaderboardOptIn } = useProgress();
  const optedIn = Boolean(progress.leaderboardOptIn);
  const [peers, setPeers] = useState([]);
  const [peersError, setPeersError] = useState("");

  const loadPeers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/progress/leaderboard`);
      if (!response.ok) {
        setPeersError("Could not load peer rankings.");
        return;
      }
      const data = await response.json();
      setPeers(Array.isArray(data.entries) ? data.entries : []);
      setPeersError("");
    } catch {
      setPeersError("Could not reach the backend for peer rankings.");
    }
  };

  // Anonymized entries for every opted-in user, fetched from the backend.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(`${API_URL}/api/progress/leaderboard`);
        if (!response.ok || cancelled) return;
        const data = await response.json();
        if (!cancelled) {
          setPeers(Array.isArray(data.entries) ? data.entries : []);
          setPeersError("");
        }
      } catch {
        if (!cancelled) {
          setPeersError("Could not reach the backend for peer rankings.");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [optedIn, progress.quizScores, stats.completedCount]);

  const youStats = useMemo(() => {
    const topics = stats.completedCount || 0;
    const quizPct = quizAveragePercent(progress.quizScores);
    return {
      id: "you",
      label: user?.username || "You",
      topics,
      quizPct,
      isYou: true,
    };
  }, [progress.quizScores, stats.completedCount, user?.username]);

  const quizCount = Object.keys(progress.quizScores || {}).length;

  const sameUser = (peer) => {
    if (!user) return false;
    if (user.id != null && peer.userId != null) {
      return Number(peer.userId) === Number(user.id);
    }
    if (user.username && peer.label) {
      return String(peer.label).toLowerCase() === String(user.username).toLowerCase();
    }
    return false;
  };

  // Other users from the backend (your own server entry is replaced by
  // fresher local stats below).
  const peerRows = useMemo(
    () =>
      peers
        .filter((p) => !sameUser(p))
        .map((p) => ({
          id: `user-${p.userId}`,
          label: p.label || "Learner",
          topics: Number(p.topics) || 0,
          quizPct: Number(p.quizPct) || 0,
          quizCount: Number(p.quizCount) || 0,
          isYou: false,
        })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [peers, user?.id, user?.username],
  );

  const topicRows = useMemo(() => {
    const rows = [...peerRows];
    // Always show your row when opted in so the username is visible.
    if (optedIn && user) rows.push(youStats);
    return rows.sort((a, b) => b.topics - a.topics || a.label.localeCompare(b.label));
  }, [peerRows, optedIn, user, youStats]);

  const quizRows = useMemo(() => {
    const rows = peerRows.filter((p) => p.quizCount > 0);
    if (optedIn && user && quizCount > 0) rows.push(youStats);
    return rows.sort((a, b) => b.quizPct - a.quizPct || a.label.localeCompare(b.label));
  }, [peerRows, optedIn, user, quizCount, youStats]);

  const handleToggle = async (checked) => {
    await setLeaderboardOptIn(checked);
    // Give the backend a moment, then refresh peer list so you appear.
    setTimeout(() => {
      loadPeers();
    }, 300);
  };

  return (
    <main className="lb-page">
      <header className="lb-hero">
        <p className="lb-kicker">Your progress</p>
        <h1>Leaderboard</h1>
        <p className="lb-lead">
          Ranking from real quiz scores and completed topics across all
          learners. Submit a quiz from Practice or any study-guide quiz to
          appear here under your username.
        </p>
      </header>

      <section className="lb-privacy">
        <div>
          <h2>Share your progress?</h2>
          <p>
            When enabled, your topic completion and quiz averages appear here
            under your username ({user?.username || "sign in required"}). Turn
            this off anytime.
          </p>
          {!user && (
            <p className="lb-note">
              <Link to="/login">Sign in</Link> to save your opt-in preference
              with your progress.
            </p>
          )}
          {user && quizCount === 0 && (
            <p className="lb-note">
              No quiz scores yet — your name can still appear for topics. Finish
              a quiz and tap <strong>Submit to Leaderboard</strong>, or try{" "}
              <Link to="/practice">Practice</Link>.
            </p>
          )}
          {peersError ? <p className="lb-note">{peersError}</p> : null}
        </div>
        <label className="lb-toggle">
          <input
            type="checkbox"
            checked={optedIn}
            onChange={(e) => handleToggle(e.target.checked)}
            disabled={!user}
            aria-label="Opt in to the leaderboard"
          />
          <span className="lb-toggle__ui" aria-hidden="true" />
          <span className="lb-toggle__text">
            {optedIn ? "Opted in" : "Opted out"}
          </span>
        </label>
      </section>

      {!user ? (
        <div className="lb-empty" role="status">
          <h2>Sign in required</h2>
          <p>
            <Link to="/login">Sign in</Link> or{" "}
            <Link to="/signup">create an account</Link> so your username and
            scores can appear on the leaderboard.
          </p>
        </div>
      ) : topicRows.length === 0 && quizRows.length === 0 ? (
        !optedIn ? (
          <div className="lb-empty" role="status">
            <h2>Leaderboard hidden</h2>
            <p>
              You are opted out and no other learners have shared progress yet.
              Enable the toggle above, or use{" "}
              <strong>Submit to Leaderboard</strong> after a quiz, to show your
              progress graphs.
            </p>
          </div>
        ) : (
          <div className="lb-empty" role="status">
            <h2>No progress yet</h2>
            <p>
              Complete a study-guide section or submit a quiz score — then your
              stats will show here next to your username{" "}
              <strong>{user.username}</strong>.
            </p>
          </div>
        )
      ) : (
        <>
          <div className="lb-summary">
            <div className="lb-stat">
              <span className="lb-stat__num">{youStats.topics}</span>
              <span className="lb-stat__label">Topics completed</span>
            </div>
            <div className="lb-stat">
              <span className="lb-stat__num">{youStats.quizPct}%</span>
              <span className="lb-stat__label">Quiz average</span>
            </div>
            <div className="lb-stat">
              <span className="lb-stat__num">{quizCount}</span>
              <span className="lb-stat__label">Quizzes recorded</span>
            </div>
          </div>

          <div className="lb-grid">
            <BarChart
              title="Topics completed"
              subtitle="All opted-in learners"
              rows={topicRows}
              valueKey="topics"
              maxValue={Math.max(12, youStats.topics)}
              valueSuffix=" topics"
            />
            <BarChart
              title="Quiz average"
              subtitle="Average across submitted quizzes"
              rows={quizRows}
              valueKey="quizPct"
              maxValue={100}
              valueSuffix="%"
            />
          </div>
        </>
      )}
    </main>
  );
}
