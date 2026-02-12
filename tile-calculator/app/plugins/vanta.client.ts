import * as THREE from 'three'

// Load Vanta Birds as a side effect
import 'vanta/dist/vanta.birds.min.js'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      initVantaBirds: (el: HTMLElement) => {
        
        const VANTA = (window as any).VANTA

        if (!VANTA?.BIRDS) {
          console.warn('[vanta] VANTA.BIRDS not found')
          return null
        }

        return VANTA.BIRDS({
          el,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          backgroundAlpha: 0.77,
          quantity: 5,
          birdSize: 1,
          scale: 1.0,
          scaleMobile: 1.0,
        })
      },
    },
  }
})


