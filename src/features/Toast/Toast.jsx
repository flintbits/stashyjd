import {
  CloseIcon,
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
  WaringIcon,
} from "../../assets/icons/icon";
import "./Toast.css";

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
    <div className={`toast toast--${type}`}>
      <div className="toast-content">
        <div className="toast-icon">
          <Icon />
        </div>

        <div className="toast-text">
          {title && <div className="toast-title">{title}</div>}
          {message && <div className="toast-desc">{message}</div>}
        </div>
      </div>

      <div className="toast-right">
        {actionLabel && (
          <button className="toast-action" onClick={onAction}>
            {actionLabel}
          </button>
        )}

        <button className="toast-close" onClick={() => onClose(id)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
