import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

export default function AppShell() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          minWidth: 0,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "20px",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}
