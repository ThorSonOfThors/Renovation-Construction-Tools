<script setup lang="ts">
import { ref } from 'vue'
import { navItems } from '~/utils/nav'

const open = ref(false)
</script>

<template>
  <div class="mobile-nav-root">
    <button
      class="hamburger-btn"
      @click="open = !open"
      aria-label="Open navigation"
    >
      ☰
    </button>

    <div v-if="open" class="dropdown">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="dropdown-item"
        @click="open = false"
      >
        {{ item.label }}
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* Root fixed to TOP-LEFT corner */
.mobile-nav-root {
  position: fixed;
  top: 6px;
  left: 6px;
  z-index: 50;
}

/* Small square button */
.hamburger-btn {
  width: 38px;
  height: 38px;
  padding: 0;

  border-radius: 10px;
  border: none;
  cursor: pointer;

  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(10px);

  color: white;
  font-size: 20px;
  line-height: 1;

  display: flex;
  align-items: center;
  justify-content: center;
}

/* Dropdown opens to the RIGHT */
.dropdown {
  position: absolute;
  top: 0;
  left: 44px;

  background: rgba(18, 18, 18, 0.85);
  backdrop-filter: blur(14px);

  border-radius: 12px;
  padding: 6px;

  min-width: 190px;
  box-shadow: 0 10px 28px rgba(0,0,0,0.45);
}

/* Individual nav items */
.dropdown-item {
  display: block;
  padding: 10px 12px;
  margin: 4px 0;

  border-radius: 10px;

  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;

  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(6px);

  transition: background 0.15s ease, transform 0.1s ease;
}

.dropdown-item:hover {
  background: rgba(255,255,255,0.14);
  transform: translateX(2px);
}
</style>
WE4R56TY7U890=-0876543zSDFGHJ