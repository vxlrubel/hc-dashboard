<script setup lang="ts">
import { watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectValue,
} from '@/components/ui/select'

import FormAction from './FormAction.vue'

import type { DateValue } from '@internationalized/date'
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { CalendarIcon, X, Loader } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import ActivityPagination from '@/views/activities/ActivityPagination.vue'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ukFormat } from '@/utils/dateFormat'
import { getStatus } from '@/utils/status'
import { useFormsStore } from '@/stores/form'
const formStore = useFormsStore()

const route = useRoute()
const router = useRouter()

const pageParam = route.query.page
if (pageParam) {
  formStore.page = Number(pageParam)
} else {
  formStore.page = 1
}

const defaultPlaceholder = today(getLocalTimeZone())
const date = ref() as Ref<DateValue>
const toDate = ref() as Ref<DateValue>
const df = new DateFormatter('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

watch(
  () => formStore.page,
  (newPage) => {
    if (newPage > 1) {
      router.replace({ query: { page: String(newPage) } })
    } else {
      router.replace({ query: {} })
    }
  },
)

const { paginatedForms, page, itemsPerPage, totalForms, buikLoading, deletingIds } =
  storeToRefs(formStore)

async function onApply() {
  await formStore.handleBuilAction()
}
</script>

<template>
  <div>
    <PageTitle title="Form List" subtitle="View and manage all forms.">
      <RouterLink to="/dashboard/form/add">
        <Button class="button-primary-outline">Add New Form</Button>
      </RouterLink>
    </PageTitle>

    <div class="flex flex-col items-start md:flex-row md:items-center gap-4 mb-2">
      <div class="flex items-center gap-2 w-full md:w-62">
        <div class="flex-1">
          <Select>
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Bulk action" />
            </SelectTrigger>
            <SelectContent class="w-full">
              <SelectGroup>
                <SelectLabel>Actions</SelectLabel>
                <SelectItem value="edit"> Edit </SelectItem>
                <SelectItem value="trash"> Move to trash </SelectItem>
                <SelectItem value="delete"> Delete </SelectItem>
                <SelectItem value="restore"> Restore </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button :disabled="buikLoading" variant="outline" @click.prevent="onApply" class="w-18.75">
          <template v-if="buikLoading">
            <Loader class="animate-spin" />
          </template>
          <template v-else>Apply</template>
        </Button>
      </div>
      <div class="flex justify-between flex-wrap w-full md:w-100 md:flex-nowrap gap-2">
        <div class="w-[48%]">
          <Popover v-slot="{ close }">
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                :class="
                  cn(
                    'w-full justify-start text-left font-normal rounded relative',
                    !date && 'text-muted-foreground',
                  )
                "
              >
                <CalendarIcon />
                {{ date ? df.format(date.toDate(getLocalTimeZone())) : 'Start date' }}

                <span
                  v-if="date"
                  class="absolute top-0 bottom-0 right-0 inline-flex items-center px-2"
                  @click.stop="date = undefined"
                >
                  <X />
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0" align="start">
              <Calendar
                v-model="date"
                :default-placeholder="defaultPlaceholder"
                layout="month-and-year"
                initial-focus
                @update:model-value="close"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div class="w-[48%]">
          <Popover v-slot="{ close }">
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                :class="
                  cn(
                    'w-full justify-start text-left font-normal rounded relative',
                    !toDate && 'text-muted-foreground',
                  )
                "
              >
                <CalendarIcon />
                {{ toDate ? df.format(toDate.toDate(getLocalTimeZone())) : 'End date' }}
                <span
                  v-if="toDate"
                  class="absolute top-0 bottom-0 right-0 inline-flex items-center px-2"
                  @click.stop="toDate = undefined"
                >
                  <X />
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0" align="start">
              <Calendar
                v-model="toDate"
                :default-placeholder="defaultPlaceholder"
                layout="month-and-year"
                initial-focus
                @update:model-value="close"
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button variant="outline"> Filter </Button>
      </div>
    </div>

    <div class="relative">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-15">
              <div class="flex items-center gap-1">
                <Checkbox id="checkAll" />
                <Label for="checkAll">All</Label>
              </div>
            </TableHead>
            <TableHead class="min-w-15 w-15">Action</TableHead>
            <TableHead class="min-w-35">Title</TableHead>
            <TableHead class="min-w-25">Type</TableHead>
            <TableHead class="min-w-50">Description</TableHead>
            <TableHead class="min-w-20">Version</TableHead>
            <TableHead class="min-w-25">Status</TableHead>
            <TableHead class="min-w-30">Created By</TableHead>
            <TableHead class="w-35">Created at</TableHead>
            <TableHead class="w-35">Updated at</TableHead>
          </TableRow>
        </TableHeader>
        <TransitionGroup tag="tbody" name="row">
          <TableRow
            v-for="{
              id,
              title,
              type,
              description,
              version,
              status,
              createdBy,
              created_at,
              updated_at,
            } in paginatedForms"
            :key="id"
            :class="deletingIds[id] ? 'bg-red-100 dark:bg-red-950/30' : ''"
          >
            <TableCell class="font-medium">
              <Checkbox />
            </TableCell>
            <TableCell>
              <FormAction :id="id" />
            </TableCell>
            <TableCell>{{ title }}</TableCell>
            <TableCell>{{ type }}</TableCell>
            <TableCell>{{ description }}</TableCell>
            <TableCell>{{ version }}</TableCell>
            <TableCell>
              <span v-html="getStatus(status)"></span>
            </TableCell>
            <TableCell>{{ createdBy }}</TableCell>
            <TableCell>
              <span v-html="ukFormat(created_at)"></span>
            </TableCell>
            <TableCell> <span v-html="ukFormat(updated_at)"></span> </TableCell>
          </TableRow>
        </TransitionGroup>
      </Table>

      <ActivityPagination
        v-model:page="page"
        :total="totalForms"
        :items-per-page="itemsPerPage"
      />
    </div>
  </div>
</template>

<style scoped>
.row-leave-active {
  transition: opacity 0.4s ease;
}

.row-leave-to {
  opacity: 0;
}
</style>
