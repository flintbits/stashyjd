import React from "react";
import styles from "./RangeField.module.css";

const RangeField = ({
  id,
  label,
  required = false,
  value,
  onChange,
  error = "",
}) => {
  // If value isn't provided, use a default range for the UI representation
  const valArray = Array.isArray(value) ? value : [120000, 160000];

  return (
    <div className={`${styles["range-field"]} ${error ? styles["has-error"] : ""}`}>
      {label && (
        <label className={styles["range-label"]}>
          {label} {required && <span>*</span>}
        </label>
      )}

      <div className={styles["range-wrapper"]}>
        <div className={styles["range-input-box"]}>
          <span className={styles["currency-symbol"]}>$</span>
          <input 
            type="text" 
            value={valArray[0].toLocaleString()} 
            onChange={(e) => {
              // placeholder logic for min value
            }}
            className={styles["range-number-input"]}
          />
        </div>

        <div className={styles["range-slider-container"]}>
          {/* Simple placeholder slider track and thumbs */}
          <div className={styles["slider-track"]}></div>
          <div className={styles["slider-fill"]} style={{ left: '20%', right: '30%' }}></div>
          <div className={styles["slider-thumb"]} style={{ left: '20%' }}></div>
          <div className={styles["slider-thumb"]} style={{ left: '70%' }}></div>
        </div>

        <div className={styles["range-input-box"]}>
          <span className={styles["currency-symbol"]}>$</span>
          <input 
            type="text" 
            value={valArray[1].toLocaleString()} 
            onChange={(e) => {
              // placeholder logic for max value
            }}
            className={styles["range-number-input"]}
          />
        </div>
      </div>

      {error && <p className={styles["range-error"]}>{error}</p>}
    </div>
  );
};

export default RangeField;
