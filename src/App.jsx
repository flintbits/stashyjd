import { useEffect, useState } from "react";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { getVersion } from "@tauri-apps/api/app";

function App() {
  const [status, setStatus] = useState("");
  const [updateObj, setUpdateObj] = useState(null);
  const [loading, setLoading] = useState(false);
  const [version, setVersion] = useState("");

  useEffect(() => {
    loadVersion();
  }, []);

  async function loadVersion() {
    const v = await getVersion();
    setVersion(v);
  }

  async function checkUpdate() {
    setStatus("Checking...");
    setUpdateObj(null);

    try {
      const update = await check();

      if (update?.available) {
        setUpdateObj(update);
        setStatus(`Update available: ${update.version}`);
      } else {
        setStatus("No updates available");
      }
    } catch (err) {
      console.error(err);
      setStatus("Update check failed");
    }
  }

  async function installUpdate() {
    if (!updateObj) return;

    setLoading(true);
    setStatus("Downloading update...");

    try {
      await updateObj.downloadAndInstall();
      setStatus("Installed. Restarting...");
      await relaunch();
    } catch (err) {
      console.error(err);
      setStatus("Install failed");
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>StashyJD</h1>

      <button onClick={checkUpdate}>Check for Updates</button>

      <p>Current Version: {version}</p>

      <p>{status}</p>

      {updateObj && (
        <button onClick={installUpdate} disabled={loading}>
          {loading ? "Installing..." : "Install Update"}
        </button>
      )}
    </div>
  );
}

export default App;
