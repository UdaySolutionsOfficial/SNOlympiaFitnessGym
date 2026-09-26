import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Sparkles,
  Users,
  Dumbbell,
  Maximize2,
} from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export type VideoCategory = 'all' | 'men' | 'women';

export interface GalleryVideoItem {
  id: string;
  src: string;
  category: 'men' | 'women';
  title: string;
  subtitle: string;
  tag: string;
}

const GALLERY_VIDEOS: readonly GalleryVideoItem[] = [
  // Men's Training Reels (from video assests/gallary videos)
  {
    id: 'men-1',
    src: '/assets/videos/gallery/men/men-1.mp4',
    category: 'men',
    title: 'Heavy Bench & Pec Hypertrophy',
    subtitle: 'Compound power pressing with high-tension floor spotting',
    tag: "MEN'S STRENGTH",
  },
  {
    id: 'men-2',
    src: '/assets/videos/gallery/men/men-2.mp4',
    category: 'men',
    title: 'Bent-Over Barbell Rows',
    subtitle: 'Strict lat engagement & posterior chain bracing',
    tag: 'LAT DENSITY',
  },
  {
    id: 'men-3',
    src: '/assets/videos/gallery/men/men-3.mp4',
    category: 'men',
    title: 'Power Cage Back Squats',
    subtitle: 'Deep Olympic squats with calibrated iron plates',
    tag: 'LEG POWER',
  },
  {
    id: 'men-4',
    src: '/assets/videos/gallery/men/men-4.mp4',
    category: 'men',
    title: 'Arm Hypertrophy & Bicep Peaks',
    subtitle: 'EZ-bar isolated curls with peak mechanical overload',
    tag: 'ARM SPECIALIZATION',
  },
  {
    id: 'men-5',
    src: '/assets/videos/gallery/men/men-5.mp4',
    category: 'men',
    title: 'Deadlift & Erector Power',
    subtitle: 'Raw steel conventional pulls from rubber lifting platform',
    tag: 'POSTERIOR CHAIN',
  },
  {
    id: 'men-6',
    src: '/assets/videos/gallery/men/men-6.mp4',
    category: 'men',
    title: 'Full Body Conditioning Circuit',
    subtitle: 'High-intensity athletic conditioning across open turf',
    tag: 'METABOLIC ENGINE',
  },
  {
    id: 'men-7',
    src: '/assets/videos/gallery/men/men-7.mp4',
    category: 'men',
    title: 'Overhead DB Shoulder Press',
    subtitle: 'Strict deltoid hypertrophy with dumbbell rack arsenal',
    tag: 'DELTOID POWER',
  },
  {
    id: 'men-8',
    src: '/assets/videos/gallery/men/men-8.mp4',
    category: 'men',
    title: 'Dual Cable Tricep Lockouts',
    subtitle: 'Constant cable tension for horseshoe tricep development',
    tag: 'CABLE PRECISION',
  },

  // Women's Training Reels (from video assests/gallary videos/Women)
  {
    id: 'women-1',
    src: '/assets/videos/gallery/women/women-1.mp4',
    category: 'women',
    title: "Women's Romanian Deadlifts",
    subtitle: 'Controlled hamstring stretch & glute lockout mechanics',
    tag: "WOMEN'S HYPERTROPHY",
  },
  {
    id: 'women-2',
    src: '/assets/videos/gallery/women/women-2.mp4',
    category: 'women',
    title: "Women's Core & Functional Bracing",
    subtitle: 'Rotational cable torque and deep abdominal stability',
    tag: "WOMEN'S CONDITIONING",
  },
  {
    id: 'women-3',
    src: '/assets/videos/gallery/women/women-3.mp4',
    category: 'women',
    title: "Women's Lat Pulldown Mastery",
    subtitle: 'Upper back width and posture development with coach guidance',
    tag: "WOMEN'S STRENGTH",
  },
  {
    id: 'women-4',
    src: '/assets/videos/gallery/women/women-4.mp4',
    category: 'women',
    title: 'Walking Dumbbell Lunges',
    subtitle: 'Unilateral quad and glute development on dedicated floor',
    tag: "WOMEN'S LOWER BODY",
  },
  {
    id: 'women-5',
    src: '/assets/videos/gallery/women/women-5.mp4',
    category: 'women',
    title: 'High-Velocity Battle Ropes',
    subtitle: 'Cardiorespiratory stamina and upper body conditioning',
    tag: "WOMEN'S AGILITY",
  },
];

