<script setup lang="ts">
const { gsap, ScrollSmoother } = useGsap()

let smoother: globalThis.ScrollSmoother | null = null

onMounted(() => {
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
  smoother?.kill()
  smoother = null
})

function scrollTo(target: string) {
  if (smoother) smoother.scrollTo(target, true, 'top 80px')
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
}

provide('scrollTo', scrollTo)
</script>

<template>
  <div class="grain">
    <SiteNav @navigate="scrollTo" />

    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main>
          <SectionHero />
          <SectionAbout />
          <SectionExperience />
          <SectionProjects />
          <SectionSkills />
          <SectionContact />
        </main>
      </div>
    </div>
  </div>
</template>
