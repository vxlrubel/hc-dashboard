<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink, useRoute, onBeforeRouteLeave } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useActivitiesStore } from '@/stores/activity'
import { useConfirmDialog } from '@/composables/useConfirmDialog'
import { Loader } from '@lucide/vue'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2, 'Title must be at least 2 characters'),
    description: z.string().min(5, 'Description must be at least 5 characters'),
    status: z.string().min(1, 'Please select a status'),
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: '',
    description: '',
    status: '',
  },
})

const { meta } = form

const activityStore = useActivitiesStore()
const { updateLoading } = storeToRefs(activityStore)
const route = useRoute()
const activityId = route.params.id as string

const { confirm } = useConfirmDialog()
const submitted = ref(false)

onMounted(async () => {
  const result = await activityStore.getAcivity(activityId)

  if (result) {
    form.resetForm({
      values: {
        title: result.title,
        description: result.description,
        status: result.status,
      },
    })
  }
})

function handleBeforeUnload(e: BeforeUnloadEvent) {
  if (meta.value.dirty && !submitted.value) {
    e.preventDefault()
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})

onBeforeRouteLeave(async () => {
  if (meta.value.dirty && !submitted.value) {
    const leave = await confirm('You have unsaved changes. Are you sure you want to leave?', {
      confirmLabel: 'Leave',
      cancelLabel: 'Stay',
    })
    if (!leave) return false
  }
})

const onSubmit = form.handleSubmit(async (formValues) => {
  submitted.value = true
  await activityStore.updateActivity(activityId, {
    title: formValues.title,
    description: formValues.description,
    status: formValues.status,
  })
})
</script>

<template>
  <div>
    <PageTitle title="Edit Activity" subtitle="You may update the activity from here.">
      <RouterLink to="/dashboard/activities">
        <Button class="button-primary-outline">All Activities</Button>
      </RouterLink>
    </PageTitle>
    <form @submit="onSubmit">
      <Card class="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>Edit Activity</CardTitle>
          <CardDescription>Update the activity details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid w-full items-center gap-5">
            <FormField v-slot="{ componentField }" name="title">
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Insert title here..." v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="description">
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write activity description..."
                    class="min-h-25 max-h-40"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ field }" name="status">
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select :model-value="field.value" @update:model-value="field.onChange">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </CardContent>
        <CardFooter class="flex items-center gap-4">
          <Button variant="outline" type="submit" :disabled="updateLoading">
            Update Activity
          </Button>
          <Loader class="size-5 animate-spin" v-if="updateLoading" />
        </CardFooter>
      </Card>
    </form>
  </div>
</template>
