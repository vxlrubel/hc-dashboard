<script setup lang="ts">
import { storeToRefs } from 'pinia'
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

import ActivityPagination from './ActivityPagination.vue'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ukFormat } from '@/utils/dateFormat.js'
import { useActivitiesStore } from '@/stores/activity'
const activityStore = useActivitiesStore()

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-15">
            <div class="flex items-center gap-1">
              <Checkbox id="checkAll" />
              <Label for="checkAll">All</Label>
            </div>
          </TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead> Status </TableHead>
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
          <TableCell> {{ status }} </TableCell>
          <TableCell>
            <span v-html="ukFormat(created_at)"></span>
          </TableCell>
          <TableCell> <span v-html="ukFormat(updated_at)"></span> </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <ActivityPagination v-model:page="page" :total="totalActivities" :items-per-page="itemsPerPage" />
  </div>
</template>
