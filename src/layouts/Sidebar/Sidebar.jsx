import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import {
  ApplicationIcon,
  CalendarIcon,
  CircleAddIcon,
  DashboardIcon,
  DocumentsIcon,
  SettingsIcon,
} from "../../assets/icons/icon";
import SidebarFooter from "./SidebarFooter/SidebarFooter";
import Button from "../../components/Button/Button";

export default function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();

  const handleNewApplication = () => {
    navigate("/create-application");
  };

  return (
    <div className={`${styles["sidebar-content"]} ${collapsed ? styles.collapsed : ""}`}>
      <section>
        <div
          style={{
            padding: "0 8px",
            marginBottom: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            className={styles["sidebar-text"]}
            style={{ margin: 0, fontSize: "var(--text-2xl)" }}
          >
            StashyJD
          </h2>
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "var(--text-lg)",
              padding: 0,
            }}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? "»" : "«"}
          </button>
        </div>

        <section style={{ marginBlock: 24 }}>
          {collapsed ? (
            <button
              onClick={handleNewApplication}
              title="New Application"
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: "var(--brand-primary)",
                color: "white",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                cursor: "pointer",
              }}
            >
              <CircleAddIcon size={20} />
            </button>
          ) : (
            <Button
              text="New Application"
              onClick={handleNewApplication}
              leftIcon={CircleAddIcon}
            />
          )}
        </section>

        <nav>
          <ul>
            <li title="Dashboard">
              <NavLink to="/" className={({ isActive }) => `${styles["sidebar-link"]} ${isActive ? styles.active : ""}`}>
                <DashboardIcon size={14} />
                <span className={styles["sidebar-text"]}>Dashboard</span>
              </NavLink>
            </li>
            <li title="Applications">
              <NavLink to="/applications" className={({ isActive }) => `${styles["sidebar-link"]} ${isActive ? styles.active : ""}`}>
                <ApplicationIcon size={14} />
                <span className={styles["sidebar-text"]}>Applications</span>
              </NavLink>
            </li>
            <li title="Documents">
              <NavLink to="/documents" className={({ isActive }) => `${styles["sidebar-link"]} ${isActive ? styles.active : ""}`}>
                <DocumentsIcon size={14} />
                <span className={styles["sidebar-text"]}>Documents</span>
              </NavLink>
            </li>
            <li title="Calendar">
              <NavLink to="/calendar" className={({ isActive }) => `${styles["sidebar-link"]} ${isActive ? styles.active : ""}`}>
                <CalendarIcon size={14} />
                <span className={styles["sidebar-text"]}>Calendar</span>
              </NavLink>
            </li>
            <li title="Settings">
              <NavLink to="/settings" className={({ isActive }) => `${styles["sidebar-link"]} ${isActive ? styles.active : ""}`}>
                <SettingsIcon size={14} />
                <span className={styles["sidebar-text"]}>Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </section>

      <div style={{ display: collapsed ? "none" : "block" }}>
        <SidebarFooter />
      </div>
    </div>
  );
}
