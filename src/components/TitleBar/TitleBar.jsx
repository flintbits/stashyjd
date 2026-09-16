import useOS from '../../app/hooks/useOS';
import styles from './TitleBar.module.css';
import WindowsControls from './WindowsControls';
import MacControls from './MacControls';

export default function TitleBar() {
  const os = useOS();

  return (
    <header className={styles.titlebar} data-tauri-drag-region>
      {/* LEFT */}
      <div className={styles['titlebar-left']}>
        {os === 'mac' && <MacControls />}

        <div className={styles.brand}>
          <h5>StashyJD</h5>
        </div>
      </div>

      {/* CENTER */}
      {/* <div className="titlebar-center">
        <input placeholder="Search..." />
      </div> */}

      {/* RIGHT */}
      <div className={styles['titlebar-right']}>{os === 'windows' && <WindowsControls />}</div>
    </header>
  );
}
