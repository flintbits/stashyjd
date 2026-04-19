import React from "react";
import "./GradientButton.css";

export default function GradientButton({ text = "Button", onClick, Icon }) {
  return (
    <button onClick={onClick} className="gradient-button">
      {Icon && (
        <span class="icon">
          <Icon />
        </span>
      )}
      <span>{text}</span>
    </button>
  );
}
