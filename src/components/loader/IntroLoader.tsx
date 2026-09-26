import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Sparkles, Zap, Flame, ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface IntroLoaderProps {
  onComplete: () => void;
}

interface QuoteItem {
  id: number;
  text: string;
  author: string;
  category: string;
}

const FITNESS_QUOTES: QuoteItem[] = [
  {
    id: 1,
    text: "THE RESISTANCE THAT YOU FIGHT PHYSICALLY IN THE GYM AND THE RESISTANCE THAT YOU FIGHT IN LIFE CAN ONLY BUILD A STRONG CHARACTER.",
    author: "ARNOLD SCHWARZENEGGER",
    category: "CHAMPION MINDSET",
  },
  {
    id: 2,
    text: "EVERYBODY WANTS TO BE A BODYBUILDER, BUT NOBODY WANTS TO LIFT NO HEAVY-ASS WEIGHTS.",
    author: "RONNIE COLEMAN • 8X MR. OLYMPIA",
    category: "RAW INTENSITY",
  },
  {
    id: 3,
    text: "DISCIPLINE IS CHOOSING BETWEEN WHAT YOU WANT NOW AND WHAT YOU WANT MOST.",
    author: "THE IRON CODE",
    category: "RELENTLESS CONSISTENCY",
  },
  {
    id: 4,
    text: "FORGED IN CHALK AND HEAVY STEEL. WELCOME TO THE OLYMPIA ARENA.",
    author: "SN OLYMPIA FITNESS • YEMMIGANUR",
    category: "GROUND TRUTH",
  },
];

