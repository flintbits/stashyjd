import React from "react";
import "./Button.css";

export default function Button({
  text = "Button",
  onClick,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  loading = false,
  variant = "primary",
}) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
      disabled={loading}
    >
      <span className={`btn-content ${loading ? "is-hidden" : ""}`}>
        {LeftIcon && (
          <span className="btn-icon btn-icon-left">
            <LeftIcon />
          </span>
        )}

        <span className="btn-label">{text}</span>

        {RightIcon && (
          <span className="btn-icon btn-icon-right">
            <RightIcon />
          </span>
        )}
      </span>

      {loading && (
        <span className="btn-spinner-overlay">
          <span className="btn-spinner"></span>
        </span>
      )}
    </button>
  );
}
