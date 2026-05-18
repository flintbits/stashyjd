import React from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { FiMinus, FiSquare, FiX } from "react-icons/fi";

export default function WindowsControls() {
  const appWindow = getCurrentWindow();

  const isMaximized = appWindow.isMaximized();

  const minimize = async () => {
    await appWindow.minimize();
  };

  const maximize = async () => {
    if (isMaximized) {
      await appWindow.unmaximize();
    } else {
      await appWindow.maximize();
    }
  };

  const close = async () => {
    await appWindow.close();
  };
  return (
    <div className="window-controls">
      <button onClick={minimize}>
        <FiMinus size={16} />
      </button>

      <button onClick={maximize}>
        <FiSquare size={14} />
      </button>

      <button className="close-btn" onClick={close}>
        <FiX size={18} />
      </button>
    </div>
  );
}
