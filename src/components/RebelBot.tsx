"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const links = [
  { label: "rebelbot.ai", href: "https://rebelbot.ai" },
  {
    label: "Instagram",
    href: "https://instagram.com/rebelbot.ai",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/rebelbot",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@rebelbot.ai",
  },
];

export default function RebelBot() {
  const { language, t, localize } = useTranslation();
  const achievementIcons = ["\u{1F3C6}", "\u{1F4AC}", "\u{1F50D}", "\u{1F680}"];

  return (
    <section
      id="rebelbot"
      className="relative py-20 md:py-28 bg-navy overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        {/* Logo text */}
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-2">
            Rebel
            <span className="gradient-text">Bot</span>
          </h2>
          <p className="text-purple text-sm md:text-base font-semibold tracking-wider uppercase mb-8">
            {localize(t.rebelbot.tagline)}
          </p>
        </motion.div>

        <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
          {localize(t.rebelbot.body)}
        </p>

        {/* Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-xl mx-auto">
          {t.rebelbot.achievements[language].map(([title, subtitle], index) => (
            <div key={title} className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl mb-2">{achievementIcons[index]}</div>
              <div className="text-white font-semibold text-sm">{title}</div>
              <div className="text-white/50 text-xs mt-1">{subtitle}</div>
            </div>
          ))}
        </div>

        {/* Event photo placeholder */}
        <div className="mb-10 h-48 md:h-64 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center text-white/20 text-sm">
          {localize(t.rebelbot.eventPhoto)}
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full border border-white/20 text-white/70 text-sm font-medium hover:border-purple/50 hover:text-white transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
