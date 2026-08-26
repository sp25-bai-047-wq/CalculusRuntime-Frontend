import React from "react";
import { InlineMath } from "./Math";
import Badge from "../common/Badge";
import Button from "../common/Button";
import "./ConceptCard.css";

/**
 * Scalable ConceptCard for presenting calculus/math topics with formula preview and action links.
 */
export default function ConceptCard({
  title,
  subtitle = '',
  formulaLatex = '',
  description = '',
  difficulty = 'Medium', // 'Easy' | 'Medium' | 'Hard'
  tags = [],
  onStudy,
  onPractice,
  className = '',
}) {
  const difficultyVariant = {
    Easy: 'success',
    Medium: 'warning',
    Hard: 'danger',
  }[difficulty] || 'primary';

  return (
    <div className={`concept-card-scalable ${className}`}>
      <div className="concept-card-top">
        <div className="concept-title-group">
          <h3 className="concept-title">{title}</h3>
          {subtitle && <p className="concept-subtitle">{subtitle}</p>}
        </div>
        <Badge variant={difficultyVariant} size="sm">
          {difficulty}
        </Badge>
      </div>

      {formulaLatex && (
        <div className="concept-formula-box">
          <InlineMath math={formulaLatex} />
        </div>
      )}

      {description && <p className="concept-desc">{description}</p>}

      {tags.length > 0 && (
        <div className="concept-tags">
          {tags.map((tag, i) => (
            <span key={i} className="concept-tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="concept-actions">
        {onStudy && (
          <Button variant="secondary" size="sm" onClick={onStudy}>
            Study Guide
          </Button>
        )}
        {onPractice && (
          <Button variant="primary" size="sm" onClick={onPractice}>
            Practice Now
          </Button>
        )}
      </div>
    </div>
  );
}
