"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const flags = [
  { emoji: "\u{1F1EE}\u{1F1F9}", label: "Italy" },
  { emoji: "\u{1F1EA}\u{1F1F8}", label: "Spain" },
  { emoji: "\u{1F1FA}\u{1F1F8}", label: "USA" },
];

export default function Hero() {
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  const { language, t, localize } = useTranslation();
  const subtitles = t.hero.subtitles[language];
  const subtitle = subtitles[currentSubtitle % subtitles.length];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % subtitles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [subtitles.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
      <div className="absolute inset-0 gradient-bg-animated opacity-20" />
      <div className="absolute inset-0 bg-navy/80" />

      <div className="absolute top-20 left-0 right-0 flex justify-center gap-4 md:gap-6">
        {flags.map((flag, i) => (
          <motion.span
            key={flag.label}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.2, duration: 0.5 }}
            className="text-2xl md:text-3xl"
            style={{ animation: `float 3s ease-in-out ${i * 0.5}s infinite` }}
          >
            {flag.emoji}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight"
        >
          <span className="gradient-text">VERONICA</span>
          <br />
          <span className="text-white">FORTUNO SEPUT</span>
        </motion.h1>

        <div className="mt-6 h-10 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={`${language}-${subtitle}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl font-medium text-purple tracking-wide"
            >
              {subtitle}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 text-sm md:text-base text-white/60 max-w-md mx-auto"
        >
          {localize(t.hero.tagline)}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">
          {localize(t.hero.scroll)}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
