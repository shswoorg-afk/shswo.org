import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { advisorLogin } from "../serverFunc/advisor.login"; 
export default function AdvisorLogin() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await advisorLogin({
        data: { mobile, password },
      });
      navigate({to : "/dashboard"})
      setSuccess(result.message);

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to log in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-blue-800 rounded-lg font-bold flex justify-center items-center px-6 flex-col">
      <h1 className="text-white text-xl mb-4">Advisor Login</h1>

      <form
        onSubmit={handleLogin}
        className="bg-blue-300 border border-blue-950 flex flex-col w-full max-w-xl mx-auto gap-y-2 p-8 sm:p-20"
      >
        <label htmlFor="mobile">Your Phone Number</label>
        <input
          id="mobile"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          required
          value={mobile}
          onChange={(event) => setMobile(event.target.value)}
          className="custom-input"
          placeholder="1234567890"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="custom-input"
          placeholder="Your password"
        />

        {error && (
          <p role="alert" className="text-sm text-red-800">{error}</p>
        )}

        {success && (
          <p role="status" className="text-sm text-green-900">{success}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-950 text-white rounded-2xl p-2 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex justify-center items-center">
          <Link
            to="/signup/advisor"
            className="text-sm underline underline-offset-2 text-center"
          >
            Sign up as an Advisor?
          </Link>
        </div>
      </form>
    </div>
  );
}
