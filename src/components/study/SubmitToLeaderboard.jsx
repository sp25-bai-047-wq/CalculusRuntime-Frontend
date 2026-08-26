import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";

/**
 * Appear after a quiz so learners can publish scores under their username.
 */
export default function SubmitToLeaderboard({
  quizId,
  score,
  total,
  className = "",
}) {
  const { user } = useAuth();
  const { publishQuizToLeaderboard, progress } = useProgress();
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  if (!quizId || !total) return null;

  const alreadyIn = Boolean(progress.leaderboardOptIn);
  const pct = Math.round((score / total) * 100);

  const handleSubmit = async () => {
    if (busy) return;
    if (!user?.accessToken) {
      setStatus("Sign in first so your username can appear on the leaderboard.");
      return;
    }
    setBusy(true);
    try {
      await publishQuizToLeaderboard(quizId, score, total);
      setStatus(
        `Submitted ${score}/${total} (${pct}%) as ${user.username}. You now appear on the leaderboard.`
      );
    } catch {
      setStatus("Could not reach the server. Your score was saved locally.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`lb-submit ${className}`.trim()}>
      <div className="lb-submit__row">
        <button
          type="button"
          className="lb-submit__btn"
          onClick={handleSubmit}
          disabled={busy}
        >
          {busy
            ? "Submitting…"
            : alreadyIn
              ? "Update Leaderboard Score"
              : "Submit to Leaderboard"}
        </button>
        <Link className="lb-submit__link" to="/leaderboard">
          View leaderboard →
        </Link>
      </div>
      {status ? (
        <p className="lb-submit__status" role="status">
          {status}
        </p>
      ) : !user ? (
        <p className="lb-submit__hint">
          <Link to="/login">Sign in</Link> so your username and score appear on
          the leaderboard.
        </p>
      ) : (
        <p className="lb-submit__hint">
          Publishes your quiz average as <strong>{user.username}</strong>. You
          can opt out anytime on the leaderboard page.
        </p>
      )}
    </div>
  );
}
