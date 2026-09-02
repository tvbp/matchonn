"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <form
      className="mx-auto mt-24 max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow-sm"
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });
        if (res.ok) {
          router.refresh();
        } else {
          setError("Incorrect password");
        }
      }}
    >
      <h1 className="text-lg font-semibold text-stone-900">Matchonn Admin</h1>
      <input
        type="password"
        placeholder="Admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-lg border border-stone-300 px-3 py-2"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        className="w-full rounded-lg bg-brand-600 py-2 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Sign in
      </button>
    </form>
  );
}
