# Environment Configuration & Operational Variables
**Project:** SN Olympia Fitness Unisex Gym Premium Website  
**Date:** September 25, 2026  
**Document Version:** 1.0 (Production Architecture Baseline)  

---

## 1. Overview

The SN Olympia Fitness website is architected as an ultra-reliable, high-performance static client application built with Vite, React, and TypeScript. All sensitive credentials, tokens, or private endpoints are strictly forbidden from client-side bundle inclusion.

---

## 2. Environment Variables Specification

| Variable Name | Required / Optional | Default Value | Description | Configuration Location |
| :--- | :--- | :--- | :--- | :--- |
| `VITE_ENQUIRY_API_ENDPOINT` | **Optional** | `undefined` (Transparent WhatsApp dispatch fallback) | Target HTTPS REST endpoint to receive admission inquiry JSON payloads (`name`, `phone`, `email`, `interest`, `message`). When omitted, the form dispatches directly to the gym's verified WhatsApp business line (`+919533779533`) and direct call hotline (`tel:+919533779533`), ensuring zero broken forms. | `.env.production` or Hosting Environment Variables (Vercel, Netlify, Cloudflare Pages) |
| `VITE_SITE_URL` | **Optional** | `https://olympiafitness.in` | Canonical public URL used for Open Graph tags, Twitter Cards, and sitemap generation. | `.env.production` |

---

## 3. Production Security Rules

1. **Zero Secret Leaks:** Never prefix internal database secrets, private keys, or API tokens with `VITE_`. Any variable prefixed with `VITE_` is automatically baked into the client bundle by Vite during `npm run build`.
2. **Safe Fallbacks:** The application is architected so that even if zero environment variables are configured in the hosting dashboard, 100% of conversion actions (phone calling, WhatsApp inquiries, Google Maps directions, Instagram links) function immediately using verified gym contact data.
3. **Localhost Isolation:** No `.env` files containing `localhost` or development-specific IPs are committed to the version control repository.
