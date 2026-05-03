import React from "react";
import "./ButtonsField.css";

const ButtonsField = ({
  id,
  label,
  required = false,
  options = [],
  value,
  onChange,
  error = "",
}) => {
  return (
    <div className={`buttons-field ${error ? "has-error" : ""}`}>
      {label && (
        <label className="buttons-label">
          {label} {required && <span>*</span>}
        </label>
      )}

      <div className="buttons-wrapper">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`btn-option ${value === opt ? "active" : ""}`}
            onClick={() => onChange({ target: { id, value: opt } })}
          >
            {opt}
          </button>
        ))}
      </div>

      {error && <p className="buttons-error">{error}</p>}
    </div>
  );
};

export default ButtonsField;
