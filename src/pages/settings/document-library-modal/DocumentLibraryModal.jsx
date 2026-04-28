import React from "react";
import { createPortal } from "react-dom";
import Modal from "../../../widgets/Modal/Modal";
import { CloseIcon, DocumentsIcon } from "../../../assets/icons/icon";
import "./DocumentLibraryModal.css";
import DocumentLibrarySidebar from "./components/library-sidebar/DoumentLibrarySidebar";
import DocumentLibraryTable from "./components/library-content/DocumentLibraryTable";

export default function DocumentLibraryModal({ isOpen, setIsOpen }) {
  const root = document.getElementById("modal-root");
  return createPortal(
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Modal.Header>
        <section className="document-modal-header">
          <div className="document-modal-header-content">
            <DocumentsIcon size={16} />
            <h1 className="document-modal-header-title">Document Library</h1>
          </div>

          <div className="document-modal-header-actions">
            {/* <SecondaryButton text="Cancel" />
            <SecondaryButton text="Save Draft" />
            <GradientButton
              text="Create Application"
              onClick={handleCreateApplication}
              loading={loading}
            /> */}
            <CloseIcon size={16} onClick={() => setIsOpen(false)} />
          </div>
        </section>
      </Modal.Header>

      <Modal.Body>
        <section className="document-modal-body">
          <DocumentLibrarySidebar />
          <DocumentLibraryTable />
        </section>
      </Modal.Body>
    </Modal>,
    root,
  );
}
