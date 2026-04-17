import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import {
  ApplicationIcon,
  DashboardIcon,
  SettingsIcon,
} from "../../assets/icons/icon";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Logo</h2>

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
    </aside>
  );
}
