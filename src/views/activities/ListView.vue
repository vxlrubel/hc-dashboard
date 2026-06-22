<script setup lang="ts">
import { watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectValue,
} from '@/components/ui/select'

import type { DateValue } from '@internationalized/date'
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { CalendarIcon, X, Loader } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import ActivityPagination from './ActivityPagination.vue'
import SuccessDialog from '@/components/SuccessDialog.vue'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ukFormat } from '@/utils/dateFormat'
import { getStatus } from '@/utils/status'
import { useActivitiesStore } from '@/stores/activity'
const activityStore = useActivitiesStore()

const route = useRoute()
const router = useRouter()

const pageParam = route.query.page
if (pageParam) {
  activityStore.page = Number(pageParam)
} else {
  activityStore.page = 1
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
  () => activityStore.page,
  (newPage) => {
    if (newPage > 1) {
      router.replace({ query: { page: String(newPage) } })
    } else {
      router.replace({ query: {} })
    }
  },
)

const { paginatedActivities, page, itemsPerPage, totalActivities, buikLoading } =
  storeToRefs(activityStore)

async function onApply() {
  await activityStore.handleBuilAction()
}
</script>

<template>
  <div>
    <PageTitle title="Activity List" subtitle="View and manage all activities.">
      <!-- You can add action buttons or filters here using the default slot -->
      <RouterLink to="/dashboard/activity/add" class="button-primary-outline"
        >Add New Activity</RouterLink
      >
    </PageTitle>

    <div class="flex items-center gap-4 mb-2">
      <div class="flex items-center gap-2">
        <Select>
          <SelectTrigger class="w-40">
            <SelectValue placeholder="Bulk action" />
          </SelectTrigger>
          <SelectContent class="w-40">
            <SelectGroup>
              <SelectLabel>Actions</SelectLabel>
              <SelectItem value="edit"> Edit </SelectItem>
              <SelectItem value="trash"> Move to trash </SelectItem>
              <SelectItem value="delete"> Delete </SelectItem>
              <SelectItem value="restore"> Restore </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button :disabled="buikLoading" variant="outline" @click.prevent="onApply" class="w-18.75">
          <template v-if="buikLoading">
            <Loader class="animate-spin" />
          </template>
          <template v-else>Apply</template>
        </Button>
      </div>
      <div class="flex items-center">
        <Popover v-slot="{ close }">
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              :class="
                cn(
                  'w-40 justify-start text-left font-normal rounded relative',
                  !date && 'text-muted-foreground',
                )
              "
            >
              <CalendarIcon />
              {{ date ? df.format(date.toDate(getLocalTimeZone())) : 'Start date' }}

              <span
                v-if="date"
                class="absolute top-0 bottom-0 right-0 inline-flex items-center px-2"
                @click.stop="date = ''"
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
        <Popover v-slot="{ close }">
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              :class="
                cn(
                  'w-40 justify-start text-left font-normal rounded ms-2 relative',
                  !toDate && 'text-muted-foreground',
                )
              "
            >
              <CalendarIcon />
              {{ toDate ? df.format(toDate.toDate(getLocalTimeZone())) : 'End date' }}
              <span
                v-if="toDate"
                class="absolute top-0 bottom-0 right-0 inline-flex items-center px-2"
                @click.stop="toDate = ''"
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
        <Button variant="outline" class="ms-2"> Filter </Button>
      </div>
    </div>

    <div class="relative">
      <!-- <div class="absolute inset-0 flex items-center justify-center z-30 backdrop-blur-[3px]">
        <Loader class="animate-spin" />
      </div> -->
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-15">
              <div class="flex items-center gap-1">
                <Checkbox id="checkAll" />
                <Label for="checkAll">All</Label>
              </div>
            </TableHead>
            <TableHead class="min-w-60 w-60">Title</TableHead>
            <TableHead class="min-w-70">Description</TableHead>
            <TableHead class="min-w-35 w-35"> Status </TableHead>
            <TableHead class="w-35"> Created at </TableHead>
            <TableHead class="w-35"> Updated at </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="{
              id,
              title,
              description,
              status,
              created_at,
              updated_at,
            } in paginatedActivities"
            :key="id"
          >
            <TableCell class="font-medium">
              <Checkbox />
            </TableCell>
            <TableCell>{{ title }}</TableCell>
            <TableCell>{{ description }}</TableCell>
            <TableCell>
              <span v-html="getStatus(status)"></span>
            </TableCell>
            <TableCell>
              <span v-html="ukFormat(created_at)"></span>
            </TableCell>
            <TableCell> <span v-html="ukFormat(updated_at)"></span> </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <ActivityPagination
        v-model:page="page"
        :total="totalActivities"
        :items-per-page="itemsPerPage"
      />
    </div>
    <SuccessDialog />
  </div>
</template>
