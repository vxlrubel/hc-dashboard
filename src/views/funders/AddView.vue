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
import { useFundersStore } from '@/stores/funder'
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
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    email: '',
    phone: '',
  },
})

const funderStore = useFundersStore()
const { createLoading } = storeToRefs(funderStore)

const onSubmit = form.handleSubmit(async (values) => {
  await funderStore.createFunder({
    name: values.name,
    email: values.email,
    phone: values.phone,
  })
})
</script>

<template>
  <div>
    <PageTitle title="Add Funder" subtitle="Create a new funder record.">
      <RouterLink to="/dashboard/funders">
        <Button class="button-primary-outline">All Funders</Button>
      </RouterLink>
    </PageTitle>
    <form @submit="onSubmit">
      <Card class="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>New Funder</CardTitle>
          <CardDescription>Create a new funder form here to provide valid input</CardDescription>
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
