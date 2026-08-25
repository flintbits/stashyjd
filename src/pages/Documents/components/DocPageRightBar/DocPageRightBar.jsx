import React from "react";
import { LuX } from "react-icons/lu";
import styles from "./DocPageRightBar.module.css";
import getIcon from "../../../../utils/getIcon";
import { formatSize } from "../../../../utils/formatFileSize";
import SecondaryButton from "../../../../components/SecondaryButton/SecondaryButton";
import Button from "../../../../components/Button/Button";
import {
  DeleteIcon,
  DownloadIcon,
  PreviewIcon,
} from "../../../../assets/icons/icon";

export default function DocPageRightBar({ setShowRight, doc }) {
  return (
    <div className={styles["docpage-right-sidebar"]}>
      <section className={styles["docpage-block"]}>
        <h3 className={styles["docpage-side-title"]}>Document Details</h3>

        <div className={styles["window-actions"]}>
          <LuX
            size={16}
            color="var(--text-tertiary)"
            onClick={() => setShowRight(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
      </section>

      <section className={styles["docpage-resume-section"]}>
        <div className={styles["doc-left"]}>
          <div className={styles["doc-icon"]}>{getIcon(doc.mime_type)}</div>

          <div className={styles["doc-text"]}>
            <h4>{doc.original_file_name}</h4>
            <p>
              {doc.document_type === "resume" ? "Resume" : "Cover Letter"} • PDF
              • {formatSize(doc.file_size)}
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 0px",
        }}
      >
        <div style={{ flex: "1" }}>
          <Button text="Preview" leftIcon={PreviewIcon} variant="secondary" />
        </div>
        <div>
          <Button text="" leftIcon={DownloadIcon} variant="ghost" />
        </div>
      </section>
      <Button text="Delete Document" leftIcon={DeleteIcon} variant="danger" />

      {/* <pre>{JSON.stringify(doc, null, 2)}</pre> */}
    </div>
  );
}
