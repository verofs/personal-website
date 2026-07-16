"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let frame = 0;
    let animation = 0;
    const count = width < 768 ? 32 : 72;
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1 + Math.random() * 1.6,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * window.devicePixelRatio);
      canvas.height = Math.floor(height * window.devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const draw = () => {
      frame += 1;
      if (frame % 2 === 0 && !document.hidden) {
        context.clearRect(0, 0, width, height);
        context.fillStyle = "rgba(255, 16, 240, 0.32)";
        for (const p of particles) {
          p.x = (p.x + p.vx + width) % width;
          p.y = (p.y + p.vy + height) % height;
          context.beginPath();
          context.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          context.fill();
        }
        context.strokeStyle = "rgba(0, 255, 240, 0.08)";
        for (let i = 0; i < particles.length; i += 1) {
          for (let j = i + 1; j < particles.length; j += 1) {
            const a = particles[i];
            const b = particles[j];
            const distance = Math.hypot(a.x - b.x, a.y - b.y);
            if (distance < 110) {
              context.globalAlpha = 1 - distance / 110;
              context.beginPath();
              context.moveTo(a.x, a.y);
              context.lineTo(b.x, b.y);
              context.stroke();
            }
          }
        }
        context.globalAlpha = 1;
      }
      animation = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />;
}
