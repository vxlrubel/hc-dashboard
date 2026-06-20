<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink } from 'vue-router'
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import ActivityPagination from './ActivityPagination.vue'

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

const { paginatedActivities, page, itemsPerPage, totalActivities } = storeToRefs(activityStore)
</script>

<template>
  <div>
    <PageTitle title="Activity List" subtitle="View and manage all activities.">
      <!-- You can add action buttons or filters here using the default slot -->
      <RouterLink to="/dashboard/activity/add" class="button-primary-outline"
        >Add New Activity</RouterLink
      >
    </PageTitle>

    <PrimaryButton label="Apply" />

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
          v-for="{ id, title, description, status, created_at, updated_at } in paginatedActivities"
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
</template>
