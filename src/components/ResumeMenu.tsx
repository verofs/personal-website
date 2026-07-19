"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface ResumeMenuProps {
  /** Trigger button contents */
  children: React.ReactNode;
  /** Extra classes for the trigger button */
  triggerClassName?: string;
  /** Where the menu pops relative to the trigger */
  placement?: "top" | "bottom";
  /** Horizontal alignment of the menu */
  align?: "start" | "end" | "center";
  triggerLabel?: string;
}

export default function ResumeMenu({
  children,
  triggerClassName = "",
  placement = "top",
  align = "center",
  triggerLabel,
}: ResumeMenuProps) {
  const { t, localize } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const options = [
    { key: "american", label: localize(t.social.resumeAmerican), href: "/resume.pdf" },
    { key: "european", label: localize(t.social.resumeEuropean), href: "/resume-european-en.pdf" },
    { key: "italian", label: localize(t.social.resumeItalian), href: "/resume-italian.pdf" },
    { key: "spanish", label: localize(t.social.resumeSpanish), href: "/resume-spanish.pdf" },
  ];

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const menuPos =
    placement === "top" ? "bottom-full mb-2" : "top-full mt-2";
  const alignPos =
    align === "end" ? "right-0" : align === "start" ? "left-0" : "left-1/2 -translate-x-1/2";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={triggerLabel}
        className={triggerClassName}
      >
        {children}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: placement === "top" ? 8 : -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: placement === "top" ? 8 : -8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            role="menu"
            className={`absolute z-50 w-60 max-w-[calc(100vw-1.5rem)] rounded-xl glass-card border border-white/10 p-2 shadow-[0_0_30px_rgba(0,0,0,0.5)] ${menuPos} ${alignPos}`}
          >
            <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/40">
              {localize(t.social.resumeMenuTitle)}
            </div>
            {options.map((opt) => (
              <a
                key={opt.key}
                href={opt.href}
                download
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-cyan"
              >
                {opt.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
