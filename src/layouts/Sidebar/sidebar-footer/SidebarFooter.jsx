import React, { useEffect, useState } from "react";
import "./SidebarFooter.css";
import { getVersion } from "@tauri-apps/api/app";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import SecondaryButton from "../../../widgets/secondary-button/SecondaryButton";

export default function SidebarFooter() {
  const [status, setStatus] = useState("");
  const [updateObj, setUpdateObj] = useState(null);
  const [loading, setLoading] = useState(false);
  const [version, setVersion] = useState("");

  useEffect(() => {
    checkUpdate();
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
    <section className="sidebar-footer">
      {updateObj && (
        <SecondaryButton
          text="Download Available"
          style={{ width: "100%" }}
          onClick={installUpdate}
        />
      )}
      <p className="sidebar-footer-version-text">
        Current version : {version || "0.00.00"}
      </p>
    </section>
  );
}
