<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink, useRoute } from 'vue-router'
import { useLeaveStore } from '@/stores/leave'
import { Loader, Pencil, ArrowLeft } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { ukFormat } from '@/utils/dateFormat'
import { getStatus } from '@/utils/status'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const route = useRoute()
const leaveStore = useLeaveStore()
const leaveId = route.params.id as string

const leave = ref<{
  id: number | string
  employeeId: string
  type: string
  reason: string
  startDate: string
  endDate: string
  status: string
  approvedBy: string | null
  created_at: string
  updated_at: string
} | null>(null)

const loading = ref(true)

onMounted(async () => {
  const result = await leaveStore.fetchLeave(leaveId)
  leave.value = result ?? null
  loading.value = false
})
</script>

<template>
  <div>
    <PageTitle title="Leave Details" subtitle="View and manage leave request information.">
      <RouterLink to="/dashboard/leave">
        <Button class="button-primary-outline">All Leave</Button>
      </RouterLink>
    </PageTitle>

    <div v-if="loading" class="flex justify-center mt-20">
      <Loader class="size-8 animate-spin text-muted-foreground" />
    </div>

    <Card v-else-if="leave" class="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <CardTitle class="text-[22px] font-semibold leading-[normal] text-foreground"
              >{{ leave.type }} Leave — {{ leave.employeeId }}
            </CardTitle>
            <CardDescription class="mt-1"> </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div class="flex">
          <div class="flex-1 min-w-0 space-y-4 text-sm text-muted-foreground">
            <div>
              <dt class="text-sm font-medium text-muted-foreground">Reason</dt>
              <dd class="mt-1 text-sm">{{ leave.reason }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-muted-foreground">Start Date</dt>
              <dd class="mt-1 text-sm" v-html="ukFormat(leave.startDate)"></dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-muted-foreground">End Date</dt>
              <dd class="mt-1 text-sm" v-html="ukFormat(leave.endDate)"></dd>
            </div>
          </div>
          <div class="ml-6 flex-shrink-0 w-40 space-y-4">
            <div>
              <dt class="text-sm font-medium text-muted-foreground">Status</dt>
              <dd class="mt-1" v-html="getStatus(leave.status)"></dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-muted-foreground">Approved By</dt>
              <dd class="mt-1 text-sm">{{ leave.approvedBy ?? '—' }}</dd>
            </div>
            <div class="border-t pt-4">
              <dt class="text-sm font-medium text-muted-foreground">Created at</dt>
              <dd class="mt-1 text-sm" v-html="ukFormat(leave.created_at)"></dd>
            </div>
            <div class="border-t pt-4">
              <dt class="text-sm font-medium text-muted-foreground">Updated at</dt>
              <dd class="mt-1 text-sm" v-html="ukFormat(leave.updated_at)"></dd>
            </div>
            <div class="border-t pt-4">
              <dt class="text-sm font-medium text-muted-foreground">Leave ID</dt>
              <dd class="mt-1 text-sm font-mono">{{ leave.id }}</dd>
            </div>
          </div>
        </div>
        <dl class="space-y-4">
          <div class="flex items-center gap-3 pt-4">
            <RouterLink :to="`/dashboard/leave/edit/${leave.id}`">
              <Button class="button-primary" size="sm">
                <Pencil class="size-4 mr-1" />
                Edit
              </Button>
            </RouterLink>
            <RouterLink to="/dashboard/leave">
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
        Leave not found.
      </CardContent>
    </Card>
  </div>
</template>
