"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { TimelineEntry } from "@/data/timeline";
import { useTranslation } from "@/hooks/useTranslation";

interface TimelineMilestoneProps {
  entry: TimelineEntry;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}

const accents = [
  "border-neon-pink/45 text-neon-pink",
  "border-neon-purple/45 text-neon-purple",
  "border-neon-cyan/45 text-neon-cyan",
  "border-neon-green/45 text-neon-green",
];

export default function TimelineMilestone({
  entry,
  index,
  expanded,
  onToggle,
}: TimelineMilestoneProps) {
  const { localize, images, imageFocus } = useTranslation();
  const photo = images[`timeline.${entry.id}`];
  const photoFocus = imageFocus[`timeline.${entry.id}`];
  const accent = accents[index % accents.length];
  const side = index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:col-start-2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
      className={`relative md:grid md:grid-cols-2 ${index % 2 === 0 ? "" : ""}`}
    >
      <div className={`${side}`}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          className={`w-full rounded-xl glass-card neon-hover-pink border p-5 text-left md:text-inherit focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-cyan ${accent}`}
        >
          <div className="flex items-center gap-3 md:justify-inherit">
            <span className="text-3xl">{entry.flag}</span>
            <div className="min-w-0">
              <div className="text-sm font-semibold">{entry.year}</div>
              <h3 className="font-heading text-2xl font-bold text-white">
                {localize(entry.title)}
              </h3>
              <div className="text-xs text-white/45">{localize(entry.location)}</div>
            </div>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="overflow-hidden"
            >
              <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.035] p-5 text-left">
                {photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo}
                    alt={localize(entry.title)}
                    className="mb-4 h-48 w-full rounded-lg object-cover"
                    style={{ objectPosition: photoFocus }}
                  />
                )}
                <p className="text-sm leading-relaxed text-white/68">
                  {localize(entry.description)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.highlights.map((highlight) => (
                    <span
                      key={highlight.en}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                    >
                      {localize(highlight)}
                    </span>
                  ))}
                </div>
                {entry.metrics && (
                  <div className="mt-4 grid gap-2">
                    {entry.metrics.map((metric) => (
                      <div key={metric.en} className="text-xs font-semibold text-neon-cyan">
                        {localize(metric)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute left-[-1.1rem] top-6 h-4 w-4 rounded-full border-2 border-black bg-neon-pink shadow-[0_0_18px_rgba(255,16,240,0.8)] md:left-1/2 md:-translate-x-1/2" />
    </motion.div>
  );
}
