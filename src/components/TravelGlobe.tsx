"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import createGlobe from "cobe";
import { travelLocations } from "@/data/travel";
import { useTranslation } from "@/hooks/useTranslation";

export default function TravelGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { language, t, localize } = useTranslation();

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;
    let width = canvasRef.current.offsetWidth;
    let animationFrame: number;

    const markers = travelLocations.map((loc) => ({
      location: [loc.lat * (Math.PI / 180), loc.lng * (Math.PI / 180)] as [number, number],
      size: 0.06,
    }));

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.15, 0.15, 0.2],
      markerColor: [0.75, 0.52, 0.99],
      glowColor: [0.1, 0.1, 0.15],
      markers,
    });

    const animate = () => {
      phi += 0.003;
      globe.update({ phi });
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
        globe.update({ width: width * 2, height: width * 2 });
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      id="globe"
      className="relative py-20 md:py-28 bg-navy overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-6xl px-6"
      >
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-5xl font-bold gradient-text mb-4">
            {localize(t.globe.title)}
          </h2>
          <p className="font-accent italic text-white/40 text-lg">
            &ldquo;{localize(t.globe.quote)}&rdquo;
          </p>
        </div>

        {/* Globe */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-[500px] aspect-square">
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              style={{ contain: "layout paint size" }}
            />
          </div>
        </div>

        {/* Location grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {travelLocations.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="p-2 rounded-lg bg-white/5 text-center"
            >
              <div className="text-xs text-white/70 font-medium truncate">
                {loc.name}
              </div>
              <div className="text-[10px] text-white/30">{loc.country}</div>
            </motion.div>
          ))}
        </div>

        {/* Travel photos placeholder */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {t.globe.photos[language].map(
            (label) => (
              <div
                key={label}
                className="h-40 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center text-white/20 text-xs text-center px-2"
              >
                {localize(t.globe.addPhoto)}: {label}
              </div>
            )
          )}
        </div>
      </motion.div>
    </section>
  );
}
