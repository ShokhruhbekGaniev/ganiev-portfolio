<script setup lang="ts">
const emit = defineEmits<{ navigate: [target: string]; toggleTheme: [] }>()

const { t, setLocale } = useI18n()

const open = ref(false)
const query = ref('')
const active = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)

interface Cmd {
  id: string
  label: () => string
  group: 'navigate' | 'actions'
  run: () => void
}

const commands: Cmd[] = [
  { id: 'about', label: () => t('nav.about'), group: 'navigate', run: () => emit('navigate', '#about') },
  { id: 'services', label: () => t('nav.services'), group: 'navigate', run: () => emit('navigate', '#services') },
  { id: 'work', label: () => t('nav.work'), group: 'navigate', run: () => emit('navigate', '#work') },
  { id: 'terminal', label: () => t('nav.terminal'), group: 'navigate', run: () => emit('navigate', '#terminal') },
  { id: 'contact', label: () => t('nav.contact'), group: 'navigate', run: () => emit('navigate', '#contact') },
  { id: 'theme', label: () => t('palette.theme'), group: 'actions', run: () => emit('toggleTheme') },
  { id: 'lang-ru', label: () => t('palette.langRu'), group: 'actions', run: () => setLocale('ru') },
  { id: 'lang-uz', label: () => t('palette.langUz'), group: 'actions', run: () => setLocale('uz') },
  { id: 'lang-en', label: () => t('palette.langEn'), group: 'actions', run: () => setLocale('en') },
  { id: 'tg', label: () => t('palette.telegram'), group: 'actions', run: () => window.open('https://t.me/sh_ganiev', '_blank') },
  { id: 'gh', label: () => t('palette.github'), group: 'actions', run: () => window.open('https://github.com/ShokhruhbekGaniev', '_blank') },
  { id: 'cv', label: () => t('palette.cv'), group: 'actions', run: () => window.open('/Shokhrukhbek_Ganiev_CV.pdf', '_blank') },
]

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return commands
  return commands.filter((c) => c.label().toLowerCase().includes(q) || c.id.includes(q))
})

watch(filtered, () => (active.value = 0))

function show() {
  open.value = true
  query.value = ''
  active.value = 0
  nextTick(() => inputEl.value?.focus())
}

function runActive() {
  const cmd = filtered.value[active.value]
  if (!cmd) return
  open.value = false
  cmd.run()
}

function onKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    open.value ? (open.value = false) : show()
  } else if (open.value) {
    if (e.key === 'Escape') open.value = false
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      active.value = Math.min(active.value + 1, filtered.value.length - 1)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      active.value = Math.max(active.value - 1, 0)
    }
    if (e.key === 'Enter') runActive()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

defineExpose({ show })
</script>

<template>
  <Teleport to="body">
    <Transition name="palette">
      <div
        v-if="open"
        class="fixed inset-0 z-[300] flex items-start justify-center px-4 pt-[18vh]"
        @click.self="open = false"
      >
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="open = false" />
        <div
          class="relative w-full max-w-lg overflow-hidden rounded-xl border border-line shadow-2xl"
          style="background: var(--ink-2)"
          role="dialog"
          aria-modal="true"
        >
          <input
            ref="inputEl"
            v-model="query"
            type="text"
            :placeholder="t('palette.placeholder')"
            class="w-full border-b border-line bg-transparent px-5 py-4 font-mono text-sm text-body outline-none placeholder:text-muted/60"
          />
          <ul class="max-h-72 overflow-y-auto py-2">
            <template v-for="group in ['navigate', 'actions'] as const" :key="group">
              <li
                v-if="filtered.some((c) => c.group === group)"
                class="px-5 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
              >
                {{ t(`palette.${group}`) }}
              </li>
              <li v-for="cmd in filtered.filter((c) => c.group === group)" :key="cmd.id">
                <button
                  class="flex w-full cursor-pointer items-center justify-between px-5 py-2.5 text-left text-sm transition-colors duration-150"
                  :class="filtered.indexOf(cmd) === active ? 'bg-lime-dim text-lime' : 'text-body hover:bg-lime-dim/50'"
                  @mouseenter="active = filtered.indexOf(cmd)"
                  @click="runActive()"
                >
                  {{ cmd.label() }}
                  <span v-if="filtered.indexOf(cmd) === active" class="font-mono text-[10px] text-muted">↵</span>
                </button>
              </li>
            </template>
            <li v-if="!filtered.length" class="px-5 py-6 text-center font-mono text-sm text-muted">∅</li>
          </ul>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.palette-enter-active,
.palette-leave-active {
  transition: opacity 0.18s ease;
}
.palette-enter-from,
.palette-leave-to {
  opacity: 0;
}
</style>
