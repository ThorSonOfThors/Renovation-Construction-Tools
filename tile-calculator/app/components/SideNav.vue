<script setup lang="ts">
import { navItems } from '~/utils/nav'
import { ref } from 'vue'

const route = useRoute()
const isOpen = ref(false)
</script>

<template>
  <aside class="sidebar readable">
    <!-- Header / Brand -->
    <div class="card">
      <div style="font-weight: 800; font-size: 16px;">
        Renovation Tools
      </div>
      <div style="opacity: 0.9; margin-top: 6px;">
        Fast calculators for planning.
      </div>
    </div>
    <!-- Navigation -->
    <nav class="side-nav-links" :class="{ open: isOpen }">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="nav-link"
        :class="{ active: route.path === item.to }"
        @click="isOpen = false"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>
  </aside>
</template>
