import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function Sidebar() {
  const user = useAuthStore((s) => s.user);

  const linkStyle = ({ isActive }) =>
    `block px-4 py-2 rounded text-sm font-medium transition
     ${
       isActive
         ? "bg-black text-white"
         : "text-[var(--color-secondary-text)] hover:bg-gray-100"
     }`;

  return (
    <aside className="w-64 h-full bg-[var(--color-surface)] border-r border-[var(--color-border)] flex flex-col">
      
      {/* Header */}
      <div className="p-6 border-b border-[var(--color-border)]">
        <h1 className="text-2xl font-semibold">Sanjeevani</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">

        <NavLink to="/dashboard" className={linkStyle}>
          Dashboard
        </NavLink>

        {user?.role === "CITIZEN" && (
          <>
            <NavLink to="/appointments" className={linkStyle}>
              Appointments
            </NavLink>

            <NavLink to="/profile" className={linkStyle}>
              Profile
            </NavLink>

            <NavLink to="/symptoms" className={linkStyle}>
              Report Symptom
            </NavLink>
          </>
        )}

        {user?.role === "SUPER_ADMIN" && (
          <>
            <NavLink to="/areas" className={linkStyle}>
              Areas
            </NavLink>

            <NavLink to="/hospitals" className={linkStyle}>
              Hospitals
            </NavLink>
          </>
        )}

        {user?.role === "HOSPITAL_ADMIN" && (
          <NavLink to="/doctors" className={linkStyle}>
            Doctors
          </NavLink>
        )}

        {user?.role === "DOCTOR" && (
          <NavLink to="/appointments" className={linkStyle}>
            Appointments
          </NavLink>
        )}
      </nav>
    </aside>
  );
}