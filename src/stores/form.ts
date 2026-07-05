import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { useToastDialog } from '@/composables/useToastDialog'
import { useSpinner } from '@/composables/useSpinner'
import API from '@/services/api'
import ENDPOINTS from '@/constants/endpoints'
import { useRouter } from 'vue-router'

export const useFormsStore = defineStore('form', () => {
  const { show: showToast } = useToastDialog()
  const { show: showSpinner, hide: hideSpinner } = useSpinner()

  interface Form {
    id: number
    title: string
    type: string
    description: string
    status: string
    version: string
    createdBy: string
    created_at: string
    updated_at: string
    deleted_at: string
  }

  const router = useRouter()

  const forms = ref<Form[]>([])

  onMounted(async () => {
    const { data } = await API.get(ENDPOINTS.forms.list)
    forms.value = data
  })

  const itemsPerPage = ref(10)
  const page = ref(1)
  const totalForms = computed(() => forms.value.length)

  const sortedForms = computed(() => {
    return [...forms.value].reverse()
  })

  const paginatedForms = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value
    return sortedForms.value.slice(start, start + itemsPerPage.value)
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

  const createForm = async (payload: {
    title: string
    type: string
    description: string
    version: string
  }) => {
    try {
      createLoading.value = true

      const { data } = await API.post(ENDPOINTS.forms.create, {
        ...payload,
        status: 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      })

      if (data) {
        forms.value.push(data)
        await router.push('/dashboard/forms')
      }

      return data
    } catch (error) {
      console.warn('Create Form Warning:', error)
      throw error
    } finally {
      createLoading.value = false
    }
  }

  const fetchFormLoading = ref(false)

  const fetchForm = async (id: string | number) => {
    fetchFormLoading.value = true

    try {
      const { data } = await API.get(ENDPOINTS.forms.single(id))

      if (data) {
        return data
      }
    } catch (error) {
      console.warn('Form fetching error: ', error)
    } finally {
      fetchFormLoading.value = false
    }
  }

  const deleteLoading = ref(false)
  const deletingIds = ref<Record<string | number, boolean>>({})

  const deleteForm = async (id: string | number) => {
    deleteLoading.value = true

    try {
      await API.delete(ENDPOINTS.forms.delete(id))

      deletingIds.value = { ...deletingIds.value, [id]: true }

      await new Promise((resolve) => setTimeout(resolve, 300))

      forms.value = forms.value.filter((a) => a.id !== id)

      deleteLoading.value = false

      await new Promise((resolve) => setTimeout(resolve, 500))

      deletingIds.value = { ...deletingIds.value, [id]: false }

      showToast({
        title: 'Success',
        description: 'Form moved to trash successfully.',
        status: 'success',
      })
    } catch (error) {
      deleteLoading.value = false
      deletingIds.value = { ...deletingIds.value, [id]: false }
      console.warn('Delete Form Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to delete form.',
        status: 'error',
      })
      throw error
    }
  }

  const updateLoading = ref(false)

  const updateForm = async (
    id: string | number,
    payload: {
      title: string
      type: string
      description: string
      version: string
      status: string
    },
  ) => {
    try {
      updateLoading.value = true

      const { data } = await API.patch(ENDPOINTS.forms.update(id), {
        ...payload,
        updated_at: new Date().toISOString(),
      })

      if (data) {
        const index = forms.value.findIndex((a) => a.id === data.id)
        if (index !== -1) {
          forms.value[index] = data
        }

        setTimeout(() => {
          showToast({
            title: 'Success',
            description: 'Form updated successfully.',
            status: 'success',
          })
        }, 500)

        await router.push('/dashboard/forms')
      }

      return data
    } catch (error) {
      console.warn('Update Form Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to update form.',
        status: 'error',
      })
      throw error
    } finally {
      updateLoading.value = false
    }
  }

  return {
    paginatedForms,
    itemsPerPage,
    page,
    totalForms,
    buikLoading,
    handleBuilAction,
    createLoading,
    createForm,
    fetchFormLoading,
    fetchForm,
    updateLoading,
    updateForm,
    deleteLoading,
    deleteForm,
    deletingIds,
  }
})
