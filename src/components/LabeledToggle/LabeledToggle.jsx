import React, { useState } from "react";
import styles from "./LabeledToggle.module.css";

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
    <div className={styles["toggle-wrapper"]}>
      <label className={styles["toggle-label"]}>{label}</label>

      <button
        type="button"
        className={`${styles["toggle-switch"]} ${enabled ? styles.active : ""}`}
        onClick={handleToggle}
      >
        <span className={styles["toggle-knob"]} />
      </button>
    </div>
  );
}
