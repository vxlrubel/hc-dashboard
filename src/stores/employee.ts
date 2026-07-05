import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { useToastDialog } from '@/composables/useToastDialog'
import { useSpinner } from '@/composables/useSpinner'
import API from '@/services/api'
import ENDPOINTS from '@/constants/endpoints'
import { useRouter } from 'vue-router'

export const useEmployeesStore = defineStore('employee', () => {
  const { show: showToast } = useToastDialog()
  const { show: showSpinner, hide: hideSpinner } = useSpinner()

  interface Employee {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
    address: string
    phone: string
    bio: string
    dob: string
    status: string
    created_at: string
    updated_at: string
    deleted_at: string
  }

  const router = useRouter()

  const employees = ref<Employee[]>([])

  onMounted(async () => {
    const { data } = await API.get(ENDPOINTS.employees.list)
    employees.value = data
  })

  const itemsPerPage = ref(10)
  const page = ref(1)
  const totalEmployees = computed(() => employees.value.length)

  const sortedEmployees = computed(() => {
    return [...employees.value].reverse()
  })

  const paginatedEmployees = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value
    return sortedEmployees.value.slice(start, start + itemsPerPage.value)
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

  const createEmployee = async (payload: {
    firstName: string
    lastName: string
    username: string
    email: string
    address: string
    phone: string
    bio: string
    dob: string
  }) => {
    try {
      createLoading.value = true

      const { data } = await API.post(ENDPOINTS.employees.create, {
        ...payload,
        status: 'in_progress',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      })

      if (data) {
        employees.value.push(data)
        await router.push('/dashboard/employees')
      }

      return data
    } catch (error) {
      console.warn('Create Employee Warning:', error)
      throw error
    } finally {
      createLoading.value = false
    }
  }

  const fetchEmployeeLoading = ref(false)

  const fetchEmployee = async (id: string | number) => {
    fetchEmployeeLoading.value = true

    try {
      const { data } = await API.get(ENDPOINTS.employees.single(id))

      if (data) {
        return data
      }
    } catch (error) {
      console.warn('Employee fetching error: ', error)
    } finally {
      fetchEmployeeLoading.value = false
    }
  }

  const deleteLoading = ref(false)
  const deletingIds = ref<Record<string | number, boolean>>({})

  const deleteEmployee = async (id: string | number) => {
    deleteLoading.value = true

    try {
      await API.delete(ENDPOINTS.employees.delete(id))

      deletingIds.value = { ...deletingIds.value, [id]: true }

      await new Promise((resolve) => setTimeout(resolve, 300))

      employees.value = employees.value.filter((a) => a.id !== id)

      deleteLoading.value = false

      await new Promise((resolve) => setTimeout(resolve, 500))

      deletingIds.value = { ...deletingIds.value, [id]: false }

      showToast({
        title: 'Success',
        description: 'Employee moved to trash successfully.',
        status: 'success',
      })
    } catch (error) {
      deleteLoading.value = false
      deletingIds.value = { ...deletingIds.value, [id]: false }
      console.warn('Delete Employee Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to delete employee.',
        status: 'error',
      })
      throw error
    }
  }

  const updateLoading = ref(false)

  const updateEmployee = async (
    id: string | number,
    payload: {
      firstName: string
      lastName: string
      username: string
      email: string
      address: string
      phone: string
      bio: string
      dob: string
      status: string
    },
  ) => {
    try {
      updateLoading.value = true

      const { data } = await API.patch(ENDPOINTS.employees.update(id), {
        ...payload,
        updated_at: new Date().toISOString(),
      })

      if (data) {
        const index = employees.value.findIndex((a) => a.id === data.id)
        if (index !== -1) {
          employees.value[index] = data
        }

        setTimeout(() => {
          showToast({
            title: 'Success',
            description: 'Employee updated successfully.',
            status: 'success',
          })
        }, 500)

        await router.push('/dashboard/employees')
      }

      return data
    } catch (error) {
      console.warn('Update Employee Warning:', error)
      showToast({
        title: 'Error',
        description: 'Failed to update employee.',
        status: 'error',
      })
      throw error
    } finally {
      updateLoading.value = false
    }
  }

  return {
    paginatedEmployees,
    itemsPerPage,
    page,
    totalEmployees,
    buikLoading,
    handleBuilAction,
    createLoading,
    createEmployee,
    fetchEmployeeLoading,
    fetchEmployee,
    updateLoading,
    updateEmployee,
    deleteLoading,
    deleteEmployee,
    deletingIds,
  }
})
