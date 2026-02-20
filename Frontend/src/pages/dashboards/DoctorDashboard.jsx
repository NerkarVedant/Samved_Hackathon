import { useEffect, useState } from "react";
import { getMyAppointments } from "../../api/appointmentApi";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getMyAppointments().then((res) => setAppointments(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">My Appointments</h1>
      <p>Total: {appointments.length}</p>
    </div>
  );
}
