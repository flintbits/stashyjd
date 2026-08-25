// InputField.jsx
import React from "react";
import styles from "./InputField.module.css";

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
    <div className={`${styles["input-field"]} ${error ? styles["has-error"] : ""}`}>
      {label && (
        <label htmlFor={id} className={styles["input-label"]}>
          {label} {required && <span>*</span>}
        </label>
      )}

      <div className={styles["input-wrapper"]}>
        {Icon && <Icon className={styles["input-icon"]} size={14} />}

        <input
          id={id}
          name={label}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles["input-control"]}
        />
      </div>

      {error && <p className={styles["input-error"]}>{error}</p>}
    </div>
  );
};

export default InputField;
