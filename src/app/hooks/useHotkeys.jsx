import { useEffect } from "react";

export default function useHotkeys({ onCommand, toggleSidebar, toggleRight }) {
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onCommand();
      }

      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        toggleSidebar();
      }

      if ((e.metaKey || e.ctrlKey) && e.key === "\\") {
        toggleRight();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
}
