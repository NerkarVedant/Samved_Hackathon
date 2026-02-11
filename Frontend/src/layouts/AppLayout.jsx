import { useNavigate, useLocation } from "react-router-dom";
import { removeToken } from "../utils/auth";

export default function AppLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Records", path: "/records" },
    { label: "Profile", path: "/profile" },
  ];

  function logout() {
    removeToken();
    navigate("/");
  }

  return (
    /* ROOT: lock app to viewport */
    <div className="h-screen w-screen bg-bg overflow-hidden flex flex-col">
      
      {/* HEADER (fixed height) */}
      <header className="shrink-0 h-14 mx-4 mt-4 mb-3 bg-surface border border-border rounded-md flex items-center justify-between px-4">
        <h1 className="font-heading font-semibold text-lg">
          Government Healthcare Portal
        </h1>

        <button
          onClick={logout}
          className="text-sm text-primary hover:underline"
        >
          Logout
        </button>
      </header>

      {/* BODY AREA (takes remaining height) */}
      <div className="flex flex-1 gap-4 px-4 pb-4 min-h-0">
        
        {/* SIDEBAR (fixed width, full height of body) */}
        <aside className="w-64 bg-surface border border-border rounded-md p-4 shrink-0">
          <p className="text-sm text-textSecondary mb-3 font-medium">
            Navigation
          </p>

          <ul className="space-y-2 text-sm">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <li
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`cursor-pointer rounded-sm px-2 py-1 ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-textSecondary hover:text-primary"
                  }`}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        </aside>

        {/* MAIN CONTENT (ONLY THIS SCROLLS) */}
        <main className="flex-1 bg-surface border border-border rounded-md p-6 overflow-y-auto min-h-0">
          {children}
        </main>
      </div>
    </div>
  );
}
