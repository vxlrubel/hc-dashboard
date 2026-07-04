<script setup lang="ts">
import { useConfirmDialog } from '@/composables/useConfirmDialog'
import { Button } from '@/components/ui/button'

const { dropScaling, isOpen, message, confirmLabel, cancelLabel, onConfirm, onCancel, onBackdrop } =
  useConfirmDialog()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex justify-center items-start backdrop-blur-[2px]"
      >
        <div @click="onBackdrop" class="fixed inset-0 bg-black/50" />
        <div class="p-6" :class="{ 'scalling-down-zoom': dropScaling }">
          <div
            class="relative z-10 mx-4 w-full max-w-md rounded border bg-background shadow-lg scale-zoomin-up p-6 dark:bg-[#1F1F1F]"
          >
            <h3 class="text-lg font-semibold text-foreground">Confirm</h3>
            <div class="mt-2 text-sm text-muted-foreground">
              {{ message }}
            </div>
            <div class="mt-6 flex items-center justify-end gap-3">
              <Button class="button-cancel min-w-17.5" @click="onCancel">{{ cancelLabel }}</Button>
              <Button @click="onConfirm" class="button-primary min-w-17.5">{{
                confirmLabel
              }}</Button>
            </div>
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

.scalling-down-zoom {
  opacity: 1;
  transform: translateY(0) scale(1);
  animation: shake 0.35s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(-5px);
  }

  40% {
    transform: translateX(5px);
  }

  60% {
    transform: translateX(-3px);
  }

  80% {
    transform: translateX(3px);
  }
}
</style>
