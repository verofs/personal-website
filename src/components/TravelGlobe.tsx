"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import createGlobe from "cobe";
import { travelLocations, type TravelLocation } from "@/data/travel";
import { useTranslation } from "@/hooks/useTranslation";
import GlobeTooltip from "./GlobeTooltip";

interface ProjectedMarker {
  location: TravelLocation;
  x: number;
  y: number;
  visible: boolean;
}

export default function TravelGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const thetaRef = useRef(0.3);
  const isDraggingRef = useRef(false);
  const pointerRef = useRef<{ x: number; y: number; phi: number; theta: number } | null>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const [rotation, setRotation] = useState({ phi: 0, theta: 0.3 });
  const [activeMarker, setActiveMarker] = useState<ProjectedMarker | null>(null);
  const [width, setWidth] = useState(500);
  const { language, t, localize, images, imageFocus } = useTranslation();

  const projectedMarkers = useMemo<ProjectedMarker[]>(() => {
    // Replicates cobe's own lat/lng -> screen projection so the clickable
    // overlay dots line up exactly with the rendered globe.
    const elevation = 0.85; // cobe base radius (0.8) + markerElevation (0.05)
    const phi = rotation.phi;
    const theta = rotation.theta;
    const cosPhi = Math.cos(phi);
    const sinPhi = Math.sin(phi);
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);
    return travelLocations.map((location) => {
      const rlat = location.lat * (Math.PI / 180);
      const rlng = location.lng * (Math.PI / 180) - Math.PI;
      const o = Math.cos(rlat);
      const px = -o * Math.cos(rlng) * elevation;
      const py = Math.sin(rlat) * elevation;
      const pz = o * Math.sin(rlng) * elevation;
      const cx = cosPhi * px + sinPhi * pz;
      const cy = sinPhi * sinTheta * px + cosTheta * py - cosPhi * sinTheta * pz;
      const cz = -sinPhi * cosTheta * px + sinTheta * py + cosPhi * cosTheta * pz;
      return {
        location,
        x: ((cx + 1) / 2) * width,
        y: ((-cy + 1) / 2) * width,
        visible: cz >= 0,
      };
    });
  }, [rotation.phi, rotation.theta, width]);

  useEffect(() => {
    if (!canvasRef.current) return;

    let currentWidth = canvasRef.current.offsetWidth;
    let animationFrame: number;
    setWidth(currentWidth);

    const markers = travelLocations.map((loc) => ({
      location: [loc.lat, loc.lng] as [number, number],
      size: loc.lived ? 0.08 : 0.035,
    }));

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: currentWidth * 2,
      height: currentWidth * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.16, 0.2, 0.42],
      markerColor: [1.0, 0.18, 0.52],
      glowColor: [0.35, 0.55, 0.95],
      markers,
    });

    const animate = () => {
      if (!isDraggingRef.current) {
        phiRef.current += 0.003;
      }
      globe.update({ phi: phiRef.current, theta: thetaRef.current });
      setRotation({ phi: phiRef.current, theta: thetaRef.current });
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    setIsGlobeReady(true);

    const onResize = () => {
      if (canvasRef.current) {
        currentWidth = canvasRef.current.offsetWidth;
        setWidth(currentWidth);
        globe.update({ width: currentWidth * 2, height: currentWidth * 2 });
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      globe.destroy();
      window.removeEventListener("resize", onResize);
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerRef.current = {
      x: event.clientX,
      y: event.clientY,
      phi: phiRef.current,
      theta: thetaRef.current,
    };
    isDraggingRef.current = true;
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!pointerRef.current) return;
    const dx = event.clientX - pointerRef.current.x;
    const dy = event.clientY - pointerRef.current.y;
    phiRef.current = pointerRef.current.phi + dx / 220;
    thetaRef.current = Math.max(-0.8, Math.min(0.8, pointerRef.current.theta + dy / 260));
    setRotation({ phi: phiRef.current, theta: thetaRef.current });
  };

  const endDrag = () => {
    pointerRef.current = null;
    resumeTimerRef.current = window.setTimeout(() => {
      isDraggingRef.current = false;
    }, 2000);
  };

  return (
    <section
      id="globe"
      className="relative py-20 md:py-28 bg-black overflow-hidden"
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
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.28),rgba(255,16,240,0.10)_45%,transparent_70%)] blur-2xl" />
            <canvas
              ref={canvasRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              style={{ contain: "layout paint size" }}
            />
            {isGlobeReady && (
              <div className="pointer-events-none absolute inset-0">
                {projectedMarkers.map((marker) =>
                  marker.visible ? (
                    <button
                      key={`${marker.location.name}-${marker.location.country}`}
                      type="button"
                      onClick={() => setActiveMarker(marker)}
                      className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full border focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-cyan ${
                        marker.location.lived
                          ? "h-4 w-4 border-white bg-neon-pink shadow-[0_0_22px_rgba(255,16,240,0.95)]"
                          : "h-2 w-2 border-white/50 bg-neon-cyan/80 shadow-[0_0_10px_rgba(56,189,248,0.55)]"
                      }`}
                      style={{ left: `${marker.x.toFixed(3)}px`, top: `${marker.y.toFixed(3)}px` }}
                      aria-label={`${marker.location.name}, ${marker.location.country}`}
                    />
                  ) : null
                )}
              </div>
            )}
            {isGlobeReady && activeMarker && (
              <GlobeTooltip
                location={activeMarker.location}
                x={activeMarker.x}
                y={activeMarker.y}
                onClose={() => setActiveMarker(null)}
              />
            )}
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
              className={`p-2 rounded-lg text-center border ${
                loc.lived
                  ? "bg-neon-pink/10 border-neon-pink/35 shadow-[0_0_18px_rgba(255,16,240,0.12)]"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <div className={`text-xs font-medium truncate ${loc.lived ? "text-white" : "text-white/70"}`}>
                {loc.name}
              </div>
              <div className="text-[10px] text-white/30">
                {loc.country}
                {loc.lived ? ` - ${localize(t.globe.livedLabel)}` : ""}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Travel photos */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {t.globe.photos[language].map((label, index) => {
            const photo = images[`globe.${index}`];
            const focus = imageFocus[`globe.${index}`];
            return (
              <div
                key={`${label}-${index}`}
                className={`h-40 overflow-hidden rounded-xl flex items-center justify-center text-white/25 text-xs text-center px-2 ${
                  photo ? "border border-neon-cyan/30" : "border-2 border-dashed border-neon-cyan/15"
                }`}
              >
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo} alt={label} className="h-full w-full object-cover" style={{ objectPosition: focus }} />
                ) : (
                  `${localize(t.globe.addPhoto)}: ${label}`
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
