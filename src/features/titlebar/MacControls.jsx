import styles from "./TitleBar.module.css";
import { getCurrentWindow } from "@tauri-apps/api/window";

export default function MacControls() {
  const appWindow = getCurrentWindow();
  return (
    <div className={styles["mac-controls"]}>
      <div className={`${styles["mac-btn"]} ${styles.close}`} onClick={() => appWindow.close()} />

      <div className={`${styles["mac-btn"]} ${styles.minimize}`} onClick={() => appWindow.minimize()} />

      <div
        className={`${styles["mac-btn"]} ${styles.maximize}`}
        onClick={() => appWindow.toggleMaximize()}
      />
    </div>
  );
}
