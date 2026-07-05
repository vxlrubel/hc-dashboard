<script setup lang="ts">
import PageTitle from '@/components/PageTitle.vue'

import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Loader } from '@lucide/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useRateSheetsStore } from '@/stores/rateSheet'

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
  },
})

const rateSheetStore = useRateSheetsStore()
const { createLoading } = storeToRefs(rateSheetStore)

const onSubmit = form.handleSubmit(async (values) => {
  await rateSheetStore.createRateSheet({
    name: values.name,
    description: values.description,
    hourlyRate: values.hourlyRate,
    overnightRate: values.overnightRate,
    weekendRate: values.weekendRate,
    effectiveFrom: values.effectiveFrom,
    effectiveTo: values.effectiveTo,
  })
})
</script>

<template>
  <div>
    <PageTitle title="Add Rate Sheet" subtitle="Create a new rate sheet record.">
      <RouterLink to="/dashboard/rate-sheets">
        <Button class="button-primary-outline">All Rate Sheets</Button>
      </RouterLink>
    </PageTitle>
    <form @submit="onSubmit">
      <Card class="w-full max-w-2xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>New Rate Sheet</CardTitle>
          <CardDescription>Create a new rate sheet record with valid input.</CardDescription>
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
          </div>
        </CardContent>
        <CardFooter class="flex items-center gap-4">
          <Button variant="outline" type="submit" :disabled="createLoading"> Save </Button>
          <Loader class="size-5 animate-spin" v-if="createLoading" />
        </CardFooter>
      </Card>
    </form>
  </div>
</template>

<style scoped>
textarea,
input {
  border-radius: var(--input-border-radius);
}
</style>
