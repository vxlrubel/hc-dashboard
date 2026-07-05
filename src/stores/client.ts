import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { useToastDialog } from '@/composables/useToastDialog'
import API from '@/services/api'
import ENDPOINTS from '@/constants/endpoints'
import { useRouter } from 'vue-router'

export const useClientsStore = defineStore('client', () => {
  const { show: showToast } = useToastDialog()
  interface Client {
    id: number
    name: string
    email: string
    phone: string
    company: string
    status: string
    created_at: string
    updated_at: string
    deleted_at: string
  }

  const router = useRouter()
  const clients = ref<Client[]>([])

  onMounted(async () => {
    const { data } = await API.get(ENDPOINTS.clients.list)
    clients.value = data
  })

  const itemsPerPage = ref(10)
  const page = ref(1)
  const totalClients = computed(() => clients.value.length)

  const sortedClients = computed(() => {
    return [...clients.value].reverse()
  })

  const paginatedClients = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value
    return sortedClients.value.slice(start, start + itemsPerPage.value)
  })

  const buikLoading = ref(false)

  const handleBuilAction = () => {
    buikLoading.value = true

    return new Promise<void>((resolve) => {
      setTimeout(() => {
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

  const createClient = async (payload: { name: string; email: string; phone: string; company: string }) => {
    try {
      createLoading.value = true

      const { data } = await API.post(ENDPOINTS.clients.create, {
        ...payload,
        status: 'in_progress',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      })

      if (data) {
        clients.value.push(data)
        await router.push('/dashboard/clients')
      }

      return data
    } catch (error) {
      console.warn('Create Client Warning:', error)
      throw error
    } finally {
      createLoading.value = false
    }
  }

  const fetchClientLoading = ref(false)

  const fetchClient = async (id: string | number) => {
    fetchClientLoading.value = true

    try {
      const { data } = await API.get(ENDPOINTS.clients.single(id))

      if (data) {
        return data
      }
    } catch (error) {
      console.warn('Client fetching error: ', error)
    } finally {
      fetchClientLoading.value = false
    }
  }

  const deleteLoading = ref(false)
  const deletingIds = ref<Record<string | number, boolean>>({})

  const deleteClient = async (id: string | number) => {
    deleteLoading.value = true

    try {
      await API.delete(ENDPOINTS.clients.delete(id))

      deletingIds.value = { ...deletingIds.value, [id]: true }

      await new Promise((resolve) => setTimeout(resolve, 300))

      clients.value = clients.value.filter((c) => c.id !== id)

      deleteLoading.value = false

      await new Promise((resolve) => setTimeout(resolve, 500))

      deletingIds.value = { ...deletingIds.value, [id]: false }

      showToast({
        title: 'Success',
        description: 'Client moved to trash successfully.',
        status: 'success',
      })
    } catch (error) {
      deleteLoading.value = false
      deletingIds.value = { ...deletingIds.value, [id]: false }
      console.warn('Delete Client Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to delete client.',
        status: 'error',
      })
      throw error
    }
  }

  const updateLoading = ref(false)

  const updateClient = async (
    id: string | number,
    payload: { name: string; email: string; phone: string; company: string; status: string },
  ) => {
    try {
      updateLoading.value = true

      const { data } = await API.patch(ENDPOINTS.clients.update(id), {
        ...payload,
        updated_at: new Date().toISOString(),
      })

      if (data) {
        const index = clients.value.findIndex((c) => c.id === data.id)
        if (index !== -1) {
          clients.value[index] = data
        }

        setTimeout(() => {
          showToast({
            title: 'Success',
            description: 'Client updated successfully.',
            status: 'success',
          })
        }, 500)

        await router.push('/dashboard/clients')
      }

      return data
    } catch (error) {
      console.warn('Update Client Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to update client.',
        status: 'error',
      })
      throw error
    } finally {
      updateLoading.value = false
    }
  }

  return {
    paginatedClients,
    itemsPerPage,
    page,
    totalClients,
    buikLoading,
    handleBuilAction,
    createLoading,
    createClient,
    fetchClientLoading,
    fetchClient,
    updateLoading,
    updateClient,
    deleteLoading,
    deleteClient,
    deletingIds,
  }
})
