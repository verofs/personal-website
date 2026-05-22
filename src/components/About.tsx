"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import SectionWrapper from "./SectionWrapper";

const statValues = ["3", "27+", "4", "1"];

export default function About() {
  const { language, t, localize } = useTranslation();
  const stats = t.about.stats[language];
  const traits = t.about.traits[language];

  return (
    <SectionWrapper id="about">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-5xl font-bold gradient-text mb-6">
          {localize(t.about.title)}
        </h2>
        <p className="text-lg md:text-xl text-charcoal/80 max-w-3xl mx-auto leading-relaxed">
          {localize(t.about.body)}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="text-center p-6 rounded-2xl bg-white shadow-sm border border-pink/10"
          >
            <div className="text-4xl md:text-5xl font-heading font-bold gradient-text">
              {statValues[i]}
            </div>
            <div className="mt-2 text-sm text-charcoal/60 font-medium">
              {label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {traits.map((trait, i) => (
          <motion.span
            key={trait}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="px-5 py-2 rounded-full text-sm font-semibold gradient-bg text-white shadow-md"
          >
            {trait}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-12 mx-auto w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-dashed border-pink/30 flex items-center justify-center text-center text-charcoal/40 text-sm"
      >
        {localize(t.about.photo)}
      </motion.div>
    </SectionWrapper>
  );
}
