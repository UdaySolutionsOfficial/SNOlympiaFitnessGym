import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONTENT } from '../../data/siteContent';
import {
  Phone,
  ArrowUpRight,
  Menu,
  X,
  Dumbbell,
  User,
  Home,
  Layers,
  Award,
  Info,
  Send,
  Zap,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { SNOlympiaLogo } from '../common/SNOlympiaLogo';

export interface TopDockProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
}

interface NavItemConfig {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: readonly NavItemConfig[] = [
  {
    id: 'overview',
    label: 'Home',
    href: '#overview',
    icon: <Home className="w-3.5 h-3.5" />,
  },
  {
    id: 'about',
    label: 'About',
    href: '#about',
    icon: <Info className="w-3.5 h-3.5" />,
  },
  {
    id: 'programs',
    label: 'Programs',
    href: '#programs',
    icon: <Layers className="w-3.5 h-3.5" />,
  },
  {
    id: 'action',
    label: 'Action',
    href: '#action',
    icon: <Zap className="w-3.5 h-3.5" />,
  },
  {
    id: 'facilities',
    label: 'Facilities',
    href: '#facilities',
    icon: <Dumbbell className="w-3.5 h-3.5" />,
  },
  {
    id: 'membership',
    label: 'Membership',
    href: '#membership',
    icon: <Award className="w-3.5 h-3.5" />,
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '#contact',
    icon: <Send className="w-3.5 h-3.5" />,
  },
];

interface AnimatedBurgerIconProps {
  isOpen: boolean;
}

/**
 * AnimatedBurgerIcon
 * Elastic morphing hamburger icon inspired by Gaetan Gonzalez's Lottie burger menu.
 * - In closed state: 3 sleek parallel lines with center volt-orange accent and glowing ends.
 * - In open state: Top and bottom lines spring-rotate into a crisp 45deg 'X' with center alignment,
 *   while the middle bar scales and slides out smoothly with opacity fade.
 */
const AnimatedBurgerIcon: React.FC<AnimatedBurgerIconProps> = ({ isOpen }) => {
  return (
    <div className="relative w-5 h-4 flex flex-col justify-between items-center pointer-events-none select-none" aria-hidden="true">
      {/* Top Bar */}
      <motion.span
        initial={false}
        animate={
          isOpen
            ? { rotate: 45, y: 7, backgroundColor: '#FF5E1E' }
            : { rotate: 0, y: 0, backgroundColor: '#FFFFFF' }
        }
        transition={{ type: 'spring', stiffness: 360, damping: 24 }}
        className="w-full h-[2px] rounded-full origin-center shadow-[0_0_8px_rgba(255,94,30,0.6)] block"
      />
      {/* Middle Bar */}
      <motion.span
        initial={false}
        animate={
          isOpen
            ? { opacity: 0, scaleX: 0, x: 12 }
            : { opacity: 1, scaleX: 1, x: 0, backgroundColor: '#FF5E1E' }
        }
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="w-full h-[2px] rounded-full origin-left shadow-[0_0_10px_rgba(255,94,30,0.85)] block"
      />
      {/* Bottom Bar */}
      <motion.span
        initial={false}
        animate={
          isOpen
            ? { rotate: -45, y: -7, backgroundColor: '#FF5E1E' }
            : { rotate: 0, y: 0, backgroundColor: '#FF7538' }
        }
        transition={{ type: 'spring', stiffness: 360, damping: 24 }}
        className="w-full h-[2px] rounded-full origin-center shadow-[0_0_8px_rgba(255,94,30,0.6)] block"
      />
    </div>
  );
};

export const TopDock: React.FC<TopDockProps> = ({
  activeSection = 'overview',
  onNavigate,
}) => {
  const [currentActive, setCurrentActive] = useState(activeSection);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Sync internal active tab state with activeSection prop
  useEffect(() => {
    setCurrentActive(activeSection);
  }, [activeSection]);

  // Proximity dock tracking & horizontal scroll management
  const dockTrackRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [itemInfluences, setItemInfluences] = useState<Record<string, number>>({});
  const springStates = useRef<Record<string, { value: number; velocity: number; target: number }>>({});
  const rafRef = useRef<number | null>(null);

  // Tablet horizontal scroll cue tracking
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkNavScroll = useCallback(() => {
    const el = dockTrackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  useEffect(() => {
    const el = dockTrackRef.current;
    if (!el) return;
    checkNavScroll();
    el.addEventListener('scroll', checkNavScroll, { passive: true });
    window.addEventListener('resize', checkNavScroll, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        checkNavScroll();
      });
      resizeObserver.observe(el);
      if (el.parentElement) {
        resizeObserver.observe(el.parentElement);
      }
    }

    return () => {
      el.removeEventListener('scroll', checkNavScroll);
      window.removeEventListener('resize', checkNavScroll);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [checkNavScroll]);

  // Translate vertical wheel scroll to horizontal scroll when hovering over the scrollable nav
  useEffect(() => {
    const navEl = dockTrackRef.current;
    if (!navEl) return;

    const handleWheel = (e: WheelEvent) => {
      if (navEl.scrollWidth > navEl.clientWidth) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          navEl.scrollLeft += e.deltaY;
          e.preventDefault();
        }
      }
    };

    navEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => navEl.removeEventListener('wheel', handleWheel);
  }, []);

  // Auto-scroll active section into center of horizontal view
  useEffect(() => {
    const activeBtn = itemRefs.current.get(currentActive);
    const navEl = dockTrackRef.current;
    if (activeBtn && navEl && navEl.scrollWidth > navEl.clientWidth) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
    checkNavScroll();
  }, [currentActive, checkNavScroll]);

  // Initialize spring states
  useEffect(() => {
    NAV_ITEMS.forEach((item) => {
      if (!springStates.current[item.id]) {
        springStates.current[item.id] = { value: 0, velocity: 0, target: 0 };
      }
    });
  }, []);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll detection & website scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY =
        window.pageYOffset ||
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      setIsScrolled(scrollY > 25);

      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
      const winHeight = window.innerHeight || document.documentElement.clientHeight || 800;
      const maxScroll = docHeight - winHeight;

      if (maxScroll > 10) {
        const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Spring animation loop for dock items
  const updateSprings = useCallback(() => {
    let isMoving = false;
    const newInfluences: Record<string, number> = {};
    const springK = 0.19;
    const damping = 0.7;

    NAV_ITEMS.forEach((item) => {
      const state = springStates.current[item.id];
      if (!state) return;

      const delta = state.target - state.value;
      state.velocity += delta * springK;
      state.velocity *= damping;
      state.value += state.velocity;

      if (Math.abs(delta) < 0.001 && Math.abs(state.velocity) < 0.001) {
        state.value = state.target;
        state.velocity = 0;
      } else {
        isMoving = true;
      }

      newInfluences[item.id] = Math.max(0, Math.min(1.05, state.value));
    });

    setItemInfluences({ ...newInfluences });

    if (isMoving) {
      rafRef.current = requestAnimationFrame(updateSprings);
    } else {
      rafRef.current = null;
    }
  }, []);

  const triggerSpringLoop = useCallback(() => {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(updateSprings);
    }
  }, [updateSprings]);

  // Handle pointer movement across proximity dock
  const handleDockPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || window.innerWidth < 768) return;
    const pointerX = e.clientX;
    const proximityRadius = 115; // px

