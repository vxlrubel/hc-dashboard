import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { useToastDialog } from '@/composables/useToastDialog'
import API from '@/services/api'
import ENDPOINTS from '@/constants/endpoints'
import { useRouter } from 'vue-router'

export const useFundersStore = defineStore('funder', () => {
  const { show: showToast } = useToastDialog()

  interface Funder {
    id: number
    name: string
    email: string
    phone: string
    status: string
    created_at: string
    updated_at: string
    deleted_at: string
  }

  const router = useRouter()

  const funders = ref<Funder[]>([])

  onMounted(async () => {
    const { data } = await API.get(ENDPOINTS.funders.list)
    funders.value = data
  })

  const itemsPerPage = ref(10)
  const page = ref(1)
  const totalFunders = computed(() => funders.value.length)

  const sortedFunders = computed(() => {
    return [...funders.value].reverse()
  })

  const paginatedFunders = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value
    return sortedFunders.value.slice(start, start + itemsPerPage.value)
  })

  const buikLoading = ref(false)

  const createLoading = ref(false)

  const createFunder = async (payload: { name: string; email: string; phone: string }) => {
    try {
      createLoading.value = true

      const { data } = await API.post(ENDPOINTS.funders.create, {
        ...payload,
        status: 'in_progress',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      })

      if (data) {
        funders.value.push(data)
        await router.push('/dashboard/funders')
      }

      return data
    } catch (error) {
      console.warn('Create Funder Warning:', error)
      throw error
    } finally {
      createLoading.value = false
    }
  }

  const fetchFunderLoading = ref(false)

  const fetchFunder = async (id) => {
    fetchFunderLoading.value = true

    try {
      const { data } = await API.get(ENDPOINTS.funders.single(id))

      if (data) {
        return data
      }
    } catch (error) {
      console.warn('Funder fetching error: ', error)
    } finally {
      fetchFunderLoading.value = false
    }
  }

  const deleteLoading = ref(false)
  const deletingIds = ref<Record<string | number, boolean>>({})

  const deleteFunder = async (id: string | number) => {
    deleteLoading.value = true

    try {
      await API.delete(ENDPOINTS.funders.delete(id))

      deletingIds.value = { ...deletingIds.value, [id]: true }

      await new Promise((resolve) => setTimeout(resolve, 300))

      funders.value = funders.value.filter((a) => a.id !== id)

      deleteLoading.value = false

      await new Promise((resolve) => setTimeout(resolve, 500))

      deletingIds.value = { ...deletingIds.value, [id]: false }

      showToast({
        title: 'Success',
        description: 'Funder moved to trash successfully.',
        status: 'success',
      })
    } catch (error) {
      deleteLoading.value = false
      deletingIds.value = { ...deletingIds.value, [id]: false }
      console.warn('Delete Funder Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to delete funder.',
        status: 'error',
      })
      throw error
    }
  }

  const updateLoading = ref(false)

  const updateFunder = async (
    id: string | number,
    payload: { name: string; email: string; phone: string; status: string },
  ) => {
    try {
      updateLoading.value = true

      const { data } = await API.patch(ENDPOINTS.funders.update(id), {
        ...payload,
        updated_at: new Date().toISOString(),
      })

      if (data) {
        const index = funders.value.findIndex((a) => a.id === data.id)
        if (index !== -1) {
          funders.value[index] = data
        }

        setTimeout(() => {
          showToast({
            title: 'Success',
            description: 'Funder updated successfully.',
            status: 'success',
          })
        }, 500)

        await router.push('/dashboard/funders')
      }

      return data
    } catch (error) {
      console.warn('Update Funder Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to update funder.',
        status: 'error',
      })
      throw error
    } finally {
      updateLoading.value = false
    }
  }

  return {
    paginatedFunders,
    itemsPerPage,
    page,
    totalFunders,
    buikLoading,
    createLoading,
    createFunder,
    fetchFunderLoading,
    fetchFunder,
    updateLoading,
    updateFunder,
    deleteLoading,
    deleteFunder,
    deletingIds,
  }
})
