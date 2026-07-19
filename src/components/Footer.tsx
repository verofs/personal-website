"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { defaultContact, type ContactData } from "@/data/contact";
import { useTranslation } from "@/hooks/useTranslation";
import ResumeMenu from "./ResumeMenu";

export default function Footer() {
  const [contact, setContact] = useState<ContactData>(defaultContact);
  const { t, localize } = useTranslation();

  useEffect(() => {
    fetch("/api/content/contact")
      .then((response) => (response.ok ? response.json() : defaultContact))
      .then(setContact)
      .catch(() => setContact(defaultContact));
  }, []);

  return (
    <footer
      id="contact"
      className="relative bg-black py-20 px-6 overflow-hidden"
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
            href={`mailto:${contact.email}`}
            className="px-6 py-3 rounded-full gradient-bg text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            {contact.email}
          </a>

          {/* LinkedIn */}
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-white/20 text-white/80 font-semibold text-sm hover:border-white/50 hover:text-white transition-all"
          >
            LinkedIn
          </a>

          {/* Resume */}
          <ResumeMenu
            placement="top"
            align="center"
            triggerLabel={localize(t.footer.resume)}
            triggerClassName="px-6 py-3 rounded-full border border-white/20 text-white/80 font-semibold text-sm hover:border-white/50 hover:text-white transition-all"
          >
            {localize(t.footer.resume)}
          </ResumeMenu>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-white/20 text-white/80 font-semibold text-sm hover:border-neon-pink/60 hover:text-white transition-all"
          >
            Instagram
          </a>
        </div>

        <div className="text-white/30 text-sm">
          <p>&copy; {new Date().getFullYear()} Veronica Fortuno Seput</p>
        </div>
      </motion.div>
    </footer>
  );
}
