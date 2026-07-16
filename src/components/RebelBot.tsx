"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const links = [
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
  const { language, t, localize, images } = useTranslation();
  const eventPhoto = images.rebelbotEvent;

  return (
    <section
      id="rebelbot"
      className="relative py-20 md:py-28 bg-[#140808] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(239,68,68,0.22),transparent_46%),linear-gradient(180deg,rgba(0,0,0,0.1),#000_86%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-red-300/75">
            {localize(t.rebelbot.kicker)}
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-3">
            Rebel
            <span className="text-red-400">Bot</span>
          </h2>
          <p className="text-red-100/72 text-sm md:text-base font-semibold tracking-wider uppercase mb-8">
            {localize(t.rebelbot.tagline)}
          </p>
        </motion.div>

        <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
          {localize(t.rebelbot.body)}
        </p>

        {/* Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-xl mx-auto">
          {t.rebelbot.achievements[language].map(([title, subtitle], index) => (
            <div key={title} className="p-4 rounded-xl border border-red-400/15 bg-white/[0.045] shadow-[0_16px_40px_rgba(0,0,0,0.2)]">
              <div className="mx-auto mb-3 h-7 w-7 rounded-full border border-red-300/30 bg-red-500/15 text-xs font-bold text-red-100 flex items-center justify-center">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="text-white font-semibold text-sm">{title}</div>
              <div className="text-white/50 text-xs mt-1">{subtitle}</div>
            </div>
          ))}
        </div>

        {/* Event photo */}
        <div className={`mb-10 h-48 md:h-64 overflow-hidden rounded-2xl flex items-center justify-center text-white/25 text-sm ${
          eventPhoto ? "border border-red-300/25" : "border-2 border-dashed border-red-300/20 bg-black/20"
        }`}>
          {eventPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={eventPhoto} alt={localize(t.rebelbot.eventPhoto)} className="h-full w-full object-cover" />
          ) : (
            localize(t.rebelbot.eventPhoto)
          )}
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://rebelbot.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-red-500 px-6 py-3 text-sm font-bold text-white shadow-[0_0_30px_rgba(239,68,68,0.35)] transition-all hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-200"
          >
            {localize(t.rebelbot.cta)}
          </a>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full border border-white/15 text-white/65 text-sm font-medium hover:border-red-300/50 hover:text-white transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
