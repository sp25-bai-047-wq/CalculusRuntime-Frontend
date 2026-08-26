import React, { useState } from "react";
import Button from "../common/Button";
import "./MatrixGrid.css";

/**
 * Scalable interactive MatrixGrid component for Linear Algebra & Multivariable Calculus operations.
 */
export default function MatrixGrid({
  rows = 2,
  cols = 2,
  initialValues = null,
  onChange = null,
  readOnly = false,
  allowResize = true,
  maxRows = 5,
  maxCols = 5,
  label = 'Matrix A',
  className = '',
}) {
  const [rowCount, setRowCount] = useState(rows);
  const [colCount, setColCount] = useState(cols);
  const [matrix, setMatrix] = useState(() => {
    if (initialValues) return initialValues;
    return Array.from({ length: rows }, () => Array.from({ length: cols }, () => '0'));
  });

  const handleCellChange = (r, c, val) => {
    const next = matrix.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === r && cIdx === c ? val : cell))
    );
    setMatrix(next);
    if (onChange) onChange(next);
  };

  const handleResize = (newR, newC) => {
    const updated = Array.from({ length: newR }, (_, r) =>
      Array.from({ length: newC }, (_, c) => (matrix[r] && matrix[r][c] !== undefined ? matrix[r][c] : '0'))
    );
    setRowCount(newR);
    setColCount(newC);
    setMatrix(updated);
    if (onChange) onChange(updated);
  };

  const setZeroMatrix = () => {
    const updated = Array.from({ length: rowCount }, () => Array.from({ length: colCount }, () => '0'));
    setMatrix(updated);
    if (onChange) onChange(updated);
  };

  const setIdentityMatrix = () => {
    const updated = Array.from({ length: rowCount }, (_, r) =>
      Array.from({ length: colCount }, (_, c) => (r === c ? '1' : '0'))
    );
    setMatrix(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div className={`matrix-grid-container ${className}`}>
      <div className="matrix-header">
        <span className="matrix-label">{label} ({rowCount}×{colCount})</span>

        {allowResize && !readOnly && (
          <div className="matrix-size-controls">
            <label className="matrix-size-select-label">
              R:
              <select
                value={rowCount}
                onChange={(e) => handleResize(Number(e.target.value), colCount)}
                className="matrix-select"
              >
                {Array.from({ length: maxRows }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <label className="matrix-size-select-label">
              C:
              <select
                value={colCount}
                onChange={(e) => handleResize(rowCount, Number(e.target.value))}
                className="matrix-select"
              >
                {Array.from({ length: maxCols }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
      </div>

      <div className="matrix-wrapper">
        <div className="matrix-bracket matrix-bracket-left" />
        <div
          className="matrix-cells-grid"
          style={{
            gridTemplateColumns: `repeat(${colCount}, minmax(42px, 64px))`,
          }}
        >
          {matrix.map((row, r) =>
            row.map((val, c) => (
              <input
                key={`${r}-${c}`}
                type="text"
                value={val}
                readOnly={readOnly}
                onChange={(e) => handleCellChange(r, c, e.target.value)}
                className="matrix-cell-input"
              />
            ))
          )}
        </div>
        <div className="matrix-bracket matrix-bracket-right" />
      </div>

      {!readOnly && (
        <div className="matrix-actions">
          <Button variant="ghost" size="sm" onClick={setZeroMatrix}>
            Zero
          </Button>
          {rowCount === colCount && (
            <Button variant="ghost" size="sm" onClick={setIdentityMatrix}>
              Identity
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
