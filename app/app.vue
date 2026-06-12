<script setup lang="ts">
const { gsap, ScrollSmoother } = useGsap()

let smoother: globalThis.ScrollSmoother | null = null

// konami easter egg: lime matrix rain
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
let konamiIdx = 0
const matrixOn = ref(false)

function onKonami(e: KeyboardEvent) {
  konamiIdx = e.key === KONAMI[konamiIdx] ? konamiIdx + 1 : e.key === KONAMI[0] ? 1 : 0
  if (konamiIdx === KONAMI.length) {
    konamiIdx = 0
    runMatrix()
  }
}

function runMatrix() {
  if (matrixOn.value) return
  matrixOn.value = true
  nextTick(() => {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement
    if (!canvas) return
    canvas.width = innerWidth
    canvas.height = innerHeight
    const ctx2d = canvas.getContext('2d')!
    const cols = Math.floor(innerWidth / 16)
    const drops = Array(cols).fill(0)
    const chars = 'GANIEV01<>/{}=#$'
    const timer = setInterval(() => {
      ctx2d.fillStyle = 'rgba(10, 11, 13, 0.12)'
      ctx2d.fillRect(0, 0, canvas.width, canvas.height)
      ctx2d.fillStyle = '#c6f432'
      ctx2d.font = '14px JetBrains Mono, monospace'
      drops.forEach((y, i) => {
        ctx2d.fillText(chars[Math.floor(Math.random() * chars.length)]!, i * 16, y * 16)
        drops[i] = y * 16 > canvas.height && Math.random() > 0.97 ? 0 : y + 1
      })
    }, 50)
    setTimeout(() => {
      clearInterval(timer)
      gsap.to(canvas, { autoAlpha: 0, duration: 0.8, onComplete: () => (matrixOn.value = false) })
    }, 6000)
  })
}

onMounted(() => {
  window.addEventListener('keydown', onKonami)
  if (prefersReducedMotion()) return
  smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.1,
    effects: true,
    normalizeScroll: true,
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKonami)
  smoother?.kill()
  smoother = null
})

function scrollTo(target: string) {
  if (smoother) smoother.scrollTo(target, true, 'top 80px')
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
}

const navRef = ref<{ toggleTheme: () => void } | null>(null)

function toggleTheme() {
  navRef.value?.toggleTheme()
}

provide('scrollTo', scrollTo)
provide('toggleTheme', toggleTheme)

const head = useLocaleHead()
useHead(() => ({
  htmlAttrs: { lang: head.value.htmlAttrs?.lang },
  link: head.value.link || [],
  meta: head.value.meta || [],
}))
</script>

<template>
  <div>
    <AuroraBackground />
    <MagneticCursor />
    <SiteNav ref="navRef" @navigate="scrollTo" />
    <CommandPalette @navigate="scrollTo" @toggle-theme="toggleTheme" />

    <canvas
      v-if="matrixOn"
      id="matrix-canvas"
      class="fixed inset-0 z-[250] pointer-events-none"
      aria-hidden="true"
    />

    <div id="smooth-wrapper">
      <div id="smooth-content">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
