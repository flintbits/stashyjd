import React, { useState } from "react";
import styles from "./TabsComponent.module.css";

export default function TabsComponent({ tabs, defaultTab, onChange }) {
  const [activeTab, setActivetab] = useState(defaultTab);
  const handleTabClick = (tab_id) => {
    setActivetab(tab_id);
    onChange(tab_id);
  };

  return (
    <section className={styles["document-tabs"]}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            className={`${styles.tab} ${isActive ? styles.active : ""}`}
            onClick={() => handleTabClick(tab.id)}
          >
            <Icon className={styles["tab-icon"]} />

            <span className={styles["tab-label"]}>{tab.label}</span>

            <span className={styles["tab-count"]}>{tab.count}</span>
          </button>
        );
      })}
    </section>
  );
}
