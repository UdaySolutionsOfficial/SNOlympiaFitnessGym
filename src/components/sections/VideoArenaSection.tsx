import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  X,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Sparkles,
  Users,
  Dumbbell,
  Maximize2,
} from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ScrollReveal } from '../common/ScrollReveal';

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
  {
    id: 'women-6',
    src: '/assets/videos/gallery/women/women-6.mp4',
    category: 'women',
    title: "Women's Progressive Resistance",
    subtitle: 'Strict dumbbell form and compound tension control',
    tag: "WOMEN'S RESISTANCE",
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
  const [displayPos, setDisplayPos] = useState(0);
  const [windowWidth, setWindowWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1200));
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const isScrubbingRef = useRef(false);

  // Time format helper (m:ss)
  const formatTime = (secs: number) => {
    if (isNaN(secs) || !isFinite(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Video element references for in-place audio management
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  // Animation & Physics Refs
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetPosRef = useRef(0);
  const currentPosRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const snapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Drag Interaction Tracking
  const isPointerDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityXRef = useRef(0);

  // Filtered Video Data
  const filteredVideos = GALLERY_VIDEOS.filter((v) => {
    if (activeFilter === 'all') return true;
    return v.category === activeFilter;
  });
  const totalVideos = filteredVideos.length;

  // Active center index (normalized circular index)
  const activeCenterIndex = ((((Math.round(displayPos)) % totalVideos) + totalVideos) % totalVideos);

  // Play selected video directly from the beginning (00:00) with sound
  const playVideoFromBeginning = useCallback((videoId: string) => {
    setActiveAudioId(videoId);
    setIsAudioMuted(false);
    setIsPlaying(true);
    setCurrentTime(0);

    const targetEl = videoRefs.current.get(videoId);
    if (targetEl) {
      targetEl.currentTime = 0;
      if (targetEl.duration) {
        setDuration(targetEl.duration);
      }
      targetEl.muted = false;
      targetEl.volume = 1.0;
      targetEl.play().catch(() => {});
    }

    // Keep all other videos silent
    videoRefs.current.forEach((el, id) => {
      if (id !== videoId) {
        el.muted = true;
        el.volume = 0;
        el.play().catch(() => {});
      }
    });
  }, []);

  // Responsive window resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth RAF Animation Loop with Organic Spring-Lerp
  const startLoop = useCallback(() => {
    if (rafRef.current !== null) return;

    const tick = () => {
      const diff = targetPosRef.current - currentPosRef.current;
      if (Math.abs(diff) > 0.001) {
        currentPosRef.current += diff * 0.16;
        setDisplayPos(currentPosRef.current);
        rafRef.current = requestAnimationFrame(tick);
      } else {
        currentPosRef.current = targetPosRef.current;
        setDisplayPos(currentPosRef.current);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // Reset positions on category filter switch
  useEffect(() => {
    targetPosRef.current = 0;
    currentPosRef.current = 0;
    setDisplayPos(0);
    setActiveAudioId(null);
    setIsPlaying(true);
    setIsAudioMuted(false);
    setCurrentTime(0);
    setDuration(0);
    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, [activeFilter]);

  // Synchronize In-Place Audio Playback
  useEffect(() => {
    videoRefs.current.forEach((el, id) => {
      if (id === activeAudioId) {
        el.muted = isAudioMuted;
        el.volume = isAudioMuted ? 0 : 1;
        if (isPlaying) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      } else {
        el.muted = true;
        el.volume = 0;
        // Keep smooth silent preview loop running
        el.play().catch(() => {});
      }
    });
  }, [activeAudioId, isAudioMuted, isPlaying]);

  // Infinite Loop Horizontal Wheel & Trackpad Gesture Scrolling (Real Intentional Scroll Only)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Strictly filter for intentional horizontal scrolling (ignore stray micro-movements)
      const isIntentionalHorizontal = Math.abs(e.deltaX) > 8 && Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.5;
      const isShiftWheel = e.shiftKey && Math.abs(e.deltaY) > 8;

      if (isIntentionalHorizontal || isShiftWheel) {
        e.preventDefault();
        const delta = isIntentionalHorizontal ? e.deltaX : e.deltaY;

        // Controlled, predictable sensitivity
        const step = delta * 0.0024;
        targetPosRef.current += step;

        if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
        snapTimeoutRef.current = setTimeout(() => {
          targetPosRef.current = Math.round(targetPosRef.current);
          startLoop();
        }, 160);

        startLoop();
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    };
  }, [totalVideos, startLoop]);

  // Infinite Loop Arrow navigation
  const handlePrev = useCallback(() => {
    targetPosRef.current = Math.round(targetPosRef.current) - 1;
    startLoop();

    // Set new centered card as active sound starting from beginning
    const newIdx = ((((Math.round(targetPosRef.current)) % totalVideos) + totalVideos) % totalVideos);
    if (activeAudioId) {
      playVideoFromBeginning(filteredVideos[newIdx].id);
    }
  }, [totalVideos, activeAudioId, filteredVideos, startLoop, playVideoFromBeginning]);

  const handleNext = useCallback(() => {
    targetPosRef.current = Math.round(targetPosRef.current) + 1;
    startLoop();

    // Set new centered card as active sound starting from beginning
    const newIdx = ((((Math.round(targetPosRef.current)) % totalVideos) + totalVideos) % totalVideos);
    if (activeAudioId) {
      playVideoFromBeginning(filteredVideos[newIdx].id);
    }
  }, [totalVideos, activeAudioId, filteredVideos, startLoop, playVideoFromBeginning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === ' ') {
        if (activeAudioId) {
          e.preventDefault();
          setIsPlaying((p) => !p);
        }
      }
      if (e.key === 'm' || e.key === 'M') {
        if (activeAudioId) {
          e.preventDefault();
          setIsAudioMuted((m) => !m);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, activeAudioId]);

  // Pointer drag event handlers with 1:1 real-time tracking & infinite flick throw
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    isPointerDownRef.current = true;
    isDraggingRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = targetPosRef.current;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityXRef.current = 0;

    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // CRITICAL: NEVER move on hover! Only move if mouse button is actively held down!
    if (!isPointerDownRef.current) return;
    if (e.buttons !== 1) {
      isPointerDownRef.current = false;
      isDraggingRef.current = false;
      return;
    }

    const totalDeltaX = e.clientX - dragStartXRef.current;

    // Only engage drag if moved more than 10px intentionally
    if (!isDraggingRef.current) {
      if (Math.abs(totalDeltaX) > 10) {
        isDraggingRef.current = true;
        if (containerRef.current) {
          try {
            containerRef.current.setPointerCapture(e.pointerId);
          } catch {}
        }
      } else {
        return;
      }
    }

    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    const dx = e.clientX - lastXRef.current;

    velocityXRef.current = dx / dt;
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;

    const cardSpacing = windowWidth < 640 ? 210 : 260;

    // Free continuous tracking in loop
    const newPos = dragStartPosRef.current - totalDeltaX / cardSpacing;
    targetPosRef.current = newPos;
    currentPosRef.current = newPos;
    setDisplayPos(currentPosRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isPointerDownRef.current = false;

    if (containerRef.current) {
      try {
        containerRef.current.releasePointerCapture(e.pointerId);
      } catch {}
    }

    if (!isDraggingRef.current) {
      // It was a clean tap! Let onClick handle it cleanly
      return;
    }

    isDraggingRef.current = false;
    const totalDeltaX = e.clientX - dragStartXRef.current;
    if (Math.abs(totalDeltaX) >= 12) {
      // Natural flick throwing with momentum
      const flickImpulse = -velocityXRef.current * 1.5;
      const projectedPos = targetPosRef.current + flickImpulse;
      targetPosRef.current = Math.round(projectedPos);
      startLoop();
    } else {
      targetPosRef.current = Math.round(targetPosRef.current);
      startLoop();
    }
  };

  const handlePointerLeave = () => {
    isPointerDownRef.current = false;
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      targetPosRef.current = Math.round(targetPosRef.current);
      startLoop();
    }
  };

  // Click card handler: centers selected video and plays directly IN PLACE with sound from beginning!
  const handleCardClick = (video: GalleryVideoItem, idx: number) => {
    // If was actively dragging, ignore
    if (isDraggingRef.current) return;

    // Calculate shortest circular path to center this card
    let diff = ((idx - currentPosRef.current) % totalVideos + totalVideos) % totalVideos;
    if (diff > totalVideos / 2) diff -= totalVideos;

    // Smoothly rotate the ring to bring this card to center
    targetPosRef.current += diff;
    startLoop();

    // If already the active playing center card, toggle play/pause
    if (activeAudioId === video.id && Math.abs(diff) < 0.4) {
      setIsPlaying((prev) => {
        const nextState = !prev;
        const targetEl = videoRefs.current.get(video.id);
        if (targetEl) {
          if (nextState) targetEl.play().catch(() => {});
          else targetEl.pause();
        }
        return nextState;
      });
    } else {
      // Otherwise activate sound on this card immediately from beginning (00:00)
      playVideoFromBeginning(video.id);
    }
  };

  // Toggle audio mute on the active center card
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAudioMuted((prev) => {
      const nextMuted = !prev;
      if (activeAudioId) {
        const targetEl = videoRefs.current.get(activeAudioId);
        if (targetEl) {
          targetEl.muted = nextMuted;
          targetEl.volume = nextMuted ? 0 : 1;
        }
      }
      return nextMuted;
    });
  };

  // Toggle play/pause on the active center card
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying((prev) => {
      const nextState = !prev;
      if (activeAudioId) {
        const targetEl = videoRefs.current.get(activeAudioId);
        if (targetEl) {
          if (nextState) targetEl.play().catch(() => {});
          else targetEl.pause();
        }
      }
      return nextState;
    });
  };

  // Timeline Scrubber Seeking & Scrubbing Handlers (Strictly stop propagation to prevent carousel drag)
  const handleTimelinePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!activeAudioId) return;
    const targetEl = videoRefs.current.get(activeAudioId);
    if (!targetEl || !targetEl.duration) return;

    isScrubbingRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const ratio = clickX / rect.width;
    const newTime = ratio * targetEl.duration;
    targetEl.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleTimelinePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isScrubbingRef.current || !activeAudioId) return;
    e.stopPropagation();
    const targetEl = videoRefs.current.get(activeAudioId);
    if (!targetEl || !targetEl.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const ratio = clickX / rect.width;
    const newTime = ratio * targetEl.duration;
    targetEl.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleTimelinePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isScrubbingRef.current) {
      e.stopPropagation();
      isScrubbingRef.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  return (
    <section
      id="action"
      className="relative py-28 sm:py-36 md:py-44 bg-[#08090A] overflow-hidden select-none"
    >
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
        <ScrollReveal direction="up" delay={0.05} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-3 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-[#FF5E1E] uppercase font-bold">
                // 03.5 LIVE ACTION ARENA &bull; INFINITE LOOP
              </span>
            </div>

            {/* Headline with Athletic Gradient */}
            <h2 className="font-athletic italic uppercase font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-white leading-none">
              THE OLYMPIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E1E] via-[#FF7538] to-[#FFA034] text-glow-orange">ACTION</span> VAULT
            </h2>
            <p className="text-sm sm:text-base text-brand-text-secondary max-w-xl mt-3 font-normal">
              Continuous 360&deg; cylindrical video ring. Tap any card to bring it to center and play directly in place with sound.
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
        </ScrollReveal>

        {/* ========================================================================= */}
        {/* 3D CYLINDRICAL CURVED ACTION RING (INFINITE 360° LOOP ENGINE)              */}
        {/* ========================================================================= */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          className="relative w-full h-[540px] sm:h-[600px] md:h-[640px] flex items-center justify-center [perspective:1400px] overflow-hidden cursor-grab active:cursor-grabbing select-none"
          style={{ touchAction: 'pan-y' }}
        >
          {/* Edge Vignette Fades to make wrap-around perfectly seamless */}
          <div className="absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-[#08090A] to-transparent pointer-events-none z-30" />
          <div className="absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-[#08090A] to-transparent pointer-events-none z-30" />

          {/* Subtle 3D Ring Stage Illumination */}
          <div className="absolute inset-x-0 bottom-8 h-28 bg-gradient-to-t from-[#FF5E1E]/18 via-transparent to-transparent filter blur-2xl pointer-events-none" />

          {/* Cards Projection in Cylindrical Space with Circular Math */}
          <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
            {filteredVideos.map((video, idx) => {
              // Circular offset math: wraps start <-> end infinitely
              let offset = ((idx - displayPos) % totalVideos + totalVideos) % totalVideos;
              if (offset > totalVideos / 2) {
                offset -= totalVideos;
              }

              // Maximum visible angular offset on stage
              const maxVisibleOffset = Math.min(3.8, totalVideos / 2);
              if (Math.abs(offset) > maxVisibleOffset) return null;

              const cardSpacing = windowWidth < 640 ? 210 : 260;
              const rotateY = offset * 18;
              const translateZ = -Math.abs(offset) * 65;
              const translateX = offset * cardSpacing;
              const scale = Math.max(0.70, 1 - Math.abs(offset) * 0.08);

              // Smooth quadratic fade towards back of ring
              const distanceRatio = Math.abs(offset) / maxVisibleOffset;
              const opacity = Math.max(0, 1 - Math.pow(distanceRatio, 1.8) * 0.95);
              const zIndex = Math.round(50 - Math.abs(offset) * 10);
              const isCenter = Math.abs(offset) < 0.45;
              const isCenterActiveAudio = isCenter && activeAudioId === video.id;

              return (
                <div
                  key={video.id}
                  onClick={() => handleCardClick(video, idx)}
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    zIndex,
                    opacity,
                  }}
                  className={`absolute w-56 sm:w-64 md:w-72 aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden border bg-[#0D0F14] cursor-pointer group shadow-[0_25px_60px_rgba(0,0,0,0.9)] select-none will-change-transform transition-colors duration-300 ${
                    isCenterActiveAudio
                      ? 'border-[#FF5E1E] shadow-[0_0_50px_rgba(255,94,30,0.65),0_25px_70px_rgba(0,0,0,0.95)] ring-2 ring-[#FF5E1E]'
                      : isCenter
                      ? 'border-[#FF5E1E]/80 shadow-[0_0_35px_rgba(255,94,30,0.4),0_25px_70px_rgba(0,0,0,0.95)] ring-1 ring-[#FF5E1E]/40'
                      : 'border-white/15 hover:border-white/40'
                  }`}
                >
                  {/* In-Place Video Player */}
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current.set(video.id, el);
                      else videoRefs.current.delete(video.id);
                    }}
                    src={video.src}
                    loop
                    muted={activeAudioId !== video.id || isAudioMuted}
                    autoPlay
                    playsInline
                    onTimeUpdate={(e) => {
                      if (activeAudioId === video.id && !isScrubbingRef.current) {
                        setCurrentTime(e.currentTarget.currentTime);
                      }
                    }}
                    onLoadedMetadata={(e) => {
                      if (activeAudioId === video.id) {
                        setDuration(e.currentTarget.duration);
                      }
                    }}
                    className="w-full h-full object-cover object-center filter brightness-95 group-hover:brightness-105 transition-all duration-500"
                  />

                  {/* Top-To-Bottom Vignette Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/40 pointer-events-none" />

                  {/* Top Header Bar with Clean Tag & Sound Toggle (NO AUDIO LIVE text) */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                    {/* Clean Exercise Category Tag */}
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md text-[9px] font-mono tracking-wider font-bold uppercase shadow-sm transition-all duration-300 ${
                      isCenterActiveAudio
                        ? 'bg-black/80 border border-[#FF5E1E] text-white shadow-[0_0_12px_rgba(255,94,30,0.5)]'
                        : 'bg-black/70 border border-white/15 text-white/90'
                    }`}>
                      {isCenterActiveAudio && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] shadow-[0_0_6px_#FF5E1E] animate-pulse" />
                      )}
                      <span>{video.tag}</span>
                    </div>

                    {/* Mute/Unmute Quick Toggle Button on Center Card */}
                    {isCenter && (
                      <button
                        onClick={toggleMute}
                        aria-label={isAudioMuted ? 'Unmute video audio' : 'Mute video audio'}
                        className={`w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                          isCenterActiveAudio && !isAudioMuted
                            ? 'bg-[#FF5E1E] text-white shadow-[0_0_12px_rgba(255,94,30,0.8)] hover:scale-110 active:scale-95'
                            : 'bg-black/70 border border-white/20 text-white/80 hover:bg-[#FF5E1E] hover:text-white'
                        }`}
                      >
                        {isCenterActiveAudio && !isAudioMuted ? (
                          <Volume2 className="w-3.5 h-3.5" />
                        ) : (
                          <VolumeX className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Center Glowing In-Place Play/Pause Trigger */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    {isCenterActiveAudio ? (
                      // Currently playing in center with sound -> show pause trigger on hover / pause state
                      <button
                        onClick={togglePlay}
                        className={`pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center text-white bg-black/60 border border-[#FF5E1E] backdrop-blur-md shadow-[0_0_30px_rgba(255,94,30,0.8)] transition-all duration-300 hover:scale-110 active:scale-95 ${
                          isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100 bg-[#FF5E1E]'
                        }`}
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 fill-white text-white" />
                        ) : (
                          <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
                        )}
                      </button>
                    ) : isCenter ? (
                      // Center card not yet playing with sound -> clean glowing play trigger
                      <div className="w-14 h-14 rounded-full flex items-center justify-center text-white bg-[#FF5E1E] shadow-[0_0_35px_rgba(255,94,30,0.95)] group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-white translate-x-0.5" />
                      </div>
                    ) : (
                      // Side card -> compact play trigger
                      <div className="w-11 h-11 rounded-full flex items-center justify-center text-white bg-black/60 border border-white/20 scale-90 group-hover:scale-105 group-hover:bg-[#FF5E1E] transition-all">
                        <Play className="w-4 h-4 fill-white translate-x-0.5" />
                      </div>
                    )}
                  </div>

                  {/* Bottom Captions & Info */}
                  <div className={`absolute inset-x-4 pointer-events-none z-10 transition-all duration-300 ${
                    isCenterActiveAudio ? 'bottom-11' : 'bottom-4'
                  }`}>
                    <h3 className="font-athletic italic uppercase font-black text-base sm:text-lg text-white leading-tight drop-shadow-md">
                      {video.title}
                    </h3>
                    <p className="text-[11px] text-neutral-300 line-clamp-1 mt-0.5 leading-snug font-medium">
                      {video.subtitle}
                    </p>
                  </div>

                  {/* Customized Interactive Video Timeline Scrubber */}
                  {isCenterActiveAudio && (
                    <div
                      className="absolute bottom-2.5 inset-x-3.5 z-30 flex flex-col gap-1 pointer-events-auto select-none"
                      onClick={(e) => e.stopPropagation()}
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      {/* Scrubbing Track */}
                      <div
                        role="slider"
                        aria-label="Video timeline scrubber"
                        aria-valuemin={0}
                        aria-valuemax={duration || 100}
                        aria-valuenow={currentTime}
                        onPointerDown={handleTimelinePointerDown}
                        onPointerMove={handleTimelinePointerMove}
                        onPointerUp={handleTimelinePointerUp}
                        onPointerCancel={handleTimelinePointerUp}
                        className="group/timeline relative w-full h-3.5 flex items-center cursor-pointer touch-none"
                      >
                        {/* Background Track */}
                        <div className="w-full h-1 group-hover/timeline:h-1.5 bg-white/25 rounded-full overflow-hidden backdrop-blur-md transition-all">
                          {/* Filled Progress Bar */}
                          <div
                            className="h-full bg-gradient-to-r from-[#FF5E1E] via-[#FF7538] to-[#FFA034] rounded-full shadow-[0_0_8px_#FF5E1E]"
                            style={{
                              width: `${duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0}%`,
                            }}
                          />
                        </div>

                        {/* Scrubber Knob / Thumb */}
                        <div
                          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#FF5E1E] shadow-[0_0_10px_rgba(255,94,30,1)] opacity-90 group-hover/timeline:opacity-100 group-hover/timeline:scale-125 transition-transform pointer-events-none"
                          style={{
                            left: `${duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0}%`,
                          }}
                        />
                      </div>

                      {/* Time stamps */}
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold text-white/70 px-0.5 leading-none">
                        <span className="text-[#FFA034]">{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                  )}

                  {/* Glowing Orange Rim along Bottom Edge */}
                  <div className={`absolute bottom-0 inset-x-0 h-1 transition-opacity ${
                    isCenterActiveAudio
                      ? 'bg-gradient-to-r from-transparent via-[#FF5E1E] to-transparent opacity-100 shadow-[0_0_15px_#FF5E1E]'
                      : 'bg-gradient-to-r from-transparent via-[#FF5E1E] to-transparent opacity-60 group-hover:opacity-100'
                  }`} />
                </div>
              );
            })}
          </div>

          {/* Left Arrow Navigation Trigger (Infinite Loop) */}
          <button
            onClick={handlePrev}
            aria-label="Previous video in loop"
            className="absolute left-2 sm:left-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-[#FF5E1E] text-white border border-white/20 hover:border-[#FF5E1E] flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-xl"
          >
            <ChevronLeft className="w-6 h-6 -translate-x-0.5" />
          </button>

          {/* Right Arrow Navigation Trigger (Infinite Loop) */}
          <button
            onClick={handleNext}
            aria-label="Next video in loop"
            className="absolute right-2 sm:right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-[#FF5E1E] text-white border border-white/20 hover:border-[#FF5E1E] flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-xl"
          >
            <ChevronRight className="w-6 h-6 translate-x-0.5" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE HORIZONTAL SCRUBBER & INFINITE LOOP CONTROLS                  */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mt-8 px-4 max-w-5xl mx-auto">
          {/* Scroll & gesture hint */}
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-brand-text-muted uppercase">
            <span className="w-2 h-2 rounded-full bg-[#FF5E1E] animate-ping" />
            <span>INFINITE 360&deg; ARENA &bull; SCROLL TO EXPLORE &bull; SELECT TO PLAY LIVE</span>
          </div>

          {/* Interactive Scrub Track */}
          <div className="flex items-center gap-3 w-full sm:w-80">
            <span className="text-[11px] font-mono text-[#FF5E1E] font-bold">
              0{activeCenterIndex + 1}
            </span>
            <div
              className="relative flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden cursor-pointer backdrop-blur-md border border-white/10 hover:border-[#FF5E1E]/50 transition-colors"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                const targetIdx = Math.round(ratio * (totalVideos - 1));

                let diff = ((targetIdx - Math.round(currentPosRef.current)) % totalVideos + totalVideos) % totalVideos;
                if (diff > totalVideos / 2) diff -= totalVideos;
                targetPosRef.current += diff;
                startLoop();

                playVideoFromBeginning(filteredVideos[targetIdx].id);
              }}
            >
              <div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#FF5E1E] via-[#FF7538] to-[#FFA034] rounded-full shadow-[0_0_12px_rgba(255,94,30,0.8)]"
                style={{
                  width: `${Math.min(100, Math.max(10, ((activeCenterIndex + 1) / totalVideos) * 100))}%`,
                  transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>
            <span className="text-[11px] font-mono text-white/50 font-bold">
              0{totalVideos}
            </span>
          </div>

          {/* Pagination Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {filteredVideos.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  let diff = ((i - Math.round(currentPosRef.current)) % totalVideos + totalVideos) % totalVideos;
                  if (diff > totalVideos / 2) diff -= totalVideos;
                  targetPosRef.current += diff;
                  startLoop();

                  playVideoFromBeginning(filteredVideos[i].id);
                }}
                aria-label={`Jump to video ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeCenterIndex === i
                    ? 'w-7 bg-[#FF5E1E] shadow-[0_0_10px_#FF5E1E]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
