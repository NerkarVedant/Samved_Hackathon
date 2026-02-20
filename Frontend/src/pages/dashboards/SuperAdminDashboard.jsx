import { useEffect, useState } from "react";
import { getAreas } from "../../api/areaApi";
import { getHospitals } from "../../api/hospitalApi";

export default function SuperAdminDashboard() {
  const [areas, setAreas] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    getAreas().then((res) => setAreas(res.data));
    getHospitals().then((res) => setHospitals(res.data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      <Card title="Total Areas" value={areas.length} />
      <Card title="Total Hospitals" value={hospitals.length} />
      <Card title="System Risk Monitor" value="Active" />
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