/**
 * 3D Curved Media Gallery — Inspired by ThreeUI Media Gallery Animation
 * Displays actual SN Olympia Gym training videos on a 3D cylindrical ring curling around the viewer.
 *
 * Features:
 * - Category filter: All (13) | Men (8) | Women (5) with animated sliding glass pill
 * - 3D Ring Projection: Cards curl inwards in cylindrical 3D perspective (rotateY + translateZ + scale)
 * - Autoplaying muted video loops
 * - Drag, swipe, and arrow controls with smooth spring physics
 * - Popup modal with unmuted audio playback, video navigation & keyboard controls
 */
export const VideoArenaSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<VideoCategory>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVideo, setModalVideo] = useState<GalleryVideoItem | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Drag interaction states
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDeltaX, setDragDeltaX] = useState(0);

  // Filter videos based on selection
  const filteredVideos = GALLERY_VIDEOS.filter((v) => {
    if (activeFilter === 'all') return true;
    return v.category === activeFilter;
  });

  // Reset index if out of bounds after filter change
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter]);

  // Navigate next/prev
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredVideos.length - 1));
  }, [filteredVideos.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < filteredVideos.length - 1 ? prev + 1 : 0));
  }, [filteredVideos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalVideo) {
        if (e.key === 'Escape') setModalVideo(null);
        if (e.key === 'ArrowRight') {
          const currentModalIdx = filteredVideos.findIndex((v) => v.id === modalVideo.id);
          const nextIdx = (currentModalIdx + 1) % filteredVideos.length;
          setModalVideo(filteredVideos[nextIdx]);
        }
        if (e.key === 'ArrowLeft') {
          const currentModalIdx = filteredVideos.findIndex((v) => v.id === modalVideo.id);
          const prevIdx = (currentModalIdx - 1 + filteredVideos.length) % filteredVideos.length;
          setModalVideo(filteredVideos[prevIdx]);
        }
      } else {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalVideo, filteredVideos, handlePrev, handleNext]);

  // Auto-play modal video with sound when open
  useEffect(() => {
    if (modalVideo && modalVideoRef.current) {
      modalVideoRef.current.muted = false;
      modalVideoRef.current.volume = 1;
      modalVideoRef.current.play().catch(() => {});
    }
  }, [modalVideo]);

  // Pointer drag event handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragDeltaX(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setDragDeltaX(e.clientX - dragStartX);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDeltaX > 50) {
      handlePrev();
    } else if (dragDeltaX < -50) {
      handleNext();
    }
    setDragDeltaX(0);
  };

  return (
    <section
      id="action"
      className="relative py-28 sm:py-36 md:py-44 bg-[#08090A] overflow-hidden border-t border-brand-border/60 select-none"
    >
      {/* Anchor for backwards compatibility */}
      <div id="reels" className="absolute -top-24 pointer-events-none" />

      {/* 1. Ambient Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#FF5E1E]/12 filter blur-[120px]" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-[#FFA034]/10 filter blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* SECTION HEADER WITH CATEGORY FILTER                                       */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-3 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-[#FF5E1E] uppercase font-bold">
                // 03.5 LIVE ACTION ARENA
              </span>
            </div>

            {/* Headline with Athletic Gradient */}
            <h2 className="font-athletic italic uppercase font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-white leading-none">
              THE OLYMPIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E1E] via-[#FF7538] to-[#FFA034] text-glow-orange">ACTION</span> VAULT
            </h2>
            <p className="text-sm sm:text-base text-brand-text-secondary max-w-xl mt-3 font-normal">
              Portrait media standing on a 3D cylindrical ring curling around the viewer. High-intensity floor workouts captured live across our unisex facility.
            </p>
          </div>

          {/* Interactive Category Filter Pills (All | Men | Women) */}
          <div className="flex items-center p-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl shadow-lg self-start md:self-auto">
            {(
              [
                { id: 'all', label: 'All Action', count: 13, icon: <Sparkles className="w-3.5 h-3.5" /> },
                { id: 'men', label: "Men's Power", count: 8, icon: <Dumbbell className="w-3.5 h-3.5" /> },
                { id: 'women', label: "Women's Zone", count: 5, icon: <Users className="w-3.5 h-3.5" /> },
              ] as const
            ).map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider outline-none transition-colors ${
                    isActive ? 'text-[#0A0B10]' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {/* Sliding Active Filter Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeReelFilterPill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-b from-white via-[#F4F6FB] to-[#E2E6EE] shadow-[0_4px_20px_rgba(255,94,30,0.6)] z-0"
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-[#FF5E1E]' : 'opacity-70'}`}>
                    {filter.icon}
                  </span>
                  <span className="relative z-10 whitespace-nowrap">{filter.label}</span>
                  <span
                    className={`relative z-10 text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-[#0A0B10]/10 text-[#0A0B10] font-black' : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3D CYLINDRICAL CURVED REELS RING                                         */}
        {/* ========================================================================= */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="relative w-full h-[520px] sm:h-[580px] md:h-[620px] flex items-center justify-center [perspective:1400px] overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'pan-y' }}
        >
          {/* Subtle 3D Ring Stage Illumination */}
          <div className="absolute inset-x-0 bottom-8 h-24 bg-gradient-to-t from-[#FF5E1E]/15 via-transparent to-transparent filter blur-2xl pointer-events-none" />

          {/* Cards Projection in Cylindrical Space */}
          <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
            {filteredVideos.map((video, idx) => {
              // Calculate circular offset relative to current center
              let offset = idx - currentIndex;
              const total = filteredVideos.length;

              // Wrap-around offset for circular continuity
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              // Hide cards too far from view
              const isVisible = Math.abs(offset) <= 3;
              if (!isVisible) return null;

              // Cylindrical projection mathematics (Curling inward toward edges like animation effect.mp4)
              // Each offset step turns by 16 degrees and steps backward in Z-space
              const rotateY = offset * 18;
              const translateZ = -Math.abs(offset) * 65;
              const translateX = offset * (window.innerWidth < 640 ? 210 : 255);
              const scale = Math.max(0.72, 1 - Math.abs(offset) * 0.08);
              const opacity = Math.max(0.35, 1 - Math.abs(offset) * 0.22);
              const zIndex = 50 - Math.abs(offset) * 10;
              const isCenter = offset === 0;

              return (
                <div
                  key={video.id}
                  onClick={() => {
                    if (isCenter) {
                      setModalVideo(video);
                    } else {
                      setCurrentIndex(idx);
                    }
                  }}
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                    transition: isDragging
                      ? 'none'
                      : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out, filter 0.5s ease-out',
                  }}
                  className={`absolute w-56 sm:w-64 md:w-72 aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden border bg-[#0D0F14] transition-all cursor-pointer group shadow-[0_25px_60px_rgba(0,0,0,0.9)] ${
                    isCenter
                      ? 'border-[#FF5E1E] shadow-[0_0_40px_rgba(255,94,30,0.5),0_25px_70px_rgba(0,0,0,0.95)] ring-2 ring-[#FF5E1E]/40'
                      : 'border-white/15 hover:border-white/40'
                  }`}
                >
                  {/* Autoplaying Muted Preview Video */}
                  <video
                    src={video.src}
                    loop
                    muted
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover object-center filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500"
                  />

                  {/* Top-To-Bottom Vignette Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/40 pointer-events-none" />

                  {/* Top Header Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] font-mono tracking-wider font-bold text-white uppercase">
                      {video.tag}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:bg-[#FF5E1E] group-hover:text-white transition-colors">
                      <Maximize2 className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Center Glowing Play Trigger */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 ${
                        isCenter
                          ? 'bg-[#FF5E1E] shadow-[0_0_30px_rgba(255,94,30,0.9)] scale-100 group-hover:scale-110'
                          : 'bg-black/60 border border-white/20 scale-90 group-hover:scale-100 group-hover:bg-[#FF5E1E]'
                      }`}
                    >
                      <Play className="w-5 h-5 fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom Captions & Info */}
                  <div className="absolute bottom-4 inset-x-4 pointer-events-none z-10">
                    <h3 className="font-athletic italic uppercase font-black text-base sm:text-lg text-white leading-tight drop-shadow-md">
                      {video.title}
                    </h3>
                    <p className="text-[11px] text-neutral-300 line-clamp-2 mt-1 leading-snug font-medium">
                      {video.subtitle}
                    </p>
                  </div>

                  {/* Glowing Orange Rim along Bottom Edge */}
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF5E1E] to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
              );
            })}
          </div>

          {/* Left Arrow Navigation Trigger */}
          <button
            onClick={handlePrev}
            aria-label="Previous reel"
            className="absolute left-2 sm:left-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-[#FF5E1E] text-white border border-white/20 hover:border-[#FF5E1E] flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-xl"
          >
            <ChevronLeft className="w-6 h-6 -translate-x-0.5" />
          </button>

          {/* Right Arrow Navigation Trigger */}
          <button
            onClick={handleNext}
            aria-label="Next reel"
            className="absolute right-2 sm:right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-[#FF5E1E] text-white border border-white/20 hover:border-[#FF5E1E] flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-xl"
          >
            <ChevronRight className="w-6 h-6 translate-x-0.5" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* CAROUSEL PAGINATION DOTS & DRAG HINT                                      */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-4">
          <span className="text-xs font-mono tracking-widest text-brand-text-muted uppercase">
            DRAG TO EXPLORE &bull; CLICK ANY REEL TO EXPAND WITH SOUND
          </span>

          <div className="flex items-center gap-1.5">
            {filteredVideos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === i ? 'w-8 bg-[#FF5E1E] shadow-[0_0_10px_#FF5E1E]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CINEMATIC POPUP MODAL WITH UNMUTED AUDIO                                  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {modalVideo && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${modalVideo.title} Video Player`}
            className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 md:p-8 animate-fadeIn"
            onClick={() => setModalVideo(null)}
          >
            {/* Modal Card */}
            <div
              className="relative w-full max-w-lg md:max-w-2xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden border-2 border-[#FF5E1E]/80 shadow-[0_0_60px_rgba(255,94,30,0.5),0_25px_80px_rgba(0,0,0,0.95)] bg-[#0C0E12]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-[#12151D] border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5E1E] shadow-[0_0_8px_#FF5E1E] animate-pulse" />
                  <div>
                    <h4 className="font-athletic italic uppercase font-black text-sm sm:text-base text-white leading-tight">
                      {modalVideo.title}
                    </h4>
                    <span className="text-[10px] font-mono text-[#FF5E1E] font-bold uppercase">
                      {modalVideo.tag}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-brand-text-muted font-mono">
                    <Volume2 className="w-3.5 h-3.5 text-[#FF5E1E]" />
                    <span className="hidden sm:inline">Audio Active</span>
                  </div>
                  <button
                    onClick={() => setModalVideo(null)}
                    aria-label="Close popup video"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF5E1E] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Video Player */}
              <div className="relative flex-1 bg-black flex items-center justify-center max-h-[72vh] overflow-hidden">
                <video
                  ref={modalVideoRef}
                  src={modalVideo.src}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain max-h-[72vh] bg-black"
                />
              </div>

              {/* Modal Footer Controls */}
              <div className="flex items-center justify-between px-5 py-3 bg-[#12151D] border-t border-white/10">
                <p className="text-xs text-neutral-400 font-medium truncate pr-4">
                  {modalVideo.subtitle}
                </p>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      const curIdx = filteredVideos.findIndex((v) => v.id === modalVideo.id);
                      const prevIdx = (curIdx - 1 + filteredVideos.length) % filteredVideos.length;
                      setModalVideo(filteredVideos[prevIdx]);
                    }}
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#FF5E1E] text-white text-xs font-bold uppercase transition-all flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>
                  <button
                    onClick={() => {
                      const curIdx = filteredVideos.findIndex((v) => v.id === modalVideo.id);
                      const nextIdx = (curIdx + 1) % filteredVideos.length;
                      setModalVideo(filteredVideos[nextIdx]);
                    }}
                    className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#FF5E1E] text-white text-xs font-bold uppercase transition-all flex items-center gap-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
