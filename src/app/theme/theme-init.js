import { loadAccent, loadTheme } from "./theme-storage";

export function initializeTheme() {
  const root = document.documentElement;

  const theme = loadTheme();
  const accent = loadAccent();

  const resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  root.setAttribute("data-theme", resolvedTheme);

  root.setAttribute("data-accent", accent);
}
