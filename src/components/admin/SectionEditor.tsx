"use client";

import { ReactNode, useState } from "react";

interface SectionEditorProps {
  title: string;
  description?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function SectionEditor({ title, description, children, defaultOpen = false }: SectionEditorProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.045] shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span>
          <span className="block text-sm font-bold uppercase tracking-[0.18em] text-white">{title}</span>
          {description && <span className="mt-1 block text-xs text-white/45">{description}</span>}
        </span>
        <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-white/60">
          {open ? "-" : "+"}
        </span>
      </button>
      {open && <div className="border-t border-white/10 p-5">{children}</div>}
    </section>
  );
}
