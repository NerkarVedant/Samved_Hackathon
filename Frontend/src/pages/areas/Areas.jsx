import { useEffect, useState } from "react";
import { getAreas, createArea } from "../../api/areaApi";

export default function Areas() {
  const [areas, setAreas] = useState([]);
  const [form, setForm] = useState({ wardNumber: "", name: "" });

  const load = async () => {
    const res = await getAreas();
    setAreas(res.data);
  };

  useEffect(() => {
	load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createArea(form);
    load();
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--color-surface)] p-6 border border-[var(--color-border)] space-y-3"
      >
        <h2 className="text-xl font-semibold">Create Area</h2>
        <input
          placeholder="Ward Number"
          className="w-full p-2 border border-[var(--color-border)]"
          onChange={(e) =>
            setForm({ ...form, wardNumber: e.target.value })
          }
        />
        <input
          placeholder="Area Name"
          className="w-full p-2 border border-[var(--color-border)]"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <button className="px-4 py-2 bg-black text-white">
          Create
        </button>
      </form>

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)]">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="p-3 text-left">Ward</th>
              <th className="p-3 text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            {areas.map((a) => (
              <tr key={a.id} className="border-t border-[var(--color-border)]">
                <td className="p-3">{a.wardNumber}</td>
                <td className="p-3">{a.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
