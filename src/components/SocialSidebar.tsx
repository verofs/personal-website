"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { defaultContact } from "@/data/contact";
import type { ContactData } from "@/data/contact";
import { useTranslation } from "@/hooks/useTranslation";
import ResumeMenu from "./ResumeMenu";

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
} as const;

const icons: Record<string, React.ReactNode> = {
  linkedin: (
    <svg {...iconProps}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.73v20.53C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.73C24 .78 23.2 0 22.22 0z" />
    </svg>
  ),
  github: (
    <svg {...iconProps}>
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7 0-.7 0-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.3-.5-1.5.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
    </svg>
  ),
  whatsapp: (
    <svg {...iconProps}>
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5C9.8 8.4 9.2 7 9 6.4c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 5 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15l-1.1 4.1 4.2-1.1A10 10 0 1 0 12 2z" />
    </svg>
  ),
  instagram: (
    <svg {...iconProps}>
      <path d="M12 2.16c3.2 0 3.58 0 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.37-1.06-.42-2.23C2.16 15.58 2.16 15.2 2.16 12s0-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.42 2.16 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.24a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
    </svg>
  ),
  email: (
    <svg {...iconProps}>
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  ),
  resume: (
    <svg {...iconProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </svg>
  ),
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
    { key: "instagram", href: contact.instagram, label: localize(t.social.instagram), icon: icons.instagram, external: true },
    { key: "email", href: `mailto:${contact.email}`, label: localize(t.social.email), icon: icons.email, external: false },
  ];

  const linkClass =
    "group flex h-10 items-center gap-2 overflow-hidden rounded-lg border border-white/10 bg-white/5 pl-2.5 pr-2.5 text-white/75 transition-all hover:border-neon-cyan/50 hover:text-white hover:shadow-[0_0_18px_rgba(0,255,240,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-cyan md:pr-0 md:hover:pr-3";

  return (
    <motion.aside
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.45 }}
      className="fixed bottom-3 left-3 right-3 z-40 flex justify-center md:bottom-auto md:left-auto md:right-5 md:top-1/2 md:-translate-y-1/2"
      aria-label="Social links"
    >
      <div className="glass-card flex items-center gap-2 rounded-xl p-2 md:flex-col md:items-end">
        <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-white/40 md:block md:mb-1">
          {localize(t.social.followLabel)}
        </span>
        {links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            aria-label={link.label}
            className={linkClass}
          >
            <span className="grid w-5 shrink-0 place-items-center">{link.icon}</span>
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 md:group-hover:max-w-[140px] md:group-hover:opacity-100">
              {link.label}
            </span>
          </a>
        ))}

        <ResumeMenu
          placement="top"
          align="end"
          triggerClassName={linkClass}
          triggerLabel={localize(t.social.resume)}
        >
          <span className="grid w-5 shrink-0 place-items-center">{icons.resume}</span>
          <span className="whitespace-nowrap text-sm font-medium md:max-w-0 md:opacity-0 md:transition-all md:duration-300 md:group-hover:max-w-[140px] md:group-hover:opacity-100">
            {localize(t.social.resume)}
          </span>
        </ResumeMenu>
      </div>
    </motion.aside>
  );
}
