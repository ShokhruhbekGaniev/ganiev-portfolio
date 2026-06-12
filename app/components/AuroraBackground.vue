<script setup lang="ts">
const { gsap } = useGsap()

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined

onMounted(() => {
  if (!root.value || prefersReducedMotion()) return

  ctx = gsap.context(() => {
    // slow organic drift, unique per blob
    gsap.utils.toArray<HTMLElement>('.aurora-blob').forEach((blob, i) => {
      gsap.to(blob, {
        xPercent: () => gsap.utils.random(-25, 25),
        yPercent: () => gsap.utils.random(-20, 20),
        scale: () => gsap.utils.random(0.85, 1.25),
        duration: () => gsap.utils.random(14, 22),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
        delay: i * 1.5,
      })
    })

    // gentle parallax against scroll
    gsap.to('.aurora-group', {
      yPercent: -14,
      ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'max', scrub: 1.2 },
    })

    // cursor influence
    if (matchMedia('(pointer: fine)').matches) {
      const xTo = gsap.quickTo('.aurora-group', 'x', { duration: 2.2, ease: 'power2' })
      const yTo = gsap.quickTo('.aurora-group', 'y', { duration: 2.2, ease: 'power2' })
      window.addEventListener('mousemove', (e) => {
        xTo(gsap.utils.mapRange(0, window.innerWidth, -36, 36, e.clientX))
        yTo(gsap.utils.mapRange(0, window.innerHeight, -24, 24, e.clientY))
      })
    }
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <div ref="root" class="aurora-layer" aria-hidden="true">
    <div class="aurora-group absolute inset-0">
      <div class="aurora-blob h-[42rem] w-[42rem] -top-40 -left-32" style="background: var(--aurora-1)" />
      <div class="aurora-blob h-[36rem] w-[36rem] top-[30%] right-[-12%]" style="background: var(--aurora-2)" />
      <div class="aurora-blob h-[30rem] w-[30rem] bottom-[-10%] left-[20%]" style="background: var(--aurora-3)" />
      <div class="aurora-blob h-[24rem] w-[24rem] top-[58%] left-[-8%]" style="background: var(--aurora-2)" />
    </div>
  </div>
</template>
