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
        <AdSlot slot="sidebar" />
      </aside>

      <!-- Main content -->
      <main class="content">
        <AdSlot slot="top" />

        <div class="container readable">
          <slot />
        </div>
      </main>
    </div>

    <!-- ✅ Footer -->
    <footer class="site-footer">
      <div class="footer-inner">
        <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>
      </div>
    </footer>

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
  display: flex;
  flex-direction: column;
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
  flex: 1;
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

/* ✅ Footer Styling */
.site-footer {
  margin-top: 40px;
  padding: 24px 16px;
  text-align: center;
  font-size: 14px;
  opacity: 0.7;
}

.footer-inner {
  max-width: 900px;
  margin: 0 auto;
}

.site-footer a {
  color: inherit;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.site-footer a:hover {
  text-decoration: underline;
  opacity: 1;
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

  .site-footer {
    padding: 20px 12px;
    font-size: 13px;
  }
}

/* EXTRA SAFETY for very narrow devices */
@media (max-width: 380px) {
  .content {
    padding: 8px;
  }

  .site-footer {
    font-size: 12px;
  }
}
</style>
