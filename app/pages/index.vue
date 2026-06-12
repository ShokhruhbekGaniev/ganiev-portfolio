<script setup lang="ts">
const scrollTo = inject<(target: string) => void>('scrollTo')!
const toggleTheme = inject<() => void>('toggleTheme')!

const { t } = useI18n()
useHead(() => ({
  title: t('meta.title'),
  meta: [
    { name: 'description', content: t('meta.description') },
    { property: 'og:title', content: t('meta.title') },
    { property: 'og:description', content: t('meta.description') },
  ],
}))
</script>

<template>
  <main>
    <SectionHero @navigate="scrollTo" />
    <SectionAbout />
    <SectionServices />
    <SectionProjects />
    <SectionTerminal @toggle-theme="toggleTheme" />
    <SectionContact />
  </main>
</template>
