import React from "react";
import styles from "./SelectField.module.css";

const SelectField = ({
  id,
  label,
  required = false,
  options = [],
  value,
  onChange,
  placeholder,
  error = "",
}) => {
  return (
    <div className={`${styles["select-field"]} ${error ? styles["has-error"] : ""}`}>
      {label && (
        <label htmlFor={id} className={styles["select-label"]}>
          {label} {required && <span>*</span>}
        </label>
      )}

      <div className={styles["select-wrapper"]}>
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`${styles["select-control"]} ${!value ? styles["is-placeholder"] : ""}`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className={styles["select-arrow"]}>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {error && <p className={styles["select-error"]}>{error}</p>}
    </div>
  );
};

export default SelectField;
