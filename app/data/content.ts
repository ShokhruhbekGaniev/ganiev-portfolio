export const profile = {
  name: 'Shokhrukhbek Ganiev',
  role: 'Frontend Engineer',
  location: 'Tashkent, Uzbekistan',
  email: 'shohchik9999@gmail.com',
  telegram: 'https://t.me/sh_ganiev',
  github: 'https://github.com/ShokhruhbekGaniev',
  linkedin: 'https://linkedin.com/in/shokhrukhbek-ganiev',
  summary: [
    'I build financial products people trust with their money.',
    '2.5+ years engineering enterprise fintech systems in Vue 3 and TypeScript — from SME financing platforms built from scratch to national-scale integrations like digital signatures and credit bureaus.',
    'I obsess over architecture, performance budgets and the small details that make complex workflows feel effortless.',
  ],
  stats: [
    { value: 2.5, suffix: '+', label: 'years in fintech' },
    { value: 134, suffix: '', label: 'tasks shipped' },
    { value: 9, suffix: '', label: 'product teams' },
    { value: 87, suffix: '%', label: 'a11y score (from 66%)' },
  ],
  heroWords: ['Vue 3', 'TypeScript', 'Nuxt', 'Fintech', 'GSAP', 'Performance', 'Architecture', 'Go'],
}

export const experience = {
  company: 'Fintech Company',
  role: 'Frontend Developer',
  period: 'Nov 2023 — Present',
  place: 'Tashkent',
  intro:
    'Member of the frontend engineering team building enterprise admin panels, management systems and client-facing financial products across 9 product teams.',
  highlights: [
    {
      index: '01',
      title: 'SME financing product — from zero',
      body: 'Built a complete production web application frontend from scratch with Vue 3 + TypeScript + Pinia: component hierarchy, routing, state architecture, multi-step application forms with conditional logic and full draft-to-approval lifecycle.',
      tags: ['Vue 3', 'TypeScript', 'Pinia'],
    },
    {
      index: '02',
      title: 'National service integrations',
      body: 'Integrated E-IMZO digital signatures for legally binding document flows, MyID identification for client verification, and KATM credit bureau reports — studied the specs from scratch and shipped them into production review workflows.',
      tags: ['E-IMZO', 'MyID', 'KATM'],
    },
    {
      index: '03',
      title: 'Real-time & performance',
      body: 'WebSocket live dashboards for card operations and transactions. Lighthouse performance 54% → 74%, accessibility 66% → 87%. Set up Lighthouse CI quality gates in GitHub Actions — PRs are blocked when budgets are exceeded.',
      tags: ['WebSocket', 'Lighthouse CI', 'Web Vitals'],
    },
    {
      index: '04',
      title: 'Complex financial logic',
      body: 'Multi-limit business logic: 5 limit types with monthly calculations, freeze/unfreeze, scoring integration and a limit increase calculator. Compliance modules: auto-review workflows, fraud detection ticket system, cash-hold management.',
      tags: ['Business logic', 'Compliance', 'Risk'],
    },
    {
      index: '05',
      title: 'Developer experience',
      body: 'Published an internal MCP server npm package exposing the company UI library to AI tools. Led ESLint standardization with zero-warnings CI policy. Migrated builds from Vue CLI to Vite. Delivered RU/UZ multilingual UI.',
      tags: ['MCP', 'ESLint', 'Vite', 'i18n'],
    },
  ],
}

export const projects = [
  {
    name: 'Hamyonimda',
    url: 'https://hamyonimda.uz',
    domain: 'hamyonimda.uz',
    badge: 'Own product',
    description:
      'Voice AI personal finance tracker. Speak an expense to a Telegram bot — AI parses the amount and category, everything lands in a Mini App and web dashboard.',
    stack: ['Go', 'Vue 3', 'Telegram Mini App', 'AI / STT'],
    accent: true,
  },
  {
    name: 'Skale',
    url: 'https://skale.uz',
    domain: 'skale.uz',
    badge: 'Agency site',
    description:
      'Conversion-focused site for a Tashkent growth-marketing agency: 3D dispersed glass hero, scroll choreography, static-export pipeline.',
    stack: ['Next.js', 'R3F', 'GSAP', 'Lenis'],
    accent: false,
  },
  {
    name: 'FIDES',
    url: 'https://globalfides.com',
    domain: 'globalfides.com',
    badge: 'Platform',
    description:
      'Medical tourism platform for Uzbekistan — accredited clinics, English-speaking doctors, transparent pricing and end-to-end concierge support.',
    stack: ['Nuxt', 'Vue 3', 'Tailwind', 'i18n'],
    accent: false,
  },
]

export const skills = [
  {
    group: 'Core',
    items: ['Vue 3 · Composition API', 'TypeScript', 'Nuxt 3', 'Pinia', 'Vue Router', 'Vite'],
  },
  {
    group: 'UI & Styling',
    items: ['Tailwind CSS', 'shadcn-vue', 'GSAP', 'vee-validate + Zod', 'Figma'],
  },
  {
    group: 'Quality',
    items: ['Vitest', 'Vue Test Utils', 'ESLint', 'Lighthouse CI', 'Web Vitals'],
  },
  {
    group: 'Integrations',
    items: ['REST', 'WebSocket', 'Keycloak · OAuth2 · JWT', 'E-IMZO', 'MyID', 'KATM'],
  },
  {
    group: 'Beyond frontend',
    items: ['Go · REST APIs', 'PostgreSQL', 'Docker', 'Nginx', 'GitHub Actions'],
  },
]

export const marqueeRows = [
  ['Vue 3', 'TypeScript', 'Nuxt 3', 'Pinia', 'Tailwind', 'GSAP', 'Vite', 'Vitest'],
  ['WebSocket', 'E-IMZO', 'MyID', 'KATM', 'Keycloak', 'Go', 'PostgreSQL', 'Docker'],
]
