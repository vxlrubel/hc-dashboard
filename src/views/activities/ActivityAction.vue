<script setup lang="ts">
import { Ellipsis, PencilSparkles, Trash2, UserRoundArrowLeft, Eye } from '@lucide/vue'

import ActionText from '@/constants/action-text'
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

const handViewAction = (id) => {
  const url = `/dashboard/activity/show/${id}`
  router.push(url)
}

const handAsignAction = (id) => {
  alert('Asign id is : ' + id)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="w-full flex justify-center" @click.stop.prevent>
      <Ellipsis />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-45 rounded">
      <DropdownMenuLabel class="text-xs opacity-75">Activity Action</DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuItem class="cursor-pointer" @click.prevent="handEditAction(id)">
        {{ ActionText.edit }}
        <DropdownMenuShortcut>
          <PencilSparkles />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem class="cursor-pointer" @click.prevent="handViewAction(id)">
        {{ ActionText.view }}
        <DropdownMenuShortcut>
          <Eye />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem class="cursor-pointer" @click.prevent="handDeleteAction(id)">
        {{ ActionText.trash }}
        <DropdownMenuShortcut>
          <Trash2 />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem class="cursor-pointer" @click.prevent="handAsignAction(id)">
        {{ ActionText.assign }}
        <DropdownMenuShortcut>
          <UserRoundArrowLeft />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
