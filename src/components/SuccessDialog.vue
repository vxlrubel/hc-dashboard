<script setup lang="ts">
import { useSuccessDialog } from '@/composables/useSuccessDialog'
import { Button } from '@/components/ui/button'

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
        <div class="relative z-10 mx-4 w-full max-w-md rounded bg-background p-6 shadow-lg border">
          <h3 class="text-lg font-semibold text-foreground">
            {{ title }}
          </h3>
          <p class="mt-2 text-sm text-muted-foreground">
            {{ description }}
          </p>
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
</style>
