import { useNavigate } from "react-router-dom";

export default function ApplicationsPage() {
  //router test
  const navigate = useNavigate();
  return (
    <div>
      <h1>Applications Page</h1>
      <button onClick={() => navigate("/")}>Go to Dashboard</button>
      <button onClick={() => navigate("/applications")}>
        Go to Applications
      </button>
    </div>
  );
}
