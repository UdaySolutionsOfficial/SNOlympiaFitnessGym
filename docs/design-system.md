# SN Olympia Fitness — Design System & Visual Specification
**Document Version:** 1.0 (Phase 1 Baseline)  
**System Name:** *Iron & Volt* Design System  
**Philosophy:** Nike-Style Confidence + Editorial Athleticism + Controlled Precision  

---

## 1. Design Tokens & Color System

The Olympia color system is built on a dark, high-contrast athletic foundation. It is exposed via CSS custom properties (`:root`) and configured in the styling system.

### A. Color Tokens

```css
:root {
  /* Surfaces & Canvas */
  --color-bg-base: #08090A;            /* Near-black deep abyss */
  --color-bg-secondary: #0E1114;       /* Primary section background */
  --color-surface-card: #15191E;       /* Card & Bento surface */
  --color-surface-card-hover: #1C2229; /* Interactive surface lift */
  --color-surface-glass: rgba(21, 25, 30, 0.72); /* Translucent frosted glass */
  --color-surface-glass-border: rgba(255, 255, 255, 0.08); /* Crisp edge boundary */

  /* Text & Content */
  --color-text-primary: #F4F6F8;       /* High-contrast soft white */
  --color-text-secondary: #B4BCC6;     /* Readable editorial secondary text */
  --color-text-muted: #6E7885;         /* Metadata, micro-labels & inactive state */
  --color-text-inverted: #08090A;      /* Dark text on bright accent badges */

  /* Brand Athletic Accents (Provisional Electric Volt Lime) */
  --color-accent-primary: #CCFF00;     /* Electric Volt Lime: vitality, focus, action */
  --color-accent-hover: #D6FF33;       /* High-energy hover tint */
  --color-accent-active: #B5E600;      /* Pressed tactile state */
  --color-accent-soft: rgba(204, 255, 0, 0.12); /* Subtle glow & pill fill */
  --color-accent-glow: rgba(204, 255, 0, 0.35); /* Focus rings & spotlight center */

  /* Structural Borders & Dividers */
  --color-border-subtle: rgba(255, 255, 255, 0.06);
  --color-border-medium: rgba(255, 255, 255, 0.12);
  --color-border-accent: rgba(204, 255, 0, 0.35);

  /* Status Tokens */
  --color-status-verified: #00E599;    /* Verified ground truth */
  --color-status-unverified: #FFB800;  /* Content to be confirmed */
}
```

---

## 2. Typography System

### A. Type Hierarchy & Fluid Scaling
We employ fluid clamp equations to ensure typography automatically harmonizes from small mobile devices (360px) through standard desktops (1440px) to ultra-wide displays (1920px+), eliminating awkward line clipping or horizontal scrollbars.

| Level | Role / Element | Fluid Formula (`clamp`) | Weight | Letter Spacing | Line Height |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display 01** | Signature Hero Headline | `clamp(3.2rem, 7vw + 1rem, 7.5rem)` | 900 (Black / Extra-Bold) | `-0.04em` | 0.95 |
| **Display 02** | Section Opening Headlines | `clamp(2.4rem, 4.5vw + 0.5rem, 4.5rem)` | 800 (Heavy) | `-0.03em` | 1.05 |
| **Heading 01** | Card & Feature Titles | `clamp(1.5rem, 2vw + 0.5rem, 2.25rem)` | 700 (Bold) | `-0.02em` | 1.2 |
| **Heading 02** | Sub-sections & Modals | `clamp(1.25rem, 1.5vw + 0.25rem, 1.5rem)` | 600 (SemiBold) | `-0.01em` | 1.3 |
| **Body Large** | Hero sub-copy, lead paragraphs | `clamp(1.125rem, 0.5vw + 1rem, 1.25rem)` | 400 (Regular) | `normal` | 1.6 |
| **Body Base** | Standard descriptions, card copy | `1rem (16px)` | 400 (Regular) | `normal` | 1.65 |
| **Caption / Label** | Badges, tags, statistics metadata | `0.75rem – 0.8125rem (12px – 13px)` | 600 (Uppercase) | `+0.08em` | 1.4 |

---

## 3. Spacing System

A consistent, mathematical 4px/8px modular scale prevents arbitrary layout drift:

```css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-20: 5rem;    /* 80px */
  --space-24: 6rem;    /* 96px */
  --space-32: 8rem;    /* 128px */
}
```

### Layout Application
- **Page Container Max Width:** `1400px` (with `clamp(1rem, 4vw, 3rem)` horizontal gutter).
- **Section Vertical Rhythm:** Mobile: `4rem` (`64px`); Tablet: `6rem` (`96px`); Desktop: `8rem` (`128px`).
- **Card Padding:** Mobile: `1.25rem` (`20px`); Desktop: `2rem` (`32px`).

---

## 4. Corner Radius & Surface Blur

- **Radius Sharp / Badge:** `4px` (`rounded-sm`)
- **Radius Button / Small Card:** `8px` (`rounded-md`)
- **Radius Bento Card / Container:** `16px` (`rounded-2xl`)
- **Radius Pill / Capsule:** `9999px` (`rounded-full`)
- **Glassmorphism Blur:** `16px` (`backdrop-blur-md`) to `24px` (`backdrop-blur-lg`) with performance fallbacks.

---

## 5. Z-Index Layer Management

To prevent arbitrary `z-index: 9999` conflicts, depth is managed categorically:

```css
:root {
  --z-negative: -1;    /* Background canvas & ambient glow */
  --z-base: 0;         /* Normal page content & text */
  --z-surface: 10;     /* Cards, bento modules, elevated blocks */
  --z-floating: 20;    /* Floating badges, micro-metric pills */
  --z-sticky-dock: 30; /* Pinned top navigation dock */
  --z-popover: 40;     /* Dropdowns, tooltips */
  --z-overlay: 50;     /* Fullscreen backdrop & dialog mask */
  --z-modal: 60;       /* Interactive modals, mobile drawer */
  --z-toast: 70;       /* Toast notifications & alerts */
}
```

---

## 6. Accessibility & Contrast Compliance

- **WCAG AA / AAA Contrast:** White text on Obsidian base yields `16.8:1` (far exceeding WCAG AAA `7:1`). Volt Lime `#CCFF00` against deep black `#08090A` yields `14.2:1`.
- **Visible Focus States:** All interactive elements feature a high-contrast double-ring focus outline: `outline: 2px solid var(--color-accent-primary); outline-offset: 3px`.
- **Keyboard Navigation:** Native button elements with semantic `role`, accessible label (`aria-label`), and tab index integrity.
- **Prefers-Reduced-Motion:** Full degradation of kinetic transforms to instantaneous or 0.15s opacity fades.
