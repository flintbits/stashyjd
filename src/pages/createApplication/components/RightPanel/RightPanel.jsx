import React, { useEffect, useMemo, useState } from "react";
import styles from "./RightPanel.module.css";
import { LuFileText, LuX } from "react-icons/lu";
import { documentPageApi } from "../../../Documents/services/documentsService";
import { useToast } from "../../../../app/context/ToastProvider";
import { formatRelativeDate } from "../../../../utils/formatDate";
import getIcon from "../../../../utils/getIcon";
import Button from "../../../../components/Button/Button";
import DropZone from "../../../../features/DropZone/DropZone";
import LabeledToggle from "../../../../components/LabeledToggle/LabeledToggle";
import DocumentLibraryModal from "../DocumentLibraryModal/DocumentLibraryModal";

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
    <div className={styles["create-application-right-sidebar"]}>
      <section className={styles["create-application-block"]}>
        <h3 className={styles["create-application-side-title"]}>Application Documents</h3>

        <div className={styles["window-actions"]}>
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
        <h4 className={styles["section-title"]}>Resumes</h4>

        <div className={styles["all-docs-list"]}>
          {resumes.slice(0, 2).map((resume) => {
            const isSelected = selectedResume === resume.public_id;
            return (
              <div
                className={`${styles["resume-card"]} ${isSelected ? styles.selected : ""}`}
                key={resume.public_id}
                onClick={() => setSelectedResume(resume.public_id)}
                style={{
                  cursor: "pointer",
                  border: isSelected
                    ? "1px solid var(--primary)"
                    : "1px solid transparent",
                }}
              >
                <div className={styles["doc-icon"]}>{getIcon(resume.mime_type)}</div>
                <div className={styles["doc-info"]}>
                  <span className={styles["doc-name"]} title={resume.original_file_name}>
                    {resume.original_file_name}
                  </span>

                  <span className={styles["doc-date"]}>
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
          <h4 className={styles["section-title"]}>Cover Letters</h4>
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

        <div className={styles["all-docs-list"]}>
          {coverLetters.slice(0, 2).map((cover) => {
            const isSelected =
              selectedCoverLetter === cover.public_id && includeCoverLetter;
            return (
              <div
                className={`${styles["resume-card"]} ${isSelected ? styles.selected : ""}`}
                key={cover.public_id}
                onClick={() => setSelectedCoverLetter(cover.public_id)}
                style={{
                  cursor: "pointer",
                  border: isSelected
                    ? "1px solid var(--primary)"
                    : "1px solid transparent",
                }}
              >
                <div className={styles["doc-icon"]}>{getIcon(cover.mime_type)}</div>

                <div className={styles["doc-info"]}>
                  <span className={styles["doc-name"]} title={cover.original_file_name}>
                    {cover.original_file_name}
                  </span>

                  <span className={styles["doc-date"]}>
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
