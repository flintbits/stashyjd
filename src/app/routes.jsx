import React, { lazy } from "react";
import SettingsPage from "../pages/settings/SettingsPage.jsx";
import CalendarPage from "../pages/calendar/CalendarPage.jsx";
import AppLayout from "../layouts/AppLayout.jsx";

const DashboardPage = lazy(
  () => import("../pages/dashboard/DashboardPage.jsx"),
);
const ApplicationsPage = lazy(
  () => import("../pages/applications/ApplicationsPage.jsx"),
);

const CreateApplication = lazy(
  () => import("../pages/createApplication/CreateApplication.jsx"),
);

const DocumentsPage = lazy(
  () => import("../pages/documents-page/DocumentsPage.jsx"),
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
