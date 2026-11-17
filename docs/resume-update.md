# Full-Stack AI Engineer portfolio update

## Scope

Create matching English PDF and DOCX resumes from `scripts/cv.json`. Preserve the portfolio's Nuxt/GSAP visual identity, update ru/uz/en copy, feature Hamyonimda, and offer both formats. Keep the existing PDF URL. User confirmed November 2023 employment start and ability to interview in English. Alif may appear in the resume files, but not in the site's editorial copy.

## Implementation and verification

- [x] Generate a single-column DOCX and printable HTML from one content source.
- [x] Render DOCX with LibreOffice, inspect every page and use its PDF for delivery.
- [x] Update localized positioning, metadata, terminal, expertise and Hamyonimda case study.
- [x] Verify generation, localized HTML, file downloads, screenshots at desktop/tablet/mobile widths and reduced motion.
- [x] Commit locally. Push and production deployment require the owner's explicit permission.

## Evidence boundaries

The 25/38 to 35/38 result is an evaluation of 38 examples, not a production accuracy or independent held-out benchmark claim. Hami implementation and local evaluation are described without claiming all recent changes are deployed. Do not add user counts, revenue, RAG expertise, model training or security guarantees. Commercial experience remains Frontend Developer; the target title is Full-Stack AI Engineer.

## Rebuild documents

`scripts/cv.json` is the source of truth. `python scripts/build_cv.py --out-dir <directory>` requires python-docx and writes the DOCX plus `scripts/cv-print.html`. Export the DOCX to PDF with LibreOffice and inspect the output before copying it to `public/Shokhrukhbek_Ganiev_CV.pdf`. Publish the matching DOCX as `public/Shokhrukhbek_Ganiev_CV.docx`. Both assets are English; the portfolio copy is localized.

## Validation — 2026-11-03

- `pnpm exec nuxi generate` succeeds; 11 prerendered routes. Non-fatal Nuxt/Tailwind sourcemap and i18n parent-scope warnings remain.
- Desktop (1440 px), tablet (768 px), mobile (390 px), plus 320 px overflow checks across ru/en/uz. New content and download controls are visible; no console errors.
- Reduced motion enables `js no-anim`; zero hidden reveal elements. Public page text and prerendered HTML contain no Alif name.
- PDF: one page, all resume paragraphs extract correctly, six working hyperlink annotations. DOCX uses paragraphs, not layout tables. Both rendered visually with LibreOffice.
- Download URLs return the correct PDF/DOCX MIME types and identical bytes to the delivered files. Browser PDF and Word downloads succeed; the hero case-study button scrolls to Hamyonimda.
- THE LOOP could not complete automated video critique: its MCP vision provider is not configured. Browser screenshots and reduced-motion checks were completed separately.

Production is unchanged until the owner authorizes the specific push and deployment.

## Update — 2026-11-17

Owner requested publishing the revised CV and site. Positioning is Full-Stack Developer with AI integrations, not a model-training role. Added daily Claude Code/Codex and AI-agent workflows, window-tinting permits with MyGov, November 2023 frontend start and July 2026 Go responsibilities. Removed internal Alif figures and unsupported incident/uptime/latency claims. Existing Hamyonimda evaluation is explicitly scoped to 38 examples.

Validation: Nuxt static generation (11 routes) and git diff whitespace checks pass. PDF renders as a legible single page; updated Word is generated from the same JSON. Desktop and 390px mobile browser visual checks pass; no horizontal overflow or browser console errors observed. No automated tests/lint are configured. Nuxt typecheck is blocked by the repository's missing root tsconfig.json, not reported as passed.
