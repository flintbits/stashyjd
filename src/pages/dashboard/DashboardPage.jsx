import { getVersion } from "@tauri-apps/api/app";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  //router test
  const navigate = useNavigate();

  //test download
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
    <div>
      <h1>Dashboard Page</h1>
      <button onClick={() => navigate("/")}>Go to Dashboard</button>
      <button onClick={() => navigate("/applications")}>
        Go to Applications
      </button>

      <div>
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
    </div>
  );
}
