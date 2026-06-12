<script setup lang="ts">
import { profile } from '~/data/content'

const { gsap, SplitText } = useGsap()

const root = ref<HTMLElement | null>(null)
const orb = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined

onMounted(() => {
  if (!root.value || prefersReducedMotion()) return

  ctx = gsap.context(() => {
    // --- load choreography -------------------------------------------------
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    document.fonts.ready.then(() => {
      const first = SplitText.create('.hero-name-first', { type: 'chars', mask: 'chars' })
      const last = SplitText.create('.hero-name-last', { type: 'chars', mask: 'chars' })

      gsap.set(['.hero-name-first', '.hero-name-last'], { visibility: 'visible' })

      tl.from(first.chars, { yPercent: 110, duration: 1.1, stagger: 0.035 })
        .from(last.chars, { yPercent: 110, duration: 1.1, stagger: 0.035 }, '-=0.85')
        .fromTo('.hero-meta', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 }, '-=0.6')
        .fromTo('.hero-marquee', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, '-=0.4')
        .fromTo('.hero-scroll-hint', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, '-=0.2')
    })

    // --- infinite marquee ---------------------------------------------------
    gsap.to('.hero-marquee .marquee-track', {
      xPercent: -50,
      duration: 28,
      ease: 'none',
      repeat: -1,
    })

    // --- parallax drift on scroll out ----------------------------------------
    gsap.to('.hero-inner', {
      yPercent: -12,
      autoAlpha: 0.25,
      ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true },
    })

    // --- mouse-follow glow orb ----------------------------------------------
    if (orb.value && matchMedia('(pointer: fine)').matches) {
      const xTo = gsap.quickTo(orb.value, 'x', { duration: 0.9, ease: 'power3' })
      const yTo = gsap.quickTo(orb.value, 'y', { duration: 0.9, ease: 'power3' })
      window.addEventListener('mousemove', (e) => {
        xTo(e.clientX)
        yTo(e.clientY)
      })
    }
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="hero" ref="root" class="relative flex min-h-svh flex-col justify-center overflow-hidden">
    <!-- atmospheric glow -->
    <div
      ref="orb"
      class="pointer-events-none absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full blur-[120px]"
      style="background: var(--glow)"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute right-[-10%] top-[15%] h-[28rem] w-[28rem] rounded-full blur-[140px] opacity-60"
      style="background: var(--glow)"
      aria-hidden="true"
    />

    <div class="hero-inner mx-auto w-full max-w-7xl px-5 pt-24 md:px-10">
      <p class="hero-meta label-mono mb-6 gs-reveal">
        {{ profile.role }} · {{ profile.location }}
      </p>

      <h1
        class="display text-[clamp(2rem,10vw,8.6rem)] leading-[0.9] tracking-[-0.03em]"
        style="font-kerning: none; text-rendering: optimizeSpeed"
      >
        <span class="hero-name-first block whitespace-nowrap gs-reveal">SHOKHRUKHBEK</span>
        <span class="hero-name-last block whitespace-nowrap text-lime gs-reveal">GANIEV</span>
      </h1>

      <div class="mt-10 flex flex-col gap-6 md:mt-14 md:flex-row md:items-end md:justify-between">
        <p class="hero-meta max-w-md text-base leading-relaxed text-muted gs-reveal md:text-lg">
          Building fintech products that move real money — with Vue, TypeScript and an obsession for detail.
        </p>
        <p class="hero-meta font-mono text-xs uppercase tracking-[0.2em] text-muted gs-reveal">
          Open to opportunities
        </p>
      </div>
    </div>

    <!-- rotating words marquee -->
    <div class="hero-marquee mt-16 overflow-hidden border-y border-line py-4 gs-reveal md:mt-20" aria-hidden="true">
      <div class="marquee-track">
        <span
          v-for="(word, i) in [...profile.heroWords, ...profile.heroWords]"
          :key="i"
          class="flex items-center whitespace-nowrap px-6 font-mono text-sm uppercase tracking-[0.2em] text-muted"
        >
          {{ word }}
          <span class="ml-12 inline-block h-1.5 w-1.5 rounded-full bg-lime" />
        </span>
      </div>
    </div>

    <p class="hero-scroll-hint absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted gs-reveal">
      Scroll
    </p>
  </section>
</template>
