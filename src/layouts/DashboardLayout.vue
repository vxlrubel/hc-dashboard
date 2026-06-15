<script setup lang="ts">
import { RouterView } from 'vue-router'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import NavigationView from '@/components/header/NavigationView.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { TooltipProvider } from '@/components/ui/tooltip'
</script>

<template>
  <SidebarProvider>
    <TooltipProvider>
      <AppSidebar />
    </TooltipProvider>
    <SidebarInset>
      <NavigationView />
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <RouterView v-slot="{ Component }">
          <Transition name="page-slide" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>


