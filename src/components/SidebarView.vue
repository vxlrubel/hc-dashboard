<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useToggleStore } from '@/stores/toggle'

const toggleStore = useToggleStore()
const { isSidebarOpen } = storeToRefs(toggleStore)
const { toggleSidebar } = toggleStore

</script>
<template>
  <aside class="fixed top-0 h-dvh w-64 bg-gray-800 text-gray-200 z-50 transition-all duration-300" :class="isSidebarOpen ? 'left-0' : '-left-64'">
    <RouterLink to="/" class="block p-4 bg-transparent border-b border-gray-700 h-15">
      <img alt="Vue logo" class="mx-auto w-8" src="@/assets/logo.svg" width="125" height="125" />
    </RouterLink>

    <div class="overflow-y-auto py-4 h-[calc(100%-60px)] scrollbar-none">
      <RouterLink to="/" class="block px-4 py-1.5 hover:bg-gray-700">Dashboard</RouterLink>
      <RouterLink to="/about" class="block px-4 py-1.5 hover:bg-gray-700" v-for="n in 1000" :key="n">
        About {{ n }}
      </RouterLink>
    </div>
  </aside>
  <div class="fixed inset-0 bg-black opacity-30 z-40" :class="isSidebarOpen ? 'block lg:hidden' : 'hidden'" @click="toggleSidebar"></div>
</template>

<style scoped>
    .overflow-y-auto .router-link-active.router-link-exact-active {
      position: relative;
      background-color: oklch(37.3% 0.034 259.733);

      &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 4px;
        background-color: var(--color-white);
      }

      &::after {
        content: '';
        position: absolute;
        top: calc(50% - 8px);
        right: 0;
        width: 0;
        height: 0;
        border: 8px solid var(--color-white);
        border-left-color: transparent;
        border-top-color: transparent;
        border-bottom-color: transparent;
      }
    }
</style>


