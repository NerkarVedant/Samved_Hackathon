import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { generateFakeJWT, setToken } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const mobile = form.mobile.value;

    if (!/^\+91\d{10}$/.test(mobile)) {
      setError("Enter a valid +91 mobile number.");
      return;
    }

    const token = generateFakeJWT({
      mobile,
      role: "user",
      issuedAt: Date.now(),
    });

    setToken(token);
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <form
        onSubmit={handleSubmit}
        className="w-[320px] bg-surface border border-border rounded-md p-6"
      >
        <h1 className="text-lg font-heading font-semibold mb-1">
          Login
        </h1>
        <p className="text-sm text-textSecondary mb-4">
          Authorized access only
        </p>

        {error && (
          <p className="text-sm text-red-600 mb-3">{error}</p>
        )}

        <input
          name="mobile"
          placeholder="+911234567890"
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
  Sign in
</button>

<p className="mt-4 text-center text-sm text-textSecondary">
  New user?{" "}
  <span
    onClick={() => navigate("/register")}
    className="cursor-pointer font-medium text-primary hover:underline"
  >
    Register now
  </span>
</p>

      </form>
    </div>
  );
}
