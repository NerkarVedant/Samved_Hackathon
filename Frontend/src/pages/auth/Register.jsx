import { useState } from "react";
import { register } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[var(--color-surface)] p-8 w-96 space-y-4 border border-[var(--color-border)]"
      >
        <h1 className="text-2xl font-semibold">Register</h1>

        <input
          className="w-full p-2 border border-[var(--color-border)]"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

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
          Register
        </button>
      </form>
    </div>
  );
}
