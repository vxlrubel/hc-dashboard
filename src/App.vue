<script setup lang="ts">
import { RouterView } from 'vue-router'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import ModeToggle from '@/components/ModeToggle.vue'
import NotificationView from '@/components/header/NotificationView.vue'
import { Button } from '@/components/ui/button'
import NavigationMenu from '@/components/header/NavigationMenu.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { TooltipProvider } from '@/components/ui/tooltip'
</script>

<template>
  <SidebarProvider>
    <TooltipProvider>
      <AppSidebar />
    </TooltipProvider>
    <SidebarInset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-sidebar"
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
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <RouterView />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
