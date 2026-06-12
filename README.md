# ganiev-portfolio

Personal CV / portfolio site for **Shokhrukhbek Ganiev** — Frontend Engineer, Tashkent.

**Stack:** Nuxt 4 (SSG) · Vue 3.5 · TypeScript · Tailwind CSS v4 · GSAP (ScrollTrigger, ScrollSmoother, SplitText)

## Development

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm generate     # static build → .output/public
```

## Contact form

Set `NUXT_PUBLIC_WEB3FORMS_KEY` (free key from [web3forms.com](https://web3forms.com)) in the build
environment. Without it, the form falls back to a `mailto:` link.

## CV PDF

`public/Shokhrukhbek_Ganiev_CV.pdf` is rendered from `scripts/cv-print.html`:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
  --no-pdf-header-footer --print-to-pdf=public/Shokhrukhbek_Ganiev_CV.pdf \
  "file://$PWD/scripts/cv-print.html"
```

## Deploy — Cloudflare Pages

- Build command: `pnpm generate`
- Output directory: `.output/public`
- Env: `NUXT_PUBLIC_WEB3FORMS_KEY`

Design spec: [docs/design-spec.md](docs/design-spec.md)
