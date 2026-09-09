import { LuX } from "react-icons/lu";
import styles from "./RightPannelHeader.module.css";

export default function RightPannelHeader({ setShowRight, title }) {
  return (
    <section className={styles["header-block"]}>
      <h3 className={styles["header-side-title"]}>{title}</h3>

      <div className={styles["window-actions"]}>
        <LuX
          size={16}
          color="var(--text-tertiary)"
          onClick={() => setShowRight(false)}
          style={{ cursor: "pointer" }}
          title="Close"
        />
      </div>
    </section>
  );
}
