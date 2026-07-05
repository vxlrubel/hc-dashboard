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
import { useRateSheetsStore } from '@/stores/rateSheet'
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
    name: z.string().min(2, 'Name must be at least 2 characters'),
    description: z.string().min(5, 'Description must be at least 5 characters'),
    hourlyRate: z.coerce.number().positive('Hourly rate must be greater than 0'),
    overnightRate: z.coerce.number().positive('Overnight rate must be greater than 0'),
    weekendRate: z.coerce.number().positive('Weekend rate must be greater than 0'),
    effectiveFrom: z.string().min(1, 'Effective from date is required'),
    effectiveTo: z.string().min(1, 'Effective to date is required'),
    status: z.string().min(1, 'Please select a status'),
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    description: '',
    hourlyRate: '',
    overnightRate: '',
    weekendRate: '',
    effectiveFrom: '',
    effectiveTo: '',
    status: '',
  },
})

const { meta } = form

const rateSheetStore = useRateSheetsStore()
const { updateLoading } = storeToRefs(rateSheetStore)
const route = useRoute()
const rateSheetId = route.params.id as string

const { confirm } = useConfirmDialog()
const submitted = ref(false)

onMounted(async () => {
  const result = await rateSheetStore.fetchRateSheet(rateSheetId)

  if (result) {
    form.resetForm({
      values: {
        name: result.name,
        description: result.description,
        hourlyRate: result.hourlyRate,
        overnightRate: result.overnightRate,
        weekendRate: result.weekendRate,
        effectiveFrom: result.effectiveFrom,
        effectiveTo: result.effectiveTo,
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
  await rateSheetStore.updateRateSheet(rateSheetId, {
    name: formValues.name,
    description: formValues.description,
    hourlyRate: formValues.hourlyRate,
    overnightRate: formValues.overnightRate,
    weekendRate: formValues.weekendRate,
    effectiveFrom: formValues.effectiveFrom,
    effectiveTo: formValues.effectiveTo,
    status: formValues.status,
  })
})
</script>

<template>
  <div>
    <PageTitle title="Edit Rate Sheet" subtitle="Update rate sheet information.">
      <RouterLink to="/dashboard/rate-sheets">
        <Button class="button-primary-outline">All Rate Sheets</Button>
      </RouterLink>
    </PageTitle>
    <form @submit="onSubmit">
      <Card class="w-full max-w-2xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>Edit Rate Sheet</CardTitle>
          <CardDescription>Update the rate sheet details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid w-full items-center gap-5">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Standard Rate" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="description">
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the rate sheet..."
                    class="min-h-[100px]"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <div class="grid grid-cols-3 gap-4">
              <FormField v-slot="{ componentField }" name="hourlyRate">
                <FormItem>
                  <FormLabel>Hourly Rate</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="overnightRate">
                <FormItem>
                  <FormLabel>Overnight Rate</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="weekendRate">
                <FormItem>
                  <FormLabel>Weekend Rate</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <FormField v-slot="{ componentField }" name="effectiveFrom">
                <FormItem>
                  <FormLabel>Effective From</FormLabel>
                  <FormControl>
                    <Input type="date" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="effectiveTo">
                <FormItem>
                  <FormLabel>Effective To</FormLabel>
                  <FormControl>
                    <Input type="date" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>

            <FormField v-slot="{ field }" name="status">
              <FormItem class="flex gap-4">
                <FormLabel class="min-w-20">Status</FormLabel>
                <FormControl>
                  <Select :model-value="field.value" @update:model-value="field.onChange">
                    <SelectTrigger class="min-w-40">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent class="min-w-40">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
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
            Update Rate Sheet
          </Button>
          <Loader class="size-5 animate-spin" v-if="updateLoading" />
        </CardFooter>
      </Card>
    </form>
  </div>
</template>
