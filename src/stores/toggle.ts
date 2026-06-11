import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useToggleStore = defineStore('toggle', () => {

  const SIDEBAR_OPEN_KEY = 'e26e4501-6fdf-42c4-9414-961c3e421dba'

  const isSidebarOpen = ref(
    JSON.parse(localStorage.getItem(SIDEBAR_OPEN_KEY) ?? 'true')
  )

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  watch(
    isSidebarOpen,
    (value) => {
      localStorage.setItem(SIDEBAR_OPEN_KEY, JSON.stringify(value))
    },
    { immediate: true }
  )

  return { isSidebarOpen, toggleSidebar }
})
