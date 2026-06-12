# ganiev-portfolio — Design Spec

Personal CV / portfolio site for Shokhrukhbek Ganiev. Approved 2026-06-13.

## Concept — "Fintech Noir"

Dark, cinematic single-page experience. Deep ink `#0A0B0D`, film grain, atmospheric
glow, one sharp **Electric Lime** accent `#C6F432`. Oversized kinetic typography,
scroll-driven storytelling. Light theme variant (paper + olive) via toggle.

## Stack

- Nuxt 4 (SSG) + Vue 3.5 `<script setup>` + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`) + CSS variables for theming
- GSAP: ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin
- Fonts: Clash Display (Fontshare), Space Grotesk + JetBrains Mono (Google Fonts)
- Contact form: Web3Forms (`NUXT_PUBLIC_WEB3FORMS_KEY`), mailto fallback
- Deploy: GitHub → Cloudflare Pages

## Sections

1. **Hero** — SplitText char reveal of the name, word marquee, mouse-follow glow,
   parallax fade-out on scroll.
2. **About** — manifest lines (SplitText line masks on scroll) + animated counters.
3. **Experience** — pinned company column (ScrollTrigger pin, desktop only),
   5 highlight cards, lime scrub progress line.
4. **Projects** — Hamyonimda (own product, lime accent card), Skale, FIDES.
   Pointer-tilt hover (fine pointers only).
5. **Skills** — 5-group grid + two opposing display marquees.
6. **Contact** — SplitText word-mask headline, working form, social links,
   Download CV (PDF).

## Rules

- All motion collapses when `prefers-reduced-motion` (html.no-anim, set pre-paint).
- `.gs-reveal` elements hidden only when `html.js` and motion allowed (no-JS safe).
- No Angular content anywhere (owner request).
- Contrast ≥ 4.5:1 both themes; lime is `#5d7a00` on light for contrast.
- English content; no AI attribution in commits.
