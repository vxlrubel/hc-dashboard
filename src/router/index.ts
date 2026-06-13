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
      path: '/docs',
      name: 'docs',
      component: () => import('../views/DocsView.vue'),
    },
  ],
})

export default router
