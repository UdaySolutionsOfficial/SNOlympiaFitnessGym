import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, Compass } from 'lucide-react';

export interface HeroExplore3DButtonProps {
  onClick?: () => void;
  className?: string;
}

/**
 * Custom Bespoke 3D Animated "Explore More" Button (No Iframe)
 *
 * Designed specifically for SN Olympia Fitness:
 * - Pure native React + Canvas + CSS 3D Transforms (0 iframe lag, 120fps GPU accelerated).
 * - Interactive 3D mouse parallax tilt & dynamic radial specular flare.
 * - Rotating conic-gradient neon light border sweep (Electric Orange #FF5E1E & Amber #FFA034).
 * - Internal atmospheric star / spark canvas simulating refracting galaxy depth.
 * - Multi-layered frosted glass capsule with athletic typography and dynamic spring arrow.
 */
export const HeroExplore3DButton: React.FC<HeroExplore3DButtonProps> = ({
  onClick,
  className = '',
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Tilt & Light Flare State
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse Move Handler for 3D Magnetic Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate normalized -1 to 1 tilt
    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    setTilt({
      rotateX: -normY * 12, // Max 12deg vertical tilt
      rotateY: normX * 14,  // Max 14deg horizontal tilt
      scale: 1.05,
    });

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly spring back to rest
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
    setGlarePos({ x: 50, y: 50 });
  };

  // Internal Animated Galaxy / Ember Particles (Canvas)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();

    // Generate 32 galaxy micro-particles
    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: (Math.random() * 1.5 + 0.6) * dpr,
      vx: (Math.random() - 0.5) * 0.4 * dpr,
      vy: (Math.random() - 0.5) * 0.3 * dpr,
      alpha: Math.random() * 0.7 + 0.3,
      pulseSpeed: Math.random() * 0.03 + 0.015,
      pulseVal: Math.random() * Math.PI,
      isOrange: Math.random() > 0.35,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulseVal += p.pulseSpeed;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulseVal));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.isOrange) {
          ctx.fillStyle = `rgba(255, 94, 30, ${currentAlpha})`;
          ctx.shadowColor = '#FF5E1E';
          ctx.shadowBlur = 4 * dpr;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.9})`;
          ctx.shadowColor = '#FFFFFF';
          ctx.shadowBlur = 3 * dpr;
        }

        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={`relative [perspective:1000px] inline-block ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Explore SN Olympia Fitness facilities, memberships, and programs"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
          transition: isHovered
            ? 'transform 100ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease'
            : 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 500ms ease',
        }}
        className="group relative select-none cursor-pointer rounded-full p-[2px] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E1E] focus-visible:ring-offset-2 focus-visible:ring-offset-black shadow-[0_0_35px_rgba(255,94,30,0.5),0_0_70px_rgba(255,94,30,0.25),0_20px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_0_55px_rgba(255,94,30,0.85),0_0_110px_rgba(255,94,30,0.45),0_25px_50px_rgba(0,0,0,0.95)] active:scale-95 transition-all"
      >
        {/* Layer 1: Continuous Rotating Neon Conic Rim (Cyclotron Beam) */}
        <div
          className="absolute -inset-[100%] rounded-full pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, #FF5E1E 90deg, #FFA034 160deg, #FFFFFF 180deg, #FF5E1E 240deg, transparent 360deg)',
            animation: 'rotateButtonRim 3.5s linear infinite',
          }}
        />

        {/* Layer 2: Main Glass Body Capsule */}
        <div className="relative z-10 flex items-center justify-between gap-4 sm:gap-6 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#0C0E12]/85 backdrop-blur-2xl border border-white/20 overflow-hidden">
          
          {/* Layer 3: Internal Star/Galaxy Particles Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-70 group-hover:opacity-95 transition-opacity"
          />

          {/* Layer 4: Dynamic Specular Radial Glare Following Mouse */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.8 : 0.25,
              background: `radial-gradient(circle 120px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 94, 30, 0.4), rgba(255, 160, 52, 0.15) 40%, transparent 70%)`,
            }}
          />

          {/* Top Edge Specular Bevel Line */}
          <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

          {/* Left Content: Glowing Beacon Dot + Bold "EXPLORE MORE" Headline */}
          <div className="relative z-10 flex items-center gap-3">
            {/* Luminous Pulsing Orange Beacon Dot */}
            <div className="relative flex items-center justify-center w-3 h-3">
              <span className="absolute w-full h-full rounded-full bg-[#FF5E1E] animate-ping opacity-75" />
              <span className="relative w-2 h-2 rounded-full bg-[#FF5E1E] shadow-[0_0_10px_#FF5E1E]" />
            </div>

            <span className="font-black text-xs sm:text-sm uppercase tracking-[0.22em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] whitespace-nowrap">
              Explore More
            </span>
          </div>

          {/* Center Glass Separator Bar */}
          <div className="relative z-10 w-[1px] h-5 bg-gradient-to-b from-transparent via-white/25 to-transparent shrink-0" />

          {/* Right Action Lens: 3D Arrow Compass Icon with Neon Halo */}
          <div className="relative z-10 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#FF5E1E] to-[#E0480C] text-white shadow-[0_0_18px_rgba(255,94,30,0.8)] group-hover:shadow-[0_0_26px_rgba(255,94,30,1)] group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 shrink-0">
            <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5] text-white" />
          </div>
        </div>
      </button>

      {/* Embedded Conic Rim Rotation Keyframes */}
      <style>{`
        @keyframes rotateButtonRim {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
