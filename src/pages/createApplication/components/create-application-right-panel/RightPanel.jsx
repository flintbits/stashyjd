import React, { useEffect, useMemo, useState } from "react";
import "./RightPanel.css";
import { LuFileText, LuX } from "react-icons/lu";
import { documentPageApi } from "../../../documents-page/services/documentspageService";
import { useToast } from "../../../../app/context/ToastProvider";
import { formatRelativeDate } from "../../../../utils/formatDate";
import getIcon from "../../../../utils/getIcon";
import Button from "../../../../widgets/gradient-button/Button";
import DropZone from "../../../../features/dropzone/DropZone";
import LabeledToggle from "../../../../widgets/labeled-toggle/LabeledToggle";
import DocumentLibraryModal from "../document-library-modal/DocumentLibraryModal";

export default function RightPanel({
  setShowRight,
  selectedResume,
  setSelectedResume,
  selectedCoverLetter,
  setSelectedCoverLetter,
}) {
  const [documents, setDocuments] = useState([]);
  const [includeCoverLetter, setIncludeCoverLetter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addToast } = useToast();
  const resumes = useMemo(
    () => documents.filter((d) => d.document_type === "resume"),
    [documents],
  );
  const coverLetters = useMemo(
    () => documents.filter((d) => d.document_type === "cover_letter"),
    [documents],
  );

  useEffect(() => {
    fetchDocuments();
  }, []);

  async function fetchDocuments() {
    console.log("fetchDocuments called");

    try {
      const response = await documentPageApi.fetchAllDocumets({
        docType: null,
      });

      console.log(response);

      if (response.status === "success") {
        setDocuments(response.data);
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

  return (
    <div className="create-application-right-sidebar">
      <section className="create-application-block">
        <h3 className="create-application-side-title">Application Documents</h3>

        <div className="window-actions">
          <LuX
            size={16}
            color="var(--text-tertiary)"
            onClick={() => setShowRight(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
      </section>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 8,
        }}
      >
        <h4 className="section-title">Resumes</h4>

        <div className="all-docs-list">
          {resumes.slice(0, 2).map((resume) => {
            const isSelected = selectedResume === resume.public_id;
            return (
              <div
                className={`resume-card ${isSelected ? "selected" : ""}`}
                key={resume.public_id}
                onClick={() => setSelectedResume(resume.public_id)}
                style={{
                  cursor: "pointer",
                  border: isSelected
                    ? "1px solid var(--primary)"
                    : "1px solid transparent",
                }}
              >
                <div className="doc-icon">{getIcon(resume.mime_type)}</div>
                <div className="doc-info">
                  <span className="doc-name" title={resume.original_file_name}>
                    {resume.original_file_name}
                  </span>

                  <span className="doc-date">
                    {formatRelativeDate(resume.updated_at).absolute}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <DropZone
          type="resume"
          label="Upload Resume"
          successCallback={fetchDocuments}
        />
      </section>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h4 className="section-title">Cover Letters</h4>
          <LabeledToggle
            label="Include"
            defaultChecked={false}
            onChange={(value) => {
              setIncludeCoverLetter(value);

              if (!value) {
                setSelectedCoverLetter(null);
              }
            }}
          />
        </div>

        <div className="all-docs-list">
          {coverLetters.slice(0, 2).map((cover) => {
            const isSelected =
              selectedCoverLetter === cover.public_id && includeCoverLetter;
            return (
              <div
                className={`resume-card ${isSelected ? "selected" : ""}`}
                key={cover.public_id}
                onClick={() => setSelectedCoverLetter(cover.public_id)}
                style={{
                  cursor: "pointer",
                  border: isSelected
                    ? "1px solid var(--primary)"
                    : "1px solid transparent",
                }}
              >
                <div className="doc-icon">{getIcon(cover.mime_type)}</div>

                <div className="doc-info">
                  <span className="doc-name" title={cover.original_file_name}>
                    {cover.original_file_name}
                  </span>

                  <span className="doc-date">
                    {formatRelativeDate(cover.updated_at).absolute}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <DropZone
          type="cover_letter"
          label="Upload Cover Letter"
          successCallback={fetchDocuments}
        />
      </section>
      <Button
        text="View all documents"
        variant="ghost"
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <DocumentLibraryModal setIsOpen={setIsModalOpen} isOpen={isModalOpen} />
      )}
    </div>
  );
}
