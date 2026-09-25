# SN Olympia Fitness — AI Visual & Asset Generation Pipeline
**Document Version:** 1.0 (Phase 1 Baseline)  
**Strategy Focus:** High-End Editorial Athletic Visuals & Prompt Engineering Matrix  
**Creative Director Quality Gate:** Authentic Anatomy, Zero AI Plasticity, UI Negative Space  

---

## 1. Quality Standards & Generation Guardrails

To prevent the website from looking like a generic "AI-generated" concept, all generated and curated visual assets must adhere to non-negotiable artistic guidelines:

*   **Zero Text / Watermark / Fake Brand Artifacts:** Negative prompt `--no text, watermark, logo, words, letters, brand emblems, distorted limbs, extra fingers, cartoonish smoothing, airbrushed skin, oversaturated neon, plastic sheen`.
*   **Anatomical Realism & Muscular Biomechanics:** Realistic vascularity, genuine sweat sheen, natural bone-tendon insertions, authentic muscle contraction during compound lifts (deadlift, barbell squat, pull-up, bench press).
*   **High-End Editorial Camera Direction:** Hasselblad H6D-100c or Sony A1 85mm f/1.4 GM aesthetic. Shallow depth of field, natural film grain, rim lighting (Kino Flo / Profoto strobe setups), deep cinematic shadows.
*   **UI Negative Space Integration:** Key focal subjects must be composed on the right or left two-thirds of the frame, leaving intentional dark negative space for hero typography, statistic overlays, and CTA buttons without text-legibility clashes.

---

## 2. Asset Catalog & Prompt Specifications

### A. Hero Section Assets

1. **Hero Athlete — Desktop Cinematic Banner**
   *   **Semantic Filename:** `hero-athlete-desktop.webp`
   *   **Dimensions / Ratio:** 2560 × 1440 (16:9), WebP / AVIF format (<250KB target with responsive `srcset`)
   *   **Composition:** Focused, muscular athlete in chalk-dusted dark athletic wear preparing for a lift; strong directional side rim lighting in a moody, dark charcoal industrial gym; subject on the right 60%, dark gradient vignette on left 40% reserved for large headline typography.
   *   **Master Prompt:** `Cinematic low-angle medium shot of an elite, focused athlete standing in an atmospheric dark gym, dramatic rim lighting tracing muscular shoulders and arms, chalk dust suspended in a beam of light, moody deep charcoal and graphite background, heavy steel barbells and knurled iron plates softly blurred in background, Hasselblad 85mm lens, f/2.0, editorial sports photography, realistic skin texture and sweat, 8k resolution, volumetric contrast, uncluttered left side for typography --ar 16:9 --style raw`

2. **Hero Athlete — Mobile Portrait Crop**
   *   **Semantic Filename:** `hero-athlete-mobile.webp`
   *   **Dimensions / Ratio:** 1080 × 1920 (9:16)
   *   **Composition:** Vertical centered/slightly offset athlete framing with dark top and bottom gradient fades for mobile header dock and thumb-friendly bottom action pill.

3. **Hero Ambient Atmospheric Texture**
   *   **Semantic Filename:** `hero-ambient-depth.webp`
   *   **Dimensions / Ratio:** 1920 × 1080, subtle noise grain and soft volt lime radial backlight.

---

### B. Training Programs

1. **Strength & Hypertrophy**
   *   **Semantic Filename:** `program-strength-hypertrophy.webp`
   *   **Visual Focus:** Heavy barbell deadlift or power rack setup, textured steel knurling, intense grip, chalk clouds, controlled power.

2. **Conditioning & High-Intensity Cardio**
   *   **Semantic Filename:** `program-conditioning-hiit.webp`
   *   **Visual Focus:** Dynamic battle ropes in motion or athlete on curved manual treadmill, rapid motion blur on ropes with sharp focus on core stability.

3. **Dedicated Personal Coaching & Technique**
   *   **Semantic Filename:** `program-personal-coaching.webp`
   *   **Visual Focus:** Professional coach analyzing lifting biomechanics or spotting a barbell press with mutual dedication and focus.

