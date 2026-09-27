import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
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

/**
 * ThreeUI Glassmorphic Animated Top Dock — Command Bar Variant
 * Adapted specifically for SN Olympia Fitness Unisex Gym:
 *
 * 1. Frosted glass pill with dual-layer backdrop filter and ambient aurora glow.
 * 2. Left: Olympia brand insignia mark + wordmark.
 * 3. Center: Proximity-spring dock with items dynamically reacting to cursor coordinates.
 * 4. Active item highlighted with high-contrast gradient pill.
 * 5. Right: Phone hotline, electric orange gradient CTA button, and user profile trigger.
 * 6. Full accessibility with keyboard focus and mobile drawer fallback.
 */
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

  // Proximity dock tracking
  const dockTrackRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [itemInfluences, setItemInfluences] = useState<Record<string, number>>({});
  const springStates = useRef<Record<string, { value: number; velocity: number; target: number }>>({});
  const rafRef = useRef<number | null>(null);

  // Initialize spring states
  useEffect(() => {
    NAV_ITEMS.forEach((item) => {
      if (!springStates.current[item.id]) {
        springStates.current[item.id] = { value: 0, velocity: 0, target: 0 };
      }
    });
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
  const handleDockPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
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
      {/* Centered Floating Header Shell — Positioned higher up near top edge */}
      <header
        role="banner"
        className={`fixed top-1.5 sm:top-2.5 md:top-3 inset-x-0 z-[60] flex justify-center px-2 sm:px-4 md:px-6 pointer-events-none transition-all duration-300 ${
          isScrolled ? 'translate-y-0 scale-98 sm:scale-100' : 'translate-y-0'
        }`}
      >
        <div className="relative pointer-events-auto">
          {/* Ambient Aurora Glow Behind Dock (Enhanced Glass Refraction Backdrop) */}
          <div
            className="absolute -inset-x-8 -top-5 -bottom-5 pointer-events-none opacity-70 filter blur-2xl transition-opacity duration-500"
            style={{
              background: `
                radial-gradient(55% 75% at 20% 30%, rgba(255, 94, 30, 0.32), transparent 70%),
                radial-gradient(45% 65% at 80% 25%, rgba(255, 160, 52, 0.25), transparent 70%),
                radial-gradient(40% 50% at 50% 10%, rgba(255, 94, 30, 0.18), transparent 75%)
              `,
            }}
            aria-hidden="true"
          />

          {/* ========================================================================= */}
          {/* THREEUI ULTRA-LUXURY GLASSMORPHIC COMMAND BAR CONTAINER                    */}
          {/* ========================================================================= */}
          <div
            className="relative flex items-center justify-between gap-2 sm:gap-4 md:gap-5 lg:gap-8 h-13 sm:h-15 md:h-16 px-3.5 sm:px-4 md:px-5 rounded-full border border-white/[0.18] shadow-[0_24px_50px_-15px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_1px_rgba(255,255,255,0.06),0_0_35px_rgba(255,94,30,0.14)] transition-all duration-300 w-full max-w-[98vw] md:max-w-[96vw] lg:max-w-fit mx-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(20, 24, 33, 0.58) 0%, rgba(10, 12, 18, 0.68) 100%)',
              backdropFilter: 'blur(30px) saturate(190%) contrast(105%)',
              WebkitBackdropFilter: 'blur(30px) saturate(190%) contrast(105%)',
            }}
          >
            {/* 1. LEFT: OLYMPIA BRAND MARK & WORDMARK */}
            <a
              href="#overview"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#overview');
              }}
              className="flex items-center gap-2.5 group focus-visible:outline-none select-none pl-1 shrink-0"
            >
              {/* Circular Brand Mark Insignia — Official SN Emblem */}
              <SNOlympiaLogo variant="mark" className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11" glow={true} />

              {/* Wordmark (Matches official media_1790486436015.png) */}
              <div className="flex items-center tracking-normal">
                <span className="font-athletic font-black uppercase text-xs sm:text-sm md:text-[15px] tracking-wider text-white leading-none">
                  OLYMPIA
                </span>
                <span className="font-athletic italic font-black uppercase text-xs sm:text-sm md:text-[15px] tracking-wider text-[#FF5E1E] ml-1.5 leading-none">
                  GYM
                </span>
              </div>
            </a>

            {/* 2. CENTER: THREEUI PROXIMITY SPRING DOCK (DESKTOP & TABLET DYNAMIC) */}
            <nav
              ref={dockTrackRef}
              onPointerMove={handleDockPointerMove}
              onPointerLeave={handleDockPointerLeave}
              aria-label="Primary Navigation Dock"
              className="hidden md:flex items-center gap-0.5 sm:gap-1 lg:gap-1.5 p-1 sm:p-1.5 rounded-full bg-black/25 border border-white/[0.08] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)] backdrop-blur-md"
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
                    className={`relative flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 md:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full text-xs uppercase tracking-wider select-none outline-none transition-colors ${
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
                      className={`relative z-10 transition-colors shrink-0 ${
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
                      className={`relative z-10 text-[10px] md:text-[11px] lg:text-xs whitespace-nowrap transition-all ${
                        isActive ? 'font-black text-[#0A0B10]' : 'font-medium'
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* 3. RIGHT: CONTACT US DIALER CTA & PROFILE (ACTIONS) */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
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

              {/* Member Profile Avatar Circle */}
              <button
                onClick={() => handleLinkClick('#membership')}
                aria-label="Member Area & Profile"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-[#FF5E1E] text-white flex items-center justify-center border border-white/20 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,94,30,0.7)] transition-all shadow-sm active:scale-95 shrink-0"
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white" />
              </button>

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                aria-expanded={mobileMenuOpen}
                className="inline-flex md:hidden p-1.5 rounded-full bg-white/10 border border-white/15 text-white hover:bg-[#FF5E1E] transition-colors"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* FULLSCREEN GLASSMORPHIC MOBILE DRAWER                                     */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-[70] md:hidden bg-[#08090A]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 animate-fadeIn"
        >
          {/* Top Bar with Brand & Close */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-2.5">
              <SNOlympiaLogo variant="mark" className="w-9 h-9" glow={true} />
              <div className="flex items-center tracking-normal">
                <span className="font-athletic font-black uppercase text-base tracking-wider text-white">
                  OLYMPIA
                </span>
                <span className="font-athletic italic font-black uppercase text-base tracking-wider text-[#FF5E1E] ml-1.5">
                  GYM
                </span>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="p-2 rounded-full bg-white/10 text-white hover:bg-[#FF5E1E] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links List */}
          <ul className="space-y-4 my-auto py-6">
            {NAV_ITEMS.map((item, index) => {
              const isActive = currentActive === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleLinkClick(item.href)}
                    className={`w-full group flex items-center justify-between text-2xl font-athletic italic uppercase font-black transition-all text-left ${
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
                </li>
              );
            })}
          </ul>

          {/* Bottom Mobile Drawer Actions */}
          <div className="pt-4 border-t border-white/10">
            <a
              href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
              aria-label="Call Olympia Gym"
              className="w-full py-3.5 px-4 rounded-full bg-[#FF5E1E] text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,94,30,0.6)] active:scale-[0.98] transition-transform"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>CONTACT US NOW</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};
