import React from "react";
import "./GradientButton.css";

export default function GradientButton({
  text = "Button",
  onClick,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  loading = false,
}) {
  return (
    <button onClick={onClick} className="gradient-button" disabled={loading}>
      <span className={`button-content ${loading ? "hidden" : ""}`}>
        {LeftIcon && (
          <span className="icon left-icon">
            <LeftIcon />
          </span>
        )}

        <span>{text}</span>

        {RightIcon && (
          <span className="icon right-icon">
            <RightIcon />
          </span>
        )}
      </span>

      {loading && (
        <span className="spinner-overlay">
          <span className="spinner"></span>
        </span>
      )}
    </button>
  );
}
