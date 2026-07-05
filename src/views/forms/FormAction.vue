<script setup lang="ts">
import { Ellipsis, PencilSparkles, Trash2, Eye } from '@lucide/vue'

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
import { useFormsStore } from '@/stores/form'
import { useConfirmDialog } from '@/composables/useConfirmDialog'

defineProps<{
  id: number | string
}>()

const router = useRouter()
const store = useFormsStore()
const { confirm } = useConfirmDialog()

const handEditAction = (id) => {
  const url = `/dashboard/form/edit/${id}`
  router.push(url)
}

const handDeleteAction = async (id) => {
  const confirmed = await confirm('Are you sure you want to move this form to trash?', {
    confirmLabel: 'Yes, move',
    cancelLabel: 'No',
  })
  if (confirmed) {
    await store.deleteForm(id)
  }
}

const handViewAction = (id) => {
  const url = `/dashboard/form/show/${id}`
  router.push(url)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="w-full flex justify-center">
      <Ellipsis />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-45 rounded">
      <DropdownMenuLabel class="text-xs opacity-75">Form Action</DropdownMenuLabel>

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
    </DropdownMenuContent>
  </DropdownMenu>
</template>
