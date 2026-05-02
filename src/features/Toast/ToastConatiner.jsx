import { createPortal } from "react-dom";
import Toast from "./Toast";
import "./Toast.css";

export default function ToastContainer({ toasts, removeToast }) {
  return createPortal(
    <div className="toast-container">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onClose={removeToast} />
      ))}
    </div>,
    document.body,
  );
}
