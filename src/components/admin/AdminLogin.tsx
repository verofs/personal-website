"use client";

import { FormEvent, useState } from "react";

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    const response = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (!response.ok) {
      setError("Invalid credentials.");
      return;
    }
    onLogin();
  };

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <form onSubmit={submit} className="mx-auto max-w-sm rounded-xl border border-white/10 bg-white/[0.045] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-neon-cyan/70">Admin</p>
      <h1 className="text-xl font-semibold text-white">Portfolio CMS</h1>
      <label className="mt-5 block text-sm font-medium text-white/70">
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-white outline-none focus:border-neon-cyan"
          autoComplete="current-password"
        />
      </label>
      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="mt-5 w-full rounded-lg bg-neon-pink px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {busy ? "Signing in..." : "Sign in"}
      </button>
    </form>
    </main>
  );
}
