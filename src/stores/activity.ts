import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'

export const useActivitiesStore = defineStore('activity', () => {
  const statuses = ['completed', 'in_progress', 'pending']

  interface Activity {
    id: number
    title: string
    description: string
    status: string
    created_at: string
    updated_at: string
  }

  const activities = ref<Activity[]>([])

  onMounted(async () => {
    const generatedActivities = Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      title: `Activity ${index + 1}`,
      description: `Description for activity ${index + 1}.`,
      status: statuses[index % statuses.length],
      created_at: new Date(2026, 5, index + 1, 9, 0, 0).toISOString(),
      updated_at: new Date(2026, 5, index + 1, 10, 30, 0).toISOString(),
    }))

    activities.value = generatedActivities
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

    setTimeout(() => {
      buikLoading.value = false
    }, 1500)
  }

  return { paginatedActivities, itemsPerPage, page, totalActivities, buikLoading, handleBuilAction }
})
