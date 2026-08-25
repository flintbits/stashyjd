import React, { useState } from "react";
import SecondaryButton from "../../../../components/SecondaryButton/SecondaryButton";
import DropZone from "../../../../features/DropZone/DropZone";
import styles from "../CustomBlocks.module.css";

export default function DocumentsPickerBlock({ values, onChange }) {
  const [resumes, setResumes] = useState([]);
  const [coverLetters, setCoverLettes] = useState([]);

  return (
    <div className={`${styles["custom-block"]} ${styles["docs-matching-block"]}`}>
      <div className={styles["docs-columns"]}>
        <div className={styles["doc-col"]}>
          <label>Select Resume (choose one)</label>

          <div className={styles["doc-options"]}>
            <label className={`${styles["doc-option"]} ${styles.active}`}>
              <input type="radio" name="resume" defaultChecked />
              <div className={styles["doc-info"]}>
                <span className={styles["doc-name"]}>Senior_Designer_Resume.pdf</span>
                <span className={styles["doc-date"]}>Updated 2 days ago</span>
              </div>
              <span className={`${styles.badge} ${styles.success}`}>Best Match</span>
              <span className={styles.score}>82%</span>
            </label>

            <label className={styles["doc-option"]}>
              <input type="radio" name="resume" />
              <div className={styles["doc-info"]}>
                <span className={styles["doc-name"]}>Product_Designer_Resume.pdf</span>
                <span className={styles["doc-date"]}>Updated 1 week ago</span>
              </div>
              <span className={styles.score}>65%</span>
            </label>

            <label className={styles["doc-option"]}>
              <input type="radio" name="resume" />
              <div className={styles["doc-info"]}>
                <span className={styles["doc-name"]}>Design_Resume_2024.pdf</span>
                <span className={styles["doc-date"]}>Updated 3 weeks ago</span>
              </div>
              <span className={styles.score}>48%</span>
            </label>
          </div>
        </div>

        <div className={styles["doc-col"]}>
          <div className={styles["doc-header-row"]}>
            <label>Select Cover Letter (optional)</label>
            <div className={styles["toggle-row"]}>
              <span className={styles["toggle-label"]}>Include cover letter</span>
              <div className={`${styles.toggle} ${styles.active}`}></div>
            </div>
          </div>

          <div className={styles["doc-options"]}>
            <label className={`${styles["doc-option"]} ${styles.active}`}>
              <input type="radio" name="cover_letter" defaultChecked />
              <div className={styles["doc-info"]}>
                <span className={styles["doc-name"]}>
                  Senior_Designer_Cover_Letter.pdf
                </span>
                <span className={styles["doc-date"]}>2 days ago</span>
              </div>
            </label>

            <label className={styles["doc-option"]}>
              <input type="radio" name="cover_letter" />
              <div className={styles["doc-info"]}>
                <span className={styles["doc-name"]}>General_Cover_Letter.pdf</span>
                <span className={styles["doc-date"]}>1 week ago</span>
              </div>
            </label>

            <label className={styles["doc-option"]}>
              <input type="radio" name="cover_letter" />
              <div className={styles["doc-info"]}>
                <span className={styles["doc-name"]}>No Cover Letter</span>
              </div>
            </label>
          </div>
        </div>

        <div className={`${styles["doc-col"]} ${styles["matching-col"]}`}>
          <label>Matching Analysis (local)</label>
          <div className={styles["matching-analysis"]}>
            {/* Empty graph for now per instructions */}
            <div className={styles["circular-graph-placeholder"]}>
              <span className={styles["graph-value"]}>82%</span>
              <span className={styles["graph-label"]}>Match Score</span>
            </div>

            <div className={styles["matching-stats"]}>
              <div className={styles.stat}>
                <span className={`${styles.dot} ${styles.success}`}></span> Matched Keywords (18)
              </div>
              <div className={styles.stat}>
                <span className={`${styles.dot} ${styles.error}`}></span> Missing Keywords (4)
              </div>
            </div>

            <SecondaryButton text="Recalculate Match" />
          </div>
        </div>
      </div>

      <div className={styles["dropzone-section"]}>
        <DropZone type="resume" />
      </div>
    </div>
  );
}
