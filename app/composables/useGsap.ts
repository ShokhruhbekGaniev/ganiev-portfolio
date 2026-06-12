import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SplitText } from 'gsap/SplitText'

let registered = false

export function useGsap() {
  if (!registered && import.meta.client) {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText)
    registered = true
  }
  return { gsap, ScrollTrigger, ScrollSmoother, SplitText }
}

/** True when the user prefers reduced motion — collapse all choreography to instant states. */
export function prefersReducedMotion(): boolean {
  return import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
