import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./styles/layout.css";
import Sidebar from "./Sidebar/Sidebar";
import RightPanel from "./RightPanel/RightPanel";
import { DrawerIcon } from "../assets/icons/icon";
import TitleBar from "../features/TitleBar/TitleBar";
import { useWindowContext } from "../app/context/WindowContext";

export default function AppLayout() {
  const [showRight, setShowRight] = useState(true);
  const [collapsed, setCollapsed] = useState(true);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [rightPanelContent, setRightPanelContent] = useState(null);
  const sidebarIsCollapsed = collapsed && !sidebarHovered;

  const { useCustomTitlebar } = useWindowContext();

  return (
    <>
      {useCustomTitlebar && <TitleBar />}
      <div
        className={[
          "app-layout",
          sidebarIsCollapsed ? "sidebar-collapsed" : "",
          !showRight ? "no-right" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <aside
          className="sidebar"
          onMouseEnter={() => collapsed && setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
        >
          <Sidebar collapsed={sidebarIsCollapsed} setCollapsed={setCollapsed} />
        </aside>

        <main className="main">
          <Outlet
            context={{
              showRight,
              setShowRight,
              collapsed,
              setCollapsed,
              setRightPanelContent,
            }}
          />
        </main>

        {showRight && (
          <aside className={`right-panel ${showRight ? "open" : "closed"}`}>
            {rightPanelContent ? (
              rightPanelContent
            ) : (
              <RightPanel setShowRight={setShowRight} />
            )}
          </aside>
        )}

        {!showRight && (
          <button
            onClick={() => setShowRight(true)}
            style={{
              position: "fixed",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: 24,
              height: 48,
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              borderRight: "none",
              borderRadius: "8px 0 0 8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100,
              boxShadow: "var(--shadow-sm)",
              color: "var(--text-tertiary)",
            }}
            title="Open right panel"
          >
            <DrawerIcon />
          </button>
        )}
      </div>
    </>
  );
}
