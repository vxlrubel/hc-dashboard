import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

function toTitle(name: string) {
  const base = name.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
  return `${base} | HC Dashboard`
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BasicLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'docs',
          name: 'docs',
          component: () => import('../views/DocsView.vue'),
        },
        {
          path: ':pathMatch(.*)*',
          name: 'not-found',
          component: () => import('@/views/NotFoundView.vue'),
        },
      ],
    },
    {
      path: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: 'employees',
          name: 'employees',
          component: () => import('@/views/employees/ListView.vue'),
        },
        {
          path: 'employee/add',
          name: 'employee-add',
          component: () => import('@/views/employees/AddView.vue'),
        },
        {
          path: 'employee/edit/:id',
          name: 'employee-edit',
          component: () => import('@/views/employees/EditView.vue'),
        },
        {
          path: 'employee/show/:id',
          name: 'employee-show',
          component: () => import('@/views/employees/DetailView.vue'),
        },
        {
          path: 'clients',
          name: 'clients',
          component: () => import('@/views/clients/ListView.vue'),
        },
        {
          path: 'client/add',
          name: 'client-add',
          component: () => import('@/views/clients/AddView.vue'),
        },
        {
          path: 'client/edit/:id',
          name: 'client-edit',
          component: () => import('@/views/clients/EditView.vue'),
        },
        {
          path: 'client/show/:id',
          name: 'client-show',
          component: () => import('@/views/clients/DetailView.vue'),
        },
        {
          path: 'funders',
          name: 'funders',
          component: () => import('@/views/funders/ListView.vue'),
        },
        {
          path: 'funder/add',
          name: 'funder-add',
          component: () => import('@/views/funders/AddView.vue'),
        },
        {
          path: 'funder/edit/:id',
          name: 'funder-edit',
          component: () => import('@/views/funders/EditView.vue'),
        },
        {
          path: 'funder/show/:id',
          name: 'funder-show',
          component: () => import('@/views/funders/DetailView.vue'),
        },
        {
          path: 'forms',
          name: 'forms',
          component: () => import('@/views/forms/ListView.vue'),
        },
        {
          path: 'form/add',
          name: 'form-add',
          component: () => import('@/views/forms/AddView.vue'),
        },
        {
          path: 'form/edit/:id',
          name: 'form-edit',
          component: () => import('@/views/forms/EditView.vue'),
        },
        {
          path: 'form/show/:id',
          name: 'form-show',
          component: () => import('@/views/forms/DetailView.vue'),
        },
        {
          path: 'activities',
          name: 'activities',
          component: () => import('@/views/activities/ListView.vue'),
        },
        {
          path: 'activity/add',
          name: 'activity-add',
          component: () => import('@/views/activities/AddView.vue'),
        },
        {
          path: 'activity/edit/:id',
          name: 'activity-edit',
          component: () => import('@/views/activities/EditView.vue'),
        },
        {
          path: 'activity/show/:id',
          name: 'activity-show',
          component: () => import('@/views/activities/DetailView.vue'),
        },
        {
          path: 'rotas',
          name: 'rotas',
          component: () => import('@/views/rotas/ListView.vue'),
        },
        {
          path: 'rota/add',
          name: 'rota-add',
          component: () => import('@/views/rotas/AddView.vue'),
        },
        {
          path: 'rota/edit/:id',
          name: 'rota-edit',
          component: () => import('@/views/rotas/EditView.vue'),
        },
        {
          path: 'rota/show/:id',
          name: 'rota-show',
          component: () => import('@/views/rotas/DetailView.vue'),
        },
        {
          path: 'schedules',
          name: 'schedules',
          component: () => import('@/views/schedules/ListView.vue'),
        },
        {
          path: 'schedule/add',
          name: 'schedule-add',
          component: () => import('@/views/schedules/AddView.vue'),
        },
        {
          path: 'schedule/edit/:id',
          name: 'schedule-edit',
          component: () => import('@/views/schedules/EditView.vue'),
        },
        {
          path: 'schedule/show/:id',
          name: 'schedule-show',
          component: () => import('@/views/schedules/DetailView.vue'),
        },
        {
          path: 'invoices',
          name: 'invoices',
          component: () => import('@/views/invoices/ListView.vue'),
        },
        {
          path: 'invoice/add',
          name: 'invoice-add',
          component: () => import('@/views/invoices/AddView.vue'),
        },
        {
          path: 'invoice/edit/:id',
          name: 'invoice-edit',
          component: () => import('@/views/invoices/EditView.vue'),
        },
        {
          path: 'invoice/show/:id',
          name: 'invoice-show',
          component: () => import('@/views/invoices/DetailView.vue'),
        },
        {
          path: 'rate-sheets',
          name: 'rate-sheets',
          component: () => import('@/views/rate-sheets/ListView.vue'),
        },
        {
          path: 'rate-sheet/add',
          name: 'rate-sheet-add',
          component: () => import('@/views/rate-sheets/AddView.vue'),
        },
        {
          path: 'rate-sheet/edit/:id',
          name: 'rate-sheet-edit',
          component: () => import('@/views/rate-sheets/EditView.vue'),
        },
        {
          path: 'rate-sheet/show/:id',
          name: 'rate-sheet-show',
          component: () => import('@/views/rate-sheets/DetailView.vue'),
        },
        {
          path: 'leave',
          name: 'leave',
          component: () => import('@/views/leave/ListView.vue'),
        },
        {
          path: 'leave/add',
          name: 'leave-add',
          component: () => import('@/views/leave/AddView.vue'),
        },
        {
          path: 'leave/edit/:id',
          name: 'leave-edit',
          component: () => import('@/views/leave/EditView.vue'),
        },
        {
          path: 'leave/show/:id',
          name: 'leave-show',
          component: () => import('@/views/leave/DetailView.vue'),
        },
      ],
    },
  ],
})

router.afterEach((to) => {
  document.title = to.name ? toTitle(to.name as string) : 'HC Dashboard'
})

export default router
