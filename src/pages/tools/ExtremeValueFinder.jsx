import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import * as math from "mathjs";
import { BlockMath as KatexBlockMath } from "../../components/Math";
import HintButton from "../../components/HintButton";
import { useStepHints } from "../../hooks/useStepHints";

const BlockMath = ({ latex }) => (
  <KatexBlockMath
    latex={latex}
    style={{ overflowX: "auto", padding: "0.5rem 0" }}
  />
);

function buildExtremeHintSteps(raw, results) {
  if (!results) return [];
  const hints = [
    {
      title: "Step 1: Goal",
      body: `Find critical points of f(x, y) = ${raw || "f"} by solving ∇f = 0.`,
    },
    {
      title: "Step 2: Set up the system",
      body: "Compute the partial derivatives fx and fy, then solve fx = 0 and fy = 0 simultaneously.",
    },
  ];

  if (results.note) {
    hints.push({
      title: "Step 3: Search result",
      body: results.note,
    });
    return hints;
  }

  const points = results.points || [];
  hints.push({
    title: "Step 3: Critical points",
    body:
      points.length === 0
        ? "No critical points were found in the search window."
        : `Found ${points.length} critical point(s): ${points
            .map((p) => `(${p.x}, ${p.y})`)
            .join(", ")}.`,
  });
  hints.push({
    title: "Step 4: Second derivative test",
    body: "Classify each point with the discriminant D = fxx·fyy − (fxy)².",
  });
  points.forEach((pt, i) => {
    hints.push({
      title: `Step ${5 + i}: (${pt.x}, ${pt.y})`,
      body: `D ≈ ${Number(pt.D).toFixed(6)} → ${pt.classification}. ${pt.detail || ""}`,
    });
  });
  return hints;
}

// ─── Demo examples ─────────────────────────────────────────────────────────
const EXAMPLES = [
  { label: "Saddle point", latex: "x^2 - y^2", expr: "x^2 - y^2" },
  { label: "Local min", latex: "x^2 + y^2", expr: "x^2 + y^2" },
  { label: "Local max", latex: "-x^2 - y^2", expr: "-x^2 - y^2" },
  { label: "Mixed", latex: "x^3 + y^3 - 3xy", expr: "x^3 + y^3 - 3*x*y" },
  {
    label: "Paraboloid",
    latex: "(x-1)^2 + (y+2)^2",
    expr: "(x-1)^2 + (y+2)^2",
  },
  { label: "Monkey saddle", latex: "x^3 - 3xy^2", expr: "x^3 - 3*x*y^2" },
  {
    label: "Rosenbrock",
    latex: "(1-x)^2 + (y-x^2)^2",
    expr: "(1-x)^2 + (y-x^2)^2",
  },
  { label: "Wave", latex: "x^2 y - x y^2", expr: "x^2*y - x*y^2" },
];

// ─── Numeric derivative helpers ────────────────────────────────────────────
const h = 1e-5;

function evalAt(node, x, y) {
  try {
    return node.evaluate({ x, y });
  } catch {
    return NaN;
  }
}

function gradAt(node, x, y) {
  const fx = (evalAt(node, x + h, y) - evalAt(node, x - h, y)) / (2 * h);
  const fy = (evalAt(node, x, y + h) - evalAt(node, x, y - h)) / (2 * h);
  return { fx, fy };
}

function hessianAt(node, x, y) {
  const fxx =
    (evalAt(node, x + h, y) - 2 * evalAt(node, x, y) + evalAt(node, x - h, y)) /
    (h * h);
  const fyy =
    (evalAt(node, x, y + h) - 2 * evalAt(node, x, y) + evalAt(node, x, y - h)) /
    (h * h);
  const fxy =
    (evalAt(node, x + h, y + h) -
      evalAt(node, x + h, y - h) -
      evalAt(node, x - h, y + h) +
      evalAt(node, x - h, y - h)) /
    (4 * h * h);
  return { fxx, fyy, fxy, D: fxx * fyy - fxy * fxy };
}

