<script setup lang="ts">
const emit = defineEmits<{ toggleTheme: [] }>()

const { t, setLocale } = useI18n()
const { gsap } = useGsap()

const root = ref<HTMLElement | null>(null)
const screenEl = ref<HTMLElement | null>(null)
const input = ref('')
const history = ref<Array<{ type: 'in' | 'out'; text: string }>>([])
let booted = false
let ctx: gsap.Context | undefined

function print(text: string) {
  history.value.push({ type: 'out', text })
  nextTick(() => {
    if (screenEl.value) screenEl.value.scrollTop = screenEl.value.scrollHeight
  })
}

function run() {
  const cmd = input.value.trim()
  if (!cmd) return
  history.value.push({ type: 'in', text: cmd })
  input.value = ''

  const [name, arg] = cmd.toLowerCase().split(/\s+/)

  switch (name) {
    case 'help':
      print(t('terminal.help'))
      break
    case 'about':
    case 'whoami':
      print(t('terminal.about'))
      break
    case 'services':
      print(t('terminal.services'))
      break
    case 'projects':
    case 'work':
      print(t('terminal.projects'))
      break
    case 'contact':
      print(t('terminal.contact'))
      break
    case 'lang':
      if (arg === 'ru' || arg === 'uz' || arg === 'en') {
        setLocale(arg)
        print(t('terminal.langChanged'))
      } else {
        print('lang ru | uz | en')
      }
      break
    case 'theme':
      emit('toggleTheme')
      print(t('terminal.themeChanged'))
      break
    case 'clear':
      history.value = []
      break
    case 'sudo':
      print(t('terminal.sudo'))
      break
    case 'ls':
      print('about/  services/  work/  contact/  secrets/ 🔒')
      break
    case 'uptime':
      print('3+ years in production, 0 critical incidents')
      break
    default:
      print(t('terminal.notFound'))
  }

  nextTick(() => {
    if (screenEl.value) screenEl.value.scrollTop = screenEl.value.scrollHeight
  })
}

onMounted(() => {
  if (!root.value) return

  // greet on first view
  const greet = () => {
    if (booted) return
    booted = true
    print(t('terminal.welcome'))
  }

  if (prefersReducedMotion()) {
    greet()
    return
  }

  ctx = gsap.context(() => {
    gsap.set('.term-window', { visibility: 'visible' })
    gsap.from('.term-window', {
      autoAlpha: 0,
      y: 60,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.term-window', start: 'top 80%', onEnter: greet },
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="terminal" ref="root" class="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
    <p class="label-mono mb-6 md:mb-10">{{ t('terminal.label') }}</p>
    <h2 class="display mb-10 text-4xl md:text-6xl">{{ t('terminal.title') }}</h2>

    <div
      class="term-window overflow-hidden rounded-xl border border-line shadow-2xl gs-reveal"
      style="background: color-mix(in srgb, var(--ink-2) 88%, transparent); backdrop-filter: blur(8px)"
    >
      <!-- title bar -->
      <div class="flex items-center gap-2 border-b border-line px-4 py-3">
        <span class="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span class="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span class="h-3 w-3 rounded-full bg-[#28c840]" />
        <span class="ml-3 font-mono text-xs text-muted">guest&#64;ganiev.dev — zsh</span>
      </div>

      <!-- screen -->
      <div
        ref="screenEl"
        class="h-72 cursor-text overflow-y-auto px-5 py-4 font-mono text-sm leading-relaxed md:h-80"
        @click="($refs.cmdInput as HTMLInputElement)?.focus()"
      >
        <div v-for="(line, i) in history" :key="i" class="mb-1 whitespace-pre-wrap break-words">
          <template v-if="line.type === 'in'">
            <span class="text-lime">❯</span> <span class="text-body">{{ line.text }}</span>
          </template>
          <template v-else>
            <span class="text-muted">{{ line.text }}</span>
          </template>
        </div>

        <!-- prompt -->
        <div class="flex items-center gap-2">
          <span class="text-lime">❯</span>
          <input
            ref="cmdInput"
            v-model="input"
            type="text"
            class="w-full bg-transparent text-body caret-[var(--lime)] outline-none"
            spellcheck="false"
            autocomplete="off"
            aria-label="Terminal input"
            @keydown.enter="run"
          />
        </div>
      </div>
    </div>

    <i18n-t keypath="terminal.hint" tag="p" class="mt-4 font-mono text-xs text-muted">
      <template #help>
        <code class="rounded bg-lime-dim px-1.5 py-0.5 text-lime">help</code>
      </template>
    </i18n-t>
  </section>
</template>
