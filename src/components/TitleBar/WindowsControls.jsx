import styles from './TitleBar.module.css';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { FiMinus, FiSquare, FiX } from 'react-icons/fi';

export default function WindowsControls() {
  const appWindow = getCurrentWindow();

  const minimize = async () => {
    await appWindow.minimize();
  };

  const maximize = async () => {
    await appWindow.toggleMaximize();
  };

  const close = async () => {
    await appWindow.close();
  };
  return (
    <div className={styles['window-controls']} onMouseDown={(event) => event.stopPropagation()}>
      <button type="button" onClick={minimize} aria-label="Minimize window" title="Minimize">
        <FiMinus size={16} />
      </button>

      <button type="button" onClick={maximize} aria-label="Maximize window" title="Maximize">
        <FiSquare size={14} />
      </button>

      <button
        type="button"
        className={styles['close-btn']}
        onClick={close}
        aria-label="Close window"
        title="Close"
      >
        <FiX size={18} />
      </button>
    </div>
  );
}
