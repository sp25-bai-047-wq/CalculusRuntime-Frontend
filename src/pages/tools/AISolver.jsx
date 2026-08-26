import { useEffect, useState } from "react";
import { create, all } from "mathjs";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";
import "./AISolver.css";

const STREAMLIT_URL =
  process.env.REACT_APP_STREAMLIT_URL ||
  "https://dapeaqzot5jtellyuyxjrf.streamlit.app/";

const math = create(all, {});

const OPERATIONS = [
  { id: "diff", label: "Derivative", hint: "d/dx of an expression" },
  { id: "integrate", label: "Integral", hint: "Indefinite integral vs x" },
  { id: "simplify", label: "Simplify", hint: "Algebraic simplification" },
  { id: "evaluate", label: "Evaluate", hint: "Numeric value (set x if needed)" },
];

const EXAMPLES = [
  { op: "diff", expr: "x^3 + 2*x", note: "Polynomial derivative" },
  { op: "diff", expr: "sin(x)*x", note: "Product rule" },
  { op: "integrate", expr: "3*x^2", note: "Power rule integral" },
  { op: "integrate", expr: "cos(x)", note: "Trig integral" },
  { op: "simplify", expr: "(x^2-1)/(x-1)", note: "Cancel factors" },
];

function formatResult(value) {
  try {
    if (value == null) return "—";
    if (typeof value === "number") {
      if (!Number.isFinite(value)) return String(value);
      return math.format(value, { precision: 12 });
    }
    return math.format(value, { precision: 12 });
  } catch {
    return String(value);
  }
}

function integrateNode(node, v) {
  if (!node) throw new Error("Empty expression");

  if (node.isConstantNode || (node.isOperatorNode && node.fn === "unaryMinus" && node.args[0].isConstantNode)) {
    const c = node.evaluate();
    return new math.OperatorNode("*", "multiply", [
      new math.ConstantNode(c),
      new math.SymbolNode(v),
    ]);
  }

  if (node.isSymbolNode) {
    if (node.name === v) {
      return new math.OperatorNode("*", "multiply", [
        new math.ConstantNode(0.5),
        new math.OperatorNode("^", "pow", [new math.SymbolNode(v), new math.ConstantNode(2)]),
      ]);
    }
    return new math.OperatorNode("*", "multiply", [node, new math.SymbolNode(v)]);
  }

  if (node.isOperatorNode) {
    if (node.op === "+" || node.op === "-") {
      const left = integrateNode(node.args[0], v);
      const right = integrateNode(node.args[1], v);
      return new math.OperatorNode(node.op, node.fn, [left, right]);
    }
    if (node.fn === "unaryMinus") {
      return new math.OperatorNode("-", "unaryMinus", [integrateNode(node.args[0], v)]);
    }
    if (node.op === "*") {
      const [a, b] = node.args;
      if (a.isConstantNode || (!a.toString().includes(v) && !a.isFunctionNode)) {
        return new math.OperatorNode("*", "multiply", [a, integrateNode(b, v)]);
      }
      if (b.isConstantNode || (!b.toString().includes(v) && !b.isFunctionNode)) {
        return new math.OperatorNode("*", "multiply", [b, integrateNode(a, v)]);
      }
    }
    if (node.op === "^" && node.args[0].isSymbolNode && node.args[0].name === v && node.args[1].isConstantNode) {
      const n = Number(node.args[1].value);
      if (!Number.isFinite(n) || n === -1) {
        throw new Error("Use ln for ∫ 1/x dx — open the hosted solver for that case.");
      }
      return new math.OperatorNode("*", "multiply", [
        new math.ConstantNode(1 / (n + 1)),
        new math.OperatorNode("^", "pow", [new math.SymbolNode(v), new math.ConstantNode(n + 1)]),
      ]);
    }
  }

  if (node.isFunctionNode) {
    const name = node.name;
    const arg = node.args[0];
    if (arg.isSymbolNode && arg.name === v) {
      if (name === "sin") return new math.OperatorNode("-", "unaryMinus", [new math.FunctionNode("cos", [arg])]);
      if (name === "cos") return new math.FunctionNode("sin", [arg]);
      if (name === "exp") return new math.FunctionNode("exp", [arg]);
      if (name === "sqrt") {
        return new math.OperatorNode("*", "multiply", [
          new math.ConstantNode(2 / 3),
          new math.OperatorNode("^", "pow", [arg, new math.ConstantNode(1.5)]),
        ]);
      }
    }
  }

  throw new Error(
    `Local integral does not support "${node.toString()}" yet. Try a polynomial / sin(x) / cos(x), or open the hosted solver.`,
  );
}

