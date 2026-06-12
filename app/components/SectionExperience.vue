<script setup lang="ts">
import { experience } from '~/data/content'

const { gsap } = useGsap()

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined

onMounted(() => {
  if (!root.value || prefersReducedMotion()) return

  ctx = gsap.context(() => {
    const mm = gsap.matchMedia()

    // pin the company column while highlights scroll (sticky won't work inside ScrollSmoother's transform)
    mm.add('(min-width: 768px)', () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: '.exp-pin',
          start: 'top 112px',
          endTrigger: '.exp-list',
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
        },
      })
    })

    // progress line grows with scroll through the list
    gsap.fromTo(
      '.exp-progress',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top center',
        scrollTrigger: { trigger: '.exp-list', start: 'top 70%', end: 'bottom 70%', scrub: true },
      },
    )

    // highlight cards reveal
    gsap.utils.toArray<HTMLElement>('.exp-card').forEach((card) => {
      gsap.set(card, { visibility: 'visible' })
      gsap.from(card, {
        autoAlpha: 0,
        y: 56,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 82%' },
      })
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="experience" ref="root" class="relative bg-ink-2/60 py-28 md:py-40">
    <div class="mx-auto max-w-7xl px-5 md:px-10">
      <p class="label-mono mb-10 md:mb-16">02 / Experience</p>

      <div class="grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20">
        <!-- pinned company column -->
        <div>
          <div class="exp-pin">
            <h2 class="display text-4xl md:text-6xl">{{ experience.role }}</h2>
            <p class="mt-4 font-mono text-sm uppercase tracking-[0.15em] text-lime">
              {{ experience.company }} · {{ experience.place }}
            </p>
            <p class="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-muted">
              {{ experience.period }}
            </p>
            <p class="mt-8 max-w-sm leading-relaxed text-muted">{{ experience.intro }}</p>
          </div>
        </div>

        <!-- highlights -->
        <div class="relative">
          <div class="absolute -left-5 top-0 hidden h-full w-px bg-line md:block" aria-hidden="true">
            <div class="exp-progress h-full w-px bg-lime" />
          </div>

          <ul class="exp-list space-y-6">
            <li
              v-for="item in experience.highlights"
              :key="item.index"
              class="exp-card group rounded-lg border border-line bg-ink p-7 transition-colors duration-300 gs-reveal hover:border-lime/40 md:p-9"
            >
              <div class="flex items-baseline gap-4">
                <span class="font-mono text-xs text-lime">{{ item.index }}</span>
                <h3 class="display text-xl text-body md:text-2xl">{{ item.title }}</h3>
              </div>
              <p class="mt-4 leading-relaxed text-muted">{{ item.body }}</p>
              <ul class="mt-5 flex flex-wrap gap-2">
                <li
                  v-for="tag in item.tags"
                  :key="tag"
                  class="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors duration-300 group-hover:border-lime/30 group-hover:text-lime"
                >
                  {{ tag }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
