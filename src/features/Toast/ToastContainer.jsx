import { createPortal } from "react-dom";
import Toast from "./Toast";
import styles from "./Toast.module.css";

export default function ToastContainer({ toasts, removeToast }) {
  return createPortal(
    <div className={styles["toast-container"]}>
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onClose={removeToast} />
      ))}
    </div>,
    document.body,
  );
}
