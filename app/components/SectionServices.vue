<script setup lang="ts">
const { t, tm, rt } = useI18n()
const { gsap } = useGsap()

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined

interface ServiceItem {
  title: string
  body: string
  tags: string[]
}

const items = computed<ServiceItem[]>(() =>
  (tm('services.items') as any[]).map((it) => ({
    title: rt(it.title),
    body: rt(it.body),
    tags: (it.tags as any[]).map((tag) => rt(tag)),
  })),
)

const pipelineSteps = computed<string[]>(() => (tm('services.pipeline') as any[]).map((s) => rt(s)))

const icons = [
  'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm4 4 3 3-3 3m5 0h4',
  'M4 7a8 8 0 0 1 16 0v10a8 8 0 0 1-16 0V7zm4 1h8m-8 4h8m-8 4h5',
  'm22 2-11 11m11-11-7 20-4-9-9-4 20-7z',
  'M5 12.55a11 11 0 0 1 14.08 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01M2 8.82a15 15 0 0 1 20 0',
]

onMounted(() => {
  if (!root.value || prefersReducedMotion()) return

  ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('.service-card').forEach((card, i) => {
      gsap.set(card, { visibility: 'visible' })
      gsap.from(card, {
        autoAlpha: 0,
        y: 64,
        duration: 0.8,
        delay: (i % 2) * 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 85%' },
      })
    })

    // looping deploy pipeline
    gsap.set('.pipeline-box', { visibility: 'visible' })
    gsap.from('.pipeline-box', {
      autoAlpha: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.pipeline-box', start: 'top 85%' },
    })

    // GSAP can't tween to var(--x) colors — resolve them once
    const css = getComputedStyle(document.documentElement)
    const limeColor = css.getPropertyValue('--lime').trim()
    const mutedColor = css.getPropertyValue('--text-muted').trim()
    const dotIdle = css.getPropertyValue('--ink-3').trim()

    const steps = gsap.utils.toArray<HTMLElement>('.pipe-step')
    const bars = gsap.utils.toArray<HTMLElement>('.pipe-bar-fill')
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1.6,
      scrollTrigger: { trigger: '.pipeline-box', start: 'top 85%', toggleActions: 'play pause resume pause' },
    })
    steps.forEach((step, i) => {
      tl.to(step, { color: limeColor, duration: 0.25 }, i === 0 ? 0.4 : '>')
        .to(step.querySelector('.pipe-dot'), { backgroundColor: limeColor, scale: 1.4, duration: 0.25 }, '<')
      if (bars[i]) tl.fromTo(bars[i], { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center', duration: 0.7, ease: 'power1.inOut' })
    })
    tl.to('.pipe-live', { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' })
      .to({}, { duration: 1.2 })
      .set(steps, { color: mutedColor })
      .set('.pipe-dot', { backgroundColor: dotIdle, scale: 1 })
      .set(bars, { scaleX: 0 })
      .set('.pipe-live', { autoAlpha: 0, scale: 0.8 })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="services" ref="root" class="relative py-28 md:py-40" style="background: color-mix(in srgb, var(--ink-2) 55%, transparent)">
    <div class="mx-auto max-w-7xl px-5 md:px-10">
      <p class="label-mono mb-6 md:mb-10">{{ t('services.label') }}</p>
      <h2 class="display mb-14 max-w-3xl text-4xl md:mb-20 md:text-6xl">{{ t('services.title') }}</h2>

      <div class="grid gap-6 md:grid-cols-2">
        <article
          v-for="(item, i) in items"
          :key="i"
          class="service-card group rounded-xl border border-line p-8 transition-colors duration-300 gs-reveal hover:border-lime/40 md:p-10"
          style="background: var(--ink)"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-lime-dim">
            <svg class="h-6 w-6 text-lime" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path :d="icons[i]" />
            </svg>
          </div>
          <h3 class="display mt-7 text-2xl text-body md:text-3xl">{{ item.title }}</h3>
          <p class="mt-4 leading-relaxed text-muted">{{ item.body }}</p>
          <ul class="mt-6 flex flex-wrap gap-2">
            <li
              v-for="tag in item.tags"
              :key="tag"
              class="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors duration-300 group-hover:border-lime/30 group-hover:text-lime"
            >
              {{ tag }}
            </li>
          </ul>
        </article>
      </div>

      <!-- deploy pipeline -->
      <div
        class="pipeline-box mt-10 rounded-xl border border-line p-8 gs-reveal md:p-10"
        style="background: var(--ink)"
      >
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-muted">{{ t('services.pipelineTitle') }}</p>
        <div class="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:gap-0">
          <template v-for="(step, i) in pipelineSteps" :key="i">
            <div class="pipe-step flex items-center gap-3 font-mono text-sm text-muted md:shrink-0">
              <span class="pipe-dot h-2.5 w-2.5 rounded-full transition-transform" style="background: var(--ink-3)" />
              <span :class="i === 0 ? 'text-lime' : ''">{{ step }}</span>
              <span v-if="i === pipelineSteps.length - 1" class="pipe-live ml-1 inline-flex scale-75 items-center gap-1.5 rounded-full bg-lime px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0a0b0d] opacity-0">
                <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0a0b0d]" />
                live
              </span>
            </div>
            <div v-if="i < pipelineSteps.length - 1" class="pipe-bar relative ml-1 hidden h-px flex-1 md:mx-4 md:block" style="background: var(--line)">
              <div class="pipe-bar-fill absolute inset-0 origin-left scale-x-0 bg-lime" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
