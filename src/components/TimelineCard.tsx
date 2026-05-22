"use client";

import type { TimelineEntry } from "@/data/timeline";
import { useTranslation } from "@/hooks/useTranslation";

interface TimelineCardProps {
  entry: TimelineEntry;
}

export default function TimelineCard({ entry }: TimelineCardProps) {
  const { t, localize } = useTranslation();

  return (
    <div className="min-w-[300px] md:min-w-[380px] bg-navy-light rounded-2xl p-6 md:p-8 border border-white/10 hover:border-purple/40 transition-colors flex flex-col gap-4 snap-center">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{entry.flag}</span>
        <div>
          <div className="text-sm text-purple font-semibold">{entry.year}</div>
          <div className="text-xs text-white/50">{localize(entry.location)}</div>
        </div>
      </div>

      <h3 className="font-heading text-xl font-bold text-white">
        {localize(entry.title)}
      </h3>

      <p className="text-sm text-white/60 leading-relaxed">
        {localize(entry.description)}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {entry.highlights.map((h) => (
          <span
            key={h.en}
            className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/70 border border-white/10"
          >
            {localize(h)}
          </span>
        ))}
      </div>

      {/* Photo placeholder */}
      <div className="mt-2 h-32 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center text-white/20 text-xs">
        {localize(t.timeline.photo)}
      </div>
    </div>
  );
}
