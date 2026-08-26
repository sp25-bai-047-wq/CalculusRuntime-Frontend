import React from "react";
import "./Input.css";

/**
 * Scalable Input component with label, error, helper text, and icon support.
 */
export default function Input({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  helperText = '',
  iconLeft = null,
  iconRight = null,
  disabled = false,
  fullWidth = true,
  className = '',
  ...props
}) {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className={`input-group ${fullWidth ? 'input-group-full' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <div className={`input-wrapper ${error ? 'input-error-state' : ''} ${disabled ? 'input-disabled' : ''}`}>
        {iconLeft && <span className="input-icon input-icon-left">{iconLeft}</span>}
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="input-field"
          {...props}
        />
        {iconRight && <span className="input-icon input-icon-right">{iconRight}</span>}
      </div>
      {error && <span className="input-error-message">{error}</span>}
      {!error && helperText && <span className="input-helper-text">{helperText}</span>}
    </div>
  );
}
