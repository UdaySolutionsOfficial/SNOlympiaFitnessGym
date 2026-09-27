import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface FireEmberParticlesProps {
  className?: string;
  count?: number;
}

interface Ember {
  x: number;
  y: number;
  z: number; // 0.3 to 2.0 depth
  size: number;
  speedX: number;
  speedY: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  alpha: number;
  baseAlpha: number;
  seed: number;
  hue: number; // 18 to 36 (warm electric orange to hot golden amber)
}

/**
 * ThreeUI Bespoke 3D Fire Ember Particles Simulation
 *
 * Lightweight, GPU-accelerated atmospheric background sparks
 * drifting gracefully across the entire website from bottom to top
 * with lateral wind sway and subtle glowing flame aesthetics.
 */
export const FireEmberParticles: React.FC<FireEmberParticlesProps> = ({
  className = '',
  count = 38,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isVisible = true;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Initialize 3D ember pool
    const embers: Ember[] = Array.from({ length: count }, () => {
      const z = Math.random() * 1.5 + 0.4;
      const baseAlpha = Math.random() * 0.45 + 0.2;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z,
        size: (Math.random() * 1.8 + 0.8) * z,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -(Math.random() * 0.6 + 0.3) * z,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
        wobbleAmp: Math.random() * 0.4 + 0.2,
        alpha: baseAlpha,
        baseAlpha,
        seed: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.4 ? 20 : 35, // 20: #FF5E1E, 35: #FFA034
      };
    });

    // Handle tab visibility to pause when inactive
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let time = 0;
    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      time += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      // Draw embers
      for (let i = 0; i < embers.length; i++) {
        const p = embers[i];

        // Physics: upward drift + gentle sine wave lateral sway
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.seed) * p.wobbleAmp;

        // Wrap around boundaries
        if (p.y < -20) {
          p.y = canvas.height + 15;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20) p.x = canvas.width + 15;
        if (p.x > canvas.width + 20) p.x = -15;

        // Organic flicker
        const flicker = 0.8 + 0.2 * Math.sin(time * 3 + p.seed * 2);
        const currentAlpha = p.baseAlpha * flicker;

        // Draw glowing ember
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        // Soft gradient halo for larger foreground embers
        if (p.z > 1.2) {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
          glow.addColorStop(0, `hsla(${p.hue}, 100%, 65%, ${currentAlpha})`);
          glow.addColorStop(0.4, `hsla(${p.hue}, 100%, 50%, ${currentAlpha * 0.5})`);
          glow.addColorStop(1, 'rgba(255, 94, 30, 0)');
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Hot center spark
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue + 10}, 100%, 85%, ${currentAlpha * 0.95})`;
        ctx.fill();
      }
      ctx.restore();
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [count, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[1] select-none ${className}`}
    />
  );
};
