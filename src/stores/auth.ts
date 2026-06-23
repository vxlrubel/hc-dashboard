import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import API from '@/services/api'
import { ENDPOINTS } from '@/constants/endpoints'

export interface User {
  id: number
  name: string
  email: string
  role: string
  avatar: string | null
  created_at: string
}

export interface RolePermissions {
  [entity: string]: string[]
}

export interface Role {
  label: string
  permissions: RolePermissions
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem('auth_user') || 'null'))
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const roles = ref<Record<string, Role>>({})
  const rolesLoaded = ref(false)

  if (token.value && user.value) {
    API.get(ENDPOINTS.roles.list).then(({ data }) => {
      roles.value = data as Record<string, Role>
      rolesLoaded.value = true
    })
  }

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const userRole = computed(() => user.value?.role ?? null)

  const userPermissions = computed<RolePermissions>(() => {
    if (!user.value) return {}
    return roles.value[user.value.role]?.permissions ?? {}
  })

  function can(entity: string, action: string): boolean {
    const perms = userPermissions.value[entity]
    if (!perms) return false
    return perms.includes('*') || perms.includes(action)
  }

  async function login(email: string, password: string) {
    const { data } = await API.get(ENDPOINTS.users.list, {
      params: { email, password },
    })

    if (!data || data.length === 0) {
      throw new Error('Invalid email or password')
    }

    const found: User = data[0]
    const fakeToken = btoa(`${found.id}:${found.email}:${Date.now()}`)

    token.value = fakeToken
    user.value = found

    localStorage.setItem('auth_token', fakeToken)
    localStorage.setItem('auth_user', JSON.stringify(found))

    await fetchRoles()

    return found
  }

  async function register(name: string, email: string, password: string) {
    const newUser = {
      name,
      email,
      password,
      role: 'viewer',
      avatar: null,
      created_at: new Date().toISOString(),
    }

    const { data } = await API.post(ENDPOINTS.users.create, newUser)
    return data as User
  }

  async function fetchRoles() {
    const { data } = await API.get(ENDPOINTS.roles.list)
    roles.value = data as Record<string, Role>
  }

  function logout() {
    token.value = null
    user.value = null
    roles.value = {}

    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    window.location.href = '/login'
  }

  return {
    user,
    token,
    roles,
    rolesLoaded,
    isAuthenticated,
    userRole,
    userPermissions,
    can,
    login,
    register,
    fetchRoles,
    logout,
  }
})
