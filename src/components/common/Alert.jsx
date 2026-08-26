import React, { useState } from "react";
import "./Alert.css";

/**
 * Scalable Alert banner component for notices, hints, errors, successes.
 */
export default function Alert({
  children,
  title = null,
  variant = 'info', // 'info' | 'success' | 'warning' | 'danger'
  dismissible = false,
  onDismiss,
  icon = null,
  className = '',
}) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) onDismiss();
  };

  const defaultIcons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    danger: '🛑',
  };

  return (
    <div className={`alert-scalable alert-${variant} ${className}`} role="alert">
      <div className="alert-icon-container">{icon || defaultIcons[variant]}</div>
      <div className="alert-content-container">
        {title && <div className="alert-title">{title}</div>}
        <div className="alert-message">{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          className="alert-dismiss-btn"
          onClick={handleDismiss}
          aria-label="Dismiss alert"
        >
          &times;
        </button>
      )}
    </div>
  );
}
