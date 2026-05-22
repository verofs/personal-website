"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { languages, type Language } from "@/data/translations";
import { useTranslation } from "@/hooks/useTranslation";

const links = [
  { href: "#home", key: "home" },
  { href: "#about", key: "about" },
  { href: "#journey", key: "journey" },
  { href: "#rebelbot", key: "rebelbot" },
  { href: "#experience", key: "experience" },
  { href: "#languages", key: "languages" },
  { href: "#globe", key: "travel" },
  { href: "#community", key: "community" },
] as const;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t, localize } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-navy/90 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl flex items-center justify-between gap-4 px-6 py-4">
          <a href="#home" className="font-heading font-bold text-lg gradient-text">
            VFS
          </a>

          <div className="hidden md:flex items-center gap-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {localize(t.nav[link.key])}
              </a>
            ))}
          </div>

          <label className="hidden md:flex items-center gap-2 text-xs text-white/60">
            <span>{localize(t.nav.language)}</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value as Language)}
              className="rounded-full border border-white/20 bg-navy/80 px-3 py-1.5 text-sm text-white outline-none"
            >
              {languages.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.flag} {option.label}
                </option>
              ))}
            </select>
          </label>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white/70 hover:text-white"
            aria-label={localize(t.nav.menu)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-navy/95 backdrop-blur-md pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-xl text-white/80 hover:text-white font-heading"
                >
                  {localize(t.nav[link.key])}
                </a>
              ))}
              <label className="flex flex-col gap-2 text-sm text-white/60">
                <span>{localize(t.nav.language)}</span>
                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value as Language)}
                  className="rounded-full border border-white/20 bg-navy px-4 py-3 text-base text-white outline-none"
                >
                  {languages.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.flag} {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
