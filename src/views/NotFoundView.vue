<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 py-20">
    <PageTitle title="404" subtitle="Page not found." />
    <p class="text-muted-foreground text-center max-w-md">
      The page you are looking for does not exist or has been moved.
    </p>
    <RouterLink
      to="/"
      class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
    >
      Go Home
    </RouterLink>
  </div>
</template>
