<script setup lang="ts">
const emit = defineEmits<{ navigate: [target: string] }>()

const links = [
  { label: 'About', target: '#about' },
  { label: 'Experience', target: '#experience' },
  { label: 'Projects', target: '#projects' },
  { label: 'Skills', target: '#skills' },
  { label: 'Contact', target: '#contact' },
]

const isLight = ref(false)

onMounted(() => {
  isLight.value = document.documentElement.classList.contains('light')
})

function toggleTheme() {
  isLight.value = !isLight.value
  document.documentElement.classList.toggle('light', isLight.value)
  try {
    localStorage.setItem('theme', isLight.value ? 'light' : 'dark')
  } catch {}
}
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 backdrop-blur-md"
    style="background: color-mix(in srgb, var(--ink) 72%, transparent); border-bottom: 1px solid var(--line)"
  >
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10"
      aria-label="Main navigation"
    >
      <button
        class="font-mono text-sm font-medium tracking-widest text-body cursor-pointer transition-colors duration-200 hover:text-lime"
        aria-label="Scroll to top"
        @click="emit('navigate', '#hero')"
      >
        SG<span class="text-lime">.</span>
      </button>

      <div class="flex items-center gap-1 md:gap-2">
        <ul class="hidden items-center gap-1 md:flex">
          <li v-for="link in links" :key="link.target">
            <button
              class="cursor-pointer rounded px-3 py-2 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors duration-200 hover:text-lime"
              @click="emit('navigate', link.target)"
            >
              {{ link.label }}
            </button>
          </li>
        </ul>

        <button
          class="cursor-pointer rounded p-2 text-muted transition-colors duration-200 hover:text-lime"
          :aria-label="isLight ? 'Switch to dark theme' : 'Switch to light theme'"
          @click="toggleTheme"
        >
          <svg v-if="isLight" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        </button>
      </div>
    </nav>
  </header>
</template>
