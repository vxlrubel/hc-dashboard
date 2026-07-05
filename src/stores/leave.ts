import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { useToastDialog } from '@/composables/useToastDialog'
import API from '@/services/api'
import ENDPOINTS from '@/constants/endpoints'
import { useRouter } from 'vue-router'

export const useLeaveStore = defineStore('leave', () => {
  const { show: showToast } = useToastDialog()

  interface Leave {
    id: number
    employeeId: string
    type: string
    reason: string
    startDate: string
    endDate: string
    status: string
    approvedBy: string | null
    created_at: string
    updated_at: string
    deleted_at: string
  }

  const router = useRouter()

  const leaves = ref<Leave[]>([])

  onMounted(async () => {
    const { data } = await API.get(ENDPOINTS.leave.list)
    leaves.value = data
  })

  const itemsPerPage = ref(10)
  const page = ref(1)
  const totalLeaves = computed(() => leaves.value.length)

  const sortedLeaves = computed(() => {
    return [...leaves.value].reverse()
  })

  const paginatedLeaves = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value
    return sortedLeaves.value.slice(start, start + itemsPerPage.value)
  })

  const buikLoading = ref(false)

  const createLoading = ref(false)

  const createLeave = async (payload: {
    employeeId: string
    type: string
    reason: string
    startDate: string
    endDate: string
  }) => {
    try {
      createLoading.value = true

      const { data } = await API.post(ENDPOINTS.leave.create, {
        ...payload,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      })

      if (data) {
        leaves.value.push(data)
        await router.push('/dashboard/leave')
      }

      return data
    } catch (error) {
      console.warn('Create Leave Warning:', error)
      throw error
    } finally {
      createLoading.value = false
    }
  }

  const fetchLeaveLoading = ref(false)

  const fetchLeave = async (id: string | number) => {
    fetchLeaveLoading.value = true

    try {
      const { data } = await API.get(ENDPOINTS.leave.single(id))

      if (data) {
        return data
      }
    } catch (error) {
      console.warn('Leave fetching error: ', error)
    } finally {
      fetchLeaveLoading.value = false
    }
  }

  const deleteLoading = ref(false)
  const deletingIds = ref<Record<string | number, boolean>>({})

  const deleteLeave = async (id: string | number) => {
    deleteLoading.value = true

    try {
      await API.delete(ENDPOINTS.leave.delete(id))

      deletingIds.value = { ...deletingIds.value, [id]: true }

      await new Promise((resolve) => setTimeout(resolve, 300))

      leaves.value = leaves.value.filter((a) => a.id !== id)

      deleteLoading.value = false

      await new Promise((resolve) => setTimeout(resolve, 500))

      deletingIds.value = { ...deletingIds.value, [id]: false }

      showToast({
        title: 'Success',
        description: 'Leave moved to trash successfully.',
        status: 'success',
      })
    } catch (error) {
      deleteLoading.value = false
      deletingIds.value = { ...deletingIds.value, [id]: false }
      console.warn('Delete Leave Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to delete leave.',
        status: 'error',
      })
      throw error
    }
  }

  const updateLoading = ref(false)

  const updateLeave = async (
    id: string | number,
    payload: {
      employeeId: string
      type: string
      reason: string
      startDate: string
      endDate: string
      status: string
    },
  ) => {
    try {
      updateLoading.value = true

      const { data } = await API.patch(ENDPOINTS.leave.update(id), {
        ...payload,
        updated_at: new Date().toISOString(),
      })

      if (data) {
        const index = leaves.value.findIndex((a) => a.id === data.id)
        if (index !== -1) {
          leaves.value[index] = data
        }

        setTimeout(() => {
          showToast({
            title: 'Success',
            description: 'Leave updated successfully.',
            status: 'success',
          })
        }, 500)

        await router.push('/dashboard/leave')
      }

      return data
    } catch (error) {
      console.warn('Update Leave Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to update leave.',
        status: 'error',
      })
      throw error
    } finally {
      updateLoading.value = false
    }
  }

  return {
    paginatedLeaves,
    itemsPerPage,
    page,
    totalLeaves,
    buikLoading,
    createLoading,
    createLeave,
    fetchLeaveLoading,
    fetchLeave,
    updateLoading,
    updateLeave,
    deleteLoading,
    deleteLeave,
    deletingIds,
  }
})
