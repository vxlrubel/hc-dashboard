<script setup lang="ts">
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from '@lucide/vue'
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
        <NavigationMenuTrigger>Home</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <li class="row-span-3">
              <NavigationMenuLink as-child>
                <a
                  class="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                  href="/"
                >
                  <div class="mt-4 mb-2 text-lg font-medium">shadcn/ui</div>
                  <p class="text-muted-foreground text-sm leading-tight">
                    Beautifully designed components built with Tailwind CSS.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink as-child>
                <RouterLink to="/components">
                  <div class="font-medium">Components</div>
                  <div class="text-muted-foreground">Browse all components in the library.</div>
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="/docs">
                  <div class="font-medium">Documentation</div>
                  <div class="text-muted-foreground">Learn how to use the library.</div>
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="/blog">
                  <div class="font-medium">Blog</div>
                  <div class="text-muted-foreground">Read our latest blog posts.</div>
                </RouterLink>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>List</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[300px] gap-4">
            <li>
              <NavigationMenuLink as-child>
                <a href="#">
                  <div class="font-medium">Components</div>
                  <div class="text-muted-foreground">Browse all components in the library.</div>
                </a>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <a href="#">
                  <div class="font-medium">Documentation</div>
                  <div class="text-muted-foreground">Learn how to use the library.</div>
                </a>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <a href="#">
                  <div class="font-medium">Blog</div>
                  <div class="text-muted-foreground">Read our latest blog posts.</div>
                </a>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[200px] gap-4">
            <li>
              <NavigationMenuLink as-child>
                <a href="#">Components</a>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <a href="#">Documentation</a>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <a href="#">Blocks</a>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[200px] gap-4">
            <li>
              <NavigationMenuLink as-child>
                <a href="#" class="flex-row items-center gap-2">
                  <CircleHelpIcon />
                  Backlog
                </a>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <a href="#" class="flex-row items-center gap-2">
                  <CircleIcon />
                  To Do
                </a>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <a href="#" class="flex-row items-center gap-2">
                  <CircleCheckIcon />
                  Done
                </a>
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
