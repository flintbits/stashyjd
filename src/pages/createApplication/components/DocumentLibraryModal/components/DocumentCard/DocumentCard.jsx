import { PdfThumbnail } from "../../../../../../components/PdfThumbnail/PdfThumbnail";
import styles from "./DocumentCard.module.css";

const selected = null;
export function DocumentCard({ document }) {
  return (
    <button className={`${styles["document-card"]} ${selected ? styles.selected : ""}`}>
      <div className={styles["document-preview"]}>
        <PdfThumbnail filePath={document.file_path} />
      </div>

      <div className={styles["document-info"]}>
        <h4>{document.original_file_name}</h4>

        <span className={styles["document-type"]}>{document.document_type}</span>

        <span className={styles["document-size"]}>
          {(document.file_size / 1024).toFixed(1)} KB
        </span>
      </div>
    </button>
  );
}
