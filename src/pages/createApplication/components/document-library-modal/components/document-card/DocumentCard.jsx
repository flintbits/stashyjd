import { PdfThumbnail } from "../../../../../../features/pdf-thumbnail/PdfThumbnail";

const selected = null;
export function DocumentCard({ document }) {
  return (
    <button className={`document-card ${selected ? "selected" : ""}`}>
      <div className="document-preview">
        <PdfThumbnail filePath={document.file_path} />
      </div>

      <div className="document-info">
        <h4>{document.original_file_name}</h4>

        <span className="document-type">{document.document_type}</span>

        <span className="document-size">
          {(document.file_size / 1024).toFixed(1)} KB
        </span>
      </div>
    </button>
  );
}
