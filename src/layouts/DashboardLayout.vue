<script setup lang="ts">
import { RouterView } from 'vue-router'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import NavigationView from '@/components/header/NavigationView.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { TooltipProvider } from '@/components/ui/tooltip'
import SpinnerOverlay from '@/components/SpinnerOverlay.vue'
import ToastDialog from '@/components/ToastDialog.vue'
</script>

<template>
  <SidebarProvider>
    <TooltipProvider>
      <AppSidebar />
    </TooltipProvider>
    <SidebarInset>
      <NavigationView />
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <RouterView v-slot="{ Component, route }">
          <Transition name="page-slide" mode="out-in">
            <div :key="route.fullPath">
              <component :is="Component" />

              <!-- Global composible component here -->

              <!-- global spinner -->
              <SpinnerOverlay />

              <!-- global tast notice -->
              <ToastDialog />

              <!-- Global composible component end here -->
            </div>
          </Transition>
        </RouterView>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
