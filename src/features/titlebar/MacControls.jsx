import { getCurrentWindow } from "@tauri-apps/api/window";

export default function MacControls() {
  const appWindow = getCurrentWindow();
  return (
    <div className="mac-controls">
      <div className="mac-btn close" onClick={() => appWindow.close()} />

      <div className="mac-btn minimize" onClick={() => appWindow.minimize()} />

      <div
        className="mac-btn maximize"
        onClick={() => appWindow.toggleMaximize()}
      />
    </div>
  );
}
