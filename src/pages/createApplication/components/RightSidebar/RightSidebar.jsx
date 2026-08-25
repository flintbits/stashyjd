import styles from "./RightSidebar.module.css";
import React from "react";
import {
  LuCheck,
  LuFileText,
  LuMoon,
  LuMinus,
  LuSquare,
  LuX,
} from "react-icons/lu";

export default function RightSidebar({ setShowRight }) {
  return (
    <div className={styles["create-app-right-sidebar"]}>
      <div className={styles["window-controls"]}>
        <div className={styles["window-actions"]}>
          <LuX
            size={16}
            color="var(--text-tertiary)"
            onClick={() => setShowRight(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      <div className={styles["match-summary-header"]}>
        <h3>Match Summary</h3>
        <h2 className={styles["match-score"]}>82%</h2>
      </div>

      <div className={styles["sidebar-section"]}>
        <h4 className={styles["section-title"]}>Selected Resume</h4>
        <div className={styles["selected-doc"]}>
          <LuFileText size={16} color="var(--text-secondary)" />
          <div className={styles["doc-info"]}>
            <span className={styles["doc-name"]}>Senior_Designer_Resume.pdf</span>
            <span className={styles["doc-date"]}>Updated 2 days ago</span>
          </div>
        </div>
      </div>

      <div className={styles["sidebar-section"]}>
        <h4 className={styles["section-title"]}>Top Matched Keywords</h4>
        <ul className={`${styles["keyword-list"]} ${styles.matched}`}>
          <li>
            <LuCheck size={14} color="var(--success)" /> Product Design
          </li>
          <li>
            <LuCheck size={14} color="var(--success)" /> User Experience
          </li>
          <li>
            <LuCheck size={14} color="var(--success)" /> Figma
          </li>
          <li>
            <LuCheck size={14} color="var(--success)" /> Design Systems
          </li>
          <li>
            <LuCheck size={14} color="var(--success)" /> Prototyping
          </li>
        </ul>
        <button className={styles["more-keywords-btn"]}>+ 13 more</button>
      </div>

      <div className={styles["sidebar-section"]}>
        <h4 className={styles["section-title"]}>Missing Keywords</h4>
        <ul className={`${styles["keyword-list"]} ${styles.missing}`}>
          <li>
            <span className={`${styles.dot} ${styles.error}`}></span> Motion Design
          </li>
          <li>
            <span className={`${styles.dot} ${styles.error}`}></span> A/B Testing
          </li>
          <li>
            <span className={`${styles.dot} ${styles.error}`}></span> Analytics
          </li>
          <li>
            <span className={`${styles.dot} ${styles.error}`}></span> Front-end Development
          </li>
        </ul>
      </div>

      <div className={styles["sidebar-section"]}>
        <h4 className={styles["section-title"]}>
          All Resumes <span className={styles.subtitle}>(sorted by match)</span>
        </h4>
        <div className={styles["all-resumes-list"]}>
          <div className={`${styles["resume-card"]} ${styles.active}`}>
            <LuFileText size={16} color="var(--brand-primary)" />
            <div className={styles["doc-info"]}>
              <span className={styles["doc-name"]}>Senior_Designer_Resume.pdf</span>
              <span className={styles["doc-date"]}>2 days ago</span>
            </div>
            <span className={styles["match-badge"]}>82%</span>
          </div>
          <div className={styles["resume-card"]}>
            <LuFileText size={16} color="var(--text-secondary)" />
            <div className={styles["doc-info"]}>
              <span className={styles["doc-name"]}>Product_Designer_Resume.pdf</span>
              <span className={styles["doc-date"]}>1 week ago</span>
            </div>
            <span className={`${styles["match-badge"]} ${styles.gray}`}>65%</span>
          </div>
          <div className={styles["resume-card"]}>
            <LuFileText size={16} color="var(--text-secondary)" />
            <div className={styles["doc-info"]}>
              <span className={styles["doc-name"]}>Design_Resume_2024.pdf</span>
              <span className={styles["doc-date"]}>3 weeks ago</span>
            </div>
            <span className={`${styles["match-badge"]} ${styles.gray}`}>48%</span>
          </div>
        </div>
        <button className={styles["view-all-btn"]}>View all documents</button>
      </div>

      <div className={`${styles["sidebar-section"]} ${styles["border-top"]}`}>
        <h4 className={styles["section-title"]}>Cover Letter</h4>
        <div className={`${styles["cover-letter-option"]} ${styles.active}`}>
          <LuFileText size={16} color="var(--text-primary)" />
          <div className={styles["doc-info"]}>
            <span className={styles["doc-name"]}>Senior_Designer_Cover_Letter.pdf</span>
            <span className={styles["doc-date"]}>2 days ago</span>
          </div>
          <div className={`${styles.toggle} ${styles.active}`}></div>
        </div>
        <div className={styles["cover-letter-option"]}>
          <div className={styles["circle-placeholder"]}></div>
          <span className={styles["doc-name"]}>No Cover Letter</span>
          <div className={styles.toggle}></div>
        </div>
      </div>
    </div>
  );
}
