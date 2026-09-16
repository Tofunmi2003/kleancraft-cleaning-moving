"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!supabase) {
      setError("Supabase is not configured yet. Add your project credentials before logging in.");
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (signInError) throw signInError;

      if (data.session) {
        router.push("/admin");
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to log in right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-16 md:py-24">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
        <p className="section-kicker">Restricted staff access</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-900">Admin login</h1>

        <p className="mt-4 text-sm text-slate-600">
          This area is only for approved cleaning staff and management.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white"
              placeholder="staff@kleancraft.com"
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white"
              placeholder="••••••••"
              required
            />
          </label>

          {error ? <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

          <button type="submit" className="btn-primary h-12 w-full text-sm" disabled={loading}>
            {loading ? "Please wait..." : "Login to admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
