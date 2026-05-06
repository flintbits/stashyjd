import { useNavigate } from "react-router-dom";
import "./ApplicationsPage.css";
import DataTable from "../../features/data-table/DataTable";
import { TABLEHEADERS } from "./configs";
import { columns as baseColumns } from "./columns";
import { useMemo } from "react";

const data = [
  { name: "Prathvin", email: "p@test.com", age: 24 },
  { name: "John", email: "j@test.com", age: 30 },
];

export default function ApplicationsPage() {
  const navigate = useNavigate();

  const columns = useMemo(() => baseColumns, []);
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
