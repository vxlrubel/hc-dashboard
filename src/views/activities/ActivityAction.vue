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

import { useRouter } from 'vue-router'
import { useActivitiesStore } from '@/stores/activity'
import { useConfirmDialog } from '@/composables/useConfirmDialog'

defineProps<{
  id: number | string
}>()

const router = useRouter()
const store = useActivitiesStore()
const { confirm } = useConfirmDialog()

const handEditAction = (id) => {
  const url = `/dashboard/activity/edit/${id}`
  router.push(url)
}

const handDeleteAction = async (id) => {
  const confirmed = await confirm('Are you sure you want to move this activity to trash?', {
    confirmLabel: 'Yes, move',
    cancelLabel: 'No',
  })
  if (confirmed) {
    await store.deleteActivity(id)
  }
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
