/** Shared theory / procedure / worked-example blocks for Linear Algebra & P&S guides. */

import { mixedMathToHtml } from "../../utils/mixedMath";

function MathLine({ text }) {
  if (text == null || text === "") return null;
  return <span dangerouslySetInnerHTML={{ __html: mixedMathToHtml(text) }} />;
}

export function TheoryBox({ title, children }) {
  return (
    <div className="box def">
      <div className="box-lbl">Formal theory</div>
      {title ? (
        <div className="exm-title">
          <MathLine text={title} />
        </div>
      ) : null}
      {children}
    </div>
  );
}

export function TheoremBox({ title, children }) {
  return (
    <div className="box thm">
      <div className="box-lbl">Key fact</div>
      {title ? (
        <div className="exm-title">
          <MathLine text={title} />
        </div>
      ) : null}
      {children}
    </div>
  );
}

export function PracticalTheory({ title, children }) {
  return (
    <div className="box thm">
      <div className="box-lbl">Practical theory - how you actually use this</div>
      {title ? (
        <div className="exm-title">
          <MathLine text={title} />
        </div>
      ) : null}
      {children}
    </div>
  );
}

export function RealLifeUse({ children }) {
  const text = typeof children === "string" ? children : null;
  return (
    <div className="box tip" style={{ marginTop: "1.25rem" }}>
      <div className="box-lbl">Real-life use</div>
      <p style={{ lineHeight: 1.65, margin: 0 }}>
        {text ? <MathLine text={text} /> : children}
      </p>
    </div>
  );
}

export function ProcedureBox({ title, steps }) {
  return (
    <div className="box thm">
      <div className="box-lbl">Method - step by step</div>
      {title ? (
        <div className="exm-title">
          <MathLine text={title} />
        </div>
      ) : null}
      <ol style={{ margin: "0.5rem 0 0 1.15rem", padding: 0 }}>
        {steps.map((step, i) => {
          const text = typeof step === "string" ? step : step?.text || "";
          const why = typeof step === "string" ? null : step?.why;
          const line = why ? `${why} ${text}` : text;
          return (
            <li key={i} style={{ marginBottom: "0.55rem", lineHeight: 1.55 }}>
              <MathLine text={line} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * steps: string[] | { text: string, why?: string }[]
 * If why is present, it is shown inline before the step (same line), no "Why:" label.
 */
export function WorkedExample({ number, title, setup, steps, result, check, mistake }) {
  const normalized = (steps || []).map((step) =>
    typeof step === "string" ? { text: step } : step,
  );
  return (
    <div className="box exm">
      <div className="box-lbl">Worked example {number}</div>
      <div className="exm-title">{title}</div>
      {setup ? (
        <p style={{ lineHeight: 1.6 }}>
          <MathLine text={setup} />
        </p>
      ) : null}
      <div className="sol">
        <div className="sol-lbl">Mathematical steps</div>
        <ol style={{ margin: "0.55rem 0 0 1.15rem", padding: 0 }}>
          {normalized.map((step, i) => {
            const text = step.text || "";
            const why = step.why;
            const line = why ? `${why} ${text}` : text;
            return (
              <li key={i} style={{ marginBottom: "0.55rem", lineHeight: 1.55 }}>
                <MathLine text={line} />
              </li>
            );
          })}
        </ol>
        {result ? (
          <p style={{ marginTop: "0.85rem", fontWeight: 600, lineHeight: 1.55 }}>
            <strong>Final answer: </strong>
            <MathLine text={result} />
          </p>
        ) : null}
        {check ? (
          <p style={{ marginTop: "0.45rem", lineHeight: 1.55, opacity: 0.92 }}>
            <strong>Check: </strong>
            <MathLine text={check} />
          </p>
        ) : null}
      </div>
      {mistake ? (
        <div className="box warn" style={{ marginTop: "0.9rem", marginBottom: 0 }}>
          <div className="box-lbl">Common mistake</div>
          <p style={{ lineHeight: 1.55, marginBottom: 0 }}>
            <MathLine text={mistake} />
          </p>
        </div>
      ) : null}
    </div>
  );
}