function integrateExpression(expr, v) {
  const node = math.parse(expr);
  const antideriv = integrateNode(node, v);
  return math.simplify(antideriv);
}

function runLocalSolve(op, expression, variable, atValue) {
  const expr = expression.trim();
  if (!expr) throw new Error("Enter an expression first.");
  const v = (variable || "x").trim() || "x";

  try {
    if (op === "diff") {
      return { latex: null, text: formatResult(math.derivative(expr, v)), mode: "local" };
    }
    if (op === "integrate") {
      return { latex: null, text: formatResult(integrateExpression(expr, v)) + " + C", mode: "local" };
    }
    if (op === "simplify") {
      return { latex: null, text: formatResult(math.simplify(expr)), mode: "local" };
    }
    if (op === "evaluate") {
      const scope = {};
      if (atValue !== "" && atValue != null) {
        const n = Number(atValue);
        if (Number.isNaN(n)) throw new Error("Evaluation point must be a number.");
        scope[v] = n;
      }
      return { latex: null, text: formatResult(math.evaluate(expr, scope)), mode: "local" };
    }
  } catch (err) {
    throw new Error(err.message || `Could not ${op} that expression.`);
  }
  throw new Error(`Unsupported operation: ${op}`);
}

async function tryApiSolve() {
  // Reserved for CalculusSolver SLaNg API payloads. Free-text expressions
  // are handled locally so the page never depends on a blocked iframe.
  return null;
}

