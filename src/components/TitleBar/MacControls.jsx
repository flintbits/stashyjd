import styles from './TitleBar.module.css';
import { getCurrentWindow } from '@tauri-apps/api/window';

export default function MacControls() {
  const appWindow = getCurrentWindow();

  return (
    <div className={styles['mac-controls']}>
      <button
        type="button"
        className={`${styles['mac-control']} ${styles.minimize}`}
        onClick={() => appWindow.minimize()}
        aria-label="Minimize window"
        title="Minimize"
      >
        <span className={styles['mac-btn']} />
      </button>

      <button
        type="button"
        className={`${styles['mac-control']} ${styles.maximize}`}
        onClick={() => appWindow.toggleMaximize()}
        aria-label="Maximize window"
        title="Maximize"
      >
        <span className={styles['mac-btn']} />
      </button>

      <button
        type="button"
        className={`${styles['mac-control']} ${styles.close}`}
        onClick={() => appWindow.close()}
        aria-label="Close window"
        title="Close"
      >
        <span className={styles['mac-btn']} />
      </button>
    </div>
  );
}
