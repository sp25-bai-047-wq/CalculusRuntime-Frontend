import React, { useState, useMemo, useEffect, useCallback } from "react";
import * as math from "mathjs";

const MAX_SIZE = 10;
const MIN_SIZE = 1;
const MAX_MATRICES = 10;
const MIN_MATRICES = 1;
const LABELS = "ABCDEFGHIJ".split("");

const makeGrid = (rows, cols, fill = 0) =>
  Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));

const identityGrid = (n) =>
  Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );

const defaultMatrix = (label = "A") => ({
  label,
  rows: 3,
  cols: 3,
  grid: [
    [2, 1, 0],
    [0, 2, 1],
    [0, 0, 2],
  ],
});

const fmt = (v) => {
  if (typeof v !== "number" || !isFinite(v)) return "—";
  const r = Math.round(v * 1000) / 1000;
  return Object.is(r, -0) ? "0" : String(r);
};

const toNumeric = (grid) =>
  grid.map((row) => row.map((v) => (v === "" || v === undefined || Number.isNaN(Number(v)) ? 0 : Number(v))));

function toFraction(x) {
  try {
    return math.fraction(math.round(x, 6)).toFraction(true);
  } catch {
    return fmt(x);
  }
}

function resizeGrid(prev, newRows, newCols) {
  const r = Math.min(MAX_SIZE, Math.max(MIN_SIZE, newRows));
  const c = Math.min(MAX_SIZE, Math.max(MIN_SIZE, newCols));
  const next = makeGrid(r, c, 0);
  for (let i = 0; i < Math.min(r, prev.length); i++) {
    for (let j = 0; j < Math.min(c, prev[0]?.length || 0); j++) {
      next[i][j] = prev[i][j];
    }
  }
  return { rows: r, cols: c, grid: next };
}

/** Gaussian elimination to RREF with a human-readable step log. */
function rrefWithSteps(input) {
  const M = input.map((row) => row.slice());
  const rows = M.length;
  const cols = M[0]?.length || 0;
  const steps = [];
  let pivotRow = 0;

  for (let col = 0; col < cols && pivotRow < rows; col++) {
    let sel = -1;
    let best = 1e-9;
    for (let r = pivotRow; r < rows; r++) {
      if (Math.abs(M[r][col]) > best) {
        best = Math.abs(M[r][col]);
        sel = r;
      }
    }
    if (sel === -1) continue;

    if (sel !== pivotRow) {
      [M[sel], M[pivotRow]] = [M[pivotRow], M[sel]];
      steps.push({
        text: `Swap R${sel + 1} ↔ R${pivotRow + 1} to bring a nonzero entry into the pivot position (column ${col + 1}).`,
        grid: M.map((r) => r.slice()),
      });
    }

    const pivotVal = M[pivotRow][col];
    if (Math.abs(pivotVal - 1) > 1e-9) {
      M[pivotRow] = M[pivotRow].map((v) => v / pivotVal);
      steps.push({
        text: `Scale R${pivotRow + 1} by 1/${toFraction(pivotVal)} to make the pivot in column ${col + 1} equal to 1.`,
        grid: M.map((r) => r.slice()),
      });
    }

    for (let r = 0; r < rows; r++) {
      if (r === pivotRow) continue;
      const factor = M[r][col];
      const pr = pivotRow;
      if (Math.abs(factor) > 1e-9) {
        M[r] = M[r].map((v, c) => v - factor * M[pr][c]);
        steps.push({
          text: `R${r + 1} → R${r + 1} − (${toFraction(factor)})·R${pr + 1} to clear column ${col + 1} above/below the pivot.`,
          grid: M.map((row) => row.slice()),
        });
      }
    }

    pivotRow++;
  }

  return { result: M, steps, rank: pivotRow };
}

function frobeniusNorm(M) {
  let s = 0;
  for (const row of M) for (const v of row) s += v * v;
  return Math.sqrt(s);
}

function matrixPower(M, n) {
  const k = Math.trunc(Number(n));
  if (!Number.isFinite(k) || k < 0) throw new Error("Power must be a non-negative integer.");
  if (M.length !== M[0].length) throw new Error("Power requires a square matrix.");
  if (k === 0) return identityGrid(M.length);
  let acc = M.map((r) => r.slice());
  for (let i = 1; i < k; i++) acc = math.multiply(acc, M);
  return acc;
}

