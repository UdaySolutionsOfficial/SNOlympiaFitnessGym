import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface AthleteBodySmokeProps {
  className?: string;
}

interface SmokePuff {
  x: number;
  y: number;
  originX: number;
  originY: number;
  radius: number;
  maxRadius: number;
  life: number;
  maxLife: number;
  speedX: number;
  speedY: number;
  turbulence: number;
  opacity: number;
  maxOpacity: number;
}

/**
 * Realistic Muscle Heat & Steam Vapor Simulation
 *
 * Renders authentic, subtle atmospheric steam rising from the athlete's
 * shoulders, trapezius, and chest during intense barbell curling.
 * Uses GPU 2D Canvas with soft composite screen blending.
 */
export const AthleteBodySmoke: React.FC<AthleteBodySmokeProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isVisible = true;

    const resize = () => {
      canvas.width = container.clientWidth || 400;
      canvas.height = container.clientHeight || 700;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Emission points on the athlete's body (relative percentages)
    // Shoulders, traps, upper chest where body heat radiates
    const emitterZones = [
      { rx: 0.44, ry: 0.42 }, // Left trap
      { rx: 0.56, ry: 0.42 }, // Right trap
      { rx: 0.38, ry: 0.46 }, // Left shoulder / deltoid
      { rx: 0.62, ry: 0.46 }, // Right shoulder / deltoid
      { rx: 0.50, ry: 0.48 }, // Sternum / chest
      { rx: 0.32, ry: 0.55 }, // Left bicep
      { rx: 0.68, ry: 0.55 }, // Right bicep
    ];

    const puffs: SmokePuff[] = [];
    const maxPuffs = 28;

    const createPuff = (): SmokePuff => {
      const zone = emitterZones[Math.floor(Math.random() * emitterZones.length)];
      // Jitter around the emission point
      const x = zone.rx * canvas.width + (Math.random() - 0.5) * (canvas.width * 0.08);
      const y = zone.ry * canvas.height + (Math.random() - 0.5) * (canvas.height * 0.04);
      const maxLife = Math.random() * 80 + 70; // frames
      return {
        x,
        y,
        originX: x,
        originY: y,
        radius: Math.random() * 8 + 12,
        maxRadius: Math.random() * 35 + 40,
        life: 0,
        maxLife,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -(Math.random() * 0.65 + 0.45),
        turbulence: Math.random() * 0.03 + 0.015,
        opacity: 0,
        maxOpacity: Math.random() * 0.12 + 0.06, // Soft, translucent realism
      };
    };

    // Pre-populate puffs with staggered ages
    for (let i = 0; i < maxPuffs; i++) {
      const p = createPuff();
      p.life = Math.random() * p.maxLife;
      p.y += p.speedY * p.life;
      puffs.push(p);
    }

    // Visibility observer to pause when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let frame = 0;
    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      // Soft screen blend mode for glowing vapor
      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < puffs.length; i++) {
        const p = puffs[i];
        p.life++;

        // Upward buoyancy with natural aerodynamic curl
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.life * p.turbulence) * 0.4;

        // Radius expands as steam disperses into cooler air
        const progress = p.life / p.maxLife;
        const currentRadius = p.radius + (p.maxRadius - p.radius) * Math.pow(progress, 0.75);

        // Smooth Bell-curve opacity: fade in fast, linger, gently fade out
        let currentOpacity = 0;
        if (progress < 0.25) {
          currentOpacity = (progress / 0.25) * p.maxOpacity;
        } else {
          currentOpacity = (1 - (progress - 0.25) / 0.75) * p.maxOpacity;
        }

        if (p.life >= p.maxLife) {
          // Recycle puff
          puffs[i] = createPuff();
          continue;
        }

        // Draw soft misty radial gradient
        const grad = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          currentRadius
        );
        // Cool gym steam with subtle ambient orange warmth reflection
        grad.addColorStop(0, `rgba(245, 248, 255, ${currentOpacity * 1.1})`);
        grad.addColorStop(0.35, `rgba(255, 140, 60, ${currentOpacity * 0.4})`);
        grad.addColorStop(0.7, `rgba(220, 230, 245, ${currentOpacity * 0.15})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none select-none z-[2] overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
