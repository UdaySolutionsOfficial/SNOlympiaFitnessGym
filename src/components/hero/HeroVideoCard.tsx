import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Play, X, Volume2, VolumeX } from 'lucide-react';
import { ASSET_MANIFEST } from '../../data/assets';

export interface HeroVideoCardProps {
  videoSrc?: string;
  title?: string;
  tag?: string;
  className?: string;
  alignment?: 'left' | 'right';
  compact?: boolean;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

/**
 * High-End 3D Floating Video Card with Continuous Pop-Out Levitation,
 * Interactive 3D Parallax & Portal-Based Blurred Backdrop Modal Popup.
 * 
 * Features requested by user:
 * 1. Popup rendered via React Portal so top navbar is blurred in the background.
 * 2. Reduced, professional cinema-grade popup container dimensions.
 * 3. Native controls removed completely.
 * 4. Only animated progress bar and customized mute/unmute button.
 * 5. Controls only revealed on hover over the video.
 */
export const HeroVideoCard: React.FC<HeroVideoCardProps> = ({
  videoSrc = ASSET_MANIFEST.hero.introVideo.path,
  title = 'SN Olympia Experience',
  className = '',
  alignment = 'right',
  compact = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });

  const cardRef = useRef<HTMLDivElement | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // Auto-play the card preview muted on loop
  useEffect(() => {
    if (previewVideoRef.current) {
      previewVideoRef.current.muted = true;
      previewVideoRef.current.play().catch(() => {});
    }
  }, [videoSrc]);

