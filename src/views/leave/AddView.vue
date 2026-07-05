<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'

import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useLeaveStore } from '@/stores/leave'
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
    employeeId: z.string().min(1, 'Employee ID is required'),
    type: z.string().min(1, 'Leave type is required'),
    reason: z.string().min(5, 'Reason must be at least 5 characters'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    employeeId: '',
    type: '',
    reason: '',
    startDate: '',
    endDate: '',
  },
})

const leaveStore = useLeaveStore()
const { createLoading } = storeToRefs(leaveStore)

const onSubmit = form.handleSubmit(async (values) => {
  await leaveStore.createLeave({
    employeeId: values.employeeId,
    type: values.type,
    reason: values.reason,
    startDate: values.startDate,
    endDate: values.endDate,
  })
})
</script>

<template>
  <div>
    <PageTitle title="Add Leave" subtitle="Create a new leave request.">
      <RouterLink to="/dashboard/leave">
        <Button class="button-primary-outline">All Leave</Button>
      </RouterLink>
    </PageTitle>
    <form @submit="onSubmit">
      <Card class="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>New Leave</CardTitle>
          <CardDescription>Create a new leave request form here to provide valid input</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid w-full items-center gap-5">
            <FormField v-slot="{ componentField }" name="employeeId">
              <FormItem>
                <FormLabel>Employee ID</FormLabel>
                <FormControl>
                  <Input placeholder="Insert employee ID here..." v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ field }" name="type">
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select :model-value="field.value" @update:model-value="field.onChange">
                    <SelectTrigger class="w-full">
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent class="w-full">
                      <SelectItem value="annual">Annual</SelectItem>
                      <SelectItem value="sick">Sick</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="reason">
              <FormItem>
                <FormLabel>Reason</FormLabel>
                <FormControl>
                  <Textarea placeholder="Insert reason here..." v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="startDate">
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="endDate">
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </CardContent>
        <CardFooter class="flex items-center gap-4">
          <Button variant="outline" type="submit" :disabled="createLoading">
            Save
          </Button>
          <Loader class="size-5 animate-spin" v-if="createLoading" />
        </CardFooter>
      </Card>
    </form>
  </div>
</template>
