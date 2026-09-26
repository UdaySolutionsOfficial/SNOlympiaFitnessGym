import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, X, Volume2 } from 'lucide-react';
import { ASSET_MANIFEST } from '../../data/assets';

export interface HeroVideoCardProps {
  videoSrc?: string;
  title?: string;
  tag?: string;
  className?: string;
}

/**
 * Sleek 3D Floating Video Card with Mouse Parallax, Bottom Animated "Explore" Button & Modal Popup
 *
 * Requirements fulfilled:
 * 1. Reduced video container size: sleek, modern, balanced.
 * 2. Play button size reduced & placed at the BOTTOM of the video.
 * 3. On hover: Play button smoothly animates and reveals "Explore" text with vivid orange background, white text, and neon orange shadow.
 * 4. 3D Mouse Parallax: Card smoothly tilts in 3D following mouse coordinates with ambient light reflection.
 * 5. On click: Opens a centered responsive popup modal (not forced full screen).
 */
export const HeroVideoCard: React.FC<HeroVideoCardProps> = ({
  videoSrc = ASSET_MANIFEST.hero.introVideo.path,
  title = 'SN Olympia Experience',
  tag = 'TRAINING PREVIEW',
  className = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });

  const cardRef = useRef<HTMLDivElement | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // Auto-play the card preview muted on loop
  useEffect(() => {
    if (previewVideoRef.current) {
      previewVideoRef.current.play().catch(() => {});
    }
  }, [videoSrc]);

  // Handle opening popup video modal with sound
  const handleOpenModal = () => {
    if (previewVideoRef.current) {
      previewVideoRef.current.pause();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    if (previewVideoRef.current) {
      previewVideoRef.current.play().catch(() => {});
    }
  }, []);

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, handleCloseModal]);

  // Autoplay modal video with sound once open
  useEffect(() => {
    if (isModalOpen && modalVideoRef.current) {
      modalVideoRef.current.muted = false;
      modalVideoRef.current.volume = 1;
      modalVideoRef.current.play().catch(() => {});
    }
  }, [isModalOpen]);

  // 3D Mouse Parallax Tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Rotate up to 14 degrees
    const rotateY = (x - 0.5) * 16;
    const rotateX = (0.5 - y) * 16;

    setTilt({
      x: rotateX,
      y: rotateY,
      glareX: x * 100,
      glareY: y * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  return (
    <>
      {/* 3D Floating & Tilting Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleOpenModal}
        role="button"
        tabIndex={0}
        aria-label={`Watch ${title} video popup`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpenModal();
          }
        }}
        className={`group/vid relative select-none [perspective:900px] cursor-pointer ${className}`}
      >
        <div
          style={{
            transform: isHovered
              ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.04, 1.04, 1.04)`
              : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transition: isHovered
              ? 'transform 0.12s ease-out'
              : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="relative w-52 sm:w-60 md:w-64 aspect-[16/10] rounded-2xl bg-black/75 backdrop-blur-xl border border-white/20 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.85)] group-hover/vid:border-[#FF5E1E] group-hover/vid:shadow-[0_0_35px_rgba(255,94,30,0.65),0_0_65px_rgba(255,94,30,0.25),0_20px_50px_rgba(0,0,0,0.95)]"
        >
          {/* Looping Muted Preview Video */}
          <video
            ref={previewVideoRef}
            src={videoSrc}
            playsInline
            loop
            muted
            autoPlay
            className="w-full h-full object-cover object-center filter brightness-90 group-hover/vid:brightness-100 transition-all duration-500 scale-100 group-hover/vid:scale-105"
          />

          {/* Interactive Mouse Glare Reflection */}
          {isHovered && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.18) 0%, rgba(255,94,30,0.12) 40%, transparent 75%)`,
              }}
            />
          )}

          {/* Cinematic Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

          {/* Top Tag & Live Indicator */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
            <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] font-mono tracking-wider font-semibold text-white/90 uppercase">
              {tag}
            </span>
            <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-full bg-[#FF5E1E]/20 border border-[#FF5E1E]/40 text-[9px] font-mono font-bold text-[#FF5E1E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] animate-ping" />
              <span>LIVE</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BOTTOM PLAY BUTTON WITH ANIMATED "EXPLORE" HOVER EXPANSION                 */}
          {/* ========================================================================= */}
          <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-20 pointer-events-none">
            <div className="flex items-center">
              <div
                className={`flex items-center gap-1.5 rounded-full bg-[#FF5E1E] text-white transition-all duration-300 ease-out border border-white/20 shadow-[0_0_20px_rgba(255,94,30,0.85)] group-hover/vid:shadow-[0_0_30px_rgba(255,94,30,1),0_4px_16px_rgba(0,0,0,0.8)] ${
                  isHovered
                    ? 'px-3 py-1.5 sm:px-3.5 sm:py-2'
                    : 'w-8 h-8 sm:w-9 sm:h-9 justify-center'
                }`}
              >
                {/* Play Icon */}
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white shrink-0 translate-x-0.5" />

                {/* Animated "Explore" Text Label Revealed on Hover */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out flex items-center ${
                    isHovered ? 'max-w-[80px] opacity-100 ml-1' : 'max-w-0 opacity-0 ml-0'
                  }`}
                >
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-white whitespace-nowrap">
                    Explore
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle Orange Bottom Rim Glow */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF5E1E] to-transparent opacity-70 group-hover/vid:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* POPUP MODAL VIDEO PLAYER (Not Immediate Fullscreen)                       */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} Video Player`}
          className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fadeIn"
          onClick={handleCloseModal}
        >
          {/* Floating Responsive Popup Card */}
          <div
            className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#FF5E1E]/80 shadow-[0_0_60px_rgba(255,94,30,0.45),0_25px_80px_rgba(0,0,0,0.95)] bg-[#0C0E12] transition-transform duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#11141A] border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5E1E] shadow-[0_0_8px_#FF5E1E]" />
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  {title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-brand-text-muted font-mono">
                  <Volume2 className="w-3.5 h-3.5 text-[#FF5E1E]" />
                  <span>Audio Enabled</span>
                </div>
                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  aria-label="Close popup video"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-[#FF5E1E] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-md"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                ref={modalVideoRef}
                src={videoSrc}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
