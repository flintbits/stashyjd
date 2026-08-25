import React, { useState } from "react";
import styles from "./SettingsPage.module.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import GeneralSettings from "./components/GeneralSettings/GeneralSettings";

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
    <div className={styles["settings-page"]}>
      <PageHeader title="Settings" subtitle="yaay settings"></PageHeader>

      <div className={styles["settings-layout"]}>
        <aside className={styles["settings-sidebar"]}>
          <div className={styles["settings-menu"]}>
            {settingsConfig.map((item) => (
              <button
                key={item.id}
                className={`${styles["settings-menu-item"]} ${
                  activeTab === item.id ? styles.active : ""
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <div>
                  <span className={styles["settings-menu-title"]}>{item.label}</span>
                  <span className={styles["settings-menu-desc"]}>{item.description}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <main className={styles["settings-content"]}>
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
