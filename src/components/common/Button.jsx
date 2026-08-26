import React from "react";
import "./Button.css";

/**
 * Scalable Button component supporting multiple variants, sizes, states and icons.
 */
export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size = 'md', // 'sm' | 'md' | 'lg'
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  onClick,
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`btn-scalable btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${
        loading ? 'btn-loading' : ''
      } ${className}`}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner" aria-hidden="true" />
      ) : (
        <>
          {iconLeft && <span className="btn-icon btn-icon-left">{iconLeft}</span>}
          <span className="btn-content">{children}</span>
          {iconRight && <span className="btn-icon btn-icon-right">{iconRight}</span>}
        </>
      )}
    </button>
  );
}
