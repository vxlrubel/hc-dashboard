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
  activities: Schema
}

export const ENDPOINTS: Endpoints = {
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
