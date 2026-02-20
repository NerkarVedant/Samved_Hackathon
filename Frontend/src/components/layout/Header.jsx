import { useAuthStore } from "../../store/useAuthStore";

export default function Header() {
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="font-medium">{user?.username}</div>
      <button
        onClick={logout}
        className="text-sm font-medium text-red-600"
      >
        Logout
      </button>
    </header>
  );
}
