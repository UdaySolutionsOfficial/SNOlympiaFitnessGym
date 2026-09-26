import React, { useState, useEffect, useRef, useCallback } from 'react';
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
} from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

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
    id: 'programs',
    label: 'Programs',
    href: '#programs',
    icon: <Layers className="w-3.5 h-3.5" />,
  },
  {
    id: 'membership',
    label: 'Membership',
    href: '#membership',
    icon: <Award className="w-3.5 h-3.5" />,
  },
  {
    id: 'facilities',
    label: 'About',
    href: '#facilities',
    icon: <Info className="w-3.5 h-3.5" />,
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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
    const targetId = href.replace('#', '');
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
      {/* Centered Floating Header Shell */}
      <header
        role="banner"
        className={`fixed top-3 sm:top-5 inset-x-0 z-[60] flex justify-center px-3 sm:px-6 pointer-events-none transition-all duration-300 ${
          isScrolled ? 'translate-y-0 scale-98 sm:scale-100' : 'translate-y-0'
        }`}
      >
        <div className="relative pointer-events-auto">
          {/* Ambient Aurora Glow Behind Dock (ThreeUI signature) */}
          <div
            className="absolute -inset-x-8 -top-6 -bottom-6 pointer-events-none opacity-60 filter blur-xl transition-opacity duration-500"
            style={{
              background: `
                radial-gradient(45% 65% at 20% 40%, rgba(255, 94, 30, 0.28), transparent 70%),
                radial-gradient(40% 60% at 80% 30%, rgba(255, 160, 52, 0.22), transparent 70%),
                radial-gradient(35% 50% at 50% 10%, rgba(255, 94, 30, 0.15), transparent 75%)
              `,
            }}
            aria-hidden="true"
          />

          {/* ========================================================================= */}
          {/* THREEUI MODERN COMMAND BAR CONTAINER                                      */}
          {/* ========================================================================= */}
          <div
            className="relative flex items-center justify-between gap-3 sm:gap-6 lg:gap-8 h-12 sm:h-14 px-3 sm:px-4 rounded-full border border-white/10 shadow-[0_22px_52px_-20px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.12),0_0_35px_rgba(255,94,30,0.1)] transition-all duration-300"
            style={{
              background: 'linear-gradient(180deg, rgba(22, 25, 34, 0.88), rgba(12, 14, 20, 0.84))',
              backdropFilter: 'blur(24px) saturate(160%)',
              WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            }}
          >
            {/* 1. LEFT: OLYMPIA BRAND MARK & WORDMARK */}
            <a
              href="#overview"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#overview');
              }}
              className="flex items-center gap-2.5 group focus-visible:outline-none select-none pl-1"
            >
              {/* Circular Brand Mark Insignia */}
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-b from-[#2A2E3B] to-[#12141A] border border-white/20 shadow-md group-hover:border-[#FF5E1E] group-hover:shadow-[0_0_15px_rgba(255,94,30,0.6)] transition-all">
                <Dumbbell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF5E1E] group-hover:scale-110 transition-transform" />
              </div>

              {/* Wordmark */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-athletic italic uppercase font-black text-xs sm:text-sm tracking-tight text-white leading-none">
                    OLYMPIA <span className="text-[#FF5E1E]">GYM</span>
                  </span>
                </div>
                <span className="text-[8px] font-mono tracking-widest text-brand-text-muted uppercase font-bold hidden sm:inline-block leading-tight">
                  UNISEX FITNESS
                </span>
              </div>
            </a>

            {/* 2. CENTER: THREEUI PROXIMITY SPRING DOCK (DESKTOP) */}
            <nav
              ref={dockTrackRef}
              onPointerMove={handleDockPointerMove}
              onPointerLeave={handleDockPointerLeave}
              aria-label="Primary Navigation Dock"
              className="hidden md:flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/5"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
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
                      transition: 'color 0.16s, background 0.18s, border-color 0.18s, box-shadow 0.18s',
                    }}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider select-none outline-none transition-all ${
                      isActive
                        ? 'bg-gradient-to-b from-white to-[#E2E6EE] text-[#0A0B10] font-bold shadow-[0_10px_24px_-10px_rgba(255,94,30,0.8),inset_0_-1px_rgba(0,0,0,0.15)] border-transparent'
                        : influence > 0.08
                        ? 'text-white bg-white/10 border border-white/15 shadow-sm'
                        : 'text-neutral-400 hover:text-white bg-transparent border border-transparent'
                    }`}
                  >
                    <span
                      className={`transition-colors shrink-0 ${
                        isActive
                          ? 'text-[#0A0B10]'
                          : influence > 0.08
                          ? 'text-[#FF5E1E]'
                          : 'text-neutral-400'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="text-[11px] sm:text-xs font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* 3. RIGHT: HOTLINE, CTA & PROFILE (ACTIONS) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Phone Hotline Ghost Action */}
              <a
                href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
                aria-label={`Call Olympia Gym at ${SITE_CONTENT.brand.contact.phoneDisplay.value}`}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold text-brand-text-secondary hover:text-white hover:bg-white/5 transition-all whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF5E1E] shrink-0" />
                <span>{SITE_CONTENT.brand.contact.phoneDisplay.value}</span>
              </a>

              {/* High-Energy Electric Orange Gradient CTA Button */}
              <button
                onClick={() => handleLinkClick('#contact')}
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-white font-black text-[11px] sm:text-xs uppercase tracking-wider shadow-[0_10px_26px_-10px_rgba(255,94,30,0.95)] hover:shadow-[0_12px_32px_-8px_rgba(255,94,30,1)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer border border-white/20 select-none"
                style={{
                  background: 'linear-gradient(180deg, #FF5E1E 0%, #E0480C 100%)',
                }}
              >
                <span>Contact us</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
              </button>

              {/* Member Profile Avatar Circle */}
              <button
                onClick={() => handleLinkClick('#membership')}
                aria-label="Member Area & Profile"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-[#FF5E1E] text-white flex items-center justify-center border border-white/20 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,94,30,0.7)] transition-all shadow-sm active:scale-95 shrink-0"
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
              <div className="w-8 h-8 rounded-full bg-[#FF5E1E]/20 border border-[#FF5E1E]/40 flex items-center justify-center">
                <Dumbbell className="w-4 h-4 text-[#FF5E1E]" />
              </div>
              <span className="font-athletic italic uppercase font-black text-white text-base tracking-tight">
                OLYMPIA <span className="text-[#FF5E1E]">GYM</span>
              </span>
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
            {NAV_ITEMS.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleLinkClick(item.href)}
                  className="w-full group flex items-center justify-between text-2xl font-athletic italic uppercase font-black text-white hover:text-[#FF5E1E] transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#FF5E1E] opacity-70 group-hover:opacity-100">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <span className="text-xs font-mono text-brand-text-muted group-hover:text-[#FF5E1E]">
                    0{index + 1}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Bottom Mobile Drawer Actions */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <a
              href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
              className="w-full py-3.5 px-4 rounded-full bg-white/5 border border-white/10 text-white text-xs font-mono font-bold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#FF5E1E]" />
              <span>{SITE_CONTENT.brand.contact.phoneDisplay.value}</span>
            </a>

            <button
              onClick={() => handleLinkClick('#contact')}
              className="w-full py-3.5 px-4 rounded-full bg-[#FF5E1E] text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-[0_0_25px_rgba(255,94,30,0.6)]"
            >
              <span>CONTACT US NOW</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
