<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import PageTitle from '@/components/PageTitle.vue'
import { RouterLink, useRoute, onBeforeRouteLeave } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { parseDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { CalendarIcon, Loader } from '@lucide/vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEmployeesStore } from '@/stores/employee'
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
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    phone: z
      .string()
      .min(10, 'Phone must be at least 10 characters')
      .regex(/^[0-9+\-() ]+$/, 'Phone number contains invalid characters'),
    bio: z.string().min(10, 'Bio must be at least 10 characters'),
    dob: z
      .string()
      .min(1, 'Date of birth is required')
      .refine((val) => {
        if (!val) return true
        try {
          const d = parseDate(val)
          const todayDate = today(getLocalTimeZone())
          return d.compare(todayDate) <= 0
        } catch {
          return true
        }
      }, 'Date of birth cannot be in the future'),
    status: z.string().min(1, 'Please select a status'),
  }),
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    address: '',
    phone: '',
    bio: '',
    dob: '',
    status: '',
  },
})

const { meta } = form

const selectedDate = computed({
  get: () => {
    if (form.values.dob) {
      try {
        return parseDate(form.values.dob)
      } catch {
        return undefined
      }
    }
    return undefined
  },
  set: (val) => {
    form.setFieldValue('dob', val ? val.toString() : '')
    form.setFieldTouched('dob', true)
  },
})

const df = new DateFormatter('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
const defaultPlaceholder = today(getLocalTimeZone())

const employeeStore = useEmployeesStore()
const { updateLoading } = storeToRefs(employeeStore)
const route = useRoute()
const employeeId = route.params.id as string

const { confirm } = useConfirmDialog()
const submitted = ref(false)

onMounted(async () => {
  const result = await employeeStore.fetchEmployee(employeeId)

  if (result) {
    form.resetForm({
      values: {
        firstName: result.firstName,
        lastName: result.lastName,
        username: result.username,
        email: result.email,
        address: result.address,
        phone: result.phone,
        bio: result.bio,
        dob: result.dob,
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
  await employeeStore.updateEmployee(employeeId, {
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    username: formValues.username,
    email: formValues.email,
    address: formValues.address,
    phone: formValues.phone,
    bio: formValues.bio,
    dob: formValues.dob,
    status: formValues.status,
  })
})
</script>

<template>
  <div>
    <PageTitle title="Edit Employee" subtitle="Update employee information.">
      <RouterLink to="/dashboard/employees">
        <Button class="button-primary-outline">All Employees</Button>
      </RouterLink>
    </PageTitle>
    <form @submit="onSubmit">
      <Card class="w-full max-w-2xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>Edit Employee</CardTitle>
          <CardDescription>Update the employee details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid w-full items-center gap-5">
            <div class="grid grid-cols-2 gap-4">
              <FormField v-slot="{ componentField }" name="firstName">
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="lastName">
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>

            <FormField v-slot="{ componentField }" name="username">
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="address">
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St, City" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="phone">
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 (555) 000-0000" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="bio">
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself..."
                    class="min-h-[100px]"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="dob">
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Popover v-slot="{ close }">
                    <PopoverTrigger as-child>
                      <Button
                        variant="outline"
                        :class="
                          cn(
                            'w-full justify-start text-left font-normal',
                            !form.values.dob && 'text-muted-foreground',
                          )
                        "
                      >
                        <CalendarIcon class="mr-2 size-4" />
                        {{
                          form.values.dob
                            ? df.format(parseDate(form.values.dob).toDate(getLocalTimeZone()))
                            : 'Pick a date'
                        }}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent class="w-auto p-0" align="start">
                      <Calendar
                        v-model="selectedDate"
                        :default-placeholder="defaultPlaceholder"
                        :max-value="today(getLocalTimeZone())"
                        layout="month-and-year"
                        initial-focus
                        @update:model-value="close"
                      />
                    </PopoverContent>
                  </Popover>
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
            Update Employee
          </Button>
          <Loader class="size-5 animate-spin" v-if="updateLoading" />
        </CardFooter>
      </Card>
    </form>
  </div>
</template>
