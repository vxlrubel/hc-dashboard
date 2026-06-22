<script setup lang="ts">
import { useSuccessDialog } from '@/composables/useSuccessDialog'
import { Button } from '@/components/ui/button'
import { CircleCheck } from '@lucide/vue'

const { isOpen, title, description, hide } = useSuccessDialog()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-start pt-12.5 justify-center backdrop-blur-[2px]"
      >
        <div class="fixed inset-0 bg-black/50" @click="hide" />
        <div
          class="relative z-10 mx-4 w-full max-w-md rounded bg-background p-6 shadow-lg border scale-zoomin-up"
        >
          <div class="flex gap-4">
            <div class="9">
              <CircleCheck class="size-9 text-green-600" />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-foreground leading-[normal]">
                {{ title }}
              </h3>
              <p class="mt-2 text-sm text-muted-foreground">
                {{ description }}
              </p>
            </div>
          </div>
          <div class="mt-4 flex justify-end">
            <Button @click="hide"> Okay </Button>
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
