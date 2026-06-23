type Id = string | number

type Schema = {
  list: string
  create: string
  single: (id: Id) => string
  update: (id: Id) => string
  delete: (id: Id) => string
  restore: (id: Id) => string
  forceDelete: (id: Id) => string
}

type Endpoints = {
  auth: {
    login: string
    register: string
  }
  users: Schema
  roles: {
    list: string
    single: (role: string) => string
  }
  activities: Schema
}

export const ENDPOINTS: Endpoints = {
  auth: {
    login: '/login',
    register: '/register',
  },
  users: {
    list: '/users',
    create: '/users',
    single: (id: Id) => `/users/${id}`,
    update: (id: Id) => `/users/${id}`,
    delete: (id: Id) => `/users/${id}`,
    restore: (id: Id) => `/users/${id}/restore`,
    forceDelete: (id: Id) => `/users/${id}/force`,
  },
  roles: {
    list: '/roles',
    single: (role: string) => `/roles/${role}`,
  },
  activities: {
    list: '/activities',
    create: '/activities',
    single: (id: Id) => `/activities/${id}`,
    update: (id: Id) => `/activities/${id}`,
    delete: (id: Id) => `/activities/${id}`,
    restore: (id: Id) => `/activities/${id}/restore`,
    forceDelete: (id: Id) => `/activities/${id}/force`,
  },
}

export default ENDPOINTS
