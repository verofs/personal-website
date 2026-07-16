"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryPhoto } from "@/data/gallery";
import { useTranslation } from "@/hooks/useTranslation";

interface LightboxProps {
  photos: GalleryPhoto[];
  index: number | null;
  onClose: () => void;
  onMove: (nextIndex: number) => void;
}

export default function Lightbox({ photos, index, onClose, onMove }: LightboxProps) {
  const { t, localize } = useTranslation();
  const photo = index === null ? null : photos[index];

  useEffect(() => {
    if (!photo || index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onMove((index - 1 + photos.length) % photos.length);
      if (event.key === "ArrowRight") onMove((index + 1) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onMove, photo, photos.length]);

  return (
    <AnimatePresence>
      {photo && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/90 p-5 backdrop-blur"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={localize(t.gallery.close)}
            className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white hover:border-neon-cyan"
          >
            x
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onMove((index - 1 + photos.length) % photos.length);
            }}
            aria-label={localize(t.gallery.previous)}
            className="absolute left-5 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 text-white hover:border-neon-cyan"
          >
            {"<"}
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onMove((index + 1) % photos.length);
            }}
            aria-label={localize(t.gallery.next)}
            className="absolute right-5 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 text-white hover:border-neon-cyan"
          >
            {">"}
          </button>
          <motion.div
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.96 }}
            className="flex h-full flex-col items-center justify-center gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={photo.src}
              alt={localize(photo.caption)}
              className="max-h-[78vh] max-w-[88vw] rounded-xl border border-white/10 object-contain shadow-2xl"
            />
            <p className="text-center text-sm text-white/70">{localize(photo.caption)}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
