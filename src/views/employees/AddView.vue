<script setup lang="ts">
import { computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { parseDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { CalendarIcon } from '@lucide/vue'
import { cn } from '@/lib/utils'
import PageTitle from '@/components/PageTitle.vue'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'

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
  },
})

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

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})
</script>

<template>
  <div>
    <PageTitle title="Add Employee" subtitle="Create a new employee record." />
    <div class="mt-6 max-w-3xl mx-auto">
      <form @submit="onSubmit" class="flex flex-col gap-6">
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
              <Popover>
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
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex gap-4">
          <Button type="submit"> Save </Button>
          <Button type="button" variant="outline"> Cancel </Button>
        </div>
      </form>
    </div>
  </div>
</template>
