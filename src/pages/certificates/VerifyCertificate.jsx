import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { fetchWithTimeout } from "../../utils/fetchWithTimeout";
import "../calculus/Certificate.css";
import "./VerifyCertificate.css";

const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8002";

function formatDate(epochSeconds) {
  if (!epochSeconds) return "";
  return new Date(epochSeconds * 1000).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Public page opened by scanning/clicking the QR on a certificate PDF —
 * `/verify?token=...`. Calls the backend so the result reflects the real,
 * signed record (not something baked statically into the PDF), the same
 * way the token can never be forged without the server's signing key.
 */
function VerifyCertificate() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [status, setStatus] = useState("loading"); // loading | valid | invalid | error
  const [result, setResult] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      setReason("missing_token");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetchWithTimeout(
          `${API_URL}/api/certificates/verify?token=${encodeURIComponent(token)}`
        );
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;

        if (res.ok && data.valid) {
          setResult(data);
          setStatus("valid");
        } else {
          setStatus("invalid");
          setReason(data.reason || "invalid_signature");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  if (status === "loading") {
    return (
      <main className="cert-page">
        <div className="cert-state cert-state--loading">
          <div className="cert-spinner" />
          <p>Verifying certificate…</p>
        </div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="cert-page">
        <div className="cert-state">
          <h2>Couldn't reach the verification server</h2>
          <p>Try again in a moment.</p>
        </div>
      </main>
    );
  }

  if (status === "invalid") {
    const message =
      reason === "expired"
        ? "This certificate link has expired."
        : reason === "missing_token"
        ? "No verification token was provided."
        : "This certificate could not be verified — the link may be broken or tampered with.";
    return (
      <main className="cert-page">
        <div className="verify-card verify-card--invalid">
          <div className="verify-icon verify-icon--invalid">✕</div>
          <span className="verify-badge verify-badge--invalid">NOT VERIFIED</span>
          <h1 className="verify-title">Verification failed</h1>
          <p className="verify-sub">{message}</p>
          <Link to="/" className="cert-btn cert-btn--ghost">
            Go to CalcVoyager
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cert-page">
      <div className="verify-card">
        <div className="verify-icon">✓</div>
        <span className="verify-badge">VERIFIED</span>
        <h1 className="verify-title">Certificate verified</h1>
        <p className="verify-sub">
          This certificate is authentic and was issued by CalcVoyager.
        </p>

        <dl className="verify-fields">
          <div className="verify-field">
            <dt>Name</dt>
            <dd>{result.full_name}</dd>
          </div>
          <div className="verify-field">
            <dt>Course</dt>
            <dd>{result.course_title}</dd>
          </div>
          <div className="verify-field">
            <dt>Issued</dt>
            <dd>{formatDate(result.issued_at)}</dd>
          </div>
          <div className="verify-field">
            <dt>Certificate ID</dt>
            <dd className="verify-field-mono">{result.cert_id}</dd>
          </div>
        </dl>

        <Link to="/" className="cert-btn cert-btn--ghost">
          Go to CalcVoyager
        </Link>
      </div>
    </main>
  );
}

export default VerifyCertificate;
