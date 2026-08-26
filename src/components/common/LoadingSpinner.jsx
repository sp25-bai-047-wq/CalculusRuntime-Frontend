import React from "react";
import "./LoadingSpinner.css";

/**
 * Scalable LoadingSpinner component with custom text, sizes, and colors.
 */
export default function LoadingSpinner({
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  color = 'primary', // 'primary' | 'secondary' | 'white'
  text = '',
  fullPage = false,
  className = '',
}) {
  const content = (
    <div className={`spinner-wrapper spinner-${size} ${className}`}>
      <div className={`spinner-circle spinner-color-${color}`} />
      {text && <span className="spinner-text">{text}</span>}
    </div>
  );

  if (fullPage) {
    return <div className="spinner-full-page">{content}</div>;
  }

  return content;
}
