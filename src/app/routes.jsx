import React, { lazy } from "react";

const DashboardPage = lazy(
  () => import("../pages/dashboard/DashboardPage.jsx"),
);
const ApplicationsPage = lazy(
  () => import("../pages/applications/ApplicationsPage.jsx"),
);

const CreateApplication = lazy(
  () => import("../pages/createApplication/CreateApplication.jsx"),
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
  {
    path: "/create-application",
    label: "CreateApplication",
    element: <CreateApplication />,
  },
];
