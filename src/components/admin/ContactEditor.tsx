"use client";

import { FormEvent, useEffect, useState } from "react";
import { defaultContact, type ContactData } from "@/data/contact";
import { adminFetch } from "./adminClient";

export default function ContactEditor() {
  const [contact, setContact] = useState<ContactData>(defaultContact);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/contact")
      .then((response) => (response.ok ? response.json() : defaultContact))
      .then(setContact)
      .catch(() => setContact(defaultContact));
  }, []);

  const update = (key: keyof ContactData, value: string) => {
    setContact((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      const response = await adminFetch("/api/admin/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(contact),
      });
      setContact(await response.json());
      setSaved(true);
      window.setTimeout(() => setSaved(false), 1800);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Save failed");
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-4">
      {(["email", "phone", "whatsapp", "instagram", "instagramLabel", "linkedin", "github", "resumeUrl"] as const).map((key) => (
        <label key={key} className="block text-sm font-medium text-white/60">
          {key}
          <input
            value={contact[key]}
            onChange={(event) => update(key, event.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-white outline-none focus:border-neon-cyan"
          />
        </label>
      ))}
      <button className="w-fit rounded-lg bg-neon-pink px-4 py-2 text-sm font-semibold text-white">
        Save contact
      </button>
      {saved && <p className="text-sm text-green-300">Saved.</p>}
      {error && <p className="text-sm text-red-300">{error}</p>}
    </form>
  );
}
