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

    <div class="grid gap-6 lg:grid-cols-3">
      <a
        v-for="project in projects"
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
            class="rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider"
            :class="project.accent ? 'bg-lime text-[#0a0b0d]' : 'border border-line text-muted'"
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
            class="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted"
          >
            {{ tech }}
          </li>
        </ul>
      </a>
    </div>
  </section>
</template>
