<script setup lang="ts">
import { useToastDialog } from '@/composables/useToastDialog'
import { Button } from '@/components/ui/button'
import { CircleCheck, TriangleAlert, CircleAlert } from '@lucide/vue'

const { isOpen, title, description, hide, status } = useToastDialog()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-start pt-5 justify-center backdrop-blur-[2px]"
      >
        <div class="fixed inset-0 bg-black/50" @click="hide" />
        <div
          class="relative z-10 mx-4 w-full max-w-md rounded bg-background p-6 shadow-lg scale-zoomin-up border border-t-7 dark:bg-[#1F1F1F]"
          :class="{
            'border-t-green-600': status == 'success',
            'border-t-rose-600': status == 'error',
            'border-t-amber-600': status == 'warning',
          }"
        >
          <div class="flex gap-4">
            <CircleCheck class="size-9 text-green-600" v-if="status == 'success'" />
            <TriangleAlert class="size-9 text-rose-600" v-if="status == 'error'" />
            <CircleAlert class="size-9 text-amber-600" v-if="status == 'warning'" />
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-foreground leading-[normal]">
                {{ title }}
              </h3>
              <div class="mt-2 text-sm text-muted-foreground max-h-50 overflow-y-auto pr-6 -mr-6">
                {{ description }}
              </div>
            </div>
          </div>
          <div class="mt-4 flex justify-end">
            <Button @click="hide" class="button-primary"> Okay </Button>
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
