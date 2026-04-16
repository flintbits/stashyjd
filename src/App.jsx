import { useState } from "react";
import { check } from "@tauri-apps/plugin-updater";

function App() {
  const [status, setStatus] = useState("");

  async function checkUpdate() {
    setStatus("Checking...");

    try {
      const update = await check();

      if (update?.available) {
        setStatus(`Update available: ${update.version}`);
      } else {
        setStatus("No updates available");
      }
    } catch (err) {
      console.error("Updater error:", err);
      setStatus(String(err));
    }
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>StashyJD</h1>

      <button onClick={checkUpdate}>Check for Updates</button>

      <p>{status}</p>
    </div>
  );
}

export default App;