function AISolver() {
  const { user } = useAuth();
  const { addSolverHistory, recordVisit } = useProgress();

  const [op, setOp] = useState("diff");
  const [expression, setExpression] = useState("x^3 + 2*x");
  const [variable, setVariable] = useState("x");
  const [atValue, setAtValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    recordVisit("ai-solver");
  }, [recordVisit]);

  const handleOpenSolver = () => {
    if (user) {
      addSolverHistory({ page: "ai-solver", url: STREAMLIT_URL });
    }
  };

  const handleSolve = async () => {
    setBusy(true);
    setError("");
    setResult(null);
    try {
      const local = runLocalSolve(op, expression, variable, atValue);
      setResult(local);
      await tryApiSolve();

      if (user) {
        addSolverHistory({
          page: "ai-solver",
          op,
          expression,
          result: local.text,
        });
      }
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setBusy(false);
    }
  };

  const loadExample = (ex) => {
    setOp(ex.op);
    setExpression(ex.expr);
    setError("");
    setResult(null);
  };

  return (
    <main className="ai-solver-page">
      <div className="ai-solver-header">
        <div className="ai-solver-title-row">
          <span className="ai-solver-icon" aria-hidden="true">
            🤖
          </span>
          <div>
            <h1 className="ai-solver-title">AI Calculus Solver</h1>
            <p className="ai-solver-sub">
              Instant local solving for derivatives, integrals, and simplifications.
              Open the hosted neural solver in a new tab for the full CalculusSolver experience.
            </p>
          </div>
        </div>

        <div className="ai-solver-badges">
          <span className="ai-badge">Partial Derivatives</span>
          <span className="ai-badge">Integration</span>
          <span className="ai-badge">Gradients</span>
          <span className="ai-badge">Chain Rule</span>
          <span className="ai-badge">Lagrange Multipliers</span>
          <span className="ai-badge">Taylor Series</span>
        </div>

        {!user && (
          <div className="ai-solver-notice">
            <span>💡</span>
            <span>
              <Link to="/signup">Create a free account</Link> to save your solver history and track usage.
            </span>
          </div>
        )}
      </div>

      <div className="ai-solver-grid">
        <section className="ai-solver-card">
          <div className="ai-solver-launch-kicker">Built-in solver</div>
          <h2>Solve a problem here</h2>
          <p className="ai-solver-card-lead">
            Works immediately in the browser. No embed required.
          </p>

          <div className="ai-op-row" role="tablist" aria-label="Operation">
            {OPERATIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={op === item.id}
                className={`ai-op-btn${op === item.id ? " ai-op-btn--active" : ""}`}
                onClick={() => setOp(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <label className="ai-field">
            <span>Expression</span>
            <input
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="e.g. x^2 * sin(x)"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSolve();
              }}
            />
          </label>

          <div className="ai-field-row">
            <label className="ai-field">
              <span>Variable</span>
              <input
                value={variable}
                onChange={(e) => setVariable(e.target.value)}
                placeholder="x"
              />
            </label>
            {op === "evaluate" && (
              <label className="ai-field">
                <span>At value</span>
                <input
                  value={atValue}
                  onChange={(e) => setAtValue(e.target.value)}
                  placeholder="e.g. 2"
                />
              </label>
            )}
          </div>

          <button
            type="button"
            className="ai-solver-open-btn"
            onClick={handleSolve}
            disabled={busy}
          >
            {busy ? "Solving…" : "Solve"}
          </button>

          {error && (
            <div className="ai-solver-error" role="alert">
              {error}
            </div>
          )}

          {result && (
            <div className="ai-solver-result">
              <div className="ai-solver-result-label">
                Result {result.mode ? `(${result.mode})` : ""}
              </div>
              <div className="ai-solver-result-value">{result.text}</div>
              {result.localPreview && result.localPreview !== result.text && (
                <div className="ai-solver-result-meta">
                  Local preview: {result.localPreview}
                </div>
              )}
            </div>
          )}

          <div className="ai-examples">
            <div className="ai-examples-label">Try an example</div>
            <div className="ai-examples-list">
              {EXAMPLES.map((ex) => (
                <button
                  key={`${ex.op}-${ex.expr}`}
                  type="button"
                  className="ai-example-btn"
                  onClick={() => loadExample(ex)}
                >
                  <strong>{ex.op}</strong>
                  <span>{ex.expr}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="ai-solver-card ai-solver-card--host">
          <div className="ai-solver-launch-kicker">Hosted neural solver</div>
          <h2>Open CalculusSolver</h2>
          <p className="ai-solver-card-lead">
            Streamlit apps cannot be embedded in this site (browser frame
            blocking). Use the button below to launch the full neural solver in
            a new tab.
          </p>
          <a
            href={STREAMLIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ai-solver-open-btn"
            onClick={handleOpenSolver}
          >
            Open hosted solver →
          </a>
          <p className="ai-solver-host-note">
            If the hosted app is sleeping, Streamlit may take ~30s to wake up on
            first open.
          </p>
        </section>
      </div>

      <div className="ai-solver-info">
        <div className="ai-info-card">
          <div className="ai-info-icon">🧠</div>
          <div>
            <div className="ai-info-title">Neural Architecture</div>
            <div className="ai-info-desc">
              Tree-to-tree transformer with specialized rule heads for calculus
              operations (hosted tab).
            </div>
          </div>
        </div>
        <div className="ai-info-card">
          <div className="ai-info-icon">⚡</div>
          <div>
            <div className="ai-info-title">Instant Local Mode</div>
            <div className="ai-info-desc">
              Derivatives, integrals, simplify, and evaluate run in your browser
              so the page never freezes waiting on an embed.
            </div>
          </div>
        </div>
        <div className="ai-info-card">
          <div className="ai-info-icon">✅</div>
          <div>
            <div className="ai-info-title">Verified Answers</div>
            <div className="ai-info-desc">
              Hosted solutions are numerically verified at random test points
              using the SLaNg math library.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AISolver;
