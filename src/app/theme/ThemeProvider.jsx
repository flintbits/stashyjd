import React, { createContext, useContext, useState, useEffect } from "react";
import { loadTheme, loadAccent, saveTheme, saveAccent } from "./theme-storage";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => loadTheme() || "system");
  const [accent, setAccentState] = useState(() => loadAccent() || "emerald");

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    saveTheme(newTheme);
  };

  const setAccent = (newAccent) => {
    setAccentState(newAccent);
    saveAccent(newAccent);
  };

  useEffect(() => {
    const root = document.documentElement;
    const resolvedTheme =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;
    root.setAttribute("data-theme", resolvedTheme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-accent", accent);
  }, [accent]);

  return (
    <ThemeContext.Provider value={{ theme, accent, setTheme, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
