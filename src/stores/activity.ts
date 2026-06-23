import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { useToastDialog } from '@/composables/useToastDialog'
import { useSpinner } from '@/composables/useSpinner'
import API from '@/services/api'
import ENDPOINTS from '@/constants/endpoints'

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

  const activities = ref<Activity[]>([])

  onMounted(async () => {
    const { data } = await API.get(ENDPOINTS.activities.list)

    activities.value = data

    console.log('data', data)
  })

  const itemsPerPage = ref(10)
  const page = ref(1)
  const totalActivities = computed(() => activities.value.length)

  const paginatedActivities = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value
    return activities.value.slice(start, start + itemsPerPage.value)
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

  return { paginatedActivities, itemsPerPage, page, totalActivities, buikLoading, handleBuilAction }
})
