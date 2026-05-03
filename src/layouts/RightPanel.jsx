export default function RightPanel({ setShowRight }) {
  return (
    <>
      <div
        style={{
          padding: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <h4 style={{ margin: 0 }}>Details</h4>
        <button
          onClick={() => setShowRight(false)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "var(--text-xl)",
            lineHeight: 1,
            padding: "0 4px",
          }}
          title="Close right panel"
        >
          ×
        </button>
      </div>
      <div style={{ padding: 16 }}>
        <p style={{ marginTop: 0 }}>Contextual info</p>
      </div>
    </>
  );
}
