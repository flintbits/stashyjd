import React, { lazy } from "react";

const DashboardPage = lazy(
  () => import("../pages/dashboard/DashboardPage.jsx"),
);
const ApplicationsPage = lazy(
  () => import("../pages/applications/ApplicationsPage.jsx"),
);

export const routes = [
  {
    path: "/",
    label: "Dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/applications",
    label: "Applications",
    element: <ApplicationsPage />,
  },
];
