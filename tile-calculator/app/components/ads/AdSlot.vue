<script setup lang="ts">
import { onMounted } from 'vue'

defineProps<{
  slot: 'top' | 'sidebar'
}>()

onMounted(() => {
  // Placeholder for AdSense / provider init
  // Safe: runs only on client
})
</script>

<template>
  <ClientOnly>
    <div
      class="ad-slot"
      :class="`ad-${slot}`"
      aria-label="Advertisement"
    >
      <!-- Replace with provider code later -->
      <div class="ad-placeholder">
        Advertisement
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
.ad-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* TOP AD */
.ad-top {
  margin: 16px 0 24px;
  min-height: 90px;
}

/* SIDEBAR AD */
.ad-sidebar {
  margin-top: 24px;
  position: sticky;
  top: 24px;
}

/* Placeholder styling */
.ad-placeholder {
  width: 100%;
  max-width: 900px;
  height: 90px;
  background: rgba(255,255,255,0.08);
  border-radius: 12px;
  font-size: 13px;
  opacity: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Sidebar size */
.ad-sidebar .ad-placeholder {
  max-width: 300px;
  height: 250px;
}

/* Mobile */
@media (max-width: 768px) {
  .ad-sidebar {
    display: none;
  }
}
</style>
