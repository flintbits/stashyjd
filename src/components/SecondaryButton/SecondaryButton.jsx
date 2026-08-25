import React from "react";
import styles from "./SecondaryButton.module.css";

export default function SecondaryButton({
  text = "Button",
  onClick,
  Icon,
  style = {},
}) {
  return (
    <button onClick={onClick} className={styles["secondary-button"]} style={{ ...style }}>
      {Icon && (
        <span className={styles.icon}>
          <Icon />
        </span>
      )}
      <span>{text}</span>
    </button>
  );
}
