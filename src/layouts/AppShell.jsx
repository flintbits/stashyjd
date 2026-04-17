import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

export default function AppShell() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
