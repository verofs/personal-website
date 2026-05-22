"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { timelineData } from "@/data/timeline";
import { useTranslation } from "@/hooks/useTranslation";
import TimelineCard from "./TimelineCard";

export default function Timeline() {
  const { t, localize } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="journey" className="relative py-20 md:py-28 bg-navy overflow-hidden">
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
          <p className="text-white/50 text-lg">
            {localize(t.timeline.intro)}
          </p>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden px-6">
          <div className="flex gap-6">
            {timelineData.map((entry) => (
              <TimelineCard key={entry.year} entry={entry} />
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="mx-auto max-w-6xl px-6 mt-8 flex gap-3">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
            aria-label={localize(t.timeline.previous)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 12L6 8l4-4" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
            aria-label={localize(t.timeline.next)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
