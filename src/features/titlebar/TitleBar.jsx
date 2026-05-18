import useOS from "../../app/hooks/useOS";
import "./titlebar.css";
import { getCurrentWindow } from "@tauri-apps/api/window";
import WindowsControls from "./WindowsControls";

export default function TitleBar() {
  const os = useOS();

  const appWindow = getCurrentWindow();

  const minimize = async () => {
    await appWindow.minimize();
  };

  const maximize = async () => {
    const maximized = await appWindow.isMaximized();

    if (maximized) {
      await appWindow.unmaximize();
    } else {
      await appWindow.maximize();
    }
  };

  const close = async () => {
    await appWindow.close();
  };

  return (
    <header className="titlebar" data-tauri-drag-region>
      {/* LEFT */}
      <div className="titlebar-left">
        {os === "mac" && (
          <div className="mac-controls">
            <div className="mac-btn close" onClick={close} />

            <div className="mac-btn minimize" onClick={minimize} />

            <div className="mac-btn maximize" onClick={maximize} />
          </div>
        )}

        <div className="brand">
          <div className="logo" />
          <span>stashy.jd</span>
        </div>
      </div>

      {/* CENTER */}
      {/* <div className="titlebar-center">
        <input placeholder="Search..." />
      </div> */}

      {/* RIGHT */}
      <div className="titlebar-right">
        {os === "windows" && <WindowsControls />}
      </div>
    </header>
  );
}
