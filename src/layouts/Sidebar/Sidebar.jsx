import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import {
  ApplicationIcon,
  DashboardIcon,
  SettingsIcon,
} from "../../assets/icons/icon";
import GradientButton from "../../widgets/Gradient Button/GradientButton";
import SecondaryButton from "../../widgets/Secondary Button/SecondaryButton";
import SidebarFooter from "../../features/sidebar-footer/SidebarFooter";

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
                <DashboardIcon size={18} />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/applications" className="sidebar-link">
                <ApplicationIcon size={18} />
                Applications
              </NavLink>
            </li>
            <li>
              <NavLink to="/text" className="sidebar-link">
                <SettingsIcon size={18} />
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
