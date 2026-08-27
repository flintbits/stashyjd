import useOS from "../../app/hooks/useOS";
import styles from "./TitleBar.module.css";
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
    <header className={styles.titlebar} data-tauri-drag-region>
      {/* LEFT */}
      <div className={styles["titlebar-left"]}>
        {os === "mac" && (
          <div className={styles["mac-controls"]}>
            <div className={`${styles["mac-btn"]} ${styles.close}`} onClick={close} />

            <div className={`${styles["mac-btn"]} ${styles.minimize}`} onClick={minimize} />

            <div className={`${styles["mac-btn"]} ${styles.maximize}`} onClick={maximize} />
          </div>
        )}

        <div className={styles.brand}>
          <div className={styles.logo} />
          <span>stashy.jd</span>
        </div>
      </div>

      {/* CENTER */}
      {/* <div className="titlebar-center">
        <input placeholder="Search..." />
      </div> */}

      {/* RIGHT */}
      <div className={styles["titlebar-right"]}>
        {os === "windows" && <WindowsControls />}
      </div>
    </header>
  );
}
