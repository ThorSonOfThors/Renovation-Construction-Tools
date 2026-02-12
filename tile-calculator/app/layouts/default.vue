<script setup lang="ts">
import SideNav from '~/components/SideNav.vue'
import MobileNavDropdown from '~/components/MobileNavDropdown.vue'
import AdSlot from '~/components/ads/AdSlot.vue'

const locale = useLocale()

const vantaEnabled = ref(true)
let vantaEffect: { destroy?: () => void } | null = null

const { $initVantaBirds } = useNuxtApp()

onMounted(() => {
  const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
  if (mq?.matches) vantaEnabled.value = false

  if (vantaEnabled.value) {
    const el = document.getElementById('vanta-bg')
    if (el) vantaEffect = $initVantaBirds(el)
  }
})

onBeforeUnmount(() => {
  vantaEffect?.destroy?.()
})
</script>

<template>
  <div id="bg-root">
    <!-- Floating mobile menu -->
    <MobileNavDropdown class="mobile-fab" />

    <div class="app-shell">
      <!-- Desktop sidebar -->
      <aside class="sidebar">
        <SideNav />
        <!-- ✅ Vertical Sidebar Ad -->
        <AdSlot slot="sidebar" />
      </aside>

      <!-- Main content -->
      <main class="content">
        <!-- ✅ Horizontal Top Ad -->
        <AdSlot slot="top" />

        <div class="container readable">
          <slot />
        </div>
      </main>
    </div>

    <!-- Vanta background -->
    <div v-show="vantaEnabled" id="vanta-bg" />
  </div>
</template>

<style scoped>
/* Root */
#bg-root {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* Vanta */
#vanta-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
}

/* Layout */
.app-shell {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  width: 100%;
}

/* Sidebar (desktop only) */
.sidebar {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Content */
.content {
  padding: 16px;
  min-width: 0;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  min-width: 0;
}

/* Floating mobile button */
.mobile-fab {
  display: none;
}

/* Language picker */
.lang-picker {
  position: fixed;
  top: 8px;
  right: 10px;
  z-index: 60;
}

.lang-picker select {
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.25);

  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(8px);

  color: white;
  font-size: 13px;
  cursor: pointer;
}

/* ---------- MOBILE FIXES ---------- */
@media (max-width: 768px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: none;
  }

  .content {
    padding: 10px;
  }

  .container {
    padding: 0;
  }

  .mobile-fab {
    display: block;
    position: fixed;
    z-index: 50;
  }
}

/* EXTRA SAFETY for very narrow devices */
@media (max-width: 380px) {
  .content {
    padding: 8px;
  }
}
</style>
