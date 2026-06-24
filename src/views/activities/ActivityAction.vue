<script setup lang="ts">
import { Ellipsis, PencilSparkles, Trash2, UserRoundArrowLeft } from '@lucide/vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

defineProps<{
  id: number | string
}>()

const handEditAction = (id) => {
  alert('Edit id is : ' + id)
}
const handDeleteAction = (id) => {
  alert('Delete id is : ' + id)
}
const handAsignAction = (id) => {
  alert('Asign id is : ' + id)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="w-full flex justify-center">
      <Ellipsis />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-45 rounded">
      <DropdownMenuLabel class="text-xs opacity-75">Activity Action</DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuItem class="cursor-pointer" @click.prevent="handEditAction(id)">
        Edit
        <DropdownMenuShortcut>
          <PencilSparkles />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem class="cursor-pointer" @click.prevent="handDeleteAction(id)">
        Delete
        <DropdownMenuShortcut>
          <Trash2 />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem class="cursor-pointer" @click.prevent="handAsignAction(id)">
        Asign
        <DropdownMenuShortcut>
          <UserRoundArrowLeft />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
