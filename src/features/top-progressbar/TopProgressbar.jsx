import { useProgress } from "../../app/context/ProgressProvider";

export default function TopProgressBar() {
  const { progress, visible } = useProgress();

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: "3px",
        background: "#29d",
        transition: "width 0.2s ease",
        zIndex: 9999,
      }}
    />
  );
}
