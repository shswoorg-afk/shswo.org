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
      navigate({ to: "/dashboard" })
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
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10 font-sans">
      <div className="w-full max-w-md">
        <header className="mb-8 flex flex-col items-center text-center">
          <img
            src="/logo.webp"
            alt="SHSWO logo"
            className="mb-4 h-20 w-20 object-contain"
          />

          <h1 className="text-3xl font-bold tracking-tight text-green-700">
            SHSWO
          </h1>

          <p className="mt-1 text-sm font-semibold text-green-700">
            Advisor Login Portal
          </p>

          <p className="mt-5 text-xl font-semibold text-slate-800">
            Welcome back, Advisor
          </p>

          <p className="mt-2 text-sm font-normal text-slate-500">
            Sign in to access your advisor dashboard.
          </p>
        </header>

        <form
          onSubmit={handleLogin}
          className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8"
        >
          <div className="space-y-2">
            <label
              htmlFor="mobile"
              className="block text-sm font-semibold text-slate-700"
            >
              Phone Number
            </label>

            <input
              id="mobile"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              className="custom-input w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-normal outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="custom-input w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-normal outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700"
            >
              {error}
            </p>
          )}

          {success && (
            <p role="status" className="text-sm font-medium text-green-700">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm font-normal text-slate-600">
            Not an advisor?{" "}
            <Link
              to="/signup/advisor"
              className="font-semibold text-green-700 underline-offset-4 hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </form>

        <p className="mt-6 text-center text-xs font-normal text-slate-400">
          Saving Humanity Social Work Organization
        </p>
      </div>
    </main>

  );
}
