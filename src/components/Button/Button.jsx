import React from "react";
import styles from "./Button.module.css";

export default function Button({
  text = "Button",
  onClick,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  loading = false,
  variant = "primary",
}) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[`btn-${variant}`]}`}
      disabled={loading}
    >
      <span className={`${styles["btn-content"]} ${loading ? styles["is-hidden"] : ""}`}>
        {LeftIcon && (
          <span className={`${styles["btn-icon"]} ${styles["btn-icon-left"]}`}>
            <LeftIcon />
          </span>
        )}

        <span className={styles["btn-label"]}>{text}</span>

        {RightIcon && (
          <span className={`${styles["btn-icon"]} ${styles["btn-icon-right"]}`}>
            <RightIcon />
          </span>
        )}
      </span>

      {loading && (
        <span className={styles["btn-spinner-overlay"]}>
          <span className={styles["btn-spinner"]}></span>
        </span>
      )}
    </button>
  );
}
