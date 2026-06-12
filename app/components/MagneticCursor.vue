<script setup lang="ts">
const { gsap } = useGsap()

const enabled = ref(false)
let cleanup: (() => void) | null = null

onMounted(() => {
  if (prefersReducedMotion() || !matchMedia('(pointer: fine)').matches) return
  enabled.value = true

  nextTick(() => {
    const dot = document.querySelector('.cursor-dot') as HTMLElement
    const ring = document.querySelector('.cursor-ring') as HTMLElement
    if (!dot || !ring) return

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 })

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' })

    const move = (e: MouseEvent) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    // ring grows over interactive elements
    const over = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement).closest('a, button, input, textarea, [data-magnetic]')
      gsap.to(ring, { scale: interactive ? 1.8 : 1, opacity: interactive ? 0.9 : 0.45, duration: 0.3 })
    }

    // magnetic pull on tagged elements
    const magnets = gsap.utils.toArray<HTMLElement>('[data-magnetic]')
    const magnetHandlers: Array<[HTMLElement, (e: MouseEvent) => void, () => void]> = []
    magnets.forEach((el) => {
      const mx = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' })
      const my = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' })
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        mx((e.clientX - (r.left + r.width / 2)) * 0.3)
        my((e.clientY - (r.top + r.height / 2)) * 0.3)
      }
      const onLeave = () => {
        mx(0)
        my(0)
      }
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      magnetHandlers.push([el, onMove, onLeave])
    })

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)

    cleanup = () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      magnetHandlers.forEach(([el, onMove, onLeave]) => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  })
})

onUnmounted(() => cleanup?.())
</script>

<template>
  <ClientOnly>
    <div v-if="enabled" aria-hidden="true">
      <div class="cursor-dot" />
      <div class="cursor-ring" />
    </div>
  </ClientOnly>
</template>
