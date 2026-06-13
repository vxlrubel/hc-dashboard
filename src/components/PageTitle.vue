<script setup lang="ts">
import Separator from '@/components/ui/separator/Separator.vue'
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div>
    <div class="pt-3 pb-4 space-y-1">
      <h1 class="text-[22px] font-medium" v-if="title">
        {{ title }}
      </h1>
      <p class="text-muted-foreground text-sm" v-if="subtitle">
        {{ subtitle }}
      </p>
    </div>
    <Separator class="mb-4" />
  </div>
</template>
