import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const mobile = form.mobile.value;
    const aadhaar = form.aadhaar.value;

    if (!/^\+91\d{10}$/.test(mobile)) {
      setError("Mobile number must start with +91 and contain 10 digits.");
      return;
    }

    if (!/^\d{12}$/.test(aadhaar)) {
      setError("Aadhaar number must be exactly 12 digits.");
      return;
    }

    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <form
        onSubmit={handleSubmit}
        className="w-[360px] bg-surface border border-border rounded-md p-6"
      >
        <h1 className="text-lg font-heading font-semibold mb-1">
          User Registration
        </h1>
        <p className="text-sm text-textSecondary mb-4">
          Government Healthcare Portal
        </p>

        {error && (
          <p className="text-sm text-red-600 mb-3">{error}</p>
        )}

        <input
          name="name"
          placeholder="Full Name"
          required
          className="w-full mb-3 px-3 py-2 border border-border rounded-sm"
        />

        <textarea
          name="address"
          placeholder="Address"
          required
          className="w-full mb-3 px-3 py-2 border border-border rounded-sm"
        />

        <input
          name="mobile"
          placeholder="+911234567890"
          required
          className="w-full mb-3 px-3 py-2 border border-border rounded-sm"
        />

        <input
          name="aadhaar"
          placeholder="Aadhaar Number"
          required
          className="w-full mb-3 px-3 py-2 border border-border rounded-sm"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full mb-4 px-3 py-2 border border-border rounded-sm"
        />

        <button
  type="submit"
  className="
    w-full py-2 rounded-sm
    bg-primary text-white
    hover:bg-primary-hover
    focus:outline-none focus:ring-2 focus:ring-primary/30
  "
>
          Register
        </button>

        <p className="text-sm text-textSecondary mt-4 text-center">
          Already registered?{" "}
          <span
            onClick={() => navigate("/")}
            className="underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
