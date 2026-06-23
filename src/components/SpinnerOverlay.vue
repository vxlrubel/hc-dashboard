<script setup lang="ts">
import { Loader, LoaderPinwheel } from '@lucide/vue'
import { useSpinner } from '@/composables/useSpinner'

const { isLoading } = useSpinner()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center bg-black/50 justify-center">
        <div class="p-4">
          <!-- <Loader class="size-6 animate-spin text-white" /> -->
          <LoaderPinwheel class="size-8 animate-spin text-white" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.225s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
