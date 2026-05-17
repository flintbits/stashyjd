import React, { useState } from "react";
import "./LabeledToggle.css";

export default function LabeledToggle({
  label = "Enable feature",
  defaultChecked = true,
  onChange,
}) {
  const [enabled, setEnabled] = useState(defaultChecked);

  const handleToggle = () => {
    const next = !enabled;
    setEnabled(next);
    onChange?.(next);
  };

  return (
    <div className="toggle-wrapper">
      <label className="toggle-label">{label}</label>

      <button
        type="button"
        className={`toggle-switch ${enabled ? "active" : ""}`}
        onClick={handleToggle}
      >
        <span className="toggle-knob" />
      </button>
    </div>
  );
}
