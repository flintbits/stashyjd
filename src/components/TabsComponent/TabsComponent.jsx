import React, { useState } from 'react';
import styles from './TabsComponent.module.css';

export default function TabsComponent({ tabs, defaultTab, activeTab: controlledTab, onChange }) {
  const [activeTab, setActivetab] = useState(defaultTab);
  const selectedTab = controlledTab ?? activeTab;
  const handleTabClick = (tab_id) => {
    if (controlledTab === undefined) {
      setActivetab(tab_id);
    }
    onChange?.(tab_id);
  };

  return (
    <section className={styles['document-tabs']}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = selectedTab === tab.id;

        return (
          <button
            key={tab.id}
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {Icon && isActive && <Icon className={styles['tab-icon']} />}

            <span className={styles['tab-label']}>{tab.label}</span>

            {/* <span className={styles["tab-count"]}>{tab.count}</span> */}
          </button>
        );
      })}
    </section>
  );
}
