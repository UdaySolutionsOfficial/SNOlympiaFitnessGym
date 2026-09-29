import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Play, X, Volume2, VolumeX } from 'lucide-react';
import { ASSET_MANIFEST } from '../../data/assets';

export interface HeroVideoCardProps {
  videoSrc?: string;
  posterSrc?: string;
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
 * Isolated Modal Video Player
 * Completely decoupled from HeroVideoCard so time updates and scrubbers
 * do NOT trigger parent card or hero section re-renders!
 */
interface HeroVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  posterSrc: string;
  title: string;
}

const HeroVideoModal: React.FC<HeroVideoModalProps> = ({
  isOpen,
  onClose,
  videoSrc,
  posterSrc,
  title,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // Notify page that video modal is active so background animations & other videos pause
  useEffect(() => {
    if (!isOpen) return;

    window.dispatchEvent(new CustomEvent('gym-modal-opened'));
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.dispatchEvent(new CustomEvent('gym-modal-closed'));
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen]);

  // Autoplay modal video from 00:00 with sound on open
  useEffect(() => {
    if (!isOpen) return;
    const vid = modalVideoRef.current;
    if (!vid) return;

    const startPlay = () => {
      vid.currentTime = 0;
      vid.muted = false;
      vid.volume = 1;
      setIsMuted(false);
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // If browser autoplay policy requires mute on unmuted audio
            vid.muted = true;
            setIsMuted(true);
            vid.play().then(() => setIsPlaying(true)).catch(() => {});
          });
      }
    };

    if (vid.readyState >= 2) {
      startPlay();
    } else {
      vid.addEventListener('canplay', startPlay, { once: true });
      vid.addEventListener('loadeddata', startPlay, { once: true });
    }
  }, [isOpen]);

  // Keyboard escape listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleTogglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const vid = modalVideoRef.current;
    if (!vid) return;

    if (vid.paused) {
      vid.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          vid.muted = true;
          setIsMuted(true);
          vid.play().then(() => setIsPlaying(true)).catch(() => {});
        });
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const vid = modalVideoRef.current;
    if (!vid) return;
    const nextMuted = !isMuted;
    vid.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const vid = modalVideoRef.current;
    if (!vid || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = ratio * duration;
    vid.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} Video Player`}
      className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl md:max-w-[780px] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#FF5E1E]/60 shadow-[0_0_60px_rgba(255,94,30,0.35),0_25px_80px_rgba(0,0,0,0.95)] bg-[#0C0E12] transition-transform duration-200 group/player select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
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
          <video
            ref={modalVideoRef}
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            playsInline
            loop
            muted={isMuted}
            preload="auto"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            className="w-full h-full object-cover sm:object-contain bg-black"
          />

          {/* Click-to-Play Indicator Ripple */}
          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer z-30 transition-opacity"
              onClick={handleTogglePlay}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FF5E1E] text-white flex items-center justify-center shadow-[0_0_35px_#FF5E1E] border border-white/30 hover:scale-110 active:scale-95 transition-transform animate-pulse">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
              </div>
            </div>
          )}

          {/* Hover Controls Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/player:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5 bg-gradient-to-t from-black/85 via-transparent to-black/35">
            <div className="flex items-center gap-2 pointer-events-auto">
              <span className="w-2 h-2 rounded-full bg-[#FF5E1E] shadow-[0_0_8px_#FF5E1E] animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white drop-shadow-md">
                {title}
              </span>
            </div>

            <div className="space-y-3 pointer-events-auto w-full">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono font-semibold text-white/85 drop-shadow">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                <button
                  onClick={handleToggleMute}
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

              {/* Progress Bar */}
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
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#FFFFFF]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

/**
 * High-End 3D Floating Video Card with Continuous Pop-Out Levitation,
 * Interactive 3D Parallax & Decoupled Portal Modal Video Player.
 */
export const HeroVideoCard: React.FC<HeroVideoCardProps> = ({
  videoSrc = ASSET_MANIFEST.hero.introVideo.path,
  posterSrc,
  title = 'SN Olympia Experience',
  className = '',
  alignment = 'right',
  compact = false,
}) => {
  const effectivePoster =
    posterSrc ||
    (videoSrc.includes('intro-video-2')
      ? '/assets/videos/intro-video-2-poster.webp'
      : '/assets/videos/intro-video-poster.webp');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });

  const cardRef = useRef<HTMLDivElement | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);

  // Reliable Autoplay on all devices with direct property assignments & touch/scroll fallback
  useEffect(() => {
    const vid = previewVideoRef.current;
    if (!vid) return;

    vid.muted = true;
    vid.defaultMuted = true;
    vid.playsInline = true;

    const playPreview = () => {
      if (!isModalOpen) {
        vid.play().catch(() => {});
      }
    };

    if (vid.readyState >= 2) {
      playPreview();
    } else {
      vid.addEventListener('canplay', playPreview, { once: true });
      vid.addEventListener('loadeddata', playPreview, { once: true });
    }

    // Unblock mobile autoplay on first user interaction anywhere
    const onUserTouch = () => {
      if (vid.paused && !isModalOpen) {
        playPreview();
      }
    };
    window.addEventListener('pointerdown', onUserTouch, { passive: true, once: true });
    window.addEventListener('touchstart', onUserTouch, { passive: true, once: true });
    window.addEventListener('scroll', onUserTouch, { passive: true, once: true });

    return () => {
      window.removeEventListener('pointerdown', onUserTouch);
      window.removeEventListener('touchstart', onUserTouch);
      window.removeEventListener('scroll', onUserTouch);
    };
  }, [videoSrc, isModalOpen]);

  // Handle opening modal: pause preview video to free GPU decoder
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

  // 3D Mouse Parallax Tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

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
        {/* Soft Ambient Floating Shadow */}
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
          {/* Looping Muted Preview Video with Instant Poster & Autoplay */}
          <video
            ref={(el) => {
              previewVideoRef.current = el;
              if (el) {
                el.muted = true;
                el.defaultMuted = true;
                el.playsInline = true;
              }
            }}
            src={videoSrc}
            poster={effectivePoster}
            preload="auto"
            defaultMuted
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

          {/* Play Button */}
          <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-20 pointer-events-none">
            <div className="flex items-center">
              <div
                className={`flex items-center gap-1.5 rounded-full bg-[#FF5E1E] text-white transition-all duration-300 ease-out border border-white/20 shadow-[0_0_20px_rgba(255,94,30,0.85)] group-hover/vid:shadow-[0_0_30px_rgba(255,94,30,1),0_4px_16px_rgba(0,0,0,0.8)] ${
                  isHovered
                    ? 'px-3 py-1.5 sm:px-3.5 sm:py-2'
                    : 'w-8 h-8 sm:w-9 sm:h-9 justify-center'
                }`}
              >
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white shrink-0 translate-x-0.5" />
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

          {/* Bottom Rim Glow */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF5E1E] to-transparent opacity-70 group-hover/vid:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Decoupled High-Performance Modal Player */}
      <HeroVideoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        videoSrc={videoSrc}
        posterSrc={effectivePoster}
        title={title}
      />
    </>
  );
};
