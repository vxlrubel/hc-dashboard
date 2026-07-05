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
import { useClientsStore } from '@/stores/client'
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
      .regex(/^[\d\s+\-()]+$/, 'Phone can only contain digits and symbols'),
    company: z.string().min(2, 'Company must be at least 2 characters'),
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    email: '',
    phone: '',
    company: '',
  },
})

const clientStore = useClientsStore()
const { createLoading } = storeToRefs(clientStore)

const onSubmit = form.handleSubmit(async (values) => {
  await clientStore.createClient({
    name: values.name,
    email: values.email,
    phone: values.phone,
    company: values.company,
  })
})
</script>

<template>
  <div>
    <PageTitle title="Add Client" subtitle="Create a new client record.">
      <RouterLink to="/dashboard/clients">
        <Button class="button-primary-outline">All Clients</Button>
      </RouterLink>
    </PageTitle>
    <form @submit="onSubmit">
      <Card class="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>New Client</CardTitle>
          <CardDescription>Create a new client record with valid input.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid w-full items-center gap-5">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter client name..." v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email address..." v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="phone">
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number..." v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="company">
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name..." v-bind="componentField" />
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
