<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink, useRoute, onBeforeRouteLeave } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Loader } from '@lucide/vue'
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
import { useSchedulesStore } from '@/stores/schedule'
import { useConfirmDialog } from '@/composables/useConfirmDialog'

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
    employeeId: z.string().min(1, 'Employee ID is required'),
    clientId: z.string().min(1, 'Client ID is required'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
    location: z.string().min(2, 'Location must be at least 2 characters'),
    status: z.string().min(1, 'Please select a status'),
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: '',
    description: '',
    employeeId: '',
    clientId: '',
    startTime: '',
    endTime: '',
    location: '',
    status: '',
  },
})

const { meta } = form

const scheduleStore = useSchedulesStore()
const { updateLoading } = storeToRefs(scheduleStore)
const route = useRoute()
const scheduleId = route.params.id as string

const { confirm } = useConfirmDialog()
const submitted = ref(false)

onMounted(async () => {
  const result = await scheduleStore.fetchSchedule(scheduleId)

  if (result) {
    form.resetForm({
      values: {
        title: result.title,
        description: result.description,
        employeeId: result.employeeId,
        clientId: result.clientId,
        startTime: result.startTime,
        endTime: result.endTime,
        location: result.location,
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
  await scheduleStore.updateSchedule(scheduleId, {
    title: formValues.title,
    description: formValues.description,
    employeeId: formValues.employeeId,
    clientId: formValues.clientId,
    startTime: formValues.startTime,
    endTime: formValues.endTime,
    location: formValues.location,
    status: formValues.status,
  })
})
</script>

<template>
  <div>
    <PageTitle title="Edit Schedule" subtitle="Update schedule information.">
      <RouterLink to="/dashboard/schedules">
        <Button class="button-primary-outline">All Schedules</Button>
      </RouterLink>
    </PageTitle>
    <form @submit="onSubmit">
      <Card class="w-full max-w-2xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>Edit Schedule</CardTitle>
          <CardDescription>Update the schedule details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid w-full items-center gap-5">
            <FormField v-slot="{ componentField }" name="title">
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Schedule title" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="description">
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Schedule description"
                    class="min-h-[100px]"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <div class="grid grid-cols-2 gap-4">
              <FormField v-slot="{ componentField }" name="employeeId">
                <FormItem>
                  <FormLabel>Employee ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Employee ID" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="clientId">
                <FormItem>
                  <FormLabel>Client ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Client ID" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <FormField v-slot="{ componentField }" name="startTime">
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="endTime">
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>

            <FormField v-slot="{ componentField }" name="location">
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Location" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ field }" name="status">
              <FormItem class="flex gap-4">
                <FormLabel class="min-w-20">Status</FormLabel>
                <FormControl>
                  <Select :model-value="field.value" @update:model-value="field.onChange">
                    <SelectTrigger class="min-w-40">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent class="min-w-40">
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
        <CardFooter class="flex items-center justify-end gap-4">
          <Button class="button-primary" type="submit" :disabled="updateLoading">
            Update Schedule
          </Button>
          <Loader class="size-5 animate-spin" v-if="updateLoading" />
        </CardFooter>
      </Card>
    </form>
  </div>
</template>
