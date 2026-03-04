import DiffChecker from "../components/DiffChecker";
import Description from "../components/Description";   // 👈 ADD THIS

export default function ToolHome() {
  return (
    <div className="min-h-screen">
      <DiffChecker />

      {/*  How It Works Section */}
      <Description />
    </div>
  );
}