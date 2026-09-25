# SN Olympia Fitness — Motion Design System & Animation Engine
**Document Version:** 1.0 (Phase 1 Baseline)  
**System Classification:** Kinetic Physics & Motion Choreography  
**Core Aesthetic:** Smooth · Controlled · Weight-Bearing · Non-Distracting  

---

## 1. Motion Philosophy

In a high-performance gym environment, physical movement is grounded in tension, controlled deceleration, and explosive intent. Digital motion for SN Olympia mirrors these principles:

1. **Mass & Momentum:** UI elements never feel like floaty cartoon bubbles. They accelerate smoothly and decelerate with physical damping (`cubic-bezier(0.16, 1, 0.3, 1)`).
2. **Intentionality:** An animation must serve one of three purposes:
   - Guide user visual hierarchy (e.g., staggering headline words into view).
   - Provide tactile interaction feedback (e.g., button press depth, card tilt).
   - Establish spatial continuity across viewport transitions.
3. **Restraint ("Less But Better"):** Distracting continuous loop animations, spinning badges, and bouncing icons are strictly prohibited. Once an element has entered the DOM, it remains stable.

---

## 2. Motion Tokens & Physics Parameters

All animations consume centralized tokens defined in `src/animations/motionTokens.ts`:

### A. Timing Scales (Durations)
- **Instant / Micro:** `100ms` (`0.1s`) — Tooltip display, toggle tick
- **Tactile Fast:** `200ms` (`0.2s`) — Button active press, hover highlights, border glow
- **Medium UI:** `350ms` (`0.35s`) — Accordion expansion, modal transition, drawer slide
- **Content Reveal:** `600ms` (`0.6s`) — Card reveals, grid fades, image scale settling
- **Hero & Cinematic:** `900ms – 1200ms` (`0.9s – 1.2s`) — Signature headline entrance, curtain unveil

### B. Standard Easing Curves
```typescript
export const EASINGS = {
  // Athletic Ease-Out: Immediate response with weighted physical settling
  athleticOut: [0.16, 1, 0.3, 1] as const,
  
  // Power Ease: Fast explosive departure
  powerOut: [0.22, 1, 0.36, 1] as const,
  
  // Smooth Natural: Editorial content reveals
  editorial: [0.25, 0.1, 0.25, 1] as const,
  
  // Linear: Strictly for continuous smooth progress indicators
  linear: [0, 0, 1, 1] as const,
};
```

### C. Stagger & Displacement
- **Stagger Interval (Items):** `0.06s` (fast rhythm) to `0.1s` (dramatic entrance).
- **Default Translation Distance:**
  - Subtle: `12px` (microcopy, small badges)
  - Standard: `24px` (cards, bento items)
  - Dramatic: `48px` (hero headlines, split lines)

---

## 3. Reusable Motion Primitives

| Motion Concept | Implementation Hook / Class | Visual Behavior |
| :--- | :--- | :--- |
| **Fade Reveal** | `motionFadeIn` | Opacity from `0` to `1` over `0.5s` with `athleticOut`. |
| **Slide Reveal (Up/Down)** | `motionSlideUp` | Opacity `0 -> 1` paired with `translateY(24px -> 0px)`. |
| **Staggered Container** | `motionStaggerContainer` | Coordinates parent-child orchestration with `0.08s` delay between items. |
| **Magnetic Pull** | `useMagnetic(ref, { strength: 0.2 })` | Subtle cursor attraction on desktop pointers; cleanly bypassed on touch devices. |
| **Interactive Spotlight** | `useSpotlight(ref)` | Tracks `--mouse-x` and `--mouse-y` for dynamic radial glow on card borders. |
| **3D Perspective Tilt** | `useCardTilt(ref, { max: 8 })` | Perspective tilt on mouse move; clamped to 8 degrees to prevent distortion. |
| **Image Scale Drift** | `hover:scale-105 transition-transform` | Smooth 5% optical zoom inside overflow-hidden frame over `0.6s`. |

---

## 4. Scroll Experience Architecture

The Phase 1 foundation prepares the runtime for advanced scroll interactions in Phase 2–5:
1. **Viewport Detection:** Framer Motion `whileInView` and native `IntersectionObserver` with a standard `amount: 0.2` and `once: true` policy (once revealed, content does not hide and re-animate on reverse scroll).
2. **Scroll-Linked Parallax:** Prepared for GSAP ScrollTrigger and CSS `will-change: transform`. Transform operations are strictly constrained to `translate3d` to avoid browser layout thrashing.
3. **No Scroll Jacking:** Native browser scroll velocity and momentum physics are strictly preserved.

---

## 5. Reduced Motion Governance (`prefers-reduced-motion`)

Whenever `(prefers-reduced-motion: reduce)` is evaluated:
- All translation offsets (`translateY`, `translateX`) collapse to `0px`.
- Scale factors collapse to `1.0`.
- Durations are capped at `0.15s` or disabled entirely.
- 3D rotations and gyro effects are suspended.
- WebGL canvas transitions directly to high-fidelity static image renders.
