<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink, useRoute } from 'vue-router'
import { useSchedulesStore } from '@/stores/schedule'
import { Loader, Pencil, ArrowLeft } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { ukFormat } from '@/utils/dateFormat'
import { getStatus } from '@/utils/status'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const route = useRoute()
const scheduleStore = useSchedulesStore()
const scheduleId = route.params.id as string

const schedule = ref<{
  id: number | string
  title: string
  description: string
  employeeId: string
  clientId: string
  startTime: string
  endTime: string
  location: string
  status: string
  created_at: string
  updated_at: string
} | null>(null)

const loading = ref(true)

onMounted(async () => {
  const result = await scheduleStore.fetchSchedule(scheduleId)
  schedule.value = result ?? null
  loading.value = false
})
</script>

<template>
  <div>
    <PageTitle title="Schedule Details" subtitle="View and manage schedule information.">
      <RouterLink to="/dashboard/schedules">
        <Button class="button-primary-outline">All Schedules</Button>
      </RouterLink>
    </PageTitle>

    <div v-if="loading" class="flex justify-center mt-20">
      <Loader class="size-8 animate-spin text-muted-foreground" />
    </div>

    <Card v-else-if="schedule" class="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <CardTitle class="text-[22px] font-semibold leading-[normal] text-foreground"
              >{{ schedule.title }}
            </CardTitle>
            <CardDescription class="mt-1"> </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div class="flex">
          <div class="flex-1 min-w-0 space-y-4 text-sm text-muted-foreground">
            <div><strong>Description:</strong> {{ schedule.description }}</div>
            <div><strong>Employee ID:</strong> {{ schedule.employeeId }}</div>
            <div><strong>Client ID:</strong> {{ schedule.clientId }}</div>
            <div><strong>Start Time:</strong> {{ schedule.startTime }}</div>
            <div><strong>End Time:</strong> {{ schedule.endTime }}</div>
            <div><strong>Location:</strong> {{ schedule.location }}</div>
          </div>
          <div class="ml-6 flex-shrink-0 w-40 space-y-4">
            <span v-html="getStatus(schedule.status)"></span>
            <div class="border-t pt-4 mt-4">
              <dt class="text-sm font-medium text-muted-foreground">Created at</dt>
              <dd class="mt-1 text-sm" v-html="ukFormat(schedule.created_at)"></dd>
            </div>

            <div class="border-t pt-4">
              <dt class="text-sm font-medium text-muted-foreground">Updated at</dt>
              <dd class="mt-1 text-sm" v-html="ukFormat(schedule.updated_at)"></dd>
            </div>

            <div class="border-t pt-4">
              <dt class="text-sm font-medium text-muted-foreground">Schedule ID</dt>
              <dd class="mt-1 text-sm font-mono">{{ schedule.id }}</dd>
            </div>
          </div>
        </div>
        <dl class="space-y-4">
          <div class="flex items-center gap-3 pt-4">
            <RouterLink :to="`/dashboard/schedule/edit/${schedule.id}`">
              <Button class="button-primary" size="sm">
                <Pencil class="size-4 mr-1" />
                Edit
              </Button>
            </RouterLink>
            <RouterLink to="/dashboard/schedules">
              <Button class="button-primary-outline" size="sm">
                <ArrowLeft class="size-4 mr-1" />
                Back
              </Button>
            </RouterLink>
          </div>
        </dl>
      </CardContent>
    </Card>

    <Card v-else class="w-full max-w-md mx-auto mt-10">
      <CardContent class="py-10 text-center text-muted-foreground">
        Schedule not found.
      </CardContent>
    </Card>
  </div>
</template>
