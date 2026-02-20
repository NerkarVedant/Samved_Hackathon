import { Routes, Route } from "react-router-dom";
import Shell from "../components/layout/Shell";
import ProtectedRoute from "../routes/ProtectedRoute";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import CitizenDashboard from "../pages/dashboards/CitizenDashboard";
import DoctorDashboard from "../pages/dashboards/DoctorDashboard";
import HospitalAdminDashboard from "../pages/dashboards/HospitalAdminDashboard";
import SuperAdminDashboard from "../pages/dashboards/SuperAdminDashboard";

import Appointments from "../pages/appointments/Appointments";
import Hospitals from "../pages/hospitals/Hospitals";
import Doctors from "../pages/doctors/Doctors";
import Areas from "../pages/areas/Areas";
import Symptoms from "../pages/symptoms/Symptoms";
import Profile from "../pages/profile/Profile";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Shell>
              <Routes>
                <Route path="/dashboard" element={<CitizenDashboard />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/hospitals" element={<Hospitals />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/areas" element={<Areas />} />
                <Route path="/symptoms" element={<Symptoms />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Shell>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
