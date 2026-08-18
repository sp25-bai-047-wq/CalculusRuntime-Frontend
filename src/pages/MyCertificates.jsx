import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import {
  COURSE_CERTIFICATE_REQUIREMENTS,
  getCourseTitle,
  getRemainingSections,
} from "../data/courseCompletion";
import "./MyCertificates.css";
import { fetchWithTimeout } from "../utils/fetchWithTimeout";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8002";
const COURSE_IDS = Object.keys(COURSE_CERTIFICATE_REQUIREMENTS);

function formatDate(epochSeconds) {
  return new Date(epochSeconds * 1000).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function MyCertificates() {
  const { user, isHydrated } = useAuth();
  const { progress } = useProgress();
  const [earned, setEarned] = useState(null); // null = loading, else map courseId -> record
  const [loadError, setLoadError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!isHydrated || !user) return;
    let cancelled = false;
    setLoadError(false);

    (async () => {
      try {
        const res = await fetchWithTimeout(`${API_URL}/api/certificates/mine`, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
        if (!res.ok) throw new Error();
        const list = await res.json();
        if (cancelled) return;
        const byCourseId = {};
        list.forEach((c) => {
          byCourseId[c.course_id] = c;
        });
        setEarned(byCourseId);
      } catch {
        if (!cancelled) setLoadError(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isHydrated, user, retryCount]);

  if (!isHydrated) {
    return (
      <main className="mycerts-page">
        <div className="mycerts-state">Loading…</div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mycerts-page">
        <div className="mycerts-state">
          <h2>Sign in required</h2>
          <p>Sign in to see the certificates you've earned.</p>
          <Link className="mycerts-btn mycerts-btn--primary" to="/login">
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mycerts-page">
      <header className="mycerts-header">
        <p className="mycerts-eyebrow">Certificates</p>
        <h1>My Certificates</h1>
        <p className="mycerts-sub">
          One certificate per course — completing another course adds to
          this list, it never replaces an earlier one.
        </p>
      </header>

      {loadError && (
        <div className="mycerts-error-banner">
          <span>
            Couldn't reach the server (it may be waking up from sleep — this
            can take up to a minute).
          </span>
          <button
            type="button"
            className="mycerts-btn mycerts-btn--primary"
            onClick={() => setRetryCount((n) => n + 1)}
          >
            Try again
          </button>
        </div>
      )}

      <div className="mycerts-list">
        {COURSE_IDS.map((courseId) => {
          const courseTitle = getCourseTitle(courseId);
          const record = earned ? earned[courseId] : undefined;
          const remaining = getRemainingSections(courseId, progress.completedSections);

          return (
            <div className="mycerts-row" key={courseId}>
              <div className="mycerts-row-main">
                <div className="mycerts-row-title">{courseTitle}</div>
                {record ? (
                  <div className="mycerts-row-meta mycerts-row-meta--earned">
                    Earned {formatDate(record.issued_at)}
                    {record.score != null && record.total
                      ? ` · Quiz: ${record.score}/${record.total} (${Math.round(
                          (record.score / record.total) * 100
                        )}%)`
                      : ""}
                  </div>
                ) : earned === null && !loadError ? (
                  <div className="mycerts-row-meta">Checking…</div>
                ) : remaining.length === 0 ? (
                  <div className="mycerts-row-meta">
                    All sections done — take the certification quiz to unlock
                  </div>
                ) : (
                  <div className="mycerts-row-meta">
                    {remaining.length} section{remaining.length === 1 ? "" : "s"}{" "}
                    remaining
                  </div>
                )}
              </div>

              <div className="mycerts-row-actions">
                {record ? (
                  <>
                    <a
                      href={`${API_URL}${record.pdf_url}`}
                      className="mycerts-btn mycerts-btn--primary"
                      download
                    >
                      Download PDF
                    </a>
                    <Link to={`/certificate/${courseId}`} className="mycerts-btn">
                      View
                    </Link>
                  </>
                ) : remaining.length === 0 ? (
                  <Link
                    to={`/quiz/${courseId}`}
                    className="mycerts-btn mycerts-btn--primary"
                  >
                    Take quiz
                  </Link>
                ) : (
                  <Link to={`/courses/${courseId}`} className="mycerts-btn">
                    Continue course
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default MyCertificates;