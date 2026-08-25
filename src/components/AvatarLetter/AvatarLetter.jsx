import React from "react";
import styles from "./AvatarLetter.module.css";

export default function AvatarLetter({ name, size = "medium" }) {
  const letter = name?.charAt(0).toUpperCase() || "?";

  const colorMap = {
    A: { color: "#dbeafe", bg: "#2563eb" },
    B: { color: "#dcfce7", bg: "#16a34a" },
    C: { color: "#fee2e2", bg: "#dc2626" },
    D: { color: "#fef3c7", bg: "#f59e0b" },
    E: { color: "#cffafe", bg: "#0891b2" },
    F: { color: "#fce7f3", bg: "#db2777" },
    G: { color: "#ede9fe", bg: "#7c3aed" },
    H: { color: "#ffedd5", bg: "#ea580c" },
    I: { color: "#ccfbf1", bg: "#0f766e" },
    J: { color: "#f3e8ff", bg: "#9333ea" },
    K: { color: "#dbeafe", bg: "#1d4ed8" },
    L: { color: "#dcfce7", bg: "#15803d" },
    M: { color: "#dcfce7", bg: "#16a34a" },
    N: { color: "#fee2e2", bg: "#b91c1c" },
    O: { color: "#fef3c7", bg: "#d97706" },
    P: { color: "#cffafe", bg: "#0e7490" },
    Q: { color: "#fce7f3", bg: "#be185d" },
    R: { color: "#ede9fe", bg: "#6d28d9" },
    S: { color: "#ffedd5", bg: "#c2410c" },
    T: { color: "#ccfbf1", bg: "#0f766e" },
    U: { color: "#f3e8ff", bg: "#7e22ce" },
    V: { color: "#dbeafe", bg: "#1e40af" },
    W: { color: "#dcfce7", bg: "#166534" },
    X: { color: "#fee2e2", bg: "#991b1b" },
    Y: { color: "#fef3c7", bg: "#ca8a04" },
    Z: { color: "#cffafe", bg: "#155e75" },

    default: { color: "#e2e8f0", bg: "#334155" },
  };

  const sizes = {
    small: styles["avatar-small"],
    medium: styles["avatar-medium"],
    large: styles["avatar-large"],
  };

  const theme = colorMap[letter] || colorMap.default;

  return (
    <div
      className={`${styles["avatar-letter"]} ${sizes[size]}`}
      style={{
        color: theme.color,
        backgroundColor: theme.bg,
      }}
    >
      {letter}
    </div>
  );
}
