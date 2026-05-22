"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import SectionWrapper from "./SectionWrapper";

const fluentLanguages = [
  { lang: { en: "Italian", it: "Italiano", es: "Italiano" }, flag: "\u{1F1EE}\u{1F1F9}", levelKey: "native" },
  { lang: { en: "Spanish", it: "Spagnolo", es: "Espa\u00F1ol" }, flag: "\u{1F1EA}\u{1F1F8}", levelKey: "native" },
  { lang: { en: "English", it: "Inglese", es: "Ingles" }, flag: "\u{1F1FA}\u{1F1F8}", levelKey: "fluent" },
] as const;

const learningLanguages = [
  { lang: { en: "Russian", it: "Russo", es: "Ruso" }, flag: "\u{1F1F7}\u{1F1FA}", progress: 25 },
  { lang: { en: "Greek", it: "Greco", es: "Griego" }, flag: "\u{1F1EC}\u{1F1F7}", progress: 20 },
  { lang: { en: "Portuguese", it: "Portoghese", es: "Portugues" }, flag: "\u{1F1E7}\u{1F1F7}", progress: 35 },
  { lang: { en: "German", it: "Tedesco", es: "Aleman" }, flag: "\u{1F1E9}\u{1F1EA}", progress: 15 },
] as const;

const skills = {
  en: ["Digital Marketing", "Content Strategy", "Lead Generation", "Customer Discovery", "Lean Startup Methodology", "Sales Prospecting", "Event Coordination", "Cross-Cultural Communication"],
  it: ["Marketing digitale", "Strategia contenuti", "Lead generation", "Customer discovery", "Metodo lean startup", "Sales prospecting", "Coordinamento eventi", "Comunicazione interculturale"],
  es: ["Marketing digital", "Estrategia de contenido", "Generacion de leads", "Customer discovery", "Metodologia lean startup", "Prospeccion comercial", "Coordinacion de eventos", "Comunicacion intercultural"],
};

const tools = ["ChatGPT & Claude", "Canva", "Adobe Premiere Pro", "Final Cut Pro", "Microsoft Office", "Google Workspace", "LinkedIn Sales Navigator"];

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
            className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-white/5 border border-white/10 min-w-[140px]"
          >
            <span className="text-5xl">{item.flag}</span>
            <span className="font-heading font-bold text-white text-lg">
              {localize(item.lang)}
            </span>
            <span className="text-xs text-purple font-semibold uppercase tracking-wider">
              {localize(t.languagesSection[item.levelKey])}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="max-w-xl mx-auto mb-12">
        <p className="text-center text-white/50 text-sm mb-4 uppercase tracking-wider font-semibold">
          {localize(t.languagesSection.currentlyLearning)}
        </p>
        <div className="grid grid-cols-2 gap-4">
          {learningLanguages.map((item, i) => (
            <motion.div
              key={item.lang.en}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
            >
              <span className="text-2xl">{item.flag}</span>
              <div className="flex-1">
                <div className="text-sm text-white font-medium">{localize(item.lang)}</div>
                <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-full rounded-full gradient-bg"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center mt-4 font-accent italic text-white/40 text-sm">
          &ldquo;{localize(t.languagesSection.quote)}&rdquo;
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <div>
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
            {localize(t.languagesSection.businessSkills)}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills[language].map((skill) => (
              <span key={skill} className="px-3 py-1.5 text-xs rounded-full bg-white/5 text-white/70 border border-white/10">
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
              <span key={tool} className="px-3 py-1.5 text-xs rounded-full bg-white/5 text-white/70 border border-white/10">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
