import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";
import "./tokens.css";
import "./fonts.css";
import { ProgressProvider } from "./app/context/ProgressProvider";
import TopProgressBar from "./features/top-progressbar/TopProgressbar";
import { ToastProvider } from "./app/context/ToastProvider";
import { WindowProvider } from "./app/context/WindowContext";
import { error, info } from "@tauri-apps/plugin-log";

info("Frontend starting");

window.addEventListener("error", async (e) => {
  await error(`Global Error: ${e.message}`);
});

window.addEventListener("unhandledrejection", async (e) => {
  await error(`Unhandled Promise: ${e.reason}`);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProgressProvider>
    <WindowProvider>
      <ToastProvider>
        <TopProgressBar />
        <App />
      </ToastProvider>
    </WindowProvider>
  </ProgressProvider>,
);
