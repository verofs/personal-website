"use client";

import type { TravelLocation } from "@/data/travel";
import { useTranslation } from "@/hooks/useTranslation";

interface GlobeTooltipProps {
  location: TravelLocation;
  x: number;
  y: number;
  onClose: () => void;
}

export default function GlobeTooltip({ location, x, y, onClose }: GlobeTooltipProps) {
  const { localize } = useTranslation();

  return (
    <div
      className="absolute z-20 w-56 rounded-xl glass-card neon-border p-4 text-left"
      style={{ left: x, top: y, transform: "translate(-50%, calc(-100% - 14px))" }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-2 top-2 text-white/45 hover:text-white"
      >
        x
      </button>
      <div className="pr-6 text-sm font-semibold text-white">{location.name}</div>
      <div className="text-xs text-neon-cyan">{location.country}</div>
      {location.dates && <div className="mt-2 text-xs text-white/45">{location.dates}</div>}
      {location.description && (
        <p className="mt-2 text-xs leading-relaxed text-white/65">
          {localize(location.description)}
        </p>
      )}
    </div>
  );
}
