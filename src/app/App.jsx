import { Suspense, useEffect, useState } from "react";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { getVersion } from "@tauri-apps/api/app";
import { HashRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import AppShell from "../layouts/AppShell";
import AppLayout from "../layouts/AppLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";

function App() {
  return (
    <HashRouter>
      <Suspense>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