4. **Functional Fitness & Mobility**
   *   **Semantic Filename:** `program-functional-mobility.webp`
   *   **Visual Focus:** Kettlebell swing or plyometric box transition, emphasizing agility, core endurance, and joint longevity.

---

### C. Facilities & Gym Floor

1. **Free Weights & Dumbbell Rack Arena**
   *   **Semantic Filename:** `facility-free-weights.webp`
   *   **Visual Focus:** Precision heavy dumbbells in matte black polyurethane and brushed steel, perfectly aligned on heavy-duty tiered racks with atmospheric floor uplighting.

2. **Heavy-Duty Power Cages & Olympic Platforms**
   *   **Semantic Filename:** `facility-power-cages.webp`
   *   **Visual Focus:** Solid steel squat racks, Olympic bumper plates, chalk stands, dedicated deadlift platform with shock-absorbent rubber flooring.

3. **Selectorized Pin & Cable Machine Floor**
   *   **Semantic Filename:** `facility-pin-machines.webp`
   *   **Visual Focus:** Modern biomechanically engineered cable towers and plate-loaded machines in matte black and titanium finish.

4. **Cardio & Functional Training Turf**
   *   **Semantic Filename:** `facility-functional-turf.webp`
   *   **Visual Focus:** High-density green/charcoal athletic sprint turf track with sleds, medicine balls, and plyometric boxes.

---

### D. Trainers & Coaching Staff

*   **Real Photography Priority:** Genuine photos of SN Olympia's resident trainers will be integrated upon receipt during Phase 3.
*   **Placeholder Architecture:** Reusable SVG silhouette avatars and neutral, stylized athletic silhouettes labeled with explicit `CONTENT TO BE CONFIRMED` verification tags.
*   **Prompt (for fallback placeholders):** `Editorial studio portrait of an athletic fitness coach in minimalist black performance apparel, confident composed posture, dramatic Rembrandt studio lighting against a dark textured graphite backdrop, 85mm f/1.8, neutral authentic expression, hyper-realistic --ar 4:5 --style raw`

---

### E. Gym Gallery & Environment

1. `gallery-01-barbell-close-up.webp`: Macro shot of Olympic barbell knurling with magnesium carbonate chalk dust.
2. `gallery-02-atmosphere-wide.webp`: Wide cinematic perspective of the gym floor during an evening training session.
3. `gallery-03-athlete-rope-climb.webp`: Vertical power capture of athlete gripping climbing ropes or pull-up rig.
4. `gallery-04-dumbbell-rack.webp`: Perspective angle down the dumbbell line with subtle volt reflections.
5. `gallery-05-locker-amenities.webp`: Clean, modern, functional changing and locker facilities.
6. `gallery-06-evening-energy.webp`: Dynamic training community engaged in unison under focused downlights.

---

### F. Final Conversion CTA

*   **Semantic Filename:** `cta-crucible-atmosphere.webp`
*   **Composition:** Wide cinematic shot looking into the illuminated entrance and open floor of the gym at twilight; dark surrounding borders with soft center illumination inviting the viewer to step inside and begin their journey.

---

### G. 3D Asset Strategy

*   **Signature Asset:** High-resolution 3D Olympic Weight Plate / Hex Dumbbell with realistic PBR materials (roughness map for textured cast iron, metallic map for brushed steel center bushing, and subtle debossed "OLYMPIA" lettering).
*   **Format:** Optimized GLTF / GLB file compressed with Draco compression (<1.2MB target size).
*   **Runtime:** Interactive Three.js canvas featuring subtle gyro/mouse rotation with reduced-motion static fallback.

---

### H. Video Strategy (Phases 3–5)

*   **Format:** MP4 + WebM (H.265 / AV1 codec), max 15 seconds looping, 1080p, no audio track (muted by default, `playsinline`, `preload="none"` or loaded after initial render).
*   **Purpose:** Background ambient pulse in hero or bento highlight card.
