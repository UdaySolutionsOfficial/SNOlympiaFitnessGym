# SN Olympia Fitness — Technical Architecture & Engineering Standards
**Document Version:** 1.0 (Phase 1 Master Foundation)  
**Classification:** Enterprise Frontend System Architecture  
**Target Scalability:** Phases 1 through 5 Modular Pipeline  

---

## 1. Directory Structure & Modular Organization

The project follows a feature-driven, decoupled directory architecture designed to allow isolated development across future phases without regression:

```text
src/
├── animations/           # Physics constants, motion tokens, transition variants
│   ├── motionTokens.ts   # Durations, easings, spring configs, distances
│   └── variants.ts       # Framer Motion entrance & stagger configurations
│
├── assets/               # Local static icons, vector badges, and fallback media
│
├── components/           # Atomic & molecular reusable UI components
│   ├── common/           # Buttons, Badges, Tooltips, Dividers, Containers
│   ├── navigation/       # Top Dock, Mobile Drawer, Quick Actions
│   ├── typography/       # Display headings, gradient text, metric counters
│   ├── cards/            # Spotlight cards, Bento cells, Glass modules
│   ├── hero/             # Hero preview, CTA locks, status pills
│   ├── programs/         # Training discipline modules
│   ├── trainers/         # Verified trainer cards & placeholders
│   ├── facilities/       # Gym floor and equipment previews
│   ├── membership/       # Inquire/Tier preview cards
│   ├── testimonials/     # Attributed reviews & verified rating badges
│   ├── contact/          # Quick phone/WhatsApp hooks & location maps
│   └── 3d/               # WebGL canvas wrappers, lazy loaders & fallbacks
│
├── data/                 # Centralized single source of truth for all content
│   ├── contentStatus.ts  # Verification enum (VERIFIED, PLACEHOLDER, TO_BE_CONFIRMED)
│   ├── siteContent.ts    # Centralized brand copy, phone, location, programs
│   └── assets.ts         # Deterministic asset manifest and image path registry
│
├── hooks/                # Custom React hooks (motion, media query, 3d detection)
│   ├── useMagnetic.ts    # Magnetic pull on desktop pointer
│   ├── useReducedMotion.ts # Hardware & OS accessibility preference listener
│   ├── useWindowSize.ts  # Viewport breakpoint categorization
│   └── useSpotlight.ts   # Radial mouse coordinate tracking for cards
│
├── lib/                  # Third-party wrappers, styling utils, helper bridges
│   └── utils.ts          # clsx + twMerge utility (`cn(...)`)
│
├── styles/               # Design token definitions and global CSS
│   ├── tokens.css        # CSS custom properties (:root variables)
│   └── index.css         # Tailwind directives & fluid typography rules
│
└── views/                # Top-level route views
    ├── HomeView.tsx      # Main public view (scaffolded for Phase 2)
    └── DesignSystemView.tsx # Living Design System QC verification route
```

---

## 2. Content Truth System Architecture

To strictly ensure that no unverified claims or fake statistics are presented to users, all content properties are wrapped with or validated against the `ContentVerificationStatus`:

```typescript
export type ContentVerificationStatus = 
  | 'VERIFIED'           // Confirmed via official records, Google Maps, or direct phone
  | 'PLACEHOLDER'        // Structural placeholder clearly marked for editorial review
  | 'TO_BE_CONFIRMED';   // Business fact pending client verification (pricing, hours, etc.)
```

Any component rendering a metric, price, or business detail checks its status. In development and review modes, an interactive badge displays verification confidence.

---

## 3. Responsive Breakpoint Strategy

We enforce a mobile-first, strict zero-horizontal-overflow layout:

| Breakpoint Name | Viewport Min-Width | Layout Target & Characteristics |
| :--- | :--- | :--- |
| **xs** | `360px – 414px` | iPhone SE to Pro Max: Single column, vertical stack, persistent bottom action pill, 16px page padding. |
| **sm** | `640px` | Large phones & small phablets: 2-column micro bento grids. |
| **md** | `768px – 820px` | iPad / Tablets: Balanced 2-column hero, floating top dock visible, 24px padding. |
| **lg** | `1024px – 1280px`| Small Desktops & Laptops: 3-column bento grids, full navigation dock. |
| **xl** | `1440px` | Standard Desktops: Max content container 1400px, 32px padding, full cinematic depth. |
| **2xl** | `1920px+` | Ultra-wide displays: Center-locked container with ambient radial falloffs. |

---

## 4. Performance & Memory Management Policy

1. **Lazy Loading of Heavy Subsystems:** 3D canvases, interactive maps, and media-rich galleries are loaded asynchronously via `React.lazy` with lightweight skeleton placeholders.
2. **WebGL Context Preservation:** No more than one active `WebGLRenderer` exists on any view. Geometry instances and shader materials must cleanly call `.dispose()` on component unmount.
3. **Hardware Acceleration:** All animated properties are restricted to `transform: translate3d(...)`, `opacity`, and `filter`. Expensive properties like `width`, `height`, `top`, or `margin` are never animated.
4. **CSS Hardware Containment:** Heavy bento cards utilize `contain: content;` to isolate browser layout calculations.

---

## 5. Accessibility (a11y) Foundation

1. **Keyboard Operability:** All buttons, links, and interactive cards support `Tab` navigation with distinct focus outlines.
2. **Screen Reader Semantic Tree:** Logical HTML5 structure (`<header>`, `<main>`, `<section aria-labelledby="...">`, `<footer>`).
3. **Contrast Compliance:** All text tokens exceed WCAG AA (`4.5:1` minimum; soft white on obsidian provides `16.8:1`).
4. **Color Independence:** Verification badges pair color indicators with distinct typographic icons (`✓` for Verified, `⚠` for Unconfirmed).
