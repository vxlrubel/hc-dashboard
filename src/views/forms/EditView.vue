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
import { useFormsStore } from '@/stores/form'
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
    type: z.string().min(1, 'Please select a type'),
    description: z.string().min(5, 'Description must be at least 5 characters'),
    version: z.string().min(1, 'Version is required'),
    status: z.string().min(1, 'Please select a status'),
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: '',
    type: '',
    description: '',
    version: '',
    status: '',
  },
})

const { meta } = form

const formStore = useFormsStore()
const { updateLoading } = storeToRefs(formStore)
const route = useRoute()
const formId = route.params.id as string

const { confirm } = useConfirmDialog()
const submitted = ref(false)

onMounted(async () => {
  const result = await formStore.fetchForm(formId)

  if (result) {
    form.resetForm({
      values: {
        title: result.title,
        type: result.type,
        description: result.description,
        version: result.version,
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
  await formStore.updateForm(formId, {
    title: formValues.title,
    type: formValues.type,
    description: formValues.description,
    version: formValues.version,
    status: formValues.status,
  })
})
</script>

<template>
  <div>
    <PageTitle title="Edit Form" subtitle="Update form information.">
      <RouterLink to="/dashboard/forms">
        <Button class="button-primary-outline">All Forms</Button>
      </RouterLink>
    </PageTitle>
    <form @submit="onSubmit">
      <Card class="w-full max-w-2xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>Edit Form</CardTitle>
          <CardDescription>Update the form details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid w-full items-center gap-5">
            <FormField v-slot="{ componentField }" name="title">
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Form title" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ field }" name="type">
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select :model-value="field.value" @update:model-value="field.onChange">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="assessment">Assessment</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="description">
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the form..."
                    class="min-h-[100px]"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="version">
              <FormItem>
                <FormLabel>Version</FormLabel>
                <FormControl>
                  <Input placeholder="1.0.0" v-bind="componentField" />
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
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
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
            Update Form
          </Button>
          <Loader class="size-5 animate-spin" v-if="updateLoading" />
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
