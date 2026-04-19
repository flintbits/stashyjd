import React, { lazy } from "react";
import SettingsPage from "../pages/settings/SettingsPage.jsx";
import CalendarPage from "../pages/calendar/CalendarPage.jsx";

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
