<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { GalleryVerticalEnd, Loader } from '@lucide/vue'

const auth = useAuthStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)

async function handleRegister() {
  error.value = ''
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  loading.value = true
  try {
    await auth.register(name.value, email.value, password.value)
    router.push('/login')
  } catch (e: any) {
    error.value = e?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
    <div class="flex w-full max-w-sm flex-col gap-6">
      <RouterLink to="/" class="flex items-center gap-2 self-center">
        <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <GalleryVerticalEnd class="size-4" />
        </div>
        <span class="text-lg font-semibold">HC Dashboard</span>
      </RouterLink>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your details to register.</CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
            <div class="grid gap-2">
              <Label for="name">Full Name</Label>
              <Input id="name" v-model="name" placeholder="John Doe" required />
            </div>
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input id="email" v-model="email" type="email" placeholder="john@example.com" required />
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input id="password" v-model="password" type="password" required />
            </div>
            <div class="grid gap-2">
              <Label for="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" v-model="confirmPassword" type="password" required />
            </div>
            <p v-if="error" class="text-sm text-destructive">{{ error }}</p>
            <Button type="submit" :disabled="loading" class="w-full">
              <Loader v-if="loading" class="animate-spin" />
              <template v-else>Register</template>
            </Button>
          </form>
        </CardContent>
        <CardFooter class="justify-center">
          <p class="text-sm text-muted-foreground">
            Already have an account?
            <RouterLink to="/login" class="text-primary underline-offset-4 hover:underline">Login</RouterLink>
          </p>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