function MatrixGrid({ grid, onChange, editable = true, label, highlightCol = -1 }) {
  const cols = grid[0]?.length || 1;
  return (
    <div className="ms-matrix">
      {label ? <div className="ms-matrix-label">{label}</div> : null}
      <div
        className="ms-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(${cols >= 8 ? "2.4rem" : "3.2rem"}, 1fr))`,
          maxWidth: "100%",
          overflowX: "auto",
        }}
      >
        {grid.map((row, i) =>
          row.map((val, j) => (
            <input
              key={`${i}-${j}`}
              className={"ms-cell" + (j === highlightCol ? " ms-cell-hl" : "")}
              type="number"
              value={val}
              disabled={!editable}
              onChange={(e) => {
                if (!onChange) return;
                const next = grid.map((r) => r.slice());
                const parsed = e.target.value === "" ? "" : Number(e.target.value);
                next[i][j] = parsed;
                onChange(next);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

function MatrixSandbox() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Matrix Sandbox · CalcVoyager";
    return () => {
      document.title = previous;
    };
  }, []);

  const [matrices, setMatrices] = useState(() => [defaultMatrix("A"), defaultMatrix("B")]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [leftIdx, setLeftIdx] = useState(0);
  const [rightIdx, setRightIdx] = useState(1);
  const [activeTab, setActiveTab] = useState("rref");
  const [scalar, setScalar] = useState(2);
  const [powerN, setPowerN] = useState(2);
  const [stepIndex, setStepIndex] = useState(0);

  const active = matrices[activeIdx] || matrices[0];
  const left = matrices[leftIdx] || matrices[0];
  const right = matrices[rightIdx] || matrices[Math.min(1, matrices.length - 1)];

  const updateMatrix = useCallback((idx, patch) => {
    setMatrices((prev) => prev.map((m, i) => (i === idx ? { ...m, ...patch } : m)));
    setStepIndex(0);
  }, []);

  const resizeActive = (newRows, newCols) => {
    const sized = resizeGrid(active.grid, newRows, newCols);
    updateMatrix(activeIdx, sized);
  };

  const addMatrix = () => {
    if (matrices.length >= MAX_MATRICES) return;
    const label = LABELS[matrices.length] || `M${matrices.length + 1}`;
    setMatrices((prev) => [...prev, { ...defaultMatrix(label), label }]);
  };

  const removeMatrix = (idx) => {
    if (matrices.length <= MIN_MATRICES) return;
    setMatrices((prev) => {
      const next = prev.filter((_, i) => i !== idx).map((m, i) => ({ ...m, label: LABELS[i] || m.label }));
      return next;
    });
    setActiveIdx((i) => Math.min(i, matrices.length - 2));
    setLeftIdx((i) => Math.min(i, matrices.length - 2));
    setRightIdx((i) => Math.min(Math.max(0, i === idx ? 0 : i > idx ? i - 1 : i), matrices.length - 2));
    setStepIndex(0);
  };

  const numericActive = useMemo(() => toNumeric(active.grid), [active.grid]);
  const numericLeft = useMemo(() => toNumeric(left.grid), [left.grid]);
  const numericRight = useMemo(() => toNumeric(right.grid), [right.grid]);
  const isSquare = active.rows === active.cols;

  const rref = useMemo(() => rrefWithSteps(numericActive), [numericActive]);

  const determinant = useMemo(() => {
    if (!isSquare) return null;
    try {
      return math.det(numericActive);
    } catch {
      return null;
    }
  }, [numericActive, isSquare]);

  const inverse = useMemo(() => {
    if (!isSquare) return null;
    try {
      if (Math.abs(determinant) < 1e-9) return "singular";
      return math.inv(numericActive);
    } catch {
      return "singular";
    }
  }, [numericActive, isSquare, determinant]);

  const transpose = useMemo(() => math.transpose(numericActive), [numericActive]);

  const scaled = useMemo(
    () => numericActive.map((row) => row.map((v) => v * (Number(scalar) || 0))),
    [numericActive, scalar]
  );

  const trace = useMemo(() => {
    if (!isSquare) return null;
    try {
      return math.trace(numericActive);
    } catch {
      return null;
    }
  }, [numericActive, isSquare]);

  const frob = useMemo(() => frobeniusNorm(numericActive), [numericActive]);

  const powered = useMemo(() => {
    try {
      return { ok: true, grid: matrixPower(numericActive, powerN) };
    } catch (e) {
      return { ok: false, error: e.message || "Power failed." };
    }
  }, [numericActive, powerN]);

  const eigenvalues = useMemo(() => {
    if (!isSquare) return { ok: false, error: "Eigenvalues require a square matrix." };
    try {
      const e = math.eigs(numericActive);
      const vals = (e.values || []).map((v) => {
        if (typeof v === "number") return fmt(v);
        if (v && typeof v === "object" && "re" in v) {
          const re = fmt(v.re);
          const im = Number(v.im) || 0;
          if (Math.abs(im) < 1e-9) return re;
          return `${re}${im >= 0 ? "+" : ""}${fmt(im)}i`;
        }
        return String(v);
      });
      return { ok: true, values: vals };
    } catch (err) {
      return { ok: false, error: err.message || "Could not compute eigenvalues." };
    }
  }, [numericActive, isSquare]);

  const multiply = useMemo(() => {
    const aCols = numericLeft[0]?.length || 0;
    const bRows = numericRight.length;
    if (aCols !== bRows) {
      return {
        ok: false,
        error: `Inner sizes must match: ${left.label} is ${left.rows}×${left.cols}, ${right.label} is ${right.rows}×${right.cols}. Need cols(${left.label}) = rows(${right.label}).`,
      };
    }
    try {
      const product = math.multiply(numericLeft, numericRight);
      return { ok: true, grid: product };
    } catch (e) {
      return { ok: false, error: e.message || "Multiplication failed." };
    }
  }, [numericLeft, numericRight, left, right]);

  const add = useMemo(() => {
    if (left.rows !== right.rows || left.cols !== right.cols) {
      return {
        ok: false,
        error: `Addition needs equal sizes. ${left.label} is ${left.rows}×${left.cols}, ${right.label} is ${right.rows}×${right.cols}.`,
      };
    }
    try {
      return { ok: true, grid: math.add(numericLeft, numericRight) };
    } catch (e) {
      return { ok: false, error: e.message || "Addition failed." };
    }
  }, [numericLeft, numericRight, left, right]);

  const subtract = useMemo(() => {
    if (left.rows !== right.rows || left.cols !== right.cols) {
      return {
        ok: false,
        error: `Subtraction needs equal sizes. ${left.label} is ${left.rows}×${left.cols}, ${right.label} is ${right.rows}×${right.cols}.`,
      };
    }
    try {
      return { ok: true, grid: math.subtract(numericLeft, numericRight) };
    } catch (e) {
      return { ok: false, error: e.message || "Subtraction failed." };
    }
  }, [numericLeft, numericRight, left, right]);

  const hadamard = useMemo(() => {
    if (left.rows !== right.rows || left.cols !== right.cols) {
      return {
        ok: false,
        error: `Hadamard product needs equal sizes. ${left.label} is ${left.rows}×${left.cols}, ${right.label} is ${right.rows}×${right.cols}.`,
      };
    }
    try {
      const grid = numericLeft.map((row, i) => row.map((v, j) => v * numericRight[i][j]));
      return { ok: true, grid };
    } catch (e) {
      return { ok: false, error: e.message || "Hadamard product failed." };
    }
  }, [numericLeft, numericRight, left, right]);

  const currentStepGrid = rref.steps.length
    ? stepIndex === 0
      ? numericActive
      : rref.steps[stepIndex - 1].grid
    : numericActive;

  const unaryTabs = [
    { id: "rref", label: "RREF" },
    { id: "det", label: "Determinant" },
    { id: "inverse", label: "Inverse" },
    { id: "transpose", label: "Transpose" },
    { id: "scalar", label: "Scalar ·" },
    { id: "trace", label: "Trace" },
    { id: "power", label: "Power Aⁿ" },
    { id: "norm", label: "‖A‖F" },
    { id: "eigen", label: "Eigenvalues" },
  ];

  const binaryTabs = [
    { id: "multiply", label: "Multiply" },
    { id: "add", label: "Add" },
    { id: "subtract", label: "Subtract" },
    { id: "hadamard", label: "Hadamard ⊙" },
  ];

  const isBinary = binaryTabs.some((t) => t.id === activeTab);

  const MatrixPicker = ({ value, onChange, label }) => (
    <label className="ms-size-label">
      {label}
      <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
        {matrices.map((m, i) => (
          <option key={m.label} value={i}>
            {m.label} ({m.rows}×{m.cols})
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <div className="ms-page">
      <div className="ms-container">
        <h1 className="ms-title">Matrix Sandbox</h1>
        <div className="ms-subtitle">
          Store up to {MAX_MATRICES} matrices, multiply and combine them, and explore RREF, determinants, inverses,
          eigenvalues, and more — with every row-reduction step shown.
        </div>

        <div className="ms-slot-bar">
          {matrices.map((m, i) => (
            <button
              key={m.label}
              type="button"
              className={"ms-slot" + (i === activeIdx ? " ms-slot-active" : "")}
              onClick={() => {
                setActiveIdx(i);
                setStepIndex(0);
              }}
            >
              {m.label}
              <span className="ms-slot-size">
                {m.rows}×{m.cols}
              </span>
            </button>
          ))}
          <button
            type="button"
            className="ms-btn ms-btn-ghost"
            onClick={addMatrix}
            disabled={matrices.length >= MAX_MATRICES}
            title={matrices.length >= MAX_MATRICES ? `Maximum ${MAX_MATRICES} matrices` : "Add matrix"}
          >
            + Add matrix
          </button>
          <button
            type="button"
            className="ms-btn ms-btn-ghost"
            onClick={() => removeMatrix(activeIdx)}
            disabled={matrices.length <= MIN_MATRICES}
            title="Remove active matrix"
          >
            Remove
          </button>
        </div>

        <div className="ms-controls">
          <label className="ms-size-label">
            Rows
            <input
              type="number"
              min={MIN_SIZE}
              max={MAX_SIZE}
              value={active.rows}
              onChange={(e) => resizeActive(Number(e.target.value) || MIN_SIZE, active.cols)}
            />
          </label>
          <label className="ms-size-label">
            Columns
            <input
              type="number"
              min={MIN_SIZE}
              max={MAX_SIZE}
              value={active.cols}
              onChange={(e) => resizeActive(active.rows, Number(e.target.value) || MIN_SIZE)}
            />
          </label>
          <button
            type="button"
            className="ms-btn ms-btn-ghost"
            onClick={() => updateMatrix(activeIdx, { grid: makeGrid(active.rows, active.cols, 0) })}
          >
            Clear
          </button>
          <button
            type="button"
            className="ms-btn ms-btn-ghost"
            onClick={() => isSquare && updateMatrix(activeIdx, { grid: identityGrid(active.rows) })}
            disabled={!isSquare}
            title={isSquare ? "Load identity matrix" : "Only available for square matrices"}
          >
            Identity
          </button>
          <span className="ms-count-hint">
            {matrices.length} / {MAX_MATRICES} matrices
          </span>
        </div>

        <MatrixGrid
          grid={active.grid}
          onChange={(g) => updateMatrix(activeIdx, { grid: g })}
          label={`${active.label} (${active.rows}×${active.cols}) — edit active matrix`}
        />

        <div className="ms-tabs-label">Unary ops (use active matrix)</div>
        <div className="ms-tabs">
          {unaryTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              className={"ms-tab" + (activeTab === t.id ? " ms-tab-active" : "")}
              onClick={() => {
                setActiveTab(t.id);
                setStepIndex(0);
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="ms-tabs-label">Binary ops (pick left &amp; right)</div>
        <div className="ms-tabs">
          {binaryTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              className={"ms-tab" + (activeTab === t.id ? " ms-tab-active" : "")}
              onClick={() => {
                setActiveTab(t.id);
                setStepIndex(0);
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {isBinary && (
          <div className="ms-controls ms-binary-pickers">
            <MatrixPicker value={leftIdx} onChange={setLeftIdx} label="Left" />
            <MatrixPicker value={rightIdx} onChange={setRightIdx} label="Right" />
          </div>
        )}

        <div className="ms-panel">
          {activeTab === "rref" && (
            <>
              <div className="ms-panel-title">Row reduction of {active.label}, one step at a time</div>
              <MatrixGrid
                grid={currentStepGrid}
                editable={false}
                label={stepIndex === 0 ? "Starting matrix" : `After step ${stepIndex}`}
              />
              {rref.steps.length > 0 ? (
                <>
                  <div className="ms-step-text">
                    {stepIndex === 0
                      ? 'Click "Next step" to begin row-reducing toward RREF.'
                      : rref.steps[stepIndex - 1].text}
                  </div>
                  <div className="ms-step-nav">
                    <button
                      type="button"
                      className="ms-btn"
                      disabled={stepIndex === 0}
                      onClick={() => setStepIndex((s) => Math.max(0, s - 1))}
                    >
                      ← Prev step
                    </button>
                    <span className="ms-step-count">
                      {stepIndex} / {rref.steps.length}
                    </span>
                    <button
                      type="button"
                      className="ms-btn"
                      disabled={stepIndex >= rref.steps.length}
                      onClick={() => setStepIndex((s) => Math.min(rref.steps.length, s + 1))}
                    >
                      Next step →
                    </button>
                  </div>
                </>
              ) : (
                <div className="ms-step-text">This matrix is already in reduced row-echelon form.</div>
              )}
              <div className="ms-note">
                Rank of {active.label} (pivot rows): <strong>{rref.rank}</strong>
                {isSquare ? (
                  <>
                    {" "}
                    · Nullity: <strong>{active.cols - rref.rank}</strong>
                  </>
                ) : null}
              </div>
            </>
          )}

          {activeTab === "det" && (
            <>
              <div className="ms-panel-title">Determinant of {active.label}</div>
              {isSquare ? (
                <div className="ms-result-big">
                  det({active.label}) = {fmt(determinant)}
                </div>
              ) : (
                <div className="ms-step-text">The determinant is only defined for square matrices. Set rows = columns first.</div>
              )}
            </>
          )}

          {activeTab === "inverse" && (
            <>
              <div className="ms-panel-title">Inverse of {active.label}</div>
              {!isSquare ? (
                <div className="ms-step-text">The inverse is only defined for square matrices.</div>
              ) : inverse === "singular" ? (
                <div className="ms-step-text">
                  det({active.label}) = {fmt(determinant)} ≈ 0, so {active.label} is singular — no inverse exists.
                </div>
              ) : (
                <MatrixGrid grid={inverse.map((row) => row.map(fmt))} editable={false} label={`${active.label}⁻¹`} />
              )}
            </>
          )}

          {activeTab === "transpose" && (
            <>
              <div className="ms-panel-title">Transpose of {active.label}</div>
              <MatrixGrid
                grid={transpose}
                editable={false}
                label={`${active.label}ᵀ (${active.cols}×${active.rows})`}
              />
            </>
          )}

          {activeTab === "scalar" && (
            <>
              <div className="ms-panel-title">Scalar multiply {active.label}</div>
              <label className="ms-size-label" style={{ margin: "0 auto 0.75rem" }}>
                k
                <input type="number" value={scalar} onChange={(e) => setScalar(e.target.value)} />
              </label>
              <MatrixGrid grid={scaled.map((row) => row.map(fmt))} editable={false} label={`${scalar}·${active.label}`} />
            </>
          )}

          {activeTab === "trace" && (
            <>
              <div className="ms-panel-title">Trace of {active.label}</div>
              {isSquare ? (
                <div className="ms-result-big">
                  tr({active.label}) = {fmt(trace)}
                </div>
              ) : (
                <div className="ms-step-text">Trace is the sum of diagonal entries — only defined for square matrices.</div>
              )}
            </>
          )}

          {activeTab === "power" && (
            <>
              <div className="ms-panel-title">
                Matrix power {active.label}
                <sup>n</sup>
              </div>
              <label className="ms-size-label" style={{ margin: "0 auto 0.75rem" }}>
                n (non-negative integer)
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={powerN}
                  onChange={(e) => setPowerN(e.target.value)}
                />
              </label>
              {powered.ok ? (
                <MatrixGrid
                  grid={powered.grid.map((row) => row.map(fmt))}
                  editable={false}
                  label={`${active.label}^${Math.trunc(Number(powerN)) || 0}`}
                />
              ) : (
                <div className="ms-step-text">{powered.error}</div>
              )}
            </>
          )}

          {activeTab === "norm" && (
            <>
              <div className="ms-panel-title">Frobenius norm of {active.label}</div>
              <div className="ms-result-big">
                ‖{active.label}‖<sub>F</sub> = {fmt(frob)}
              </div>
              <div className="ms-note">√(sum of squares of all entries) — the “vector length” of the matrix.</div>
            </>
          )}

          {activeTab === "eigen" && (
            <>
              <div className="ms-panel-title">Eigenvalues of {active.label}</div>
              {eigenvalues.ok ? (
                <div className="ms-eigen-list">
                  {eigenvalues.values.map((v, i) => (
                    <div key={i} className="ms-eigen-item">
                      λ<sub>{i + 1}</sub> = {v}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="ms-step-text">{eigenvalues.error}</div>
              )}
            </>
          )}

          {activeTab === "multiply" && (
            <>
              <div className="ms-panel-title">
                Product {left.label}
                {right.label}
              </div>
              {multiply.ok ? (
                <MatrixGrid
                  grid={multiply.grid.map((row) => row.map(fmt))}
                  editable={false}
                  label={`${left.label}${right.label} (${left.rows}×${right.cols})`}
                />
              ) : (
                <div className="ms-step-text">{multiply.error}</div>
              )}
            </>
          )}

          {activeTab === "add" && (
            <>
              <div className="ms-panel-title">
                Sum {left.label} + {right.label}
              </div>
              {add.ok ? (
                <MatrixGrid
                  grid={add.grid.map((row) => row.map(fmt))}
                  editable={false}
                  label={`${left.label}+${right.label}`}
                />
              ) : (
                <div className="ms-step-text">{add.error}</div>
              )}
            </>
          )}

          {activeTab === "subtract" && (
            <>
              <div className="ms-panel-title">
                Difference {left.label} − {right.label}
              </div>
              {subtract.ok ? (
                <MatrixGrid
                  grid={subtract.grid.map((row) => row.map(fmt))}
                  editable={false}
                  label={`${left.label}−${right.label}`}
                />
              ) : (
                <div className="ms-step-text">{subtract.error}</div>
              )}
            </>
          )}

          {activeTab === "hadamard" && (
            <>
              <div className="ms-panel-title">
                Hadamard (entrywise) {left.label} ⊙ {right.label}
              </div>
              {hadamard.ok ? (
                <MatrixGrid
                  grid={hadamard.grid.map((row) => row.map(fmt))}
                  editable={false}
                  label={`${left.label}⊙${right.label}`}
                />
              ) : (
                <div className="ms-step-text">{hadamard.error}</div>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
                .ms-page {
                    --ms-teal: #a0720a;
                    --ms-gold: #c89318;
                    --ms-ink: #16120a;
                    --ms-muted: #5c4f3a;
                    --ms-card: #fdf8f0;
                    --ms-soft: #f4ede0;
                    --ms-line: #d4c4a8;
                    --ms-shadow: 0 8px 32px rgba(21,16,12,0.10);
                    min-height: 100vh;
                    background: var(--paper, #f4ede0);
                    padding: clamp(1.5rem, 5vw, 3.5rem) clamp(1rem, 4vw, 3rem);
                }
                [data-theme="dark"] .ms-page {
                    --ms-ink: #f5f0e8;
                    --ms-muted: #b5a98e;
                    --ms-card: #1e1a14;
                    --ms-soft: #17130d;
                    --ms-line: #3a3020;
                }
                .ms-container { max-width: 860px; margin: 0 auto; }
                .ms-title {
                    font-family: Georgia, serif;
                    font-size: clamp(2rem, 6vw, 3.2rem);
                    color: var(--ms-ink);
                    margin: 0;
                    text-align: center;
                    font-weight: 700;
                }
                .ms-subtitle {
                    color: var(--ms-muted);
                    text-align: center;
                    margin: 0.8rem auto 1.5rem;
                    max-width: 560px;
                    line-height: 1.6;
                }
                .ms-slot-bar {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                .ms-slot {
                    display: inline-flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.1rem;
                    min-width: 2.8rem;
                    padding: 0.4rem 0.65rem;
                    border-radius: 8px;
                    border: 1px solid var(--ms-line);
                    background: var(--ms-card);
                    color: var(--ms-ink);
                    cursor: pointer;
                    font-weight: 700;
                }
                .ms-slot-size { font-size: 0.65rem; font-weight: 500; color: var(--ms-muted); }
                .ms-slot-active {
                    background: var(--ms-teal);
                    border-color: var(--ms-teal);
                    color: #fff;
                }
                .ms-slot-active .ms-slot-size { color: rgba(255,255,255,0.85); }
                .ms-count-hint {
                    font-size: 0.8rem;
                    color: var(--ms-muted);
                    align-self: center;
                    margin-left: 0.25rem;
                }
                .ms-controls {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                    align-items: end;
                    justify-content: center;
                    margin-bottom: 1.25rem;
                }
                .ms-binary-pickers { margin-top: -0.25rem; margin-bottom: 1rem; }
                .ms-size-label {
                    display: flex;
                    flex-direction: column;
                    font-size: 0.75rem;
                    color: var(--ms-muted);
                    gap: 0.25rem;
                }
                .ms-size-label input, .ms-size-label select {
                    width: 5.5rem;
                    padding: 0.4rem 0.5rem;
                    border: 1px solid var(--ms-line);
                    border-radius: 6px;
                    background: var(--ms-card);
                    color: var(--ms-ink);
                }
                .ms-size-label select { width: 7.5rem; }
                .ms-btn {
                    padding: 0.5rem 0.9rem;
                    border-radius: 6px;
                    border: 1px solid var(--ms-teal);
                    background: var(--ms-teal);
                    color: #fff;
                    font-weight: 600;
                    cursor: pointer;
                }
                .ms-btn:disabled { opacity: 0.4; cursor: not-allowed; }
                .ms-btn-ghost {
                    background: transparent;
                    color: var(--ms-teal);
                }
                .ms-matrix { margin: 0 auto 1.5rem; display: flex; flex-direction: column; align-items: center; }
                .ms-matrix-label { font-size: 0.8rem; color: var(--ms-muted); margin-bottom: 0.5rem; font-weight: 600; text-align: center; }
                .ms-grid {
                    display: grid;
                    gap: 0.4rem;
                    background: var(--ms-card);
                    border: 1px solid var(--ms-line);
                    border-radius: 10px;
                    padding: 0.9rem;
                    box-shadow: var(--ms-shadow);
                }
                .ms-cell {
                    width: 100%;
                    text-align: center;
                    padding: 0.5rem 0.3rem;
                    border: 1px solid var(--ms-line);
                    border-radius: 6px;
                    background: var(--ms-soft);
                    color: var(--ms-ink);
                    font-size: 0.95rem;
                }
                .ms-cell:disabled { opacity: 0.85; }
                .ms-cell-hl { border-color: var(--ms-gold); box-shadow: 0 0 0 2px var(--ms-gold) inset; }
                .ms-tabs-label {
                    text-align: center;
                    font-size: 0.75rem;
                    color: var(--ms-muted);
                    margin: 0.35rem 0 0.4rem;
                    letter-spacing: 0.02em;
                }
                .ms-tabs {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    justify-content: center;
                    margin-bottom: 0.65rem;
                }
                .ms-tab {
                    padding: 0.45rem 0.85rem;
                    border-radius: 999px;
                    border: 1px solid var(--ms-line);
                    background: var(--ms-card);
                    color: var(--ms-muted);
                    font-size: 0.85rem;
                    cursor: pointer;
                }
                .ms-tab-active {
                    background: var(--ms-teal);
                    border-color: var(--ms-teal);
                    color: #fff;
                    font-weight: 600;
                }
                .ms-panel {
                    background: var(--ms-card);
                    border: 1px solid var(--ms-line);
                    border-radius: 12px;
                    padding: 1.25rem 1.4rem;
                    box-shadow: var(--ms-shadow);
                    margin-top: 0.5rem;
                }
                .ms-panel-title {
                    font-family: Georgia, serif;
                    font-size: 1.1rem;
                    color: var(--ms-ink);
                    margin-bottom: 0.9rem;
                    text-align: center;
                }
                .ms-step-text {
                    color: var(--ms-muted);
                    line-height: 1.6;
                    text-align: center;
                    margin: 0.75rem 0;
                }
                .ms-step-nav {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    margin-top: 0.75rem;
                }
                .ms-step-count { color: var(--ms-muted); font-size: 0.85rem; }
                .ms-note { text-align: center; color: var(--ms-muted); margin-top: 1rem; font-size: 0.9rem; }
                .ms-result-big {
                    text-align: center;
                    font-size: 1.4rem;
                    font-weight: 700;
                    color: var(--ms-ink);
                    padding: 1rem 0;
                }
                .ms-eigen-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.45rem;
                    align-items: center;
                    padding: 0.5rem 0 0.25rem;
                }
                .ms-eigen-item {
                    font-size: 1.05rem;
                    font-weight: 600;
                    color: var(--ms-ink);
                    font-variant-numeric: tabular-nums;
                }
            `}</style>
    </div>
  );
}

export default MatrixSandbox;
