import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Bayes Lab — P&S interactive tool (Dev 4 Obj 12).
 * Computes P(D|+) from prevalence, sensitivity, and false-positive rate.
 */
export default function BayesLab() {
  const [prevalence, setPrevalence] = useState(0.01);
  const [sensitivity, setSensitivity] = useState(0.99);
  const [fpr, setFpr] = useState(0.02);

  const result = useMemo(() => {
    const pD = clamp01(prevalence);
    const sens = clamp01(sensitivity);
    const fp = clamp01(fpr);
    const pNotD = 1 - pD;
    const pPos = sens * pD + fp * pNotD;
    const ppv = pPos > 0 ? (sens * pD) / pPos : 0;
    const pNeg = 1 - pPos;
    const npv = pNeg > 0 ? ((1 - fp) * pNotD) / pNeg : 0;
    return { pD, sens, fp, pPos, ppv, npv, pNotD };
  }, [prevalence, sensitivity, fpr]);

  return (
    <div className="bayes-lab" style={pageStyle}>
      <style>{css}</style>
      <header className="bl-hdr">
        <p className="bl-eye">Probability &amp; Statistics · Interactive tool</p>
        <h1>Bayes Lab</h1>
        <p className="bl-sub">
          See how prevalence, sensitivity, and false positives combine into{" "}
          <strong>P(disease | positive)</strong> — the screening trap from the guides.
        </p>
        <Link className="bl-back" to="/courses/probability-statistics">
          ← Back to Probability &amp; Statistics
        </Link>
      </header>

      <div className="bl-grid">
        <section className="bl-card">
          <h2>Inputs</h2>
          <Slider
            label="Prevalence P(D)"
            value={prevalence}
            onChange={setPrevalence}
            hint="Base rate of disease in the population"
          />
          <Slider
            label="Sensitivity P(+|D)"
            value={sensitivity}
            onChange={setSensitivity}
            hint="True positive rate"
          />
          <Slider
            label="False positive rate P(+|Dᶜ)"
            value={fpr}
            onChange={setFpr}
            hint="Healthy people who still test positive"
          />
        </section>

        <section className="bl-card bl-card--out">
          <h2>Results</h2>
          <Stat label="P(+)" value={result.pPos} detail="Total positive rate (law of total probability)" />
          <Stat
            label="P(D|+)"
            value={result.ppv}
            detail="Positive predictive value — what a + test really means"
            emphasize
          />
          <Stat label="P(no disease | −)" value={result.npv} detail="Negative predictive value" />
          <div className="bl-formula">
            <div className="bl-formula-lbl">Bayes step</div>
            <p>
              P(D|+) = [P(+|D)·P(D)] / P(+) = ({fmt(result.sens)}·{fmt(result.pD)}) / {fmt(result.pPos)} ={" "}
              <strong>{fmt(result.ppv)}</strong>
            </p>
          </div>
          <p className="bl-note">
            Even with a 99% sensitive test, a rare disease (low prevalence) can leave P(D|+) far below 99%.
            That is base-rate neglect — the same warning as in Probability Basics Part 2.
          </p>
        </section>
      </div>
    </div>
  );
}

function Slider({ label, value, onChange, hint }) {
  return (
    <label className="bl-slider">
      <span className="bl-slider-top">
        <span>{label}</span>
        <span className="bl-val">{fmt(value)}</span>
      </span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.001"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className="bl-hint">{hint}</span>
    </label>
  );
}

function Stat({ label, value, detail, emphasize }) {
  return (
    <div className={`bl-stat${emphasize ? " bl-stat--hi" : ""}`}>
      <div className="bl-stat-label">{label}</div>
      <div className="bl-stat-value">{fmt(value)}</div>
      <div className="bl-stat-detail">{detail}</div>
    </div>
  );
}

function clamp01(x) {
  return Math.min(1, Math.max(0, Number(x) || 0));
}

function fmt(x) {
  return (Math.round(x * 10000) / 10000).toFixed(4);
}

const pageStyle = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "1.5rem 1.25rem 3rem",
};

const css = `
.bayes-lab { color: var(--ink, #1a1610); font-family: Georgia, "Times New Roman", serif; }
.bl-eye { text-transform: uppercase; letter-spacing: 0.12em; font-size: 0.75rem; color: var(--gold, #a0720a); margin: 0 0 0.5rem; }
.bl-hdr h1 { font-size: clamp(1.8rem, 4vw, 2.4rem); margin: 0 0 0.5rem; }
.bl-sub { line-height: 1.55; max-width: 40rem; opacity: 0.9; }
.bl-back { display: inline-block; margin-top: 0.75rem; color: var(--gold, #a0720a); font-weight: 600; text-decoration: none; }
.bl-grid { display: grid; gap: 1.25rem; margin-top: 1.75rem; }
@media (min-width: 800px) { .bl-grid { grid-template-columns: 1fr 1fr; } }
.bl-card { background: color-mix(in srgb, var(--paper, #f7f1e6) 92%, #fff); border: 1px solid color-mix(in srgb, var(--gold, #a0720a) 28%, transparent); border-radius: 12px; padding: 1.15rem 1.25rem; }
.bl-card h2 { margin: 0 0 1rem; font-size: 1.15rem; }
.bl-slider { display: block; margin-bottom: 1.1rem; }
.bl-slider-top { display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 0.35rem; }
.bl-val { font-variant-numeric: tabular-nums; color: var(--gold, #a0720a); }
.bl-slider input { width: 100%; }
.bl-hint { display: block; font-size: 0.85rem; opacity: 0.75; margin-top: 0.25rem; }
.bl-stat { padding: 0.75rem 0; border-bottom: 1px dashed color-mix(in srgb, var(--gold, #a0720a) 25%, transparent); }
.bl-stat--hi { background: color-mix(in srgb, var(--gold, #a0720a) 10%, transparent); border-radius: 8px; padding: 0.85rem; border: none; margin-bottom: 0.5rem; }
.bl-stat-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.7; }
.bl-stat-value { font-size: 1.6rem; font-weight: 700; font-variant-numeric: tabular-nums; }
.bl-stat-detail { font-size: 0.9rem; opacity: 0.8; margin-top: 0.2rem; }
.bl-formula { margin-top: 1rem; padding: 0.85rem; border-left: 3px solid var(--gold, #a0720a); background: color-mix(in srgb, var(--gold, #a0720a) 8%, transparent); }
.bl-formula-lbl { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--gold, #a0720a); margin-bottom: 0.35rem; }
.bl-note { font-size: 0.95rem; line-height: 1.55; opacity: 0.9; margin-top: 1rem; }
`;
