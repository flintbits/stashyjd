import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";
import "./styles/tokens.css";
import "./styles/typography.css";
import "./styles/themes.css";
import "./styles/accents.css";
import { ProgressProvider } from "./app/context/ProgressProvider";
import TopProgressBar from "./features/TopProgressBar/TopProgressBar";
import { ToastProvider } from "./app/context/ToastProvider";
import { WindowProvider } from "./app/context/WindowContext";
import { error, info } from "@tauri-apps/plugin-log";
import { ThemeProvider } from "./app/theme/ThemeProvider";
import { initializeTheme } from "./app/theme/theme-init";

await info("Frontend starting");

initializeTheme();

window.addEventListener("error", async (e) => {
  await error(`Global Error: ${e.message}`);
});

window.addEventListener("unhandledrejection", async (e) => {
  await error(`Unhandled Promise: ${e.reason}`);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProgressProvider>
    <ThemeProvider>
      <WindowProvider>
        <ToastProvider>
          <TopProgressBar />
          <App />
        </ToastProvider>
      </WindowProvider>
    </ThemeProvider>
  </ProgressProvider>,
);
