import { useEffect, useState } from "react";
import { getVersion } from "@tauri-apps/api/app";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";

export default function useAppUpdater() {
  const [version, setVersion] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateObj, setUpdateObj] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadVersion();
  }, []);

  async function loadVersion() {
    try {
      const v = await getVersion();
      setVersion(v);
    } catch (err) {
      console.error(err);
    }
  }

  async function checkForUpdates() {
    setLoading(true);

    setStatus("Checking for updates...");

    setUpdateObj(null);

    try {
      const update = await check();

      if (update?.available) {
        setUpdateObj(update);

        setStatus(`Version ${update.version} available`);
      } else {
        setStatus("You are up to date");
      }
    } catch (err) {
      console.error(err);

      setStatus("Update check failed");
    }

    setLoading(false);
  }

  async function installUpdate() {
    if (!updateObj) return;

    setLoading(true);

    setProgress(0);

    try {
      await updateObj.downloadAndInstall((event) => {
        switch (event.event) {
          case "Started":
            setStatus("Download started");
            break;

          case "Progress":
            if (event.data.total) {
              const percent = Math.round(
                (event.data.chunkLength / event.data.total) * 100,
              );

              setProgress(percent);
            }

            break;

          case "Finished":
            setProgress(100);

            setStatus("Update installed. Restarting...");

            break;
        }
      });

      await relaunch();
    } catch (err) {
      console.error(err);

      setStatus("Update failed");
    }

    setLoading(false);
  }

  return {
    version,
    status,
    loading,
    progress,
    updateAvailable: !!updateObj,
    checkForUpdates,
    installUpdate,
  };
}
