import React, { lazy } from "react";
import SettingsPage from "../pages/Settings/SettingsPage.jsx";
import CalendarPage from "../pages/Calendar/CalendarPage.jsx";
import AppLayout from "../layouts/AppLayout.jsx";

const DashboardPage = lazy(
  () => import("../pages/Dashboard/DashboardPage.jsx"),
);
const ApplicationsPage = lazy(
  () => import("../pages/Applications/ApplicationsPage.jsx"),
);

const CreateApplication = lazy(
  () => import("../pages/CreateApplication/CreateApplication.jsx"),
);

const DocumentsPage = lazy(
  () => import("../pages/Documents/DocumentsPage.jsx"),
);

export const routes = [
  // {
  //   path: "/",
  //   element: <AppLayout />,
  //   children: [
  //     { index: true, element: <DashboardPage /> },
  //     { path: "applications", element: <ApplicationsPage /> },
  //     { path: "create-application", element: <CreateApplication /> },
  //   ],
  // },
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
    path: "/documents",
    label: "Documents",
    element: <DocumentsPage />,
  },
  {
    path: "/create-application",
    label: "CreateApplication",
    element: <CreateApplication />,
  },

  {
    path: "/calendar",
    label: "Calendar",
    element: <CalendarPage />,
  },

  {
    path: "/settings",
    label: "Settings",
    element: <SettingsPage />,
  },
];
