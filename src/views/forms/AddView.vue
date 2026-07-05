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
import { useFormsStore } from '@/stores/form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    title: '',
    type: '',
    description: '',
    version: '',
  },
})

const formStore = useFormsStore()
const { createLoading } = storeToRefs(formStore)

const onSubmit = form.handleSubmit(async (values) => {
  await formStore.createForm({
    title: values.title,
    type: values.type,
    description: values.description,
    version: values.version,
  })
})
</script>

<template>
  <div>
    <PageTitle title="Add Form" subtitle="Create a new form.">
      <RouterLink to="/dashboard/forms">
        <Button class="button-primary-outline">All Forms</Button>
      </RouterLink>
    </PageTitle>
    <form @submit="onSubmit">
      <Card class="w-full max-w-2xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>New Form</CardTitle>
          <CardDescription>Create a new form record with valid input.</CardDescription>
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
