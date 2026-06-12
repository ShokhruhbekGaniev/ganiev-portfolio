<script setup lang="ts">
import { profile } from '~/data/content'

const { t } = useI18n()
const { gsap, SplitText } = useGsap()

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined

const socials = [
  { label: 'GitHub', href: profile.github },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'Email', href: `mailto:${profile.email}` },
]

onMounted(() => {
  if (!root.value || prefersReducedMotion()) return

  ctx = gsap.context(() => {
    document.fonts.ready.then(() => {
      const split = SplitText.create('.contact-title', { type: 'words', mask: 'words' })
      gsap.set('.contact-title', { visibility: 'visible' })
      gsap.from(split.words, {
        yPercent: 110,
        duration: 1,
        stagger: 0.06,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.contact-title', start: 'top 85%' },
      })
    })

    gsap.utils.toArray<HTMLElement>('.contact-reveal').forEach((el, i) => {
      gsap.set(el, { visibility: 'visible' })
      gsap.from(el, {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      })
    })

    // pulsing glow on the big CTA
    gsap.to('.tg-cta', {
      boxShadow: '0 0 60px 0 var(--lime-dim), 0 0 24px 0 var(--lime-dim)',
      duration: 1.6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section
    id="contact"
    ref="root"
    class="relative overflow-hidden pt-28 md:pt-40"
    style="background: color-mix(in srgb, var(--ink-2) 55%, transparent)"
  >
    <div class="mx-auto max-w-7xl px-5 md:px-10">
      <p class="label-mono mb-10 md:mb-16">{{ t('contact.label') }}</p>

      <i18n-t
        keypath="contact.title"
        tag="h2"
        class="contact-title display max-w-5xl text-5xl gs-reveal md:text-8xl"
      >
        <template #accent>
          <span class="text-lime">{{ t('contact.titleAccent') }}</span>
        </template>
      </i18n-t>

      <p class="contact-reveal mt-8 max-w-xl text-lg leading-relaxed text-muted gs-reveal md:text-xl">
        {{ t('contact.subtitle') }}
      </p>

      <div class="contact-reveal mt-12 flex flex-col items-start gap-6 pb-28 gs-reveal md:mt-16 md:flex-row md:items-center md:gap-8 md:pb-36">
        <a
          :href="profile.telegram"
          target="_blank"
          rel="noopener"
          data-magnetic
          class="tg-cta group inline-flex cursor-pointer items-center gap-4 rounded-full bg-lime px-10 py-5 font-mono text-base font-semibold uppercase tracking-[0.1em] text-[#0a0b0d] transition-opacity duration-200 hover:opacity-90 md:px-12 md:py-6 md:text-lg"
        >
          <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M11.94 2a10 10 0 1 0 .12 20 10 10 0 0 0-.12-20Zm4.9 6.8-1.65 7.78c-.12.55-.45.69-.91.43l-2.52-1.86-1.21 1.17c-.14.14-.25.25-.5.25l.18-2.56 4.65-4.2c.2-.18-.05-.28-.31-.1l-5.75 3.62-2.48-.77c-.54-.17-.55-.54.11-.8l9.7-3.73c.45-.17.84.1.69.77Z" />
          </svg>
          {{ t('contact.cta') }}
        </a>

        <span class="font-mono text-xs uppercase tracking-[0.2em] text-muted">{{ t('contact.or') }}</span>

        <div class="flex flex-wrap items-center gap-3">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.href"
            target="_blank"
            rel="noopener"
            data-magnetic
            class="inline-flex cursor-pointer items-center rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors duration-200 hover:border-lime/50 hover:text-lime"
          >
            {{ social.label }}
          </a>
          <a
            href="/Shokhrukhbek_Ganiev_CV.pdf"
            download
            data-magnetic
            class="inline-flex cursor-pointer items-center gap-2 rounded-full border border-lime/50 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-lime transition-colors duration-200 hover:bg-lime-dim"
          >
            {{ t('contact.downloadCv') }}
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <footer class="border-t border-line py-8">
      <div class="mx-auto flex max-w-7xl flex-col gap-2 px-5 font-mono text-xs text-muted md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {{ new Date().getFullYear() }} {{ profile.name }}</p>
        <p>{{ t('contact.footerBuilt') }}</p>
      </div>
    </footer>
  </section>
</template>
