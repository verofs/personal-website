"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import SectionWrapper from "./SectionWrapper";

const volunteerWork = [
  {
    name: {
      en: "Animal Sanctuary of Las Vegas",
      it: "Animal Sanctuary of Las Vegas",
      es: "Animal Sanctuary of Las Vegas",
    },
    description: {
      en: "Animal care, habitat maintenance, fundraising support, and customer engagement at sanctuary events.",
      it: "Cura degli animali, manutenzione habitat, supporto fundraising e relazione con visitatori agli eventi.",
      es: "Cuidado de animales, mantenimiento de habitats, apoyo en fundraising y atencion a visitantes en eventos.",
    },
  },
  {
    name: { en: "Girls on the Run", it: "Girls on the Run", es: "Girls on the Run" },
    description: {
      en: "Guided runners and coordinated event logistics (participated twice).",
      it: "Supporto alle runner e coordinamento logistico evento, con partecipazione due volte.",
      es: "Apoyo a corredoras y coordinacion logistica del evento, con participacion dos veces.",
    },
  },
  {
    name: { en: "Spring Preserve", it: "Spring Preserve", es: "Spring Preserve" },
    description: {
      en: "Event coordination, booth setup, and community engagement.",
      it: "Coordinamento eventi, allestimento stand e engagement con la community.",
      es: "Coordinacion de eventos, montaje de stands y engagement comunitario.",
    },
  },
];

export default function Community() {
  const { language, t, localize, images } = useTranslation();

  return (
    <SectionWrapper id="community">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-5xl font-bold gradient-text mb-4">
          {localize(t.community.title)}
        </h2>
        <p className="text-white/58 text-lg max-w-2xl mx-auto">
          {localize(t.community.intro)}
        </p>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
        {t.community.photoLabels[language].map((label, index) => {
          const photo = images[`community.${index}`];
          return (
            <div
              key={`${label}-${index}`}
              className={`h-40 md:h-48 overflow-hidden rounded-xl flex items-center justify-center text-white/30 text-sm text-center px-2 ${
                photo ? "border border-neon-pink/30" : "border-2 border-dashed border-neon-pink/25 bg-white/5"
              }`}
            >
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt={label} className="h-full w-full object-cover" />
              ) : (
                `${localize(t.community.addPhoto)}: ${label}`
              )}
            </div>
          );
        })}
      </div>

      {/* Volunteer work */}
      <div>
        <h3 className="font-heading text-xl font-bold text-white mb-6 text-center">
          {localize(t.community.volunteerTitle)}
        </h3>
        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {volunteerWork.map((v, i) => (
            <motion.div
              key={v.name.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl glass-card neon-hover-cyan"
            >
              <h4 className="font-semibold text-sm text-white mb-2">
                {localize(v.name)}
              </h4>
              <p className="text-xs text-white/62">{localize(v.description)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
