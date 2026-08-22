/**
 * GSAP singleton — registers all plugins once.
 * Import { gsap } from '@/lib/gsap' in all components
 * to ensure ScrollTrigger is always registered.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Default GSAP config
gsap.config({
  nullTargetWarn: false,
})

export { gsap, ScrollTrigger }
