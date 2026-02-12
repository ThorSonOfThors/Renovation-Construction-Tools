<script setup lang="ts">
import { onMounted, computed } from 'vue'

const props = defineProps<{
  slot: 'top' | 'sidebar'
}>()

// Map layout → correct AdSense slot ID
const adSlotId = computed(() => {
  return props.slot === 'sidebar'
    ? '1979927234'   // Vertical sidebar ad
    : '2937785682'   // Horizontal top ad
})

onMounted(() => {
  const ins = document.querySelector(
    `.ad-${props.slot} .adsbygoogle`
  ) as HTMLElement | null

  if (!ins) return

  // Only initialize if not already rendered
  if (!ins.getAttribute('data-adsbygoogle-status')) {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }
})

</script>

<template>
  <ClientOnly>
    <div
      class="ad-slot"
      :class="`ad-${slot}`"
      aria-label="Advertisement"
    >
      <ins
        class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-9341226393355638"
        :data-ad-slot="adSlotId"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
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
