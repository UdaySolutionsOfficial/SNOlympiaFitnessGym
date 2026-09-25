# Content & Asset Replacement Guide for Developers
**Project:** SN Olympia Fitness Unisex Gym Premium Website  
**Date:** September 25, 2026  
**Audience:** Future Maintainers & Frontend Engineers  

---

## 1. Centralized Single Source of Truth

The entire website is designed so that text copy, phone numbers, addresses, hours, membership tiers, and programs can be modified **in a single file without modifying UI components**:

📁 **File:** `src/data/siteContent.ts`

### Modifying Phone & WhatsApp Numbers
Open `src/data/siteContent.ts` and locate `SITE_CONTENT.brand.contact`:
```typescript
contact: {
  phone: createVerifiedField('+91 9533779533', 'VERIFIED'),
  phoneDisplay: createVerifiedField('+91 95337 79533', 'VERIFIED'),
  whatsapp: createVerifiedField('+919533779533', 'VERIFIED'),
  instagramHandle: createVerifiedField('@olympia_fitness_ymg', 'VERIFIED'),
  instagramUrl: createVerifiedField('https://www.instagram.com/olympia_fitness_ymg', 'VERIFIED'),
}
```
Updating these values automatically updates the Top Dock, Floating Cards, Contact Section, Enquiry Modal, Sticky Mobile Bar, and Footer simultaneously.

### Updating Membership Tiers & Pricing
Open `src/data/siteContent.ts` and locate `SITE_CONTENT.membership`:
```typescript
{
  id: 'monthly-pass',
  tierName: 'Monthly Commitment',
  billingCycle: 'Per Month',
  durationKey: 'monthly',
  priceNote: createVerifiedField('₹1,200 / Month', 'VERIFIED'), // update price note here
  features: [ ... ],
  ctaLabel: 'INQUIRE BATCH'
}
```

### Adding or Updating FAQs
Open `src/data/siteContent.ts` and locate `SITE_CONTENT.faq`:
```typescript
{
  id: 'faq-new-item',
  category: 'Membership',
  question: 'Your Question Here?',
  answer: 'Your Answer Here.',
  verification: createVerifiedField('Verified Policy', 'VERIFIED')
}
```

---

## 2. Replacing Visual & Photography Assets

All image mappings are defined in:

📁 **File:** `src/data/assets.ts`  
📁 **Storage Folder:** `public/assets/images/`

### To Replace an Image:
1. Save the new image in `public/assets/images/<category>/` (e.g. `public/assets/images/hero/hero-athlete-desktop.jpg`).
2. Recommended formats: WebP, AVIF, or high-quality JPG (compressed at 82–85% quality).
3. Recommended resolutions:
   - **Hero Desktop:** 2560x1440 (16:9)
   - **Hero Mobile:** 1080x1920 (9:16)
   - **Facility / Atmosphere:** 2560x1440 (16:9)
   - **Program Cards:** 1200x800 (3:2)
   - **Gallery Photos:** 1080x1080 (1:1) or 1440x1080 (4:3)
4. Update `ASSET_MANIFEST` in `src/data/assets.ts` if the file path changes.

---

## 3. Building & Deploying Updates

After making any content or asset changes:
```bash
# 1. Verify types
npx tsc --noEmit

# 2. Build production bundle
npm run build

# 3. Preview locally
npm run preview
```
The output will be created in `dist/`, ready for zero-downtime deployment.
