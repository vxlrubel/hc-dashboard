<script setup lang="ts">
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
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ukFormat } from '@/utils/dateFormat.js'
import { useActivitiesStore } from '@/stores/activity'
const activityStore = useActivitiesStore()

const { activities } = activityStore
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
          <TableHead class="w-10">
            <div class="flex items-center">
              <Checkbox id="checkAll" />
              <Label for="checkAll">All</Label>
            </div>
          </TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead> Status </TableHead>
          <TableHead> Created at </TableHead>
          <TableHead> Updated at </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="{ id, title, description, status, created_at, updated_at } in activities"
          :key="id"
        >
          <TableCell class="font-medium">
            <Checkbox />
          </TableCell>
          <TableCell>{{ title }}</TableCell>
          <TableCell>{{ description }}</TableCell>
          <TableCell> {{ status }} </TableCell>
          <TableCell>
            <pre>{{ ukFormat(created_at) }}</pre>
          </TableCell>
          <TableCell> {{ updated_at }} </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
