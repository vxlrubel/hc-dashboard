<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" class="h-8 w-8 rounded-full cursor-pointer">
        <Icon
          icon="radix-icons:moon"
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Icon
          icon="radix-icons:sun"
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <Icon
          icon="radix-icons:desktop"
          class="h-[1.2rem] w-[1.2rem] scale-100 transition-all"
          v-if="mode === 'auto'"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="mode = 'light'" class="cursor-pointer">
        <Icon
          icon="radix-icons:moon"
          class="h-[1.2rem] w-[1.2rem] scale-100 transition-all -rotate-90"
        />
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'" class="cursor-pointer">
        <Icon
          icon="radix-icons:sun"
          class="h-[1.2rem] w-[1.2rem] scale-100 transition-all -rotate-90"
        />
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'" class="cursor-pointer">
        <Icon icon="radix-icons:desktop" class="h-[1.2rem] w-[1.2rem] scale-100 transition-all" />
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
