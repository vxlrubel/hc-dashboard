<script setup lang="ts">
import { useConfirmDialog } from '@/composables/useConfirmDialog'
import { Button } from '@/components/ui/button'

const { isOpen, message, confirmLabel, cancelLabel, onConfirm, onCancel } = useConfirmDialog()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex pt-12.5 justify-center items-start backdrop-blur-[2px]"
      >
        <div class="fixed inset-0 bg-black/50" />
        <div
          class="relative z-10 mx-4 w-full max-w-md rounded border bg-background p-6 shadow-lg scale-zoomin-up"
        >
          <h3 class="text-lg font-semibold text-foreground">Confirm</h3>
          <div class="mt-2 text-sm text-muted-foreground">
            {{ message }}
          </div>
          <div class="mt-6 flex items-center justify-end gap-3">
            <Button variant="outline" @click="onCancel">{{ cancelLabel }}</Button>
            <Button @click="onConfirm">{{ confirmLabel }}</Button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.scale-zoomin-up {
  opacity: 0;
  transform: translateY(20px) scale(0.96);
  animation: scaleZoomInUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  will-change: transform, opacity;
}

@keyframes scaleZoomInUp {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.96);
  }

  60% {
    opacity: 1;
    transform: translateY(-2px) scale(1.01);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
