import { useState } from "react";
import { reportSymptom } from "../../api/symptomApi";

export default function Symptoms() {
  const [form, setForm] = useState({
    areaId: "",
    symptom: "",
    severity: "LOW",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await reportSymptom(form);
    alert("Reported");
  };

  return (
    <form className="bg-[var(--color-surface)] p-6 border border-[var(--color-border)] space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold">Report Symptom</h2>

      <input
        placeholder="Area ID"
        className="w-full p-2 border border-[var(--color-border)]"
        onChange={(e) =>
          setForm({ ...form, areaId: e.target.value })
        }
      />

      <textarea
        placeholder="Symptom"
        className="w-full p-2 border border-[var(--color-border)]"
        onChange={(e) =>
          setForm({ ...form, symptom: e.target.value })
        }
      />

      <select
        className="w-full p-2 border border-[var(--color-border)]"
        onChange={(e) =>
          setForm({ ...form, severity: e.target.value })
        }
      >
        <option value="LOW">LOW</option>
        <option value="HIGH">HIGH</option>
      </select>

      <button name="submit" onClick={handleSubmit} className="cursor-pointer px-4 py-2 bg-black text-white">
        Submit
      </button>
    </form>
  );
}
