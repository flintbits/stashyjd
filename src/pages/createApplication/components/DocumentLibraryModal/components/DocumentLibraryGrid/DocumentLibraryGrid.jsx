// DocumentLibraryGrid.jsx

import styles from "./DocumentLibraryGrid.module.css";
import { DocumentCard } from "../DocumentCard/DocumentCard";

function DocumentLibraryGrid({ documents = [] }) {
  if (!documents.length) {
    return (
      <section className={styles["document-library-grid-empty"]}>
        <div className={styles["document-library-grid-empty-content"]}>
          <h3>No Documents Found</h3>
          <p>
            Upload resumes or cover letters to start building your document
            library.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles["document-library-grid-wrapper"]}>
      <div className={styles["document-library-grid-header"]}>
        <div>
          <h2>Document Library</h2>
          <p>{documents.length} documents available</p>
        </div>
      </div>

      <div className={styles["document-grid"]}>
        {documents.map((doc) => (
          <DocumentCard
            key={doc.public_id}
            document={doc}
            // selected={selectedId === doc.public_id}
            // onSelect={() => setSelectedId(doc.public_id)}
          />
        ))}
      </div>
    </section>
  );
}

export default DocumentLibraryGrid;
