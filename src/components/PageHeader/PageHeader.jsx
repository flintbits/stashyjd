import React from "react";
import styles from "./PageHeader.module.css";

export default function PageHeader({ children, title, subtitle }) {
  return (
    <section className={styles["page-header"]}>
      <div className={styles["page-header-content"]}>
        <h1 className={styles["page-header-title"]}>{title}</h1>
        <p className={styles["page-header-subtitle"]}>{subtitle}</p>
      </div>

      <div className={styles["page-header-actions"]}>{children}</div>
    </section>
  );
}
