import { createContext, useContext, useEffect, useState } from "react";

import { getCurrentWindow } from "@tauri-apps/api/window";

const WindowContext = createContext();

export function WindowProvider({ children }) {
  const [useCustomTitlebar, setUseCustomTitlebar] = useState(() => {
    const stored = localStorage.getItem("use-custom-titlebar");

    return stored ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    localStorage.setItem(
      "use-custom-titlebar",
      JSON.stringify(useCustomTitlebar),
    );

    syncDecorations();
  }, [useCustomTitlebar]);

  const syncDecorations = async () => {
    const appWindow = getCurrentWindow();

    // Native titlebar ON
    if (!useCustomTitlebar) {
      await appWindow.setDecorations(true);
    }

    // Custom titlebar ON
    else {
      await appWindow.setDecorations(false);
    }
  };

  const toggleTitlebar = () => {
    setUseCustomTitlebar((prev) => !prev);
  };

  return (
    <WindowContext.Provider
      value={{
        useCustomTitlebar,
        toggleTitlebar,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
}

export function useWindowContext() {
  return useContext(WindowContext);
}
