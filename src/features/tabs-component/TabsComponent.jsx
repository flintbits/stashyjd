import React, { useState } from "react";
import "./TabsComponent.css";

export default function TabsComponent({ tabs, defaultTab, onChange }) {
  const [activeTab, setActivetab] = useState(defaultTab);
  const handleTabClick = (tab_id) => {
    setActivetab(tab_id);
    onChange(tab_id);
  };

  return (
    <section className="document-tabs">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            className={`tab ${isActive ? "active" : ""}`}
            onClick={() => handleTabClick(tab.id)}
          >
            <Icon className="tab-icon" />

            <span className="tab-label">{tab.label}</span>

            <span className="tab-count">{tab.count}</span>
          </button>
        );
      })}
    </section>
  );
}