// ─── Find critical points by grid + Newton ────────────────────────────────
function findCriticalPoints(node) {
  const candidates = [];
  const range = [-3, -2, -1, 0, 1, 2, 3];

  for (const x0 of range) {
    for (const y0 of range) {
      // Newton–Raphson iterations
      let x = x0,
        y = y0;
      for (let iter = 0; iter < 30; iter++) {
        const { fx, fy } = gradAt(node, x, y);
        const { fxx, fyy, fxy } = hessianAt(node, x, y);
        const det = fxx * fyy - fxy * fxy;
        if (Math.abs(det) < 1e-12) break;
        const dx = -(fyy * fx - fxy * fy) / det;
        const dy = -(-fxy * fx + fxx * fy) / det;
        x += dx;
        y += dy;
        if (Math.abs(dx) < 1e-8 && Math.abs(dy) < 1e-8) break;
      }

      if (!isFinite(x) || !isFinite(y)) continue;
      const { fx, fy } = gradAt(node, x, y);
      if (Math.abs(fx) < 1e-4 && Math.abs(fy) < 1e-4) {
        // Deduplicate
        const dup = candidates.some(
          (c) => Math.abs(c.x - x) < 0.01 && Math.abs(c.y - y) < 0.01,
        );
        if (!dup)
          candidates.push({
            x: Math.round(x * 1e6) / 1e6,
            y: Math.round(y * 1e6) / 1e6,
          });
      }
    }
  }
  return candidates;
}

function classifyPoint(node, x, y) {
  const { fxx, fyy, fxy, D } = hessianAt(node, x, y);
  const z = evalAt(node, x, y);
  let classification, detail;

  if (Math.abs(D) < 1e-6) {
    classification = "Inconclusive";
    detail = "The second derivative test is inconclusive (D ≈ 0).";
  } else if (D > 0 && fxx > 0) {
    classification = "Local Minimum";
    detail = `D = ${D.toFixed(4)} > 0 and f_{xx} = ${fxx.toFixed(4)} > 0 ⟹ local minimum.`;
  } else if (D > 0 && fxx < 0) {
    classification = "Local Maximum";
    detail = `D = ${D.toFixed(4)} > 0 and f_{xx} = ${fxx.toFixed(4)} < 0 ⟹ local maximum.`;
  } else {
    classification = "Saddle Point";
    detail = `D = ${D.toFixed(4)} < 0 ⟹ saddle point.`;
  }

  return { classification, detail, z, fxx, fyy, fxy, D };
}

