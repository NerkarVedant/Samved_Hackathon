import { useState } from "react";
import { login } from "../../api/authApi";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
	console.log(form);
      const res = await login(form);
      setAuth(res.data, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials" + err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[var(--color-background)]">
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--color-surface)] p-8 w-96 space-y-4 border border-[var(--color-border)]"
      >
        <h1 className="text-2xl font-semibold">Login</h1>

        <input
          className="w-full p-2 border border-[var(--color-border)]"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full p-2 border border-[var(--color-border)]"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full p-2 bg-black text-white font-medium">
          Login
        </button>
      </form>
    </div>
  );
}
