"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { timelineData } from "@/data/timeline";
import { useTranslation } from "@/hooks/useTranslation";
import TimelineMilestone from "./TimelineMilestone";

export default function Timeline() {
  const { t, localize } = useTranslation();
  const [expandedId, setExpandedId] = useState(timelineData[0]?.id ?? "");

  return (
    <section id="journey" className="relative py-20 md:py-28 bg-black overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold gradient-text mb-4">
            {localize(t.timeline.title)}
          </h2>
          <p className="text-white/58 text-lg">
            {localize(t.timeline.intro)}
          </p>
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-neon-pink via-neon-purple to-neon-cyan md:left-1/2" />
        <div className="space-y-6 pl-7 md:pl-0">
          {timelineData.map((entry, index) => (
            <TimelineMilestone
              key={entry.id}
              entry={entry}
              index={index}
              expanded={expandedId === entry.id}
              onToggle={() => setExpandedId((current) => (current === entry.id ? "" : entry.id))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
