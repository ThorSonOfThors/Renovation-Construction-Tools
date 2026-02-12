import type { NuxtApp } from '#app'

declare module '#app' {
  interface NuxtApp {
    $initVantaBirds: (el: HTMLElement) => { destroy?: () => void }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $initVantaBirds: (el: HTMLElement) => { destroy?: () => void }
  }
}

export {}
