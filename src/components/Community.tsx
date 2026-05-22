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
  const { language, t, localize } = useTranslation();

  return (
    <SectionWrapper id="community">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-5xl font-bold gradient-text mb-4">
          {localize(t.community.title)}
        </h2>
        <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
          {localize(t.community.intro)}
        </p>
      </div>

      {/* Photo grid placeholder */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
        {t.community.photoLabels[language].map((label) => (
          <div
            key={label}
            className="h-40 md:h-48 rounded-xl border-2 border-dashed border-pink/20 flex items-center justify-center text-charcoal/30 text-sm text-center px-2 bg-white"
          >
            {localize(t.community.addPhoto)}: {label}
          </div>
        ))}
      </div>

      {/* Volunteer work */}
      <div>
        <h3 className="font-heading text-xl font-bold text-charcoal mb-6 text-center">
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
              className="p-5 rounded-xl bg-white border border-pink/10 shadow-sm"
            >
              <h4 className="font-semibold text-sm text-charcoal mb-2">
                {localize(v.name)}
              </h4>
              <p className="text-xs text-charcoal/60">{localize(v.description)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
