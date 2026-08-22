import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";
import {
  getCourseTitle,
  isCourseCertificateEligible,
  getRequiredSections,
  getQuizId,
  getMinQuizScore,
} from "../../data/courseCompletion";
import { runBackgroundVerification } from "../../services/verificationAPI";
import { fetchWithTimeout } from "../../utils/fetchWithTimeout";
import "./Certificate.css";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8002";

/**
 * Checks whether the user already has an issued certificate for this
 * course — so revisiting the page later (new session, days later) shows
 * the download button immediately instead of re-verifying/re-asking for
 * a name. Returns the certificate data, or null if none exists yet.
 */
async function fetchExistingCertificate(accessToken, courseId) {
  const response = await fetchWithTimeout(`${API_URL}/api/certificates/mine/${courseId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (response.status === 404) return null;
  if (!response.ok) return null;
  return response.json();
}

/**
 * Calls the backend to issue a signed certificate + QR code for a
 * completed course. Backend: POST /api/certificates/generate
 * (see routers/certificates.py — Dev 3).
 */
async function requestCertificate(accessToken, courseId, courseTitle, fullName, quizId, minQuizScore) {
  const response = await fetchWithTimeout(`${API_URL}/api/certificates/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      course_id: courseId,
      course_title: courseTitle,
      full_name: fullName,
      quiz_id: quizId || undefined,
      min_quiz_score: minQuizScore,
    }),
  });

  if (!response.ok) {
    let detail = "";
    try {
      detail = (await response.json()).detail || "";
    } catch {}
    throw new Error(detail || `Certificate request failed (${response.status}).`);
  }

  return response.json();
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Certificate() {
  const { courseId } = useParams();
  const { user } = useAuth();
  const { progress, isHydrated } = useProgress();

  // loading | guest | incomplete | confirm_name | issuing | failed | success
  const [status, setStatus] = useState("loading");
  const [certificate, setCertificate] = useState(null);
  const [fullName, setFullName] = useState("");
  const [pendingCompletedAt, setPendingCompletedAt] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const courseTitle = useMemo(() => getCourseTitle(courseId), [courseId]);

  useEffect(() => {
    if (!isCourseCertificateEligible(courseId)) {
      setStatus("failed");
      return undefined;
    }
    if (!isHydrated) {
      setStatus("loading");
      return undefined;
    }
    if (!user) {
      setStatus("guest");
      return undefined;
    }

    setStatus("loading");
    let cancelled = false;

    (async () => {
      try {
        // If a certificate was already issued for this user+course (e.g.
        // they came back days later), show it immediately — no
        // re-verification or re-asking for a name.
        const existing = await fetchExistingCertificate(user.accessToken, courseId);
        if (cancelled) return;
        if (existing) {
          setCertificate({
            id: existing.cert_id,
            courseTitle,
            studentName: existing.full_name,
            completedAt: existing.issued_at * 1000,
            verifyUrl: existing.verify_url,
            qrImage: existing.qr_png_base64,
            pdfUrl: existing.pdf_url ? `${API_URL}${existing.pdf_url}` : null,
            score: existing.score,
            total: existing.total,
          });
          setStatus("success");
          return;
        }

        // Ask Dev 2's verification service whether this course is actually
        // complete before issuing anything — single source of truth
        // instead of a local ad-hoc check.
        const quizId = getQuizId(courseId);
        const rawQuizAttempt = quizId ? progress.quizScores?.[quizId] : null;
        const quizPct =
          rawQuizAttempt && rawQuizAttempt.total
            ? Math.round((rawQuizAttempt.score / rawQuizAttempt.total) * 100)
            : undefined;

        const userProgress = {
          userId: user.id,
          completedSections: Object.keys(progress.completedSections || {}).filter(
            (id) => progress.completedSections[id]
          ),
          quizScores: quizId && quizPct !== undefined ? { [quizId]: quizPct } : {},
        };
        const courseData = {
          id: courseId,
          requiredSections: getRequiredSections(courseId),
          requiredQuiz: quizId || undefined,
          minQuizScore: getMinQuizScore(courseId),
        };

        const verification = await runBackgroundVerification(userProgress, courseData);
        if (cancelled) return;

        if (!verification.verified) {
          setStatus("incomplete");
          return;
        }

        const timestamps = Object.values(progress.completedSectionTimestamps || {});
        const completedAt = timestamps.length ? Math.max(...timestamps) : Date.now();

        setPendingCompletedAt(completedAt);
        setFullName((prev) => prev || user.username);
        setStatus("confirm_name");
      } catch (e) {
        // Anything above (a sleeping/unresponsive backend, a network drop,
        // etc.) lands here instead of leaving the page stuck on "loading"
        // forever.
        if (!cancelled) {
          setErrorMessage(e?.message || "Something went wrong.");
          setStatus("failed");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    courseId,
    user,
    isHydrated,
    progress.completedSections,
    progress.completedSectionTimestamps,
    progress.quizScores,
    courseTitle,
    retryCount,
  ]);

  const qrSrc = certificate?.qrImage || null;

  async function handleConfirmName(e) {
    e.preventDefault();
    if (!fullName.trim()) return;
    setStatus("issuing");
    try {
      const quizId = getQuizId(courseId);
      const data = await requestCertificate(
        user.accessToken,
        courseId,
        courseTitle,
        fullName.trim(),
        quizId,
        getMinQuizScore(courseId)
      );
      setCertificate({
        id: data.cert_id,
        courseTitle,
        studentName: data.full_name || fullName.trim(),
        completedAt: pendingCompletedAt || Date.now(),
        verifyUrl: data.verify_url,
        qrImage: data.qr_png_base64,
        pdfUrl: data.pdf_url ? `${API_URL}${data.pdf_url}` : null,
        score: data.score,
        total: data.total,
      });
      setStatus("success");
    } catch (e) {
      setErrorMessage(e?.message || "Something went wrong.");
      setStatus("failed");
    }
  }

  return (
    <div className="cert-page">
      {status === "loading" && (
        <div className="cert-state cert-state--loading">
          <div className="cert-spinner" aria-hidden="true" />
          <p>Preparing your certificate…</p>
        </div>
      )}

      {status === "guest" && (
        <div className="cert-state">
          <h2>Log in to view your certificate</h2>
          <p>Your progress is tied to your account — sign in to unlock this certificate.</p>
          <Link to="/login" className="cert-btn cert-btn--primary">
            Log in
          </Link>
        </div>
      )}

      {status === "incomplete" && (
        <div className="cert-state">
          <h2>Not finished yet</h2>
          <p>
            Complete every section of <strong>{courseTitle}</strong> and score at
            least {getMinQuizScore(courseId)}% on the certification quiz to unlock
            your certificate.
          </p>
          <div className="cert-actions">
            <Link to={`/courses/${courseId}`} className="cert-btn cert-btn--primary">
              Back to course
            </Link>
            <Link to={`/quiz/${courseId}`} className="cert-btn">
              Take the quiz
            </Link>
          </div>
        </div>
      )}

      {status === "confirm_name" && (
        <div className="cert-state">
          <h2>Almost there</h2>
          <p>How should your name appear on the certificate?</p>
          <form onSubmit={handleConfirmName} className="cert-name-form">
            <input
              type="text"
              className="cert-name-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              autoFocus
              required
            />
            <button type="submit" className="cert-btn cert-btn--primary">
              Generate certificate
            </button>
          </form>
        </div>
      )}

      {status === "issuing" && (
        <div className="cert-state cert-state--loading">
          <div className="cert-spinner" aria-hidden="true" />
          <p>Issuing your certificate…</p>
        </div>
      )}

      {status === "failed" && (
        <div className="cert-state">
          <h2>We couldn't load this certificate</h2>
          <p>
            {errorMessage ||
              "Something went wrong, or this course doesn't offer a certificate yet."}
          </p>
          <div className="cert-actions">
            <button
              type="button"
              className="cert-btn cert-btn--primary"
              onClick={() => {
                setErrorMessage("");
                setRetryCount((n) => n + 1);
              }}
            >
              Try again
            </button>
            <Link to="/dashboard" className="cert-btn cert-btn--ghost">
              Back to dashboard
            </Link>
          </div>
        </div>
      )}

      {status === "success" && certificate && (
        <>
          <div className="cert-card" id="certificate-printable">
            <div className="cert-card-border">
              <div className="cert-seal">CR</div>
              <div className="cert-heading">Certificate of Completion</div>
              <div className="cert-sub">This certifies that</div>
              <div className="cert-name">{certificate.studentName}</div>
              <div className="cert-sub">has successfully completed</div>
              <div className="cert-course">{certificate.courseTitle}</div>
              {certificate.score != null && certificate.total ? (
                <div className="cert-sub cert-score">
                  Certification quiz score: {certificate.score}/{certificate.total} (
                  {Math.round((certificate.score / certificate.total) * 100)}%)
                </div>
              ) : null}

              <div className="cert-footer">
                <div className="cert-footer-block">
                  <div className="cert-footer-label">Date</div>
                  <div className="cert-footer-value">{formatDate(certificate.completedAt)}</div>
                </div>

                <div className="cert-qr-block">
                  {qrSrc && (
                    <a
                      href={certificate.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Click to verify this certificate"
                    >
                      <img
                        src={qrSrc}
                        alt="Certificate verification QR code"
                        className="cert-qr"
                      />
                    </a>
                  )}
                  <div className="cert-footer-label">Scan to verify</div>
                </div>

                <div className="cert-footer-block">
                  <div className="cert-footer-label">Certificate ID</div>
                  <div className="cert-footer-value cert-id">{certificate.id}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="cert-actions">
            {certificate.pdfUrl && (
              <a
                href={certificate.pdfUrl}
                className="cert-btn cert-btn--primary"
                download
              >
                Download PDF Certificate
              </a>
            )}
            <button type="button" className="cert-btn" onClick={() => window.print()}>
              Print / Save as PDF
            </button>
            <Link to="/dashboard" className="cert-btn cert-btn--ghost">
              Back to dashboard
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Certificate;
