# Product

<!-- impeccable:product-schema 1 -->

## Platform
web

## Users
### Recruiter / hiring manager
Opens the link from a CV, LinkedIn or Telegram message, mostly on a phone between other candidates; sometimes on a laptop during a shortlist review. Reads Russian or English. (inferred)

### Potential client (founder, agency, small business in Uzbekistan)
Comes from Telegram, the owner's content (@shokhdev_uz) or a referral; wants to know whether he can build their product and how to reach him. Russian or Uzbek. (inferred)

## Roles and Tasks
### Recruiter
1. Understand in under 30 seconds who he is: role, level, stack, city — every visit; done = can say "full-stack Vue/Go + AI, Tashkent".
2. Download or open the CV — most visits; done = PDF opened.
3. See proof of real work (a shipped product, numbers) — most visits; done = opened one case.
4. Contact him — once; done = Telegram or email opened.

### Client
1. See what he has built and whether it is close to their idea — every visit; done = read one project.
2. Judge quality (does this person ship polished, working products?) — every visit.
3. Write to him in Telegram — once; done = chat opened.

## Product Purpose
A personal site that turns a link into a shortlist decision or a Telegram conversation.

## Positioning
A full-stack developer who ships his own products end to end in Uzbekistan — Hamyonimda (voice finance tracker with an AI assistant, live) — and uses AI agents as everyday tooling. A neighbouring portfolio could not truthfully copy the shipped Hamyonimda case, the three-language product work (uz/ru/en) or the fintech background. (inferred from content.ts and i18n)

## Capabilities and Constraints
- Nuxt 4, Tailwind v4, GSAP; i18n ru/uz/en; dark and light themes; CV as PDF and DOCX.
- Single page with five sections: about, expertise, work, terminal, contact; command palette (Ctrl+K, Menu on mobile).
- Deployed on Cloudflare Pages.

## Brand Commitments
- Do not mention the employer by name in public content (owner rule for personal brand).
- Real copy only; numbers on the page must come from the owner's real history.

## Evidence on Hand
- Copy: `i18n/locales/{ru,uz,en}.json`; projects: `app/data/content.ts` (Hamyonimda, Skale, FIDES).
- CV: `public/Shokhrukhbek_Ganiev_CV.pdf`, `.docx`.
- Absent: photos of the owner, project screenshots, testimonials, logo. Do not invent them.

## Not Doing
Blog, case-study pages, contact form, analytics dashboard.
