import { useNavigate } from "react-router-dom";
import TableComponent from "./features/table-component/TableComponent";
import "./ApplicationsPage.css";

export default function ApplicationsPage() {
  //router test
  const navigate = useNavigate();
  return (
    <div className="applications-main">
      <section className="applications-table-container">
        <h1>Applications Page</h1>
        <TableComponent />
        <div style={{ height: "20px", background: "red" }}></div>
      </section>

      <section className="application-side-pane">
        {/* <TableComponent /> */}

        <div
          style={{ height: "20px", width: "320px", background: "blue" }}
        ></div>
      </section>
    </div>
  );
}
