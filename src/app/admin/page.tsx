"use client";

import { useEffect, useState } from "react";
import AdminLogin from "@/components/admin/AdminLogin";
import ContactEditor from "@/components/admin/ContactEditor";
import PortfolioContentEditor from "@/components/admin/PortfolioContentEditor";
import ResumeManager from "@/components/admin/ResumeManager";
import SectionEditor from "@/components/admin/SectionEditor";
import { adminFetch } from "@/components/admin/adminClient";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/session")
      .then((response) => response.json())
      .then((data) => setAuthenticated(Boolean(data.authenticated)))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await adminFetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
  };

  if (loading) return <div className="min-h-screen bg-black p-8 text-sm text-white/60">Loading...</div>;
  if (!authenticated) return <AdminLogin onLogin={() => setAuthenticated(true)} />;

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-6">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,16,240,0.16),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(0,255,240,0.1),transparent_30%)]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-neon-cyan/70">Admin</p>
            <h1 className="text-3xl font-bold">Portfolio CMS</h1>
            <p className="mt-2 text-sm text-white/50">Manage page copy, section order, resume, contact info, and gallery photos.</p>
          </div>
          <button
            onClick={logout}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white/70 hover:border-neon-pink/50 hover:text-white"
          >
            Sign out
          </button>
        </div>

        <div className="grid gap-5">
          <PortfolioContentEditor />

          <SectionEditor title="Resume" description="Upload the PDF linked from the public site.">
            <ResumeManager />
          </SectionEditor>

          <SectionEditor title="Contact" description="Edit contact and social links used across the site.">
            <ContactEditor />
          </SectionEditor>
        </div>
      </div>
    </main>
  );
}
