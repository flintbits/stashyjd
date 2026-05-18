import React, { useState } from "react";
import "./settingspage.css";
import PageHeader from "../../widgets/page-header/PageHeader";
import GeneralSettings from "./Components/GeneralSettings";

const settingsConfig = [
  {
    id: "general",
    label: "General",
    description: "Profile & preferences",
    component: GeneralSettings,
  },
  // {
  //   id: "notifications",
  //   label: "Notifications",
  //   description: "Alerts & reminders",
  //   // component: NotificationSettings,
  // },
  // {
  //   id: "appearance",
  //   label: "Appearance",
  //   description: "Theme & display",
  //   // component: AppearanceSettings,
  // },
  {
    id: "shortcuts",
    label: "Shortcuts",
    description: "Keyboard shortcuts",
    // component: ShortcutSettings,
  },
  {
    id: "about",
    label: "About",
    description: "System info",
    // component: AboutSettings,
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(settingsConfig[0].id);

  const ActiveComponent = settingsConfig.find(
    (item) => item.id === activeTab,
  )?.component;

  return (
    <div className="settings-page">
      <PageHeader title="Settings" subtitle="yaay settings"></PageHeader>

      <div className="settings-layout">
        <aside className="settings-sidebar">
          <div className="settings-menu">
            {settingsConfig.map((item) => (
              <button
                key={item.id}
                className={`settings-menu-item ${
                  activeTab === item.id ? "active" : ""
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <div>
                  <span className="settings-menu-title">{item.label}</span>
                  <span className="settings-menu-desc">{item.description}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <main className="settings-content">
          {ActiveComponent && <ActiveComponent />}
        </main>
      </div>
      {/* <label>
        <input
          type="checkbox"
          checked={useCustomTitlebar}
          onChange={toggleTitlebar}
        />
        Use custom titlebar
      </label> */}
      {/* {isOpen && <DocumentLibraryModal setIsOpen={setIsOpen} isOpen={isOpen} />} */}
    </div>
  );
}
