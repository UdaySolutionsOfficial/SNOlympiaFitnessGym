# SN Olympia Fitness — Interaction Library & Component Map
**Document Version:** 1.0 (Phase 1 Baseline)  
**Classification:** Motion, 3D & Creative Engineering Strategy  
**Implementation Policy:** Zero Bloat — Strict Justification per Component  

---

## 1. Overview & Evaluation Framework

To maintain a 60fps frame budget, sub-1.5s initial load time, and clean maintainability across desktop and mobile, every visual interaction and 3D effect must undergo strict qualification before inclusion. 

Each pattern is categorized by strategy:
1. **Direct Adaptation:** Permissibly adapt clean TypeScript/CSS implementation.
2. **Custom Re-creation:** Engineer a lightweight, tailored variant to avoid heavyweight dependencies.
3. **Visual Inspiration Only:** Use the conceptual aesthetic for art direction without importing external runtime code.

---

## 2. Interaction Reference Evaluations

### A. ThreeUI References

| Component Reference | Technology / Runtime | Fitness Application for Olympia | Strategy | Rationale & Performance Bounds |
| :--- | :--- | :--- | :--- | :--- |
| **Glass AI Button** (`https://threeui.com/buttons/glass-ai-button`) | Embedded Three.js r170 + GLSL + DOM/CSS | Primary "JOIN NOW" CTA & High-Impact Hero Action | **Custom Re-creation (Tailwind + CSS GPU Shaders / Framer Motion)** | Running a full Three.js instance inside a DOM button creates multi-context WebGL overhead. We re-create the sleek chromatic edge, glass refraction, and particle glow using CSS backdrop filters, radial gradient tracking, and hardware-accelerated transforms. |
| **Matrix Field / Laser Background** (`https://threeui.com/backgrounds/matrix-field`) | Raw WebGL / GLSL shaders | Hero Ambient Depth & Section Transition Atmosphere | **Custom Re-creation (Lightweight Canvas 2D / Single WebGL Plane)** | Full laser grid scenes consume substantial GPU memory on mobile. We adapt the atmospheric perspective into an optimized, low-draw-call ambient grid/particle veil with automatic pause when scrolled out of view. |
| **Article Headings** (`https://threeui.com/text-animation/article-headings`) | DOM/CSS + Canvas 2D | Hero Headlines & Section Opening Reveals | **Custom Re-creation (GSAP / CSS Split Text)** | Provides punchy, energetic headline reveals. Implemented via GPU-accelerated `translate3d` and clip-path reveals rather than heavy canvas text re-rendering to preserve crisp DOM typography and accessibility. |
| **Sable Animated Top Dock** (`https://threeui.com/css/animated-top-dock/sable`) | DOM + CSS + WebGL + Three.js | Floating Global Navigation Pill Header | **Custom Re-creation (CSS Flexbox + Framer Motion)** | A floating frosted pill with spring-loaded hover expansion and active indicator. Re-created purely with CSS `backdrop-filter: blur(16px)` and spring motion, eliminating WebGL overhead for simple navigation. |

---

## 3. React Bits Integration Shortlist

| Pattern / Component | Role in Olympia Fitness Website | Phase Targeted | Integration Strategy |
| :--- | :--- | :--- | :--- |
| **Spotlight Card** | Facility & Program Bento Cards with mouse-following radial glow | Phase 1 & 2 | **Direct Custom Adaptation:** Pure CSS custom properties (`--mouse-x`, `--mouse-y`) with zero external bundle bloat. |
| **Tilted Card** | Interactive 3D perspective tilt on trainer & membership cards | Phase 3 & 4 | **Custom Re-creation:** CSS `transform: perspective(1000px) rotateX(...) rotateY(...)` calculated on pointer move with reduced-motion fallback. |
| **Pill Nav** | Floating top navigation with active tab indicator pill | Phase 1 & 2 | **Direct Adaptation:** Clean responsive dock with blurred background and smooth indicator spring. |
| **Decrypted Text / Split Reveal** | Metric and statistic reveal on scroll (`5.0★`, `PRO COACHING`) | Phase 2 | **Custom Utility:** Character scramble / counter tick implemented in a 2KB helper hook. |
| **Bento Grid Layout** | Modern asymmetric modular grid for gym areas and equipment | Phase 1 & 3 | **Direct CSS Grid Implementation:** Native Tailwind CSS grid template columns with responsive spans. |
| **Magnetic Button** | Hero CTA buttons gently attracted to cursor pointer | Phase 1 & 2 | **Lightweight Hook (`useMagnetic`):** Bounded cursor attraction with strict touch-device bypass. |

---

## 4. SceneAI Art Direction Synthesis

SceneAI showcases cinematic lighting, atmospheric fog, and high-energy geometric compositions. For Olympia Fitness:
- **Atmospheric Depth:** Deep graphite floor reflections, subtle floor spotlights, and volumetrics mimicking late-night heavy lifting sessions.
- **Lighting Contrasts:** Sharp rim lighting on human muscle silhouettes and textured iron plates.
- **Controlled Palette:** Monochromatic foundation elevated by single-wavelength volt lime highlights.
- **No Proprietary Code/Assets:** SceneAI principles are utilized solely for creative direction and prompt engineering for original photography/3D asset generation.

---

## 5. Three.js / React Three Fiber Architecture

To adhere to the foundational rule **"3D SHOULD ENHANCE THE WEBSITE, NOT BECOME THE WEBSITE"**:
1. **Single Global Canvas / Context:** If 3D elements are rendered, they share a single lightweight canvas or are isolated into lazy-loaded islands.
2. **Viewport Culling & In-View Detection:** WebGL render loops must immediately pause (`cancelAnimationFrame`) when the container is outside the active viewport (`IntersectionObserver`).
3. **Mobile & Low-Power Fallback:** On devices with `navigator.hardwareConcurrency <= 4`, battery saving mode, or screen width `< 768px`, 3D scenes gracefully degrade to high-resolution webp/AVIF static renders with CSS parallax.
4. **Clean Disposal:** Textures, geometries, and materials must invoke `.dispose()` upon unmount to prevent WebGL context loss and memory leaks.

---

## 6. GSAP / ScrollTrigger Motion Architecture

1. **Deterministic Motion Tokens:** Duration, easing curves, and stagger intervals are managed via central configuration (`motionTokens.ts`).
2. **ScrollTrigger Pinning & Layering:** Reserved for narrative hero depth and section transitions; strictly avoided for high-frequency navigation or forms.
3. **Accessibility Integration:** GSAP timelines and Framer Motion variants automatically query `window.matchMedia('(prefers-reduced-motion: reduce)')`. When active, transitions collapse to instant or subtle opacity fades (`0.15s`).
