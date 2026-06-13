import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      path: '/dashboard/carers',
      name: 'carers',
      component: () => import('@/views/carers/ListView.vue'),
    },
    {
      path: '/dashboard/carer/add',
      name: 'carer-add',
      component: () => import('@/views/carers/AddView.vue'),
    },
    {
      path: '/dashboard/carer/edit/:id',
      name: 'carer-edit',
      component: () => import('@/views/carers/EditView.vue'),
    },
    {
      path: '/dashboard/carer/show/:id',
      name: 'carer-show',
      component: () => import('@/views/carers/DetailView.vue'),
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
      path: '/docs',
      name: 'docs',
      component: () => import('../views/DocsView.vue'),
    },
  ],
})

export default router
