import { useEffect, useState } from "react";
import { getHospitals, createHospital } from "../../api/hospitalApi";
import { getAreas } from "../../api/areaApi";
import { useAuthStore } from "../../store/useAuthStore";

export default function Hospitals() {
  const user = useAuthStore((s) => s.user);

  const [hospitals, setHospitals] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    areaId: "",
    totalBeds: "",
    availableBeds: "",
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const h = await getHospitals();
      setHospitals(h.data);

      if (user?.role === "SUPER_ADMIN") {
        const a = await getAreas();
        setAreas(a.data);
      }

      setError("");
    } catch {
      setError("Failed to load hospitals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.areaId || !form.totalBeds) {
      setError("All fields required");
      return;
    }

    try {
      await createHospital({
        ...form,
        totalBeds: Number(form.totalBeds),
        availableBeds: Number(form.availableBeds),
      });

      setForm({
        name: "",
        areaId: "",
        totalBeds: "",
        availableBeds: "",
      });

      loadData();
    } catch {
      setError("Failed to create hospital");
    }
  };

  if (loading) return <p>Loading hospitals...</p>;

  return (
    <div className="space-y-6">

      {/* CREATE FORM - SUPER ADMIN ONLY */}
      {user?.role === "SUPER_ADMIN" && (
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--color-surface)] p-6 border border-[var(--color-border)] space-y-4"
        >
          <h2 className="text-xl font-semibold">Create Hospital</h2>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <input
            placeholder="Hospital Name"
            className="w-full p-2 border border-[var(--color-border)]"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <select
            className="w-full p-2 border border-[var(--color-border)]"
            value={form.areaId}
            onChange={(e) =>
              setForm({ ...form, areaId: e.target.value })
            }
          >
            <option value="">Select Area</option>
            {areas.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.wardNumber})
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Total Beds"
            className="w-full p-2 border border-[var(--color-border)]"
            value={form.totalBeds}
            onChange={(e) =>
              setForm({ ...form, totalBeds: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Available Beds"
            className="w-full p-2 border border-[var(--color-border)]"
            value={form.availableBeds}
            onChange={(e) =>
              setForm({ ...form, availableBeds: e.target.value })
            }
          />

          <button className="px-4 py-2 bg-black text-white font-medium">
            Create Hospital
          </button>
        </form>
      )}

      {/* HOSPITAL TABLE */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)]">
        <table className="w-full text-sm">
          <thead className="border-b border-[var(--color-border)]">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Area</th>
              <th className="p-3 text-left">Total Beds</th>
              <th className="p-3 text-left">Available Beds</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((h) => (
              <tr
                key={h.id}
                className="border-b border-[var(--color-border)]"
              >
                <td className="p-3">{h.name}</td>
                <td className="p-3">{h.area?.name}</td>
                <td className="p-3">{h.totalBeds}</td>
                <td className="p-3">
                  <span
                    className={
                      h.availableBeds > 10
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {h.availableBeds}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {hospitals.length === 0 && (
          <p className="p-4 text-[var(--color-secondary-text)]">
            No hospitals available
          </p>
        )}
      </div>
    </div>
  );
}
