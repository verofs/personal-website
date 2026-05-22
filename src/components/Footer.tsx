"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export default function Footer() {
  const { t, localize } = useTranslation();

  return (
    <footer
      id="contact"
      className="relative bg-navy py-20 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 gradient-bg-animated opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <h2 className="font-heading text-3xl md:text-5xl font-bold gradient-text mb-6">
          {localize(t.footer.title)}
        </h2>

        <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
          {localize(t.footer.body)}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {/* Email */}
          <a
            href="mailto:v.fortunoseput@gmail.com"
            className="px-6 py-3 rounded-full gradient-bg text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            v.fortunoseput@gmail.com
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/veronica-fortuno-seput"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-white/20 text-white/80 font-semibold text-sm hover:border-white/50 hover:text-white transition-all"
          >
            LinkedIn
          </a>

          {/* Resume */}
          <a
            href="/resume.pdf"
            download
            className="px-6 py-3 rounded-full border border-white/20 text-white/80 font-semibold text-sm hover:border-white/50 hover:text-white transition-all"
          >
            {localize(t.footer.resume)}
          </a>
        </div>

        <div className="text-white/30 text-sm">
          <p>&copy; {new Date().getFullYear()} Veronica Fortuno Seput</p>
        </div>
      </motion.div>
    </footer>
  );
}
