import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import {
  ApplicationIcon,
  CalendarIcon,
  CircleAddIcon,
  DashboardIcon,
  DocumentsIcon,
  SettingsIcon,
} from '../../assets/icons/icon';
import SidebarFooter from './SidebarFooter/SidebarFooter';

export default function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();

  const handleNewApplication = () => {
    navigate('/create-application');
  };

  return (
    <div className={`${styles['sidebar-content']} ${collapsed ? styles.collapsed : ''}`}>
      <section>
        <div className={styles['sidebar-brand']}>
          <h2 className={styles['sidebar-text']}>StashyJD</h2>
        </div>

        <section className={styles['create-section']}>
          <button
            className={styles['sidebar-create-link']}
            onClick={handleNewApplication}
            title="New Application"
          >
            <CircleAddIcon size={20} />
            <span className={styles['sidebar-text']}>New Application</span>
          </button>
        </section>

        <nav>
          <ul>
            <li title="Dashboard">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${styles['sidebar-link']} ${isActive ? styles.active : ''}`
                }
              >
                <DashboardIcon size={18} />
                <span className={styles['sidebar-text']}>Dashboard</span>
              </NavLink>
            </li>
            <li title="Applications">
              <NavLink
                to="/applications"
                className={({ isActive }) =>
                  `${styles['sidebar-link']} ${isActive ? styles.active : ''}`
                }
              >
                <ApplicationIcon size={18} />
                <span className={styles['sidebar-text']}>Applications</span>
              </NavLink>
            </li>
            <li title="Documents">
              <NavLink
                to="/documents"
                className={({ isActive }) =>
                  `${styles['sidebar-link']} ${isActive ? styles.active : ''}`
                }
              >
                <DocumentsIcon size={18} />
                <span className={styles['sidebar-text']}>Documents</span>
              </NavLink>
            </li>
            <li title="Calendar">
              <NavLink
                to="/calendar"
                className={({ isActive }) =>
                  `${styles['sidebar-link']} ${isActive ? styles.active : ''}`
                }
              >
                <CalendarIcon size={18} />
                <span className={styles['sidebar-text']}>Calendar</span>
              </NavLink>
            </li>
            <li title="Settings">
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `${styles['sidebar-link']} ${isActive ? styles.active : ''}`
                }
              >
                <SettingsIcon size={18} />
                <span className={styles['sidebar-text']}>Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </section>

      <div style={{ display: collapsed ? 'none' : 'block' }}>
        <SidebarFooter />
      </div>
    </div>
  );
}
