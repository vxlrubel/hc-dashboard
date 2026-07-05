import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { useToastDialog } from '@/composables/useToastDialog'
import { useSpinner } from '@/composables/useSpinner'
import API from '@/services/api'
import ENDPOINTS from '@/constants/endpoints'
import { useRouter } from 'vue-router'

export const useRotasStore = defineStore('rota', () => {
  const { show: showToast } = useToastDialog()
  const { show: showSpinner, hide: hideSpinner } = useSpinner()

  interface Rota {
    id: number
    title: string
    employeeId: string
    shiftDate: string
    startTime: string
    endTime: string
    role: string
    status: string
    created_at: string
    updated_at: string
    deleted_at: string
  }

  const router = useRouter()

  const rotas = ref<Rota[]>([])

  onMounted(async () => {
    const { data } = await API.get(ENDPOINTS.rotas.list)
    rotas.value = data
  })

  const itemsPerPage = ref(10)
  const page = ref(1)
  const totalRotas = computed(() => rotas.value.length)

  const sortedRotas = computed(() => {
    return [...rotas.value].reverse()
  })

  const paginatedRotas = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value
    return sortedRotas.value.slice(start, start + itemsPerPage.value)
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

  const createRota = async (payload: {
    title: string
    employeeId: string
    shiftDate: string
    startTime: string
    endTime: string
    role: string
  }) => {
    try {
      createLoading.value = true

      const { data } = await API.post(ENDPOINTS.rotas.create, {
        ...payload,
        status: 'scheduled',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      })

      if (data) {
        rotas.value.push(data)
        await router.push('/dashboard/rotas')
      }

      return data
    } catch (error) {
      console.warn('Create Rota Warning:', error)
      throw error
    } finally {
      createLoading.value = false
    }
  }

  const fetchRotaLoading = ref(false)

  const fetchRota = async (id: string | number) => {
    fetchRotaLoading.value = true

    try {
      const { data } = await API.get(ENDPOINTS.rotas.single(id))

      if (data) {
        return data
      }
    } catch (error) {
      console.warn('Rota fetching error: ', error)
    } finally {
      fetchRotaLoading.value = false
    }
  }

  const deleteLoading = ref(false)
  const deletingIds = ref<Record<string | number, boolean>>({})

  const deleteRota = async (id: string | number) => {
    deleteLoading.value = true

    try {
      await API.delete(ENDPOINTS.rotas.delete(id))

      deletingIds.value = { ...deletingIds.value, [id]: true }

      await new Promise((resolve) => setTimeout(resolve, 300))

      rotas.value = rotas.value.filter((a) => a.id !== id)

      deleteLoading.value = false

      await new Promise((resolve) => setTimeout(resolve, 500))

      deletingIds.value = { ...deletingIds.value, [id]: false }

      showToast({
        title: 'Success',
        description: 'Rota moved to trash successfully.',
        status: 'success',
      })
    } catch (error) {
      deleteLoading.value = false
      deletingIds.value = { ...deletingIds.value, [id]: false }
      console.warn('Delete Rota Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to delete rota.',
        status: 'error',
      })
      throw error
    }
  }

  const updateLoading = ref(false)

  const updateRota = async (
    id: string | number,
    payload: {
      title: string
      employeeId: string
      shiftDate: string
      startTime: string
      endTime: string
      role: string
      status: string
    },
  ) => {
    try {
      updateLoading.value = true

      const { data } = await API.patch(ENDPOINTS.rotas.update(id), {
        ...payload,
        updated_at: new Date().toISOString(),
      })

      if (data) {
        const index = rotas.value.findIndex((a) => a.id === data.id)
        if (index !== -1) {
          rotas.value[index] = data
        }

        setTimeout(() => {
          showToast({
            title: 'Success',
            description: 'Rota updated successfully.',
            status: 'success',
          })
        }, 500)

        await router.push('/dashboard/rotas')
      }

      return data
    } catch (error) {
      console.warn('Update Rota Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to update rota.',
        status: 'error',
      })
      throw error
    } finally {
      updateLoading.value = false
    }
  }

  return {
    paginatedRotas,
    itemsPerPage,
    page,
    totalRotas,
    buikLoading,
    handleBuilAction,
    createLoading,
    createRota,
    fetchRotaLoading,
    fetchRota,
    updateLoading,
    updateRota,
    deleteLoading,
    deleteRota,
    deletingIds,
  }
})
