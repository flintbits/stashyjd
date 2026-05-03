import { useNavigate } from "react-router-dom";
import "./ApplicationsPage.css";
import DataTable from "../../features/data-table/DataTable";
import { TABLEHEADERS } from "./configs";

export default function ApplicationsPage() {
  //router test
  const navigate = useNavigate();
  return (
    <div>
      <DataTable rowData={TABLEHEADERS} />
    </div>
  );
}
