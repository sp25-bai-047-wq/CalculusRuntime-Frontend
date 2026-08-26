import React, { useState } from "react";
import { InlineMath, BlockMath } from "./Math";
import Badge from "../common/Badge";
import "./StepByStepSolution.css";

/**
 * Scalable StepByStepSolution component for presenting calculus & math derivations clearly.
 */
export default function StepByStepSolution({
  title = 'Step-by-Step Solution',
  initialProblem = '',
  finalAnswer = '',
  steps = [], // array of { stepNumber: number, explanation: string, latex: string, rule: string }
  className = '',
}) {
  const [openSteps, setOpenSteps] = useState(
    steps.reduce((acc, _, idx) => ({ ...acc, [idx]: true }), {})
  );

  const toggleStep = (idx) => {
    setOpenSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const expandAll = () => {
    setOpenSteps(steps.reduce((acc, _, idx) => ({ ...acc, [idx]: true }), {}));
  };

  const collapseAll = () => {
    setOpenSteps({});
  };

  return (
    <div className={`step-solution-container ${className}`}>
      <div className="step-solution-header">
        <h3 className="step-solution-title">{title}</h3>
        <div className="step-solution-actions">
          <button type="button" onClick={expandAll} className="step-text-btn">
            Expand All
          </button>
          <span>|</span>
          <button type="button" onClick={collapseAll} className="step-text-btn">
            Collapse All
          </button>
        </div>
      </div>

      {initialProblem && (
        <div className="step-initial-problem">
          <span className="step-problem-label">Problem:</span>
          <BlockMath math={initialProblem} />
        </div>
      )}

      <div className="step-list">
        {steps.map((step, idx) => {
          const isOpen = !!openSteps[idx];
          return (
            <div key={idx} className={`step-card ${isOpen ? 'step-open' : 'step-closed'}`}>
              <div className="step-header" onClick={() => toggleStep(idx)}>
                <div className="step-header-left">
                  <span className="step-number-badge">{step.stepNumber || idx + 1}</span>
                  <span className="step-explanation-summary">{step.explanation}</span>
                </div>
                <div className="step-header-right">
                  {step.rule && <Badge variant="info" size="sm">{step.rule}</Badge>}
                  <span className="step-arrow">{isOpen ? '▲' : '▼'}</span>
                </div>
              </div>

              {isOpen && (
                <div className="step-content">
                  {step.latex && (
                    <div className="step-math-box">
                      <BlockMath math={step.latex} />
                    </div>
                  )}
                  {step.details && <p className="step-details-text">{step.details}</p>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {finalAnswer && (
        <div className="step-final-answer">
          <div className="final-answer-badge">Final Result</div>
          <div className="final-math">
            <InlineMath math={finalAnswer} />
          </div>
        </div>
      )}
    </div>
  );
}
