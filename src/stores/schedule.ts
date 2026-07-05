import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { useToastDialog } from '@/composables/useToastDialog'
import { useSpinner } from '@/composables/useSpinner'
import API from '@/services/api'
import ENDPOINTS from '@/constants/endpoints'
import { useRouter } from 'vue-router'

export const useSchedulesStore = defineStore('schedule', () => {
  const { show: showToast } = useToastDialog()
  const { show: showSpinner, hide: hideSpinner } = useSpinner()

  interface Schedule {
    id: number
    title: string
    description: string
    employeeId: string
    clientId: string
    startTime: string
    endTime: string
    location: string
    status: string
    created_at: string
    updated_at: string
    deleted_at: string
  }

  const router = useRouter()

  const schedules = ref<Schedule[]>([])

  onMounted(async () => {
    const { data } = await API.get(ENDPOINTS.schedules.list)
    schedules.value = data
  })

  const itemsPerPage = ref(10)
  const page = ref(1)
  const totalSchedules = computed(() => schedules.value.length)

  const sortedSchedules = computed(() => {
    return [...schedules.value].reverse()
  })

  const paginatedSchedules = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value
    return sortedSchedules.value.slice(start, start + itemsPerPage.value)
  })

  const bulkLoading = ref(false)

  const handleBuilAction = () => {
    bulkLoading.value = true
    showSpinner()

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        hideSpinner()
        bulkLoading.value = false

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

  const createSchedule = async (payload: {
    title: string
    description: string
    employeeId: string
    clientId: string
    startTime: string
    endTime: string
    location: string
  }) => {
    try {
      createLoading.value = true

      const { data } = await API.post(ENDPOINTS.schedules.create, {
        ...payload,
        status: 'in_progress',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      })

      if (data) {
        schedules.value.push(data)
        await router.push('/dashboard/schedules')
      }

      return data
    } catch (error) {
      console.warn('Create Schedule Warning:', error)
      throw error
    } finally {
      createLoading.value = false
    }
  }

  const fetchScheduleLoading = ref(false)

  const fetchSchedule = async (id: string | number) => {
    fetchScheduleLoading.value = true

    try {
      const { data } = await API.get(ENDPOINTS.schedules.single(id))

      if (data) {
        return data
      }
    } catch (error) {
      console.warn('Schedule fetching error: ', error)
    } finally {
      fetchScheduleLoading.value = false
    }
  }

  const deleteLoading = ref(false)
  const deletingIds = ref<Record<string | number, boolean>>({})

  const deleteSchedule = async (id: string | number) => {
    deleteLoading.value = true

    try {
      await API.delete(ENDPOINTS.schedules.delete(id))

      deletingIds.value = { ...deletingIds.value, [id]: true }

      await new Promise((resolve) => setTimeout(resolve, 300))

      schedules.value = schedules.value.filter((a) => a.id !== id)

      deleteLoading.value = false

      await new Promise((resolve) => setTimeout(resolve, 500))

      deletingIds.value = { ...deletingIds.value, [id]: false }

      showToast({
        title: 'Success',
        description: 'Schedule moved to trash successfully.',
        status: 'success',
      })
    } catch (error) {
      deleteLoading.value = false
      deletingIds.value = { ...deletingIds.value, [id]: false }
      console.warn('Delete Schedule Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to delete schedule.',
        status: 'error',
      })
      throw error
    }
  }

  const updateLoading = ref(false)

  const updateSchedule = async (
    id: string | number,
    payload: {
      title: string
      description: string
      employeeId: string
      clientId: string
      startTime: string
      endTime: string
      location: string
      status: string
    },
  ) => {
    try {
      updateLoading.value = true

      const { data } = await API.patch(ENDPOINTS.schedules.update(id), {
        ...payload,
        updated_at: new Date().toISOString(),
      })

      if (data) {
        const index = schedules.value.findIndex((a) => a.id === data.id)
        if (index !== -1) {
          schedules.value[index] = data
        }

        setTimeout(() => {
          showToast({
            title: 'Success',
            description: 'Schedule updated successfully.',
            status: 'success',
          })
        }, 500)

        await router.push('/dashboard/schedules')
      }

      return data
    } catch (error) {
      console.warn('Update Schedule Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to update schedule.',
        status: 'error',
      })
      throw error
    } finally {
      updateLoading.value = false
    }
  }

  return {
    paginatedSchedules,
    itemsPerPage,
    page,
    totalSchedules,
    bulkLoading,
    handleBuilAction,
    createLoading,
    createSchedule,
    fetchScheduleLoading,
    fetchSchedule,
    updateLoading,
    updateSchedule,
    deleteLoading,
    deleteSchedule,
    deletingIds,
  }
})
