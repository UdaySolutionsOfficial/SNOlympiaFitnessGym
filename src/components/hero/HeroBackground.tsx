import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface HeroBackgroundProps {
  className?: string;
}

/**
 * Atmospheric Hero Background
 * Adapted from ThreeUI Matrix Field concept into a lightweight,
 * GPU-friendly Canvas 2D particle & perspective laser field.
 * Restrained, dark charcoal, subtle volt highlights, auto-pause offscreen.
 */
export const HeroBackground: React.FC<HeroBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Handle responsive pixel ratio
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle seed pool (restrained count: 28 particles for maximum performance)
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: -Math.random() * 0.4 - 0.1, // gently floating upwards
      alpha: Math.random() * 0.3 + 0.1,
      isVolt: Math.random() > 0.7, // 30% volt, 70% soft white
    }));

    // Pause rendering when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let time = 0;
    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Subtle Perspective Grid Rails (Vanishing horizon lines)
      const horizonY = canvas.height * 0.75;
      const originX = canvas.width * 0.55;

      ctx.save();
      ctx.lineWidth = 0.5;
      for (let i = -5; i <= 5; i++) {
        const spreadX = originX + i * (canvas.width * 0.18);
        const grad = ctx.createLinearGradient(originX, horizonY, spreadX, canvas.height);
        grad.addColorStop(0, 'rgba(255, 94, 30, 0.08)');
        grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.02)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(originX, horizonY);
        ctx.lineTo(spreadX, canvas.height);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Ambient Floating Particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isVolt
          ? `rgba(255, 94, 30, ${p.alpha * 0.9})`
          : `rgba(244, 246, 248, ${p.alpha * 0.5})`;
        ctx.fill();
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [prefersReducedMotion]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Dynamic Canvas Particles & Horizon Rails */}
      {!prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-60"
        />
      )}

      {/* Atmospheric Radial Volt Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-brand-volt/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Dark Perimeter Vignette for Total Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-transparent to-[#08090A]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#08090A] via-transparent to-[#08090A]/40 pointer-events-none" />
    </div>
  );
};
