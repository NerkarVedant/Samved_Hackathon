import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function RoleRoute({ children, allowed }) {
  const user = useAuthStore((s) => s.user);
  if (!user || !allowed.includes(user.role)) {
    return <Navigate to="/login" />;
  }
  return children;
}
