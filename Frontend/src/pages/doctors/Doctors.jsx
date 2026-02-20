import { useEffect, useState } from "react";
import { getDoctors, createDoctor } from "../../api/doctorApi";
import { getHospitals } from "../../api/hospitalApi";
import { useAuthStore } from "../../store/useAuthStore";

export default function Doctors() {
  const user = useAuthStore((s) => s.user);

  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    userId: "",
    hospitalId: "",
    specialization: "",
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const d = await getDoctors();
      setDoctors(d.data);

      if (user?.role === "HOSPITAL_ADMIN") {
        const h = await getHospitals();
        setHospitals(h.data);
      }

      setError("");
    } catch {
      setError("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.userId || !form.hospitalId || !form.specialization) {
      setError("All fields are required");
      return;
    }

    try {
      await createDoctor(form);

      setForm({
        userId: "",
        hospitalId: "",
        specialization: "",
      });

      loadData();
    } catch {
      setError("Failed to create doctor");
    }
  };

  if (loading) return <p>Loading doctors...</p>;

  return (
    <div className="space-y-6">

      {/* CREATE DOCTOR - HOSPITAL_ADMIN ONLY */}
      {user?.role === "HOSPITAL_ADMIN" && (
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--color-surface)] p-6 border border-[var(--color-border)] space-y-4"
        >
          <h2 className="text-xl font-semibold">Assign Doctor</h2>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <input
            placeholder="User ID (must have DOCTOR role)"
            className="w-full p-2 border border-[var(--color-border)]"
            value={form.userId}
            onChange={(e) =>
              setForm({ ...form, userId: e.target.value })
            }
          />

          <select
            className="w-full p-2 border border-[var(--color-border)]"
            value={form.hospitalId}
            onChange={(e) =>
              setForm({ ...form, hospitalId: e.target.value })
            }
          >
            <option value="">Select Hospital</option>
            {hospitals.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Specialization"
            className="w-full p-2 border border-[var(--color-border)]"
            value={form.specialization}
            onChange={(e) =>
              setForm({ ...form, specialization: e.target.value })
            }
          />

          <button className="px-4 py-2 bg-black text-white font-medium">
            Assign Doctor
          </button>
        </form>
      )}

      {/* DOCTOR TABLE */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)]">
        <table className="w-full text-sm">
          <thead className="border-b border-[var(--color-border)]">
            <tr>
              <th className="p-3 text-left">Doctor</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Hospital</th>
              <th className="p-3 text-left">Specialization</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d) => (
              <tr
                key={d.id}
                className="border-b border-[var(--color-border)]"
              >
                <td className="p-3">{d.user?.username}</td>
                <td className="p-3">{d.user?.email}</td>
                <td className="p-3">{d.hospital?.name}</td>
                <td className="p-3">{d.specialization}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {doctors.length === 0 && (
          <p className="p-4 text-[var(--color-secondary-text)]">
            No doctors assigned
          </p>
        )}
      </div>
    </div>
  );
}
