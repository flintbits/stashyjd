import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import useResizable from "../app/hooks/useResizable";
import useHotkeys from "../app/hooks/useHotkeys";
import "./styles/layout.css";
import PageContainer from "./PageContainer";
import RightPanel from "./RightPanel";
import Sidebar from "./Sidebar/Sidebar";

export default function AppLayout() {
  const [sidebarWidth, setSidebarWidth] = useState(220);
  const [rightWidth, setRightWidth] = useState(320);

  const [showRight, setShowRight] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [showCommand, setShowCommand] = useState(false);
  const [rightPanelContent, setRightPanelContent] = useState(null);

  const sidebarRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      `${sidebarWidth}px`,
    );
  }, [sidebarWidth]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--rightpanel-width",
      `${rightWidth}px`,
    );
  }, [rightWidth]);

  useResizable(sidebarRef, (w) => {
    const clamped = Math.max(180, Math.min(320, w));
    setSidebarWidth(clamped);
  });

  useResizable(
    rightRef,
    (w) => {
      if (w < 150) {
        // If dragged very small, fully collapse it
        setShowRight(false);
        setRightWidth(320); // Reset width for when it opens again
      } else {
        const clamped = Math.min(420, Math.max(260, w));
        setRightWidth(clamped);
      }
    },
    "left",
  );

  useHotkeys({
    onCommand: () => setShowCommand(true),
    toggleSidebar: () => setCollapsed((s) => !s),
    toggleRight: () => setShowRight((r) => !r),
  });

  return (
    <>
      <div
        className={[
          "app-layout",
          collapsed ? "sidebar-collapsed" : "",
          !showRight ? "no-right" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <aside className="sidebar">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </aside>

        {!collapsed && (
          <div
            ref={sidebarRef}
            className="resize-handle"
            aria-label="Resize sidebar"
            role="separator"
          />
        )}

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
          <div
            ref={rightRef}
            className="resize-handle"
            aria-label="Resize right panel"
            role="separator"
          />
        )}

        {showRight && (
          <aside className="right-panel">
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
            }}
            title="Open right panel"
          >
            «
          </button>
        )}
      </div>

      {showCommand && (
        <div className="command-overlay" onClick={() => setShowCommand(false)}>
          <div className="command-box" onClick={(e) => e.stopPropagation()}>
            <input
              autoFocus
              placeholder="Type a command..."
              className="command-input"
            />
          </div>
        </div>
      )}
    </>
  );
}
