<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterLink, RouterView } from 'vue-router'
import SidebarView from '@/components/SidebarView.vue'
import { useToggleStore } from '@/stores/toggle'
import { Menu } from '@lucide/vue';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const toggleStore = useToggleStore()
const { isSidebarOpen } = storeToRefs(toggleStore)
const { toggleSidebar } = toggleStore

</script>

<template>

   <SidebarView />

  <main :class="{ 'lg:ml-64': isSidebarOpen }" class="transition-all duration-300">
    <header class="flex items-center justify-between p-4 border-b border-gray-800 h-15">
        <button
          @click="toggleSidebar"
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 cursor-pointer hover:bg-gray-600">
          <Menu class="w-4 h-4" />
        </button>
        <nav class="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger>Open</DropdownMenuTrigger>
              <DropdownMenuContent  class="w-50">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    </header>
    <div class="px-4 lg:px-7.5 py-4">
      <RouterView />
    </div>
  </main>

</template>
