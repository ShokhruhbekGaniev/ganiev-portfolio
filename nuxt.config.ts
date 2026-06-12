import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-06-13',
  devtools: { enabled: false },

  modules: ['@nuxtjs/i18n'],

  i18n: {
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json' },
      { code: 'uz', language: 'uz-UZ', name: 'O‘zbekcha', file: 'uz.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    baseUrl: 'https://ganiev-portfolio.pages.dev',
    detectBrowserLanguage: false,
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      // set NUXT_PUBLIC_WEB3FORMS_KEY in the build environment to enable the contact form
      web3formsKey: '',
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Shokhrukhbek Ganiev — Frontend Engineer',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Frontend Engineer in Tashkent. Vue 3 + TypeScript in fintech: SME financing products, E-IMZO / MyID / KATM integrations, real-time dashboards, performance engineering.',
        },
        { property: 'og:title', content: 'Shokhrukhbek Ganiev — Frontend Engineer' },
        {
          property: 'og:description',
          content:
            'Frontend Engineer building fintech products with Vue 3 + TypeScript. Creator of Hamyonimda — voice AI finance tracker.',
        },
        { property: 'og:type', content: 'website' },
      ],
      script: [
        {
          // before paint: mark JS available, restore theme, honor reduced motion
          innerHTML: `(function(){var d=document.documentElement;d.classList.add('js');try{if(localStorage.getItem('theme')==='light')d.classList.add('light')}catch(e){}if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('no-anim')})()`,
          tagPosition: 'head',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://api.fontshare.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=JetBrains+Mono:wght@400;500;700&display=swap',
        },
      ],
    },
  },

  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
})
