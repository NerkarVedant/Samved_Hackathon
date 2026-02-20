import { useEffect, useState } from "react";
import { getAreaRisk } from "../../api/dashboardApi";

export default function CitizenDashboard() {
  const [risk, setRisk] = useState(null);

  useEffect(() => {
    getAreaRisk("area123").then((res) => setRisk(res.data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      <Card title="Area Risk" value={risk?.riskLevel || "HIGH"} />
      <Card title="AQI" value="132 (Moderate)" />
      <Card title="Water Quality" value="Good" />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-[var(--color-surface)] p-6 border border-[var(--color-border)]">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl mt-2">{value}</p>
    </div>
  );
}