// ─── Component ─────────────────────────────────────────────────────────────
export default function ExtremeValueFinder() {
  const [inputVal, setInputVal] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "" });
  const mathFieldRef = useRef(null);
  const fieldRef = useRef(null);

  const hintSteps = useMemo(
    () => buildExtremeHintSteps(inputVal, results),
    [inputVal, results]
  );
  const hintResetKey = results
    ? `${inputVal}|${results.points?.length ?? 0}|${results.note ?? ""}`
    : "";
  const {
    visibleCount,
    total: hintTotal,
    visibleSteps,
    allRevealed,
    feedback: hintFeedback,
    revealHint,
    resetHints,
  } = useStepHints(hintSteps, hintResetKey);

  // MathQuill init
  useEffect(() => {
    if (window.MathQuill && fieldRef.current && !mathFieldRef.current) {
      const MQ = window.MathQuill.getInterface(2);
      mathFieldRef.current = MQ.MathField(fieldRef.current, {
        spaceBehavesLikeTab: true,
      });
    }
  }, []);

  const showToast = useCallback((msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2200);
  }, []);

  const loadExample = useCallback(
    (ex) => {
      setInputVal(ex.expr);
      if (mathFieldRef.current) mathFieldRef.current.latex(ex.latex);
      showToast(`Loaded: ${ex.label}`);
    },
    [showToast],
  );

  const analyze = useCallback(() => {
    const raw = inputVal.trim();
    if (!raw) {
      setError("Please enter a function f(x, y).");
      return;
    }

    setLoading(true);
    setError("");
    setResults(null);

    setTimeout(() => {
      try {
        const node = math.parse(raw);
        const cps = findCriticalPoints(node);

        if (cps.length === 0) {
          setResults({
            points: [],
            note: "No critical points found in the search range [−3, 3]². The function may have critical points outside this range.",
          });
        } else {
          const points = cps.map(({ x, y }) => ({
            x,
            y,
            ...classifyPoint(node, x, y),
          }));
          setResults({ points, note: null });
        }
      } catch (e) {
        setError(`Could not parse function: ${e.message}`);
      }
      setLoading(false);
    }, 50);
  }, [inputVal]);

  const clear = () => {
    setInputVal("");
    setResults(null);
    setError("");
    resetHints();
    if (mathFieldRef.current) mathFieldRef.current.latex("");
  };

  const classColor = (cls) => {
    if (cls === "Local Minimum") return "var(--ev-green)";
    if (cls === "Local Maximum") return "var(--ev-red)";
    if (cls === "Saddle Point") return "var(--ev-gold)";
    return "var(--ev-muted)";
  };

  const classIcon = (cls) => {
    if (cls === "Local Minimum") return "▼";
    if (cls === "Local Maximum") return "▲";
    if (cls === "Saddle Point") return "◆";
    return "?";
  };

  return (
    <div className="ev-page">
      <style>{`
                .ev-page {
                    --ev-teal: #a0720a;
                    --ev-gold: #c89318;
                    --ev-blue: #8a6209;
                    --ev-red: #7c2f0a;
                    --ev-green: #3a5f32;
                    --ev-ink: #16120a;
                    --ev-muted: #5c4f3a;
                    --ev-card: #fdf8f0;
                    --ev-soft: #f4ede0;
                    --ev-line: #d4c4a8;
                    --ev-shadow: 0 8px 32px rgba(21,16,12,0.10);
                    min-height: 100vh;
                    background: var(--paper, #f4ede0);
                    padding: clamp(1.5rem, 5vw, 3.5rem) clamp(1rem, 4vw, 3rem);
                }

                [data-theme="dark"] .ev-page {
                    --ev-ink: #f5f0e8;
                    --ev-muted: #b5a98e;
                    --ev-card: #1e1a14;
                    --ev-soft: #17130d;
                    --ev-line: #3a3020;
                }

                .ev-container { max-width: 860px; margin: 0 auto; }

                .ev-title {
                    font-family: Georgia, serif;
                    font-size: clamp(2rem, 6vw, 4rem);
                    color: var(--ev-ink);
                    margin: 0;
                    text-align: center;
                    font-weight: 700;
                    line-height: 1;
                }

                .ev-subtitle {
                    color: var(--ev-muted);
                    text-align: center;
                    margin: 0.8rem auto 2rem;
                    max-width: 560px;
                    font-size: clamp(0.95rem, 2vw, 1.1rem);
                    line-height: 1.65;
                }

                .ev-subtitle::before {
                    content: '';
                    display: block;
                    height: 3px;
                    width: min(200px, 50vw);
                    background: linear-gradient(90deg, var(--ev-teal), var(--ev-gold), var(--ev-blue));
                    border-radius: 999px;
                    margin: 0 auto 1.2rem;
                }

                .ev-section {
                    background: var(--ev-card);
                    border: 1px solid var(--ev-line);
                    border-radius: 10px;
                    box-shadow: var(--ev-shadow);
                    overflow: hidden;
                    position: relative;
                    margin-bottom: 1.2rem;
                    padding: clamp(1rem, 3vw, 1.8rem);
                }

                .ev-section::before {
                    content: '';
                    position: absolute;
                    inset: 0 0 auto;
                    height: 4px;
                    background: linear-gradient(90deg, var(--ev-teal), var(--ev-gold), var(--ev-blue));
                }

                .ev-section-title {
                    font-family: Georgia, serif;
                    font-size: clamp(1.2rem, 3vw, 1.6rem);
                    color: var(--ev-ink);
                    font-weight: 700;
                    margin: 0 0 1rem;
                }

                .ev-examples {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                    gap: 0.6rem;
                }

                .ev-ex-card {
                    background: var(--ev-soft);
                    border: 1px solid var(--ev-line);
                    border-radius: 8px;
                    padding: 0.75rem;
                    cursor: pointer;
                    transition: border-color 0.18s, transform 0.18s, box-shadow 0.18s;
                    text-align: center;
                }

                .ev-ex-card:hover {
                    border-color: var(--ev-teal);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(47,116,107,0.15);
                }

                .ev-ex-label {
                    font-size: 0.72rem;
                    font-weight: 800;
                    color: var(--ev-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 0.4rem;
                }

                .ev-ex-math {
                    font-family: Georgia, serif;
                    font-size: 0.95rem;
                    color: var(--ev-ink);
                }

                .ev-input-label {
                    font-size: 0.95rem;
                    font-weight: 800;
                    color: var(--ev-ink);
                    margin-bottom: 0.5rem;
                }

                .ev-field-wrap {
                    background: var(--ev-card);
                    border: 1.5px solid var(--ev-line);
                    border-radius: 8px;
                    min-height: 60px;
                    padding: 0.8rem;
                    font-size: 1.2rem;
                    transition: border-color 0.18s, box-shadow 0.18s;
                    margin-bottom: 0.8rem;
                }

                .ev-field-wrap:focus-within {
                    border-color: var(--ev-teal);
                    box-shadow: 0 0 0 3px rgba(47,116,107,0.13);
                }

                .ev-input-fallback {
                    width: 100%;
                    padding: 0.7rem;
                    border: 1.5px solid var(--ev-line);
                    border-radius: 8px;
                    background: var(--ev-card);
                    color: var(--ev-ink);
                    font-family: 'SFMono-Regular', Consolas, monospace;
                    font-size: 1rem;
                    margin-bottom: 0.8rem;
                    transition: border-color 0.18s, box-shadow 0.18s;
                }

                .ev-input-fallback:focus {
                    outline: none;
                    border-color: var(--ev-teal);
                    box-shadow: 0 0 0 3px rgba(47,116,107,0.13);
                }

                .ev-hint {
                    font-size: 0.82rem;
                    color: var(--ev-muted);
                    margin-bottom: 1rem;
                    font-style: italic;
                }

                .ev-actions {
                    display: flex;
                    gap: 0.75rem;
                    flex-wrap: wrap;
                }

                .ev-btn-analyze {
                    flex: 1;
                    min-width: 160px;
                    padding: 0.9rem 1.2rem;
                    background: var(--ev-ink);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: background 0.18s, transform 0.18s;
                }

                .ev-btn-analyze:hover:not(:disabled) {
                    background: var(--ev-teal);
                    transform: translateY(-1px);
                }

                .ev-btn-analyze:disabled { opacity: 0.6; cursor: not-allowed; }

                .ev-btn-clear {
                    padding: 0.9rem 1.2rem;
                    background: transparent;
                    color: var(--ev-muted);
                    border: 1.5px solid var(--ev-line);
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 800;
                    cursor: pointer;
                    transition: border-color 0.18s, color 0.18s;
                }

                .ev-btn-clear:hover {
                    border-color: var(--ev-gold);
                    color: var(--ev-gold);
                }

                .ev-error {
                    background: rgba(142,62,62,0.1);
                    border: 1px solid rgba(142,62,62,0.3);
                    border-radius: 8px;
                    color: var(--ev-red);
                    padding: 0.9rem 1rem;
                    margin-top: 0.8rem;
                    font-size: 0.95rem;
                }

                .ev-results { animation: ev-slide-up 0.4s ease; }

                @keyframes ev-slide-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .ev-note {
                    background: rgba(194,138,46,0.1);
                    border: 1px solid rgba(194,138,46,0.3);
                    border-radius: 8px;
                    padding: 0.9rem 1rem;
                    color: var(--ev-muted);
                    font-size: 0.92rem;
                }

                .ev-point-card {
                    background: var(--ev-soft);
                    border: 1px solid var(--ev-line);
                    border-radius: 10px;
                    overflow: hidden;
                    margin-bottom: 0.8rem;
                }

                .ev-point-header {
                    display: flex;
                    align-items: center;
                    gap: 0.9rem;
                    padding: 1rem 1.2rem;
                    border-bottom: 1px solid var(--ev-line);
                }

                .ev-point-icon {
                    font-size: 1.4rem;
                    width: 2.4rem;
                    height: 2.4rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: var(--ev-card);
                    border: 1.5px solid var(--ev-line);
                    flex-shrink: 0;
                }

                .ev-point-type {
                    font-family: Georgia, serif;
                    font-size: 1.15rem;
                    font-weight: 700;
                }

                .ev-point-coords {
                    font-size: 0.88rem;
                    color: var(--ev-muted);
                    font-family: monospace;
                }

                .ev-point-body {
                    padding: 1rem 1.2rem;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 0.6rem;
                }

                .ev-stat-box {
                    background: var(--ev-card);
                    border: 1px solid var(--ev-line);
                    border-radius: 8px;
                    padding: 0.7rem 0.9rem;
                }

                .ev-stat-label {
                    font-size: 0.72rem;
                    font-weight: 800;
                    color: var(--ev-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 0.3rem;
                }

                .ev-stat-value {
                    font-family: 'SFMono-Regular', monospace;
                    font-size: 0.95rem;
                    color: var(--ev-ink);
                    font-weight: 700;
                }

                .ev-point-detail {
                    padding: 0.75rem 1.2rem;
                    font-size: 0.9rem;
                    color: var(--ev-muted);
                    border-top: 1px solid var(--ev-line);
                    font-style: italic;
                }

                .ev-theory {
                    font-size: 0.9rem;
                    color: var(--ev-muted);
                    line-height: 1.7;
                }

                .ev-theory h4 {
                    font-family: Georgia, serif;
                    color: var(--ev-ink);
                    margin: 0 0 0.5rem;
                    font-size: 1rem;
                }

                .ev-theory-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 0.6rem;
                    margin-top: 0.8rem;
                }

                .ev-theory-rule {
                    background: var(--ev-soft);
                    border: 1px solid var(--ev-line);
                    border-left: 4px solid var(--ev-teal);
                    border-radius: 6px;
                    padding: 0.75rem;
                    font-size: 0.85rem;
                }

                .ev-theory-rule strong {
                    color: var(--ev-ink);
                    display: block;
                    margin-bottom: 0.2rem;
                }

                .ev-toast {
                    position: fixed;
                    bottom: 1.5rem;
                    right: 1.5rem;
                    background: var(--ev-ink);
                    color: white;
                    padding: 0.8rem 1.1rem;
                    border-radius: 8px;
                    box-shadow: var(--ev-shadow);
                    font-size: 0.9rem;
                    z-index: 9999;
                    animation: ev-toast-in 0.25s ease;
                }

                @keyframes ev-toast-in {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 560px) {
                    .ev-actions { flex-direction: column; }
                    .ev-btn-analyze, .ev-btn-clear { width: 100%; }
                    .ev-point-body { grid-template-columns: 1fr 1fr; }
                }
            `}</style>

      <div className="ev-container">
        <h1 className="ev-title">Extreme Value Finder</h1>
        <div className="ev-subtitle">
          Find and classify critical points of f(x, y) using the second
          derivative test.
        </div>

        {/* Examples */}
        <div className="ev-section">
          <div className="ev-section-title">📚 Example Functions</div>
          <div className="ev-examples">
            {EXAMPLES.map((ex) => (
              <div
                key={ex.label}
                className="ev-ex-card"
                onClick={() => loadExample(ex)}
              >
                <div className="ev-ex-label">{ex.label}</div>
                <div className="ev-ex-math">{ex.expr}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="ev-section">
          <div className="ev-section-title">Enter Your Function</div>

          <div className="ev-input-label">f(x, y) =</div>

          {/* MathQuill field (if available) */}
          <div
            ref={fieldRef}
            className="ev-field-wrap"
            style={{ display: window.MathQuill ? "block" : "none" }}
          />

          {/* Fallback text input */}
          <input
            type="text"
            className="ev-input-fallback"
            style={{ display: window.MathQuill ? "none" : "block" }}
            placeholder="e.g. x^2 - y^2 or x^3 + y^3 - 3*x*y"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && analyze()}
          />

          <div className="ev-hint">
            Use: x^2, y^2, x*y, sin(x), cos(y), exp(x), sqrt(x+y), ln(x)
          </div>

          <div className="ev-actions">
            <button
              className="ev-btn-analyze"
              onClick={() => {
                if (mathFieldRef.current) {
                  // extract raw expression from MathQuill's latex and pass through
                  const latex = mathFieldRef.current.latex();
                  // Simple latex→expr fallback: user should also type in fallback
                  if (!inputVal) setInputVal(latex);
                }
                analyze();
              }}
              disabled={loading}
            >
              {loading ? "⏳ Analyzing…" : "🔍 Find Extrema"}
            </button>
            <button className="ev-btn-clear" onClick={clear}>
              🗑️ Clear
            </button>
          </div>

          <HintButton
            onReveal={revealHint}
            visibleCount={visibleCount}
            total={hintTotal}
            feedback={hintFeedback}
            disabled={!results}
          />

          {results && (
            <div className="hint-steps" style={{ marginTop: "0.75rem" }}>
              {visibleSteps.length === 0 && (
                <div className="hint-step">
                  <div className="hint-step__body">
                    Analysis is ready. Press <strong>Show Me a Hint</strong> to
                    walk through the solution one step at a time.
                  </div>
                </div>
              )}
              {visibleSteps.map((step, i) => (
                <div key={i} className="hint-step">
                  <div className="hint-step__title">{step.title}</div>
                  <div className="hint-step__body">{step.body}</div>
                </div>
              ))}
            </div>
          )}

          {error && <div className="ev-error">⚠️ {error}</div>}
        </div>

        {/* Full result cards only after all hints are revealed */}
        {results && allRevealed && (
          <div className="ev-section ev-results">
            <div className="ev-section-title">
              📊 Results{" "}
              {results.points.length > 0 &&
                `— ${results.points.length} critical point${results.points.length !== 1 ? "s" : ""} found`}
            </div>

            {results.note && <div className="ev-note">ℹ️ {results.note}</div>}

            {results.points.map((pt, i) => (
              <div key={i} className="ev-point-card">
                <div className="ev-point-header">
                  <div
                    className="ev-point-icon"
                    style={{
                      borderColor: classColor(pt.classification),
                      color: classColor(pt.classification),
                    }}
                  >
                    {classIcon(pt.classification)}
                  </div>
                  <div>
                    <div
                      className="ev-point-type"
                      style={{ color: classColor(pt.classification) }}
                    >
                      {pt.classification}
                    </div>
                    <div className="ev-point-coords">
                      ({pt.x}, {pt.y})
                    </div>
                  </div>
                </div>

                <div className="ev-point-body">
                  <div className="ev-stat-box">
                    <div className="ev-stat-label">x</div>
                    <div className="ev-stat-value">{pt.x}</div>
                  </div>
                  <div className="ev-stat-box">
                    <div className="ev-stat-label">y</div>
                    <div className="ev-stat-value">{pt.y}</div>
                  </div>
                  <div className="ev-stat-box">
                    <div className="ev-stat-label">f(x, y)</div>
                    <div className="ev-stat-value">
                      {isNaN(pt.z) ? "—" : pt.z.toFixed(6)}
                    </div>
                  </div>
                  <div className="ev-stat-box">
                    <div className="ev-stat-label">f_xx</div>
                    <div className="ev-stat-value">{pt.fxx.toFixed(4)}</div>
                  </div>
                  <div className="ev-stat-box">
                    <div className="ev-stat-label">f_yy</div>
                    <div className="ev-stat-value">{pt.fyy.toFixed(4)}</div>
                  </div>
                  <div className="ev-stat-box">
                    <div className="ev-stat-label">f_xy</div>
                    <div className="ev-stat-value">{pt.fxy.toFixed(4)}</div>
                  </div>
                  <div className="ev-stat-box" style={{ gridColumn: "span 2" }}>
                    <div className="ev-stat-label">
                      Discriminant D = f_xx·f_yy − (f_xy)²
                    </div>
                    <div
                      className="ev-stat-value"
                      style={{ color: classColor(pt.classification) }}
                    >
                      {pt.D.toFixed(6)}
                    </div>
                  </div>
                </div>

                <div className="ev-point-detail">{pt.detail}</div>
              </div>
            ))}
          </div>
        )}

        {/* Theory reference */}
        <div className="ev-section">
          <div className="ev-section-title">
            📐 Second Derivative Test — Quick Reference
          </div>
          <div className="ev-theory">
            <p>
              For f(x,y) with a critical point at (a, b) where ∇f = 0, compute
              the discriminant:
            </p>
            <BlockMath latex="D = f_{xx}f_{yy} - (f_{xy})^2" />
            <div className="ev-theory-grid">
              <div
                className="ev-theory-rule"
                style={{ borderLeftColor: "var(--ev-green)" }}
              >
                <strong>Local Minimum</strong>D &gt; 0 and f_xx &gt; 0
              </div>
              <div
                className="ev-theory-rule"
                style={{ borderLeftColor: "var(--ev-red)" }}
              >
                <strong>Local Maximum</strong>D &gt; 0 and f_xx &lt; 0
              </div>
              <div
                className="ev-theory-rule"
                style={{ borderLeftColor: "var(--ev-gold)" }}
              >
                <strong>Saddle Point</strong>D &lt; 0
              </div>
              <div className="ev-theory-rule">
                <strong>Inconclusive</strong>D = 0, higher-order test needed
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast.show && <div className="ev-toast">{toast.msg}</div>}
    </div>
  );
}
