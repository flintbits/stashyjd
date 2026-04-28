// InputField.jsx
import React from "react";
import "./InputField.css";

const InputField = ({
  id,
  label,
  required = false,
  placeholder,
  value,
  onChange,
  error = "",
  Icon,
  type = "text",
}) => {
  return (
    <div className={`input-field ${error ? "has-error" : ""}`}>
      {label && (
        <label htmlFor={name} className="input-label">
          {label} {required && <span>*</span>}
        </label>
      )}

      <div className="input-wrapper">
        {Icon && <Icon className="input-icon" size={14} />}

        <input
          id={id}
          name={label}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input-control"
        />
      </div>

      {error && <p className="input-error">{error}</p>}
    </div>
  );
};

export default InputField;
