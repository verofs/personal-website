"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function Hero() {
  const [currentSubtitle, setCurrentSubtitle] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const { language, t, localize } = useTranslation();
  const subtitles = t.hero.subtitles[language];
  const subtitle = subtitles[currentSubtitle % subtitles.length];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % subtitles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [subtitles.length]);

  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;
    setParallax({ x, y });
  };

  return (
    <section
      id="home"
      onMouseMove={onMouseMove}
      onMouseLeave={() => setParallax({ x: 0, y: 0 })}
      className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-6 bg-black"
    >
      <div
        className="absolute inset-[-4%] will-change-transform motion-reduce:transform-none"
        style={{ transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0) scale(1.05)` }}
      >
        <Image
          src="/images/earth-night.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-85"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02),rgba(0,0,0,0.58)_56%,#000_92%)]" />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold tracking-normal leading-[0.9]"
        >
          <span className="neon-text">VERONICA</span>
          <br />
          <span className="text-white">FORTUNO SEPUT</span>
        </motion.h1>

        <div className="mt-6 h-10 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={`${language}-${subtitle}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl font-medium text-neon-cyan tracking-wide"
            >
              {subtitle}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 text-sm md:text-base text-white/72 max-w-md mx-auto"
        >
          {localize(t.hero.tagline)}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">
          {localize(t.hero.scroll)}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
