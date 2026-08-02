# Repositioning: Frontend Developer → Software Engineer

Date: 2026-08-02 · Status: approved

## Goal

Reposition CV + portfolio site for **employers** (not freelance clients):
**Software Engineer — Frontend (Vue/TS) + Go**, backed by fintech track record
and own products shipped end-to-end (code → server → production).

## Decisions (locked with user)

| Question | Decision |
|---|---|
| Primary audience | Employers |
| Title line | Software Engineer · Frontend (Vue 3 / TypeScript) + Go |
| Projects shown | Only Hamyonimda, Skale, FIDES (BronBot/Malika are private) |
| Site structure | No new sections; Experience folded into About; Services re-toned |
| Alif naming | Named in CV PDF only; site says "ведущий финтех Узбекистана" |
| Alif start date | Aug 2023 ("3+ years") |

## Changes

### 1. Site copy — `i18n/locales/{ru,uz,en}.json` + `app/data/content.ts`

- **Hero**: label → "Software Engineer · Tashkent"; tagline → Frontend (Vue/TS) + Go,
  3+ years fintech, own products in production end-to-end. `heroWords`: add TypeScript, Docker.
- **About** (extended, no new section): keep "весь цикл разработки" thesis; add fintech
  specifics — SME product frontend built from scratch (273 applications in first 2 weeks),
  performance 54→74%, Lighthouse CI, internal MCP server, e-imzo. Stats: `3+ years` /
  `10+ projects in prod` / third stat becomes engineering-flavored.
- **Services → "What I do"**: same 4 cards + live demos, engineer tone:
  Frontend Engineering · Backend & API (Go, PostgreSQL, payments) ·
  Telegram platforms (Mini Apps, bots) · Infrastructure & Delivery (Docker, CI/CD, monitoring).
  Remove freelance "под ключ для вашего бизнеса" phrasing.
- **Terminal**: `about` / `services` command outputs match new positioning.
- **Contact**: keep Telegram CTA + Download CV; subtitle neutral.
- **Meta**: title/description → Software Engineer positioning.
- **Projects**: same three; descriptions strengthened with end-to-end facts
  (Hamyonimda: Go + PostgreSQL + Docker + CI/CD on own VPS).

### 2. CV PDF — `scripts/cv-print.html` → regenerate `public/Shokhrukhbek_Ganiev_CV.pdf`

- Tagline → "Software Engineer · Frontend (Vue 3 / TypeScript) + Go".
- Company → **Alif, Tashkent**; period Aug 2023 — Present.
- Summary: 3+ years; frontend core + Go backend in own products; metrics.
- Experience: add SME business result (273 applications, 21B UZS limits in 2 weeks).
- Projects → "Own Products (end-to-end)"; Hamyonimda full stack listed.
- Skills: Go / PostgreSQL / Docker promoted from "Additional" to a Backend block.
- Languages: English → B2.

### 3. Obsidian sync

- Rewrite `2 - Areas/Career/CV.md` (currently 1.5 years stale) to match new CV.
- Append entry to vault `log.md`.

### 4. Verification

- `pnpm generate` passes; grep built HTML for new copy.
- Playwright screenshots: desktop 1440 + mobile 390, all 3 locales; fix overflows.
- PDF regenerated via headless Chrome from cv-print.html.

## Out of scope

- Visual redesign (Fintech Noir design system stays).
- New components/sections beyond copy-level changes.
- BronBot / Malika Platform exposure.
- git push / deploy (needs explicit approval per user rules).
