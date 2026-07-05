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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFundersStore } from '@/stores/funder'
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
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z
      .string()
      .min(10, 'Phone must be at least 10 characters')
      .regex(/^[\d\s+\-()]+$/, 'Phone must contain only digits and symbols'),
    status: z.string().min(1, 'Please select a status'),
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    email: '',
    phone: '',
    status: '',
  },
})

const { meta } = form

const funderStore = useFundersStore()
const { updateLoading } = storeToRefs(funderStore)
const route = useRoute()
const funderId = route.params.id as string

const { confirm } = useConfirmDialog()
const submitted = ref(false)

onMounted(async () => {
  const result = await funderStore.fetchFunder(funderId)

  if (result) {
    form.resetForm({
      values: {
        name: result.name,
        email: result.email,
        phone: result.phone,
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
  await funderStore.updateFunder(funderId, {
    name: formValues.name,
    email: formValues.email,
    phone: formValues.phone,
    status: formValues.status,
  })
})
</script>

<template>
  <div>
    <PageTitle title="Edit Funder" subtitle="Update funder information.">
      <RouterLink to="/dashboard/funders">
        <Button class="button-primary-outline">All Funders</Button>
      </RouterLink>
    </PageTitle>
    <form @submit="onSubmit">
      <Card class="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>Edit Funder</CardTitle>
          <CardDescription>Update the funder details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid w-full items-center gap-5">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Insert name here..." v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Insert email here..." v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="phone">
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Insert phone here..." v-bind="componentField" />
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
            Update Funder
          </Button>
          <Loader class="size-5 animate-spin" v-if="updateLoading" />
        </CardFooter>
      </Card>
    </form>
  </div>
</template>
