import { useNavigate } from "react-router-dom";
import "./ApplicationsPage.css";
import DataTable from "../../features/data-table/DataTable";
import { TABLEHEADERS } from "./configs";
import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../widgets/page-header/PageHeader";
import BottomDetailPanel from "./components/bottom-detail-panel/BottomDetailPanel";
import { useToast } from "../../app/context/ToastProvider";
import { applucationServiceApi } from "./service/applicationsService";
import { application_table_columns } from "./columns";

export default function ApplicationsPage() {
  const columns = useMemo(() => application_table_columns, []);
  const { addToast } = useToast();
  const [data, setData] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showRight, setShowRight] = useState(false);

  async function fetchDocuments() {
    try {
      const response = await applucationServiceApi.fetchAllApplications();

      console.log(response);

      if (response.status === "success") {
        setData(response.data);
        return;
      }

      addToast({
        title: response.status,
        message: response.message,
        type:
          response.status === "error"
            ? "error"
            : response.status === "success"
              ? "success"
              : "warning",
      });
    } catch (e) {
      addToast({
        title: "Error",
        message: String(e),
        type: "error",
      });
    }
  }

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="applications-page">
      <PageHeader
        title="Applications"
        subtitle="Manage your applications"
      ></PageHeader>

      <section className="applications-page-main">
        <section className="table-container">
          <DataTable
            data={data}
            columns={columns}
            showFooter={false}
            onRowClick={(app) => {
              setSelectedApplication(app);
              setShowRight(true);
            }}
          />
        </section>

        <section>
          <BottomDetailPanel application={selectedApplication} />
        </section>
      </section>
    </div>
  );
}
