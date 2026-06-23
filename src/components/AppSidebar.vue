<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const auth = useAuthStore()

const openStates = reactive<Record<string, boolean>>({})

function collapseAll() {
  for (const key of Object.keys(openStates)) {
    openStates[key] = false
  }
}
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

import {
  GalleryVerticalEnd,
  LayoutDashboard,
  ChevronRight,
  Users,
  Contact,
  User,
  CircleUserRound,
  CreditCard,
  Settings,
  LogOut,
  File,
  SquareActivity,
  FileText,
  CalendarCheck,
  Rotate3d,
  ReceiptPoundSterling,
  CalendarX,
  ListCollapse,
} from '@lucide/vue'

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
              <span class="truncate font-semibold">Dashboard</span>
              <span class="truncate text-xs">Enterprise Application</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel class="flex items-center justify-between">
          <span>General</span>
          <Button variant="ghost" size="sm" @click="collapseAll">
            <ListCollapse class="size-4" />
          </Button>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                as-child
                tooltip="Dashboard"
                :isActive="route.path === '/dashboard'"
              >
                <RouterLink to="/dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <!-- Activity -->
            <SidebarMenuItem>
              <Collapsible v-model:open="openStates.activities">
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton
                    class="group"
                    tooltip="Activities"
                    :isActive="
                      route.path.startsWith('/dashboard/activities') ||
                      route.path.startsWith('/dashboard/activity/')
                    "
                  >
                    <SquareActivity />
                    <span>Activities</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton
                        as-child
                        :isActive="route.path === '/dashboard/activities'"
                      >
                        <RouterLink to="/dashboard/activities"> All Activities </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton
                        as-child
                        :isActive="route.path === '/dashboard/activity/add'"
                      >
                        <RouterLink to="/dashboard/activity/add"> Add Activity </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <!-- Schedules -->
            <SidebarMenuItem>
              <Collapsible v-model:open="openStates.schedules">
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton
                    class="group"
                    tooltip="Schedules"
                    :isActive="
                      route.path.startsWith('/dashboard/schedules') ||
                      route.path.startsWith('/dashboard/schedule/')
                    "
                  >
                    <CalendarCheck />
                    <span>Schedules</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child :isActive="route.path === '/dashboard/schedules'">
                        <RouterLink to="/dashboard/schedules"> All Schedules </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton
                        as-child
                        :isActive="route.path === '/dashboard/schedule/add'"
                      >
                        <RouterLink to="/dashboard/schedule/add"> Add Schedule </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <!-- Invoices -->
            <SidebarMenuItem>
              <Collapsible v-model:open="openStates.invoices">
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton
                    class="group"
                    tooltip="Users"
                    :isActive="
                      route.path.startsWith('/dashboard/invoices') ||
                      route.path.startsWith('/dashboard/invoice/')
                    "
                  >
                    <FileText />
                    <span>Invoices</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child :isActive="route.path === '/dashboard/invoices'">
                        <RouterLink to="/dashboard/invoices"> All Invoices </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton
                        as-child
                        :isActive="route.path === '/dashboard/invoice/add'"
                      >
                        <RouterLink to="/dashboard/invoice/add"> Add Invoice </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <!-- Rate Sheets -->
            <SidebarMenuItem>
              <Collapsible v-model:open="openStates.rateSheets">
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton
                    class="group"
                    tooltip="Users"
                    :isActive="
                      route.path.startsWith('/dashboard/rate-sheets') ||
                      route.path.startsWith('/dashboard/rate-sheet/')
                    "
                  >
                    <ReceiptPoundSterling />
                    <span>Rate Sheets</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton
                        as-child
                        :isActive="route.path === '/dashboard/rate-sheets'"
                      >
                        <RouterLink to="/dashboard/rate-sheets"> All Rate Sheets </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton
                        as-child
                        :isActive="route.path === '/dashboard/rate-sheet/add'"
                      >
                        <RouterLink to="/dashboard/rate-sheet/add"> Add Rate Sheet </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <!-- Rotas -->
            <SidebarMenuItem>
              <Collapsible v-model:open="openStates.rotas">
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton
                    class="group"
                    tooltip="Rotas"
                    :isActive="
                      route.path.startsWith('/dashboard/rotas') ||
                      route.path.startsWith('/dashboard/rota/')
                    "
                  >
                    <Rotate3d />
                    <span>Rotas</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child :isActive="route.path === '/dashboard/rotas'">
                        <RouterLink to="/dashboard/rotas"> All Rotas </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child :isActive="route.path === '/dashboard/rota/add'">
                        <RouterLink to="/dashboard/rota/add"> Add Rota </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <!-- Leave -->
            <SidebarMenuItem>
              <Collapsible v-model:open="openStates.leave">
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton
                    class="group"
                    tooltip="Users"
                    :isActive="route.path.startsWith('/dashboard/leave')"
                  >
                    <CalendarX />
                    <span>Leave</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child :isActive="route.path === '/dashboard/leave'">
                        <RouterLink to="/dashboard/leave"> All Leave </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child :isActive="route.path === '/dashboard/leave/add'">
                        <RouterLink to="/dashboard/leave/add"> Add Leave </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <!-- form -->
            <SidebarMenuItem>
              <Collapsible v-model:open="openStates.forms">
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton
                    class="group"
                    tooltip="Forms"
                    :isActive="
                      route.path.startsWith('/dashboard/forms') ||
                      route.path.startsWith('/dashboard/form/')
                    "
                  >
                    <File />
                    <span>Forms</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child :isActive="route.path === '/dashboard/forms'">
                        <RouterLink to="/dashboard/forms"> All Forms </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child :isActive="route.path === '/dashboard/form/add'">
                        <RouterLink to="/dashboard/form/add"> Add Form </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Users</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Collapsible v-model:open="openStates.employees">
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton
                    class="group"
                    tooltip="Employees"
                    :isActive="
                      route.path.startsWith('/dashboard/employees') ||
                      route.path.startsWith('/dashboard/employee/')
                    "
                  >
                    <Contact />
                    <span>Employees</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child :isActive="route.path === '/dashboard/employees'">
                        <RouterLink to="/dashboard/employees"> All Employees </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton
                        as-child
                        :isActive="route.path === '/dashboard/employee/add'"
                      >
                        <RouterLink to="/dashboard/employee/add"> Add Employee </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Collapsible v-model:open="openStates.clients">
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton
                    class="group"
                    tooltip="Clients"
                    :isActive="
                      route.path.startsWith('/dashboard/clients') ||
                      route.path.startsWith('/dashboard/client/')
                    "
                  >
                    <Users />
                    <span>Clients</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child :isActive="route.path === '/dashboard/clients'">
                        <RouterLink to="/dashboard/clients"> All Clients </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton
                        as-child
                        :isActive="route.path === '/dashboard/client/add'"
                      >
                        <RouterLink to="/dashboard/client/add"> Add Client </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Collapsible v-model:open="openStates.funders">
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton
                    class="group"
                    tooltip="Funders"
                    :isActive="
                      route.path.startsWith('/dashboard/funders') ||
                      route.path.startsWith('/dashboard/funder/')
                    "
                  >
                    <CircleUserRound />
                    <span>Funders</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child :isActive="route.path === '/dashboard/funders'">
                        <RouterLink to="/dashboard/funders"> All Funders </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton
                        as-child
                        :isActive="route.path === '/dashboard/funder/add'"
                      >
                        <RouterLink to="/dashboard/funder/add"> Add Funder </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Collapsible v-model:open="openStates.users">
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton
                    class="group"
                    tooltip="Users"
                    :isActive="route.path.startsWith('/dashboard/users')"
                  >
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
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton size="lg" tooltip="Account">
                <Avatar class="size-8 rounded-lg">
                  <AvatarFallback class="rounded-lg">{{ auth.user?.name?.charAt(0) ?? 'U' }}</AvatarFallback>
                </Avatar>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">{{ auth.user?.name ?? 'User' }}</span>
                  <span class="truncate text-xs">{{ auth.user?.email ?? '' }}</span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" class="w-56" align="start">
              <DropdownMenuLabel class="font-normal">
                <div class="flex flex-col gap-1">
                  <p class="font-medium text-sm">{{ auth.user?.name ?? 'User' }}</p>
                  <p class="text-muted-foreground text-xs">{{ auth.user?.email ?? '' }}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User class="mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard class="mr-2" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings class="mr-2" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="auth.logout">
                <LogOut class="mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
</template>

<style scoped>
:deep([data-slot='sidebar-menu-button'][data-active='true']) {
  background-color: oklch(63.5% 0.22 250) !important;
  color: white !important;
}

:deep([data-slot='sidebar-menu-sub'] [data-slot='sidebar-menu-button'][data-active='true']) {
  background-color: transparent !important;
  color: oklch(63.5% 0.22 250) !important;
}
</style>
