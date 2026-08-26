import React from "react";
import "./Badge.css";

/**
 * Scalable Badge / Tag component with various status colors and styles.
 */
export default function Badge({
  children,
  variant = 'primary', // 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  outline = false,
  size = 'md', // 'sm' | 'md'
  icon = null,
  className = '',
}) {
  return (
    <span
      className={`badge-scalable badge-${variant} badge-${size} ${
        outline ? 'badge-outline' : ''
      } ${className}`}
    >
      {icon && <span className="badge-icon">{icon}</span>}
      {children}
    </span>
  );
}
