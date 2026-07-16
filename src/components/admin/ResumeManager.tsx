"use client";

import { FormEvent, useState } from "react";
import { adminFetch } from "./adminClient";

export default function ResumeManager() {
  const [file, setFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const form = new FormData();
      form.set("file", file);
      const response = await adminFetch("/api/admin/resume", { method: "POST", body: form });
      const data = (await response.json()) as { resumeUrl: string };
      setResumeUrl(data.resumeUrl);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-4">
      <input
        type="file"
        accept="application/pdf"
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        className="rounded-lg border border-white/10 bg-black/35 p-3 text-sm text-white/70"
      />
      <button disabled={!file || busy} className="w-fit rounded-lg bg-neon-pink px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
        {busy ? "Uploading..." : "Upload resume PDF"}
      </button>
      {resumeUrl && (
        <a href={resumeUrl} className="text-sm font-medium text-neon-cyan" target="_blank" rel="noopener noreferrer">
          Current uploaded resume
        </a>
      )}
      {error && <p className="text-sm text-red-300">{error}</p>}
    </form>
  );
}
