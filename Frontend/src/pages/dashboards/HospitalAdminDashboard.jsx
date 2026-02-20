import { useEffect, useState } from "react";
import { getDoctors } from "../../api/doctorApi";

export default function HospitalAdminDashboard() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors().then((res) => setDoctors(res.data));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6">
      <Card title="Doctors" value={doctors.length} />
      <Card title="Bed Status" value="Operational" />
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
