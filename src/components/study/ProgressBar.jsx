import React from "react";
import "./ProgressBar.css";

/**
 * Scalable ProgressBar component with animated stripes, percentage labels, and milestone indicators.
 */
export default function ProgressBar({
  progress = 0, // 0 to 100
  label = '',
  showPercentage = true,
  variant = 'primary', // 'primary' | 'success' | 'warning' | 'purple'
  height = '8px',
  striped = false,
  animated = false,
  milestones = [], // array of { percent: number, label: string }
  className = '',
}) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`progress-bar-container ${className}`}>
      {(label || showPercentage) && (
        <div className="progress-bar-meta">
          {label && <span className="progress-label">{label}</span>}
          {showPercentage && <span className="progress-percentage">{Math.round(clampedProgress)}%</span>}
        </div>
      )}
      <div className="progress-track" style={{ height }}>
        <div
          className={`progress-fill progress-${variant} ${striped ? 'progress-striped' : ''} ${
            animated ? 'progress-animated' : ''
          }`}
          style={{ width: `${clampedProgress}%` }}
        />
        {milestones.map((m, idx) => (
          <div
            key={idx}
            className={`progress-milestone ${clampedProgress >= m.percent ? 'milestone-reached' : ''}`}
            style={{ left: `${m.percent}%` }}
            title={m.label || `${m.percent}%`}
          >
            <div className="milestone-dot" />
          </div>
        ))}
      </div>
    </div>
  );
}
