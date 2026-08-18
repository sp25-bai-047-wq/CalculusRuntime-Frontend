/** Shared certificate-ready blocks for Calculus guides. */

import { Children, cloneElement, isValidElement } from "react";
import { mixedMathToHtml } from "../../utils/mixedMath";

function MathLine({ text, style, as: Tag = "span" }) {
  if (text == null || text === "") return null;
  return (
    <Tag
      style={style}
      dangerouslySetInnerHTML={{ __html: mixedMathToHtml(text) }}
    />
  );
}

/** Turn string / <p>string</p> children into KaTeX-safe markup. */
function withMath(children) {
  return Children.map(children, (child) => {
    if (typeof child === "string") {
      return <MathLine text={child} />;
    }
    if (
      isValidElement(child) &&
      child.type === "p" &&
      typeof child.props.children === "string"
    ) {
      return cloneElement(child, {
        children: <MathLine text={child.props.children} />,
      });
    }
    return child;
  });
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
      {withMath(children)}
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
      {withMath(children)}
    </div>
  );
}

export function RealLifeUse({ children }) {
  return (
    <div className="box tip" style={{ marginTop: "1.25rem" }}>
      <div className="box-lbl">Real-life use</div>
      <p style={{ lineHeight: 1.65, margin: 0 }}>
        {typeof children === "string" ? <MathLine text={children} /> : children}
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
        {steps.map((step, i) => (
          <li key={i} style={{ marginBottom: "0.55rem", lineHeight: 1.55 }}>
            {typeof step === "string" ? <MathLine text={step} /> : step}
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Certificate example: problem + mathematical steps.
 * steps: string[] | { text: string, why?: string }[]
 * If why is present, it is shown inline before the step (same line), with no "Why:" label.
 */
export function CertificateExample({
  number,
  tier = "Medium",
  title,
  setup,
  steps,
  result,
  check,
  mistake,
  sectionId = "cert-examples",
}) {
  const normalized = (steps || []).map((step) =>
    typeof step === "string" ? { text: step } : step,
  );
  const anchor = `ex-${String(sectionId)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .slice(0, 32)}-${String(title || `example-${number}`)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)}`;
  return (
    <div className="box exm" id={anchor} data-example-id={anchor}>
      <div className="box-lbl">
        Worked example {number} - {tier}
      </div>
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
          <p style={{ marginTop: "0.45rem", lineHeight: 1.55 }}>
            <strong>Check: </strong>
            <MathLine text={check} />
          </p>
        ) : null}
        {mistake ? (
          <p
            style={{
              marginTop: "0.65rem",
              lineHeight: 1.55,
              padding: "0.55rem 0.75rem",
              borderRadius: 8,
              background: "rgba(124, 47, 10, 0.08)",
              border: "1px solid rgba(124, 47, 10, 0.25)",
            }}
          >
            <strong>Common mistake: </strong>
            <MathLine text={mistake} />
          </p>
        ) : null}
      </div>
    </div>
  );
}
