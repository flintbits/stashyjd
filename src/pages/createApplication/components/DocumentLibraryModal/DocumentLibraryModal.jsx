import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../../../../components/Modal/Modal";
import { CloseIcon, DocumentsIcon } from "../../../../assets/icons/icon";
import styles from "./DocumentLibraryModal.module.css";
import DocumentLibraryGrid from "./components/DocumentLibraryGrid/DocumentLibraryGrid";
import { documentPageApi } from "../../../Documents/services/documentsService";
import { useToast } from "../../../../app/context/ToastProvider";

export default function DocumentLibraryModal({ isOpen, setIsOpen }) {
  const [documents, setDocuments] = useState([]);
  const { addToast } = useToast();

  async function fetchDocuments() {
    //reset when tab changes to avoid stale state
    setDocuments([]);

    try {
      const response = await documentPageApi.fetchAllDocumets({
        docType: null,
      });

      console.log(response);

      if (response.status === "success") {
        setDocuments(response.data);
        return;
      }
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

    return () => {
      setIsOpen(false);
    };
  }, []);

  const root = document.getElementById("modal-root");
  return createPortal(
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Modal.Header>
        <section className={styles["document-modal-header"]}>
          <div className={styles["document-modal-header-content"]}>
            <DocumentsIcon size={16} />
            <h1 className={styles["document-modal-header-title"]}>Document Library</h1>
          </div>

          <div className={styles["document-modal-header-actions"]}>
            <CloseIcon size={16} onClick={() => setIsOpen(false)} />
          </div>
        </section>
      </Modal.Header>

      <Modal.Body>
        <section className={styles["document-library-grid-wrapper"]}>
          <DocumentLibraryGrid documents={documents} />
        </section>
      </Modal.Body>
    </Modal>,
    root,
  );
}
