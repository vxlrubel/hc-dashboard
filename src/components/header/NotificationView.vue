<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CalendarDaysIcon } from '@lucide/vue'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="outline" class="h-8 w-8 rounded-full cursor-pointer">
        <Icon icon="radix-icons:bell" class="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-75">
      <DropdownMenuLabel>
        <div class="flex items-center justify-between">
          <span>Notifications (3)</span>
          <Button variant="link" class="cursor-pointer">View All</Button>
        </div>
        <div class="text-sm text-muted-foreground">You have 3 unread notifications</div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="flex space-x-2 cursor-pointer" v-for="n in 20" :key="n">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div class="space-y-1 flex-1">
          <div class="line-clamp-1">Complete Activity</div>
          <div class="text-xs text-muted-foreground line-clamp-1">
            You have completed the activity.
          </div>
          <div class="flex items-center pt-1">
            <CalendarDaysIcon class="mr-1 size-3 opacity-70" />
            <span class="text-[10px] text-muted-foreground pt-0.5">5 Jun 2025 : 10:00 AM</span>
          </div>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuLabel class="text-center">
        <Button variant="link" class="cursor-pointer">View All</Button>
      </DropdownMenuLabel>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