// Key image assets to preload during loading screen
const CRITICAL_PRELOAD_ASSETS = [
  '/assets/images/about/about-gym-atmosphere.jpg',
  '/assets/images/facilities/facility-free-weights.jpg',
  '/assets/images/programs/program-strength.jpg',
  '/assets/images/gallery/gallery-01.jpg',
  '/assets/images/gallery/gallery-02.jpg',
  '/assets/images/our-world/olympia-community-12.png',
  '/assets/images/our-world/olympia-community-15.png',
  '/assets/images/our-world/olympia-facility-02.jpg',
];

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const prefersReducedMotion = useReducedMotion();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [progress, setProgress] = useState(12);
  const [isExiting, setIsExiting] = useState(false);
  const [isReadyToComplete, setIsReadyToComplete] = useState(false);
  const assetsLoadedCount = useRef(0);
  const startTimeRef = useRef(Date.now());

  // 1. Motivational quote rotation:
  // Cycles every 3.8s in an engaging loop while loading assets on slow connections.
  // When loading finishes quickly, the user isn't held back and enters the site promptly.
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % FITNESS_QUOTES.length);
    }, 3800);

    return () => clearInterval(quoteInterval);
  }, []);

  // 2. Preload real assets and check document readiness:
  useEffect(() => {
    let isMounted = true;
    const totalAssets = CRITICAL_PRELOAD_ASSETS.length;

    const checkAllLoaded = () => {
      if (!isMounted) return;
      assetsLoadedCount.current += 1;
      if (assetsLoadedCount.current >= totalAssets) {
        setIsReadyToComplete(true);
      }
    };

    CRITICAL_PRELOAD_ASSETS.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;
    });

    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {}).catch(() => {});
    }

    // Safety timeout: if any network asset hangs or connection is slow,
    // guarantee release after 4.5 seconds maximum so the user is never stuck
    const safetyTimeout = setTimeout(() => {
      if (isMounted) setIsReadyToComplete(true);
    }, 4500);

    return () => {
      isMounted = false;
      clearTimeout(safetyTimeout);
    };
  }, []);

  // 3. Progressive Neon Bar Engine:
  // Climbs naturally during loading. Once assets are verified ready (with a subtle 1.4s minimum
  // aesthetic display to avoid a 50ms strobe on cached reloads), it surges to 100% and opens the site.
  useEffect(() => {
    const MIN_LOAD_DISPLAY_MS = 1400; // 1.4s tasteful minimum showcase

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const canFinish = isReadyToComplete && elapsed >= MIN_LOAD_DISPLAY_MS;

      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }

        if (canFinish) {
          // Rapid, satisfying surge to 100% once real assets are ready
          return Math.min(100, prev + 4.8);
        }

        // Natural easing progress while waiting for assets
        if (prev < 45) {
          return prev + 1.8;
        } else if (prev < 72) {
          return prev + 0.85;
        } else if (prev < 88) {
          return prev + 0.3;
        }
        return prev;
      });
    }, 30);

    return () => clearInterval(progressInterval);
  }, [isReadyToComplete]);

  // 4. When progress reaches 100%, trigger swift exit sequence
  useEffect(() => {
    if (progress >= 100 && !isExiting) {
      const exitTimer = setTimeout(() => {
        handleEnterSite();
      }, 300);

      return () => clearTimeout(exitTimer);
    }
  }, [progress, isExiting]);

  const handleEnterSite = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  // Keyboard shortcut listener (Space, Enter, Escape) for instant entry
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape') {
        handleEnterSite();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeQuote = FITNESS_QUOTES[currentQuoteIndex];

  // Dynamic telemetry status text according to progress
  const telemetryStatus = useMemo(() => {
    if (progress < 25) return 'INITIALIZING CORE ENGINE & VOLUMETRIC ASSETS...';
    if (progress < 55) return 'LOADING 3D VIDEO ARENA & LIVE REEL ARCHIVE...';
    if (progress < 85) return 'CALIBRATING OUR WORLD 3D PERSPECTIVE CANVAS...';
    if (progress < 100) return 'WARMING UP RAW IRON ARENA & AUDIO MATRIX...';
    return 'IRON ARENA READY. WELCOME TO OLYMPIA.';
  }, [progress]);

  // 12 subtle floating atmospheric embers
  const embers = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: `${(i * 7.5 + 4) % 96}%`,
        size: (i % 3) + 2,
        duration: 4.5 + (i % 4) * 1.2,
        delay: (i % 5) * 0.7,
      })),
    []
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Loading SN Olympia Fitness Experience"
      onClick={handleEnterSite}
      className={`fixed inset-0 z-[100] flex flex-col justify-between items-center bg-[#07080A] text-white px-4 sm:px-8 py-5 sm:py-8 select-none overflow-hidden cursor-pointer transition-all duration-700 ${
        isExiting
          ? 'opacity-0 scale-105 pointer-events-none filter blur-sm'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* 1. ATMOSPHERIC NEON GLOWS & BACKGROUND GRID */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central Volt & Ember Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-tr from-[#FF5E1E]/15 via-[#FFA034]/10 to-transparent filter blur-[140px]" />
        
        {/* Top & Bottom Deep Radial Flares */}
        <div className="absolute -top-32 left-1/4 w-[450px] h-[450px] rounded-full bg-[#FF5E1E]/12 filter blur-[130px]" />
        <div className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-volt/10 filter blur-[140px]" />

        {/* Ambient Matrix Dot Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />

        {/* Floating Chalk & Ember Sparks */}
        {!prefersReducedMotion &&
          embers.map((ember) => (
            <motion.div
              key={ember.id}
              className="absolute rounded-full bg-[#FFA034] shadow-[0_0_8px_#FF5E1E]"
              style={{
                left: ember.left,
                bottom: '-20px',
                width: ember.size,
                height: ember.size,
              }}
              animate={{
                y: [0, -window.innerHeight * 1.1],
                opacity: [0, 0.8, 0.8, 0],
                x: [0, (ember.id % 2 === 0 ? 30 : -30)],
              }}
              transition={{
                duration: ember.duration,
                repeat: Infinity,
                delay: ember.delay,
                ease: 'linear',
              }}
            />
          ))}
      </div>

      {/* 2. TOP HEADER: OLYMPIA BRAND BADGE & SPINNING ORBIT RING */}
      <header className="relative z-10 shrink-0 flex flex-col items-center gap-2 mb-2 sm:mb-4">
        <div className="relative flex items-center justify-center">
          {/* Outer Rotating Dashed Neon Orbit Ring */}
          <div className="absolute -inset-2.5 rounded-full border border-dashed border-[#FF5E1E]/40 animate-spin [animation-duration:14s] pointer-events-none" />

          {/* Glowing Crest Pill */}
          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#2A2E3B] to-[#12141A] border border-white/20 flex items-center justify-center shadow-[0_0_25px_rgba(255,94,30,0.5)]">
            <Dumbbell className="w-5 h-5 sm:w-7 sm:h-7 text-[#FF5E1E] animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-1.5">
            <span className="font-athletic italic uppercase font-black text-sm sm:text-base tracking-wider text-white">
              OLYMPIA <span className="text-[#FF5E1E]">GYM</span>
            </span>
          </div>
          <span className="text-[9px] font-mono tracking-[0.25em] text-brand-text-muted uppercase font-bold">
            YEMMIGANUR • UNISEX FITNESS
          </span>
        </div>
      </header>

      {/* 3. CENTER: SCREEN-OCCUPYING ICONIC FITNESS QUOTATIONS */}
      <main className="relative z-10 w-full max-w-4xl mx-auto flex-1 min-h-0 flex flex-col items-center justify-center px-2 sm:px-4 text-center my-0 py-2 sm:py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeQuote.id}
            initial={{ opacity: 0, y: 12, filter: 'blur(8px)', scale: 0.98 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, y: -10, filter: 'blur(8px)', scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center space-y-3 sm:space-y-5"
          >
            {/* Category Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-[#FF5E1E]/30 backdrop-blur-md shadow-sm shrink-0">
              <Flame className="w-3.5 h-3.5 text-[#FF5E1E] animate-bounce" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] text-[#FF5E1E] uppercase">
                {activeQuote.category}
              </span>
            </div>

            {/* Quote Typography (Occupies Screen) */}
            <div className="relative">
              {/* Massive Decorative Background Quotation Marks */}
              <span className="absolute -top-7 -left-3 sm:-left-8 text-5xl sm:text-8xl font-serif text-white/5 select-none pointer-events-none">
                “
              </span>

              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-snug sm:leading-tight max-w-3xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] px-2">
                {activeQuote.text}
              </h2>

              <span className="absolute -bottom-10 -right-3 sm:-right-8 text-5xl sm:text-8xl font-serif text-white/5 select-none pointer-events-none">
                ”
              </span>
            </div>

            {/* Author Attribution */}
            <div className="flex items-center gap-2 pt-1">
              <span className="w-6 h-px bg-gradient-to-r from-transparent to-[#FF5E1E]" />
              <p className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#FFA034] uppercase">
                {activeQuote.author}
              </p>
              <span className="w-6 h-px bg-gradient-to-l from-transparent to-[#FF5E1E]" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Quote Index Dot Indicators */}
        <div className="flex items-center gap-2 mt-4 sm:mt-6 shrink-0">
          {FITNESS_QUOTES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentQuoteIndex(idx);
              }}
              aria-label={`View quote ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentQuoteIndex === idx
                  ? 'w-8 bg-gradient-to-r from-[#FF5E1E] to-[#FFA034] shadow-[0_0_10px_#FF5E1E]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </main>

      {/* 4. BOTTOM: NEON PROGRESSIVE BAR & LIVE TELEMETRY READOUT */}
      <footer className="relative z-10 shrink-0 w-full max-w-xl mx-auto flex flex-col items-center space-y-3 sm:space-y-4 mt-2 sm:mt-4">
        {/* Telemetry Status & Live Percentage */}
        <div className="w-full flex items-center justify-between text-xs font-mono font-bold">
          <div className="flex items-center gap-2 text-brand-text-muted truncate pr-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5E1E] animate-ping shrink-0" />
            <span className="truncate tracking-wider text-[10px] sm:text-xs text-neutral-300">
              {telemetryStatus}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0 font-mono text-[#FF5E1E] text-xs sm:text-sm tracking-widest font-black shadow-[0_0_12px_rgba(255,94,30,0.5)]">
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* NEON PROGRESSIVE BAR CONTAINER */}
        <div className="relative w-full h-2.5 sm:h-3 rounded-full bg-white/[0.05] border border-white/10 p-0.5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8),0_0_20px_rgba(255,94,30,0.15)] overflow-visible">
          {/* Active Glowing Neon Fill */}
          <div
            className="relative h-full rounded-full transition-all duration-75 ease-out shadow-[0_0_18px_#FF5E1E,0_0_36px_rgba(255,160,52,0.7)]"
            style={{
              width: `${Math.max(2, Math.min(100, progress))}%`,
              background: 'linear-gradient(90deg, #FF3D00 0%, #FF5E1E 45%, #FFA034 80%, #FFE169 100%)',
            }}
          >
            {/* White-Hot Laser Tip Spark at Bar Head */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#ffffff,0_0_24px_#FF5E1E,0_0_36px_#FFA034] pointer-events-none" />
          </div>
        </div>

        {/* Instant Skip / Enter Prompt */}
        <div className="pt-2 flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-brand-text-muted/70 hover:text-white uppercase transition-colors">
          <span>[ CLICK ANYWHERE OR PRESS SPACE TO ENTER ]</span>
          <ArrowUpRight className="w-3 h-3 text-[#FF5E1E]" />
        </div>
      </footer>
    </div>
  );
};
export default IntroLoader;
