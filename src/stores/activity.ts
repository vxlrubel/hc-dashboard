import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { useToastDialog } from '@/composables/useToastDialog'
import { useSpinner } from '@/composables/useSpinner'
import API from '@/services/api'
import ENDPOINTS from '@/constants/endpoints'
import { useRouter } from 'vue-router'

export const useActivitiesStore = defineStore('activity', () => {
  const { show: showToast } = useToastDialog()
  const { show: showSpinner, hide: hideSpinner } = useSpinner()
  interface Activity {
    id: number
    title: string
    description: string
    status: string
    created_at: string
    updated_at: string
    deleted_at: string
  }

  const router = useRouter()

  const activities = ref<Activity[]>([])

  onMounted(async () => {
    const { data } = await API.get(ENDPOINTS.activities.list)
    activities.value = data
  })

  const itemsPerPage = ref(10)
  const page = ref(1)
  const totalActivities = computed(() => activities.value.length)

  const sortedActivities = computed(() => {
    return [...activities.value].reverse()
  })

  const paginatedActivities = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value
    return sortedActivities.value.slice(start, start + itemsPerPage.value)
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

  const createActivity = async (payload: { title: string; description: string }) => {
    try {
      createLoading.value = true

      const { data } = await API.post(ENDPOINTS.activities.create, {
        ...payload,
        status: 'in_progress',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      })

      if (data) {
        activities.value.push(data)
        await router.push('/dashboard/activities')
      }

      return data
    } catch (error) {
      console.warn('Create Activity Warning:', error)
      throw error
    } finally {
      createLoading.value = false
    }
  }

  const fetchActivityLoading = ref(false)

  const getAcivity = async (id) => {
    fetchActivityLoading.value = true

    try {
      const { data } = await API.get(ENDPOINTS.activities.single(id))

      if (data) {
        return data
      }
    } catch (error) {
      console.warn('Activity fetching error: ', error)
    } finally {
      fetchActivityLoading.value = false
    }
  }

  const deleteLoading = ref(false)
  const deletingIds = ref<Record<string | number, boolean>>({})

  const deleteActivity = async (id: string | number) => {
    deleteLoading.value = true

    try {
      await API.delete(ENDPOINTS.activities.delete(id))

      deletingIds.value = { ...deletingIds.value, [id]: true }

      await new Promise((resolve) => setTimeout(resolve, 300))

      activities.value = activities.value.filter((a) => a.id !== id)

      deleteLoading.value = false

      await new Promise((resolve) => setTimeout(resolve, 500))

      deletingIds.value = { ...deletingIds.value, [id]: false }

      showToast({
        title: 'Success',
        description: 'Activity moved to trash successfully.',
        status: 'success',
      })
    } catch (error) {
      deleteLoading.value = false
      deletingIds.value = { ...deletingIds.value, [id]: false }
      console.warn('Delete Activity Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to delete activity.',
        status: 'error',
      })
      throw error
    }
  }

  const updateLoading = ref(false)

  const updateActivity = async (
    id: string | number,
    payload: { title: string; description: string; status: string },
  ) => {
    try {
      updateLoading.value = true

      const { data } = await API.patch(ENDPOINTS.activities.update(id), {
        ...payload,
        updated_at: new Date().toISOString(),
      })

      if (data) {
        const index = activities.value.findIndex((a) => a.id === data.id)
        if (index !== -1) {
          activities.value[index] = data
        }
        showToast({
          title: 'Success',
          description: 'Activity updated successfully.',
          status: 'success',
        })
        await router.push('/dashboard/activities')
      }

      return data
    } catch (error) {
      console.warn('Update Activity Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to update activity.',
        status: 'error',
      })
      throw error
    } finally {
      updateLoading.value = false
    }
  }

  return {
    paginatedActivities,
    itemsPerPage,
    page,
    totalActivities,
    buikLoading,
    handleBuilAction,
    createLoading,
    createActivity,
    fetchActivityLoading,
    getAcivity,
    updateLoading,
    updateActivity,
    deleteLoading,
    deleteActivity,
    deletingIds,
  }
})
