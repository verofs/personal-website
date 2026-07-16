"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || coarsePointer) return;

    const onMove = (event: PointerEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.transform = `translate3d(${event.clientX - 110}px, ${event.clientY - 110}px, 0)`;
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-10 hidden h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,rgba(255,16,240,0.12),rgba(191,0,255,0.07)_42%,transparent_70%)] blur-sm md:block"
      aria-hidden="true"
    />
  );
}
