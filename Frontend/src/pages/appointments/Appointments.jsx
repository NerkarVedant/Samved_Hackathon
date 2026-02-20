import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

export default function Appointments() {
  const user = useAuthStore((s) => s.user);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: { specialization: "Cardiology" },
      appointmentDateTime: "2026-02-25T10:00",
      status: "BOOKED",
    },
    {
      id: 2,
      doctor: { specialization: "Dermatology" },
      appointmentDateTime: "2026-02-26T12:00",
      status: "COMPLETED",
    },
  ]);

  const [symptomInput, setSymptomInput] = useState("");
  const [recommendedDoctors, setRecommendedDoctors] = useState([]);

  const [form, setForm] = useState({
    doctorName: "",
    dateTime: "",
  });

  // 🔹 Hardcoded symptom → specialization mapping
  const symptomDoctorMap = {
    fever: ["General Physician", "Infectious Disease Specialist"],
    cough: ["Pulmonologist", "General Physician"],
    chest: ["Cardiologist"],
    skin: ["Dermatologist"],
    headache: ["Neurologist", "General Physician"],
    stomach: ["Gastroenterologist"],
  };

  const handleSymptomCheck = () => {
    const lower = symptomInput.toLowerCase();

    let matches = [];

    Object.keys(symptomDoctorMap).forEach((key) => {
      if (lower.includes(key)) {
        matches = symptomDoctorMap[key];
      }
    });

    setRecommendedDoctors(matches);
  };

  const handleBook = (e) => {
    e.preventDefault();

    if (!form.doctorName || !form.dateTime) return;

    const newAppointment = {
      id: Date.now(),
      doctor: { specialization: form.doctorName },
      appointmentDateTime: form.dateTime,
      status: "BOOKED",
    };

    setAppointments([...appointments, newAppointment]);

    setForm({
      doctorName: "",
      dateTime: "",
    });

    setRecommendedDoctors([]);
    setSymptomInput("");
  };

  const handleStatusUpdate = (id, status) => {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status } : a
    );
    setAppointments(updated);
  };

  return (
    <div className="space-y-6">

      {user?.role === "CITIZEN" && (
        <div className="space-y-6">

          {/* Symptom Recommendation Box */}
          <div className="bg-[var(--color-surface)] p-6 border border-[var(--color-border)] space-y-4">
            <h2 className="text-xl font-semibold">
              Describe Your Symptoms
            </h2>

            <input
              placeholder="Example: I have chest pain and cough"
              className="w-full p-2 border border-[var(--color-border)]"
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
            />

            <button
              onClick={handleSymptomCheck}
              className="px-4 py-2 bg-black text-white"
            >
              Get Recommendations
            </button>

            {recommendedDoctors.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="font-medium">Recommended Specialists:</p>

                {recommendedDoctors.map((doc, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setForm({ ...form, doctorName: doc })
                    }
                    className="block w-full text-left p-2 border border-[var(--color-border)] hover:bg-gray-100"
                  >
                    {doc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Booking Form */}
          <form
            onSubmit={handleBook}
            className="bg-[var(--color-surface)] p-6 border border-[var(--color-border)] space-y-4"
          >
            <h2 className="text-xl font-semibold">
              Book Appointment
            </h2>

            <input
              placeholder="Doctor Specialization"
              className="w-full p-2 border border-[var(--color-border)]"
              value={form.doctorName}
              onChange={(e) =>
                setForm({ ...form, doctorName: e.target.value })
              }
            />

            <input
              type="datetime-local"
              className="w-full p-2 border border-[var(--color-border)]"
              value={form.dateTime}
              onChange={(e) =>
                setForm({ ...form, dateTime: e.target.value })
              }
            />

            <button className="px-4 py-2 bg-black text-white">
              Book
            </button>
          </form>
        </div>
      )}

      {/* Appointment Table */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)]">
        <table className="w-full text-sm">
          <thead className="border-b border-[var(--color-border)]">
            <tr>
              <th className="p-3 text-left">Doctor</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              {user?.role === "DOCTOR" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-b border-[var(--color-border)]">
                <td className="p-3">{a.doctor.specialization}</td>
                <td className="p-3">
                  {new Date(a.appointmentDateTime).toLocaleString()}
                </td>
                <td className="p-3">{a.status}</td>

                {user?.role === "DOCTOR" && (
                  <td className="p-3 space-x-3">
                    <button
                      onClick={() =>
                        handleStatusUpdate(a.id, "COMPLETED")
                      }
                      className="text-green-600"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(a.id, "CANCELLED")
                      }
                      className="text-red-600"
                    >
                      Cancel
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}