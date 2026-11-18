<script setup lang="ts">
import { projects } from '~/data/content'

const { t } = useI18n()
const { gsap } = useGsap()

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined

onMounted(() => {
  if (!root.value || prefersReducedMotion()) return

  ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
      gsap.set(card, { visibility: 'visible' })
      gsap.from(card, {
        autoAlpha: 0,
        y: 80,
        duration: 0.9,
        delay: i * 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%' },
      })

      if (matchMedia('(pointer: fine)').matches) {
        const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3' })
        const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3' })
        gsap.set(card, { transformPerspective: 900 })
        card.addEventListener('mousemove', (e) => {
          const r = card.getBoundingClientRect()
          ry(gsap.utils.mapRange(0, r.width, -4, 4, e.clientX - r.left))
          rx(gsap.utils.mapRange(0, r.height, 3, -3, e.clientY - r.top))
        })
        card.addEventListener('mouseleave', () => {
          rx(0)
          ry(0)
        })
      }
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="work" ref="root" class="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
    <p class="label-mono mb-10 md:mb-16">{{ t('work.label') }}</p>

    <article id="hamyonimda" class="mb-8 scroll-mt-24 rounded-xl border border-lime/40 bg-lime-dim p-6 md:p-10 lg:p-12" aria-labelledby="hamyonimda-title">
      <div class="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <p class="label-mono">{{ t('work.caseStudy.eyebrow') }}</p>
          <h2 id="hamyonimda-title" class="display mt-6 text-4xl text-body md:text-6xl">Hamyonimda</h2>
          <p class="mt-5 max-w-xl text-lg leading-relaxed text-body">{{ t('work.caseStudy.intro') }}</p>
          <p class="mt-5 max-w-xl leading-relaxed text-muted">{{ t('work.caseStudy.ownership') }}</p>
          <a href="https://hamyonimda.uz" target="_blank" rel="noopener" class="mt-8 inline-flex min-h-11 items-center gap-3 rounded-full border border-lime/50 px-6 py-3 font-mono text-sm text-lime transition-colors hover:bg-lime-dim">
            {{ t('work.caseStudy.visit') }} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div class="space-y-7">
          <div>
            <h3 class="text-lg font-semibold text-body">{{ t('work.caseStudy.productTitle') }}</h3>
            <p class="mt-2 leading-relaxed text-muted">{{ t('work.caseStudy.productBody') }}</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-body">{{ t('work.caseStudy.aiTitle') }}</h3>
            <p class="mt-2 leading-relaxed text-muted">{{ t('work.caseStudy.aiBody') }}</p>
          </div>
          <div class="border-t border-lime/20 pt-6">
            <p class="display text-4xl text-lime md:text-5xl">25/38 <span class="text-muted" aria-hidden="true">→</span> 35/38</p>
            <p class="mt-3 text-sm leading-relaxed text-muted">{{ t('work.caseStudy.evaluation') }}</p>
          </div>
        </div>
      </div>
      <ul class="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-lime/20 pt-6 font-mono text-xs text-muted" aria-label="Technology stack">
        <li v-for="tech in ['Go', 'Vue / Nuxt', 'PostgreSQL', 'Redis / Asynq', 'LLM APIs', 'MCP', 'Docker / CI/CD']" :key="tech">{{ tech }}</li>
      </ul>
    </article>

    <div class="grid gap-6 md:grid-cols-2">
      <a
        v-for="project in projects.filter(p => !p.accent)"
        :key="project.name"
        :href="project.url"
        target="_blank"
        rel="noopener"
        class="project-card group relative flex flex-col rounded-xl border p-8 transition-colors duration-300 gs-reveal md:p-10"
        :class="project.accent ? 'border-lime/40 bg-lime-dim hover:border-lime' : 'border-line hover:border-lime/40'"
        :style="project.accent ? '' : 'background: var(--ink-2)'"
      >
        <div class="flex items-center justify-between">
          <span
            class="rounded-full px-3 py-1 font-mono text-xs uppercase tracking-wider"
            :class="project.accent ? 'bg-lime text-on-lime' : 'border border-line text-muted'"
          >
            {{ t(`work.${project.badgeKey}`) }}
          </span>
          <svg
            class="h-5 w-5 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-lime"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
          >
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </div>

        <h3 class="display mt-10 text-3xl text-body md:mt-14 md:text-4xl">{{ project.name }}</h3>
        <p class="mt-1 font-mono text-xs tracking-wider text-lime">{{ project.domain }}</p>
        <p class="mt-5 flex-1 leading-relaxed text-muted">{{ t(`work.projects.${project.descKey}`) }}</p>

        <ul class="mt-8 flex flex-wrap gap-2">
          <li
            v-for="tech in project.stack"
            :key="tech"
            class="rounded-full border border-line px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted"
          >
            {{ tech }}
          </li>
        </ul>
      </a>
    </div>
  </section>
</template>
