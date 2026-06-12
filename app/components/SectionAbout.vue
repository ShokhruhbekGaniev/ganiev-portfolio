<script setup lang="ts">
import { profile } from '~/data/content'

const { gsap, SplitText } = useGsap()

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined

onMounted(() => {
  if (!root.value || prefersReducedMotion()) return

  ctx = gsap.context(() => {
    document.fonts.ready.then(() => {
      // manifest lines reveal with scrub
      gsap.utils.toArray<HTMLElement>('.about-line').forEach((el) => {
        const split = SplitText.create(el, { type: 'lines', mask: 'lines' })
        gsap.set(el, { visibility: 'visible' })
        gsap.from(split.lines, {
          yPercent: 105,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        })
      })
    })

    // counters
    gsap.utils.toArray<HTMLElement>('.stat-value').forEach((el) => {
      const target = parseFloat(el.dataset.value || '0')
      const decimals = target % 1 !== 0 ? 1 : 0
      const counter = { v: 0 }
      gsap.set(el.closest('.stat'), { visibility: 'visible' })
      gsap.fromTo(
        el.closest('.stat'),
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } },
      )
      gsap.to(counter, {
        v: target,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
        onUpdate: () => {
          el.textContent = counter.v.toFixed(decimals)
        },
      })
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="about" ref="root" class="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
    <p class="label-mono mb-10 md:mb-16">01 / About</p>

    <div class="max-w-4xl space-y-8">
      <p class="about-line display text-3xl text-body gs-reveal md:text-5xl" style="line-height: 1.15">
        {{ profile.summary[0] }}
      </p>
      <p class="about-line text-lg leading-relaxed text-muted gs-reveal md:text-xl">
        {{ profile.summary[1] }}
      </p>
      <p class="about-line text-lg leading-relaxed text-muted gs-reveal md:text-xl">
        {{ profile.summary[2] }}
      </p>
    </div>

    <dl class="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4">
      <div
        v-for="stat in profile.stats"
        :key="stat.label"
        class="stat bg-ink p-6 gs-reveal md:p-8"
      >
        <dd class="display text-4xl text-lime md:text-5xl">
          <span class="stat-value" :data-value="stat.value">{{ stat.value }}</span>{{ stat.suffix }}
        </dd>
        <dt class="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-muted">{{ stat.label }}</dt>
      </div>
    </dl>
  </section>
</template>
