import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { useToastDialog } from '@/composables/useToastDialog'
import { useSpinner } from '@/composables/useSpinner'
import API from '@/services/api'
import ENDPOINTS from '@/constants/endpoints'
import { useRouter } from 'vue-router'

export const useRateSheetsStore = defineStore('rateSheet', () => {
  const { show: showToast } = useToastDialog()
  const { show: showSpinner, hide: hideSpinner } = useSpinner()

  interface RateSheet {
    id: number
    name: string
    description: string
    hourlyRate: number
    overnightRate: number
    weekendRate: number
    effectiveFrom: string
    effectiveTo: string
    status: string
    created_at: string
    updated_at: string
    deleted_at: string
  }

  const router = useRouter()

  const rateSheets = ref<RateSheet[]>([])

  onMounted(async () => {
    const { data } = await API.get(ENDPOINTS.rateSheets.list)
    rateSheets.value = data
  })

  const itemsPerPage = ref(10)
  const page = ref(1)
  const totalRateSheets = computed(() => rateSheets.value.length)

  const sortedRateSheets = computed(() => {
    return [...rateSheets.value].reverse()
  })

  const paginatedRateSheets = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value
    return sortedRateSheets.value.slice(start, start + itemsPerPage.value)
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
          description: 'Bulk action successfulBulk',
          status: 'success',
        })

        resolve()
      }, 500)
    })
  }

  const createLoading = ref(false)

  const createRateSheet = async (payload: {
    name: string
    description: string
    hourlyRate: number
    overnightRate: number
    weekendRate: number
    effectiveFrom: string
    effectiveTo: string
  }) => {
    try {
      createLoading.value = true

      const { data } = await API.post(ENDPOINTS.rateSheets.create, {
        ...payload,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      })

      if (data) {
        rateSheets.value.push(data)
        await router.push('/dashboard/rate-sheets')
      }

      return data
    } catch (error) {
      console.warn('Create Rate Sheet Warning:', error)
      throw error
    } finally {
      createLoading.value = false
    }
  }

  const fetchRateSheetLoading = ref(false)

  const fetchRateSheet = async (id: string | number) => {
    fetchRateSheetLoading.value = true

    try {
      const { data } = await API.get(ENDPOINTS.rateSheets.single(id))

      if (data) {
        return data
      }
    } catch (error) {
      console.warn('Rate Sheet fetching error: ', error)
    } finally {
      fetchRateSheetLoading.value = false
    }
  }

  const deleteLoading = ref(false)
  const deletingIds = ref<Record<string | number, boolean>>({})

  const deleteRateSheet = async (id: string | number) => {
    deleteLoading.value = true

    try {
      await API.delete(ENDPOINTS.rateSheets.delete(id))

      deletingIds.value = { ...deletingIds.value, [id]: true }

      await new Promise((resolve) => setTimeout(resolve, 300))

      rateSheets.value = rateSheets.value.filter((a) => a.id !== id)

      deleteLoading.value = false

      await new Promise((resolve) => setTimeout(resolve, 500))

      deletingIds.value = { ...deletingIds.value, [id]: false }

      showToast({
        title: 'Success',
        description: 'Rate sheet moved to trash successfully.',
        status: 'success',
      })
    } catch (error) {
      deleteLoading.value = false
      deletingIds.value = { ...deletingIds.value, [id]: false }
      console.warn('Delete Rate Sheet Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to delete rate sheet.',
        status: 'error',
      })
      throw error
    }
  }

  const updateLoading = ref(false)

  const updateRateSheet = async (
    id: string | number,
    payload: {
      name: string
      description: string
      hourlyRate: number
      overnightRate: number
      weekendRate: number
      effectiveFrom: string
      effectiveTo: string
      status: string
    },
  ) => {
    try {
      updateLoading.value = true

      const { data } = await API.patch(ENDPOINTS.rateSheets.update(id), {
        ...payload,
        updated_at: new Date().toISOString(),
      })

      if (data) {
        const index = rateSheets.value.findIndex((a) => a.id === data.id)
        if (index !== -1) {
          rateSheets.value[index] = data
        }

        setTimeout(() => {
          showToast({
            title: 'Success',
            description: 'Rate sheet updated successfully.',
            status: 'success',
          })
        }, 500)

        await router.push('/dashboard/rate-sheets')
      }

      return data
    } catch (error) {
      console.warn('Update Rate Sheet Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to update rate sheet.',
        status: 'error',
      })
      throw error
    } finally {
      updateLoading.value = false
    }
  }

  return {
    paginatedRateSheets,
    itemsPerPage,
    page,
    totalRateSheets,
    buikLoading,
    handleBuilAction,
    createLoading,
    createRateSheet,
    fetchRateSheetLoading,
    fetchRateSheet,
    updateLoading,
    updateRateSheet,
    deleteLoading,
    deleteRateSheet,
    deletingIds,
  }
})
