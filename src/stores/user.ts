import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { useToastDialog } from '@/composables/useToastDialog'
import { useSpinner } from '@/composables/useSpinner'
import API from '@/services/api'
import ENDPOINTS from '@/constants/endpoints'
import { useRouter } from 'vue-router'

export const useUsersStore = defineStore('user', () => {
  const { show: showToast } = useToastDialog()
  const { show: showSpinner, hide: hideSpinner } = useSpinner()

  interface User {
    id: number
    name: string
    email: string
    password: string
    role: string
    avatar: string | null
    created_at: string
  }

  const router = useRouter()

  const users = ref<User[]>([])

  onMounted(async () => {
    const { data } = await API.get(ENDPOINTS.users.list)
    users.value = data
  })

  const itemsPerPage = ref(10)
  const page = ref(1)
  const totalUsers = computed(() => users.value.length)

  const sortedUsers = computed(() => {
    return [...users.value].reverse()
  })

  const paginatedUsers = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value
    return sortedUsers.value.slice(start, start + itemsPerPage.value)
  })

  const buikLoading = ref(false)

  const handleBuilAction = () => {
    buikLoading.value = true
    showSpinner()

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        hideSpinner()
        buikLoading.value = false

        showToast({
          title: 'Success',
          description: 'Bulk action successful',
          status: 'success',
        })

        resolve()
      }, 500)
    })
  }

  const createLoading = ref(false)

  const createUser = async (payload: {
    name: string
    email: string
    password: string
    role: string
  }) => {
    try {
      createLoading.value = true

      const { data } = await API.post(ENDPOINTS.users.create, {
        ...payload,
        created_at: new Date().toISOString(),
      })

      if (data) {
        users.value.push(data)
        await router.push('/dashboard/users')
      }

      return data
    } catch (error) {
      console.warn('Create User Warning:', error)
      throw error
    } finally {
      createLoading.value = false
    }
  }

  const fetchUserLoading = ref(false)

  const fetchUser = async (id: string | number) => {
    fetchUserLoading.value = true

    try {
      const { data } = await API.get(ENDPOINTS.users.single(id))

      if (data) {
        return data
      }
    } catch (error) {
      console.warn('User fetching error: ', error)
    } finally {
      fetchUserLoading.value = false
    }
  }

  const deleteLoading = ref(false)
  const deletingIds = ref<Record<string | number, boolean>>({})

  const deleteUser = async (id: string | number) => {
    deleteLoading.value = true

    try {
      await API.delete(ENDPOINTS.users.delete(id))

      deletingIds.value = { ...deletingIds.value, [id]: true }

      await new Promise((resolve) => setTimeout(resolve, 300))

      users.value = users.value.filter((u) => u.id !== id)

      deleteLoading.value = false

      await new Promise((resolve) => setTimeout(resolve, 500))

      deletingIds.value = { ...deletingIds.value, [id]: false }

      showToast({
        title: 'Success',
        description: 'User deleted successfully.',
        status: 'success',
      })
    } catch (error) {
      deleteLoading.value = false
      deletingIds.value = { ...deletingIds.value, [id]: false }
      console.warn('Delete User Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to delete user.',
        status: 'error',
      })
      throw error
    }
  }

  const updateLoading = ref(false)

  const updateUser = async (
    id: string | number,
    payload: {
      name: string
      email: string
      password: string
      role: string
    },
  ) => {
    try {
      updateLoading.value = true

      const { data } = await API.patch(ENDPOINTS.users.update(id), payload)

      if (data) {
        const index = users.value.findIndex((u) => u.id === data.id)
        if (index !== -1) {
          users.value[index] = data
        }

        setTimeout(() => {
          showToast({
            title: 'Success',
            description: 'User updated successfully.',
            status: 'success',
          })
        }, 500)

        await router.push('/dashboard/users')
      }

      return data
    } catch (error) {
      console.warn('Update User Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to update user.',
        status: 'error',
      })
      throw error
    } finally {
      updateLoading.value = false
    }
  }

  return {
    paginatedUsers,
    itemsPerPage,
    page,
    totalUsers,
    buikLoading,
    handleBuilAction,
    createLoading,
    createUser,
    fetchUserLoading,
    fetchUser,
    updateLoading,
    updateUser,
    deleteLoading,
    deleteUser,
    deletingIds,
  }
})
