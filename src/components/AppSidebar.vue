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
              <SidebarMenuButton as-child tooltip="Dashboard">
                <RouterLink to="/">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Collapsible>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton class="group" tooltip="Forms">
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
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/forms"> All Forms </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/form/add"> Add Form </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Collapsible>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton class="group" tooltip="Activities">
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
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/activities"> All Activities </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/activity/add"> Add Activity </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Collapsible>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton class="group" tooltip="Rotas">
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
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/rotas"> All Rotas </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/rota/add"> Add Rota </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Collapsible>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton class="group" tooltip="Schedules">
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
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/schedules"> All Schedules </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/schedule/add"> Add Schedule </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Collapsible>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton class="group" tooltip="Users">
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
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/invoices"> All Invoices </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/invoice/add"> Add Invoice </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Collapsible>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton class="group" tooltip="Users">
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
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/rate-sheets"> All Rate Sheets </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/rate-sheet/add"> Add Rate Sheet </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Collapsible>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton class="group" tooltip="Users">
                    <Users />
                    <span>Leave</span>
                    <ChevronRight
                      class="ml-auto transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-90"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/leave"> All Leave </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/leave/add"> Add Leave </RouterLink>
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
              <Collapsible>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton class="group" tooltip="Employees">
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
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/employees"> All Employees </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/employee/add"> Add Employee </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Collapsible>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton class="group" tooltip="Clients">
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
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/clients"> All Clients </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/client/add"> Add Client </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Collapsible>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton class="group" tooltip="Funders">
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
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/funders"> All Funders </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton as-child>
                        <RouterLink to="/dashboard/funder/add"> Add Funder </RouterLink>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Collapsible>
                <CollapsibleTrigger as-child>
                  <SidebarMenuButton class="group" tooltip="Users">
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
                  <AvatarFallback class="rounded-lg">HC</AvatarFallback>
                </Avatar>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">Admin</span>
                  <span class="truncate text-xs">admin@hc.com</span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" class="w-56" align="start">
              <DropdownMenuLabel class="font-normal">
                <div class="flex flex-col gap-1">
                  <p class="font-medium text-sm">Admin</p>
                  <p class="text-muted-foreground text-xs">admin@hc.com</p>
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
              <DropdownMenuItem>
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
