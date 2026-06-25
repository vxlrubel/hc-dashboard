import { ref } from 'vue'

const isOpen = ref(false)
const message = ref('')
const confirmLabel = ref('Leave')
const cancelLabel = ref('Stay')
let resolveCallback: ((value: boolean) => void) | null = null

export function useConfirmDialog() {
  function confirm(msg: string, opts?: { confirmLabel?: string; cancelLabel?: string }): Promise<boolean> {
    message.value = msg
    confirmLabel.value = opts?.confirmLabel ?? 'Leave'
    cancelLabel.value = opts?.cancelLabel ?? 'Stay'
    isOpen.value = true
    return new Promise((resolve) => {
      resolveCallback = resolve
    })
  }

  function onConfirm() {
    isOpen.value = false
    resolveCallback?.(true)
    resolveCallback = null
  }

  function onCancel() {
    isOpen.value = false
    resolveCallback?.(false)
    resolveCallback = null
  }

  return { isOpen, message, confirmLabel, cancelLabel, confirm, onConfirm, onCancel }
}
