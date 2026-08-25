import {
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
  WaringIcon,
} from "../../assets/icons/icon";
import styles from "./Toast.module.css";

const ICONS = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WaringIcon,
  info: InfoIcon,
};

export default function Toast({
  id,
  title,
  message,
  type = "info",
  actionLabel,
  onAction,
  onClose,
}) {
  const Icon = ICONS[type];
  return (
    <div className={`${styles.toast} ${styles[`toast--${type}`]}`}>
      <div className={styles["toast-content"]}>
        <div className={styles["toast-icon"]}>
          <Icon />
        </div>

        <div className={styles["toast-text"]}>
          {title && <div className={styles["toast-title"]}>{title}</div>}
          {message && <div className={styles["toast-desc"]}>{message}</div>}
        </div>
      </div>

      <div className={styles["toast-right"]}>
        {actionLabel && (
          <button className={styles["toast-action"]} onClick={onAction}>
            {actionLabel}
          </button>
        )}

        <button className={styles["toast-close"]} onClick={() => onClose(id)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
