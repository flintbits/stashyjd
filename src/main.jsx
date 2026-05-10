import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";
import "./tokens.css";
import "./fonts.css";
import { ProgressProvider } from "./app/context/ProgressProvider";
import TopProgressBar from "./features/top-progressbar/TopProgressbar";
import { ToastProvider } from "./app/context/ToastProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProgressProvider>
    <ToastProvider>
      <TopProgressBar />
      <App />
    </ToastProvider>
  </ProgressProvider>,
);
