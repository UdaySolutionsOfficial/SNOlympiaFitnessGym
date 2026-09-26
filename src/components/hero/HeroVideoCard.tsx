import React, { useState, useRef, useEffect } from 'react';
import { Play, X } from 'lucide-react';
import { ASSET_MANIFEST } from '../../data/assets';

export interface HeroVideoCardProps {
  className?: string;
}

/**
 * Clean 3D Floating Video Card with Interactive Tilt, Neon Shadow & Full-Screen Sound Playback
 *
 * Requirements fulfilled:
 * 1. Clean & neat: No extra text pills, no extra auxiliary buttons — ONLY the video preview & glowing play button.
 * 2. On click: Launches full-screen mode with sound unmuted.
 * 3. 3D Floating Animation: Continuously floats gently like a physical 3D element.
 * 4. Interactive 3D Hover Tilt & Neon Orange Shadow: Smoothly tilts and casts a radiant orange neon glow.
 */
export const HeroVideoCard: React.FC<HeroVideoCardProps> = ({ className = '' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // Auto-play the card preview muted on loop
  useEffect(() => {
    if (previewVideoRef.current) {
      previewVideoRef.current.play().catch(() => {});
    }
  }, []);

  // Handle opening full-screen video with sound
  const handleOpenFullscreen = () => {
    // Pause background card preview
    if (previewVideoRef.current) {
      previewVideoRef.current.pause();
    }
    setIsModalOpen(true);
  };

  const handleCloseFullscreen = () => {
    setIsModalOpen(false);
    // Resume card preview
    if (previewVideoRef.current) {
      previewVideoRef.current.play().catch(() => {});
    }
  };

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Request native fullscreen if supported when modal opens
  useEffect(() => {
    if (isModalOpen && modalVideoRef.current) {
      modalVideoRef.current.muted = false;
      modalVideoRef.current.volume = 1;
      modalVideoRef.current.play().catch(() => {});
      
      const el = modalVideoRef.current as any;
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => {});
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen().catch(() => {});
      }
    }
  }, [isModalOpen]);

  return (
    <>
      {/* 3D Floating & Tilting Container */}
      <div
        className={`group/vid relative select-none [perspective:1000px] ${className}`}
        style={{
          animation: 'heroVideoFloat 6s ease-in-out infinite',
        }}
      >
        <div
          onClick={handleOpenFullscreen}
          role="button"
          tabIndex={0}
          aria-label="Play Olympia Fitness intro video in full screen with sound"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOpenFullscreen();
            }
          }}
          className="relative w-64 sm:w-72 md:w-80 aspect-[16/10] rounded-2xl sm:rounded-3xl bg-black/70 backdrop-blur-xl border border-white/20 overflow-hidden cursor-pointer transition-all duration-500 ease-out transform group-hover/vid:[transform:rotateY(-9deg)_rotateX(6deg)_scale(1.05)] shadow-[0_20px_50px_rgba(0,0,0,0.85)] group-hover/vid:border-brand-volt group-hover/vid:shadow-[0_0_40px_rgba(255,94,30,0.6),0_0_80px_rgba(255,94,30,0.3),0_25px_60px_rgba(0,0,0,0.9)]"
        >
          {/* Looping Muted Preview Video */}
          <video
            ref={previewVideoRef}
            src={ASSET_MANIFEST.hero.introVideo.path}
            playsInline
            loop
            muted
            autoPlay
            className="w-full h-full object-cover object-center filter brightness-95 group-hover/vid:brightness-105 transition-all duration-500"
          />

          {/* Subtle Ambient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Clean Orange Glowing Play Trigger Only */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-13 h-13 sm:w-15 sm:h-15 w-14 h-14 rounded-full bg-brand-volt text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,94,30,0.8)] group-hover/vid:scale-115 group-hover/vid:shadow-[0_0_45px_rgba(255,94,30,1)] transition-all duration-300">
              <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Video Overlay with Sound */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Full screen video player"
          className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 md:p-10 animate-fadeIn"
          onClick={handleCloseFullscreen}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseFullscreen}
            aria-label="Close full screen video"
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-brand-volt text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Video Player Container */}
          <div
            className="relative w-full max-w-5xl aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-brand-volt/60 shadow-[0_0_60px_rgba(255,94,30,0.4)] bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              src={ASSET_MANIFEST.hero.introVideo.path}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain bg-black"
            />
          </div>
        </div>
      )}

      {/* Keyframe Float Animation Style */}
      <style>{`
        @keyframes heroVideoFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(0.8deg);
          }
        }
      `}</style>
    </>
  );
};
