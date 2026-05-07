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

const DOCUMENT_TABS = [
  { id: "all", label: "All Documents", count: 24, icon: AllDocumentsIcon },
  { id: "resume", label: "Resumes", count: 8, icon: AllResumeIcon },
  {
    id: "cover_letter",
    label: "Cover Letters",
    count: 6,
    icon: AllCoverLetterIcon,
  },
];

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const columns = useMemo(() => baseColumns, []);
  const { addToast } = useToast();
  const [data, setData] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);

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
    try {
      const data = await documentPageApi.fetchAllDocumets();
      console.log(data);

      if (data.status === "warning") {
        addToast({
          title: "Warning",
          message: data.message,
          type: "warning",
        });
      } else if (data.status === "success") {
        setData(data.data);
      }
    } catch (e) {
      addToast({
        title: "Error",
        message: e,
        type: "error",
      });
    }
  }

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="documents-page">
      <PageHeader
        title="Documents"
        subtitle="Manage resumes, cover letters, and other documents for your applications"
      >
        <div className="document-header-action">
          <DropZone
            label="Upload Resume"
            type="resume"
            successCallback={fetchDocuments}
          />
          <DropZone
            label="Upload Cover Letter"
            type="cover_letter"
            successCallback={fetchDocuments}
          />
        </div>
      </PageHeader>

      <section className="document-page-main">
        <section className="document-tabs">
          {DOCUMENT_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                className={`tab ${isActive ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon className="tab-icon" />

                <span className="tab-label">{tab.label}</span>

                <span className="tab-count">{tab.count}</span>
              </button>
            );
          })}
        </section>

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
