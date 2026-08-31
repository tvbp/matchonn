"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/admin/login", { method: "DELETE" });
        router.refresh();
      }}
      className="text-sm font-medium text-slate-500 hover:text-slate-700"
    >
      Sign out
    </button>
  );
}
