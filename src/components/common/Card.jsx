import React from "react";
import "./Card.css";

/**
 * Scalable Card component with glassmorphic aesthetic, optional header, body, footer, and hover effects.
 */
export default function Card({
  children,
  header = null,
  footer = null,
  interactive = false,
  glass = true,
  glow = false,
  className = '',
  onClick,
  ...props
}) {
  return (
    <div
      className={`card-scalable ${glass ? 'card-glass' : 'card-solid'} ${
        interactive ? 'card-interactive' : ''
      } ${glow ? 'card-glow' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}
