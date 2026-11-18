---
name: Ganiev Portfolio — Fintech Noir
description: Personal CV site; dark-first "Fintech Noir" with one acid-lime accent, the owner's chosen direction.
colors:
  primary: "#c6f432"
  ink: "#0a0b0d"
  ink-2: "#101216"
  ink-3: "#16181d"
  paper: "#f4f3ee"
  text: "#eceae3"
  text-muted: "#8d8f96"
  lime: "#c6f432"
  on-lime: "#0a0b0d"
  light-ink: "#f4f3ee"
  light-ink-2: "#eceae2"
  light-ink-3: "#e2e0d6"
  light-paper: "#0a0b0d"
  light-text: "#141519"
  light-text-muted: "#5c5e66"
  light-lime: "#4f6a00"
  light-on-lime: "#f4f3ee"
  chrome-red: "#ff5f57"
  chrome-yellow: "#febc2e"
  chrome-green: "#28c840"
typography:
  display: { fontFamily: "Unbounded, Onest, sans-serif", fontWeight: 600, lineHeight: 0.92 }
  body: { fontFamily: "Onest, ui-sans-serif, system-ui, sans-serif" }
  label: { fontFamily: "JetBrains Mono, ui-monospace, monospace", fontSize: "0.75rem" }
rounded: { focus: "2px", full: "9999px" }
---

## Overview
**Fintech Noir — the owner's direction, chosen and confirmed on 2026-11-19** after three alternative directions were shown and rejected. Dark-first, one acid-lime accent, monospace labels, large display type and quiet motion (GSAP). The site should feel like a developer's own product, not a template. Keep this look; refine it, do not replace it.

## Colors
Tokens live in `app/assets/css/main.css` (`:root` dark, `html.light` light) and are mapped to Tailwind in `@theme inline`. Text on a lime fill uses `on-lime`. The light theme's lime is darker (#4f6a00) so lime text and fills pass 4.5:1 on every light surface (fixed 2026-11-18). Translucent tokens (`line`, `lime-dim`, `glow`, `aurora-*`, `dot`) are rgba values in the token file.

## Typography
Display: **Unbounded** 600, tracking -0.01em, `text-wrap: balance` (tighter tracking made its notched B, E and I read as touching). Body: **Onest**. Labels and the terminal: JetBrains Mono, with Onest second in the stack for ʻ (U+02BB), which JetBrains Mono lacks. Text floor: 12px (`text-xs`). Hero name: `clamp(2rem, 7.8vw, 7rem)` so "SHOKHRUKHBEK" stays inside the margins from 375 to 1440; contact heading `text-3xl` below sm so it stays on two lines in ru, uz and en.
Uzbek copy uses ʻ (U+02BB) in oʻ gʻ and ʼ (U+02BC) for tutuq belgisi.
Every face covers Cyrillic and Uzbek Latin (oʻ gʻ) — owner's choice on 2026-11-19 (option 3 of the font specimen in `design/fonts/`). Before that, Clash Display and Space Grotesk had no Cyrillic and every Russian line rendered in Helvetica or the system face. Keep `render_check` free of `font-fallback` in ru, uz and en.

## Layout
Single page, five sections, max width 7xl, 20px phone / 40px desktop margins. Tailwind's spacing scale is the spacing token set.

## Elevation & Depth
Aurora background (blurred blobs + dot grid) behind everything. The command palette dialog has a shadow and a blurred backdrop; the fixed header is blurred.

## Shapes
Pills (`rounded-full`) for buttons, chips and the language switch; small radii elsewhere.

## Components
Header (wordmark, section links on lg, Menu button below lg → command palette, language switch, theme toggle), hero with CV and case buttons, expertise cards with live mock demos, projects, interactive terminal, contact with Telegram CTA.

## Do's and Don'ts
- **Owner's decisions (reasons for model defaults):** near-black + acid lime with glow, monospace uppercase labels above sections, pill buttons, arrows on CTA labels, one accent word in headlines, aurora background, glass terminal, glow on the Telegram CTA — all part of Fintech Noir, chosen by the owner on 2026-11-19.
- Do keep text >= 12px, tap targets >= 44px on phones, contrast >= 4.5:1 in both themes.
- Don't take colours outside the token file; add a token first.
- Allowed effects: header blur (legibility over content), palette backdrop blur and shadow (modal), aurora blur (the direction), terminal glass and CTA glow (the direction).
