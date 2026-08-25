import { createContext, useContext, useState, useCallback } from "react";
import ToastContainer from "../../features/Toast/ToastContainer";

const ToastContext = createContext();

const MAX_TOASTS = 10;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]); // visible
  const [queue, setQueue] = useState([]); // waiting

  const removeToast = useCallback((id) => {
    setToasts((prev) => {
      const updated = prev.filter((t) => t.id !== id);

      setQueue((q) => {
        if (q.length > 0) {
          const next = q[0];

          startTimer(next);

          return q.slice(1);
        }
        return q;
      });

      return updated;
    });
  }, []);

  const startTimer = (toast) => {
    setTimeout(() => {
      removeToast(toast.id);
    }, toast.duration);
  };

  const addToast = useCallback(
    ({ title, message, type = "info", duration = 10000 }) => {
      const id = crypto.randomUUID();
      const newToast = { id, title, message, type, duration };

      setToasts((prev) => {
        if (prev.length < MAX_TOASTS) {
          startTimer(newToast);
          return [...prev, newToast];
        } else {
          setQueue((q) => [...q, newToast]);
          return prev;
        }
      });
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
