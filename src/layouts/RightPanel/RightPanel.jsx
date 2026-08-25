import React from "react";
import { LuInbox, LuX } from "react-icons/lu";
import styles from "./RightPanel.module.css";

export default function RightPanel({
  title = "Details",
  setShowRight,
  children,
}) {
  const isEmpty = !children;

  return (
    <div className={styles["right-panel"]}>
      <div className={styles["right-panel-header"]}>
        <h4>{title}</h4>

        <button
          className={styles["right-panel-close"]}
          onClick={() => setShowRight(false)}
        >
          <LuX size={16} />
        </button>
      </div>

      <div className={styles["right-panel-body"]}>
        {isEmpty ? (
          <div className={styles["right-panel-empty"]}>
            <div className={styles["right-panel-empty-icon"]}>
              <LuInbox />
            </div>

            <h4>Nothing to display</h4>

            <p>Select an item to view contextual information and details.</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
