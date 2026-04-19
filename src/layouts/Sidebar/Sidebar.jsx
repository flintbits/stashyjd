import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import {
  ApplicationIcon,
  DashboardIcon,
  SettingsIcon,
} from "../../assets/icons/icon";
import SidebarFooter from "../../features/sidebar-footer/SidebarFooter";
import GradientButton from "../../widgets/gradient-button/GradientButton";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleNewApplication = () => {
    navigate("/create-application");
  };

  return (
    <aside className="sidebar">
      <section>
        <h2>Logo</h2>

        <section style={{ marginBlock: 24 }}>
          <GradientButton
            text="New Application"
            onClick={handleNewApplication}
          />
        </section>

        <nav>
          <ul>
            <li>
              <NavLink to="/" className="sidebar-link">
                <DashboardIcon size={14} />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/applications" className="sidebar-link">
                <ApplicationIcon size={14} />
                Applications
              </NavLink>
            </li>
            <li>
              <NavLink to="/calendar" className="sidebar-link">
                <SettingsIcon size={14} />
                Calendar
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" className="sidebar-link">
                <SettingsIcon size={14} />
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </section>

      <SidebarFooter />
    </aside>
  );
}
