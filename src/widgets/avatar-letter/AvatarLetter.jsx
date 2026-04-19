import React from "react";
import "./AvatarLetter.css";

export default function AvatarLetter({ name, size = "medium" }) {
  const letter = name?.charAt(0).toUpperCase() || "?";

  const colorMap = {
    A: { color: "#2563eb", bg: "#dbeafe" },
    B: { color: "#16a34a", bg: "#dcfce7" },
    C: { color: "#dc2626", bg: "#fee2e2" },
    D: { color: "#f59e0b", bg: "#fef3c7" },
    E: { color: "#0891b2", bg: "#cffafe" },
    F: { color: "#db2777", bg: "#fce7f3" },
    G: { color: "#7c3aed", bg: "#ede9fe" },
    H: { color: "#ea580c", bg: "#ffedd5" },
    I: { color: "#0f766e", bg: "#ccfbf1" },
    J: { color: "#9333ea", bg: "#f3e8ff" },
    K: { color: "#1d4ed8", bg: "#dbeafe" },
    L: { color: "#15803d", bg: "#dcfce7" },
    M: { color: "#16a34a", bg: "#dcfce7" },
    N: { color: "#b91c1c", bg: "#fee2e2" },
    O: { color: "#d97706", bg: "#fef3c7" },
    P: { color: "#0e7490", bg: "#cffafe" },
    Q: { color: "#be185d", bg: "#fce7f3" },
    R: { color: "#6d28d9", bg: "#ede9fe" },
    S: { color: "#c2410c", bg: "#ffedd5" },
    T: { color: "#0f766e", bg: "#ccfbf1" },
    U: { color: "#7e22ce", bg: "#f3e8ff" },
    V: { color: "#1e40af", bg: "#dbeafe" },
    W: { color: "#166534", bg: "#dcfce7" },
    X: { color: "#991b1b", bg: "#fee2e2" },
    Y: { color: "#ca8a04", bg: "#fef3c7" },
    Z: { color: "#155e75", bg: "#cffafe" },

    default: { color: "#334155", bg: "#e2e8f0" },
  };

  const sizes = {
    small: "avatar-small",
    medium: "avatar-medium",
    large: "avatar-large",
  };

  const theme = colorMap[letter] || colorMap.default;

  return (
    <div
      className={`avatar-letter ${sizes[size]}`}
      style={{
        color: theme.color,
        backgroundColor: theme.bg,
      }}
    >
      {letter}
    </div>
  );
}
