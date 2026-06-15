<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
</script>

<template>
  <NavigationMenu :viewport="false">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Create</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid gap-2 md:w-100 lg:w-125 lg:grid-cols-[1fr_1fr]">
            <li class="row-span-3">
              <NavigationMenuLink as-child>
                <RouterLink to="/dashboard/form/add">
                  <div class="font-medium">Add Form</div>
                  <div class="text-muted-foreground">Create a new interactive form.</div>
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="/dashboard/activity/add">
                  <div class="font-medium">Add Activity</div>
                  <div class="text-muted-foreground">Create a new activity.</div>
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="/dashboard/rota/add">
                  <div class="font-medium">Add Rota</div>
                  <div class="text-muted-foreground">Create a new rota.</div>
                </RouterLink>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink as-child>
                <RouterLink to="/dashboard/schedule/add">
                  <div class="font-medium">Add Schedule</div>
                  <div class="text-muted-foreground">Create a new schedule.</div>
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="/dashboard/invoice/add">
                  <div class="font-medium">Add Invoice</div>
                  <div class="text-muted-foreground">Create a new invoice.</div>
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="/dashboard/rate-sheet/add">
                  <div class="font-medium">Add Rate Sheet</div>
                  <div class="text-muted-foreground">Create a new rate sheet.</div>
                </RouterLink>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger>List</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid gap-2 md:w-100 lg:w-125 lg:grid-cols-[1fr_1fr]">
            <li class="row-span-3">
              <NavigationMenuLink as-child>
                <RouterLink to="/dashboard/forms">
                  <div class="font-medium">Forms</div>
                  <div class="text-muted-foreground">View all interactive forms.</div>
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="/dashboard/activities">
                  <div class="font-medium">Activities</div>
                  <div class="text-muted-foreground">View all activities.</div>
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="/dashboard/rotas">
                  <div class="font-medium">Rota</div>
                  <div class="text-muted-foreground">View all rotas.</div>
                </RouterLink>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink as-child>
                <RouterLink to="/dashboard/schedules">
                  <div class="font-medium">Schedule</div>
                  <div class="text-muted-foreground">View all schedules.</div>
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="/dashboard/invoices">
                  <div class="font-medium">Invoices</div>
                  <div class="text-muted-foreground">View all invoices.</div>
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="/dashboard/rate-sheets">
                  <div class="font-medium">Rate Sheets</div>
                  <div class="text-muted-foreground">View all rate sheets.</div>
                </RouterLink>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger>Application Users</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid gap-2 md:w-100 lg:w-125 lg:grid-cols-[1fr_1fr]">
            <li class="row-span-3">
              <NavigationMenuLink as-child>
                <RouterLink to="/dashboard/employees">
                  <div class="font-medium">Employees</div>
                  <div class="text-muted-foreground">View all employee records.</div>
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="/dashboard/clients">
                  <div class="font-medium">Clients</div>
                  <div class="text-muted-foreground">View all client records.</div>
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="/dashboard/funders">
                  <div class="font-medium">Funders</div>
                  <div class="text-muted-foreground">View all funders records.</div>
                </RouterLink>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink as-child>
                <RouterLink to="/dashboard/employee/add">
                  <div class="font-medium">Add Employee</div>
                  <div class="text-muted-foreground">Add a new employee record.</div>
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="/dashboard/client/add">
                  <div class="font-medium">Add Client</div>
                  <div class="text-muted-foreground">Add a new client record.</div>
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="/dashboard/funder/add">
                  <div class="font-medium">Add Funder</div>
                  <div class="text-muted-foreground">Add a new funder record.</div>
                </RouterLink>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink as-child :class="navigationMenuTriggerStyle()">
          <RouterLink to="/docs">Docs</RouterLink>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
