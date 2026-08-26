import React, { useState } from "react";
import { BlockMath } from "./Math";
import Button from "../common/Button";
import "./FormulaViewer.css";

/**
 * Scalable FormulaViewer with KaTeX rendering, copy-to-clipboard LaTeX, and expandable explanation.
 */
export default function FormulaViewer({
  title = '',
  latex = '',
  description = '',
  breakdown = [], // array of { symbol: string, meaning: string }
  className = '',
}) {
  const [copied, setCopied] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(latex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`formula-viewer-scalable ${className}`}>
      {title && <div className="formula-viewer-title">{title}</div>}

      <div className="formula-display-area">
        <BlockMath math={latex} />
        <button
          type="button"
          className="formula-copy-btn"
          onClick={handleCopy}
          title="Copy LaTeX"
        >
          {copied ? '✓ Copied' : 'Copy LaTeX'}
        </button>
      </div>

      {description && <p className="formula-description">{description}</p>}

      {breakdown.length > 0 && (
        <div className="formula-breakdown-section">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowExplanation(!showExplanation)}
            className="formula-toggle-btn"
          >
            {showExplanation ? '▲ Hide Variable Breakdown' : '▼ View Variable Breakdown'}
          </Button>

          {showExplanation && (
            <div className="formula-breakdown-list">
              {breakdown.map((item, idx) => (
                <div key={idx} className="formula-breakdown-item">
                  <span className="breakdown-symbol">{item.symbol}</span>
                  <span className="breakdown-sep">:</span>
                  <span className="breakdown-meaning">{item.meaning}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
