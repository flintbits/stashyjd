import React from "react";
import styles from "./ButtonsField.module.css";

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
    <div className={`${styles["buttons-field"]} ${error ? styles["has-error"] : ""}`}>
      {label && (
        <label className={styles["buttons-label"]}>
          {label} {required && <span>*</span>}
        </label>
      )}

      <div className={styles["buttons-wrapper"]}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`${styles["btn-option"]} ${value === opt ? styles.active : ""}`}
            onClick={() => onChange({ target: { id, value: opt } })}
          >
            {opt}
          </button>
        ))}
      </div>

      {error && <p className={styles["buttons-error"]}>{error}</p>}
    </div>
  );
};

export default ButtonsField;