    NAV_ITEMS.forEach((item) => {
      const el = itemRefs.current.get(item.id);
      const state = springStates.current[item.id];
      if (!el || !state) return;

      const rect = el.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const distance = Math.abs(pointerX - itemCenterX);

      const proximity = Math.max(0, Math.min(1, 1 - distance / proximityRadius));
      // Smoothstep curve for natural proximity falloff
      const influence = proximity * proximity * (3 - 2 * proximity);
      state.target = influence;
    });

    triggerSpringLoop();
  };

  const handleDockPointerLeave = () => {
    NAV_ITEMS.forEach((item) => {
      const state = springStates.current[item.id];
      if (state) state.target = 0;
    });
    triggerSpringLoop();
  };

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.startsWith('#') ? href.slice(1) : href;
    setCurrentActive(targetId);

    // Auto-scroll the clicked tab into view within the horizontal dock
    const btn = itemRefs.current.get(targetId);
    const navEl = dockTrackRef.current;
    if (btn && navEl && navEl.scrollWidth > navEl.clientWidth) {
      btn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }

    if (onNavigate) {
      onNavigate(targetId);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* 0. Website Global Scroll Progress Bar at Top of Viewport */}
      <div
        className="fixed top-0 inset-x-0 h-[3.5px] sm:h-1 z-[120] pointer-events-none bg-black/60 overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Website scroll progress"
      >
        <div
          className="h-full bg-gradient-to-r from-[#FF5E1E] via-[#FF7A18] to-[#FFA034] shadow-[0_0_14px_rgba(255,94,30,1),0_0_28px_rgba(255,160,52,0.8)] origin-left transition-all duration-150 ease-out relative"
          style={{ width: `${scrollProgress * 100}%` }}
        >
          {/* Glowing Leading Flare Particle */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#FF5E1E,0_0_24px_#FFA034] animate-pulse" />
        </div>
      </div>

      {/* Centered Floating Header Shell — Positioned gracefully with gentle spacing */}
      <header
        role="banner"
        className={`fixed top-2.5 sm:top-3 md:top-3 inset-x-0 z-[60] flex justify-center px-3 sm:px-4 md:px-5 lg:px-6 pointer-events-none transition-all duration-300 ${
          isScrolled ? 'translate-y-0 scale-98 sm:scale-100' : 'translate-y-0'
        }`}
      >
        <div className="relative pointer-events-auto w-full max-w-[calc(100vw-24px)] sm:max-w-[calc(100vw-32px)] md:max-w-4xl xl:max-w-fit xl:w-auto">
          {/* Ambient Aurora Glow Behind Dock */}
          <div
            className="absolute -inset-x-4 -top-3 -bottom-3 pointer-events-none opacity-60 filter blur-2xl transition-opacity duration-500"
            style={{
              background: `
                radial-gradient(55% 75% at 20% 30%, rgba(255, 94, 30, 0.28), transparent 70%),
                radial-gradient(45% 65% at 80% 25%, rgba(255, 160, 52, 0.22), transparent 70%)
              `,
            }}
            aria-hidden="true"
          />

          {/* ========================================================================= */}
          {/* THREEUI ULTRA-LUXURY GLASSMORPHIC COMMAND BAR CONTAINER                    */}
          {/* ========================================================================= */}
          <div
            className="relative flex items-center justify-between gap-2 sm:gap-3 md:gap-3 lg:gap-4 xl:gap-8 h-[60px] sm:h-[62px] md:h-16 px-3.5 sm:px-4 md:px-4 lg:px-4.5 xl:px-6 rounded-2xl md:rounded-full border border-white/[0.18] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_1px_rgba(255,255,255,0.06),0_0_25px_rgba(255,94,30,0.12)] transition-all duration-300 w-full max-w-full xl:w-auto xl:max-w-fit mx-auto overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(20, 24, 33, 0.78) 0%, rgba(10, 12, 18, 0.88) 100%)',
              backdropFilter: 'blur(30px) saturate(190%) contrast(105%)',
              WebkitBackdropFilter: 'blur(30px) saturate(190%) contrast(105%)',
            }}
          >
            {/* Synchronized Micro Scroll Progress Rail on Top Edge of Dock */}
            <div
              className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#FF5E1E] via-[#FF7A18] to-[#FFA034] shadow-[0_0_10px_#FF5E1E] transition-all duration-150 ease-out origin-left pointer-events-none z-30"
              style={{ width: `${scrollProgress * 100}%` }}
            />
            {/* 1. LEFT: OLYMPIA BRAND MARK & WORDMARK */}
            <a
              href="#overview"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#overview');
              }}
              className="flex items-center gap-2 sm:gap-2.5 md:gap-2 lg:gap-3 group focus-visible:outline-none select-none pl-1 shrink-0"
            >
              {/* Official Transparent SN Logo Icon — Pure Floating Monogram */}
              <SNOlympiaLogo className="w-9 h-9 sm:w-10 sm:h-10 md:w-9 md:h-9 lg:w-11 lg:h-11 shrink-0 group-hover:scale-105 transition-transform" priority />

              {/* Wordmark (Clean & Vertically Centered) */}
              <div className="flex items-center">
                <span className="font-athletic italic uppercase font-black text-sm sm:text-base md:text-sm lg:text-base xl:text-lg tracking-tight text-white leading-none whitespace-nowrap">
                  OLYMPIA <span className="text-[#FF5E1E]">GYM</span>
                </span>
              </div>
            </a>

            {/* 2. CENTER: THREEUI PROXIMITY SPRING DOCK (DYNAMIC HORIZONTAL SCROLL) */}
            <div className="relative hidden md:flex flex-1 min-w-0 items-center overflow-hidden max-w-full justify-center">
              {/* Left Scroll Cue & Interactive Chevron */}
              <div
                className={`absolute left-0 top-0 bottom-0 z-20 flex items-center pr-3 bg-gradient-to-r from-[#0C0E14] via-[#0C0E14]/90 to-transparent transition-opacity duration-200 ${
                  canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              >
                <button
                  type="button"
                  aria-label="Scroll tabs left"
                  onClick={() => {
                    if (dockTrackRef.current) {
                      dockTrackRef.current.scrollBy({ left: -160, behavior: 'smooth' });
                    }
                  }}
                  className="w-5 h-5 rounded-full bg-[#1C202A]/90 hover:bg-[#FF5E1E] text-white/80 hover:text-white flex items-center justify-center border border-white/20 shadow-md transition-all active:scale-90 ml-0.5 cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 stroke-[3]" />
                </button>
              </div>

              {/* Scrollable Track Container */}
              <nav
                ref={dockTrackRef}
                onPointerMove={handleDockPointerMove}
                onPointerLeave={handleDockPointerLeave}
                aria-label="Primary Navigation Dock"
                className="flex flex-1 min-w-0 items-center justify-start xl:justify-center gap-1 md:gap-1 lg:gap-1.5 p-1 md:p-1 lg:p-1.5 rounded-full bg-black/25 border border-white/[0.08] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)] backdrop-blur-md overflow-x-auto no-scrollbar scroll-smooth overscroll-contain select-none w-full xl:w-auto"
                style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
              >
                {NAV_ITEMS.map((item) => {
                  const isActive = currentActive === item.id;
                  const influence = itemInfluences[item.id] || 0;
                  const scale = 1 + influence * 0.08;
                  const translateY = -influence * 2;

                  return (
                    <button
                      key={item.id}
                      ref={(el) => {
                        if (el) itemRefs.current.set(item.id, el);
                        else itemRefs.current.delete(item.id);
                      }}
                      type="button"
                      onClick={() => handleLinkClick(item.href)}
                      style={{
                        transform: !prefersReducedMotion
                          ? `translateY(${translateY}px) scale(${scale})`
                          : undefined,
                        transition: 'color 0.16s, border-color 0.18s',
                      }}
                      className={`relative flex items-center shrink-0 gap-1 md:gap-1 lg:gap-1.5 px-3 md:px-2.5 lg:px-4 py-1.5 md:py-1.5 lg:py-2 rounded-full uppercase tracking-wider md:tracking-normal lg:tracking-wider select-none outline-none transition-colors whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'text-[#0A0B10]'
                          : influence > 0.08
                          ? 'text-white bg-white/10 border border-white/15 shadow-sm'
                          : 'text-neutral-400 hover:text-white bg-transparent border border-transparent'
                      }`}
                    >
                      {/* Animated Smooth Sliding White Active Pill (Framer Motion spring layout) */}
                      {isActive && (
                        <motion.div
                          layoutId="activeDockPill"
                          transition={{
                            type: 'spring',
                            stiffness: 280,
                            damping: 26,
                            mass: 0.6,
                          }}
                          className="absolute inset-0 rounded-full bg-gradient-to-b from-white via-[#F8FAFC] to-[#EDF2F7] shadow-[0_4px_22px_rgba(255,94,30,0.5),0_0_12px_rgba(255,255,255,0.7)] z-0"
                        />
                      )}

                      <span
                        className={`relative z-10 transition-colors shrink-0 [&>svg]:w-3 md:[&>svg]:w-3.5 lg:[&>svg]:w-3.5 ${
                          isActive
                            ? 'text-[#FF5E1E]'
                            : influence > 0.08
                            ? 'text-[#FF5E1E]'
                            : 'text-neutral-400'
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`relative z-10 text-[11px] md:text-[11.5px] lg:text-xs whitespace-nowrap transition-all ${
                          isActive ? 'font-black text-[#0A0B10]' : 'font-medium'
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Right Scroll Cue & Interactive Chevron */}
              <div
                className={`absolute right-0 top-0 bottom-0 z-20 flex items-center pl-3 bg-gradient-to-l from-[#0C0E14] via-[#0C0E14]/90 to-transparent transition-opacity duration-200 ${
                  canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              >
                <button
                  type="button"
                  aria-label="Scroll tabs right"
                  onClick={() => {
                    if (dockTrackRef.current) {
                      dockTrackRef.current.scrollBy({ left: 160, behavior: 'smooth' });
                    }
                  }}
                  className="w-5 h-5 rounded-full bg-[#1C202A]/90 hover:bg-[#FF5E1E] text-white/80 hover:text-white flex items-center justify-center border border-white/20 shadow-md transition-all active:scale-90 mr-0.5 cursor-pointer"
                >
                  <ChevronRight className="w-3 h-3 stroke-[3]" />
                </button>
              </div>
            </div>

            {/* 3. RIGHT: CONTACT US DIALER CTA & PROFILE (DESKTOP ONLY >= xl) */}
            <div className="hidden xl:flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* High-Energy Electric Orange Gradient Phone Dialer CTA Button */}
              <a
                href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
                aria-label="Call Olympia Gym"
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 rounded-full text-white font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-[0_10px_26px_-10px_rgba(255,94,30,0.95)] hover:shadow-[0_12px_32px_-8px_rgba(255,94,30,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer border border-white/20 select-none whitespace-nowrap"
                style={{
                  background: 'linear-gradient(180deg, #FF5E1E 0%, #E0480C 100%)',
                }}
              >
                <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white shrink-0 fill-current" />
                <span>Contact us</span>
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/90 stroke-[2.5]" />
              </a>

              {/* Member Profile Avatar Circle (Desktop only >= xl) */}
              <button
                onClick={() => handleLinkClick('#membership')}
                aria-label="Member Area & Profile"
                className="flex w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF5E1E] text-white items-center justify-center border border-white/20 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,94,30,0.7)] transition-all shadow-sm active:scale-95 shrink-0"
              >
                <User className="w-4 h-4 fill-white text-white" />
              </button>
            </div>

            {/* Mobile Hamburger Toggle Button (Animated Morphing Burger Icon) */}
            <motion.button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open mobile navigation menu'}
              aria-expanded={mobileMenuOpen}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              className={`inline-flex md:hidden items-center justify-center p-2.5 rounded-xl border transition-all duration-300 mr-1 sm:mr-1.5 shrink-0 ${
                mobileMenuOpen
                  ? 'bg-[#FF5E1E]/20 border-[#FF5E1E]/60 shadow-[0_0_20px_rgba(255,94,30,0.4)]'
                  : 'bg-white/10 hover:bg-[#FF5E1E]/20 border-white/15 hover:border-[#FF5E1E]/40 text-white'
              }`}
            >
              <AnimatedBurgerIcon isOpen={mobileMenuOpen} />
            </motion.button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* FULLSCREEN GLASSMORPHIC MOBILE DRAWER (ANIMATED ARRIVAL & DEPARTURE)      */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobileDrawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="fixed inset-0 z-[70] md:hidden bg-[#08090A]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8"
          >
            {/* Top Bar with Brand & Morphing Close Button */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex items-center justify-between border-b border-white/10 pb-5"
            >
              <div className="flex items-center gap-2.5">
                <SNOlympiaLogo className="w-8 h-8 shrink-0" />
                <span className="font-athletic italic uppercase font-black text-white text-base tracking-tight">
                  OLYMPIA <span className="text-[#FF5E1E]">GYM</span>
                </span>
              </div>

              <motion.button
                type="button"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-[#FF5E1E]/20 border border-white/15 hover:border-[#FF5E1E]/40 text-white transition-all shadow-md cursor-pointer"
              >
                <AnimatedBurgerIcon isOpen={true} />
              </motion.button>
            </motion.div>

            {/* Nav Links List with Smooth Arrival (Right-to-Left) & Departure (Left-to-Right) */}
            <ul className="space-y-4 my-auto py-6 overflow-hidden">
              {NAV_ITEMS.map((item, index) => {
                const isActive = currentActive === item.id;
                const xOffset = prefersReducedMotion ? 0 : 80;

                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: xOffset }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.38,
                        delay: 0.08 + index * 0.045,
                        ease: [0.22, 1, 0.36, 1], // Smooth arrival curve from right to left
                      },
                    }}
                    exit={{
                      opacity: 0,
                      x: xOffset, // Smooth departure curve from left to right
                      transition: {
                        duration: 0.22,
                        delay: (NAV_ITEMS.length - 1 - index) * 0.025,
                        ease: [0.4, 0, 0.2, 1],
                      },
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleLinkClick(item.href)}
                      className={`w-full group flex items-center justify-between text-2xl font-athletic italic uppercase font-black transition-all text-left cursor-pointer ${
                        isActive
                          ? 'text-[#FF5E1E] translate-x-1'
                          : 'text-white hover:text-[#FF5E1E]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`${
                            isActive
                              ? 'text-[#FF5E1E] opacity-100'
                              : 'text-[#FF5E1E] opacity-70 group-hover:opacity-100'
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[#FF5E1E] shadow-[0_0_8px_#FF5E1E] ml-1 animate-pulse" />
                        )}
                      </div>
                      <span
                        className={`text-xs font-mono transition-colors ${
                          isActive ? 'text-[#FF5E1E]' : 'text-brand-text-muted group-hover:text-[#FF5E1E]'
                        }`}
                      >
                        0{index + 1}
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>

            {/* Bottom Mobile Drawer Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
              transition={{ duration: 0.35, delay: 0.38, ease: 'easeOut' }}
              className="pt-4 border-t border-white/10"
            >
              <a
                href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
                aria-label="Call Olympia Gym"
                className="w-full py-3.5 px-4 rounded-full bg-[#FF5E1E] text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,94,30,0.6)] active:scale-[0.98] transition-transform cursor-pointer"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>CONTACT US NOW</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
