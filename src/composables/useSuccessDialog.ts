import { ref } from 'vue'

const isOpen = ref(false)
const title = ref('')
const description = ref('')
const status = ref('success')

export function useSuccessDialog() {
  function show(opts: { title: string; description: string; status: string }) {
    title.value = opts.title
    description.value = opts.description
    isOpen.value = true
    status.value = opts.status
  }

  function hide() {
    isOpen.value = false
    status.value = ''
  }

  return { isOpen, title, description, show, hide, status }
}
