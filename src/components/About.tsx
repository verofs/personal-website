"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import SectionWrapper from "./SectionWrapper";

export default function About() {
  const { t, localize, images, imageFocus } = useTranslation();
  const photo = images.about;

  return (
    <SectionWrapper id="about">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-5xl font-bold gradient-text mb-6">
          {localize(t.about.title)}
        </h2>
        <p className="text-lg md:text-xl text-white/72 max-w-3xl mx-auto leading-relaxed">
          {localize(t.about.body)}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={`mx-auto w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden flex items-center justify-center text-center text-white/35 text-sm ${
          photo ? "border-4 border-neon-cyan/40" : "border-4 border-dashed border-neon-cyan/25"
        }`}
      >
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={localize(t.about.title)} className="h-full w-full object-cover" style={{ objectPosition: imageFocus.about }} />
        ) : (
          localize(t.about.photo)
        )}
      </motion.div>
    </SectionWrapper>
  );
}
