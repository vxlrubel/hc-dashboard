<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink, useRoute } from 'vue-router'
import { useClientsStore } from '@/stores/client'
import { Loader, Pencil, ArrowLeft } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { ukFormat } from '@/utils/dateFormat'
import { getStatus } from '@/utils/status'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const route = useRoute()
const clientStore = useClientsStore()
const clientId = route.params.id as string

const client = ref<{
  id: number | string
  name: string
  email: string
  phone: string
  company: string
  status: string
  created_at: string
  updated_at: string
} | null>(null)

const loading = ref(true)

onMounted(async () => {
  const result = await clientStore.fetchClient(clientId)
  client.value = result ?? null
  loading.value = false
})
</script>

<template>
  <div>
    <PageTitle title="Client Details" subtitle="View and manage client information.">
      <RouterLink to="/dashboard/clients">
        <Button class="button-primary-outline">All Clients</Button>
      </RouterLink>
    </PageTitle>

    <div v-if="loading" class="flex justify-center mt-20">
      <Loader class="size-8 animate-spin text-muted-foreground" />
    </div>

    <Card v-else-if="client" class="w-full max-w-2xl mx-auto mt-10">
      <CardHeader>
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <CardTitle class="text-[22px] font-semibold leading-[normal] text-foreground"
              >{{ client.name }}
            </CardTitle>
            <CardDescription class="mt-1">{{ client.company }}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div class="flex">
          <div class="flex-1 min-w-0 space-y-4 text-sm text-muted-foreground">
            <div>
              <dt class="text-sm font-medium text-foreground">Email</dt>
              <dd>{{ client.email }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-foreground">Phone</dt>
              <dd>{{ client.phone }}</dd>
            </div>
          </div>
          <div class="ml-6 flex-shrink-0 w-40 space-y-4">
            <span v-html="getStatus(client.status)"></span>
            <div class="border-t pt-4 mt-4">
              <dt class="text-sm font-medium text-muted-foreground">Created at</dt>
              <dd class="mt-1 text-sm" v-html="ukFormat(client.created_at)"></dd>
            </div>

            <div class="border-t pt-4">
              <dt class="text-sm font-medium text-muted-foreground">Updated at</dt>
              <dd class="mt-1 text-sm" v-html="ukFormat(client.updated_at)"></dd>
            </div>

            <div class="border-t pt-4">
              <dt class="text-sm font-medium text-muted-foreground">Client ID</dt>
              <dd class="mt-1 text-sm font-mono">{{ client.id }}</dd>
            </div>
          </div>
        </div>
        <dl class="space-y-4">
          <div class="flex items-center gap-3 pt-4">
            <RouterLink :to="`/dashboard/client/edit/${client.id}`">
              <Button class="button-primary" size="sm">
                <Pencil class="size-4 mr-1" />
                Edit
              </Button>
            </RouterLink>
            <RouterLink to="/dashboard/clients">
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
        Client not found.
      </CardContent>
    </Card>
  </div>
</template>
