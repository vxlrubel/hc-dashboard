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
import { useInvoicesStore } from '@/stores/invoice'

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
    invoiceNumber: z.string().min(3, 'Invoice number must be at least 3 characters'),
    clientId: z.string().min(1, 'Client ID is required'),
    amount: z
      .number({ invalid_type_error: 'Amount must be a number' })
      .positive('Amount must be positive'),
    description: z.string().min(5, 'Description must be at least 5 characters'),
    dueDate: z.string().min(1, 'Due date is required'),
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    invoiceNumber: '',
    clientId: '',
    amount: undefined as number | undefined,
    description: '',
    dueDate: '',
  },
})

const invoiceStore = useInvoicesStore()
const { createLoading } = storeToRefs(invoiceStore)

const onSubmit = form.handleSubmit(async (values) => {
  await invoiceStore.createInvoice({
    invoiceNumber: values.invoiceNumber,
    clientId: values.clientId,
    amount: values.amount!,
    description: values.description,
    dueDate: values.dueDate,
  })
})
</script>

<template>
  <div>
    <PageTitle title="Add Invoice" subtitle="Create a new invoice record.">
      <RouterLink to="/dashboard/invoices">
        <Button class="button-primary-outline">All Invoices</Button>
      </RouterLink>
    </PageTitle>
    <form @submit="onSubmit">
      <Card class="w-full max-w-2xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>New Invoice</CardTitle>
          <CardDescription>Create a new invoice record with valid input.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid w-full items-center gap-5">
            <div class="grid grid-cols-2 gap-4">
              <FormField v-slot="{ componentField }" name="invoiceNumber">
                <FormItem>
                  <FormLabel>Invoice Number</FormLabel>
                  <FormControl>
                    <Input placeholder="INV-001" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="clientId">
                <FormItem>
                  <FormLabel>Client ID</FormLabel>
                  <FormControl>
                    <Input placeholder="CLT-001" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>

            <FormField v-slot="{ componentField }" name="amount">
              <FormItem>
                <FormLabel>Amount (£)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="100.00" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="description">
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the invoice..."
                    class="min-h-[100px]"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="dueDate">
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input type="date" v-bind="componentField" />
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
