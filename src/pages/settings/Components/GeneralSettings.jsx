import React from "react";
import { useWindowContext } from "../../../app/context/WindowContext";
import useAppUpdater from "../../../app/hooks/useAppUpdater";

export default function GeneralSettings() {
  const { useCustomTitlebar, toggleTitlebar } = useWindowContext();

  const {
    version,
    status,
    loading,
    progress,
    updateAvailable,
    checkForUpdates,
    installUpdate,
  } = useAppUpdater();

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={useCustomTitlebar}
          onChange={toggleTitlebar}
        />
        Use custom titlebar
      </label>
      <hr />
      <h3>Updates</h3>
      <p>Current version: {version}</p>
      <p>{status}</p>
      {progress > 0 && <p>{progress}%</p>}git add .
      {!updateAvailable && (
        <button onClick={checkForUpdates} disabled={loading}>
          {loading ? "Checking..." : "Check for updates"}
        </button>
      )}
      {updateAvailable && (
        <button onClick={installUpdate} disabled={loading}>
          {loading ? "Installing..." : "Install update"}
        </button>
      )}
    </div>
  );
}
