<script setup lang="ts">
import { profile } from '~/data/content'

const { gsap, SplitText } = useGsap()

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined

const form = reactive({ name: '', email: '', message: '' })
const status = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')

const config = useRuntimeConfig()

async function submit() {
  if (status.value === 'sending') return
  const key = config.public.web3formsKey
  if (!key) {
    // no form key configured — fall back to a prefilled email
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Message from ${form.name}`)}&body=${encodeURIComponent(form.message + '\n\n— ' + form.email)}`
    return
  }
  status.value = 'sending'
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: key, ...form, subject: `Portfolio message from ${form.name}` }),
    })
    status.value = res.ok ? 'sent' : 'error'
    if (res.ok) Object.assign(form, { name: '', email: '', message: '' })
  } catch {
    status.value = 'error'
  }
}

const socials = [
  { label: 'Telegram', href: profile.telegram },
  { label: 'GitHub', href: profile.github },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'Email', href: `mailto:${profile.email}` },
]

onMounted(() => {
  if (!root.value || prefersReducedMotion()) return

  ctx = gsap.context(() => {
    document.fonts.ready.then(() => {
      const split = SplitText.create('.contact-title', { type: 'words', mask: 'words' })
      gsap.set('.contact-title', { visibility: 'visible' })
      gsap.from(split.words, {
        yPercent: 110,
        duration: 1,
        stagger: 0.06,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.contact-title', start: 'top 85%' },
      })
    })

    gsap.utils.toArray<HTMLElement>('.contact-reveal').forEach((el, i) => {
      gsap.set(el, { visibility: 'visible' })
      gsap.from(el, {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      })
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="contact" ref="root" class="relative overflow-hidden bg-ink-2/60 pt-28 md:pt-40">
    <div class="mx-auto max-w-7xl px-5 md:px-10">
      <p class="label-mono mb-10 md:mb-16">05 / Contact</p>

      <h2 class="contact-title display max-w-5xl text-5xl gs-reveal md:text-8xl">
        Let&rsquo;s build <span class="text-lime">something</span> that matters.
      </h2>

      <div class="mt-16 grid gap-14 pb-28 md:mt-24 md:grid-cols-2 md:gap-20 md:pb-36">
        <!-- form -->
        <form class="contact-reveal space-y-5 gs-reveal" @submit.prevent="submit">
          <div>
            <label for="cf-name" class="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted">Name</label>
            <input
              id="cf-name"
              v-model="form.name"
              type="text"
              required
              autocomplete="name"
              class="w-full rounded-md border border-line bg-ink px-4 py-3 text-body transition-colors duration-200 placeholder:text-muted/50 focus:border-lime focus:outline-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label for="cf-email" class="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted">Email</label>
            <input
              id="cf-email"
              v-model="form.email"
              type="email"
              required
              autocomplete="email"
              class="w-full rounded-md border border-line bg-ink px-4 py-3 text-body transition-colors duration-200 placeholder:text-muted/50 focus:border-lime focus:outline-none"
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label for="cf-message" class="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-muted">Message</label>
            <textarea
              id="cf-message"
              v-model="form.message"
              required
              rows="5"
              class="w-full resize-y rounded-md border border-line bg-ink px-4 py-3 text-body transition-colors duration-200 placeholder:text-muted/50 focus:border-lime focus:outline-none"
              placeholder="Tell me about the role or the project…"
            />
          </div>

          <button
            type="submit"
            :disabled="status === 'sending'"
            class="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-lime px-8 py-4 font-mono text-sm font-medium uppercase tracking-[0.12em] text-[#0a0b0d] transition-opacity duration-200 hover:opacity-85 disabled:cursor-wait disabled:opacity-60"
          >
            {{ status === 'sending' ? 'Sending…' : 'Send message' }}
            <svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </button>

          <p v-if="status === 'sent'" class="font-mono text-sm text-lime" role="status">Message sent — I&rsquo;ll get back to you soon.</p>
          <p v-else-if="status === 'error'" class="font-mono text-sm text-red-400" role="alert">
            Something went wrong — write me directly at {{ profile.email }}
          </p>
        </form>

        <!-- links + CV -->
        <div class="contact-reveal gs-reveal">
          <ul class="divide-y divide-line border-y border-line">
            <li v-for="social in socials" :key="social.label">
              <a
                :href="social.href"
                target="_blank"
                rel="noopener"
                class="group flex items-center justify-between py-5 transition-colors duration-200 hover:text-lime"
              >
                <span class="display text-2xl md:text-3xl">{{ social.label }}</span>
                <svg class="h-5 w-5 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-lime" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </a>
            </li>
          </ul>

          <a
            href="/Shokhrukhbek_Ganiev_CV.pdf"
            download
            class="mt-10 inline-flex cursor-pointer items-center gap-3 rounded-full border border-lime/50 px-8 py-4 font-mono text-sm uppercase tracking-[0.12em] text-lime transition-colors duration-200 hover:bg-lime-dim"
          >
            Download CV
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 3v12m0 0 -4-4m4 4 4-4M5 21h14" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <footer class="border-t border-line py-8">
      <div class="mx-auto flex max-w-7xl flex-col gap-2 px-5 font-mono text-xs text-muted md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {{ new Date().getFullYear() }} {{ profile.name }}</p>
        <p>{{ profile.location }} · Built with Nuxt + GSAP</p>
      </div>
    </footer>
  </section>
</template>
