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

/** shared ScrollTrigger config: demo loops run only while the card is on screen */
function demoTrigger(sel: string) {
  return { trigger: sel, start: 'top 88%', toggleActions: 'play pause resume pause' } as const
}

onMounted(() => {
  if (!root.value || prefersReducedMotion()) return

  ctx = gsap.context(() => {
    // card entrances
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

    // ---- demo 1: site assembles itself -----------------------------------
    {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4, scrollTrigger: demoTrigger('.demo-site') })
      tl.from('.demo-site .sk', {
        autoAlpha: 0,
        y: 10,
        scale: 0.96,
        transformOrigin: 'left top',
        duration: 0.4,
        stagger: 0.22,
        ease: 'power2.out',
      })
        .to('.demo-site .sk-cursor', { autoAlpha: 1, duration: 0.2 })
        .to('.demo-site .sk-cursor', { x: -10, y: -8, duration: 0.6, ease: 'power2.inOut' })
        .to('.demo-site .sk-btn', { scale: 0.92, duration: 0.1 })
        .to('.demo-site .sk-btn', { scale: 1, backgroundColor: '#c6f432', color: '#0a0b0d', duration: 0.25 })
        .to({}, { duration: 1 })
        .to('.demo-site .sk, .demo-site .sk-cursor', { autoAlpha: 0, duration: 0.4 })
    }

    // ---- demo 2: API request types itself --------------------------------
    {
      const lines = gsap.utils.toArray<HTMLElement>('.demo-api .api-line')
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6, scrollTrigger: demoTrigger('.demo-api') })
      lines.forEach((line) => {
        tl.set(line, { autoAlpha: 1 }).fromTo(
          line,
          { width: 0 },
          { width: 'auto', duration: 0.55, ease: 'steps(18)' },
        )
      })
      tl.to({}, { duration: 1.4 }).to(lines, { autoAlpha: 0, duration: 0.35, onComplete: () => gsap.set(lines, { width: 0 }) })
    }

    // ---- demo 3: telegram chat ---------------------------------------------
    {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6, scrollTrigger: demoTrigger('.demo-chat') })
      tl.from('.demo-chat .bubble-user', { autoAlpha: 0, y: 14, scale: 0.85, transformOrigin: 'right bottom', duration: 0.4, ease: 'back.out(1.7)' })
        .from('.demo-chat .bubble-typing', { autoAlpha: 0, duration: 0.25 }, '+=0.3')
        .to('.demo-chat .bubble-typing', { autoAlpha: 0, duration: 0.2 }, '+=0.7')
        .from('.demo-chat .bubble-bot', { autoAlpha: 0, y: 14, scale: 0.85, transformOrigin: 'left bottom', duration: 0.4, ease: 'back.out(1.7)' }, '<')
        .from('.demo-chat .bubble-paid', { autoAlpha: 0, y: 10, scale: 0.9, duration: 0.4, ease: 'back.out(2)' }, '+=0.5')
        .to({}, { duration: 1.4 })
        .to('.demo-chat .bubble', { autoAlpha: 0, duration: 0.35 })
    }

    // ---- demo 4: deploy pipeline ------------------------------------------
    {
      const rows = gsap.utils.toArray<HTMLElement>('.demo-deploy .dep-row')
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2, scrollTrigger: demoTrigger('.demo-deploy') })
      rows.forEach((row) => {
        const check = row.querySelector('.dep-check')
        tl.from(row, { autoAlpha: 0, x: -10, duration: 0.3, ease: 'power2.out' })
          .fromTo(check, { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'back.out(2.5)' }, '+=0.35')
      })
      tl.from('.demo-deploy .dep-status', { autoAlpha: 0, y: 8, duration: 0.4 }, '+=0.3')
        .to({}, { duration: 1.6 })
        .to([rows, '.demo-deploy .dep-status'], { autoAlpha: 0, duration: 0.35 })
    }
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
        <!-- ============ card 1: websites ============ -->
        <article class="service-card group overflow-hidden rounded-xl border border-line transition-colors duration-300 gs-reveal hover:border-lime/40" style="background: var(--ink)">
          <div class="demo-site relative h-44 border-b border-line p-4" aria-hidden="true">
            <!-- browser chrome -->
            <div class="flex h-full flex-col overflow-hidden rounded-lg border border-line" style="background: var(--ink-2)">
              <div class="flex items-center gap-1.5 border-b border-line px-3 py-2">
                <span class="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span class="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span class="h-2 w-2 rounded-full bg-[#28c840]" />
                <span class="ml-2 rounded bg-ink-3 px-2 py-0.5 font-mono text-[9px] text-muted">{{ t('services.demo.siteUrl') }}</span>
              </div>
              <div class="relative flex-1 p-2.5">
                <div class="sk mb-1.5 flex items-center justify-between">
                  <span class="h-1.5 w-10 rounded bg-ink-3" /><span class="flex gap-1"><span class="h-1.5 w-6 rounded bg-ink-3" /><span class="h-1.5 w-6 rounded bg-ink-3" /></span>
                </div>
                <div class="sk mb-1.5 h-5 w-3/4 rounded bg-ink-3" />
                <div class="sk mb-1 h-1.5 w-2/3 rounded bg-ink-3" />
                <div class="sk mb-2 h-1.5 w-1/2 rounded bg-ink-3" />
                <span class="sk sk-btn inline-block rounded-full border border-lime/60 px-2.5 py-0.5 font-mono text-[9px] text-lime">CTA →</span>
                <svg class="sk-cursor absolute bottom-2 right-8 h-4 w-4 text-body opacity-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="m5 3 14 8-6.5 1.5L9 19 5 3z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="p-7 md:p-8">
            <h3 class="display text-2xl text-body md:text-3xl">{{ items[0]!.title }}</h3>
            <p class="mt-3 leading-relaxed text-muted">{{ items[0]!.body }}</p>
            <ul class="mt-5 flex flex-wrap gap-2">
              <li v-for="tag in items[0]!.tags" :key="tag" class="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors duration-300 group-hover:border-lime/30 group-hover:text-lime">{{ tag }}</li>
            </ul>
          </div>
        </article>

        <!-- ============ card 2: backend / api ============ -->
        <article class="service-card group overflow-hidden rounded-xl border border-line transition-colors duration-300 gs-reveal hover:border-lime/40" style="background: var(--ink)">
          <div class="demo-api relative h-44 border-b border-line p-4" aria-hidden="true">
            <div class="flex h-full flex-col justify-center gap-2 overflow-hidden rounded-lg border border-line px-4 font-mono text-[11px] leading-relaxed" style="background: var(--ink-2)">
              <div class="api-line overflow-hidden whitespace-nowrap opacity-0"><span class="text-lime">❯</span> <span class="text-body">curl api.shop.uz/orders</span></div>
              <div class="api-line overflow-hidden whitespace-nowrap opacity-0"><span class="text-lime">200 OK</span> <span class="text-muted">· 12ms</span></div>
              <div class="api-line overflow-hidden whitespace-nowrap text-muted opacity-0">{ "orders": [...], "total": <span class="text-lime">142</span> }</div>
              <div class="api-line overflow-hidden whitespace-nowrap text-muted opacity-0">→ PostgreSQL · JWT ✓ · webhook sent</div>
            </div>
          </div>
          <div class="p-7 md:p-8">
            <h3 class="display text-2xl text-body md:text-3xl">{{ items[1]!.title }}</h3>
            <p class="mt-3 leading-relaxed text-muted">{{ items[1]!.body }}</p>
            <ul class="mt-5 flex flex-wrap gap-2">
              <li v-for="tag in items[1]!.tags" :key="tag" class="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors duration-300 group-hover:border-lime/30 group-hover:text-lime">{{ tag }}</li>
            </ul>
          </div>
        </article>

        <!-- ============ card 3: telegram bots ============ -->
        <article class="service-card group overflow-hidden rounded-xl border border-line transition-colors duration-300 gs-reveal hover:border-lime/40" style="background: var(--ink)">
          <div class="demo-chat relative h-44 border-b border-line p-4" aria-hidden="true">
            <div class="flex h-full flex-col justify-center gap-2 overflow-hidden rounded-lg border border-line px-4 text-[11px]" style="background: var(--ink-2)">
              <div class="bubble bubble-user self-end rounded-2xl rounded-br-sm px-3 py-1.5 text-[#0a0b0d]" style="background: var(--lime)">
                {{ t('services.demo.chatUser') }}
              </div>
              <div class="bubble bubble-typing self-start rounded-2xl rounded-bl-sm bg-ink-3 px-3 py-1.5 text-muted">
                <span class="inline-flex gap-0.5"><span class="animate-bounce">·</span><span class="animate-bounce [animation-delay:0.15s]">·</span><span class="animate-bounce [animation-delay:0.3s]">·</span></span>
              </div>
              <div class="bubble bubble-bot -mt-7 self-start rounded-2xl rounded-bl-sm bg-ink-3 px-3 py-1.5 text-body">
                {{ t('services.demo.chatBot') }}
              </div>
              <div class="bubble bubble-paid inline-flex items-center gap-1.5 self-center rounded-full border border-lime/50 px-3 py-1 font-mono text-[10px] text-lime">
                <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 13 4 4L19 7" /></svg>
                {{ t('services.demo.chatPaid') }}
              </div>
            </div>
          </div>
          <div class="p-7 md:p-8">
            <h3 class="display text-2xl text-body md:text-3xl">{{ items[2]!.title }}</h3>
            <p class="mt-3 leading-relaxed text-muted">{{ items[2]!.body }}</p>
            <ul class="mt-5 flex flex-wrap gap-2">
              <li v-for="tag in items[2]!.tags" :key="tag" class="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors duration-300 group-hover:border-lime/30 group-hover:text-lime">{{ tag }}</li>
            </ul>
          </div>
        </article>

        <!-- ============ card 4: deploy ============ -->
        <article class="service-card group overflow-hidden rounded-xl border border-line transition-colors duration-300 gs-reveal hover:border-lime/40" style="background: var(--ink)">
          <div class="demo-deploy relative h-44 border-b border-line p-4" aria-hidden="true">
            <div class="flex h-full flex-col justify-center gap-1.5 overflow-hidden rounded-lg border border-line px-4 font-mono text-[11px]" style="background: var(--ink-2)">
              <div class="dep-row flex items-center justify-between text-muted">
                <span><span class="text-lime">❯</span> git push origin main</span>
                <svg class="dep-check h-3.5 w-3.5 text-lime" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 13 4 4L19 7" /></svg>
              </div>
              <div class="dep-row flex items-center justify-between text-muted">
                <span>docker build · 24s</span>
                <svg class="dep-check h-3.5 w-3.5 text-lime" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 13 4 4L19 7" /></svg>
              </div>
              <div class="dep-row flex items-center justify-between text-muted">
                <span>nginx reload · ssl ✓</span>
                <svg class="dep-check h-3.5 w-3.5 text-lime" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 13 4 4L19 7" /></svg>
              </div>
              <div class="dep-status mt-1 inline-flex items-center gap-2 self-start rounded-full bg-lime-dim px-3 py-1 text-[10px] text-lime">
                <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
                online · uptime 99.9%
              </div>
            </div>
          </div>
          <div class="p-7 md:p-8">
            <h3 class="display text-2xl text-body md:text-3xl">{{ items[3]!.title }}</h3>
            <p class="mt-3 leading-relaxed text-muted">{{ items[3]!.body }}</p>
            <ul class="mt-5 flex flex-wrap gap-2">
              <li v-for="tag in items[3]!.tags" :key="tag" class="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors duration-300 group-hover:border-lime/30 group-hover:text-lime">{{ tag }}</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
