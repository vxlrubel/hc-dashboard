import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { useToastDialog } from '@/composables/useToastDialog'
import { useSpinner } from '@/composables/useSpinner'
import API from '@/services/api'
import ENDPOINTS from '@/constants/endpoints'
import { useRouter } from 'vue-router'

export const useInvoicesStore = defineStore('invoice', () => {
  const { show: showToast } = useToastDialog()
  const { show: showSpinner, hide: hideSpinner } = useSpinner()

  interface Invoice {
    id: number
    invoiceNumber: string
    clientId: string
    amount: number
    description: string
    status: string
    dueDate: string
    paidAt: string | null
    created_at: string
    updated_at: string
    deleted_at: string
  }

  const router = useRouter()

  const invoices = ref<Invoice[]>([])

  onMounted(async () => {
    const { data } = await API.get(ENDPOINTS.invoices.list)
    invoices.value = data
  })

  const itemsPerPage = ref(10)
  const page = ref(1)
  const totalInvoices = computed(() => invoices.value.length)

  const sortedInvoices = computed(() => {
    return [...invoices.value].reverse()
  })

  const paginatedInvoices = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value
    return sortedInvoices.value.slice(start, start + itemsPerPage.value)
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

  const createInvoice = async (payload: {
    invoiceNumber: string
    clientId: string
    amount: number
    description: string
    dueDate: string
  }) => {
    try {
      createLoading.value = true

      const { data } = await API.post(ENDPOINTS.invoices.create, {
        ...payload,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      })

      if (data) {
        invoices.value.push(data)
        await router.push('/dashboard/invoices')
      }

      return data
    } catch (error) {
      console.warn('Create Invoice Warning:', error)
      throw error
    } finally {
      createLoading.value = false
    }
  }

  const fetchInvoiceLoading = ref(false)

  const fetchInvoice = async (id: string | number) => {
    fetchInvoiceLoading.value = true

    try {
      const { data } = await API.get(ENDPOINTS.invoices.single(id))

      if (data) {
        return data
      }
    } catch (error) {
      console.warn('Invoice fetching error: ', error)
    } finally {
      fetchInvoiceLoading.value = false
    }
  }

  const deleteLoading = ref(false)
  const deletingIds = ref<Record<string | number, boolean>>({})

  const deleteInvoice = async (id: string | number) => {
    deleteLoading.value = true

    try {
      await API.delete(ENDPOINTS.invoices.delete(id))

      deletingIds.value = { ...deletingIds.value, [id]: true }

      await new Promise((resolve) => setTimeout(resolve, 300))

      invoices.value = invoices.value.filter((a) => a.id !== id)

      deleteLoading.value = false

      await new Promise((resolve) => setTimeout(resolve, 500))

      deletingIds.value = { ...deletingIds.value, [id]: false }

      showToast({
        title: 'Success',
        description: 'Invoice moved to trash successfully.',
        status: 'success',
      })
    } catch (error) {
      deleteLoading.value = false
      deletingIds.value = { ...deletingIds.value, [id]: false }
      console.warn('Delete Invoice Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to delete invoice.',
        status: 'error',
      })
      throw error
    }
  }

  const updateLoading = ref(false)

  const updateInvoice = async (
    id: string | number,
    payload: {
      invoiceNumber: string
      clientId: string
      amount: number
      description: string
      dueDate: string
      status: string
    },
  ) => {
    try {
      updateLoading.value = true

      const { data } = await API.patch(ENDPOINTS.invoices.update(id), {
        ...payload,
        updated_at: new Date().toISOString(),
      })

      if (data) {
        const index = invoices.value.findIndex((a) => a.id === data.id)
        if (index !== -1) {
          invoices.value[index] = data
        }

        setTimeout(() => {
          showToast({
            title: 'Success',
            description: 'Invoice updated successfully.',
            status: 'success',
          })
        }, 500)

        await router.push('/dashboard/invoices')
      }

      return data
    } catch (error) {
      console.warn('Update Invoice Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to update invoice.',
        status: 'error',
      })
      throw error
    } finally {
      updateLoading.value = false
    }
  }

  return {
    paginatedInvoices,
    itemsPerPage,
    page,
    totalInvoices,
    bulkLoading,
    handleBuilAction,
    createLoading,
    createInvoice,
    fetchInvoiceLoading,
    fetchInvoice,
    updateLoading,
    updateInvoice,
    deleteLoading,
    deleteInvoice,
    deletingIds,
  }
})
