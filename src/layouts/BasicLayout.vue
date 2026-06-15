<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Button } from '@/components/ui/button'
import ModeToggle from '@/components/ModeToggle.vue'
import NavigationMenuGuest from '@/components/header/NavigationMenuGuest.vue'
import { GalleryVerticalEnd } from '@lucide/vue'
</script>

<template>
  <div>
    <header
      class="sticky top-0 z-10 px-4 lg:px-8 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-sidebar"
    >
      <div class="flex flex-1 items-center gap-2 px-4">
        <Button variant="outline" class="-ml-3 h-8 w-8 rounded-full cursor-pointer">
          <div
            class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
          >
            <GalleryVerticalEnd class="size-4" />
          </div>
          <div class="grid flex-1 text-left text-sm leading-tight">
            <span class="truncate font-semibold">HC-Dashboard</span>
            <span class="truncate text-xs">Enterprise</span>
          </div>
        </Button>
        <div class="flex-1 scale-0 lg:scale-100">
          <NavigationMenuGuest />
        </div>
      </div>
      <div class="px-4 flex items-center gap-2">
        <ModeToggle />
      </div>
    </header>
    <div class="px-4 py-6 lg:px-8">
      <RouterView />
    </div>
  </div>
</template>
