"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import SectionWrapper from "./SectionWrapper";

const fluentLanguages = [
  { lang: { en: "Italian", it: "Italiano", es: "Italiano" }, flag: "\u{1F1EE}\u{1F1F9}", levelKey: "native" },
  { lang: { en: "Spanish", it: "Spagnolo", es: "Espa\u00F1ol" }, flag: "\u{1F1EA}\u{1F1F8}", levelKey: "native" },
  { lang: { en: "English", it: "Inglese", es: "Ingles" }, flag: "\u{1F1FA}\u{1F1F8}", levelKey: "fluent" },
] as const;

const skills = {
  en: ["Digital Marketing", "Content Strategy", "Lead Generation", "Customer Discovery", "Lean Startup Methodology", "Vibe Coding / AI Tools", "Team Leadership & Delegation", "Vision & Strategic Planning", "Emotional Intelligence", "Cross-Cultural Communication"],
  it: ["Marketing digitale", "Strategia contenuti", "Lead generation", "Customer discovery", "Metodo lean startup", "Vibe coding / strumenti AI", "Leadership e delega", "Visione e pianificazione strategica", "Intelligenza emotiva", "Comunicazione interculturale"],
  es: ["Marketing digital", "Estrategia de contenido", "Generacion de leads", "Customer discovery", "Metodologia lean startup", "Vibe coding / herramientas IA", "Liderazgo y delegacion", "Vision y planificacion estrategica", "Inteligencia emocional", "Comunicacion intercultural"],
};

const tools = ["RebelBot", "Personal CRM", "ChatGPT & Claude", "Canva", "Adobe Premiere Pro", "Final Cut Pro", "Microsoft Office", "Google Workspace", "LinkedIn Sales Navigator"];

export default function Languages() {
  const { language, t, localize } = useTranslation();

  return (
    <SectionWrapper id="languages" dark>
      <h2 className="font-heading text-3xl md:text-5xl font-bold gradient-text mb-4 text-center">
        {localize(t.languagesSection.title)}
      </h2>

      <div className="flex flex-wrap justify-center gap-6 mt-10 mb-12">
        {fluentLanguages.map((item, i) => (
          <motion.div
            key={item.lang.en}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="flex flex-col items-center gap-2 p-6 rounded-2xl glass-card neon-hover-cyan min-w-[140px]"
          >
            <span className="text-5xl">{item.flag}</span>
            <span className="font-heading font-bold text-white text-lg">
              {localize(item.lang)}
            </span>
            <span className="text-xs text-neon-cyan font-semibold uppercase tracking-wider">
              {localize(t.languagesSection[item.levelKey])}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <div>
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
            {localize(t.languagesSection.businessSkills)}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills[language].map((skill) => (
              <span key={skill} className="px-3 py-1.5 text-xs rounded-full bg-white/5 text-white/75 border border-white/10">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
            {localize(t.languagesSection.tools)}
          </h3>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span key={tool} className="px-3 py-1.5 text-xs rounded-full bg-white/5 text-white/75 border border-white/10">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
