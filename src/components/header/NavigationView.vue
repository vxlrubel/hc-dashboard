<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import ModeToggle from '@/components/ModeToggle.vue'
import NotificationView from '@/components/header/NotificationView.vue'
import NavigationMenu from '@/components/header/NavigationMenu.vue'
</script>
<template>
  <header
    class="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-sidebar"
  >
    <div class="flex flex-1 items-center gap-2 px-4">
      <Button variant="outline" class="-ml-1 h-8 w-8 rounded-full cursor-pointer">
        <SidebarTrigger class="cursor-pointer" />
      </Button>
      <div class="flex-1 scale-0 lg:scale-100">
        <NavigationMenu />
      </div>
    </div>
    <div class="px-4 flex items-center gap-2">
      <NotificationView />
      <ModeToggle />
    </div>
  </header>
</template>
