import { ref } from 'vue'

const isLoading = ref(false)

export function useSpinner() {
  function show() {
    isLoading.value = true
  }

  function hide() {
    isLoading.value = false
  }

  return { isLoading, show, hide }
}
