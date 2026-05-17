import React, { useEffect, useMemo, useState } from "react";
import PageHeader from "../../widgets/page-header/PageHeader";
import {
  AllCoverLetterIcon,
  AllDocumentsIcon,
  AllResumeIcon,
} from "../../assets/icons/icon";
import "./DocumentsPage.css";
import DataTable from "../../features/data-table/DataTable";
import { document_table_columns as baseColumns } from "./columns";
import { documentPageApi } from "./services/documentspageService";
import { useToast } from "../../app/context/ToastProvider";
import DropZone from "../../features/dropzone/DropZone";
import { useOutletContext } from "react-router-dom";
import DocPageRightBar from "./documents-page-rightbar/DocPageRightBar";
import TabsComponent from "../../features/tabs-component/TabsComponent";

const DOCUMENT_TABS = [
  { id: "all", label: "All Documents", icon: AllDocumentsIcon },
  { id: "resume", label: "Resumes", icon: AllResumeIcon },
  {
    id: "cover_letter",
    label: "Cover Letters",
    icon: AllCoverLetterIcon,
  },
];

export default function DocumentsPage() {
  const columns = useMemo(() => baseColumns, []);
  const { addToast } = useToast();
  const [data, setData] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [activeTab, setActivetab] = useState("all");
  const context = useOutletContext() || {};
  const { setRightPanelContent, setShowRight } = context;

  useEffect(() => {
    if (!setRightPanelContent) return;

    if (selectedDoc) {
      setRightPanelContent(
        <DocPageRightBar setShowRight={setShowRight} doc={selectedDoc} />,
      );
      setShowRight?.(true);
    } else {
      //here
      setRightPanelContent(null);
      setShowRight?.(false);
    }

    return () => {
      setRightPanelContent(null);
    };
  }, [selectedDoc, setRightPanelContent, setShowRight]);

  async function fetchDocuments() {
    //reset when tab changes to avoid stale state
    setData([]);

    try {
      const response = await documentPageApi.fetchAllDocumets({
        docType: activeTab === "all" ? null : activeTab,
      });

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
  }, [activeTab]);

  const handleTabChange = (tab_id) => {
    setActivetab(tab_id);
  };

  return (
    <div className="documents-page">
      <PageHeader
        title="Documents"
        subtitle="Manage resumes, cover letters, and other documents for your applications"
      >
        <div className="document-header-action">
          <DropZone
            key="resume"
            label="Upload Resume"
            type="resume"
            successCallback={fetchDocuments}
          />
          <DropZone
            key="cover_letter"
            label="Upload Cover Letter"
            type="cover_letter"
            successCallback={fetchDocuments}
          />
        </div>
      </PageHeader>

      <section className="document-page-main">
        <div style={{ padding: "16px" }}>
          <TabsComponent
            tabs={DOCUMENT_TABS}
            defaultTab="all"
            onChange={handleTabChange}
          />
        </div>

        <section className="table-container">
          <DataTable
            data={data}
            columns={columns}
            onRowClick={(doc) => {
              setSelectedDoc(doc);
              setShowRight(true);
            }}
          />
        </section>
      </section>
    </div>
  );
}
