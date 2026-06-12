<script setup lang="ts">
import { skills, marqueeRows } from '~/data/content'

const { gsap } = useGsap()

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined

onMounted(() => {
  if (!root.value || prefersReducedMotion()) return

  ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('.skill-group').forEach((group, i) => {
      gsap.set(group, { visibility: 'visible' })
      gsap.from(group, {
        autoAlpha: 0,
        y: 48,
        duration: 0.8,
        delay: i * 0.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: group, start: 'top 85%' },
      })
    })

    // opposing marquees, speed tied to scroll velocity feel via plain loops
    gsap.to('.skills-marquee-a .marquee-track', { xPercent: -50, duration: 32, ease: 'none', repeat: -1 })
    gsap.fromTo(
      '.skills-marquee-b .marquee-track',
      { xPercent: -50 },
      { xPercent: 0, duration: 32, ease: 'none', repeat: -1 },
    )
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="skills" ref="root" class="relative py-28 md:py-40">
    <div class="mx-auto max-w-7xl px-5 md:px-10">
      <p class="label-mono mb-10 md:mb-16">04 / Toolbox</p>

      <div class="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
        <div
          v-for="group in skills"
          :key="group.group"
          class="skill-group bg-ink p-6 gs-reveal md:p-7"
        >
          <h3 class="font-mono text-xs uppercase tracking-[0.18em] text-lime">{{ group.group }}</h3>
          <ul class="mt-5 space-y-2.5">
            <li v-for="item in group.items" :key="item" class="text-sm leading-snug text-muted">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- opposing marquees -->
    <div class="mt-20 space-y-3 md:mt-28" aria-hidden="true">
      <div class="skills-marquee-a overflow-hidden border-y border-line py-3">
        <div class="marquee-track">
          <span
            v-for="(item, i) in [...marqueeRows[0]!, ...marqueeRows[0]!]"
            :key="i"
            class="display whitespace-nowrap px-8 text-2xl text-body/70 md:text-3xl"
          >
            {{ item }} <span class="text-lime">·</span>
          </span>
        </div>
      </div>
      <div class="skills-marquee-b overflow-hidden border-b border-line py-3">
        <div class="marquee-track">
          <span
            v-for="(item, i) in [...marqueeRows[1]!, ...marqueeRows[1]!]"
            :key="i"
            class="display whitespace-nowrap px-8 text-2xl text-muted/60 md:text-3xl"
          >
            {{ item }} <span class="text-lime">·</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
