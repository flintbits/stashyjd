import React from "react";
import { LuInbox, LuX } from "react-icons/lu";
import "./RightPanel.css";

export default function RightPanel({
  title = "Details",
  setShowRight,
  children,
}) {
  const isEmpty = !children;

  return (
    <div className="right-panel">
      <div className="right-panel-header">
        <h4>{title}</h4>

        <button
          className="right-panel-close"
          onClick={() => setShowRight(false)}
        >
          <LuX size={16} />
        </button>
      </div>

      <div className="right-panel-body">
        {isEmpty ? (
          <div className="right-panel-empty">
            <div className="right-panel-empty-icon">
              <LuInbox />
            </div>

            <h4>Nothing to display</h4>

            <p>Select an item to view contextual information and details.</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
