import { useNavigate } from "react-router-dom";
import styles from "./ApplicationsPage.module.css";
import DataTable from "../../components/DataTable/DataTable";
import { TABLEHEADERS } from "./configs";
import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import BottomDetailPanel from "./components/BottomDetailPanel/BottomDetailPanel";
import { useToast } from "../../app/context/ToastProvider";
import { applucationServiceApi } from "./services/applicationsService";
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
    <div className={styles["applications-page"]}>
      <PageHeader
        title="Applications"
        subtitle="Manage your applications"
      ></PageHeader>

      <section className={styles["applications-page-main"]}>
        <section className={styles["table-container"]}>
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
