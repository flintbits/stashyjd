import React from "react";
import "./SecondaryButton.css";

export default function SecondaryButton({
  text = "Button",
  onClick,
  Icon,
  style = {},
}) {
  return (
    <button onClick={onClick} className="secondary-button" style={{ ...style }}>
      {Icon && (
        <span class="icon">
          <Icon />
        </span>
      )}
      <span>{text}</span>
    </button>
  );
}
