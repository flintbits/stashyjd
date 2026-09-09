import { AddIcon } from "../../../../assets/icons/icon";
import Button from "../../../../components/Button/Button";
import styles from "./ApplicationInfo.module.css";

export default function ApplicationInfo() {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3>Application Info</h3>
        {/* <button className={styles.editButton}>✎ Edit</button> */}
        <Button text="Edit" variant="neutral" leftIcon={AddIcon} />
      </div>

      <div className={styles.info}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Status</span>
          <span className={styles.value}>
            <span className={styles.badge}>Applied</span>
          </span>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.label}>Applied on</span>
          <span className={styles.value}>May 12, 2026</span>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.label}>Source</span>
          <span className={styles.value}>LinkedIn</span>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.label}>Job URL</span>
          <a
            className={styles.value}
            href="https://linear.app/careers/123"
            target="_blank"
            rel="noreferrer"
          >
            https://linear.app/careers/123 ↗
          </a>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.label}>Department</span>
          <span className={styles.value}>Engineering</span>
        </div>
      </div>
    </section>
  );
}
