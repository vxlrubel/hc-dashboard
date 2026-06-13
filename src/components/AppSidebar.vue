<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

import { GalleryVerticalEnd, UserCog, ChevronRight, Users } from '@lucide/vue'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
            >
              <GalleryVerticalEnd class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">HC-Dashboard</span>
              <span class="truncate text-xs">Enterprise</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>General</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton as-child>
                <RouterLink to="/">
                  <UserCog />
                  <span>Dashboard </span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton as-child>
                <RouterLink to="/about" class="block px-4 py-1.5 hover:bg-gray-700"
                  >About Us</RouterLink
                >
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Tooltip>
                <TooltipTrigger as-child>
                  <SidebarMenuButton as-child>
                    <RouterLink to="/about">
                      <UserCog />
                      <span>About Us</span>
                    </RouterLink>
                  </SidebarMenuButton>
                </TooltipTrigger>

                <TooltipContent side="right"> About Us </TooltipContent>
              </Tooltip>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Settings</SidebarGroupLabel>

        <SidebarMenuItem>
          <Collapsible>
            <CollapsibleTrigger as-child>
              <SidebarMenuButton class="group">
                <Users />
                <span>Users</span>
                <ChevronRight
                  class="ml-auto transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-90"
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuButton>
                    <span>All Users</span>
                  </SidebarMenuButton>
                </SidebarMenuSubItem>

                <SidebarMenuSubItem>
                  <SidebarMenuButton>
                    <span>Add User</span>
                  </SidebarMenuButton>
                </SidebarMenuSubItem>

                <SidebarMenuSubItem>
                  <SidebarMenuButton>
                    <span>User Roles</span>
                  </SidebarMenuButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger as-child>
              <SidebarMenuButton class="group">
                <Users />
                <span>Users</span>
                <ChevronRight
                  class="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-90"
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuButton>
                    <span>All Users</span>
                  </SidebarMenuButton>
                </SidebarMenuSubItem>

                <SidebarMenuSubItem>
                  <SidebarMenuButton>
                    <span>Add User</span>
                  </SidebarMenuButton>
                </SidebarMenuSubItem>

                <SidebarMenuSubItem>
                  <SidebarMenuButton>
                    <span>User Roles</span>
                  </SidebarMenuButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        </SidebarMenuItem>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter />
    <SidebarRail />
  </Sidebar>
</template>
