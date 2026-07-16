"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { defaultContact } from "@/data/contact";
import type { ContactData } from "@/data/contact";
import { useTranslation } from "@/hooks/useTranslation";

const icons = {
  linkedin: "in",
  github: "gh",
  whatsapp: "wa",
  instagram: "ig",
  email: "@",
  resume: "cv",
};

export default function SocialSidebar() {
  const [contact, setContact] = useState<ContactData>(defaultContact);
  const { t, localize } = useTranslation();

  useEffect(() => {
    fetch("/api/content/contact")
      .then((response) => (response.ok ? response.json() : defaultContact))
      .then(setContact)
      .catch(() => setContact(defaultContact));
  }, []);

  const links = [
    { key: "linkedin", href: contact.linkedin, label: localize(t.social.linkedin), icon: icons.linkedin, external: true },
    ...(contact.github
      ? [{ key: "github", href: contact.github, label: localize(t.social.github), icon: icons.github, external: true }]
      : []),
    { key: "whatsapp", href: contact.whatsapp, label: localize(t.social.whatsapp), icon: icons.whatsapp, external: true },
    { key: "instagram", href: contact.instagram, label: localize(t.social.instagram), icon: icons.instagram, external: true },
    { key: "email", href: `mailto:${contact.email}`, label: localize(t.social.email), icon: icons.email, external: false },
    { key: "resume", href: contact.resumeUrl, label: localize(t.social.resume), icon: icons.resume, external: false, download: true },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.45 }}
      className="fixed bottom-3 left-3 right-3 z-40 flex justify-center md:bottom-auto md:left-auto md:right-5 md:top-1/2 md:-translate-y-1/2"
      aria-label="Social links"
    >
      <div className="glass-card flex gap-2 rounded-xl p-2 md:flex-col">
        {links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            download={link.download}
            aria-label={link.label}
            title={link.label}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-xs font-bold uppercase text-white/75 transition-all hover:border-neon-cyan/50 hover:text-white hover:shadow-[0_0_18px_rgba(0,255,240,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-cyan"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </motion.aside>
  );
}
