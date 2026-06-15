import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

function toTitle(name: string) {
  const base = name
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c: string) => c.toUpperCase())
  return `${base} | HC Dashboard`
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dashboard/employees',
      name: 'employees',
      component: () => import('@/views/employees/ListView.vue'),
    },
    {
      path: '/dashboard/employee/add',
      name: 'employee-add',
      component: () => import('@/views/employees/AddView.vue'),
    },
    {
      path: '/dashboard/employee/edit/:id',
      name: 'employee-edit',
      component: () => import('@/views/employees/EditView.vue'),
    },
    {
      path: '/dashboard/employee/show/:id',
      name: 'employee-show',
      component: () => import('@/views/employees/DetailView.vue'),
    },
    {
      path: '/dashboard/clients',
      name: 'clients',
      component: () => import('@/views/clients/ListView.vue'),
    },
    {
      path: '/dashboard/client/add',
      name: 'client-add',
      component: () => import('@/views/clients/AddView.vue'),
    },
    {
      path: '/dashboard/client/edit/:id',
      name: 'client-edit',
      component: () => import('@/views/clients/EditView.vue'),
    },
    {
      path: '/dashboard/client/show/:id',
      name: 'client-show',
      component: () => import('@/views/clients/DetailView.vue'),
    },
    {
      path: '/dashboard/funders',
      name: 'funders',
      component: () => import('@/views/funders/ListView.vue'),
    },
    {
      path: '/dashboard/funder/add',
      name: 'funder-add',
      component: () => import('@/views/funders/AddView.vue'),
    },
    {
      path: '/dashboard/funder/edit/:id',
      name: 'funder-edit',
      component: () => import('@/views/funders/EditView.vue'),
    },
    {
      path: '/dashboard/funder/show/:id',
      name: 'funder-show',
      component: () => import('@/views/funders/DetailView.vue'),
    },
    {
      path: '/dashboard/forms',
      name: 'forms',
      component: () => import('@/views/forms/ListView.vue'),
    },
    {
      path: '/dashboard/form/add',
      name: 'form-add',
      component: () => import('@/views/forms/AddView.vue'),
    },
    {
      path: '/dashboard/form/edit/:id',
      name: 'form-edit',
      component: () => import('@/views/forms/EditView.vue'),
    },
    {
      path: '/dashboard/form/show/:id',
      name: 'form-show',
      component: () => import('@/views/forms/DetailView.vue'),
    },
    {
      path: '/dashboard/activities',
      name: 'activities',
      component: () => import('@/views/activities/ListView.vue'),
    },
    {
      path: '/dashboard/activity/add',
      name: 'activity-add',
      component: () => import('@/views/activities/AddView.vue'),
    },
    {
      path: '/dashboard/activity/edit/:id',
      name: 'activity-edit',
      component: () => import('@/views/activities/EditView.vue'),
    },
    {
      path: '/dashboard/activity/show/:id',
      name: 'activity-show',
      component: () => import('@/views/activities/DetailView.vue'),
    },
    {
      path: '/dashboard/rotas',
      name: 'rotas',
      component: () => import('@/views/rotas/ListView.vue'),
    },
    {
      path: '/dashboard/rota/add',
      name: 'rota-add',
      component: () => import('@/views/rotas/AddView.vue'),
    },
    {
      path: '/dashboard/rota/edit/:id',
      name: 'rota-edit',
      component: () => import('@/views/rotas/EditView.vue'),
    },
    {
      path: '/dashboard/rota/show/:id',
      name: 'rota-show',
      component: () => import('@/views/rotas/DetailView.vue'),
    },
    {
      path: '/dashboard/schedules',
      name: 'schedules',
      component: () => import('@/views/schedules/ListView.vue'),
    },
    {
      path: '/dashboard/schedule/add',
      name: 'schedule-add',
      component: () => import('@/views/schedules/AddView.vue'),
    },
    {
      path: '/dashboard/schedule/edit/:id',
      name: 'schedule-edit',
      component: () => import('@/views/schedules/EditView.vue'),
    },
    {
      path: '/dashboard/schedule/show/:id',
      name: 'schedule-show',
      component: () => import('@/views/schedules/DetailView.vue'),
    },
    {
      path: '/dashboard/invoices',
      name: 'invoices',
      component: () => import('@/views/invoices/ListView.vue'),
    },
    {
      path: '/dashboard/invoice/add',
      name: 'invoice-add',
      component: () => import('@/views/invoices/AddView.vue'),
    },
    {
      path: '/dashboard/invoice/edit/:id',
      name: 'invoice-edit',
      component: () => import('@/views/invoices/EditView.vue'),
    },
    {
      path: '/dashboard/invoice/show/:id',
      name: 'invoice-show',
      component: () => import('@/views/invoices/DetailView.vue'),
    },
    {
      path: '/docs',
      name: 'docs',
      component: () => import('../views/DocsView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

router.afterEach((to) => {
  document.title = to.name ? toTitle(to.name as string) : 'HC Dashboard'
})

export default router
