import React from "react";
import SecondaryButton from "../../../components/SecondaryButton/SecondaryButton";
import styles from "./CustomBlocks.module.css";

export default function JobDescriptionBlock({ values, onChange }) {
  return (
    <div className={`${styles["custom-block"]} ${styles["job-description-block"]}`}>
      <div className={styles["jd-body"]}>
        <div className={styles["jd-input-area"]}>
          <div className={styles["jd-header"]}>
            <label>Paste job description</label>
            <div className={styles["jd-actions"]}>
              {/* <SecondaryButton text="Extract Keywords" /> */}
              <button className={styles["text-btn"]}>Clear JD</button>
            </div>
          </div>
          <textarea
            placeholder="We are looking for a Senior Product Designer to lead design initiatives across web and mobile platforms..."
            value={values.job_description || ""}
            onChange={(e) =>
              onChange({
                target: { id: "job_description", value: e.target.value },
              })
            }
          />
          <span className={styles["jd-hint"]}>
            Tip: Paste the full job description for better keyword extraction.
          </span>
        </div>

        {/* <div className="jd-keywords-area">
          <label>Extracted Keywords (editable)</label>
          <div className="keyword-chips">
            <span className="chip">Product Design</span>
            <span className="chip">User Experience</span>
            <span className="chip">Figma</span>
            <span className="chip">Design Systems</span>
            <span className="chip">Prototyping</span>
            <span className="chip">User Research</span>
            <span className="chip">Wireframing</span>
            <span className="chip">Collaboration</span>
            <span className="chip">Stakeholders</span>
            <span className="chip">Usability</span>
            <span className="chip add">+</span>
          </div>
          <span className="jd-hint">Keyword extraction is local and may not be fully accurate.</span>
        </div> */}
      </div>
    </div>
  );
}
