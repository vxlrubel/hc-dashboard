import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { useAuthStore } from '@/stores/auth'

function toTitle(name: string) {
  const base = name.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
  return `${base} | HC Dashboard`
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
    },
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
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: 'employees',
          name: 'employees',
          meta: { permission: ['employees', 'list'] },
          component: () => import('@/views/employees/ListView.vue'),
        },
        {
          path: 'employee/add',
          name: 'employee-add',
          meta: { permission: ['employees', 'create'] },
          component: () => import('@/views/employees/AddView.vue'),
        },
        {
          path: 'employee/edit/:id',
          name: 'employee-edit',
          meta: { permission: ['employees', 'update'] },
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
          meta: { permission: ['clients', 'list'] },
          component: () => import('@/views/clients/ListView.vue'),
        },
        {
          path: 'client/add',
          name: 'client-add',
          meta: { permission: ['clients', 'create'] },
          component: () => import('@/views/clients/AddView.vue'),
        },
        {
          path: 'client/edit/:id',
          name: 'client-edit',
          meta: { permission: ['clients', 'update'] },
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
          meta: { permission: ['funders', 'list'] },
          component: () => import('@/views/funders/ListView.vue'),
        },
        {
          path: 'funder/add',
          name: 'funder-add',
          meta: { permission: ['funders', 'create'] },
          component: () => import('@/views/funders/AddView.vue'),
        },
        {
          path: 'funder/edit/:id',
          name: 'funder-edit',
          meta: { permission: ['funders', 'update'] },
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
          meta: { permission: ['forms', 'list'] },
          component: () => import('@/views/forms/ListView.vue'),
        },
        {
          path: 'form/add',
          name: 'form-add',
          meta: { permission: ['forms', 'create'] },
          component: () => import('@/views/forms/AddView.vue'),
        },
        {
          path: 'form/edit/:id',
          name: 'form-edit',
          meta: { permission: ['forms', 'update'] },
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
          meta: { permission: ['activities', 'list'] },
          component: () => import('@/views/activities/ListView.vue'),
        },
        {
          path: 'activity/add',
          name: 'activity-add',
          meta: { permission: ['activities', 'create'] },
          component: () => import('@/views/activities/AddView.vue'),
        },
        {
          path: 'activity/edit/:id',
          name: 'activity-edit',
          meta: { permission: ['activities', 'update'] },
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
          meta: { permission: ['rotas', 'list'] },
          component: () => import('@/views/rotas/ListView.vue'),
        },
        {
          path: 'rota/add',
          name: 'rota-add',
          meta: { permission: ['rotas', 'create'] },
          component: () => import('@/views/rotas/AddView.vue'),
        },
        {
          path: 'rota/edit/:id',
          name: 'rota-edit',
          meta: { permission: ['rotas', 'update'] },
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
          meta: { permission: ['schedules', 'list'] },
          component: () => import('@/views/schedules/ListView.vue'),
        },
        {
          path: 'schedule/add',
          name: 'schedule-add',
          meta: { permission: ['schedules', 'create'] },
          component: () => import('@/views/schedules/AddView.vue'),
        },
        {
          path: 'schedule/edit/:id',
          name: 'schedule-edit',
          meta: { permission: ['schedules', 'update'] },
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
          meta: { permission: ['invoices', 'list'] },
          component: () => import('@/views/invoices/ListView.vue'),
        },
        {
          path: 'invoice/add',
          name: 'invoice-add',
          meta: { permission: ['invoices', 'create'] },
          component: () => import('@/views/invoices/AddView.vue'),
        },
        {
          path: 'invoice/edit/:id',
          name: 'invoice-edit',
          meta: { permission: ['invoices', 'update'] },
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
          meta: { permission: ['rate-sheets', 'list'] },
          component: () => import('@/views/rate-sheets/ListView.vue'),
        },
        {
          path: 'rate-sheet/add',
          name: 'rate-sheet-add',
          meta: { permission: ['rate-sheets', 'create'] },
          component: () => import('@/views/rate-sheets/AddView.vue'),
        },
        {
          path: 'rate-sheet/edit/:id',
          name: 'rate-sheet-edit',
          meta: { permission: ['rate-sheets', 'update'] },
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
          meta: { permission: ['leave', 'list'] },
          component: () => import('@/views/leave/ListView.vue'),
        },
        {
          path: 'leave/add',
          name: 'leave-add',
          meta: { permission: ['leave', 'create'] },
          component: () => import('@/views/leave/AddView.vue'),
        },
        {
          path: 'leave/edit/:id',
          name: 'leave-edit',
          meta: { permission: ['leave', 'update'] },
          component: () => import('@/views/leave/EditView.vue'),
        },
        {
          path: 'leave/show/:id',
          name: 'leave-show',
          component: () => import('@/views/leave/DetailView.vue'),
        },
        {
          path: ':pathMatch(.*)*',
          component: () => import('@/views/NotFoundView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found-global',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach((to, _from) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if ((to.name === 'login' || to.name === 'register') && auth.isAuthenticated) {
    return { name: 'dashboard' }
  }

  if (to.meta.permission && auth.rolesLoaded) {
    const [entity, action] = to.meta.permission as [string, string]
    if (!auth.can(entity, action)) {
      return { name: 'dashboard' }
    }
  }
})

router.afterEach((to) => {
  document.title = to.name ? toTitle(to.name as string) : 'HC Dashboard'
})

export default router