  // Handle opening popup video modal with sound and locking body scroll
  const handleOpenModal = () => {
    if (previewVideoRef.current) {
      previewVideoRef.current.pause();
    }
    setIsModalOpen(true);
    setIsPlaying(true);
    setIsMuted(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
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

  // Autoplay modal video from the beginning with sound once open
  useEffect(() => {
    if (isModalOpen && modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.muted = false;
      modalVideoRef.current.volume = 1;
      setIsMuted(false);
      modalVideoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        // Fallback to muted only if browser blocks unmuted audio
        if (modalVideoRef.current) {
          modalVideoRef.current.muted = true;
          setIsMuted(true);
          modalVideoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      });
    }
  }, [isModalOpen]);

  // Toggle play/pause on video frame click
  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!modalVideoRef.current) return;
    if (modalVideoRef.current.paused) {
      modalVideoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      modalVideoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Toggle sound mute/unmute
  const handleToggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!modalVideoRef.current) return;
    const nextMuted = !isMuted;
    modalVideoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Video time update
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTime(e.currentTarget.currentTime);
  };

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setDuration(e.currentTarget.duration);
  };

  // Scrub on animated progress bar
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!modalVideoRef.current || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = ratio * duration;
    modalVideoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  // 3D Mouse Parallax Tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Rotate up to 16 degrees
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

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* 3D Floating & Tilting Card Container with True Stereoscopic Depth */}
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
        className={`group/vid relative select-none [perspective:1200px] [transform-style:preserve-3d] cursor-pointer ${className}`}
      >
        {/* Soft Ambient Floating Shadow on Ground Plane */}
        <div
          className={`absolute -bottom-3 inset-x-4 h-6 rounded-full bg-[#FF5E1E]/20 blur-xl pointer-events-none transition-all duration-500 ${
            isHovered ? 'scale-115 opacity-80' : 'opacity-40 animate-pulse'
          }`}
        />

        <div
          style={{
            transform: isHovered && !compact
              ? `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y + (alignment === 'left' ? 6 : -6)}deg) translateZ(48px) scale3d(1.04, 1.04, 1.04)`
              : undefined,
            transition: isHovered
              ? 'transform 0.12s ease-out, box-shadow 0.25s ease-out'
              : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease-out',
          }}
          className={
            compact
              ? `relative w-full aspect-[16/9] rounded-xl bg-black/90 border border-white/20 overflow-hidden transition-all duration-300 ${
                  isHovered
                    ? 'border-[#FF5E1E] shadow-[0_0_25px_rgba(255,94,30,0.6)]'
                    : 'shadow-md'
                }`
              : `relative w-48 sm:w-56 md:w-60 aspect-[16/10] rounded-2xl bg-black/85 backdrop-blur-2xl border border-white/20 overflow-hidden ${
                  !isHovered
                    ? alignment === 'left'
                      ? 'animate-3d-float-left'
                      : 'animate-3d-float-right'
                    : 'shadow-[0_30px_70px_-10px_rgba(0,0,0,0.95),0_0_45px_rgba(255,94,30,0.8),0_0_70px_rgba(255,94,30,0.3)] border-[#FF5E1E]'
                }`
          }
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

          {/* Compact Mode Title Badge */}
          {compact && (
            <div className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5 shadow-sm pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] animate-pulse" />
              <span className="truncate max-w-[200px]">{title}</span>
            </div>
          )}

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

          {/* BOTTOM PLAY BUTTON WITH ANIMATED "EXPLORE" HOVER EXPANSION */}
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
      {/* POPUP MODAL VIDEO PLAYER (Rendered via Portal to blur entire page & navbar)*/}
      {/* ========================================================================= */}
      {isModalOpen && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} Video Player`}
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fadeIn"
          onClick={handleCloseModal}
        >
          {/* Floating Responsive Popup Card (Reduced Professional Cinema Size) */}
          <div
            className="relative w-full max-w-3xl md:max-w-[780px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#FF5E1E]/60 shadow-[0_0_60px_rgba(255,94,30,0.35),0_25px_80px_rgba(0,0,0,0.95)] bg-[#0C0E12] transition-transform duration-200 group/player select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button (Discreet & Hover-Elevated) */}
            <button
              onClick={handleCloseModal}
              aria-label="Close popup video"
              className="absolute top-3.5 right-3.5 z-40 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-[#FF5E1E] text-white flex items-center justify-center backdrop-blur-xl border border-white/20 hover:border-[#FF5E1E] transition-all hover:scale-105 active:scale-95 shadow-xl opacity-80 hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Video Container Frame */}
            <div
              className="relative w-full aspect-video bg-black flex items-center justify-center cursor-pointer overflow-hidden"
              onClick={handleTogglePlay}
            >
              {/* Video Element without any native buttons */}
              <video
                ref={modalVideoRef}
                src={videoSrc}
                autoPlay
                playsInline
                loop
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                className="w-full h-full object-cover sm:object-contain bg-black"
              />

              {/* Momentary Play/Pause Status Indicator Ripple */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none transition-opacity">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FF5E1E] text-white flex items-center justify-center shadow-[0_0_35px_#FF5E1E] border border-white/30 animate-pulse">
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white translate-x-0.5" />
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* HOVER-ONLY OVERLAY CONTROLS (Progress Bar + Sound Mute/Unmute Button)      */}
              {/* ========================================================================= */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/player:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5 bg-gradient-to-t from-black/85 via-transparent to-black/35">
                
                {/* Top Video Title Badge */}
                <div className="flex items-center gap-2 pointer-events-auto">
                  <span className="w-2 h-2 rounded-full bg-[#FF5E1E] shadow-[0_0_8px_#FF5E1E] animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-white drop-shadow-md">
                    {title}
                  </span>
                </div>

                {/* Bottom Interactive Area */}
                <div className="space-y-3 pointer-events-auto w-full">
                  <div className="flex items-center justify-between text-xs">
                    {/* Timestamp */}
                    <span className="text-[11px] font-mono font-semibold text-white/85 drop-shadow">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>

                    {/* Customized Sound Mute/Unmute Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleMute();
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/65 hover:bg-black/95 backdrop-blur-xl border border-white/20 hover:border-[#FF5E1E] text-white hover:text-[#FF5E1E] shadow-lg transition-all active:scale-95 group/sound"
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-red-400" />
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400">
                            Muted
                          </span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-[#FF5E1E]" />
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white group-hover/sound:text-[#FF5E1E]">
                            Sound On
                          </span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Customized Animated Progress Bar */}
                  <div
                    className="relative w-full h-1.5 sm:h-2 bg-white/25 hover:h-2.5 rounded-full overflow-hidden cursor-pointer backdrop-blur-md transition-all duration-150 group/bar"
                    onClick={handleSeek}
                    role="slider"
                    aria-label="Video playback progress"
                    aria-valuenow={Math.round(progressPercent)}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 via-[#FF7538] to-[#FF5E1E] shadow-[0_0_12px_#FF5E1E] rounded-full relative transition-[width] duration-100 ease-linear"
                      style={{ width: `${progressPercent}%` }}
                    >
                      {/* Leading Glow Dot */}
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#FFFFFF]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
