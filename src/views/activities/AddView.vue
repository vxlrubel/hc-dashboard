<script setup lang="ts">
import { ref } from 'vue'
import PageTitle from '@/components/PageTitle.vue'

import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useActivitiesStore } from '@/stores/activity'
import { Loader } from '@lucide/vue'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const activityStore = useActivitiesStore()
const { createLoading } = storeToRefs(activityStore)
const title = ref('')
const description = ref('')
const handleSubmit = async () => {
  await activityStore.createActivity({
    title: title.value,
    description: description.value,
  })
}
</script>

<template>
  <div>
    <PageTitle title="Add Activity" subtitle="Create a new activity.">
      <!-- You can add action buttons or filters here using the default slot -->
      <RouterLink to="/dashboard/activities" class="button-primary-outline"
        >All Activities</RouterLink
      >
    </PageTitle>
    <form @submit.prevent="handleSubmit">
      <Card class="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>New Acitivity</CardTitle>
          <CardDescription>Create a new activity form here to provide valid input</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid w-full items-center gap-5">
            <div class="flex flex-col space-y-1.5">
              <Label for="title">Title</Label>
              <Input id="title" type="text" placeholder="Insert title here..." v-model="title" />
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="description">Description</Label>
              <Textarea
                v-model="description"
                placeholder="Write activity description..."
                id="description"
                class="min-h-25 max-h-40"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex items-center gap-4">
          <Button variant="outline" type="submit" :disabled="createLoading">
            Create Activty
          </Button>
          <Loader class="size-5 animate-spin" v-if="createLoading" />
        </CardFooter>
      </Card>
    </form>
  </div>
</template>
