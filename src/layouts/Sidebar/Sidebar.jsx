import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import {
  ApplicationIcon,
  CircleAddIcon,
  DashboardIcon,
  SettingsIcon,
} from "../../assets/icons/icon";
import GradientButton from "../../widgets/gradient-button/GradientButton";
import SidebarFooter from "./sidebar-footer/SidebarFooter";

export default function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();

  const handleNewApplication = () => {
    navigate("/create-application");
  };

  return (
    <div className={`sidebar-content ${collapsed ? "collapsed" : ""}`}>
      <section>
        <div style={{ padding: "0 8px", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 className="sidebar-text" style={{ margin: 0, fontSize: "var(--text-xl)" }}>Logo</h2>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: "var(--text-lg)", padding: 0 }}
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
                width: 40, height: 40, borderRadius: 8, background: "var(--brand-primary)", 
                color: "white", border: "none", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", cursor: "pointer"
              }}
            >
              <CircleAddIcon size={20} />
            </button>
          ) : (
            <GradientButton
              text="New Application"
              onClick={handleNewApplication}
              leftIcon={CircleAddIcon}
            />
          )}
        </section>

        <nav>
          <ul>
            <li>
              <NavLink to="/" className="sidebar-link">
                <DashboardIcon size={18} />
                <span className="sidebar-text">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/applications" className="sidebar-link">
                <ApplicationIcon size={18} />
                <span className="sidebar-text">Applications</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/calendar" className="sidebar-link">
                <SettingsIcon size={18} />
                <span className="sidebar-text">Calendar</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" className="sidebar-link">
                <SettingsIcon size={18} />
                <span className="sidebar-text">Settings</span>
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
