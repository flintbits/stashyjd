import React from "react";
import styles from "./ApplicationOverview.module.css";
import { formatRelativeDate } from "../../../../utils/formatDate";

export default function ApplicationOverview({ application }) {
  return (
    <div className={styles["detail-grid"]}>
      <div className={styles["detail-card"]}>
        <div className={styles["card-header"]}>
          <h3>Application Info</h3>
        </div>

        <div className={styles["info-list"]}>
          <div className={styles["info-row"]}>
            <span className={styles.label}>Role</span>
            <span className={styles.value}>{application.role_title}</span>
          </div>

          {application.department && (
            <div className={styles["info-row"]}>
              <span className={styles.label}>Department</span>
              <span className={styles.value}>{application.department}</span>
            </div>
          )}

          <div className={styles["info-row"]}>
            <span className={styles.label}>Location</span>

            <div className={styles.value}>
              {`${application.location} (${application.work_type})`}
            </div>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles.label}>Job URL</span>
            <a href="#" className={styles["job-link"]}>
              {application.job_url}
            </a>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles.label}>Source</span>
            <span className={styles.value}>{application.source}</span>
          </div>
        </div>
      </div>

      <div className={styles["detail-card"]}>
        <div className={styles["card-header"]}>
          <h3>Compensation & Status</h3>
        </div>

        <div className={styles["info-list"]}>
          <div className={styles["info-row"]}>
            <span className={styles.label}>Salary</span>

            <span className={styles.value}>
              {`${application.salary_min} - ${application.salary_max} ${application.currency}`}
            </span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles.label}>Priority</span>

            <span className={`${styles.value} ${styles["priority-high"]}`}>{application.priority}</span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles.label}>Applied Date</span>

            <span className={styles.value}>
              {formatRelativeDate(application.created_at).relative}
            </span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles.label}>Next Step</span>

            <span className={styles.value}>Technical Interview</span>
          </div>

          <div className={styles["info-row"]}>
            <span className={styles.label}>Deadline</span>

            <span className={styles.value}>Nov 10, 2023</span>
          </div>
        </div>
      </div>
    </div>
  );
}
